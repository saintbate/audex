# Audex — Cursor System Prompt
## Version 2.0 | Neurosymbolic Verification Architecture

---

## What Audex Is

Audex is not a financial analysis tool. It is **trust infrastructure** — a neurosymbolic verification engine that converts probabilistic AI-extracted claims from SEC filings into formally verified, auditable assertions. The core thesis: use LLMs for what they're good at (reading unstructured language, extracting structured data), then route every output through a deterministic verification layer before any claim is emitted as a signal.

The product of Audex is not a dashboard or a report. It is a **verified assertion with a traceable audit trail and a documented reject reason** — something an institution can act on, defend, and eventually stake compliance decisions on.

The long-term architecture is a domain-agnostic verification engine that deploys into regulated industries through vertical-specific rule engines. Finance (SEC filings) is the first deployment. Healthcare and legal are future deployments on the same core infrastructure.

---

## Architecture — The 6-Layer Verification Stack

Every piece of code written for Audex must fit clearly into one of these layers. Never mix layer concerns.

```
Layer 1 — Structured Extraction       [Anthropic API + Pydantic v2]
Layer 2 — Mathematical Consistency    [Pure Python arithmetic verification]
Layer 3 — XBRL Taxonomy Validation    [Arelle / arelle-mcp / edgartools]
Layer 4 — Multi-Pass Consensus        [3x extraction runs, divergence scoring]
Layer 5 — Domain Rules Engine         [Custom GAAP rules, grows over time]
Layer 6 — SMT Constraint Verification [z3-solver, hard mathematical guarantees]
```

**Golden rule:** A claim that fails any layer is rejected with a specific, machine-readable reason code. It never silently passes through. No layer trusts the layer above it.

---

## Tech Stack

| Purpose | Library / Tool |
|---|---|
| SEC filing ingestion | `edgartools` (free, no API key, MIT license) |
| Raw XBRL facts | SEC EDGAR API at `data.sec.gov` (free, no auth) |
| XBRL validation + taxonomy | `arelle`, `arelle-mcp` |
| Structured extraction | Anthropic API (`claude-sonnet-4-20250514`) |
| Output typing + gate 1 | `pydantic` v2 (field validators, model validators) |
| SMT verification | `z3-solver` |
| Database | SQLite (dev) → Postgres (prod) |
| API layer | FastAPI |
| Environment | Python 3.11+, managed with `uv` |

**No freeform text passes through the extraction layer.** Every LLM output is parsed into a typed Pydantic model. If it can't be parsed, it's a reject.

---

## Project Structure

```
audex/
├── ingestion/
│   ├── edgar.py          # edgartools wrappers, SEC API calls
│   ├── xbrl.py           # XBRL fact extraction, calculation tree access
│   └── normalizer.py     # Raw data → normalized internal schema
│
├── extraction/
│   ├── models.py         # Pydantic v2 models for ALL extracted claims
│   ├── prompts.py        # Extraction prompts (structured output only)
│   └── extractor.py      # Anthropic API calls, 3x multi-pass runner
│
├── verification/
│   ├── layer2_math.py    # Arithmetic consistency checks (pure Python)
│   ├── layer3_xbrl.py    # XBRL taxonomy validation via Arelle
│   ├── layer4_consensus.py # Multi-pass divergence scoring
│   ├── layer5_rules.py   # GAAP domain rules engine
│   ├── layer6_smt.py     # Z3 SMT constraint verification
│   └── pipeline.py       # Orchestrates all layers, returns VerifiedAssertion
│
├── models/
│   ├── claim.py          # FilingClaim, VerifiedAssertion, RejectedClaim
│   ├── audit.py          # AuditTrail, RejectReason, VerificationResult
│   └── filing.py         # Filing metadata models
│
├── api/
│   ├── main.py           # FastAPI app
│   └── routes/
│       ├── verify.py     # POST /verify — submit filing for verification
│       └── audit.py      # GET /audit/{claim_id} — retrieve audit trail
│
├── store/
│   ├── db.py             # SQLite/Postgres connection
│   └── repository.py     # Claim storage, audit trail persistence
│
└── tests/
    ├── fixtures/          # Real filing snapshots for deterministic testing
    └── test_verification/ # One test file per verification layer
```

---

## Core Data Models

These models are the contract between every layer. Never pass raw dicts between layers.

```python
from pydantic import BaseModel, field_validator, model_validator
from enum import Enum
from typing import Optional
from decimal import Decimal

class RejectReason(str, Enum):
    PARSE_FAILURE = "parse_failure"           # Layer 1: couldn't structure output
    MATH_INCONSISTENCY = "math_inconsistency" # Layer 2: arithmetic doesn't hold
    XBRL_VIOLATION = "xbrl_violation"         # Layer 3: taxonomy rule broken
    CONSENSUS_DIVERGENCE = "consensus_divergence" # Layer 4: passes disagree
    GAAP_RULE_VIOLATION = "gaap_rule_violation"   # Layer 5: domain rule failed
    SMT_UNSATISFIABLE = "smt_unsatisfiable"       # Layer 6: Z3 returned unsat

class VerificationStatus(str, Enum):
    VERIFIED = "verified"
    REJECTED = "rejected"
    FLAGGED = "flagged"       # Passed but with low confidence
    PENDING = "pending"

class FilingClaim(BaseModel):
    claim_id: str
    filing_accession: str
    ticker: str
    fiscal_period: str        # e.g. "CY2024Q3"
    concept: str              # US-GAAP concept tag e.g. "us-gaap:Revenues"
    claimed_value: Decimal
    unit: str                 # "USD", "shares", etc.
    source_text: str          # Verbatim text LLM extracted from
    extraction_confidence: float  # 0.0-1.0, from multi-pass consensus

    @field_validator("extraction_confidence")
    @classmethod
    def confidence_range(cls, v: float) -> float:
        if not 0.0 <= v <= 1.0:
            raise ValueError("Confidence must be between 0 and 1")
        return v

    @field_validator("claimed_value")
    @classmethod
    def value_not_none(cls, v: Decimal) -> Decimal:
        if v is None:
            raise ValueError("Claimed value cannot be None")
        return v

class VerificationResult(BaseModel):
    layer: int
    status: VerificationStatus
    reject_reason: Optional[RejectReason] = None
    reject_detail: Optional[str] = None   # Human-readable explanation
    xbrl_value: Optional[Decimal] = None  # Ground truth from XBRL where available
    delta_pct: Optional[float] = None     # % difference from XBRL ground truth

class VerifiedAssertion(BaseModel):
    claim: FilingClaim
    status: VerificationStatus
    layer_results: list[VerificationResult]  # One per layer run
    final_reject_reason: Optional[RejectReason] = None
    confidence_score: float   # Composite score 0.0-1.0
    audit_trail_id: str
    verified_at: str          # ISO 8601

class RejectedClaim(BaseModel):
    claim: FilingClaim
    reject_reason: RejectReason
    reject_detail: str
    failed_at_layer: int
    audit_trail_id: str
    rejected_at: str
```

---

## Extraction Layer Rules

**Rule 1:** Every Anthropic API call uses structured output mode. System prompt must instruct the model to return JSON only, no prose, no markdown fences.

**Rule 2:** Run extraction 3 times at `temperature=0`. Compare outputs. Compute consensus score as percentage of field-level agreement across runs. Claims where any numeric field disagrees across runs get flagged with `CONSENSUS_DIVERGENCE`.

**Rule 3:** Never ask the model to interpret or judge. Only ask it to extract. "What is the value reported for X?" not "Is the value for X reasonable?"

**Rule 4:** Always include the verbatim source text in the extraction prompt and require the model to cite which sentence the value came from. This populates `source_text` and enables audit trail traceability.

```python
# Example extraction call pattern
async def extract_claims(filing_text: str, concept: str) -> list[FilingClaim]:
    results = []
    for _ in range(3):  # Multi-pass consensus
        response = await anthropic_client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1000,
            system="""You are a financial data extractor. 
            Return ONLY valid JSON matching the schema provided.
            No prose. No markdown. No explanation.
            If you cannot find the requested value, return null for claimed_value.""",
            messages=[{"role": "user", "content": extraction_prompt(filing_text, concept)}]
        )
        results.append(parse_extraction_response(response))
    return build_consensus_claim(results)
```

---

## Verification Layer Rules

### Layer 2 — Mathematical Consistency

Pure Python only. No LLM involvement. Check:
- Segment revenues sum to consolidated revenue (within 0.5% tolerance)
- Assets = Liabilities + Equity (balance sheet equation)
- Net income flows consistently from income statement to retained earnings
- YoY change stated in MD&A matches computed change from XBRL facts

```python
def verify_balance_sheet_equation(
    total_assets: Decimal,
    total_liabilities: Decimal,
    total_equity: Decimal,
    tolerance: float = 0.005
) -> VerificationResult:
    computed_sum = total_liabilities + total_equity
    delta = abs(total_assets - computed_sum) / total_assets
    if delta > tolerance:
        return VerificationResult(
            layer=2,
            status=VerificationStatus.REJECTED,
            reject_reason=RejectReason.MATH_INCONSISTENCY,
            reject_detail=f"Assets ({total_assets}) ≠ Liabilities + Equity ({computed_sum}), delta {delta:.2%}"
        )
    return VerificationResult(layer=2, status=VerificationStatus.VERIFIED)
```

### Layer 3 — XBRL Taxonomy Validation

Use `edgartools` calculation trees to access the formal XBRL relationships. Cross-reference every extracted numeric claim against the XBRL-tagged value from the same filing. Treat XBRL as ground truth.

```python
from edgar import Company

def get_xbrl_ground_truth(ticker: str, concept: str, period: str) -> Decimal | None:
    company = Company(ticker)
    facts = company.get_facts()
    return facts.to_pandas(concept).get(period)
```

### Layer 5 — Domain Rules Engine

This is a growing list of GAAP rules encoded as explicit Python functions. Each function returns a `VerificationResult`. New rules get added as they're discovered in real filings. Never delete rules. Version them.

```python
GAAP_RULES: list[Callable[[FilingClaim, dict], VerificationResult]] = [
    verify_revenue_recognition_consistency,
    verify_segment_reporting_completeness,
    verify_goodwill_impairment_disclosure,
    # Add new rules here — never remove
]

def run_rules_engine(claim: FilingClaim, context: dict) -> list[VerificationResult]:
    return [rule(claim, context) for rule in GAAP_RULES]
```

### Layer 6 — Z3 SMT Verification

Use Z3 for hard arithmetic constraints where you need a formal proof, not just a check. The key capability: Z3 returns an **unsat core** when constraints are unsatisfiable — telling you exactly which subset of claims is in conflict.

```python
from z3 import Real, Solver, unsat

def verify_with_z3(claims: dict[str, Decimal]) -> VerificationResult:
    s = Solver()
    revenue = Real('revenue')
    segment_a = Real('segment_a')
    segment_b = Real('segment_b')
    segment_c = Real('segment_c')

    s.add(revenue == claims['total_revenue'])
    s.add(segment_a == claims['segment_a_revenue'])
    s.add(segment_b == claims['segment_b_revenue'])
    s.add(segment_c == claims['segment_c_revenue'])
    s.add(segment_a + segment_b + segment_c == revenue)

    if s.check() == unsat:
        return VerificationResult(
            layer=6,
            status=VerificationStatus.REJECTED,
            reject_reason=RejectReason.SMT_UNSATISFIABLE,
            reject_detail="Z3: segment revenues unsatisfiable against reported total"
        )
    return VerificationResult(layer=6, status=VerificationStatus.VERIFIED)
```

---

## Audit Trail Requirements

Every verified or rejected assertion must persist an immutable audit trail record containing:

- All layer results in order
- The raw LLM responses from all 3 extraction passes
- The XBRL ground truth values used for comparison
- The specific rule(s) that triggered rejection
- Timestamps for each layer
- The final composite confidence score and how it was computed

This audit trail is the product. It's what separates Audex from a probabilistic signal tool.

---

## What Not To Build

- No natural language summaries of claims. Output structured data only.
- No "overall score" without a traceable decomposition. Every score must be explainable layer by layer.
- No frontend until the verification pipeline is solid. CLI and API first.
- No external dependencies beyond the stack listed above without explicit justification.
- No LLM calls inside the verification layers (2-6). Those layers are deterministic. LLMs live only in Layer 1.
- No swallowing errors. Every failed verification produces a reject reason. Silent passes are bugs.

---

## Development Philosophy

**Build verification before features.** A new feature that bypasses the verification pipeline does not ship.

**Rules are append-only.** The domain rules engine grows forward. A rule that was wrong gets corrected and versioned, never deleted. The history of rules is part of the audit trail value.

**Test against real filings.** Every new verification layer must pass against at least 10 real EDGAR filings before merging. Fixtures live in `tests/fixtures/`. Use AAPL, MSFT, TSLA, NVDA, and a selection of smaller-cap companies for breadth.

**Confidence scores must be calibrated.** A claim scored 0.9 confidence should be correct 90% of the time against XBRL ground truth. Track calibration as a first-class metric.

**The data moat is the point.** Every verified claim gets logged against its XBRL ground truth. Over time this corpus becomes the most valuable asset in the system. Treat database schema changes to the claims store with the same care as a production API change.

---

## Environment Setup

```bash
uv init audex
cd audex
uv add edgartools pydantic anthropic z3-solver arelle-pkg fastapi uvicorn
uv add --dev pytest pytest-asyncio httpx
```

```
ANTHROPIC_API_KEY=sk-...
DATABASE_URL=sqlite:///./audex.db
SEC_USER_AGENT=YourName your@email.com   # Required by SEC fair access policy
```

---

## First Milestone Checklist

Before any other feature work, these must all pass:

- [ ] `edgartools` pulling real XBRL data for AAPL 10-K (last 3 years)
- [ ] Pydantic `FilingClaim` model rejecting malformed extraction outputs
- [ ] Layer 2 balance sheet equation check passing on 10 real filings
- [ ] Layer 3 XBRL cross-reference catching at least one real discrepancy
- [ ] Layer 4 multi-pass consensus producing a calibrated confidence score
- [ ] `VerifiedAssertion` with full audit trail persisting to SQLite
- [ ] FastAPI endpoint `POST /verify` returning typed JSON with audit trail ID
- [ ] Z3 constraint check running on segment revenue sums

When all 8 pass, the architecture is proven. Everything after is depth and scale.
