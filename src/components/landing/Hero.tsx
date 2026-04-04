"use client";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 mb-8">
          <span className="h-2 w-2 rounded-full bg-green animate-pulse" />
          <span className="text-xs font-mono text-muted">
            LIVE — SCANNING Q1 2026 FILINGS
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
          AI that reads SEC filings
          <br />
          <span className="text-accent">
            and finds what doesn&apos;t add up
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Our multi-pass verification engine cross-references every claim in a
          company&apos;s 10-K and 10-Q filings. When the numbers contradict each
          other, we flag it — before the market does.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#flags"
            className="bg-accent text-background px-8 py-3 rounded-lg font-semibold hover:bg-accent-dim transition-colors text-lg"
          >
            See Latest Red Flags
          </a>
          <a
            href="#signup"
            className="border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-surface transition-colors text-lg"
          >
            Get the Free Weekly Report
          </a>
        </div>

        {/* Stat bar */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-accent">
              97
            </div>
            <div className="text-xs text-muted mt-1">Companies Scanned</div>
          </div>
          <div className="h-8 w-px bg-border hidden sm:block" />
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-red">
              37
            </div>
            <div className="text-xs text-muted mt-1">Red Flags Issued</div>
          </div>
          <div className="h-8 w-px bg-border hidden sm:block" />
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-foreground">
              15,799
            </div>
            <div className="text-xs text-muted mt-1">Checks Performed</div>
          </div>
          <div className="h-8 w-px bg-border hidden sm:block" />
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-green">
              66%
            </div>
            <div className="text-xs text-muted mt-1">Sell Hit Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
