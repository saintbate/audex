import { neon } from "@neondatabase/serverless";

export function getDb() {
  const url = (process.env.DATABASE_URL || "").replace(/^"|"$/g, "");
  return neon(url);
}
