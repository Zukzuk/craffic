import { NextResponse } from "next/server";
import { alphabeticalData } from "@/lib/alphabeticalData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? 100);

  try {
    const data = alphabeticalData("public/struct/response_1742161357487.json", limit);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}
