import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/', '/api/webhook']);

export default clerkMiddleware(async (auth, request) => {
    const authData = await auth();

    if (!isPublicRoute(request)) {
        // Protect the route if it's not public
        await auth.protect();
    } else if (authData.userId) {
        // Redirect authenticated users to appropriate organization path
        let path = '/select-org';

        if (authData.orgId) {
            path = `/organization/${authData.orgId}`;
        }

        const redirectUrl = new URL(path, request.url);
        return NextResponse.redirect(redirectUrl);
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
