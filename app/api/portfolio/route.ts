import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Portfolio from "@/lib/models/Portfolio";
import Category from "@/lib/models/Category"; // Required for populate("categoryId")

export async function GET() {
  try {
    await connectToDatabase();
    // Ensure Category is registered
    const _ = Category.modelName; 
    // Sort by newest first, populate category data
    const portfolios = await Portfolio.find({}).populate("categoryId").sort({ createdAt: -1 });
    return NextResponse.json(portfolios);
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolios" },
      { status: 500 }
    );
  }
}
