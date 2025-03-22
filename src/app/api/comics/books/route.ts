import { NextResponse } from "next/server";
import { booksData } from "@/lib/booksData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const seriesId = searchParams.get("seriesId") as string;
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 100);

  try {
    const books = booksData("public/struct/response_1742161357487.json", seriesId, page, limit);
    return NextResponse.json(books);
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}
