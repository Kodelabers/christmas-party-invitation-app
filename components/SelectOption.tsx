import React, { Dispatch, SetStateAction } from 'react'

type SelectOptionProps = {
    handleResponse:  (response: string) => Promise<void>;
    submitting: boolean;
    setShowChangeConfirm: Dispatch<SetStateAction<boolean>>;
    setNewResponse: Dispatch<SetStateAction<string | null>>;

}

const SelectOption = ({handleResponse, submitting, setShowChangeConfirm, setNewResponse}: SelectOptionProps) => {
  return (
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
  )
}

export default SelectOption