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

**Audex: a seven-layer verification engine for SEC filings.**

| Layer | What It Does | Method |
|-------|-------------|--------|
| Extraction | Pulls every financial claim with period context | Claude Haiku |
| Internal Cross-Reference | Checks claims against each other + XBRL data | Claude Haiku |
| Deterministic Verification | Bank-aware programmatic claim-vs-XBRL comparison | Deterministic |
| Temporal Cross-Reference | Compares trends across 4+ years of filings | Claude Sonnet |
| Explanation Check | Uses MD&A narrative and 8-K filings to contextualize discrepancies | Claude Haiku |
| Management Tone Analysis | Hedging language density, numeric specificity, transparency scoring | Deterministic |
| Scoring | Sector-relative anomaly, quality, momentum, tone-adjusted composite signal | Deterministic |

Output: A **risk assessment** for every company — anomaly score, quality score, confidence level, and a composite signal.

---

## SLIDE 5: What Makes It Different

**This is a risk filter, not a stock picker.**

A clean filing doesn't mean the stock goes up. But a messy filing — where the numbers contradict each other and the company can't explain why — is predictive of problems.

**1. Deterministic ground truth.** 2,092 programmatic XBRL checks with fixed tolerances. Not LLM opinions — math.

**2. Bank-aware accounting.** Financial sector companies get bank-specific check logic that understands revenue = NII + noninterest income, common vs total equity, and complex debt structures. No more false positives from structural bank accounting.

**3. Sector-calibrated tolerance.** ISA 320/SAB 99–grounded materiality multipliers (Financials 2.5×, Industrials 2.0×, Real Estate 1.5×). Eliminates false positives from REIT FFO/GAAP gaps, M&A/spinoff noise.

**4. Management tone analysis.** Deterministic hedging language scoring across all MD&A sections. Companies with evasive language get higher anomaly scores; transparent companies get lower.

**5. Composite risk signals.** Both anomaly AND quality must be bad to flag. Tone acts as a fine-tuning modifier. This eliminates false positives from one-dimensional thresholds.

**6. Confidence scoring.** Every assessment includes a confidence level (60-100%) based on XBRL verification coverage.

---

## SLIDE 6: The Proof

**Backtested across 97 companies with bank-aware, sector-calibrated, tone-adjusted scoring.**

| Signal | N | 12M Alpha vs SPY | Hit Rate |
|--------|---|-----------------|----------|
| Strong Sell | 14 | **-7.7%** | 71% |
| Sell | 35 | **-5.3%** | 69% |
| Hold | 32 | -4.5% | — |
| Buy | 12 | -9.2% | 42% |
| Strong Buy | 4 | +6.8% | 50% |

**Sell signals underperform SPY by 9.1% with 70% accuracy across all filing windows. Strong sell signals hit 79% accuracy at 6-month holding.**

The engine is a risk filter: it tells you what to avoid, not what to buy. A "hold" or "buy" rating means the accounting looks clean — not that the stock will outperform. We're honest about this: buy signal alpha is weak. The value is in the sell side.

---

## SLIDE 7: Live Results

**Q1 2026: 97 companies, 26,906 checks, 36 flags.**

| Ticker | Anomaly | Signal | Top Finding |
|--------|---------|--------|------------|
| $D | 56 | STRONG SELL | Continuing ops income exceeds net income — worst quality score in universe |
| $SRE | 54 | STRONG SELL | Net income differs from XBRL by $122M — deterministic check confirms |
| $VLO | 44 | STRONG SELL | Segment income exceeds company total by $1.1B, XBRL mismatch confirmed |
| $JNJ | 44 | STRONG SELL | Lowest quality score in universe (9). Fiscal-adjusted comparison elevated vs peers |
| $ORCL | 39 | STRONG SELL | Deferred revenue bridge doesn't reconcile, elevated vs IT peers |

**Signal distribution: 4 strong buy · 21 buy · 36 hold · 27 sell · 9 strong sell**

---

## SLIDE 8: Known Limitations & Honesty

**What works, what doesn't, and what we're doing about it.**

| Area | Status |
|------|--------|
| **Sell signal accuracy** | **Strong** — 70% accuracy, -9.1% alpha. Strong sell: 71% at 12M, 79% at 6M |
| **Risk detection** | **Strong** — 26,906 checks including 2,092 deterministic XBRL verifications + 1,337 tone analyses |
| **Sector calibration** | **Done** — ISA 320/SAB 99–based tolerance multipliers for Financials, Industrials, Real Estate |
| **Bank accounting** | **Done** — bank-specific XBRL mappings, structural mismatch filter, wider thresholds |
| **Management tone** | **Done** — deterministic hedging/transparency scoring across all MD&A sections |
| **Confidence calibration** | **Done** — every assessment scored 60-100% based on XBRL coverage |
| **Buy signal accuracy** | **Weak** — a clean filing ≠ a good stock. We don't pretend otherwise. |

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
- **26,906 checks** performed (2,092 deterministic + 19,141 LLM-verified + 4,336 temporal + 1,337 tone)
- **36 companies flagged** (9 Strong Sell, 27 Sell)
- **Sell signal accuracy:** 70% (12M), strong sell 79% (6M), -9.1% avg alpha
- **Bank-aware accounting** — zero false positives from structural bank accounting
- **Management tone scoring** — deterministic hedging/transparency analysis on all MD&A
- Newsletter subscribers: [current count]
- Pro waitlist: [current count]

---

## SLIDE 13: Roadmap

**Now → 3 months → 12 months**

| Now (done) | Next 3 months | 12 months |
|-----------|--------------|-----------|
| 97 companies, 7-layer engine | Full S&P 500 | Russell 1000 |
| Bank-aware + sector-calibrated scoring | Pro tier + Stripe | API for institutions |
| Management tone analysis | Earnings call transcripts (API) | Real-time filing alerts |
| 70% sell accuracy (backtested) | Re-run explanation check with improved prompts | Institutional dashboard |

---

## SLIDE 14: The Ask

**$50,000**

- Scale to full S&P 500 coverage
- Build Pro tier with payment infrastructure
- Add earnings call transcript analysis (API key integration built)
- Six months of runway

---

## SLIDE 15: Team

**Nick Bateman** — Solo founder

Built the full stack: SEC EDGAR ingestion pipeline, seven-layer analysis engine (LLM + deterministic + bank-aware + tone analysis + sector-relative), backtesting framework, Next.js web platform, automated email delivery.

---

## SLIDE 16: Close

**AUDEX**
*The numbers should add up. We check if they do.*

audex.tech
