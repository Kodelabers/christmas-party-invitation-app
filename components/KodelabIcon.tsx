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
        <linearGradient id="logo-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#07101B" />
          <stop offset="100%" stopColor="#0B1220" />
        </linearGradient>
      </defs>
      <rect x="16" y="16" width="480" height="480" rx="128" fill="url(#logo-bg)" />
      {/* Left chevron */}
      <path d="M220 160 L140 256 L220 352" fill="none" stroke="#00ACBA" strokeWidth="64" strokeLinecap="round" strokeLinejoin="round" />
      {/* Right chevron */}
      <path d="M292 160 L372 256 L292 352" fill="none" stroke="#B3D342" strokeWidth="64" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

