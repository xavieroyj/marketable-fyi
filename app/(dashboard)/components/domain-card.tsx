"use client";

import * as React from "react";
import { Domain } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Copy, ExternalLink, Globe2, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface DomainCardProps {
  domain: Domain;
}

export function DomainCard({ domain }: DomainCardProps) {
  const [verifying, setVerifying] = React.useState(false);
  const [copied, setCopied] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleVerify = async () => {
    try {
      setVerifying(true);
      const response = await fetch(`/api/domains/${domain.id}/verify`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to verify domain");
      }

      const data = await response.json();
      if (data.verified) {
        toast.success("Domain verified successfully");
        window.location.reload();
      } else {
        toast.error("DNS records not found. Please check your DNS settings and try again.");
      }
    } catch {
      toast.error("Failed to verify domain");
    } finally {
      setVerifying(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast.success(`${type} record copied to clipboard`);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Card className="group transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-xl">{domain.domainName}</CardTitle>
          </div>
          <CardDescription>Added {new Date(domain.createdAt).toLocaleDateString()}</CardDescription>
        </div>
        <div className={cn(
          "px-2.5 py-0.5 text-xs font-medium rounded-full transition-colors",
          domain.isVerified 
            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
        )}>
          {domain.isVerified ? "Verified" : "Unverified"}
        </div>
      </CardHeader>
      <CardContent>
        {!domain.isVerified ? (
          <div className="space-y-4">
            <div className="flex items-start gap-2 text-yellow-600 bg-yellow-50 dark:bg-yellow-950/50 p-3 rounded-lg">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1 text-sm">
                <p className="font-medium">Domain needs verification</p>
                <p className="text-muted-foreground mt-1">
                  Add the required DNS records to verify domain ownership.
                  After adding both records, click &quot;Check Verification&quot;.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full group-hover:border-primary/50">
                    <Copy className="h-4 w-4 mr-2" />
                    View DNS Records
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>DNS Records Setup</DialogTitle>
                    <DialogDescription>
                      Add these DNS records to verify your domain ownership:
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* CNAME Record */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold">1. CNAME Record</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "h-8 px-2 transition-colors",
                            copied === "CNAME" && "text-green-600"
                          )}
                          onClick={() => copyToClipboard("app.linkpro.com", "CNAME")}
                        >
                          {copied === "CNAME" ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Name/Host</span>
                          <span className="font-mono text-muted-foreground">@</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Value/Points to</span>
                          <span className="font-mono text-muted-foreground">app.linkpro.com</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* TXT Record */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold">2. TXT Record</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "h-8 px-2 transition-colors",
                            copied === "TXT" && "text-green-600"
                          )}
                          onClick={() => copyToClipboard(domain.verificationKey!, "TXT")}
                        >
                          {copied === "TXT" ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Name/Host</span>
                          <span className="font-mono text-muted-foreground">@</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-sm font-medium">Value/Content</span>
                          <p className="text-sm font-mono bg-muted p-2 rounded break-all">
                            {domain.verificationKey}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground space-y-2">
                      <p className="font-medium">Important Notes:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Both records must be added for verification</li>
                        <li>DNS changes can take up to 24-48 hours to propagate</li>
                        <li>Some DNS providers may be faster (1-4 hours)</li>
                        <li>Click &quot;Check Verification&quot; after DNS propagation</li>
                      </ul>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                variant="default"
                className="w-full"
                onClick={handleVerify}
                disabled={verifying}
              >
                {verifying ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Check Verification
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-2 text-green-600 bg-green-50 dark:bg-green-950/50 p-3 rounded-lg">
              <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1 text-sm">
                <p className="font-medium">Domain verified</p>
                <p className="text-muted-foreground mt-1">
                  Your domain is ready to use for creating branded short links.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full group-hover:border-primary/50"
              onClick={() => window.open(`https://${domain.domainName}`, "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Domain
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 