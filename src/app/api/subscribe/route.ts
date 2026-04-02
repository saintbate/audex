import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

interface Subscriber {
  email: string;
  source: string;
  subscribedAt: string;
}

async function readSubscribers(): Promise<Subscriber[]> {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeSubscribers(subscribers: Subscriber[]): Promise<void> {
  await fs.mkdir(path.dirname(SUBSCRIBERS_FILE), { recursive: true });
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
}

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const subscribers = await readSubscribers();

    if (subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ message: "Already subscribed" });
    }

    subscribers.push({
      email: email.toLowerCase().trim(),
      source: source || "landing",
      subscribedAt: new Date().toISOString(),
    });

    await writeSubscribers(subscribers);

    return NextResponse.json({ message: "Subscribed" });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
