import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const sql = getDb();

  const reports = await sql`
    SELECT ticker, sector, anomaly_score, quality_score, momentum_score,
           overall_signal, filing_type, filing_date, key_findings,
           checks_total, checks_failed, published_at
    FROM published_reports
    ORDER BY anomaly_score DESC
  `;

  const items = reports.map((r) => ({
    ticker: r.ticker,
    sector: r.sector,
    anomalyScore: Math.round(Number(r.anomaly_score)),
    qualityScore: Math.round(Number(r.quality_score)),
    momentumScore: Math.round(Number(r.momentum_score)),
    signal: r.overall_signal,
    filingType: r.filing_type,
    filingDate: r.filing_date,
    checksTotal: r.checks_total,
    checksFailed: r.checks_failed,
    topFindings: (typeof r.key_findings === "string"
      ? JSON.parse(r.key_findings)
      : r.key_findings || []
    ).slice(0, 3),
    url: `https://audex.tech/company/${r.ticker}`,
    publishedAt: r.published_at,
  }));

  return NextResponse.json({
    meta: {
      title: "Audex Red Flag Feed",
      description: "AI-powered SEC filing anomaly detection",
      url: "https://audex.tech",
      totalCompanies: items.length,
      generatedAt: new Date().toISOString(),
    },
    items,
  });
}
