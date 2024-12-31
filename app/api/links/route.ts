import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma-db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
	try {
		// Check authentication
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session?.user) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const body = await req.json();
		const { url, slug, domainId } = body;

		if (!url) {
			return new NextResponse("URL is required", { status: 400 });
		}

		// If no domain is provided, use the default domain
		let targetDomainId = domainId;
		if (!targetDomainId) {
			// Get or create default domain
			const defaultDomain = await prisma.domain.findFirst({
				where: {
					domainName: "linkpro.com",
					isVerified: true,
				},
			});

			if (!defaultDomain) {
				return new NextResponse("Default domain not found", { status: 500 });
			}

			targetDomainId = defaultDomain.id;
		} else {
			// Verify domain exists and is verified
			const domain = await prisma.domain.findFirst({
				where: {
					id: targetDomainId,
					isVerified: true,
					OR: [
						{ userId: session.user.id },
						{ isSystemDomain: true }
					]
				},
			});

			if (!domain) {
				return new NextResponse("Domain not found or not verified", { status: 400 });
			}
		}

		// Generate or validate slug
		let targetSlug = slug;
		if (!targetSlug) {
			// Generate a random slug if none provided
			targetSlug = nanoid(7); // 7 characters should be enough for most use cases

			// Keep generating until we find a unique one
			while (true) {
				const existingLink = await prisma.link.findFirst({
					where: {
						slug: targetSlug,
						domainId: targetDomainId,
					},
				});

				if (!existingLink) break;
				targetSlug = nanoid(7);
			}
		} else {
			// Check if slug is already taken for this domain
			const existingLink = await prisma.link.findFirst({
				where: {
					slug: targetSlug,
					domainId: targetDomainId,
				},
			});

			if (existingLink) {
				return new NextResponse("Slug already taken", { status: 400 });
			}
		}

		// Create the link
		const link = await prisma.link.create({
			data: {
				slug: targetSlug,
				originalUrl: url,
				domainId: targetDomainId || null,
				userId: session.user.id,
			},
			include: {
				domain: true,
			},
		});
		return NextResponse.json(link);
	} catch (error) {
		console.error("[LINK_CREATE]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
} 