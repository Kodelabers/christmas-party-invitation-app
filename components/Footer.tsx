export default function Footer() {
  return (
    <footer className="text-center py-6 px-4 mt-6">
      <p className="text-sm text-gray-300">
        Made by Kodelab
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="14"
          height="14"
          aria-hidden="true"
          className="inline align-[-1px] mx-1"
        >
          <defs>
            <linearGradient id="footer-accent-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ACBA" />
              <stop offset="50%" stopColor="#00ACBA" />
              <stop offset="50%" stopColor="#B3D342" />
              <stop offset="100%" stopColor="#B3D342" />
            </linearGradient>
          </defs>
          <line x1="5" y1="5" x2="19" y2="19" stroke="url(#footer-accent-gradient)" strokeWidth="3" strokeLinecap="round" />
          <line x1="19" y1="5" x2="5" y2="19" stroke="url(#footer-accent-gradient)" strokeWidth="3" strokeLinecap="round" />
        </svg>
        Neyho.
      </p>
    </footer>
  );
}

