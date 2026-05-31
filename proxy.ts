import { NextRequest, NextResponse } from "next/server";

const ADMIN_ROUTE = process.env.ADMIN_ROUTE!;
const ADMIN_SECRET = process.env.ADMIN_SECRET!;

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const segments = pathname.split("/");
  const firstSegment = segments[1];

  // Block direct access to /adminPanel
  if (firstSegment === "adminPanel") {
    return new NextResponse(null, { status: 404 });
  }

  // Only handle requests matching the secret env route
  if (firstSegment !== ADMIN_ROUTE) return;

  const newPath = pathname.replace(`/${ADMIN_ROUTE}`, "/adminPanel");
  const token = req.cookies.get("admin_token")?.value;
  const isLoginPage = segments[2] === "login";

  if (!isLoginPage && token !== ADMIN_SECRET) {
    return NextResponse.redirect(new URL(`/${ADMIN_ROUTE}/login`, req.url));
  }

  if (isLoginPage && token === ADMIN_SECRET) {
    return NextResponse.redirect(new URL(`/${ADMIN_ROUTE}/dashboard`, req.url));
  }

  return NextResponse.rewrite(new URL(newPath, req.url));
}

export const config = {
  matcher: ["/:path*"],
};