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

**Audex: a multi-pass verification engine for SEC filings.**

| Pass | What It Does |
|------|-------------|
| Extraction | LLM pulls every financial claim from the filing |
| Internal Cross-Reference | Checks claims against each other + XBRL data |
| Temporal Cross-Reference | Compares trends across 4+ years of filings |
| Programmatic Scoring | Generates anomaly, quality, and momentum scores |

Output: An **anomaly score**, a **quality score**, and a **signal** for every company.

---

## SLIDE 5: The Proof

**Backtested across 97 S&P 500 companies and 4 market regimes.**

*(Show a simple bar chart with signal categories on X-axis and 12-month alpha on Y-axis)*

| Signal | 12M Alpha vs SPY | Hit Rate |
|--------|-----------------|----------|
| Strong Buy | +3.1% | 62.5% |
| Buy | +16.9% | 57.1% |
| Hold | -10.0% | — |
| Sell | -5.5% | 59.4% |
| Strong Sell | -9.3% | 66.7% |

**Buy-Sell spread: +23.4 percentage points.**
Signal separation holds across bear markets, recoveries, bull rallies, and consolidation.

---

## SLIDE 6: Live Results

**Q1 2026: 40 companies, 6,778 checks, 18 flags.**

*(Show the top 5 flags as a mini-leaderboard)*

| Ticker | Anomaly | Signal | Top Finding |
|--------|---------|--------|------------|
| $SRE | 57 | STRONG SELL | Net income differs from XBRL by $122M |
| $D | 54 | STRONG SELL | Continuing ops income exceeds net income |
| $VLO | 47 | STRONG SELL | Segment income exceeds company total by $1.1B |
| $AMT | 46 | STRONG SELL | 1,300% revenue discrepancy vs XBRL |
| $UNH | 49 | SELL | Segment revenues exceed consolidated by $173B |

**These are live calls on real filings.**

---

## SLIDE 7: Product

**Free tier → audience. Pro tier → revenue.**

*(Show side-by-side of the website: landing page, leaderboard, company report page)*

- **Free:** Weekly email with top 5 red flags, public leaderboard, track record
- **Pro ($15/mo):** Full S&P 500 coverage, real-time alerts, searchable database, historical archive

Already live: audex.tech

---

## SLIDE 8: Business Model

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
- $1.70 per company per cycle
- Full S&P 500 quarterly: $850
- Break-even: 19 Pro subscribers
- Target: 1,000 Pro subs = $180K ARR

---

## SLIDE 9: Market Opportunity

**$500B+ in losses from accounting fraud and financial misstatement annually (ACFE estimates).**

Audex targets three buyer segments:
1. **Retail investors** — no tools to verify filing claims at scale
2. **RIAs and small funds** — can't afford forensic accounting teams
3. **Compliance teams** — need automated monitoring of portfolio companies

The market for financial data intelligence (Bloomberg, S&P Capital IQ, Refinitiv) is $35B+. Audex enters from a new angle: automated verification, not just aggregation.

---

## SLIDE 10: Traction

*(Update these numbers as they grow)*

- **40 companies** analyzed live
- **6,778 checks** performed
- **18 companies** flagged (9 Strong Sell, 9 Sell)
- Newsletter subscribers: [current count]
- Pro waitlist: [current count]
- Weekly email open rate: [once you have data]

---

## SLIDE 11: Roadmap

**Now → 3 months → 12 months**

| Now (done) | Next 3 months | 12 months |
|-----------|--------------|-----------|
| 40 companies | Full S&P 500 | Russell 1000 |
| Weekly email | Pro tier + Stripe | API for institutions |
| Public leaderboard | Earnings call analysis | Real-time filing alerts |
| Backtest proof | Mobile experience | Institutional dashboard |

---

## SLIDE 12: The Ask

**$50,000**

- Scale to full S&P 500 coverage
- Build Pro tier with payment infrastructure
- Add earnings call transcript analysis
- Six months of runway

---

## SLIDE 13: Team

**Nick Bateman** — Solo founder

Built the full stack: SEC EDGAR ingestion pipeline, multi-pass LLM analysis engine, programmatic scoring system, backtesting framework, Next.js web platform, automated email delivery.

---

## SLIDE 14: Close

**AUDEX**
*The numbers should add up. We check if they do.*

audex.tech
