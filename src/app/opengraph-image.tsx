import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Audex — AI-Powered SEC Filing Intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#06060b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "monospace",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#22c55e",
            }}
          />
          <span style={{ color: "#71717a", fontSize: "18px" }}>
            LIVE — Q1 2026 FILINGS
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "#e4e4e7",
            lineHeight: 1.1,
            marginBottom: "16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>AUDEX</span>
        </div>
        <div
          style={{
            fontSize: "36px",
            color: "#f5a623",
            marginBottom: "48px",
          }}
        >
          AI-Powered SEC Filing Intelligence
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "60px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{ fontSize: "48px", fontWeight: "bold", color: "#f5a623" }}
            >
              21
            </span>
            <span style={{ fontSize: "16px", color: "#71717a" }}>
              Companies Scanned
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{ fontSize: "48px", fontWeight: "bold", color: "#ff4444" }}
            >
              9
            </span>
            <span style={{ fontSize: "16px", color: "#71717a" }}>
              Red Flags Issued
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{ fontSize: "48px", fontWeight: "bold", color: "#22c55e" }}
            >
              66%
            </span>
            <span style={{ fontSize: "16px", color: "#71717a" }}>
              Sell Hit Rate
            </span>
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            fontSize: "20px",
            color: "#71717a",
          }}
        >
          audex.tech
        </div>
      </div>
    ),
    { ...size }
  );
}
