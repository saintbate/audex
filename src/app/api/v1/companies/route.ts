import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "X-Powered-By": "Audex Filing Analysis Engine",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(request: NextRequest) {
  const sql = getDb();
  const { searchParams } = new URL(request.url);

  const sector = searchParams.get("sector");
  const signal = searchParams.get("signal");
  const sortBy = searchParams.get("sort") || "anomaly_score";
  const order = searchParams.get("order") === "asc" ? "ASC" : "DESC";
  const limit = Math.min(Number(searchParams.get("limit")) || 100, 500);
  const offset = Math.max(Number(searchParams.get("offset")) || 0, 0);

  const allowedSorts = ["anomaly_score", "quality_score", "momentum_score", "ticker", "filing_date"];
  const safeSort = allowedSorts.includes(sortBy) ? sortBy : "anomaly_score";

  let rows;
  if (sector && signal) {
    rows = await sql`
      SELECT ticker, sector, anomaly_score, quality_score, momentum_score,
             overall_signal, filing_type, filing_date, checks_total,
             checks_failed, published_at, summary, key_findings
      FROM published_reports
      WHERE sector = ${sector} AND overall_signal = ${signal}
      ORDER BY anomaly_score DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
  } else if (sector) {
    rows = await sql`
      SELECT ticker, sector, anomaly_score, quality_score, momentum_score,
             overall_signal, filing_type, filing_date, checks_total,
             checks_failed, published_at, summary, key_findings
      FROM published_reports
      WHERE sector = ${sector}
      ORDER BY anomaly_score DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
  } else if (signal) {
    rows = await sql`
      SELECT ticker, sector, anomaly_score, quality_score, momentum_score,
             overall_signal, filing_type, filing_date, checks_total,
             checks_failed, published_at, summary, key_findings
      FROM published_reports
      WHERE overall_signal = ${signal}
      ORDER BY anomaly_score DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
  } else {
    rows = await sql`
      SELECT ticker, sector, anomaly_score, quality_score, momentum_score,
             overall_signal, filing_type, filing_date, checks_total,
             checks_failed, published_at, summary, key_findings
      FROM published_reports
      ORDER BY anomaly_score DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
  }

  const companies = rows.map((r) => ({
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
    keyFindings: (typeof r.key_findings === "string"
      ? JSON.parse(r.key_findings)
      : r.key_findings || []).slice(0, 5),
    url: `https://audex.tech/company/${r.ticker}`,
    publishedAt: r.published_at,
  }));

  const countResult = await sql`SELECT COUNT(*) as total FROM published_reports`;
  const total = Number(countResult[0]?.total || 0);

  return NextResponse.json(
    {
      meta: {
        total,
        limit,
        offset,
        filters: { sector: sector || null, signal: signal || null },
        generatedAt: new Date().toISOString(),
        engine: "Audex v4.1 — Seven-Layer Filing Analysis",
      },
      data: companies,
    },
    { headers: CORS_HEADERS },
  );
}
