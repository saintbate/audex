import { getDb } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

interface Finding {
  finding: string;
  severity: string;
  impact: string;
}

interface Report {
  ticker: string;
  sector: string;
  filing_type: string;
  filing_date: string;
  anomaly_score: number;
  quality_score: number;
  momentum_score: number;
  overall_signal: string;
  summary: string;
  key_findings: Finding[];
  checks_total: number;
  checks_failed: number;
  published_at: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ticker: string }>;
}): Promise<Metadata> {
  const { ticker } = await params;
  const t = ticker.toUpperCase();
  return {
    title: `$${t} — Audex Filing Analysis`,
    description: `AI-powered SEC filing analysis for ${t}. Anomaly score, quality score, and key findings from the latest filing.`,
  };
}

function signalColor(signal: string) {
  if (signal.includes("critical_risk")) return "text-red";
  if (signal.includes("elevated_risk")) return "text-red-dim";
  if (signal.includes("high_reliability")) return "text-green";
  if (signal.includes("low_risk")) return "text-green-dim";
  return "text-muted";
}

function signalBg(signal: string) {
  if (signal.includes("critical_risk")) return "bg-red/15 border-red/30 text-red";
  if (signal.includes("elevated_risk")) return "bg-red/10 border-red/20 text-red-dim";
  if (signal.includes("high_reliability")) return "bg-green/15 border-green/30 text-green";
  if (signal.includes("low_risk")) return "bg-green/10 border-green/20 text-green-dim";
  return "bg-surface-2 border-border text-muted";
}

function severityColor(severity: string) {
  if (severity === "critical") return "text-red";
  if (severity === "major") return "text-amber";
  return "text-muted";
}

function ScoreGauge({ label, score, inverted = false }: { label: string; score: number; inverted?: boolean }) {
  const color = inverted
    ? score <= 25 ? "bg-red" : score <= 50 ? "bg-amber" : "bg-green"
    : score >= 40 ? "bg-red" : score >= 25 ? "bg-amber" : "bg-green";

  return (
    <div className="flex-1 min-w-[120px]">
      <div className="text-[10px] uppercase tracking-wider text-muted mb-2">{label}</div>
      <div className="text-3xl font-mono font-bold mb-2">{Math.round(score)}</div>
      <div className="w-full h-2 bg-surface-2 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  const sql = getDb();
  const t = ticker.toUpperCase();

  const rows = await sql`
    SELECT * FROM published_reports WHERE ticker = ${t} ORDER BY filing_date DESC LIMIT 1
  `;

  if (rows.length === 0) notFound();

  const raw = rows[0] as Record<string, unknown>;
  const report: Report = {
    ...raw,
    filing_date: raw.filing_date instanceof Date
      ? raw.filing_date.toISOString().slice(0, 10)
      : String(raw.filing_date).slice(0, 10),
    published_at: String(raw.published_at),
  } as Report;
  const signal = report.overall_signal.replace(/_/g, " ").toUpperCase();
  const findings: Finding[] = typeof report.key_findings === "string"
    ? JSON.parse(report.key_findings)
    : report.key_findings || [];

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
            <Link href="/track-record" className="hover:text-foreground transition-colors">Track Record</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-mono font-bold">${t}</h1>
              <span className={`inline-flex items-center px-3 py-1 rounded text-xs font-mono font-bold border ${signalBg(report.overall_signal)}`}>
                {signal}
              </span>
            </div>
            <div className="text-sm text-muted">
              {report.sector} &middot; {report.filing_type} &middot; Filed {report.filing_date}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-12 p-6 border border-border rounded-lg bg-surface">
          <ScoreGauge label="Anomaly Score" score={report.anomaly_score} />
          <ScoreGauge label="Quality Score" score={report.quality_score} inverted />
          <ScoreGauge label="Momentum" score={report.momentum_score} inverted />
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <div className="border border-border rounded-lg bg-surface p-5 text-center">
            <div className="text-2xl font-mono font-bold">{report.checks_total}</div>
            <div className="text-xs text-muted mt-1">Checks Run</div>
          </div>
          <div className="border border-border rounded-lg bg-surface p-5 text-center">
            <div className={`text-2xl font-mono font-bold ${report.checks_failed > 10 ? "text-red" : "text-amber"}`}>
              {report.checks_failed}
            </div>
            <div className="text-xs text-muted mt-1">Checks Failed</div>
          </div>
          <div className="border border-border rounded-lg bg-surface p-5 text-center">
            <div className={`text-2xl font-mono font-bold ${signalColor(report.overall_signal)}`}>
              {signal}
            </div>
            <div className="text-xs text-muted mt-1">Overall Signal</div>
          </div>
        </div>

        {findings.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6">Key Findings</h2>
            <div className="space-y-4">
              {findings.map((f, i) => (
                <div key={i} className="border border-border rounded-lg bg-surface p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${severityColor(f.severity)}`}>
                      {f.severity}
                    </span>
                    {f.impact === "negative" && (
                      <span className="text-[10px] font-mono text-red/60">NEGATIVE IMPACT</span>
                    )}
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{f.finding}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-border pt-8 text-center">
          <p className="text-xs text-muted mb-4">
            Analysis generated by Audex multi-pass verification engine. Not financial advice.
          </p>
          <Link
            href="/leaderboard"
            className="text-accent text-sm font-mono hover:underline"
          >
            View all company rankings &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
