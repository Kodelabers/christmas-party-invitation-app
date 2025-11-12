"use client";

import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

type ChangeAnswerProps = {
    currentResponse: "Coming" | "Not coming";
    setShowChangeConfirm: Dispatch<SetStateAction<boolean>>;
  guestId: string;
};

const ChangeAnswer = ({ currentResponse, setShowChangeConfirm, guestId }: ChangeAnswerProps) => {
    const router = useRouter();

  const handleKeepAnswer = () => {
    router.push(`/success?id=${guestId}&response=${currentResponse}`);
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="text-xl md:text-2xl text-brand-text font-semibold mb-6 leading-snug">
        <p>You already responded:</p>
        <p className={currentResponse === "Coming" ? "text-[#B3D342]" : "text-red-400"}>
          {currentResponse === "Coming" ? "Yes" : "No"}
        </p>
        <p>Do you want to change your answer?</p>
      </div>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button onClick={() => setShowChangeConfirm(true)} className="btn-primary">
        Yes, change my answer
      </button>
        <button onClick={handleKeepAnswer} className="btn-outline">
        No, keep my answer
      </button>
    </div>
  </div>
  );
};
export default ChangeAnswer;
