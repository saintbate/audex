"use client";

const ENDPOINTS = [
  {
    method: "GET",
    path: "/api/v1/companies",
    description: "All companies with scores, signals, and findings",
    params: "?sector=&signal=&limit=&offset=",
  },
  {
    method: "GET",
    path: "/api/v1/company",
    description: "Single company full assessment detail",
    params: "?ticker=AAPL",
  },
  {
    method: "GET",
    path: "/api/v1/signals",
    description: "Companies grouped by reliability tier",
    params: "?signal=elevated_risk",
  },
  {
    method: "GET",
    path: "/api/v1/methodology",
    description: "Machine-readable methodology and scoring criteria",
    params: "",
  },
  {
    method: "GET",
    path: "/api/feed",
    description: "Filing analysis feed ranked by anomaly score",
    params: "",
  },
];

const MCP_TOOLS = [
  "get_company_risk",
  "get_flagged_companies",
  "compare_companies",
  "search_findings",
  "get_company_checks",
  "get_backtest_performance",
  "get_signal_summary",
  "list_companies",
];

export default function APIShowcase() {
  return (
    <section id="api" className="py-20 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            API &amp; integrations
          </h2>
          <p className="text-muted text-lg">
            Access all Audex data programmatically. No auth required.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="border border-border rounded-lg bg-surface p-8">
            <div className="text-sm font-mono text-accent mb-2">REST API</div>
            <div className="text-xl font-bold mb-1">JSON Endpoints</div>
            <div className="text-sm text-muted mb-6">Public, CORS-enabled, no auth</div>

            <div className="space-y-3 mb-6">
              {ENDPOINTS.map((ep) => (
                <div key={ep.path} className="text-xs">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono font-bold text-green">{ep.method}</span>
                    <code className="font-mono text-accent">{ep.path}</code>
                  </div>
                  <p className="text-muted pl-[3.2rem]">{ep.description}</p>
                </div>
              ))}
            </div>

            <a
              href="/api/v1/companies"
              className="block w-full text-center border border-border text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-surface-2 transition-colors text-sm"
            >
              Try it now
            </a>
          </div>

          <div className="border border-accent/40 rounded-lg bg-surface p-8 relative">
            <div className="text-sm font-mono text-accent mb-2">MCP SERVER</div>
            <div className="text-xl font-bold mb-1">AI Agent Access</div>
            <div className="text-sm text-muted mb-6">For Claude, GPT, and custom agents</div>

            <div className="space-y-2 mb-6">
              {MCP_TOOLS.map((tool) => (
                <div key={tool} className="flex items-center gap-2 text-xs">
                  <svg
                    className="h-3.5 w-3.5 shrink-0 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <code className="font-mono text-muted">{tool}()</code>
                </div>
              ))}
            </div>

            <div className="bg-background rounded-lg p-3 mb-4 border border-border">
              <code className="text-[11px] font-mono text-muted block">
                python -m verifyai.mcp_server
              </code>
            </div>

            <p className="text-xs text-muted text-center">
              stdio and HTTP transport supported
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
