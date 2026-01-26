
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/auth";

// Proxy function to redirect all requests to /sign-in
export default async function proxy(request: NextRequest) {
    const session = await getSession();

    // Get the dashboard page path
    const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');

    if (isDashboardPage && !session?.user) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // Get the auth page path
    const isAuthPage = request.nextUrl.pathname.startsWith('/sign-in') || request.nextUrl.pathname.startsWith('/sign-up');

    if (isAuthPage && session?.user) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If authenticated or not accessing dashboard, proceed as normal
    return NextResponse.next();
}