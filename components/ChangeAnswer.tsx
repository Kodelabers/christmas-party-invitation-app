"use client";

import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

type ChangeAnswerProps = {
    email: string | null;
    currentResponse: "Coming" | "Not coming";
    setShowChangeConfirm: Dispatch<SetStateAction<boolean>>;
}

const ChangeAnswer = ({email, currentResponse, setShowChangeConfirm}: ChangeAnswerProps) => {

    const router = useRouter();

  return (
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
  )
}
export default ChangeAnswer