import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Record — Audex",
  description:
    "Backtested across 97 S&P 500 companies and 4 market regimes. Buy-Sell spread of +23.4pp.",
};

const BACKTEST_DATA = [
  { signal: "High Reliability", count: 8, alpha: "+3.06%", hitRate: "62.5%", avgReturn: "+14.2%", color: "text-green" },
  { signal: "Low Risk", count: 14, alpha: "+16.94%", hitRate: "57.1%", avgReturn: "+22.8%", color: "text-green" },
  { signal: "Baseline", count: 89, alpha: "-9.95%", hitRate: "—", avgReturn: "+4.3%", color: "text-muted" },
  { signal: "Elevated Risk", count: 32, alpha: "-5.45%", hitRate: "59.4%", avgReturn: "-1.2%", color: "text-red-dim" },
  { signal: "Critical Risk", count: 15, alpha: "-9.29%", hitRate: "66.7%", avgReturn: "-5.1%", color: "text-red" },
];

const WINDOWS = [
  { period: "2022 H1", regime: "Bear Market", sellAlpha: "-12.3%", buyAlpha: "+8.1%", spread: "+20.4pp" },
  { period: "2022 H2", regime: "Recovery", sellAlpha: "-7.8%", buyAlpha: "+11.2%", spread: "+19.0pp" },
  { period: "2023", regime: "Bull Rally", sellAlpha: "-8.1%", buyAlpha: "+19.4%", spread: "+27.5pp" },
  { period: "2024", regime: "Consolidation", sellAlpha: "-9.5%", buyAlpha: "+16.9%", spread: "+26.4pp" },
];

const STATS = [
  { label: "Companies Analyzed", value: "97" },
  { label: "Total Observations", value: "158" },
  { label: "Market Regimes", value: "4" },
  { label: "Buy-Sell Spread", value: "+23.4pp" },
  { label: "Risk Flag Hit Rate", value: "66%" },
  { label: "Avg Risk Alpha vs SPY", value: "-9.5%" },
];

export default function TrackRecordPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-muted hover:text-foreground transition-colors">
            <span className="font-mono text-sm">&larr;</span>
            <span className="font-mono text-sm font-semibold tracking-wider">AUDEX</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-muted">
            <Link href="/leaderboard" className="hover:text-foreground transition-colors">Leaderboard</Link>
            <Link href="/#api" className="bg-accent text-background px-4 py-1.5 rounded font-medium hover:bg-accent-dim transition-colors">
              API
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Track Record</h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Backtested across 97 S&P 500 companies and 4 market regimes.
            Elevated and critical risk filings averaged{" "}
            <span className="text-red font-mono font-semibold">-9.5% alpha</span> vs SPY
            with a{" "}
            <span className="text-accent font-mono font-semibold">66% hit rate</span>.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
          {STATS.map((s) => (
            <div key={s.label} className="border border-border rounded-lg bg-surface p-5 text-center">
              <div className="text-2xl font-mono font-bold text-accent">{s.value}</div>
              <div className="text-xs text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">Signal Performance (12-Month Holding Period)</h2>
          <div className="border border-border rounded-lg bg-surface overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-2">
              <div className="h-3 w-3 rounded-full bg-red/60" />
              <div className="h-3 w-3 rounded-full bg-amber/60" />
              <div className="h-3 w-3 rounded-full bg-green/60" />
              <span className="ml-3 text-xs font-mono text-muted">backtest_results.csv — 158 observations</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[10px] font-mono text-muted border-b border-border uppercase tracking-wider">
                    <th className="px-6 py-3">Signal</th>
                    <th className="px-6 py-3 text-right">Count</th>
                    <th className="px-6 py-3 text-right">12M Alpha vs SPY</th>
                    <th className="px-6 py-3 text-right">Avg Return</th>
                    <th className="px-6 py-3 text-right">Hit Rate</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-sm">
                  {BACKTEST_DATA.map((row) => (
                    <tr key={row.signal} className="border-b border-border/50 hover:bg-surface-2 transition-colors">
                      <td className={`px-6 py-4 ${row.color}`}>{row.signal}</td>
                      <td className="px-6 py-4 text-right text-muted">{row.count}</td>
                      <td className={`px-6 py-4 text-right font-bold ${row.color}`}>{row.alpha}</td>
                      <td className={`px-6 py-4 text-right ${row.color}`}>{row.avgReturn}</td>
                      <td className="px-6 py-4 text-right text-muted">{row.hitRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">Performance Across Market Regimes</h2>
          <div className="border border-border rounded-lg bg-surface overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[10px] font-mono text-muted border-b border-border uppercase tracking-wider">
                    <th className="px-6 py-3">Period</th>
                    <th className="px-6 py-3">Regime</th>
                    <th className="px-6 py-3 text-right">Sell Alpha</th>
                    <th className="px-6 py-3 text-right">Buy Alpha</th>
                    <th className="px-6 py-3 text-right">Spread</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-sm">
                  {WINDOWS.map((w) => (
                    <tr key={w.period} className="border-b border-border/50 hover:bg-surface-2 transition-colors">
                      <td className="px-6 py-4">{w.period}</td>
                      <td className="px-6 py-4 text-muted">{w.regime}</td>
                      <td className="px-6 py-4 text-right text-red">{w.sellAlpha}</td>
                      <td className="px-6 py-4 text-right text-green">{w.buyAlpha}</td>
                      <td className="px-6 py-4 text-right font-bold text-accent">{w.spread}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 border-t border-border bg-surface-2">
              <p className="text-xs font-mono text-muted">
                Alpha = return vs SPY over same holding period. Spread = Buy alpha minus Sell alpha.
                Signal separation holds across all tested regimes.
              </p>
            </div>
          </div>
        </div>

        <div className="border border-accent/20 rounded-lg bg-surface p-8 text-center">
          <h3 className="text-lg font-bold mb-2">Access this data programmatically</h3>
          <p className="text-muted text-sm mb-6">
            All Audex data is available via public JSON API and MCP server.
          </p>
          <Link
            href="/#api"
            className="inline-block bg-accent text-background px-8 py-3 rounded-lg font-semibold hover:bg-accent-dim transition-colors"
          >
            Explore the API
          </Link>
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-muted">
            Past performance does not guarantee future results. Audex provides automated analysis for informational purposes only. Not financial advice.
          </p>
        </div>
      </main>
    </div>
  );
}
