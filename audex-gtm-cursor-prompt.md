# Audex — Go-To-Market Context
## For Cursor: Marketing, Outreach, Pricing, and Distribution

---

## What Audex Is (GTM Framing)

Audex is **trust infrastructure for AI-extracted financial claims** — not a quant tool, not a data vendor, not a dashboard. The product is a verified assertion with a traceable audit trail. The positioning is: every other AI tool in finance produces probabilistic signals. Audex produces formally verified assertions with documented reject reasons.

This distinction is the entire GTM. Every piece of copy, outreach, and product surface must reinforce it.

**Elevator pitch:**
> "Audex is a neurosymbolic verification engine for SEC filings. It extracts financial claims using AI, then routes every output through a deterministic verification stack — mathematical consistency checks, XBRL taxonomy validation, and Z3 constraint solving — before emitting a verified assertion with a full audit trail. It's the difference between an AI signal and a defensible claim."

**One-line for cold outreach:**
> "I built a verification layer that catches when AI-extracted financial claims are mathematically inconsistent with XBRL ground truth — with a traceable audit trail. Want to see it run on your filings?"

---

## Target Customer — Phase 1

**Primary:** Quantitative researchers at systematic/quant funds, $500M–$5B AUM.

This is the sweet spot:
- Large enough to pay without procurement hell
- Small enough that one researcher can adopt a tool independently
- Already using alternative data and LLM-based analysis
- Actively looking for differentiated, verifiable signal sources
- Comfortable with CLI tools and API-first products

**Where they live:**
- LinkedIn: search "quantitative researcher" + "alternative data" OR "systematic" at hedge funds
- QuantLib community, Quant StackExchange, r/quant
- Conferences: Battle of the Quants, RiskMinds, QuantMinds

**Secondary (Phase 3+):** Compliance officers and risk managers at mid-size broker-dealers, especially post-FINRA 2026 guidance on AI hallucination risk in financial workflows.

**Not yet:** Large banks, hospital systems, law firms. Their procurement cycles are fatal to early-stage companies. They come after revenue.

---

## Phase 1 Goal — One Reference Customer

Do not launch publicly. Do not post on Product Hunt. Do not pitch VCs.

The only goal in Phase 1 is finding one quant researcher who:
1. Uses Audex on their real filings for free
2. Gives brutal feedback
3. Is willing to go on record with a specific result

**LinkedIn outreach message template:**

Subject: Verification layer for AI-extracted SEC data

> "Hi [Name] — I'm building Audex, a verification engine that runs AI-extracted financial claims from SEC filings through a neurosymbolic stack — XBRL taxonomy validation, mathematical consistency checks, Z3 constraint solving — and returns a verified assertion with a full audit trail rather than just a probabilistic signal.
>
> Given your work in [systematic/alt data/quant research], I'd like to offer you free access in exchange for honest feedback. Specifically, I want to know if it catches discrepancies your current pipeline misses.
>
> Worth a 20-minute call?"

**Outreach rules:**
- Personalize every message. Reference their specific fund, role, or published work.
- Lead with the verification angle, not the financial analysis angle.
- Never pitch pricing in the first message.
- Target 20 outreach messages before evaluating response rate.
- Track every message in a simple spreadsheet: name, fund, date sent, response, status.

---

## Phase 2 Goal — The Reference Case

One verified discrepancy Audex caught that another tool missed, with the XBRL delta documented, written up as a technical case study.

**Case study format:**
- Title: "How Audex Caught a [X]% Revenue Discrepancy in [Company]'s 10-K That LLM Extraction Missed"
- Structure: filing → extraction → discrepancy flagged → XBRL ground truth comparison → audit trail
- Tone: technical, not marketing. Written for a quant researcher, not a CMO.
- Length: 800–1200 words. No fluff.
- Publish: Simple landing page + GitHub README + one LinkedIn post + one relevant quant community thread.

This case study is the top of the entire funnel. Every future buyer will read it before talking to us.

---

## Pricing Architecture

Map pricing to the verification stack depth. As users hit limits on verification volume or audit trail access, they upgrade.

### Free Tier — Developer / Bottom-Up Acquisition
- CLI access only
- 50 filing verifications per month
- Layers 1–3 only (extraction + math + XBRL)
- No audit trail persistence
- No API access
- Goal: quant researchers adopt it personally, create bottom-up demand

### Pro — $299/month (individual researcher or small fund)
- Full 6-layer verification pipeline
- 500 filing verifications per month
- Full audit trail with exportable JSON
- REST API access
- Priority processing
- Goal: first revenue, product-market fit signal

### Enterprise — Annual contract, $15K–$50K+
- Unlimited verifications
- Custom GAAP rule encoding for their specific use case
- Audit trail export in compliance-ready format
- SLA and dedicated support
- White-label audit documentation for regulatory submissions
- Goal: compliance officers, risk teams, regulated broker-dealers

**Pricing rules:**
- Do not launch Pro until Free has 25+ active users hitting limits
- Do not launch Enterprise until Pro has 5+ paying customers
- Do not negotiate Pro pricing down — if they won't pay $299 they're not the target customer yet
- Annual Enterprise contracts only — no monthly Enterprise

---

## Messaging By Audience

### For quant researchers:
> "Audex doesn't just extract. It verifies. Every claim is checked against XBRL ground truth, run through Z3 constraint solving, and scored against multi-pass consensus before it reaches you. You get a confidence score with a traceable decomposition, not a black box."

### For compliance officers (Phase 3+):
> "FINRA's 2026 guidance specifically flags hallucination risk in AI-deployed financial workflows. Audex produces audit trails that document exactly how every financial claim was verified — which rules it passed, where it was cross-referenced, and why it was rejected or accepted. That's the paper trail your examiners will ask for."

### For VCs (Phase 4, Series A narrative):
> "We're building the trust layer that makes AI deployable in regulated financial workflows. The product is a domain-agnostic verification architecture — deployed first in SEC filing analysis where the formal spec (XBRL taxonomy) already exists, expanding into healthcare and insurance on the same infrastructure. Our moat is a growing corpus of verified claims calibrated against real outcomes — 18 months of that data is something nobody can buy."

---

## What NOT To Say

- Don't say "AI-powered" — every tool says that. Say "formally verified."
- Don't say "insight" or "intelligence" — say "verified assertion" or "audit trail."
- Don't say "we analyze filings" — say "we verify claims extracted from filings."
- Don't pitch the dashboard — we don't have one yet and it's not the point.
- Don't mention the long-term healthcare/legal expansion to early quant customers — it's noise to them.
- Don't compete on coverage (number of filings, number of companies) — compete on verification depth.

---

## Distribution Channels — Priority Order

1. **Direct LinkedIn outreach** — Phase 1 and 2. Highest signal, most control.
2. **Technical case study** — Phase 2. Content that sells without a salesperson.
3. **Quant communities** (r/quant, QuantLib, Quant StackExchange) — Phase 2. Organic, credibility-building.
4. **GitHub presence** — Phase 2. Open source CLI creates bottom-up adoption signal.
5. **Regulatory community** (XBRL US, AICPA, SEC open data events) — Phase 3. Credibility for enterprise and VC narrative.
6. **White paper / academic publication** — Phase 3–4. Co-author with a compliance or formal methods academic. This is the Series A narrative builder.

**Not yet:**
- Product Hunt
- Twitter/X launch
- Paid ads
- Cold email blasts
- Partnerships

None of those before the reference case exists.

---

## Outreach Tracker Schema

Build a simple SQLite table or Notion database with:

```
name          | text
fund          | text
aum_estimate  | text
linkedin_url  | text
date_sent     | date
message_sent  | text
response      | text (none / positive / negative / follow_up)
status        | text (outreach / call_scheduled / active_user / paying / passed)
notes         | text
```

Track every touchpoint. Response rate, conversion to call, conversion to active user. This is your sales pipeline before you have a CRM.

---

## GTM Milestones

- [ ] 20 LinkedIn outreach messages sent to quant researchers
- [ ] 3 calls booked from outreach
- [ ] 1 researcher actively using Audex on real filings
- [ ] 1 real discrepancy caught and documented
- [ ] Technical case study published
- [ ] Free tier live with CLI download
- [ ] First unsolicited inbound from case study
- [ ] First Pro paying customer
- [ ] 5 Pro paying customers
- [ ] First Enterprise conversation initiated
- [ ] White paper / regulatory community presence started

---

## The Regulatory Tailwind to Reference

When relevant, cite these real market signals to support the urgency of the problem:

- **FINRA 2026 regulatory oversight report** — first-ever section on generative AI, specifically warns broker-dealers to build procedures targeting hallucinations and AI agents acting beyond intended scope
- **EU AI Act** — risk-based classifications impose strict transparency, audit trail, and human oversight requirements on high-risk AI systems in finance
- **SEC structured data mandate** — XBRL required since 2009, 2025 taxonomy update active, regulators already expect machine-readable financial data
- **"Guarantee gap"** — researchers formally identified the disconnect between probabilistic AI reliability and the enforceable guarantees institutions need before delegating high-stakes tasks (Fortune, April 2026)

These aren't talking points for every conversation — use them specifically when speaking to compliance-adjacent buyers or in the regulatory credibility play.
