import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma-db";
import { z } from "zod";
import crypto from "crypto";
import { Prisma } from "@prisma/client";

const postSchema = z.object({
  domainName: z
    .string()
    .min(3, "Domain must be at least 3 characters")
    .regex(
      /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
      "Please enter a valid domain name"
    ),
});

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const verifiedOnly = searchParams.get("verified") === "true";
        
        // Get session but don't require it
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        let where: Prisma.DomainWhereInput = {};
        
        // Add verified filter if requested
        if (verifiedOnly) {
            where.isVerified = true;
        }

        // If user is authenticated, include their domains and system domains
        if (session?.user) {
            where = {
                ...where,
                OR: [
                    { userId: session.user.id },
                    { isSystemDomain: true }
                ]
            };
        } else {
            where.isSystemDomain = true;
        }

        console.log("Query where clause:", where);
        
        const domains = await prisma.domain.findMany({
            where,
            orderBy: {
                createdAt: 'desc'
            }
        });
        
        console.log("Found domains:", domains);
        return NextResponse.json(domains);
    } catch (error) {
        console.error("Error fetching domains:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = postSchema.parse(json);

    // Check if domain already exists
    const existingDomain = await prisma.domain.findUnique({
      where: {
        domainName: body.domainName,
      },
    });

    if (existingDomain) {
      return new NextResponse("Domain already exists", { status: 400 });
    }

    // Generate verification key
    const verificationKey = crypto.randomBytes(32).toString("hex");

    const domain = await prisma.domain.create({
      data: {
        domainName: body.domainName,
        verificationKey,
        userId: session.user.id,
      },
    });

    return NextResponse.json(domain);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 400 });
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
} 