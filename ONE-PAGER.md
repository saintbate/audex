# AUDEX

**Automated risk intelligence for SEC filings. We read every number. We check every claim.**

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

Each company receives a **risk assessment**: sector-adjusted anomaly score, quality score, momentum score, confidence level (60-100%), and a composite signal.

**This is a risk filter, not a stock picker.** A clean filing doesn't mean the stock goes up. But a messy filing — where the numbers contradict each other — is predictive of underperformance.

## Proof: The Sell Signal Works

Backtested across **97 S&P 500 companies**, **352 observations**, **5 filing windows** (2020–2026):

| Signal | N | 12M Alpha vs SPY | Hit Rate |
|--------|---|-----------------|----------|
| Strong Sell | 71 | **-9.5%** | 72% |
| Sell | 96 | **-7.6%** | 70% |
| Hold | 157 | -3.7% | — |
| Buy | 22 | -3.0% | 41% |
| Strong Buy | 6 | +17.8% | 67% |

Companies flagged as "sell" or "strong sell" underperform the S&P 500 by an average of **8.4%** over 12 months with **71% accuracy** (n=167). This holds across every filing window and holding period tested.

**Honest caveat:** The "buy" signal is not predictive (-3.0% alpha, 41% hit rate). A clean filing means the accounting is sound — not that the stock will outperform. The value is entirely on the sell side: avoiding the companies whose filings don't add up.

## Live Results — Q1 2026

Running on **97 S&P 500 companies** from Q1 2026 filings:

- **15,799 automated checks** performed (2,092 deterministic + 13,707 LLM-verified)
- **13 Strong Sell** signals: D, SRE, WELL, VLO, ORCL, JNJ, DUK, AMT, PSX, C, XEL, ADBE, NEE
- **25 Sell** signals including: NVDA, UNH, TSLA, BAC, EQIX
- **37 Hold** signals — accounting looks clean, not a buy recommendation
- **18 Buy / 4 Strong Buy** signals — for reference only
- **Confidence scores** range from 60% to 100% based on XBRL verification coverage
- **18 non-calendar fiscal year** companies identified and normalized

Top flag: **Dominion Energy ($D)** — sector-adjusted anomaly 56/100, quality 11/100 (worst in universe), confidence 90%. Continuing operations income exceeds total net income — logically inconsistent.

## Business Model

| Tier | Price | What You Get |
|------|-------|-------------|
| **Free** | $0 | Weekly newsletter (top red flags), public leaderboard, track record |
| **Pro** | $15/mo | Full reports for all S&P 500 companies, real-time alerts, searchable database, historical archive, confidence scores |

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
