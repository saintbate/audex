"use client";

const BACKTEST_DATA = [
  { signal: "Strong Buy", alpha: "+3.06%", hitRate: "—", color: "text-green" },
  { signal: "Buy", alpha: "+16.94%", hitRate: "57.1%", color: "text-green" },
  { signal: "Hold", alpha: "-9.95%", hitRate: "—", color: "text-muted" },
  { signal: "Sell", alpha: "-5.45%", hitRate: "—", color: "text-red" },
  {
    signal: "Strong Sell",
    alpha: "-9.29%",
    hitRate: "33.3%*",
    color: "text-red",
  },
];

export default function BacktestProof() {
  return (
    <section id="proof" className="py-20 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            The signal is real
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Backtested across 97 S&P 500 companies and 4 market regimes.
            Buy-Sell spread of{" "}
            <span className="text-accent font-mono font-semibold">
              +23.4pp
            </span>
            . Sell signals averaged{" "}
            <span className="text-red font-mono font-semibold">
              -9.5% alpha
            </span>{" "}
            vs SPY.
          </p>
        </div>

        <div className="border border-border rounded-lg bg-surface overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-2">
            <div className="h-3 w-3 rounded-full bg-red/60" />
            <div className="h-3 w-3 rounded-full bg-amber/60" />
            <div className="h-3 w-3 rounded-full bg-green/60" />
            <span className="ml-3 text-xs font-mono text-muted">
              backtest_results.csv — 158 observations
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-mono text-muted border-b border-border">
                  <th className="px-6 py-3">SIGNAL</th>
                  <th className="px-6 py-3 text-right">12M ALPHA VS SPY</th>
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
              * Strong Sell hit rate = % that underperformed SPY at 12-month
              mark. Data: 2022–2025, multiple filing windows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
