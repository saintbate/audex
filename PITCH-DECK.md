# Audex Pitch Deck — Slide Content

Use this as the script/content for each slide. Build in Google Slides, Figma, or Pitch — dark background (#06060b), accent orange (#f5a623), monospace font for data.

---

## SLIDE 1: Title

**AUDEX**
Automated risk intelligence for SEC filings

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

Output: A **risk assessment** for every company — anomaly score, quality score, confidence level, and a composite signal.

---

## SLIDE 5: What Makes It Different

**This is a risk filter, not a stock picker.**

A clean filing doesn't mean the stock goes up. But a messy filing — where the numbers contradict each other and the company can't explain why — is predictive of problems.

**1. Deterministic ground truth.** 2,092 programmatic XBRL checks with fixed tolerances. Not LLM opinions — math.

**2. Sector-relative scoring.** Adjusts for industry-specific filing complexity. A utility at anomaly=24 is normal. A tech company at 24 is an outlier.

**3. Composite risk signals.** Both anomaly AND quality must be bad to flag. This eliminates false positives from one-dimensional thresholds.

**4. Confidence scoring.** Every assessment includes a confidence level (60-100%) based on XBRL verification coverage. We tell you how much to trust the signal.

---

## SLIDE 6: The Proof

**Backtested across 97 companies, 352 observations, 5 filing windows.**

| Signal | N | 12M Alpha vs SPY | Hit Rate |
|--------|---|-----------------|----------|
| Strong Sell | 71 | **-9.5%** | 72% |
| Sell | 96 | **-7.6%** | 70% |
| Hold | 157 | -3.7% | — |
| Buy | 22 | -3.0% | 41% |
| Strong Buy | 6 | +17.8% | 67% |

**Sell signals underperform SPY by 8.4% with 71% accuracy (n=167).**

The engine is a risk filter: it tells you what to avoid, not what to buy. A "hold" or "buy" rating means the accounting looks clean — not that the stock will outperform. We're honest about this: buy signal alpha is -3.0% (not predictive). The value is in the sell side.

---

## SLIDE 7: Live Results

**Q1 2026: 97 companies, 15,799 checks, 38 flags.**

| Ticker | Anomaly | Signal | Top Finding |
|--------|---------|--------|------------|
| $D | 56 | STRONG SELL | Continuing ops income exceeds net income — worst quality score in universe |
| $SRE | 54 | STRONG SELL | Net income differs from XBRL by $122M — deterministic check confirms |
| $WELL | 48 | STRONG SELL | $210M revenue gap, highest sector-adjusted anomaly in Real Estate |
| $VLO | 45 | STRONG SELL | Segment income exceeds company total by $1.1B, XBRL mismatch confirmed |
| $ORCL | 45 | STRONG SELL | Deferred revenue bridge doesn't reconcile, elevated vs IT peers |

**Signal distribution: 4 strong buy · 18 buy · 37 hold · 25 sell · 13 strong sell**

---

## SLIDE 8: Known Limitations & Honesty

**What works, what doesn't, and what we're doing about it.**

| Area | Status |
|------|--------|
| **Sell signal accuracy** | **Strong** — 72% hit rate on strong sell, -9.5% alpha (n=71) |
| **Risk detection** | **Strong** — 15,799 checks including 2,092 deterministic XBRL verifications |
| **Sector normalization** | **Done** — 18 non-calendar fiscal years identified and adjusted |
| **Confidence calibration** | **Done** — every assessment scored 60-100% based on XBRL coverage |
| **Buy signal accuracy** | **Weak** — -3.0% alpha on moderate buy. A clean filing ≠ a good stock. |

**We don't pretend to be a stock picker. We're a risk filter. That's a more defensible product.**

---

## SLIDE 9: Product

**Free tier → audience. Pro tier → revenue.**

- **Free:** Weekly email with top red flags, public leaderboard, track record
- **Pro ($15/mo):** Full S&P 500 coverage, real-time alerts, searchable database, historical archive, confidence scores

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
- **38 companies flagged** (13 Strong Sell, 25 Sell)
- **Sell signal accuracy:** 72% hit rate at 12-month holding period
- **352 backtest observations** across 5 filing windows
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
| 72% sell accuracy (backtested) | Improve buy signal | Institutional dashboard |

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
