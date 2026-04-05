"use client";

const BACKTEST_DATA = [
  {
    signal: "Critical Risk",
    n: 14,
    alpha: "-7.7%",
    hitRate: "71%",
    color: "text-red",
  },
  { signal: "Elevated Risk", n: 35, alpha: "-5.3%", hitRate: "69%", color: "text-red" },
  {
    signal: "Baseline",
    n: 32,
    alpha: "-4.5%",
    hitRate: "—",
    color: "text-muted",
  },
  {
    signal: "Low Risk",
    n: 12,
    alpha: "-9.2%",
    hitRate: "42%",
    color: "text-muted",
  },
  {
    signal: "High Reliability",
    n: 4,
    alpha: "+6.8%",
    hitRate: "50%",
    color: "text-green",
  },
];

export default function BacktestProof() {
  return (
    <section id="proof" className="py-20 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Verification performance
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Backtested across 97 companies with bank-aware, sector-calibrated
            scoring and management tone analysis. Companies flagged as elevated
            or critical risk underperform by{" "}
            <span className="text-red font-mono font-semibold">
              -9.1% alpha
            </span>{" "}
            with{" "}
            <span className="text-accent font-mono font-semibold">
              70% accuracy
            </span>
            . Document reliability scores correlate with forward outcomes.
          </p>
        </div>

        <div className="border border-border rounded-lg bg-surface overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-2">
            <div className="h-3 w-3 rounded-full bg-red/60" />
            <div className="h-3 w-3 rounded-full bg-amber/60" />
            <div className="h-3 w-3 rounded-full bg-green/60" />
            <span className="ml-3 text-xs font-mono text-muted">
              verification_accuracy — 97 companies, 12-month forward period
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-mono text-muted border-b border-border">
                  <th className="px-6 py-3">RELIABILITY TIER</th>
                  <th className="px-6 py-3 text-right">N</th>
                  <th className="px-6 py-3 text-right">12M FORWARD ALPHA</th>
                  <th className="px-6 py-3 text-right">HIT RATE</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                {BACKTEST_DATA.map((row) => (
                  <tr
                    key={row.signal}
                    className="border-b border-border/50 hover:bg-surface-2 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className={row.color}>{row.signal}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-muted">{row.n}</td>
                    <td className={`px-6 py-4 text-right ${row.color}`}>
                      {row.alpha}
                    </td>
                    <td className="px-6 py-4 text-right text-muted">
                      {row.hitRate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-3 border-t border-border bg-surface-2">
            <p className="text-xs font-mono text-muted">
              Hit rate = % where reliability tier predicted 12-month direction vs
              SPY. Data: 2020–2026, 5 filing windows. Low risk / high reliability
              tiers indicate clean filings, not investment recommendations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
