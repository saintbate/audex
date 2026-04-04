"use client";

interface FlagData {
  ticker: string;
  anomaly: number;
  quality: number;
  signal: string;
  sector: string;
  filingDate: string;
  filingType: string;
  topFinding: string;
}

const FLAGS: FlagData[] = [
  {
    ticker: "SRE",
    anomaly: 46,
    quality: 15,
    signal: "STRONG SELL",
    sector: "Utilities",
    filingDate: "Feb 26, 2026",
    filingType: "10-K",
    topFinding:
      "Net income differs from XBRL by $122M (16.7%). Revenue discrepancy unexplained in MD&A despite acquisition activity.",
  },
  {
    ticker: "D",
    anomaly: 44,
    quality: 15,
    signal: "STRONG SELL",
    sector: "Utilities",
    filingDate: "Feb 23, 2026",
    filingType: "10-K",
    topFinding:
      "Continuing operations income ($3,012M) exceeds total net income ($2,998M) — logically inconsistent across multiple periods.",
  },
  {
    ticker: "VLO",
    anomaly: 37,
    quality: 20,
    signal: "STRONG SELL",
    sector: "Energy",
    filingDate: "Feb 25, 2026",
    filingType: "10-K",
    topFinding:
      "Segment operating income ($4,258M) exceeds company total ($3,181M) by $1.1B. Impairment charge not fully reconciled.",
  },
  {
    ticker: "DUK",
    anomaly: 34,
    quality: 32,
    signal: "SELL",
    sector: "Utilities",
    filingDate: "Feb 26, 2026",
    filingType: "10-K",
    topFinding:
      "Multiple conflicting EPS values across sections. Operating income gap partially explained by regulatory accounting.",
  },
  {
    ticker: "PSX",
    anomaly: 34,
    quality: 32,
    signal: "SELL",
    sector: "Energy",
    filingDate: "Feb 20, 2026",
    filingType: "10-K",
    topFinding:
      "AOCL reconciliation gap — OCI components don't bridge year-over-year. Tax breakdown doesn't sum to reported total.",
  },
  {
    ticker: "AMT",
    anomaly: 34,
    quality: 35,
    signal: "SELL",
    sector: "Real Estate",
    filingDate: "Feb 24, 2026",
    filingType: "10-K",
    topFinding:
      "Revenue discrepancy between sections partially explained by REIT structure, but $185M XBRL mismatch remains unexplained.",
  },
  {
    ticker: "XEL",
    anomaly: 30,
    quality: 40,
    signal: "SELL",
    sector: "Utilities",
    filingDate: "Feb 25, 2026",
    filingType: "10-K",
    topFinding:
      "Segment revenue reconciliation gaps across regulated utility subsidiaries. Rate case impacts not fully bridged.",
  },
  {
    ticker: "ORCL",
    anomaly: 28,
    quality: 39,
    signal: "SELL",
    sector: "Information Technology",
    filingDate: "Mar 11, 2026",
    filingType: "10-Q",
    topFinding:
      "Cloud revenue recognition timing creates quarter-over-quarter inconsistencies in deferred revenue bridge.",
  },
  {
    ticker: "WFC",
    anomaly: 25,
    quality: 33,
    signal: "SELL",
    sector: "Financials",
    filingDate: "Feb 20, 2026",
    filingType: "10-K",
    topFinding:
      "Net interest income components don't reconcile to reported NII total. Provision for credit losses methodology shift.",
  },
];

function ScoreBar({ score, max = 100 }: { score: number; max?: number }) {
  const pct = (score / max) * 100;
  const color =
    score >= 40 ? "bg-red" : score >= 25 ? "bg-amber" : "bg-green";

  return (
    <div className="flex items-center gap-2">
      <div className="w-24 h-1.5 bg-surface-2 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-sm font-semibold">{score}</span>
    </div>
  );
}

function SignalBadge({ signal }: { signal: string }) {
  const isStrong = signal.includes("STRONG");
  const isSell = signal.includes("SELL");

  const bg = isSell
    ? isStrong
      ? "bg-red/15 text-red border-red/30"
      : "bg-red/10 text-red-dim border-red/20"
    : "bg-green/10 text-green border-green/20";

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${bg}`}
    >
      {signal}
    </span>
  );
}

function FlagCard({ flag }: { flag: FlagData }) {
  return (
    <a href={`/company/${flag.ticker}`} className="block border border-border rounded-lg bg-surface p-5 hover:border-accent/30 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-lg font-bold">${flag.ticker}</span>
            <SignalBadge signal={flag.signal} />
          </div>
          <div className="text-xs text-muted">
            {flag.sector} · {flag.filingType} · {flag.filingDate}
          </div>
        </div>
      </div>

      <div className="flex gap-6 mb-4">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted mb-1">
            Anomaly
          </div>
          <ScoreBar score={flag.anomaly} />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted mb-1">
            Quality
          </div>
          <ScoreBar score={flag.quality} />
        </div>
      </div>

      <p className="text-sm text-muted leading-relaxed">{flag.topFinding}</p>
    </a>
  );
}

export default function RecentFlags() {
  return (
    <section id="flags" className="py-20 px-6 bg-surface-2/50">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              Latest Red Flags
            </h2>
            <p className="text-muted">
              From Q1 2026 SEC filings. Updated as companies file.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted">
            <span className="h-2 w-2 rounded-full bg-green animate-pulse" />
            LIVE
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FLAGS.map((flag) => (
            <FlagCard key={flag.ticker} flag={flag} />
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted mb-4">
            97 companies analyzed · 15 flagged · 6,778 checks performed
          </p>
          <a
            href="/leaderboard"
            className="text-accent text-sm font-mono hover:underline"
          >
            View all company rankings &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
