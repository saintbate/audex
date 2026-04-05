"use client";

const STEPS = [
  {
    num: "01",
    title: "Ingest",
    description:
      "We pull every 10-K and 10-Q from SEC EDGAR — full text, structured XBRL data, and 8-K event filings. Documents are parsed into structured sections automatically.",
    detail: "SEC EDGAR → Filing Text + XBRL + 8-K Events",
  },
  {
    num: "02",
    title: "Extract & Verify",
    description:
      "AI extracts every quantitative claim from the document, then deterministic checks verify each claim against the company's own XBRL structured data. Bank-specific mappings prevent false positives for financial companies.",
    detail: "LLM extraction + deterministic XBRL verification",
  },
  {
    num: "03",
    title: "Cross-Reference",
    description:
      "Every claim is checked against every other claim in the filing, against 4+ years of historical filings, and against management's own narrative language. Contradictions are flagged with severity and confidence.",
    detail: "Internal + Temporal + Tone analysis across documents",
  },
  {
    num: "04",
    title: "Score & Classify",
    description:
      "Each document receives a sector-calibrated reliability score. Scores combine anomaly detection, document quality, momentum trends, and management transparency into a single structured output — accessible via API.",
    detail: "Anomaly · Quality · Momentum · Confidence → Reliability Tier",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How it works</h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Seven analysis layers. Structured output. Every filing, every quarter.
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
