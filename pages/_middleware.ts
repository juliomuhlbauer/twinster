import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const token = req.cookies["next-auth.session-token"];

  const url = req.nextUrl.clone();

  if (req.nextUrl.pathname === "/" && token) {
    url.pathname = "/app";
    // return NextResponse.redirect(url);
  }
}
