import React from 'react'

type EventConfirmationProps = {
    handleResponse: (response: string) => Promise<void>
    submitting: boolean;
    email: string | null;
}

const EventConfirmation = ({handleResponse, submitting, email} : EventConfirmationProps) => {

if (!email) {
    return (
        <>
            <p className='text-base md:text-lg text-brand-muted mb-6'> Missing email address! </p>
        </>
    )
}

  return (
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
  )
}

export default EventConfirmation