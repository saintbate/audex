"use client";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <svg
            width="18"
            height="18"
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
          <span className="font-mono text-xs text-muted">AUDEX</span>
        </div>

        <p className="text-xs text-muted text-center max-w-md">
          Audex produces verified assertions from SEC filings for research
          purposes. Not financial advice. A product of Vertical AI LLC.
        </p>

        <span className="text-xs text-muted">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
