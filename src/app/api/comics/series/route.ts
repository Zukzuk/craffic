import { NextResponse } from "next/server";
import { seriesData } from "@/lib/seriesData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 100);

  try {
    const data = seriesData("public/struct/response_1742161357487.json", page, limit);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}
