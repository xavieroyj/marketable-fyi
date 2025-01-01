import { NextResponse } from "next/server";
import prisma from "@/lib/prisma-db";

interface Params {
    domain: string;
    slug: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
    try {
        console.log('Inside [domain]/[slug]/route.ts')
        console.log('Request:', request);
        console.log('Params:', params);

        const { domain, slug } = params;

        // If no slug is provided, return 404
        if (!slug) {
            return NextResponse.json(
                { error: 'Slug not provided' },
                { status: 404 }
            )
        }
        console.log('Processing click:', { domain, slug })

        const link = await prisma.link.findFirst({
            where: {
                slug,
                domain: {
                    domainName: domain
                }
            },
            include: {
                domain: true
            }
        });

        if (!link) {
            console.log('Link not found:', { domain, slug });
            return NextResponse.json(
                { error: 'Link not found' },
                { status: 404 }
            )
        }

        // Track the click
        await prisma.analytics.create({
            data: {
                linkId: link.id,
                userAgent: request.headers.get('user-agent') || null,
                referrer: request.headers.get('referer') || null,
                // You might want to get IP address from X-Forwarded-For header in production
                ipAddress: request.headers.get('x-forwarded-for') || null  
            }
        });


        return NextResponse.redirect(link.originalUrl);
    } catch (error) {
        console.error('Error processing click:', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
} 