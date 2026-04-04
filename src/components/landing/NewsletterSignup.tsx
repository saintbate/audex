"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: typeof window !== "undefined"
            ? new URLSearchParams(window.location.search).get("ref") || "landing"
            : "landing",
        }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="signup" className="py-20 px-6 bg-surface-2/50">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Get the 5 riskiest filings every week
        </h2>
        <p className="text-muted text-lg mb-8">
          Free weekly report. Top red flags from that week&apos;s SEC filings,
          ranked by anomaly score. Unsubscribe anytime.
        </p>

        {status === "success" ? (
          <div className="inline-flex items-center gap-2 bg-green/10 border border-green/30 text-green px-6 py-3 rounded-lg font-mono text-sm">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            You&apos;re in. First report arrives next Monday.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="flex-1 bg-surface border border-border rounded-lg px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-accent text-background px-6 py-3 rounded-lg font-semibold hover:bg-accent-dim transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-red text-sm mt-3 font-mono">
            Something went wrong. Try again.
          </p>
        )}

        <p className="text-xs text-muted mt-4">
          No spam. Just data. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
