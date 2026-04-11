"use client";

const LAYERS = [
  {
    num: "1",
    name: "Structured Extraction",
    tech: "Anthropic Claude + Pydantic v2",
    description:
      "3x multi-pass extraction at temperature=0. Every LLM output parsed into a typed Pydantic model. If it can't be parsed, it's a reject. Consensus scoring across passes.",
  },
  {
    num: "2",
    name: "Mathematical Consistency",
    tech: "Pure Python",
    description:
      "Balance sheet equation holds. Segment revenues sum to consolidated total. Income statement flows consistently. No LLM involvement — deterministic arithmetic only.",
  },
  {
    num: "3",
    name: "XBRL Ground Truth",
    tech: "SEC EDGAR XBRL API",
    description:
      "Every extracted value cross-referenced against the company's own XBRL-tagged data. XBRL is treated as canonical. Discrepancies produce a reject with the exact delta.",
  },
  {
    num: "4",
    name: "Multi-Pass Consensus",
    tech: "Divergence scoring",
    description:
      "Field-level agreement across all extraction runs. Claims where any numeric value disagrees across passes are flagged with the specific divergence.",
  },
  {
    num: "5",
    name: "Domain Rules Engine",
    tech: "Extensible Python rules",
    description:
      "Growing library of GAAP-specific verification rules. Revenue recognition consistency, segment completeness, asset positivity. Rules are append-only and versioned.",
  },
  {
    num: "6",
    name: "SMT Constraint Verification",
    tech: "Z3 theorem prover",
    description:
      "Formal mathematical proof that the set of extracted claims is internally consistent. Z3 returns an unsat core when constraints conflict — identifying exactly which claims are in tension.",
  },
];

export default function Architecture() {
  return (
    <section className="py-20 px-6 bg-surface-2/50">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          The 6-layer verification stack
        </h2>
        <p className="text-muted mb-10">
          A claim that fails any layer is rejected with a specific,
          machine-readable reason code. No layer trusts the layer above it.
          LLMs live only in Layer 1 — everything else is deterministic.
        </p>

        <div className="space-y-1">
          {LAYERS.map((layer) => (
            <div
              key={layer.num}
              className="flex gap-5 p-5 rounded-lg hover:bg-surface transition-colors group"
            >
              <div className="shrink-0">
                <div className="h-9 w-9 rounded bg-surface-2 border border-border flex items-center justify-center font-mono text-sm text-accent group-hover:border-accent/50 transition-colors">
                  {layer.num}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 mb-1.5 flex-wrap">
                  <h3 className="text-base font-semibold">{layer.name}</h3>
                  <span className="font-mono text-xs text-accent/60">
                    {layer.tech}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  {layer.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 border border-border rounded-lg bg-surface p-6">
          <h3 className="font-semibold mb-2">What the output looks like</h3>
          <p className="text-sm text-muted leading-relaxed mb-4">
            Every claim produces a{" "}
            <code className="text-accent text-xs bg-surface-2 px-1.5 py-0.5 rounded">
              VerifiedAssertion
            </code>{" "}
            or{" "}
            <code className="text-accent text-xs bg-surface-2 px-1.5 py-0.5 rounded">
              RejectedClaim
            </code>{" "}
            — never a probability without context. Each includes the full audit
            trail: every layer result, the raw LLM responses from all 3
            extraction passes, the XBRL ground truth values used for comparison,
            which rules triggered, and a confidence score with a traceable
            decomposition.
          </p>
          <p className="text-sm text-muted leading-relaxed">
            This audit trail is the product. It&apos;s what separates a
            probabilistic signal from a defensible claim.
          </p>
        </div>
      </div>
    </section>
  );
}
