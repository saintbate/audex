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
  const { searchParams } = new URL(request.url);
  const ticker = (searchParams.get("ticker") || "").toUpperCase().trim();

  if (!ticker) {
    return NextResponse.json(
      { error: "Missing required parameter: ticker. Usage: /api/v1/company?ticker=AAPL" },
      { status: 400, headers: CORS_HEADERS },
    );
  }

  const sql = getDb();
  const rows = await sql`
    SELECT * FROM published_reports
    WHERE ticker = ${ticker}
    ORDER BY filing_date DESC
    LIMIT 1
  `;

  if (rows.length === 0) {
    return NextResponse.json(
      { error: `Company not found: ${ticker}` },
      { status: 404, headers: CORS_HEADERS },
    );
  }

  const r = rows[0];
  const findings = typeof r.key_findings === "string"
    ? JSON.parse(r.key_findings)
    : r.key_findings || [];

  const company = {
    ticker: r.ticker,
    sector: r.sector,
    scores: {
      anomaly: Math.round(Number(r.anomaly_score) * 10) / 10,
      quality: Math.round(Number(r.quality_score) * 10) / 10,
      momentum: Math.round(Number(r.momentum_score) * 10) / 10,
    },
    signal: r.overall_signal,
    filing: {
      type: r.filing_type,
      date: r.filing_date,
    },
    checks: {
      total: r.checks_total,
      failed: r.checks_failed,
    },
    summary: r.summary,
    keyFindings: findings,
    url: `https://audex.tech/company/${r.ticker}`,
    publishedAt: r.published_at,
  };

  return NextResponse.json(
    {
      meta: { generatedAt: new Date().toISOString() },
      data: company,
    },
    { headers: CORS_HEADERS },
  );
}
