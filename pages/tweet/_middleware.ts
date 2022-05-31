import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

// export default withAuth({
//   pages: {
//     signIn: "/sign-in",
//     error: "/",
//   },
// });

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const token = req.cookies["next-auth.session-token"];

  // const token = await getToken({ req });

  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }
}
