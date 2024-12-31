import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma-db";
import dns from "dns/promises";

export async function POST(req: Request,{ params }: { params: { domainId: string } })
{
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const domain = await prisma.domain.findUnique({
      where: {
        id: params.domainId,
      },
    });

    if (!domain) {
      return new NextResponse("Domain not found", { status: 404 });
    }

    if (domain.userId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (domain.isVerified) {
      return new NextResponse("Domain already verified", { status: 400 });
    }

    // Verify domain ownership by checking both CNAME and TXT records
    try {
      // Check CNAME record
      const cnameRecords = await dns.resolveCname(domain.domainName);
      const hasCname = cnameRecords.some(record => 
        record.toLowerCase() === "app.linkpro.com"
      );

      if (!hasCname) {
        return NextResponse.json({ verified: false });
      }

      // Check TXT record
      const txtRecords = await dns.resolveTxt(domain.domainName);
      const hasTxt = txtRecords.flat().some(record => 
        record.includes(domain.verificationKey!)
      );

      if (!hasTxt) {
        return NextResponse.json({ verified: false });
      }

      // Both records are verified, update domain status
      await prisma.domain.update({
        where: {
          id: domain.id,
        },
        data: {
          isVerified: true,
          verifiedAt: new Date(),
        },
      });

      return NextResponse.json({ verified: true });
    } catch (error) {
      // DNS resolution failed
      console.error("DNS verification error:", error);
      return NextResponse.json({ verified: false });
    }
  } catch (error) {
    console.error("Domain verification error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 