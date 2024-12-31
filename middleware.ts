import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from "@/lib/auth"
import { betterFetch } from "@better-fetch/fetch";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
    const url = request.nextUrl
    const hostname = request.headers.get('host') || ''
    const path = url.pathname

    console.log('Middleware triggered:', {
        hostname,
        path,
        url: url.toString()
    })

    // Check authentication for dashboard routes
    if (path.startsWith('/dashboard')) {
        const { data: session } = await betterFetch<Session>(
            "/api/auth/get-session",
            {
                baseURL: request.nextUrl.origin,
                headers: {
                    //get the cookie from the request
                    cookie: request.headers.get("cookie") || "",
                },
            },
        );

        if (!session) {
            // Redirect to login if not authenticated
            const loginUrl = new URL('/login', url)
            loginUrl.searchParams.set('callbackUrl', url.pathname)
            return NextResponse.redirect(loginUrl)
        }
    }

    const mainDomain = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const mainDomainHost = new URL(mainDomain).host

    // Skip if it's the main domain
    if (hostname === mainDomainHost) {
        return NextResponse.next()
    }

    // Extract domain and remove port number only
    const domain = hostname.split(':')[0] // Remove port number but keep full domain
    
    // Get the slug from the path (remove leading slash)
    const slug = path.slice(1)

    // Rewrite to our dynamic route handler
    const newUrl = new URL(`/${domain}/${slug}`, url)
    console.log('Rewriting to:', newUrl.toString())
    return NextResponse.rewrite(newUrl)
}

export const config = {
    matcher: [
        // Match all paths except Next.js internals
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
} 