'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase, type Response } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<Response | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showChangeConfirm, setShowChangeConfirm] = useState(false);
  const [newResponse, setNewResponse] = useState<Response | null>(null);

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
      checkEmail(emailParam);
    } else {
      setLoading(false);
      setIsValid(false);
    }
  }, [searchParams]);

  const checkEmail = async (emailToCheck: string) => {
    try {
      const { data, error } = await supabase
        .from('responses')
        .select('*')
        .eq('email', emailToCheck)
        .single();

      if (error || !data) {
        setIsValid(false);
      } else {
        setIsValid(true);
        setCurrentResponse(data.response);
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setIsValid(false);
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (response: Response) => {
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
        .from('responses')
        .update({
          response,
          updated_at: new Date().toISOString(),
        })
        .eq('email', email);

      if (error) throw error;

      // Redirect to success page
      router.push(`/success?response=${response}&email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error('Error saving response:', error);
      alert('Greška pri čuvanju odgovora. Molimo pokušajte ponovo.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-bounce">🎄</div>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center card p-8 max-w-md w-full">
            <Header />
            <div className="mt-8">
              <p className="text-xl md:text-2xl text-red-400 font-semibold mb-2">
                This invitation is not valid 🎁
              </p>
              <p className="text-brand-muted">Please contact the organizers if you believe this is a mistake.</p>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="text-center card card-contrast p-8 md:p-12 max-w-xl w-full">
          <Header />
          
          {currentResponse !== null && !showChangeConfirm ? (
            <div className="mt-8 space-y-6">
              <p className="text-xl md:text-2xl text-brand-text font-semibold mb-6">
                You already responded: {currentResponse === 'Coming' ? 'Yes' : 'No'}. 
                Do you want to change your answer?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setShowChangeConfirm(true)}
                  className="btn-primary"
                >
                  Yes, change my answer
                </button>
                <button
                  onClick={() => {
                    if (email && currentResponse) {
                      router.push(`/success?response=${currentResponse}&email=${encodeURIComponent(email)}`);
                    }
                  }}
                  className="btn-outline"
                >
                  No, keep my answer
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              <h2 className="text-2xl md:text-3xl text-brand-text font-bold mb-2">
                Are you coming to the party?
              </h2>
              <p className="text-base md:text-lg text-brand-muted mb-6">
                Please let us know if you'll join the celebration.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => handleResponse('Coming')}
                  disabled={submitting}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleResponse('Not coming')}
                  disabled={submitting}
                  className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  No
                </button>
              </div>
              
              {submitting && (
                <p className="text-brand-muted mt-3">Saving your response...</p>
              )}
            </div>
          )}

          {showChangeConfirm && newResponse && (
            <div className="mt-8 space-y-6">
              <p className="text-xl md:text-2xl text-brand-text font-semibold mb-6">
                Choose your new response:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => handleResponse('Coming')}
                  disabled={submitting}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleResponse('Not coming')}
                  disabled={submitting}
                  className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  No
                </button>
              </div>
              <button
                onClick={() => {
                  setShowChangeConfirm(false);
                  setNewResponse(null);
                }}
                className="text-brand-muted hover:text-brand-text underline mt-4 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-bounce">🎄</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}

