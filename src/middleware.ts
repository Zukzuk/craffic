import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Redirect root or `/series` without `?page` query parameter to `/series?page=1`
  if ((pathname === "/" || pathname === "/series") && !searchParams.has("page")) {
    const url = request.nextUrl.clone();
    url.searchParams.set("page", "1"); // Add `page=1` to the query string
    url.pathname = "/series";
    return NextResponse.redirect(url);
  }

  // Redirect `/series/[seriesId]/books` without `?page` to `/series/[seriesId]/books?page=1`
  const matchBooks = pathname.match(/^\/series\/([^/]+)\/books$/);
  if (matchBooks && !searchParams.has("page")) {
    const url = request.nextUrl.clone();
    url.searchParams.set("page", "1"); // Add `page=1` to the query string
    url.pathname = `/series/${matchBooks[1]}/books`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
