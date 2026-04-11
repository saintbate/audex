"use client";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 mb-8">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="text-xs font-mono text-muted">
            PRE-RELEASE — SEEKING EARLY TESTERS
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-8">
          Verification infrastructure
          <br />
          <span className="text-accent">for financial claims</span>
        </h1>

        <div className="text-lg text-muted leading-relaxed max-w-2xl space-y-4 mb-12">
          <p>
            Audex is a neurosymbolic verification engine for SEC filings. It
            extracts financial claims using an LLM, then routes every output
            through a deterministic verification stack — mathematical consistency
            checks, XBRL taxonomy validation, multi-pass consensus scoring, and
            Z3 constraint solving — before emitting a verified assertion with a
            full audit trail.
          </p>
          <p>
            The product is not a dashboard or a score. It is a{" "}
            <span className="text-foreground font-medium">
              verified assertion with a traceable reject reason
            </span>{" "}
            — something defensible enough to act on.
          </p>
        </div>

        <div className="border border-border rounded-lg bg-surface overflow-hidden mb-12">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-2">
            <div className="h-3 w-3 rounded-full bg-red/60" />
            <div className="h-3 w-3 rounded-full bg-amber/60" />
            <div className="h-3 w-3 rounded-full bg-green/60" />
            <span className="ml-3 text-xs font-mono text-muted">
              audex verify AAPL
            </span>
          </div>

          <div className="p-5 font-mono text-[13px] leading-relaxed overflow-x-auto">
            <div className="text-muted mb-3">
              Fetching latest 10-K for AAPL...<br />
              Filing: 0000320193-25-000079 | Period: CY2025<br />
              Running 6-layer verification pipeline...
            </div>
            <div className="space-y-1">
              <div>
                <span className="text-muted">us-gaap:Assets</span>
                <span className="float-right">
                  <span className="text-foreground">$359.2B</span>
                  {"  "}
                  <span className="text-green">VERIFIED</span>
                  {"  "}
                  <span className="text-muted">✓ XBRL Δ=0.0000%</span>
                </span>
              </div>
              <div>
                <span className="text-muted">us-gaap:Liabilities</span>
                <span className="float-right">
                  <span className="text-foreground">$285.5B</span>
                  {"  "}
                  <span className="text-green">VERIFIED</span>
                  {"  "}
                  <span className="text-muted">✓ XBRL Δ=0.0000%</span>
                </span>
              </div>
              <div>
                <span className="text-muted">us-gaap:StockholdersEquity</span>
                <span className="float-right">
                  <span className="text-foreground">$73.7B</span>
                  {"  "}
                  <span className="text-green">VERIFIED</span>
                  {"  "}
                  <span className="text-muted">✓ XBRL Δ=0.0000%</span>
                </span>
              </div>
              <div>
                <span className="text-muted">us-gaap:Revenues</span>
                <span className="float-right">
                  <span className="text-foreground">$416.2B</span>
                  {"  "}
                  <span className="text-green">VERIFIED</span>
                  {"  "}
                  <span className="text-muted">✓ XBRL Δ=0.0000%</span>
                </span>
              </div>
              <div>
                <span className="text-muted">us-gaap:NetIncomeLoss</span>
                <span className="float-right">
                  <span className="text-foreground">$112.0B</span>
                  {"  "}
                  <span className="text-green">VERIFIED</span>
                  {"  "}
                  <span className="text-muted">✓ XBRL Δ=0.0000%</span>
                </span>
              </div>
            </div>
            <div className="mt-3 text-muted text-xs">
              14 claims · 8 verified · 6 flagged · 0 rejected · 72.9s
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-4">
          <a
            href="#access"
            className="bg-accent text-background px-8 py-3 rounded-lg font-semibold hover:bg-accent-dim transition-colors"
          >
            Request Early Access
          </a>
        </div>
      </div>
    </section>
  );
}
