import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib";

export default async function middleware(req: NextRequest) {
  //1- Check if route is protected
  const protectedRoutes = ["/dashboard"];
  const currentPath = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPath);

  //2- Check for valid session
  if (isProtectedRoute) {
    const cookie = cookies().get("session")?.value;
    const session = cookie ? decrypt(cookie) : null;

    //3- Redirect if not authenticated
    const resolvedSession = await session;

    if (!resolvedSession?.userId) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }

  //4- Render route
}

// Routes middleware should *not* run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
