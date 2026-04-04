import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(request: NextRequest) {
  const sql = getDb();
  const { searchParams } = new URL(request.url);
  const signalFilter = searchParams.get("signal");

  const reports = await sql`
    SELECT ticker, sector, anomaly_score, quality_score, momentum_score,
           overall_signal, filing_date, checks_total, checks_failed
    FROM published_reports
    ORDER BY anomaly_score DESC
  `;

  const grouped: Record<string, Array<{
    ticker: string;
    sector: string;
    anomalyScore: number;
    qualityScore: number;
    filingDate: unknown;
  }>> = {};

  for (const r of reports) {
    const sig = String(r.overall_signal);
    if (signalFilter && sig !== signalFilter) continue;
    if (!grouped[sig]) grouped[sig] = [];
    grouped[sig].push({
      ticker: String(r.ticker),
      sector: String(r.sector),
      anomalyScore: Math.round(Number(r.anomaly_score) * 10) / 10,
      qualityScore: Math.round(Number(r.quality_score) * 10) / 10,
      filingDate: r.filing_date,
    });
  }

  const summary = Object.entries(grouped).map(([signal, companies]) => ({
    signal,
    count: companies.length,
    companies,
  }));

  summary.sort((a, b) => {
    const order = ["strong_sell", "sell", "hold", "buy", "strong_buy"];
    return order.indexOf(a.signal) - order.indexOf(b.signal);
  });

  return NextResponse.json(
    {
      meta: {
        totalCompanies: reports.length,
        generatedAt: new Date().toISOString(),
        filter: signalFilter || "all",
      },
      data: summary,
    },
    { headers: CORS_HEADERS },
  );
}
