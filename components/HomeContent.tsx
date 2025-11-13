"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { supabase, type Response, type ResponseRecord } from "@/lib/supabase";
import ChangeAnswer from "./ChangeAnswer";
import DateAndLocation from "./DateAndLocation";
import EventConfirmation from "./EventConfirmation";
import Footer from "./Footer";
import Header from "./Header";
import SelectOption from "./SelectOption";
import Snowflakes from "./Snowflakes";
import LogoIcon from "./KodelabIcon";

type HomeContentProps = {
  guestId?: string;
};

type GuestDetails = Pick<ResponseRecord, "id" | "email" | "first_name" | "last_name" | "response">;

const HomeContent = ({ guestId }: HomeContentProps) => {
  const router = useRouter();
  const [guest, setGuest] = useState<GuestDetails | null>(null);
  const [currentResponse, setCurrentResponse] = useState<Response>("No response");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showChangeConfirm, setShowChangeConfirm] = useState(false);
  const [newResponse, setNewResponse] = useState<Response | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!guestId) {
      setErrorMessage("This invitation link is invalid.");
      setLoading(false);
      return;
    }

    const fetchGuest = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("responses")
          .select("id, email, first_name, last_name, response")
          .eq("id", guestId)
          .single();

        if (error || !data) {
          setErrorMessage("This invitation link is invalid.");
          setGuest(null);
          return;
        }

        setGuest(data as GuestDetails);
        const responseValue = (data.response ?? "No response") as Response;
        setCurrentResponse(responseValue);
        setErrorMessage(null);
      } catch (error) {
        console.error("Error loading guest:", error);
        setErrorMessage("Unable to load this invitation.");
      } finally {
        setLoading(false);
      }
    };

    fetchGuest();
  }, [guestId]);

  const handleResponse = async (response: Response) => {
    if (!guest) return;

    console.log("handleResponse triggered: ", response);

    const hasResponded = currentResponse === "Coming" || currentResponse === "Not coming";
    if (hasResponded && !showChangeConfirm) {
      setNewResponse(response);
      setShowChangeConfirm(true);
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("responses")
        .update({
          response,
          updated_at: new Date().toISOString(),
        })
        .eq("id", guest.id);

      if (error) throw error;

      setCurrentResponse(response);
      setGuest((prev) => (prev ? { ...prev, response } : prev));
      setShowChangeConfirm(false);
      setNewResponse(null);

      const successUrl = `${window.location.origin}/success?id=${guest.id}&response=${response}`;
      window.location.replace(successUrl);
    } catch (error) {
      console.error("Error saving response:", error);
      alert("Error saving response. Please try again.");
      setSubmitting(false);
    }
  };

  const hasResponded = useMemo(
    () => currentResponse === "Coming" || currentResponse === "Not coming",
    [currentResponse]
  );

  if (loading) {
    return (
      <div className="min-h-[100dvh] flex flex-col">
        <Snowflakes />
        <div className="flex-1 flex items-center justify-center">
          <LogoIcon className="w-24 h-24 animate-pulse" />
        </div>
      </div>
    );
  }

  if (errorMessage || !guest) {
    return (
      <div className="min-h-[100dvh] flex flex-col">
        <Snowflakes />
        <div className="flex-1 flex items-center justify-center px-4 pb-[env(safe-area-inset-bottom)]">
          <div className="text-center card card-contrast p-8 md:p-12 max-w-lg w-full bg-brand-bg">
            <Header />
            <p className="mt-8 text-lg text-red-400 font-semibold">{errorMessage}</p>
            <Footer />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Snowflakes />
      <div className="flex-1 flex items-center justify-center px-4 py-12 pb-[env(safe-area-inset-bottom)]">
        <div className="text-center card card-contrast p-8 md:p-12 max-w-xl w-full">
          <Header />
          <DateAndLocation />

          {hasResponded && !showChangeConfirm && (
            <ChangeAnswer
              currentResponse={currentResponse as "Coming" | "Not coming"}
              setShowChangeConfirm={setShowChangeConfirm}
              guestId={guest.id}
            />
          )}

          {(!hasResponded || showChangeConfirm) && (
            <EventConfirmation
              handleResponse={handleResponse}
              submitting={submitting}
              firstName={guest.first_name}
              lastName={guest.last_name}
            />
          )}

          {showChangeConfirm && newResponse && (
            <SelectOption
              handleResponse={handleResponse}
              submitting={submitting}
              setShowChangeConfirm={setShowChangeConfirm}
              setNewResponse={setNewResponse}
            />
          )}

          <Footer />
        </div>
      </div>
    </div>
  );
};
export default HomeContent;
