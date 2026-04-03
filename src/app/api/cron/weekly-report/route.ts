import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { resend } from "@/lib/resend";

interface Flag {
  ticker: string;
  sector: string;
  anomaly_score: number;
  quality_score: number;
  momentum_score: number;
  overall_signal: string;
  filing_type: string;
  filing_date: string;
  key_findings: { finding: string; severity: string; impact: string }[];
  checks_total: number;
  checks_failed: number;
}

interface Subscriber {
  email: string;
}

function getWeekOf(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split("T")[0];
}

function signalColor(signal: string): string {
  if (signal.includes("strong_sell")) return "#ff4444";
  if (signal.includes("sell")) return "#ff6b6b";
  if (signal.includes("strong_buy")) return "#22c55e";
  if (signal.includes("buy")) return "#4ade80";
  return "#71717a";
}

function signalLabel(signal: string): string {
  return signal.replace(/_/g, " ").toUpperCase();
}

function buildEmail(flags: Flag[], weekOf: string): string {
  const flagRows = flags
    .map((f) => {
      const topFinding = f.key_findings?.[0]?.finding || "No details available";
      return `
      <tr style="border-bottom: 1px solid #27272a;">
        <td style="padding: 16px; vertical-align: top;">
          <div style="font-family: monospace; font-size: 18px; font-weight: bold; color: #e4e4e7;">
            $${f.ticker}
          </div>
          <div style="font-size: 11px; color: #71717a; margin-top: 2px;">
            ${f.sector} · ${f.filing_type} · ${f.filing_date}
          </div>
        </td>
        <td style="padding: 16px; text-align: center; vertical-align: top;">
          <div style="font-family: monospace; font-size: 20px; font-weight: bold; color: ${f.anomaly_score >= 40 ? "#ff4444" : f.anomaly_score >= 25 ? "#f5a623" : "#22c55e"};">
            ${Math.round(f.anomaly_score)}
          </div>
          <div style="font-size: 10px; color: #71717a;">ANOMALY</div>
        </td>
        <td style="padding: 16px; text-align: center; vertical-align: top;">
          <div style="font-family: monospace; font-size: 20px; font-weight: bold; color: ${f.quality_score <= 25 ? "#ff4444" : f.quality_score <= 50 ? "#f5a623" : "#22c55e"};">
            ${Math.round(f.quality_score)}
          </div>
          <div style="font-size: 10px; color: #71717a;">QUALITY</div>
        </td>
        <td style="padding: 16px; text-align: center; vertical-align: top;">
          <span style="display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-family: monospace; font-weight: bold; color: ${signalColor(f.overall_signal)}; border: 1px solid ${signalColor(f.overall_signal)}40;">
            ${signalLabel(f.overall_signal)}
          </span>
        </td>
      </tr>
      <tr style="border-bottom: 1px solid #1a1a1f;">
        <td colspan="4" style="padding: 0 16px 16px 16px;">
          <div style="font-size: 13px; color: #a1a1aa; line-height: 1.5;">
            ${topFinding.substring(0, 200)}${topFinding.length > 200 ? "..." : ""}
          </div>
        </td>
      </tr>`;
    })
    .join("");

  const totalChecks = flags.reduce((s, f) => s + (f.checks_total || 0), 0);
  const totalFailed = flags.reduce((s, f) => s + (f.checks_failed || 0), 0);

  return `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', monospace; background: #06060b; color: #e4e4e7; max-width: 640px; margin: 0 auto;">
    <div style="padding: 32px 24px; border-bottom: 1px solid #27272a;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
        <span style="font-size: 24px; font-weight: bold; color: #f5a623;">⊕ AUDEX</span>
      </div>
      <div style="font-size: 13px; color: #71717a;">
        Weekly Filing Intelligence · Week of ${weekOf}
      </div>
    </div>

    <div style="padding: 24px;">
      <h2 style="font-size: 20px; font-weight: bold; margin: 0 0 8px 0; color: #e4e4e7;">
        Top 5 Red Flags This Week
      </h2>
      <p style="font-size: 13px; color: #71717a; margin: 0 0 20px 0;">
        ${totalChecks.toLocaleString()} automated checks · ${totalFailed} failures detected
      </p>

      <table style="width: 100%; border-collapse: collapse; background: #0e0e14; border-radius: 8px; overflow: hidden;">
        <thead>
          <tr style="border-bottom: 1px solid #27272a;">
            <th style="padding: 12px 16px; text-align: left; font-size: 10px; color: #71717a; font-weight: normal; text-transform: uppercase; letter-spacing: 0.05em;">Company</th>
            <th style="padding: 12px 16px; text-align: center; font-size: 10px; color: #71717a; font-weight: normal; text-transform: uppercase; letter-spacing: 0.05em;">Anomaly</th>
            <th style="padding: 12px 16px; text-align: center; font-size: 10px; color: #71717a; font-weight: normal; text-transform: uppercase; letter-spacing: 0.05em;">Quality</th>
            <th style="padding: 12px 16px; text-align: center; font-size: 10px; color: #71717a; font-weight: normal; text-transform: uppercase; letter-spacing: 0.05em;">Signal</th>
          </tr>
        </thead>
        <tbody>
          ${flagRows}
        </tbody>
      </table>
    </div>

    <div style="padding: 24px; text-align: center;">
      <a href="https://audex.tech#flags" style="display: inline-block; background: #f5a623; color: #06060b; padding: 12px 32px; text-decoration: none; font-weight: bold; border-radius: 6px; font-size: 14px;">
        View Full Report on Audex
      </a>
    </div>

    <div style="padding: 16px 24px; border-top: 1px solid #27272a;">
      <p style="font-size: 11px; color: #52525b; text-align: center; margin: 0;">
        Audex analyzes public SEC filings using automated cross-reference checks. This is not financial advice.
        <br/>
        <a href="https://audex.tech" style="color: #71717a;">audex.tech</a>
        ·
        <a href="https://audex.tech/api/unsubscribe?email=SUBSCRIBER_EMAIL" style="color: #71717a;">unsubscribe</a>
      </p>
    </div>
  </div>`;
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getDb();

  try {
    const weekOf = getWeekOf();

    const alreadySent = await sql`
      SELECT id FROM sent_digests WHERE week_of = ${weekOf}
    `;
    if (alreadySent.length > 0) {
      return NextResponse.json({ message: "Already sent this week", weekOf });
    }

    const flags = (await sql`
      SELECT ticker, sector, anomaly_score, quality_score, momentum_score,
             overall_signal, filing_type, filing_date, key_findings,
             checks_total, checks_failed
      FROM published_reports
      WHERE overall_signal IN ('strong_sell', 'sell')
      ORDER BY anomaly_score DESC
      LIMIT 5
    `) as Flag[];

    if (flags.length === 0) {
      return NextResponse.json({ message: "No flags to report" });
    }

    const subscribers = (await sql`
      SELECT email FROM subscribers WHERE unsubscribed_at IS NULL
    `) as Subscriber[];

    if (subscribers.length === 0) {
      return NextResponse.json({ message: "No subscribers" });
    }

    const html = buildEmail(flags, weekOf);
    const subject = `Audex Weekly: ${flags.map((f) => "$" + f.ticker).join(", ")} flagged`;

    const BATCH_SIZE = 50;
    let totalSent = 0;

    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      const batch = subscribers.slice(i, i + BATCH_SIZE);
      const sends = batch.map((sub) =>
        resend.emails.send({
          from: "Audex Weekly <alerts@audex.tech>",
          to: sub.email,
          subject,
          html: html.replace("SUBSCRIBER_EMAIL", encodeURIComponent(sub.email)),
        })
      );
      const results = await Promise.allSettled(sends);
      totalSent += results.filter((r) => r.status === "fulfilled").length;
    }

    await sql`
      INSERT INTO sent_digests (week_of, subject, recipients_count)
      VALUES (${weekOf}, ${subject}, ${totalSent})
    `;

    return NextResponse.json({
      message: "Weekly report sent",
      weekOf,
      recipientCount: totalSent,
      flags: flags.map((f) => f.ticker),
    });
  } catch (error) {
    console.error("Weekly report error:", error);
    return NextResponse.json(
      { error: "Failed to send weekly report" },
      { status: 500 }
    );
  }
}
