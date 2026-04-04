# AUDEX

**Automated risk intelligence for SEC filings. We read every number. We check every claim.**

---

## The Problem

Every quarter, public companies file 10-K and 10-Q reports with the SEC — 200+ page documents containing thousands of financial claims. These claims frequently contradict each other: revenue figures that don't match between sections, segment totals that exceed the consolidated number, EPS values that conflict with XBRL structured data.

The scale makes manual review impossible. Institutional analysts cover 15-20 companies. Retail investors cover fewer. Nobody reads the full filing. When inconsistencies surface — often months later — the stock has already moved.

The SEC processes 3,000+ filings per quarter. The gap between what's filed and what's actually verified is massive.

## The Solution

Audex is a seven-layer verification engine that reads every quantitative claim in a company's SEC filings and cross-references them against each other, against XBRL structured data, against the company's own historical filings, and against management's narrative tone.

**How it works:**

| Layer | What It Does | Method |
|-------|-------------|--------|
| 1. Extraction | Pulls every financial claim with period context | Claude Haiku |
| 2. Internal Cross-Reference | Checks claims against each other + XBRL data | Claude Haiku |
| 3. Deterministic Verification | Bank-aware programmatic claim-vs-XBRL comparison | Deterministic |
| 4. Temporal Cross-Reference | Compares trends across 4+ years of filings | Claude Sonnet |
| 5. Explanation Check | Contextualizes discrepancies using MD&A text and 8-K filings | Claude Haiku |
| 6. Management Tone | Hedging language density, numeric specificity, transparency scoring | Deterministic |
| 7. Scoring | Sector-relative anomaly, quality, momentum, tone-adjusted composite signal | Deterministic |

Each company receives a **risk assessment**: sector-adjusted anomaly score, quality score, momentum score, management tone score, confidence level (60-100%), and a composite signal.

**This is a risk filter, not a stock picker.** A clean filing doesn't mean the stock goes up. But a messy filing — where the numbers contradict each other — is predictive of underperformance.

## Proof: The Sell Signal Works

Backtested across **97 S&P 500 companies** with bank-aware, sector-calibrated, tone-adjusted scoring (2020–2026):

| Signal | N | 12M Alpha vs SPY | Hit Rate |
|--------|---|-----------------|----------|
| Strong Sell | 14 | **-7.7%** | 71% |
| Sell | 35 | **-5.3%** | 69% |
| Hold | 32 | -4.5% | — |
| Buy | 12 | -9.2% | 42% |
| Strong Buy | 4 | +6.8% | 50% |

Companies flagged as "sell" or "strong sell" underperform the S&P 500 by an average of **-9.1% alpha** with **70% accuracy** across all filing windows. Strong sell signals achieve **79% accuracy at 6-month holding** and **71% at 12-month**. Bank-aware accounting eliminates false positives from structural bank differences. Sector-calibrated tolerance (ISA 320/SAB 99–grounded) handles Financials, REITs, and Industrials. Management tone analysis adjusts for hedging vs transparency in MD&A language.

**Honest caveat:** The "buy" signal is not predictive. A clean filing means the accounting is sound — not that the stock will outperform. The value is entirely on the sell side: avoiding the companies whose filings don't add up.

## Live Results — Q1 2026

Running on **97 S&P 500 companies** from Q1 2026 filings:

- **26,906 automated checks** performed (2,092 deterministic + 19,141 LLM-verified + 4,336 temporal + 1,337 management tone)
- **9 Strong Sell** signals: D, SRE, VLO, JNJ, DUK, ORCL, PSX, WELL, TSLA
- **27 Sell** signals including: COP, UNH, EQIX, KO, NKE
- **36 Hold** signals — accounting looks clean, not a buy recommendation
- **21 Buy / 4 Strong Buy** signals — includes JPM, SCHW, BLK (bank-aware)
- **Bank-aware accounting** — zero false positives from structural bank accounting (revenue defs, equity types, debt structures)
- **Management tone scoring** — hedging language density and transparency scoring across all 1,337 MD&A sections
- **18 non-calendar fiscal year** companies identified and normalized

Top flag: **Dominion Energy ($D)** — anomaly 56/100, quality 11/100 (worst in universe), confidence 90%. Continuing operations income exceeds total net income — logically inconsistent.

## Business Model

| Tier | Price | What You Get |
|------|-------|-------------|
| **Free** | $0 | Weekly newsletter (top red flags), public leaderboard, track record |
| **Pro** | $15/mo | Full reports for all S&P 500 companies, real-time alerts, searchable database, historical archive, confidence scores |

Revenue scales linearly: each new company analyzed adds content for free tier (audience) and paid tier (value). At 1,000 Pro subscribers = $180K ARR.

## Unit Economics

- **Cost per company per analysis cycle:** ~$2.00 (7 layers, 2 deterministic)
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

**Nick Bateman** — Solo founder. Built the entire pipeline: SEC EDGAR ingestion, seven-layer analysis engine (LLM + deterministic + bank-aware + tone analysis + sector-relative), backtesting framework, and the Audex web platform.

## Links

**Website:** audex.tech | **Leaderboard:** audex.tech/leaderboard | **Track Record:** audex.tech/track-record
