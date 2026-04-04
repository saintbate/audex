"use client";

const BACKTEST_DATA = [
  { signal: "Strong Buy", n: 5, alpha: "+25.6%", hitRate: "80.0%", color: "text-green" },
  { signal: "Buy", n: 17, alpha: "-2.0%", hitRate: "41.2%", color: "text-muted" },
  { signal: "Hold", n: 93, alpha: "-5.5%", hitRate: "—", color: "text-muted" },
  { signal: "Sell", n: 66, alpha: "-9.9%", hitRate: "66.7%", color: "text-red" },
  {
    signal: "Strong Sell",
    n: 49,
    alpha: "-16.3%",
    hitRate: "69.4%",
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
            Backtested across 97 S&P 500 companies and 5 filing windows.
            Strong signals separate by{" "}
            <span className="text-accent font-mono font-semibold">
              +41.9pp
            </span>
            . Strong Sell averaged{" "}
            <span className="text-red font-mono font-semibold">
              -16.3% alpha
            </span>{" "}
            vs SPY with a 69% hit rate.
          </p>
        </div>

        <div className="border border-border rounded-lg bg-surface overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-2">
            <div className="h-3 w-3 rounded-full bg-red/60" />
            <div className="h-3 w-3 rounded-full bg-amber/60" />
            <div className="h-3 w-3 rounded-full bg-green/60" />
            <span className="ml-3 text-xs font-mono text-muted">
              backtest_results.csv — 230 observations, 12-month holding period
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-mono text-muted border-b border-border">
                  <th className="px-6 py-3">SIGNAL</th>
                  <th className="px-6 py-3 text-right">N</th>
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
                    <td className="px-6 py-4 text-right text-muted">
                      {row.n}
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
              Hit rate = % where signal direction matched 12-month outcome vs
              SPY. Data: 2020–2026, 5 filing windows, multiple market regimes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
