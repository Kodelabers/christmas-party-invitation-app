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
    <div className="text-xl md:text-2xl text-brand-text font-semibold mb-6 leading-snug">
      <p>You already responded:</p>
      <p className={`${currentResponse === 'Coming' ? 'text-[#00E6D2]' : 'text-[#F87171]'}`}>
        {currentResponse === 'Coming' ? 'Yes' : 'No'}
      </p>
      <p>Do you want to change your answer?</p>
    </div>
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