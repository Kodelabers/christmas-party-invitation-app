import { type Response } from "@/lib/supabase";

type EventConfirmationProps = {
  handleResponse: (response: Response) => Promise<void>;
  submitting: boolean;
  firstName?: string | null;
  lastName?: string | null;
};

const EventConfirmation = ({ handleResponse, submitting, firstName, lastName }: EventConfirmationProps) => {
  const displayName = [firstName, lastName].filter(Boolean).join(" ").trim();

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl md:text-3xl text-brand-text font-bold mb-2">
        {displayName ? `${displayName}, are you coming to the party?` : "Are you coming to the party?"}
      </h2>
      <p className="text-base md:text-lg text-brand-muted mb-6">
        {"Please let us know if you'll join the celebration."}
      </p>

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
    </div>
  );
};
export default EventConfirmation;
