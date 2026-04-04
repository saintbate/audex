import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  const methodology = {
    meta: {
      version: "4.1",
      lastUpdated: "2026-03-31",
      generatedAt: new Date().toISOString(),
    },
    engine: {
      name: "Audex Seven-Layer Filing Analysis Engine",
      description:
        "Multi-pass SEC filing analysis that extracts financial claims, " +
        "cross-references them using LLM and deterministic methods, and " +
        "produces composite risk signals.",
      coverage: "97 S&P 500 companies across all 11 GICS sectors",
      filingTypes: ["10-K", "10-Q"],
    },
    pipeline: [
      {
        pass: 1,
        name: "Claim Extraction",
        method: "LLM",
        description:
          "Extracts structured financial claims (revenue, EPS, debt, equity, " +
          "cash flow) with period context and confidence scores from filing text.",
      },
      {
        pass: 2,
        name: "Internal Cross-Reference",
        method: "LLM",
        description:
          "Compares extracted claims against each other within the same filing. " +
          "Detects arithmetic errors, section contradictions, and XBRL mismatches.",
      },
      {
        pass: "2b",
        name: "Deterministic XBRL Verification",
        method: "Deterministic",
        description:
          "Programmatic comparison of LLM-extracted claims against XBRL ground truth. " +
          "Bank-aware: uses sector-specific mappings and wider thresholds for " +
          "financial companies. Weighted 1.5x in scoring.",
      },
      {
        pass: 3,
        name: "Temporal Cross-Reference",
        method: "LLM",
        description:
          "Compares trends across 4+ years of filings. Detects deteriorating " +
          "metrics, trend reversals, and inconsistent narratives over time.",
      },
      {
        pass: 5,
        name: "Explanation Check",
        method: "LLM",
        description:
          "Evaluates whether MD&A sections or recent 8-K filings explain " +
          "detected discrepancies. Produces per-check explanation scores.",
      },
      {
        pass: 6,
        name: "Management Tone Analysis",
        method: "Deterministic",
        description:
          "Analyzes MD&A sections for hedging language density, numeric " +
          "specificity, and management transparency. No LLM cost.",
      },
      {
        pass: 4,
        name: "Programmatic Scoring",
        method: "Deterministic",
        description:
          "Computes anomaly, quality, and momentum scores from check results. " +
          "Applies sector-relative adjustment, sector tolerance, management " +
          "tone modifier, and classifies composite risk signal.",
      },
    ],
    scoring: {
      anomalyScore: {
        range: "0-100",
        description:
          "Severity-weighted penalty from all checks. Higher = more red flags. " +
          "Includes bank accounting filter, period-mismatch filter, sector-relative " +
          "adjustment, and management tone modifier (±15%).",
      },
      qualityScore: {
        range: "0-100",
        description:
          "Weighted pass rate of internal checks. Higher = cleaner filing.",
      },
      momentumScore: {
        range: "0-100",
        description:
          "Weighted improving/stable/deteriorating from temporal trend analysis.",
      },
      confidence: {
        range: "0-100%",
        description:
          "Based on XBRL coverage ratio and total check count. Higher coverage " +
          "of deterministic checks = higher confidence.",
      },
    },
    signalClassification: {
      description:
        "Composite risk signal based on risk = anomaly * (1 - quality/100), " +
        "with momentum shifting signal ±1 level.",
      signals: [
        { signal: "strong_sell", criteria: "risk >= 35 AND anomaly >= 40" },
        { signal: "sell", criteria: "risk >= 20 OR (anomaly >= 30 AND quality < 30)" },
        { signal: "hold", criteria: "Default — does not meet buy or sell criteria" },
        { signal: "buy", criteria: "risk <= 8 AND quality >= 55 AND anomaly < 22" },
        { signal: "strong_buy", criteria: "risk <= 3 AND quality >= 70 AND anomaly < 12" },
      ],
    },
    sectorCalibration: {
      description:
        "Sector-specific tolerance multipliers grounded in ISA 320 (international " +
        "auditing materiality) and SAB 99 (SEC staff accounting bulletin) standards.",
      tolerances: [
        { sector: "Financials", multiplier: 2.5, basis: "ISA 320 total-assets materiality" },
        { sector: "Industrials", multiplier: 2.0, basis: "SAB 99 M&A/spinoff noise" },
        { sector: "Real Estate", multiplier: 1.5, basis: "NAREIT FFO/GAAP structure" },
        { sector: "Information Technology", multiplier: 1.2, basis: "Revenue recognition complexity" },
        { sector: "Consumer Discretionary", multiplier: 1.2, basis: "Seasonal adjustment" },
      ],
    },
    bankAwareness: {
      description:
        "Financial sector companies receive specialized treatment to avoid " +
        "false positives from structural differences in bank accounting.",
      features: [
        "Separate XBRL claim-to-tag mappings (skips revenue/debt checks)",
        "Wider discrepancy thresholds (5/10/25/50% vs standard 2/5/15/30%)",
        "Regex-based filter for known structural mismatches (par value, deposits, equity types)",
        "CommonStockholdersEquity prioritized over StockholdersEquity",
      ],
    },
    performance: {
      asOf: "2026-03-31",
      sellAccuracy12M: "70%",
      sellAlpha12M: "-9.1%",
      strongSellHitRate6M: "79%",
      buySellAlphaSeparation: "4.0pp",
      totalChecksPerformed: 26906,
      companiesAnalyzed: 97,
    },
    disclaimer:
      "Audex provides automated filing analysis for informational purposes only. " +
      "This is a risk filter, not a stock picker. A clean filing does not mean the " +
      "stock will outperform. Past backtest performance does not guarantee future results. " +
      "Not financial advice.",
  };

  return NextResponse.json(methodology, { headers: CORS_HEADERS });
}
