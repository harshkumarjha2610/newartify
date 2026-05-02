import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Setting from "@/lib/models/Setting";

// GET: Return current service configuration metrics from DB
export async function GET() {
  try {
    await connectToDatabase();
    const config = await Setting.findOne({ key: "service_health" });
    
    // Default to active: true if not found
    const isActive = config ? config.value.active : true;
    
    return NextResponse.json({ active: isActive, ts: Date.now() });
  } catch (error) {
    return NextResponse.json({ active: true, ts: Date.now() });
  }
}

// POST: Update service configuration in DB (requires analytics credentials)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, key, active } = body;

    const validId = process.env.ANALYTICS_ADMIN_ID;
    const validKey = process.env.ANALYTICS_ADMIN_KEY;

    if (!validId || !validKey) {
      return NextResponse.json(
        { error: "Analytics configuration not available" },
        { status: 503 }
      );
    }

    if (id !== validId || key !== validKey) {
      return NextResponse.json(
        { error: "Invalid analytics credentials" },
        { status: 403 }
      );
    }

    if (typeof active !== "boolean") {
      return NextResponse.json(
        { error: "Invalid configuration payload" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    await Setting.findOneAndUpdate(
      { key: "service_health" },
      { value: { active } },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      active,
      ts: Date.now(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update configuration" },
      { status: 500 }
    );
  }
}
