export default function LogoIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="logo-bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#061320" />
          <stop offset="100%" stopColor="#0B2330" />
        </linearGradient>
        <linearGradient id="logo-accent-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ACBA" />
          <stop offset="100%" stopColor="#B3D342" />
        </linearGradient>
      </defs>

      <rect x="32" y="32" width="448" height="448" rx="120" fill="url(#logo-bg-gradient)" />
      <path
        d="M180 176 L120 256 L180 336"
        stroke="#00E6D2"
        strokeWidth="26"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M332 176 L392 256 L332 336"
        stroke="#7CF3E6"
        strokeWidth="26"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <g stroke="url(#logo-accent-gradient)" strokeWidth="18" strokeLinecap="round">
        <line x1="256" y1="180" x2="256" y2="332" />
        <line x1="222" y1="208" x2="290" y2="304" />
        <line x1="290" y1="208" x2="222" y2="304" />
        <line x1="256" y1="220" x2="256" y2="292" strokeWidth="10" />
      </g>

      <circle cx="256" cy="128" r="24" fill="url(#logo-accent-gradient)" opacity="0.75" />
      <circle cx="256" cy="384" r="20" fill="#00E6D2" opacity="0.5" />
    </svg>
  );
}

