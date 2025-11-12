"use client";

type DeleteConfirmModalProps = {
  isOpen: boolean;
  email: string;
  guestName?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
};

const DeleteConfirmModal = ({
  isOpen,
  email,
  guestName,
  onConfirm,
  onCancel,
  isDeleting = false,
}: DeleteConfirmModalProps) => {
  if (!isOpen) return null;

  const displayName = guestName || email;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div className="relative card card-contrast p-6 md:p-8 max-w-md w-full z-10 transform transition-all">
        <div className="text-center">
          {/* Warning Icon */}
          <div className="mx-auto w-16 h-16 rounded-full bg-red-400/20 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="36"
              height="36"
              fill="none"
              stroke="#f87171"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-brand-text mb-2">
            Delete Guest?
          </h3>
          
          <p className="text-brand-muted mb-1">
            Are you sure you want to delete
          </p>
          <p className="text-brand-text font-semibold mb-6 break-all">
            {displayName}
          </p>
          <p className="text-sm text-brand-muted mb-6">
            This action cannot be undone.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onCancel}
              disabled={isDeleting}
              className="btn-outline flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="px-6 py-3 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;

