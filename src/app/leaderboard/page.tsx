import { getDb } from "@/lib/db";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard — Audex",
  description:
    "All companies ranked by anomaly score. See which SEC filings have the most red flags.",
};

interface Report {
  ticker: string;
  sector: string;
  anomaly_score: number;
  quality_score: number;
  momentum_score: number;
  overall_signal: string;
  filing_type: string;
  filing_date: string;
  checks_total: number;
  checks_failed: number;
}

function signalBadge(signal: string) {
  const label = signal.replace(/_/g, " ").toUpperCase();
  if (signal.includes("strong_sell"))
    return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red/15 text-red border border-red/30">{label}</span>;
  if (signal.includes("sell"))
    return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red/10 text-red-dim border border-red/20">{label}</span>;
  if (signal.includes("strong_buy"))
    return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-green/15 text-green border border-green/30">{label}</span>;
  if (signal.includes("buy"))
    return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-green/10 text-green-dim border border-green/20">{label}</span>;
  return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-surface-2 text-muted border border-border">{label}</span>;
}

function scoreColor(score: number, inverted = false) {
  if (inverted) {
    if (score <= 25) return "text-red";
    if (score <= 50) return "text-amber";
    return "text-green";
  }
  if (score >= 40) return "text-red";
  if (score >= 25) return "text-amber";
  return "text-green";
}

export default async function LeaderboardPage() {
  const sql = getDb();

  const reports = (await sql`
    SELECT ticker, sector, anomaly_score, quality_score, momentum_score,
           overall_signal, filing_type, filing_date, checks_total, checks_failed
    FROM published_reports
    ORDER BY anomaly_score DESC
  `) as unknown as Report[];

  const strongSells = reports.filter((r) => r.overall_signal === "strong_sell");
  const sells = reports.filter((r) => r.overall_signal === "sell");
  const holds = reports.filter((r) => r.overall_signal === "hold");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-muted hover:text-foreground transition-colors">
            <span className="font-mono text-sm">&larr;</span>
            <span className="font-mono text-sm font-semibold tracking-wider">AUDEX</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-muted">
            <Link href="/track-record" className="hover:text-foreground transition-colors">Track Record</Link>
            <Link href="/#signup" className="bg-accent text-background px-4 py-1.5 rounded font-medium hover:bg-accent-dim transition-colors">
              Get the Report
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Company Rankings</h1>
          <p className="text-muted">
            {reports.length} companies ranked by anomaly score. Q1 2026 SEC filings.
          </p>
        </div>

        <div className="flex gap-4 mb-8 text-sm font-mono">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red" />
            <span className="text-muted">Strong Sell ({strongSells.length})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red/50" />
            <span className="text-muted">Sell ({sells.length})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-surface-2 border border-border" />
            <span className="text-muted">Hold ({holds.length})</span>
          </div>
        </div>

        <div className="border border-border rounded-lg bg-surface overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-2">
            <div className="h-3 w-3 rounded-full bg-red/60" />
            <div className="h-3 w-3 rounded-full bg-amber/60" />
            <div className="h-3 w-3 rounded-full bg-green/60" />
            <span className="ml-3 text-xs font-mono text-muted">
              leaderboard.csv — {reports.length} companies
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[10px] font-mono text-muted border-b border-border uppercase tracking-wider">
                  <th className="px-4 py-3 w-10">#</th>
                  <th className="px-4 py-3">Ticker</th>
                  <th className="px-4 py-3">Sector</th>
                  <th className="px-4 py-3 text-right">Anomaly</th>
                  <th className="px-4 py-3 text-right">Quality</th>
                  <th className="px-4 py-3 text-center">Signal</th>
                  <th className="px-4 py-3 text-right">Checks</th>
                  <th className="px-4 py-3 text-right">Failed</th>
                  <th className="px-4 py-3">Filed</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                {reports.map((r, i) => (
                  <tr
                    key={r.ticker}
                    className="border-b border-border/30 hover:bg-surface-2 transition-colors"
                  >
                    <td className="px-4 py-3 text-muted">{i + 1}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/company/${r.ticker}`}
                        className="font-bold hover:text-accent transition-colors"
                      >
                        ${r.ticker}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted text-xs">{r.sector}</td>
                    <td className={`px-4 py-3 text-right font-bold ${scoreColor(r.anomaly_score)}`}>
                      {Math.round(r.anomaly_score)}
                    </td>
                    <td className={`px-4 py-3 text-right ${scoreColor(r.quality_score, true)}`}>
                      {Math.round(r.quality_score)}
                    </td>
                    <td className="px-4 py-3 text-center">{signalBadge(r.overall_signal)}</td>
                    <td className="px-4 py-3 text-right text-muted">{r.checks_total}</td>
                    <td className={`px-4 py-3 text-right ${r.checks_failed > 10 ? "text-red" : "text-muted"}`}>
                      {r.checks_failed}
                    </td>
                    <td className="px-4 py-3 text-muted text-xs">{String(r.filing_date).slice(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-muted">
            Data from Q1 2026 SEC filings. Scores generated by Audex multi-pass verification engine. Not financial advice.
          </p>
        </div>
      </main>
    </div>
  );
}
