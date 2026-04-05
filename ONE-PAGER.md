# AUDEX

**Document intelligence infrastructure for SEC filings. Extract. Verify. Score.**

---

## The Problem

Every quarter, public companies file 200+ page reports with the SEC containing thousands of financial claims. Existing tools either *summarize* these documents (LLM-only, hallucination-prone) or *extract* structured data (rule-based, limited coverage). Nobody *verifies* the claims at scale — checking whether the numbers are internally consistent, match structured XBRL data, and align with historical filings and management narrative.

The gap between extraction and verification is where errors hide. The SEC processes 3,000+ filings per quarter. The verification gap is massive.

## The Solution

Audex is a seven-layer document intelligence engine that reads every quantitative claim in a company's SEC filings and verifies them against each other, against XBRL structured data, against historical filings, and against management's narrative tone.

**How it works:**

| Layer | What It Does | Method |
|-------|-------------|--------|
| 1. Extraction | Pulls every financial claim with period context | LLM |
| 2. Internal Cross-Reference | Checks claims against each other + XBRL data | LLM |
| 3. Deterministic Verification | Bank-aware programmatic claim-vs-XBRL comparison | Deterministic |
| 4. Temporal Cross-Reference | Compares trends across 4+ years of filings | LLM |
| 5. Explanation Check | Contextualizes discrepancies using MD&A text and 8-K filings | LLM |
| 6. Management Tone | Hedging language density, numeric specificity, transparency scoring | Deterministic |
| 7. Scoring | Sector-relative anomaly, quality, momentum, tone-adjusted reliability tier | Deterministic |

Each document receives a **structured reliability assessment**: anomaly score, quality score, momentum score, management tone score, confidence level (60-100%), and a composite reliability tier. All output is accessible via JSON API.

## What Makes It Different

Existing tools in this space fall into two categories: **summarizers** (FilingsIQ, Quill AI — LLM-only, no verification) and **extractors** (Calcbench, Audit Analytics — rule-based, no language understanding). Audex is the first platform to combine deterministic verification with LLM analysis into a scored, API-accessible output.

- **Hybrid verification** — 2,092 programmatic XBRL checks + LLM cross-referencing
- **Domain-aware** — bank-specific accounting logic, ISA 320/SAB 99 sector calibration
- **API-first** — structured JSON output, MCP server for AI agents
- **Vertical-agnostic core** — SEC filings are the proof of concept; the engine works for any document type

## Verification Accuracy

Backtested across **97 S&P 500 companies** with bank-aware, sector-calibrated, tone-adjusted scoring (2020–2026):

| Reliability Tier | N | 12M Forward Alpha | Hit Rate |
|-----------------|---|-------------------|----------|
| Critical Risk | 14 | **-7.7%** | 71% |
| Elevated Risk | 35 | **-5.3%** | 69% |
| Baseline | 32 | -4.5% | — |
| Low Risk | 12 | -9.2% | 42% |
| High Reliability | 4 | +6.8% | 50% |

Companies flagged as elevated or critical risk underperform the S&P 500 by **-9.1%** with **70% accuracy** across all filing windows. Document reliability scores correlate with forward outcomes.

## Live Results — Q1 2026

- **26,906 automated verification checks** (2,092 deterministic + 19,141 LLM-verified + 4,336 temporal + 1,337 tone)
- **13 Critical Risk** filings: D, SRE, VLO, JNJ, DUK, ORCL, PSX, and others
- **25 Elevated Risk** filings including: COP, UNH, EQIX, KO, NKE
- **Bank-aware accounting** — zero false positives from structural bank differences
- **Confidence intervals** — 95% CI on every anomaly score

## Market Opportunity

The intelligent document processing market is projected to reach **$12-14B by 2030** (32% CAGR). Audex targets the financial services segment — the largest IDP buyer — starting with SEC filings.

Funded competitors validate the space: **Reducto** raised $108M for document parsing (no verification). **Factify** raised $73M for document standards. **Notch** raised $45M for regulated industry AI agents. Nobody combines extraction + verification + scoring.

## Product & Business Model

| Access | Status |
|--------|--------|
| REST API (5 endpoints, CORS, no auth) | Live |
| MCP Server (8 tools, stdio + HTTP) | Live |
| Web Dashboard (leaderboard, company pages) | Live |
| Forward-tested prediction log | Live |

**Revenue model (planned):** API tiers — public (free, 97 companies), professional ($99/mo, full S&P 500 + webhooks), enterprise (custom, on-prem + custom document types).

## The Ask

**$50K** to:
1. Scale from 97 → full S&P 500 (500 companies) — ~$4,000/year in API costs
2. Build authenticated API tiers and webhook infrastructure
3. Add earnings call transcript analysis (data source built)
4. Six months of runway for growth and iteration

## Team

**Nick Bateman** — Solo founder, Vertical AI LLC. Built the entire platform: SEC EDGAR ingestion pipeline, seven-layer analysis engine, REST API, MCP server, backtesting framework, and the Audex web dashboard.

## Links

**Website:** audex.tech | **API:** audex.tech/api/v1/companies | **Methodology:** audex.tech/methodology
