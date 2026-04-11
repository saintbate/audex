"use client";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-4xl flex items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-accent"
          >
            <path d="M12 3L22 21H2L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M12 10L16.5 18.5H7.5L12 10Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" opacity="0.4" />
          </svg>
          <span className="font-mono text-sm font-semibold tracking-wider text-foreground">
            AUDEX
          </span>
        </a>
        <a
          href="#access"
          className="text-sm text-muted hover:text-foreground transition-colors font-mono"
        >
          Request Early Access
        </a>
      </div>
    </header>
  );
}
