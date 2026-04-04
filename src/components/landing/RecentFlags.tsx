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
    ticker: "D",
    anomaly: 56,
    quality: 11,
    signal: "STRONG SELL",
    sector: "Utilities",
    filingDate: "Feb 23, 2026",
    filingType: "10-K",
    topFinding:
      "Continuing operations income ($3,012M) exceeds total net income ($2,998M) — logically inconsistent. Management tone score 70 — moderate transparency. Confidence: 90%.",
  },
  {
    ticker: "SRE",
    anomaly: 55,
    quality: 13,
    signal: "STRONG SELL",
    sector: "Utilities",
    filingDate: "Feb 26, 2026",
    filingType: "10-K",
    topFinding:
      "Net income differs from XBRL by $122M (16.7%). Deterministic check confirms. Management tone score 60 — above-average hedging language in MD&A. Confidence: 90%.",
  },
  {
    ticker: "VLO",
    anomaly: 44,
    quality: 21,
    signal: "STRONG SELL",
    sector: "Energy",
    filingDate: "Feb 25, 2026",
    filingType: "10-K",
    topFinding:
      "Segment operating income ($4,258M) exceeds company total ($3,181M) by $1.1B. Programmatic XBRL check confirms mismatch. Confidence: 80%.",
  },
  {
    ticker: "JNJ",
    anomaly: 44,
    quality: 9,
    signal: "STRONG SELL",
    sector: "Health Care",
    filingDate: "Feb 12, 2026",
    filingType: "10-K",
    topFinding:
      "Lowest quality score in universe (9). FY ends January — fiscal-adjusted comparison shows elevated anomaly vs Health Care peers. Confidence: 80%.",
  },
  {
    ticker: "DUK",
    anomaly: 42,
    quality: 27,
    signal: "STRONG SELL",
    sector: "Utilities",
    filingDate: "Feb 26, 2026",
    filingType: "10-K",
    topFinding:
      "Multiple conflicting EPS values across sections. Momentum score 7.1 signals deteriorating trend. Deterministic checks confirm revenue gap.",
  },
  {
    ticker: "WELL",
    anomaly: 40,
    quality: 16,
    signal: "SELL",
    sector: "Real Estate",
    filingDate: "Feb 19, 2026",
    filingType: "10-K",
    topFinding:
      "Multiple revenue recognition inconsistencies. Management tone score 14 — highest hedging language density in universe. Sector tolerance applied (1.5x REIT). Confidence: 80%.",
  },
  {
    ticker: "ORCL",
    anomaly: 39,
    quality: 31,
    signal: "STRONG SELL",
    sector: "Information Technology",
    filingDate: "Mar 11, 2026",
    filingType: "10-Q",
    topFinding:
      "Cloud revenue recognition timing inconsistencies. Deferred revenue bridge doesn't reconcile. FY ends May — sector-relative anomaly elevated vs IT peers.",
  },
  {
    ticker: "PSX",
    anomaly: 39,
    quality: 37,
    signal: "STRONG SELL",
    sector: "Energy",
    filingDate: "Feb 20, 2026",
    filingType: "10-K",
    topFinding:
      "Segment refining margins don't reconcile with consolidated EBITDA. XBRL verification flagged multiple discrepancies. Sector-adjusted anomaly elevated vs Energy peers.",
  },
  {
    ticker: "COP",
    anomaly: 37,
    quality: 24,
    signal: "SELL",
    sector: "Energy",
    filingDate: "Feb 24, 2026",
    filingType: "10-K",
    topFinding:
      "Production volumes claimed in narrative diverge from XBRL-reported figures. Segment income doesn't reconcile with consolidated totals. Confidence: 90%.",
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
            97 companies analyzed · 36 flagged · 26,906 checks performed · bank-aware sector-calibrated scoring
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
