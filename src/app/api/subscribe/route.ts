import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { resend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const sql = getDb();
    const cleanEmail = email.toLowerCase().trim();

    const result = await sql`
      INSERT INTO subscribers (email, source)
      VALUES (${cleanEmail}, ${source || "landing"})
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `;

    if (result.length > 0) {
      await resend.emails.send({
        from: "Audex <alerts@audex.tech>",
        to: cleanEmail,
        subject: "Welcome to Audex — your first report arrives Monday",
        html: `
          <div style="font-family: monospace; background: #06060b; color: #e4e4e7; padding: 40px; max-width: 600px;">
            <h1 style="color: #f5a623; font-size: 24px; margin-bottom: 24px;">Welcome to Audex</h1>
            <p style="line-height: 1.7; margin-bottom: 16px;">
              You're in. Every Monday morning, you'll get the 5 riskiest SEC filings from the past week — ranked by anomaly score with specific findings cited.
            </p>
            <p style="line-height: 1.7; margin-bottom: 16px;">
              Our engine runs 150+ automated checks on every 10-K and 10-Q filing. When the numbers contradict each other, we flag it.
            </p>
            <p style="line-height: 1.7; margin-bottom: 24px;">
              In the meantime, check out our latest red flags:
            </p>
            <a href="https://audex.tech#flags" style="display: inline-block; background: #f5a623; color: #06060b; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 6px;">
              See Latest Red Flags
            </a>
            <p style="color: #71717a; font-size: 12px; margin-top: 32px;">
              Audex provides automated analysis of public SEC filings for informational purposes only. Not financial advice.
            </p>
          </div>
        `,
      }).catch(() => {});
    }

    return NextResponse.json({ message: "Subscribed" });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
