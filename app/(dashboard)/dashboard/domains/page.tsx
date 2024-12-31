import { Metadata } from "next";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma-db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddDomainButton } from "../../components/add-domain-button";
import { DomainCard } from "../../components/domain-card";
import { Globe2 } from "lucide-react";

export const metadata: Metadata = {
	title: "Domains | LinkPro",
	description: "Manage your custom domains for branded short links.",
};

export default async function DomainsPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return null;
	}

	const domains = await prisma.domain.findMany({
		where: {
			userId: session.user.id,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	const verifiedCount = domains.filter(domain => domain.isVerified).length;

	return (
		<div>
			<div className="flex flex-col gap-6">
				{/* Header Section */}
				<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
					<div className="space-y-1">
						<h1 className="text-3xl font-bold tracking-tight">Custom Domains</h1>
						<p className="text-muted-foreground">
							Add and manage your custom domains for branded short links.
						</p>
					</div>
					<AddDomainButton />
				</div>

				{/* Stats Section */}
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
							<CardTitle className="text-sm font-medium">Total Domains</CardTitle>
							<Globe2 className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{domains.length}</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
							<CardTitle className="text-sm font-medium">Verified Domains</CardTitle>
							<Globe2 className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{verifiedCount}</div>
						</CardContent>
					</Card>
					<Card className="md:col-span-2 lg:col-span-1">
						<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
							<CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
							<Globe2 className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{domains.length - verifiedCount}</div>
						</CardContent>
					</Card>
				</div>

				{/* Domains List */}
				<div className="grid gap-6">
					{domains.length === 0 ? (
						<Card className="border-dashed">
							<CardContent className="flex flex-col items-center justify-center py-10 text-center">
								<Globe2 className="h-10 w-10 text-muted-foreground mb-4" />
								<h3 className="text-lg font-semibold mb-2">No domains yet</h3>
								<p className="text-muted-foreground text-sm max-w-sm mb-4">
									Add your first custom domain to start creating branded short links. Your domains will appear here.
								</p>
								<AddDomainButton variant="outline" />
							</CardContent>
						</Card>
					) : (
						domains.map((domain) => (
							<DomainCard key={domain.id} domain={domain} />
						))
					)}
				</div>
			</div>
		</div>
	);
}