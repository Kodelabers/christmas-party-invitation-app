import { Dispatch, SetStateAction } from "react";
import { type Response } from "@/lib/supabase";

type SelectOptionProps = {
  handleResponse: (response: Response) => Promise<void>;
  submitting: boolean;
  setShowChangeConfirm: Dispatch<SetStateAction<boolean>>;
  setNewResponse: Dispatch<SetStateAction<Response | null>>;
};

const SelectOption = ({
  handleResponse,
  submitting,
  setShowChangeConfirm,
  setNewResponse,
}: SelectOptionProps) => {
  return (
    <div className="mt-8 space-y-6">
      <p className="text-xl md:text-2xl text-brand-text font-semibold mb-6">Choose your new response:</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => handleResponse("Coming")}
          disabled={submitting}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed relative"
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            "Yes"
          )}
        </button>
        <button
          onClick={() => handleResponse("Not coming")}
          disabled={submitting}
          className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed relative"
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            "No"
          )}
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
  );
};
export default SelectOption;
