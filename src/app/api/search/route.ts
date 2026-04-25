import { NextResponse } from "next/server";
import { semanticSearch } from "@/services/searchService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query } = body;

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Search query is required." },
        { status: 400 }
      );
    }

    const { results, isAIPowered } = await semanticSearch(query.trim());

    return NextResponse.json({
      success: true,
      results,
      isAIPowered,
    });
  } catch (error: any) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Search failed." },
      { status: 500 }
    );
  }
}
