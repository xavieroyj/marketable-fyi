import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link as LinkIcon, MousePointerClick, ArrowUpRight, Calendar, Pencil, Trash2, MoreHorizontal, Copy } from "lucide-react";
import { CreateLinkForm } from "../components/create-link-form";
import prisma from "@/lib/prisma-db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const metadata: Metadata = {
  title: "Dashboard | LinkPro",
  description: "Manage your shortened links and view analytics.",
};

async function getVerifiedDomains(userId: string) {
  return await prisma.domain.findMany({
    where: {
      OR: [
        { isSystemDomain: true },
        { 
          userId,
          isVerified: true 
        }
      ]
    },
    select: {
      id: true,
      domainName: true,
      isVerified: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

async function getUserLinks(userId: string) {
  return await prisma.link.findMany({
    where: {
      userId: userId
    },
    include: {
      domain: {
        select: {
          domainName: true,
          isSystemDomain: true
        }
      },
      analytics: {
        select: {
          id: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    return null;
  }

  const [domains, links] = await Promise.all([
    getVerifiedDomains(session.user.id),
    getUserLinks(session.user.id)
  ]);
  
  const totalClicks = links.reduce((acc, link) => acc + link.analytics.length, 0);
  const clickRate = links.length > 0 ? (totalClicks / links.length).toFixed(1) : "0.0";

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Links</h1>
          <p className="text-muted-foreground">
            Create and manage your shortened links.
          </p>
        </div>
        <CreateLinkForm domains={domains} />
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Links</CardTitle>
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{links.length}</div>
            <p className="text-xs text-muted-foreground">
              Active short links
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks}</div>
            <p className="text-xs text-muted-foreground">
              Total link clicks
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clickRate}</div>
            <p className="text-xs text-muted-foreground">
              Average clicks per link
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Links Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[300px]">Original URL</TableHead>
                  <TableHead className="w-[200px]">Short Link</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {links.map((link) => (
                  <TableRow key={link.id} className="group">
                    <TableCell className="font-medium">
                      <div className="truncate max-w-[300px]" title={link.originalUrl}>
                        {link.originalUrl}
                      </div>
                    </TableCell>
                    <TableCell>
                      <a 
                        href={`https://${link.domain?.domainName ?? 'linkpro.com'}/${link.slug}`}
                        className="text-primary hover:underline flex items-center gap-1 w-fit"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.domain?.domainName ?? 'linkpro.com'}/{link.slug}
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                        {link.analytics.length}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(link.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center">
                            <Copy className="h-4 w-4 mr-2" />
                            Copy URL
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center text-destructive focus:text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {links.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <LinkIcon className="h-8 w-8 mb-2" />
                        <p>No links created yet</p>
                        <p className="text-sm">Create your first link above!</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 