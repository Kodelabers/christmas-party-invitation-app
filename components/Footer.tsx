export default function Footer() {
  return (
    <footer className="text-center py-6 px-4 mt-auto">
      <p className="text-sm text-gray-300">
        Made with 
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          aria-hidden="true"
          className="inline align-[-2px] mx-1"
        >
          <defs>
            <linearGradient id="footer-heart-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ACBA" />
              <stop offset="50%" stopColor="#00ACBA" />
              <stop offset="50%" stopColor="#B3D342" />
              <stop offset="100%" stopColor="#B3D342" />
            </linearGradient>
          </defs>
          <path fill="url(#footer-heart-gradient)" d="M12 21s-6.716-4.23-9.293-6.808C.828 12.313.5 9.5 2.343 7.657c1.757-1.757 4.6-1.757 6.357 0L12 11l3.3-3.343c1.757-1.757 4.6-1.757 6.357 0 1.843 1.843 1.515 4.656-.364 6.535C18.716 16.77 12 21 12 21z"/>
        </svg>
        by KodeLab & Neyho.
      </p>
    </footer>
  );
}

