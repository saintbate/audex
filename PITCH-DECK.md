# Audex Pitch Deck — Slide Content

Use this as the script/content for each slide. Build in Google Slides, Figma, or Pitch — dark background (#06060b), accent orange (#f5a623), monospace font for data.

---

## SLIDE 1: Title

**AUDEX**
AI-powered SEC filing intelligence

*audex.tech*

---

## SLIDE 2: The Problem

**Nobody actually reads SEC filings.**

- 3,000+ filings hit the SEC every quarter
- Each filing is 200+ pages of financial claims
- Claims frequently contradict each other between sections
- Institutional analysts cover 15-20 companies max
- Retail investors cover even fewer

**When inconsistencies surface months later, the stock has already moved.**

---

## SLIDE 3: The Insight

**Every filing contains thousands of cross-checkable claims.**

Revenue in the MD&A should match revenue in the income statement. Segment totals should add up to the consolidated number. EPS should be mathematically consistent with net income and share count.

Most of these checks are mechanical. An LLM can read every number. A program can verify every relationship.

**The question isn't whether filings contain errors. It's how many — and how severe.**

---

## SLIDE 4: The Solution

**Audex: a six-layer verification engine for SEC filings.**

| Layer | What It Does | Method |
|-------|-------------|--------|
| Extraction | Pulls every financial claim with period context | Claude Haiku |
| Internal Cross-Reference | Checks claims against each other + XBRL data | Claude Haiku |
| Deterministic Verification | Programmatic claim-vs-XBRL comparison with fixed tolerances | Deterministic |
| Temporal Cross-Reference | Compares trends across 4+ years of filings | Claude Sonnet |
| Explanation Check | Uses MD&A narrative and 8-K filings to contextualize discrepancies | Claude Haiku |
| Scoring | Sector-relative anomaly, quality, momentum, and composite risk signal | Deterministic |

Output: An **anomaly score** (sector-adjusted), a **quality score**, a **momentum score**, and a **composite risk signal** for every company.

---

## SLIDE 5: What Makes It Different

**Three layers of differentiation over raw LLM analysis.**

**1. Deterministic ground truth.** We don't just ask an LLM if the numbers look right. We programmatically compare every extracted claim against XBRL structured data with fixed tolerance thresholds (<2% pass, 2-5% minor, 5-15% major, >15% critical). 2,092 deterministic checks — unfalsifiable.

**2. Sector-relative scoring.** A utility company with anomaly=24 is normal (sector avg=24). A tech company at 24 is elevated (sector avg=14). We adjust every score relative to its sector baseline so flags reflect genuine outliers, not industry artifacts.

**3. Composite risk signals.** Signal = anomaly × (1 − quality/100), modified by momentum. Both dimensions must be bad to trigger a sell. Low anomaly with low quality = hold. High anomaly with high quality = hold. Only high anomaly + low quality = flag.

---

## SLIDE 6: The Proof

**Backtested across 97 S&P 500 companies, 5 filing windows, and multiple market regimes.**

*(Show a bar chart with signal categories on X-axis and 12-month alpha on Y-axis)*

| Signal | N | 12M Alpha vs SPY | Hit Rate |
|--------|---|-----------------|----------|
| Strong Buy | 5 | **+25.6%** | 80.0% |
| Buy | 17 | -2.0% | 41.2% |
| Hold | 93 | -5.5% | — |
| Sell | 66 | -9.9% | 66.7% |
| Strong Sell | 49 | **-16.3%** | 69.4% |

**Strong Buy – Strong Sell spread: +41.9 percentage points.**
The engine is strongest at its highest-conviction calls. Sell signals outperform across all holding periods (3M, 6M, 12M) and across every filing window tested.

---

## SLIDE 7: Live Results

**Q1 2026: 97 companies, 15,799 checks, 37 flags.**

*(Show the top 5 flags as a mini-leaderboard)*

| Ticker | Anomaly | Signal | Top Finding |
|--------|---------|--------|------------|
| $SRE | 54 | STRONG SELL | Net income differs from XBRL by $122M — deterministic check confirms |
| $WELL | 53 | STRONG SELL | $210M revenue gap across segments, highest sector-adjusted anomaly in Real Estate |
| $D | 53 | STRONG SELL | Continuing ops income exceeds net income — worst quality score in universe (11) |
| $VLO | 46 | STRONG SELL | Segment income exceeds company total by $1.1B, programmatic XBRL mismatch confirmed |
| $ORCL | 46 | STRONG SELL | Deferred revenue bridge doesn't reconcile, elevated vs IT sector peers |

**Signal distribution: 5 strong buy · 18 buy · 37 hold · 26 sell · 11 strong sell**

---

## SLIDE 8: Known Limitations & Roadmap

**We know where the engine breaks — and how to fix it.**

| Limitation | Status |
|-----------|--------|
| ~~LLM confuses cumulative vs quarterly~~ | **FIXED** — period-mismatch filter + period-aware prompts |
| ~~No intent understanding~~ | **FIXED** — Explanation Check layer reads MD&A + 8-K context |
| ~~Fiscal year misalignment~~ | **FIXED** — derived FY end month for all 97 companies, 18 non-calendar identified |
| ~~Uneven XBRL quality~~ | **FIXED** — XBRL coverage index now weights confidence per company (60%-100%) |
| Buy signal accuracy | **Known** — moderate "buy" signal shows -2% alpha; strong_buy works (+25.6%) | 

**Four of four v1 limitations resolved. The remaining gap is on the buy side — which we're honest about.**

---

## SLIDE 9: Product

**Free tier → audience. Pro tier → revenue.**

*(Show side-by-side of the website: landing page, leaderboard, company report page)*

- **Free:** Weekly email with top 5 red flags, public leaderboard, track record
- **Pro ($15/mo):** Full S&P 500 coverage, real-time alerts, searchable database, historical archive

Already live: audex.tech

---

## SLIDE 10: Business Model

**Content flywheel: every filing analyzed creates free content AND paid value.**

```
New filing drops
    → Engine analyzes (automated)
    → Free tier: newsletter + leaderboard update
    → Paid tier: full report + alerts
    → Content drives new subscribers
    → Repeat
```

**Unit economics:**
- ~$2.00 per company per cycle (6 analysis layers)
- Full S&P 500 quarterly: ~$1,000
- Break-even: 23 Pro subscribers
- Target: 1,000 Pro subs = $180K ARR

---

## SLIDE 11: Market Opportunity

**$500B+ in losses from accounting fraud and financial misstatement annually (ACFE estimates).**

Audex targets three buyer segments:
1. **Retail investors** — no tools to verify filing claims at scale
2. **RIAs and small funds** — can't afford forensic accounting teams
3. **Compliance teams** — need automated monitoring of portfolio companies

The market for financial data intelligence (Bloomberg, S&P Capital IQ, Refinitiv) is $35B+. Audex enters from a new angle: automated verification, not just aggregation.

---

## SLIDE 12: Traction

- **97 companies** analyzed live
- **15,799 checks** performed (2,092 deterministic + 13,707 LLM-verified)
- **37 companies flagged** (11 Strong Sell, 26 Sell)
- **23 buy signals** issued (5 Strong Buy, 18 Buy)
- Newsletter subscribers: [current count]
- Pro waitlist: [current count]

---

## SLIDE 13: Roadmap

**Now → 3 months → 12 months**

| Now (done) | Next 3 months | 12 months |
|-----------|--------------|-----------|
| 97 companies, 6-layer engine | Full S&P 500 | Russell 1000 |
| Sector-relative scoring | Pro tier + Stripe | API for institutions |
| Deterministic XBRL verification | Earnings call analysis | Real-time filing alerts |
| Explanation check (MD&A + 8-K) | Fiscal year normalization | Institutional dashboard |

---

## SLIDE 14: The Ask

**$50,000**

- Scale to full S&P 500 coverage
- Build Pro tier with payment infrastructure
- Add earnings call transcript analysis
- Six months of runway

---

## SLIDE 15: Team

**Nick Bateman** — Solo founder

Built the full stack: SEC EDGAR ingestion pipeline, six-layer analysis engine (LLM + deterministic + sector-relative), backtesting framework, Next.js web platform, automated email delivery.

---

## SLIDE 16: Close

**AUDEX**
*The numbers should add up. We check if they do.*

audex.tech
