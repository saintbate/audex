import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "How Audex Caught a 33% Revenue Discrepancy in Intel's 10-K | Audex",
  description:
    "Technical case study: Audex's verification engine detected $17.7B in inter-segment eliminations that naive LLM extraction pipelines miscount.",
};

export default function CaseStudy() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <p className="text-sm font-mono text-zinc-500 mb-4">
            TECHNICAL CASE STUDY — APRIL 2026
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
            How Audex Caught a 33.5% Revenue Discrepancy in Intel&apos;s 10-K
            That LLM Extraction Missed
          </h1>

          <p className="text-zinc-400 text-lg mb-12 border-l-2 border-zinc-700 pl-4">
            A deterministic verification engine detected $17.7 billion in
            inter-segment eliminations that would silently corrupt any pipeline
            summing segment revenues from Intel&apos;s FY2025 annual report.
          </p>

          <div className="prose prose-invert prose-zinc max-w-none space-y-6 text-zinc-300 leading-relaxed">
            <h2 className="text-xl font-semibold text-white mt-10 mb-4">
              The Filing
            </h2>
            <p>
              Intel Corporation (INTC) filed its FY2025 10-K with the SEC
              (accession 0000050863-26-000011), reporting consolidated revenue of
              $52.853 billion. The filing reflects Intel&apos;s restructured
              segment reporting: Intel Products, Intel Foundry, and All Other —
              a structure adopted after the separation of Intel Foundry Services
              (IFS) into a distinct operating segment.
            </p>

            <h2 className="text-xl font-semibold text-white mt-10 mb-4">
              The Extraction
            </h2>
            <p>
              Audex&apos;s Layer 1 (structured extraction via Claude Sonnet,
              triple-pass consensus) correctly extracted all twelve financial
              claims from the filing. These included the standard income
              statement items — revenue, cost of revenue, gross profit, operating
              income, net income — along with balance sheet totals and segment
              revenue breakdowns:
            </p>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm overflow-x-auto my-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-zinc-500 border-b border-zinc-800">
                    <th className="pb-2 pr-4">Concept</th>
                    <th className="pb-2 text-right">Extracted Value</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr>
                    <td className="py-1 pr-4">us-gaap:Revenues</td>
                    <td className="py-1 text-right">$52,853,000,000</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4">segment:Intel Products</td>
                    <td className="py-1 text-right">$49,147,000,000</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4">segment:Intel Foundry</td>
                    <td className="py-1 text-right">$17,826,000,000</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4">segment:All Other</td>
                    <td className="py-1 text-right">$3,563,000,000</td>
                  </tr>
                  <tr className="border-t border-zinc-800 text-amber-400 font-semibold">
                    <td className="pt-2 pr-4">Segment Sum</td>
                    <td className="pt-2 text-right">$70,536,000,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Every individual number is correct. The LLM read the document
              accurately. A pipeline that stops at extraction would report these
              values with high confidence — and any downstream model that sums
              segment revenues would compute Intel&apos;s total revenue as
              $70.5 billion.
            </p>
            <p className="text-amber-400 font-medium">
              That number is wrong by $17.7 billion.
            </p>

            <h2 className="text-xl font-semibold text-white mt-10 mb-4">
              The Discrepancy
            </h2>
            <p>
              Audex&apos;s Layer 2 (mathematical consistency) performs a
              deterministic check: do the extracted segment revenues sum to the
              extracted total revenue? In this case:
            </p>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm my-6">
              <p className="text-zinc-500 mb-2"># Layer 2 — Math Consistency</p>
              <p>
                <span className="text-zinc-400">segment_sum</span> ={" "}
                <span className="text-emerald-400">$70,536,000,000</span>
              </p>
              <p>
                <span className="text-zinc-400">reported_total</span> ={" "}
                <span className="text-emerald-400">$52,853,000,000</span>
              </p>
              <p>
                <span className="text-zinc-400">delta</span> ={" "}
                <span className="text-red-400">33.4569%</span>
              </p>
              <p className="mt-2 text-red-400 font-semibold">
                STATUS: REJECTED — math_inconsistency
              </p>
            </div>

            <p>
              The 33.5% delta triggered an immediate rejection. All twelve
              claims in the filing were flagged because the segment-to-total
              inconsistency contaminates the reliability of the entire extraction
              set.
            </p>

            <h2 className="text-xl font-semibold text-white mt-10 mb-4">
              Why It Happens
            </h2>
            <p>
              Intel Foundry manufactures semiconductor wafers for two types of
              customers: external foundry clients and Intel&apos;s own product
              divisions. When IFS produces a wafer for Intel Products, it
              records that as revenue in its segment. Intel Products records the
              finished chip sale to the end customer. Under GAAP consolidation,
              the internal transfer must be eliminated to avoid double-counting.
            </p>
            <p>
              The result: Intel&apos;s segment disclosures report $70.5B in
              aggregate segment revenue, but the consolidated income statement
              reports $52.9B. The $17.7B difference is inter-segment
              eliminations — real accounting entries that exist in the footnotes
              but are invisible to any system that only reads the segment table.
            </p>
            <p>
              This is not an error in the filing. It is a structural feature of
              GAAP segment reporting that creates a trap for automated
              extraction.
            </p>

            <h2 className="text-xl font-semibold text-white mt-10 mb-4">
              What This Means for Quant Pipelines
            </h2>
            <p>
              Consider the implications for any data pipeline that ingests
              segment-level revenue:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                A revenue-weighted sector model that sums Intel&apos;s segments
                would overweight Intel by <strong>33%</strong>
              </li>
              <li>
                A segment growth analysis comparing IFS quarter-over-quarter
                would include internal transfer revenue, distorting the organic
                growth rate of the foundry business
              </li>
              <li>
                A peer comparison of Intel Foundry vs. TSMC or Samsung Foundry
                would use a revenue base inflated by captive demand
              </li>
              <li>
                Any factor model using segment-level data would propagate the
                $17.7B error into portfolio weights
              </li>
            </ul>
            <p>
              The LLM extracted everything correctly. The error is not in the
              extraction — it is in the assumption that extracted values are
              ready for downstream use without verification.
            </p>

            <h2 className="text-xl font-semibold text-white mt-10 mb-4">
              The Audit Trail
            </h2>
            <p>
              Every rejected claim produced a persistent audit trail record with:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                The exact layer that triggered the rejection (Layer 2, math
                consistency)
              </li>
              <li>
                The specific check that failed (segment sum vs. total revenue)
              </li>
              <li>
                The computed delta (33.4569%)
              </li>
              <li>
                A unique audit trail ID for each claim, traceable through the
                verification database
              </li>
            </ul>
            <p>
              This is what separates verification from analysis. A signal tool
              would give you a confidence score. Audex gives you a deterministic
              reason for rejection and the exact arithmetic that triggered it.
            </p>

            <h2 className="text-xl font-semibold text-white mt-10 mb-4">
              Broader Results
            </h2>
            <p>
              Running the same engine across 12 companies produced consistent
              patterns:
            </p>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm overflow-x-auto my-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-zinc-500 border-b border-zinc-800">
                    <th className="pb-2 pr-4">Ticker</th>
                    <th className="pb-2 text-right pr-4">Claims</th>
                    <th className="pb-2 text-right pr-4">Verified</th>
                    <th className="pb-2 text-right pr-4">Flagged</th>
                    <th className="pb-2 text-right">Finding</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr>
                    <td className="py-1 pr-4">AAPL</td>
                    <td className="py-1 text-right pr-4">14</td>
                    <td className="py-1 text-right pr-4 text-emerald-400">8</td>
                    <td className="py-1 text-right pr-4 text-amber-400">6</td>
                    <td className="py-1 text-right">0.0000% XBRL delta</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4">SMCI</td>
                    <td className="py-1 text-right pr-4">9</td>
                    <td className="py-1 text-right pr-4 text-emerald-400">9</td>
                    <td className="py-1 text-right pr-4">0</td>
                    <td className="py-1 text-right">0.0000% XBRL delta</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4">GOOG</td>
                    <td className="py-1 text-right pr-4">9</td>
                    <td className="py-1 text-right pr-4 text-emerald-400">8</td>
                    <td className="py-1 text-right pr-4 text-amber-400">1</td>
                    <td className="py-1 text-right">0.0000% XBRL delta</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4">META</td>
                    <td className="py-1 text-right pr-4">9</td>
                    <td className="py-1 text-right pr-4 text-emerald-400">8</td>
                    <td className="py-1 text-right pr-4 text-amber-400">1</td>
                    <td className="py-1 text-right">0.0000% XBRL delta</td>
                  </tr>
                  <tr className="text-red-400">
                    <td className="py-1 pr-4 font-semibold">INTC</td>
                    <td className="py-1 text-right pr-4">12</td>
                    <td className="py-1 text-right pr-4">0</td>
                    <td className="py-1 text-right pr-4">0</td>
                    <td className="py-1 text-right font-semibold">
                      33.5% segment gap ($17.7B)
                    </td>
                  </tr>
                  <tr className="text-red-400">
                    <td className="py-1 pr-4">BA</td>
                    <td className="py-1 text-right pr-4">12</td>
                    <td className="py-1 text-right pr-4">0</td>
                    <td className="py-1 text-right pr-4">0</td>
                    <td className="py-1 text-right">
                      0.2% segment gap ($188M)
                    </td>
                  </tr>
                  <tr className="text-red-400">
                    <td className="py-1 pr-4">WBD</td>
                    <td className="py-1 text-right pr-4">11</td>
                    <td className="py-1 text-right pr-4">0</td>
                    <td className="py-1 text-right pr-4">0</td>
                    <td className="py-1 text-right">
                      10.3% segment gap ($3.9B)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Companies without inter-segment transactions (AAPL, META, GOOG,
              SMCI) verified cleanly — 0.0000% delta against XBRL ground truth
              on every matched claim. Companies with vertically integrated
              segments (INTC, BA, WBD) were correctly flagged with specific,
              traceable reject reasons.
            </p>

            <h2 className="text-xl font-semibold text-white mt-10 mb-4">
              Conclusion
            </h2>
            <p>
              LLM extraction is a solved problem for well-structured documents.
              The unsolved problem is what happens after extraction: are the
              numbers internally consistent? Do they match the authoritative
              XBRL taxonomy? Are the cross-statement relationships
              satisfiable?
            </p>
            <p>
              Intel&apos;s 10-K is a cleanly filed document with no errors. But
              a pipeline that extracts segment revenues without verification
              would produce a $17.7 billion overcount — silently, confidently,
              and with no audit trail explaining why.
            </p>
            <p>
              Audex exists to make that kind of failure impossible.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-zinc-800">
            <p className="text-sm text-zinc-500 mb-4">
              Interested in running Audex on your filings?
            </p>
            <a
              href="/#early-access"
              className="inline-block px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors"
            >
              Request Early Access
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
