"use client";

export default function DeveloperCTA() {
  return (
    <section id="integrate" className="py-20 px-6 bg-surface-2/50">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Start building with Audex data
        </h2>
        <p className="text-muted text-lg mb-8">
          Public JSON API. No authentication required. Integrate filing
          intelligence into your own tools, models, and workflows.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="/api/v1/methodology"
            className="bg-accent text-background px-8 py-3 rounded-lg font-semibold hover:bg-accent-dim transition-colors"
          >
            Explore the API
          </a>
          <a
            href="/methodology"
            className="border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-surface transition-colors"
          >
            Read the Docs
          </a>
        </div>

        <p className="text-xs text-muted">
          Also available as an MCP server for AI agent integration.
        </p>
      </div>
    </section>
  );
}
