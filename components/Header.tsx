import LogoIcon from './LogoIcon';
import NeyhoLogo from './NeyhoLogo';

export default function Header({ showLogos = true }: { showLogos?: boolean }) {
  return (
    <header className="text-center py-4">
      {showLogos && (
        <div className="flex items-center justify-around mb-8">
          <LogoIcon className="w-20 h-16" />
          <NeyhoLogo className="w-20 h-20 ml-1 opacity-90" />
        </div>
      )}
      <div className="flex items-center justify-center gap-3">
        <h1 className="text-4xl md:text-4xl font-extrabold tracking-tight ">
        Božićni Disco Party II
        </h1>
      </div>
      <p className="mt-4 text-base md:text-[16px] text-gray-400">
        A Christmas celebration party by KodeLab & Neyho
      </p>
    </header>
  );
}

