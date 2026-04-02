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
    anomaly: 57,
    quality: 9,
    signal: "STRONG SELL",
    sector: "Utilities",
    filingDate: "Feb 26, 2026",
    filingType: "10-K",
    topFinding:
      "Revenue up 91% but margins only improved 15%. SDG&E recorded $651M regulatory charge.",
  },
  {
    ticker: "UNH",
    anomaly: 49,
    quality: 26,
    signal: "SELL",
    sector: "Health Care",
    filingDate: "Mar 2, 2026",
    filingType: "10-K",
    topFinding:
      "Segment revenues exceed consolidated total by $173B. Medical Care Ratio deteriorated 710bps since 2022.",
  },
  {
    ticker: "DUK",
    anomaly: 44,
    quality: 21,
    signal: "STRONG SELL",
    sector: "Utilities",
    filingDate: "Feb 26, 2026",
    filingType: "10-K",
    topFinding:
      "Segment revenues exceed total by $6.5B (20%). Segment net income discrepancy of $2B (41%).",
  },
  {
    ticker: "TMO",
    anomaly: 41,
    quality: 20,
    signal: "STRONG SELL",
    sector: "Health Care",
    filingDate: "Feb 26, 2026",
    filingType: "10-K",
    topFinding:
      "COVID testing revenue collapsed 97%. Life Sciences margins compressed from 50%+ to 32%.",
  },
  {
    ticker: "LOW",
    anomaly: 38,
    quality: 20,
    signal: "STRONG SELL",
    sector: "Consumer Discretionary",
    filingDate: "Mar 23, 2026",
    filingType: "10-K",
    topFinding:
      "Negative shareholder equity ($9.9B deficit). Comp sales declining: -4.3% to -7.4% across quarters.",
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
    <div className="border border-border rounded-lg bg-surface p-5 hover:border-accent/30 transition-colors">
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
    </div>
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
          <p className="text-sm text-muted">
            21 companies analyzed · 9 flagged · 3,574 checks performed
          </p>
        </div>
      </div>
    </section>
  );
}
