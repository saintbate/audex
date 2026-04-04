# AUDEX

**AI-powered SEC filing intelligence. We read every number. We check every claim.**

---

## The Problem

Every quarter, public companies file 10-K and 10-Q reports with the SEC — 200+ page documents containing thousands of financial claims. These claims frequently contradict each other: revenue figures that don't match between sections, segment totals that exceed the consolidated number, EPS values that conflict with XBRL structured data.

The scale makes manual review impossible. Institutional analysts cover 15-20 companies. Retail investors cover fewer. Nobody reads the full filing. When inconsistencies surface — often months later — the stock has already moved.

The SEC processes 3,000+ filings per quarter. The gap between what's filed and what's actually verified is massive.

## The Solution

Audex is an automated multi-pass verification engine that reads every quantitative claim in a company's SEC filings and cross-references them against each other, against XBRL structured data, and against the company's own historical filings.

**How it works:**

| Pass | What It Does | Model |
|------|-------------|-------|
| 1. Extraction | Pulls every financial claim from filing text | Claude Haiku |
| 2. Internal Cross-Reference | Checks claims against each other + XBRL data | Claude Haiku |
| 3. Temporal Cross-Reference | Compares trends across 4+ years of filings | Claude Sonnet |
| 4. Programmatic Scoring | Generates anomaly/quality/momentum scores | Deterministic |

Each company receives an **anomaly score** (how inconsistent is the filing), a **quality score** (how clean are the numbers), and an **overall signal** (strong sell → strong buy).

## Proof: The Signal Is Real

Backtested across **97 S&P 500 companies**, **158 observations**, and **4 market regimes** (2022–2025):

| Metric | Result |
|--------|--------|
| Sell signal alpha vs SPY (12-month) | **-9.5%** |
| Buy-Sell spread | **+23.4 percentage points** |
| Sell hit rate | **66%** |
| Signal holds across regimes | **Bear, recovery, bull, consolidation** |

Companies our engine flags as "sell" underperform the S&P 500 by an average of 9.5% over the following 12 months. This signal separation holds across every market regime we've tested.

## Live Results — Q1 2026

Currently running on **40 S&P 500 companies** from Q1 2026 filings:

- **6,778 automated checks** performed
- **9 Strong Sell** signals: SRE (57), D (54), VLO (47), AMT (46), DUK (44), PSX (42), TMO (41), LOW (38), O (35)
- **9 Sell** signals: UNH (49), XEL (36), ECL (34), ADBE (31), ORCL (31), CL (30), WFC (29), IBM (28), WMT (27)
- **22 Hold** signals: cleanest filings include CRM (8), TJX (10), MCD (15)

Top flag: **Sempra Energy ($SRE)** — anomaly score 57/100, quality score 9/100. Net income differs from XBRL by $122M (16.7%). Revenue discrepancy of $440M vs reported figures.

## Business Model

| Tier | Price | What You Get |
|------|-------|-------------|
| **Free** | $0 | Weekly newsletter (top 5 flags), public leaderboard, track record |
| **Pro** | $15/mo | Full reports for all S&P 500 companies, real-time alerts, searchable database, historical archive |

Revenue scales linearly: each new company analyzed adds content for free tier (audience) and paid tier (value). At 1,000 Pro subscribers = $180K ARR.

## Unit Economics

- **Cost per company per analysis cycle:** ~$1.70 (LLM API costs)
- **Full S&P 500 quarterly cycle:** ~$850
- **Annual analysis cost (4 quarters):** ~$3,400
- **Break-even:** 19 Pro subscribers cover annual analysis costs

## The Ask

**$50K** to:
1. Scale from 40 → full S&P 500 (500 companies) — ~$3,400/year in API costs
2. Build the Pro tier (Stripe, dashboard, real-time alerts)
3. Add earnings call transcript analysis (new data source)
4. Six months of runway for growth and iteration

## Team

**Nick Bateman** — Solo founder. Built the entire pipeline: SEC EDGAR ingestion, multi-pass LLM analysis engine, programmatic scoring, backtesting framework, and the Audex web platform.

## Links

**Website:** audex.tech | **Leaderboard:** audex.tech/leaderboard | **Track Record:** audex.tech/track-record | **API:** audex.tech/api/feed
