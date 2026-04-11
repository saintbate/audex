"use client";

import { useState } from "react";

export default function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

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
    <section id="access" className="py-20 px-6">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Request early access
        </h2>
        <p className="text-muted mb-8 leading-relaxed">
          Audex is in pre-release. We&apos;re looking for quantitative
          researchers and alternative data teams who want to test the
          verification pipeline on their real filings. Free access in exchange
          for honest feedback.
        </p>

        {status === "success" ? (
          <div className="border border-green/30 rounded-lg bg-green/5 p-6">
            <p className="text-green font-mono text-sm">
              Got it. We&apos;ll be in touch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@fund.com"
              required
              className="flex-1 bg-surface border border-border rounded-lg px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-accent text-background px-6 py-3 rounded-lg font-semibold hover:bg-accent-dim transition-colors text-sm disabled:opacity-50 shrink-0"
            >
              {status === "loading" ? "..." : "Request Access"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-red text-xs font-mono mt-3">
            Something went wrong. Try again.
          </p>
        )}

        <p className="text-xs text-muted mt-6">
          CLI + API access. No dashboard, no screenshots of things that
          don&apos;t exist yet.
        </p>
      </div>
    </section>
  );
}
