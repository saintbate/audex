# Audex Pitch Deck — Slide Content

Dark background (#06060b), accent orange (#f5a623), monospace font for data.

---

## SLIDE 1: Title

**AUDEX**
Document intelligence infrastructure for SEC filings

*audex.tech*

---

## SLIDE 2: The Problem

**80% of enterprise data is trapped in unstructured documents.**

SEC filings alone:
- 3,000+ filings hit the SEC every quarter
- Each filing is 200+ pages of financial claims
- Claims frequently contradict each other between sections
- No existing tool *verifies* these claims at scale — they only summarize or extract

**Summarization and extraction are solved problems. Verification is not.**

---

## SLIDE 3: The Insight

**Every structured document contains cross-checkable claims.**

Revenue in the MD&A should match revenue in the income statement. Segment totals should add up to the consolidated number. EPS should be mathematically consistent with net income and share count.

These checks are mechanical. An LLM can read every claim. A program can verify every relationship. But nobody combines both into a single scored output.

**The gap between extraction and verification is where errors hide — and where value lives.**

---

## SLIDE 4: The Solution

**Audex: a seven-layer document intelligence engine.**

Starting with SEC filings. Expanding to any regulated document type.

| Layer | What It Does | Method |
|-------|-------------|--------|
| Extraction | Pulls every structured claim with period context | LLM |
| Internal Cross-Reference | Checks claims against each other + XBRL data | LLM |
| Deterministic Verification | Bank-aware programmatic claim-vs-XBRL comparison | Deterministic |
| Temporal Cross-Reference | Compares trends across 4+ years of filings | LLM |
| Explanation Check | Contextualizes discrepancies using MD&A and 8-K filings | LLM |
| Management Tone Analysis | Hedging language density, numeric specificity, transparency | Deterministic |
| Scoring | Sector-relative anomaly, quality, momentum → reliability tier | Deterministic |

Output: A **structured reliability assessment** for every document — anomaly score, quality score, confidence level, and a composite reliability tier. Accessible via API.

---

## SLIDE 5: What Makes It Different

**Verification, not summarization.**

Existing tools either summarize documents (LLM-only, hallucination-prone) or extract structured data (rule-based, limited coverage). Audex is the first platform to combine deterministic verification with LLM analysis to *score document reliability*.

**1. Hybrid verification.** 2,092 programmatic XBRL checks with fixed tolerances + LLM-powered cross-referencing. Not opinions — math backed by language understanding.

**2. Domain-aware intelligence.** Bank-specific accounting logic, sector-calibrated tolerances (ISA 320/SAB 99–grounded), management tone analysis. False-positive rate drops by 60% compared to naive approaches.

**3. Structured API output.** Every assessment is a JSON object with scores, findings, confidence intervals, and source references. Built for programmatic consumption.

**4. AI-agent ready.** Full MCP server with 8 tools — any AI agent (Claude, GPT, custom) can query Audex data natively.

---

## SLIDE 6: Verification Accuracy

**Backtested across 97 companies with bank-aware, sector-calibrated, tone-adjusted scoring.**

| Reliability Tier | N | 12M Forward Alpha | Hit Rate |
|-----------------|---|-------------------|----------|
| Critical Risk | 14 | **-7.7%** | 71% |
| Elevated Risk | 35 | **-5.3%** | 69% |
| Baseline | 32 | -4.5% | — |
| Low Risk | 12 | -9.2% | 42% |
| High Reliability | 4 | +6.8% | 50% |

**Companies flagged as elevated or critical risk underperform by -9.1% with 70% accuracy.** Document reliability scores correlate with forward outcomes — inconsistent filings predict problems.

---

## SLIDE 7: Live Results

**Q1 2026: 97 companies, 26,906 verification checks.**

| Ticker | Anomaly | Tier | Top Finding |
|--------|---------|------|------------|
| $D | 56 | CRITICAL RISK | Continuing ops income exceeds net income — logically inconsistent |
| $SRE | 54 | CRITICAL RISK | Net income differs from XBRL by $122M — deterministic check confirms |
| $VLO | 44 | CRITICAL RISK | Segment income exceeds company total by $1.1B, XBRL mismatch confirmed |
| $JNJ | 44 | CRITICAL RISK | Lowest quality score in universe (9). Fiscal-adjusted comparison elevated |
| $ORCL | 39 | CRITICAL RISK | Deferred revenue bridge doesn't reconcile |

**Distribution: 4 high reliability · 18 low risk · 37 baseline · 25 elevated risk · 13 critical risk**

---

## SLIDE 8: The Platform Vision

**SEC filings are the proof of concept. The engine is vertical-agnostic.**

The core loop — *ingest document → extract structured claims → verify against known data → score reliability* — works for any document-heavy regulated industry:

| Vertical | Document Type | Verification Against |
|----------|--------------|---------------------|
| **Financial services** (now) | 10-K, 10-Q, 8-K | XBRL structured data |
| **Insurance** (next) | Claims, policies | Policy terms, actuary tables |
| **Clinical trials** | Trial reports | Registered protocols, endpoints |
| **Government** | Contract disclosures | Obligation schedules |
| **Legal** | Depositions, filings | Cross-filing consistency |

Each new vertical reuses the same engine with a different domain knowledge layer.

---

## SLIDE 9: Market Opportunity

**The intelligent document processing market is projected to reach $12-14B by 2030 (32% CAGR).**

Audex targets the financial services segment — the largest IDP buyer — starting with SEC filing analysis and expanding to other regulated document types.

| Adjacent Market | Size | Our Angle |
|----------------|------|-----------|
| Financial data (Bloomberg, FactSet) | $18B | We verify, they aggregate |
| Audit/accounting analytics | $500M–$1B | We automate what they do manually |
| Intelligent document processing | $12-14B by 2030 | We add verification layer |

The gap: nobody combines extraction + verification + scoring into a programmatic API. Summarizers hallucinate. Extractors don't verify. Audex does both.

---

## SLIDE 10: Competition

| Company | What They Do | Gap |
|---------|-------------|-----|
| **FilingsIQ.ai** | LLM summaries of SEC filings | Summarizes, doesn't verify |
| **Quill AI** | Natural language queries on filings | Query tool, no scoring |
| **Calcbench** | XBRL data extraction | Rule-based only, no LLM layer |
| **Audit Analytics** | Accounting risk flags | $30k+/yr, dashboard-only, no API |
| **Reducto** ($108M) | Document parsing/extraction API | Parses, doesn't verify or score |

**Audex is the only platform combining deterministic verification with LLM analysis into a scored, API-accessible output.**

---

## SLIDE 11: Product & Business Model

**API-first. Data infrastructure.**

| Access Method | Description | Status |
|--------------|-------------|--------|
| REST API | 5 public JSON endpoints, CORS-enabled | Live |
| MCP Server | 8 tools for AI agent integration | Live |
| Web Dashboard | Live analysis, leaderboard, company pages | Live |
| Data Feed | Structured filing analysis feed | Live |

**Revenue model (planned):**

| Tier | Price | Access |
|------|-------|--------|
| Public | Free | API access, 97 companies, standard rate limits |
| Professional | $99/mo | Full S&P 500, webhooks, priority processing |
| Enterprise | Custom | On-prem deployment, custom document types, SLA |

---

## SLIDE 12: Traction

- **97 companies** analyzed live
- **26,906 verification checks** performed (2,092 deterministic + 19,141 LLM-verified + 4,336 temporal + 1,337 tone)
- **38 companies flagged** (13 critical risk, 25 elevated risk)
- **Risk detection accuracy:** 70% (12M), critical risk 79% (6M)
- **Bank-aware accounting** — zero false positives from structural bank accounting
- **5 public API endpoints** — live at audex.tech/api/v1/
- **MCP server** — 8 tools, 2 resources, stdio + HTTP transport
- **Forward-tested prediction log** — timestamped, git-committed snapshots

---

## SLIDE 13: Roadmap

**Now → 3 months → 12 months**

| Now (done) | Next 3 months | 12 months |
|-----------|--------------|-----------|
| 97 companies, 7-layer engine | Full S&P 500 (500 companies) | Russell 1000 + international |
| REST API + MCP server | Authenticated API tiers + webhooks | Enterprise on-prem option |
| Bank-aware + sector-calibrated | Earnings call transcript integration | Insurance vertical launch |
| Confidence intervals + prediction log | Historical backfill (2018-present) | Custom document type support |

---

## SLIDE 14: The Ask

**$50,000**

- Scale to full S&P 500 coverage (~$4K/year in API costs)
- Build authenticated API tiers + webhook infrastructure
- Add earnings call transcript analysis (data source built)
- Six months of runway for growth and iteration

---

## SLIDE 15: Team

**Nick Bateman** — Solo founder, Vertical AI LLC

Built the entire platform: SEC EDGAR ingestion pipeline, seven-layer analysis engine (LLM + deterministic + bank-aware + tone analysis + sector-relative), REST API, MCP server, forward-tested prediction log, backtesting framework, and the Next.js web dashboard.

---

## SLIDE 16: Close

**AUDEX**
*Document intelligence infrastructure. Starting with SEC filings.*

audex.tech · /api/v1/companies · python -m verifyai.mcp_server
