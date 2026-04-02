"use client";

const STEPS = [
  {
    num: "01",
    title: "Ingest",
    description:
      "We pull every 10-K and 10-Q from SEC EDGAR the moment it's filed. Full text, structured data, and XBRL financials.",
    detail: "SEC EDGAR → Filing Text + XBRL",
  },
  {
    num: "02",
    title: "Extract",
    description:
      "AI reads every section — MD&A, financial statements, risk factors — and extracts all quantitative claims with their sources.",
    detail: "LLM → 200+ claims per filing",
  },
  {
    num: "03",
    title: "Cross-Reference",
    description:
      "Every number is checked against every other number in the filing, then against historical filings. Revenue in the MD&A should match the income statement. Cash flow trends should match earnings trends.",
    detail: "Internal + Temporal verification",
  },
  {
    num: "04",
    title: "Score",
    description:
      "Each company gets an anomaly score based on what doesn't add up. High anomaly + low quality = red flag. The score is deterministic — no LLM opinion, just math.",
    detail: "Anomaly · Quality · Momentum → Signal",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How it works</h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Four automated passes. Every filing. Every quarter.
          </p>
        </div>

        <div className="space-y-1">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="flex gap-6 p-6 rounded-lg hover:bg-surface transition-colors group"
            >
              <div className="shrink-0">
                <div className="h-10 w-10 rounded bg-surface-2 border border-border flex items-center justify-center font-mono text-sm text-accent group-hover:border-accent/50 transition-colors">
                  {step.num}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted leading-relaxed mb-2">
                  {step.description}
                </p>
                <span className="font-mono text-xs text-accent/70">
                  {step.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
