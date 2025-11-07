'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { type Response } from '@/lib/supabase';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [response, setResponse] = useState<Response | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const responseParam = searchParams.get('response');
    const emailParam = searchParams.get('email');
    
    if (responseParam && (responseParam === 'Coming' || responseParam === 'Not coming')) {
      setResponse(responseParam as Response);
      setEmail(emailParam);
    } else {
      // Redirect to home if invalid
      router.push('/');
    }
  }, [searchParams, router]);

  if (!response) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-bounce">🎄</div>
      </div>
    );
  }

  const isComing = response === 'Coming';

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="text-center card card-contrast p-8 md:p-12 max-w-xl w-full">
          <Header />
          
          <div className="mt-8 space-y-6">
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

            {email && (
              <div className="mt-6 p-4 rounded-lg bg-brand-card/50 border border-brand-border/50">
                <p className="text-sm text-brand-muted">
                  Confirmation sent to: <span className="text-brand-text font-semibold">{email}</span>
                </p>
              </div>
            )}

            <div className="mt-8">
              <button
                onClick={() => router.push(`/?email=${email || ''}`)}
                className="btn-outline"
              >
                Back to Invitation
              </button>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-bounce">🎄</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

