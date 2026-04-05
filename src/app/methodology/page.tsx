import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology — Audex",
  description:
    "How Audex analyzes SEC filings. Seven-layer verification engine with bank-aware accounting, sector calibration, and management tone analysis.",
};

const PIPELINE = [
  {
    pass: "1",
    name: "Claim Extraction",
    method: "LLM",
    detail:
      "Reads every section of a 10-K or 10-Q filing and extracts structured financial claims: " +
      "revenue, EPS, debt, equity, cash flow, with period context and confidence scores. " +
      "Claims become the atoms that every subsequent layer operates on.",
  },
  {
    pass: "2",
    name: "Internal Cross-Reference",
    method: "LLM",
    detail:
      "Compares extracted claims against each other within the same filing. Catches arithmetic " +
      "errors (segment totals exceeding consolidated), section contradictions (Item 7 says one " +
      "thing, Item 8 says another), and internal consistency failures.",
  },
  {
    pass: "2b",
    name: "Deterministic XBRL Verification",
    method: "Deterministic",
    detail:
      "Programmatic comparison of LLM-extracted claims against XBRL structured data filed with " +
      "the SEC. Weighted 1.5x in scoring because XBRL is ground truth. Bank-aware: uses " +
      "sector-specific mappings and wider thresholds for financial companies.",
  },
  {
    pass: "3",
    name: "Temporal Cross-Reference",
    method: "LLM",
    detail:
      "Compares trends across 4+ years of filings for the same company. Detects deteriorating " +
      "metrics that management doesn't address, trend reversals, and narrative inconsistencies " +
      "across time.",
  },
  {
    pass: "5",
    name: "Explanation Check",
    method: "LLM",
    detail:
      "For filings with failed checks, evaluates whether the MD&A section or recent 8-K filings " +
      "provide adequate explanation. A discrepancy explained by a disclosed acquisition or " +
      "restatement is less concerning than one that's never mentioned.",
  },
  {
    pass: "6",
    name: "Management Tone Analysis",
    method: "Deterministic",
    detail:
      "Analyzes MD&A sections for hedging language density (\"approximately\", \"may\", " +
      "\"subject to\"), numeric specificity, and overall management transparency. Companies " +
      "with evasive language and low specificity get a penalty. Zero LLM cost.",
  },
  {
    pass: "4",
    name: "Programmatic Scoring",
    method: "Deterministic",
    detail:
      "Computes anomaly, quality, and momentum scores from all check results. Applies " +
      "sector-relative z-score adjustment, ISA 320/SAB 99–grounded sector tolerance, " +
      "and management tone modifier. Classifies composite risk signal.",
  },
];

const TOLERANCES = [
  { sector: "Financials", mult: "2.5x", basis: "ISA 320 total-assets materiality basis" },
  { sector: "Industrials", mult: "2.0x", basis: "SAB 99 M&A/spinoff structural noise" },
  { sector: "Real Estate", mult: "1.5x", basis: "NAREIT FFO vs GAAP reporting gap" },
  { sector: "Information Technology", mult: "1.2x", basis: "Revenue recognition complexity" },
  { sector: "Consumer Discretionary", mult: "1.2x", basis: "Seasonal reporting adjustment" },
];

const SIGNALS = [
  { signal: "Critical Risk", criteria: "risk >= 35 AND anomaly >= 40", color: "text-red", bg: "bg-red/10" },
  { signal: "Elevated Risk", criteria: "risk >= 20 OR (anomaly >= 30 AND quality < 30)", color: "text-red-dim", bg: "bg-red/5" },
  { signal: "Baseline", criteria: "Does not meet low-risk or elevated-risk criteria", color: "text-muted", bg: "bg-surface-2" },
  { signal: "Low Risk", criteria: "risk <= 8 AND quality >= 55 AND anomaly < 22", color: "text-green-dim", bg: "bg-green/5" },
  { signal: "High Reliability", criteria: "risk <= 3 AND quality >= 70 AND anomaly < 12", color: "text-green", bg: "bg-green/10" },
];

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-4xl flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-muted hover:text-foreground transition-colors">
            <span className="font-mono text-sm">&larr;</span>
            <span className="font-mono text-sm font-semibold tracking-wider">AUDEX</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-muted">
            <Link href="/leaderboard" className="hover:text-foreground transition-colors">Leaderboard</Link>
            <Link href="/track-record" className="hover:text-foreground transition-colors">Track Record</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Methodology</h1>
          <p className="text-muted text-lg leading-relaxed max-w-3xl">
            Audex uses a seven-layer analysis pipeline to verify SEC filings.
            Three layers use LLMs for nuanced language understanding. Four layers
            are fully deterministic for reproducibility. Every score is traceable
            to specific checks against specific filing text.
          </p>
        </div>

        {/* Pipeline */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">The Seven-Layer Pipeline</h2>
          <div className="space-y-6">
            {PIPELINE.map((p) => (
              <div key={p.pass} className="border border-border rounded-lg bg-surface p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-accent/10 text-accent text-xs font-mono font-bold">
                    {p.pass}
                  </span>
                  <h3 className="text-lg font-bold">{p.name}</h3>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    p.method === "Deterministic"
                      ? "bg-green/10 text-green border border-green/20"
                      : "bg-accent/10 text-accent border border-accent/20"
                  }`}>
                    {p.method}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Scoring */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Scoring</h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="border border-border rounded-lg bg-surface p-6">
              <h3 className="font-bold mb-2">Anomaly Score <span className="text-muted font-normal text-sm">(0-100)</span></h3>
              <p className="text-sm text-muted leading-relaxed">
                Severity-weighted penalty from all checks. Higher = more red flags.
                Includes bank accounting filter, period-mismatch filter, sector-relative
                z-score adjustment, and management tone modifier (up to ±15%).
              </p>
            </div>
            <div className="border border-border rounded-lg bg-surface p-6">
              <h3 className="font-bold mb-2">Quality Score <span className="text-muted font-normal text-sm">(0-100)</span></h3>
              <p className="text-sm text-muted leading-relaxed">
                Weighted pass rate of internal checks. Higher = cleaner filing.
                Deterministic XBRL checks weighted 1.5x. Explained discrepancies
                receive partial credit.
              </p>
            </div>
            <div className="border border-border rounded-lg bg-surface p-6">
              <h3 className="font-bold mb-2">Momentum Score <span className="text-muted font-normal text-sm">(0-100)</span></h3>
              <p className="text-sm text-muted leading-relaxed">
                Weighted improving/stable/deteriorating trends from temporal
                cross-reference across 4+ years of filings. Used as tiebreaker
                to shift signal ±1 level.
              </p>
            </div>
            <div className="border border-border rounded-lg bg-surface p-6">
              <h3 className="font-bold mb-2">Confidence <span className="text-muted font-normal text-sm">(0-100%)</span></h3>
              <p className="text-sm text-muted leading-relaxed">
                Based on XBRL coverage ratio and total check volume. Companies with
                more deterministic checks receive higher confidence. Low coverage
                means we&apos;re relying more on LLM analysis.
              </p>
            </div>
          </div>

          <div className="border border-border rounded-lg bg-surface p-6 mb-8">
            <h3 className="font-bold mb-2">Risk Formula</h3>
            <div className="bg-background rounded p-4 font-mono text-sm text-accent">
              risk = anomaly_score × (1 − quality_score / 100)
            </div>
            <p className="text-sm text-muted mt-3 leading-relaxed">
              A company with anomaly=50 and quality=80 has risk=10 (most discrepancies are
              well-explained). A company with anomaly=50 and quality=20 has risk=40 (the
              discrepancies are real and unexplained).
            </p>
          </div>
        </section>

        {/* Signal Classification */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Reliability Classification</h2>
          <div className="border border-border rounded-lg bg-surface overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[10px] font-mono text-muted border-b border-border uppercase tracking-wider">
                  <th className="px-6 py-3">Signal</th>
                  <th className="px-6 py-3">Criteria</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {SIGNALS.map((s) => (
                  <tr key={s.signal} className="border-b border-border/50">
                    <td className={`px-6 py-4 font-mono font-bold ${s.color}`}>{s.signal}</td>
                    <td className="px-6 py-4 font-mono text-muted">{s.criteria}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted mt-3">
            Momentum shifts signal ±1 level: momentum &ge; 60 improves signal, momentum &le; 20 worsens it.
          </p>
        </section>

        {/* Sector Calibration */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Sector Calibration</h2>
          <p className="text-muted mb-6 text-sm leading-relaxed">
            Different sectors have structurally different reporting patterns. Applying the same
            thresholds to a REIT and a tech company produces false positives. Our sector tolerance
            multipliers are grounded in established auditing standards.
          </p>
          <div className="border border-border rounded-lg bg-surface overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[10px] font-mono text-muted border-b border-border uppercase tracking-wider">
                  <th className="px-6 py-3">Sector</th>
                  <th className="px-6 py-3 text-right">Tolerance</th>
                  <th className="px-6 py-3">Basis</th>
                </tr>
              </thead>
              <tbody className="text-sm font-mono">
                {TOLERANCES.map((t) => (
                  <tr key={t.sector} className="border-b border-border/50">
                    <td className="px-6 py-4">{t.sector}</td>
                    <td className="px-6 py-4 text-right font-bold text-accent">{t.mult}</td>
                    <td className="px-6 py-4 text-muted text-xs">{t.basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bank Awareness */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Bank-Aware Accounting</h2>
          <p className="text-muted mb-6 text-sm leading-relaxed">
            Banks are structurally different from commercial companies. Revenue means interest income,
            not contract revenue. Debt includes deposits. Equity definitions differ. Without specialized
            handling, every bank filing triggers false positives.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Separate XBRL mappings — skips revenue and debt checks for banks",
              "Wider thresholds — 5/10/25/50% vs standard 2/5/15/30%",
              "Equity type detection — prioritizes CommonStockholdersEquity",
              "Structural mismatch filter — catches par value, deposits, segment reconciliation patterns",
            ].map((feature) => (
              <div key={feature} className="border border-border rounded-lg bg-surface p-4">
                <p className="text-sm text-muted">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        {/* API */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">API Access</h2>
          <p className="text-muted mb-6 text-sm leading-relaxed">
            All Audex data is available via a public JSON API. No authentication required.
          </p>
          <div className="space-y-3">
            {[
              { endpoint: "GET /api/v1/companies", desc: "All companies with scores, signals, and findings. Filterable by sector and signal." },
              { endpoint: "GET /api/v1/company?ticker=AAPL", desc: "Single company full assessment detail." },
              { endpoint: "GET /api/v1/signals", desc: "Companies grouped by signal type. Filter with ?signal=sell" },
              { endpoint: "GET /api/v1/methodology", desc: "Machine-readable version of this page." },
              { endpoint: "GET /api/feed", desc: "Red flag feed — all companies ranked by anomaly score." },
            ].map((api) => (
              <div key={api.endpoint} className="border border-border rounded-lg bg-surface p-4 flex flex-col sm:flex-row sm:items-center gap-2">
                <code className="text-xs font-mono text-accent bg-background px-2 py-1 rounded shrink-0">
                  {api.endpoint}
                </code>
                <span className="text-sm text-muted">{api.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Honest Limitations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Known Limitations</h2>
          <div className="border border-amber/20 rounded-lg bg-surface p-6 space-y-3">
            {[
              "Low risk / high reliability tiers indicate clean filings, not investment recommendations.",
              "3 of 7 analysis layers use LLMs, which introduces non-determinism between runs.",
              "Currently covers 97 S&P 500 companies, not the full index.",
              "Analysis runs in batch, not real-time (EDGAR monitor in development).",
              "Some MD&A sections are very short, limiting tone analysis effectiveness.",
            ].map((limitation, i) => (
              <p key={i} className="text-sm text-muted leading-relaxed">
                <span className="text-amber font-mono mr-2">*</span>{limitation}
              </p>
            ))}
          </div>
        </section>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-xs text-muted mb-4">
            Questions about our methodology? Reach out at the link below.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/leaderboard" className="text-accent text-sm font-mono hover:underline">
              View Rankings &rarr;
            </Link>
            <Link href="/track-record" className="text-accent text-sm font-mono hover:underline">
              Track Record &rarr;
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
