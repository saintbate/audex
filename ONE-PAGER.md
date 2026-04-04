# Audex — AI-Powered SEC Filing Intelligence

## The Problem

Public company SEC filings contain thousands of financial claims that often contradict each other — revenue figures that don't match between sections, segment totals that exceed consolidated numbers, EPS calculations that conflict with XBRL data. These inconsistencies are buried in 200+ page documents that most investors never read in full. When filings contain red flags, the market usually finds out months later.

## The Solution

Audex is an automated multi-pass verification engine that reads every claim in a company's 10-K and 10-Q filings and cross-references them against each other. When the numbers don't add up, we flag it — before the market does.

**Four-pass analysis pipeline:**
1. **Extraction** — LLM extracts all quantitative claims from filing text
2. **Internal Cross-Reference** — Verifies claims against each other and XBRL structured data
3. **Temporal Cross-Reference** — Compares trends across 4+ years of filings
4. **Programmatic Scoring** — Generates anomaly, quality, and momentum scores without LLM bias

## Traction

- **40 companies** analyzed from Q1 2026 SEC filings
- **6,778 automated checks** performed
- **9 Strong Sell** and **9 Sell** signals generated
- Weekly newsletter subscribers growing
- Pro tier waitlist open

## The Track Record

Backtested across **97 S&P 500 companies** and **4 market regimes** (2022–2025):

| Metric | Value |
|--------|-------|
| Sell signal alpha vs SPY | **-9.5%** (sells underperform) |
| Buy-Sell spread | **+23.4 percentage points** |
| Sell hit rate | **66%** |
| Total observations | **158** |

Signal separation holds across bear markets, recoveries, bull rallies, and consolidation periods.

## Business Model

**Free tier:** Weekly newsletter with top 5 red flags, public leaderboard, track record page.

**Pro tier ($15/mo):** Full reports for every S&P 500 company, real-time filing alerts, searchable anomaly score database, historical score archive.

Revenue model scales linearly — each new company analyzed adds content for both free (audience growth) and paid (subscriber value) tiers.

## Technology

- **Engine:** Python, Anthropic Claude (Haiku for extraction, Sonnet for temporal analysis)
- **Web:** Next.js, Tailwind CSS, Vercel
- **Data:** Neon Postgres, SEC EDGAR API, XBRL structured data
- **Email:** Resend (transactional + weekly digest)
- **Cost:** ~$1.70 per company per analysis cycle

## What We Need

Funding to scale from 40 companies to full S&P 500 coverage (500 companies), build the Pro tier with Stripe integration, and expand the analysis to include quarterly earnings call transcripts.

## Links

- **Website:** [audex.tech](https://audex.tech)
- **Leaderboard:** [audex.tech/leaderboard](https://audex.tech/leaderboard)
- **Track Record:** [audex.tech/track-record](https://audex.tech/track-record)
- **API Feed:** [audex.tech/api/feed](https://audex.tech/api/feed)
