import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return new NextResponse("Missing email parameter", { status: 400 });
  }

  const sql = getDb();

  await sql`
    UPDATE subscribers
    SET unsubscribed_at = now()
    WHERE email = ${email.toLowerCase().trim()} AND unsubscribed_at IS NULL
  `;

  return new NextResponse(
    `<html>
      <body style="font-family: monospace; background: #06060b; color: #e4e4e7; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0;">
        <div style="text-align: center; padding: 40px;">
          <h1 style="color: #f5a623;">Unsubscribed</h1>
          <p style="color: #71717a;">You won't receive any more emails from Audex.</p>
          <a href="https://audex.tech" style="color: #f5a623;">Back to Audex</a>
        </div>
      </body>
    </html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
