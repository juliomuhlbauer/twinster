import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const auth = req.headers.get("auth");

  if (auth === process.env.API_ROUTE_SECRET) {
    return NextResponse.next();
  }

  return new Response("Auth required", {
    status: 401,
  });
}
