import Link from "next/link";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-dark-border bg-dark-bg/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold text-text-primary hover:text-accent transition-colors">
          {title}
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/portfolio" className="text-text-secondary hover:text-accent transition-colors">
            作品集
          </Link>
          <Link href="#projects" className="text-text-secondary hover:text-accent transition-colors">
            项目
          </Link>
          <Link href="#contact" className="text-text-secondary hover:text-accent transition-colors">
            联系我
          </Link>
        </nav>
      </div>
    </header>
  );
}
