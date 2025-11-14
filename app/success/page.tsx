'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LogoIcon from '@/components/KodelabIcon';
import Snowflakes from '@/components/Snowflakes';
import { EVENT_ADDRESS_TEXT, EVENT_DATE_TEXT } from '@/lib/constants';
import { supabase, type Response } from '@/lib/supabase';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(EVENT_ADDRESS_TEXT)}`;

type GuestSummary = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [response, setResponse] = useState<Response | null>(null);
  const [guest, setGuest] = useState<GuestSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const responseParam = searchParams.get('response');
    const idParam = searchParams.get('id');

    if (!responseParam || !['Coming', 'Not coming'].includes(responseParam)) {
      router.push('/');
      return;
    }

    setResponse(responseParam as Response);

    if (!idParam) {
      router.push('/');
      return;
    }

    const fetchGuest = async () => {
      try {
        const { data, error } = await supabase
          .from('responses')
          .select('id, first_name, last_name, email')
          .eq('id', idParam)
          .single();

        if (error || !data) {
          setErrorMessage('This invitation link is invalid or has expired.');
          return;
        }

        setGuest(data as GuestSummary);
      } catch (error) {
        console.error('Error loading guest for success page:', error);
        setErrorMessage('Unable to load your response at this time.');
      } finally {
        setLoading(false);
      }
    };

    fetchGuest();
  }, [searchParams, router]);

  const changeResponse = async () => {
    console.log("Change response triggered");
    router.push(`/${guest?.id ?? ''}`);
  };

  if (!response || loading) {
    return (
      <div className="min-h-[100dvh] flex flex-col">
        <Snowflakes />
        <div className="flex-1 flex items-center justify-center">
          <LogoIcon className="w-24 h-24 animate-pulse" />
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-[100dvh] flex flex-col">
        <Snowflakes />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center card card-contrast p-8 md:p-12 max-w-lg w-full">
            <Header />
            <p className="mt-8 text-lg text-red-400 font-semibold">{errorMessage}</p>
            <Footer />
          </div>
        </div>
      </div>
    );
  }

  const isComing = response === 'Coming';

  return (
    <div className="h-[calc(100dvh)] flex flex-col">
      <Snowflakes />
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 flex items-start justify-center px-4 py-12 pb-[calc(1rem+env(safe-area-inset-bottom))] overflow-y-auto">
          <div className="text-center card card-contrast p-8 md:p-12 max-w-xl w-full my-auto mb-4 md:mb-0">
            <Header />
            {isComing && guest && (
              <p className="mt-4 text-lg text-brand-text font-semibold">
                {[guest.first_name, guest.last_name].filter(Boolean).join(" ") || guest.email}, click on the button below to get the directions.
              </p>
            )}
            
            
            <div className="mt-8 space-y-6">
              {isComing && (
                <div className="rounded-lg border border-brand-border/50 bg-brand-card/40 p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-sm text-brand-muted text-center">Date & Time</p>
                      <p className="text-base text-brand-text font-semibold text-center">{EVENT_DATE_TEXT}</p>
                    </div>
                    <div>
                      <p className="text-sm text-brand-muted text-center">Address</p>
                      <p className="text-base text-brand-text font-semibold text-center">{EVENT_ADDRESS_TEXT}</p>
                    </div>
                  </div>
                  <div className="mt-8 text-center">
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary"
                    >
                      Directions
                    </a>
                  </div>
                </div>
              )}

              <div className="flex justify-center mb-6">
                {isComing ? (
                  <div className="w-20 h-20 rounded-full bg-brand-primary/20 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="48"
                      height="48"
                      fill="none"
                      stroke="#00E6D2"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-red-400/20 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="48"
                      height="48"
                      fill="none"
                      stroke="#f87171"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </div>
                )}
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">
                {isComing ? "We're excited to see you!" : "Thank you for letting us know"}
              </h2>
              
              <p className="text-lg md:text-xl text-brand-muted mb-8">
                {isComing
                  ? "We've received your response. We're looking forward to see you at the party!"
                  : "We've received your response. We'll miss you at the party, but thank you for taking the time to let us know."}
              </p>

              <div className="mt-8">
                <button
                  onClick={() => changeResponse()}
                  className="btn-outline hover:border-solid hover:border-[#00C4B4] transition"
                >
                  Change response
                </button>
              </div>
            </div>

            <div className="mt-8 pb-4">
              <Footer />
            </div>
          </div>
        </div>
        <div className="h-[max(1rem,env(safe-area-inset-bottom))] flex-shrink-0"></div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[100dvh] flex flex-col">
        <Snowflakes />
        <div className="flex-1 flex items-center justify-center">
          <LogoIcon className="w-24 h-24 animate-pulse" />
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}