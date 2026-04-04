# AUDEX

**AI-powered SEC filing intelligence. We read every number. We check every claim.**

---

## The Problem

Every quarter, public companies file 10-K and 10-Q reports with the SEC — 200+ page documents containing thousands of financial claims. These claims frequently contradict each other: revenue figures that don't match between sections, segment totals that exceed the consolidated number, EPS values that conflict with XBRL structured data.

The scale makes manual review impossible. Institutional analysts cover 15-20 companies. Retail investors cover fewer. Nobody reads the full filing. When inconsistencies surface — often months later — the stock has already moved.

The SEC processes 3,000+ filings per quarter. The gap between what's filed and what's actually verified is massive.

## The Solution

Audex is a six-layer verification engine that reads every quantitative claim in a company's SEC filings and cross-references them against each other, against XBRL structured data, against the company's own historical filings, and against management's narrative explanations.

**How it works:**

| Layer | What It Does | Method |
|-------|-------------|--------|
| 1. Extraction | Pulls every financial claim with period context | Claude Haiku |
| 2. Internal Cross-Reference | Checks claims against each other + XBRL data | Claude Haiku |
| 3. Deterministic Verification | Programmatic claim-vs-XBRL comparison (fixed tolerances) | Deterministic |
| 4. Temporal Cross-Reference | Compares trends across 4+ years of filings | Claude Sonnet |
| 5. Explanation Check | Contextualizes discrepancies using MD&A text and 8-K filings | Claude Haiku |
| 6. Scoring | Sector-relative anomaly, quality, momentum, composite risk signal | Deterministic |

Each company receives a **sector-adjusted anomaly score** (how inconsistent vs peers), a **quality score** (how clean are the numbers), a **momentum score** (improving or deteriorating), and a **composite risk signal** (strong sell → strong buy).

**What makes it different:**
- **Deterministic ground truth** — 2,092 programmatic XBRL checks with fixed tolerances, not just LLM opinions
- **Sector-relative scoring** — adjusts for industry-specific filing complexity (utilities ≠ tech)
- **Composite risk signals** — both anomaly AND quality must be bad to flag; eliminates false positives from one-dimensional thresholds

## Proof: The Signal Is Real

Backtested across **97 S&P 500 companies**, **230 observations**, **5 filing windows**, and multiple market regimes (2020–2026):

| Signal | N | 12M Alpha vs SPY | Hit Rate |
|--------|---|-----------------|----------|
| Strong Buy | 5 | **+25.6%** | 80.0% |
| Buy | 17 | -2.0% | 41.2% |
| Hold | 93 | -5.5% | — |
| Sell | 66 | **-9.9%** | 66.7% |
| Strong Sell | 49 | **-16.3%** | 69.4% |

Companies flagged as "strong sell" underperform the S&P 500 by an average of 16.3% over the following 12 months with a 69% hit rate. The strong buy – strong sell spread is **+41.9 percentage points**. The engine is strongest at its highest-conviction calls and holds across every holding period (3M, 6M, 12M).

**Honest caveat:** The moderate "buy" signal is not yet predictive (-2.0% alpha). The engine is better at finding problems than confirming cleanliness — which makes sense for a verification system.

## Live Results — Q1 2026

Running on **97 S&P 500 companies** from Q1 2026 filings:

- **15,799 automated checks** performed (2,092 deterministic + 13,707 LLM-verified)
- **13 Strong Sell** signals: SRE, WELL, D, VLO, ORCL, JNJ, DUK, PSX, C, XEL, ADBE, AMT, NEE
- **25 Sell** signals including: NVDA, UNH, TSLA, BAC, EQIX
- **37 Hold** signals
- **18 Buy** signals including: GOOGL, META, XOM, NFLX, CSCO
- **4 Strong Buy** signals: APD, JPM, BKNG, NFLX
- **Confidence scores** range from 60% to 100% based on XBRL verification coverage
- **18 non-calendar fiscal year** companies identified and normalized

Top flag: **Sempra Energy ($SRE)** — sector-adjusted anomaly 54/100, quality 13/100, confidence 90%. Net income differs from XBRL by $122M (16.7%). Deterministic check confirms. Revenue discrepancy unexplained in MD&A.

## Business Model

| Tier | Price | What You Get |
|------|-------|-------------|
| **Free** | $0 | Weekly newsletter (top 5 flags), public leaderboard, track record |
| **Pro** | $15/mo | Full reports for all S&P 500 companies, real-time alerts, searchable database, historical archive |

Revenue scales linearly: each new company analyzed adds content for free tier (audience) and paid tier (value). At 1,000 Pro subscribers = $180K ARR.

## Unit Economics

- **Cost per company per analysis cycle:** ~$2.00 (6 layers including deterministic)
- **Full S&P 500 quarterly cycle:** ~$1,000
- **Annual analysis cost (4 quarters):** ~$4,000
- **Break-even:** 23 Pro subscribers cover annual analysis costs

## The Ask

**$50K** to:
1. Scale from 97 → full S&P 500 (500 companies) — ~$4,000/year in API costs
2. Build the Pro tier (Stripe, dashboard, real-time alerts)
3. Add earnings call transcript analysis (new data source)
4. Six months of runway for growth and iteration

## Team

**Nick Bateman** — Solo founder. Built the entire pipeline: SEC EDGAR ingestion, six-layer analysis engine (LLM + deterministic + sector-relative), backtesting framework, and the Audex web platform.

## Links

**Website:** audex.tech | **Leaderboard:** audex.tech/leaderboard | **Track Record:** audex.tech/track-record
