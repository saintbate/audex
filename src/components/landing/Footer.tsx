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
            <path d="M12 3L22 21H2L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M12 10L16.5 18.5H7.5L12 10Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" opacity="0.4" />
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
