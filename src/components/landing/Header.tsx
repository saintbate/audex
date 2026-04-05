"use client";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-accent"
          >
            <path d="M12 2.5A9.5 9.5 0 0 1 19.2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M21.5 12A9.5 9.5 0 0 1 18 19.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 21.5A9.5 9.5 0 0 1 4.8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2.5 12A9.5 9.5 0 0 1 6 4.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            <line x1="12" y1="0.5" x2="12" y2="3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12" y1="20.5" x2="12" y2="23.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="0.5" y1="12" x2="3.5" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="20.5" y1="12" x2="23.5" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="font-mono text-sm font-semibold tracking-wider text-foreground">
            AUDEX
          </span>
        </a>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-muted">
          <a href="/leaderboard" className="hover:text-foreground transition-colors">
            Leaderboard
          </a>
          <a href="/methodology" className="hover:text-foreground transition-colors">
            Methodology
          </a>
          <a href="/track-record" className="hover:text-foreground transition-colors">
            Track Record
          </a>
          <a
            href="#api"
            className="bg-accent text-background px-4 py-1.5 rounded font-medium hover:bg-accent-dim transition-colors"
          >
            API
          </a>
        </nav>
      </div>
    </header>
  );
}
