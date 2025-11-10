"use client";

import { supabase } from "@/lib/supabase";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ChangeAnswer from "./ChangeAnswer";
import DateAndLocation from "./DateAndLocation";
import EventConfirmation from "./EventConfirmation";
import Footer from "./Footer";
import Header from "./Header";
import LogoIcon from "./LogoIcon";
import SelectOption from "./SelectOption";
import Snowflakes from "./Snowflakes";

const HomeContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentResponse, setCurrentResponse] = useState<"Coming" | "Not coming" | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showChangeConfirm, setShowChangeConfirm] = useState(false);
  const [newResponse, setNewResponse] = useState<string | null>(null);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
      ensureInvite(emailParam);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const ensureInvite = async (emailToEnsure: string) => {
    try {
      const nowIso = new Date().toISOString();
      await supabase
        .from("responses")
        .upsert(
          { email: emailToEnsure, response: null, updated_at: nowIso },
          { onConflict: "email", ignoreDuplicates: true }
        );

      const { data, error } = await supabase
        .from("responses")
        .select("*")
        .eq("email", emailToEnsure)
        .single();

      if (error) throw error;
      setCurrentResponse(data?.response ?? null);
    } catch (error) {
      console.error("Error ensuring invite:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (response: string) => {
    if (!email) return;

    // If user already responded, show confirmation
    if (currentResponse !== null && !showChangeConfirm) {
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
        .eq("email", email);

      if (error) throw error;

      // Redirect to success page
      router.push(`/success?response=${response}&email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error("Error saving response:", error);
      alert("Greška pri čuvanju odgovora. Molimo pokušajte ponovo.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Snowflakes />
        <div className="flex-1 flex items-center justify-center">
          <LogoIcon className="w-24 h-24 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Snowflakes />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="text-center card card-contrast p-8 md:p-12 max-w-xl w-full">
          <Header />
          <DateAndLocation />

          {currentResponse !== null && !showChangeConfirm ? (
            <ChangeAnswer
              email={email}
              currentResponse={currentResponse}
              setShowChangeConfirm={setShowChangeConfirm}
            />
          ) : (
            <EventConfirmation
              handleResponse={handleResponse}
              submitting={submitting}
              email={email}
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
