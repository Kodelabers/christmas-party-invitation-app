import LogoIcon from './LogoIcon';

export default function Header() {
  return (
    <header className="text-center py-4">
      <div className="flex items-center justify-center gap-3">
        <LogoIcon className="w-12 h-12" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#00CCBB]">
          CodeMas
        </h1>
      </div>
      <p className="mt-4 text-base md:text-[16px] text-gray-400">
        A Christmas celebration party by KodeLab & Neyho
      </p>
    </header>
  );
}

