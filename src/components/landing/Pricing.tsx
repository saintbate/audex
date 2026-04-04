"use client";

import { useState } from "react";

export default function Pricing() {
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!waitlistEmail) return;
    setWaitlistStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: waitlistEmail, source: "pro_waitlist" }),
      });
      setWaitlistStatus(res.ok ? "done" : "error");
    } catch {
      setWaitlistStatus("error");
    }
  }

  return (
    <section id="pricing" className="py-20 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Simple pricing
          </h2>
          <p className="text-muted text-lg">
            Start free. Upgrade when you want the full picture.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free tier */}
          <div className="border border-border rounded-lg bg-surface p-8">
            <div className="text-sm font-mono text-muted mb-2">FREE</div>
            <div className="text-3xl font-bold mb-1">$0</div>
            <div className="text-sm text-muted mb-6">forever</div>

            <ul className="space-y-3 text-sm mb-8">
              <PricingItem>Weekly newsletter — top 5 red flags</PricingItem>
              <PricingItem>Public red flags feed</PricingItem>
              <PricingItem>Backtest track record</PricingItem>
              <PricingItem>Signal distribution charts</PricingItem>
            </ul>

            <a
              href="#signup"
              className="block w-full text-center border border-border text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-surface-2 transition-colors"
            >
              Subscribe Free
            </a>
          </div>

          {/* Pro tier */}
          <div className="border border-accent/40 rounded-lg bg-surface p-8 relative">
            <div className="absolute -top-3 left-6 bg-accent text-background text-[10px] font-mono font-bold px-3 py-1 rounded">
              COMING SOON
            </div>
            <div className="text-sm font-mono text-accent mb-2">PRO</div>
            <div className="text-3xl font-bold mb-1">
              $15
              <span className="text-base font-normal text-muted">/mo</span>
            </div>
            <div className="text-sm text-muted mb-6">cancel anytime</div>

            <ul className="space-y-3 text-sm mb-8">
              <PricingItem accent>Everything in Free</PricingItem>
              <PricingItem accent>
                Full reports for every S&P 500 company
              </PricingItem>
              <PricingItem accent>
                Real-time filing alerts for your watchlist
              </PricingItem>
              <PricingItem accent>
                Searchable anomaly score database
              </PricingItem>
              <PricingItem accent>Historical score archive</PricingItem>
              <PricingItem accent>Priority access to new features</PricingItem>
            </ul>

            {waitlistStatus === "done" ? (
              <div className="text-center text-accent font-mono text-sm py-3">
                You&apos;re on the list. We&apos;ll notify you at launch.
              </div>
            ) : (
              <form onSubmit={handleWaitlist} className="flex gap-2">
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  required
                  className="flex-1 bg-background border border-border rounded-lg px-3 py-3 text-sm font-mono text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50"
                />
                <button
                  type="submit"
                  disabled={waitlistStatus === "loading"}
                  className="bg-accent text-background px-5 py-3 rounded-lg font-semibold hover:bg-accent-dim transition-colors text-sm whitespace-nowrap disabled:opacity-50"
                >
                  {waitlistStatus === "loading" ? "..." : "Join"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingItem({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <li className="flex items-start gap-2">
      <svg
        className={`h-4 w-4 mt-0.5 shrink-0 ${accent ? "text-accent" : "text-green"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-muted">{children}</span>
    </li>
  );
}
