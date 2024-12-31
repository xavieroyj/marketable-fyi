"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  url: z.string()
    .min(1, "URL is required")
    .transform((str) => {
      if (str.startsWith('http://') || str.startsWith('https://')) {
        return str;
      }
      return `https://${str}`;
    })
    .pipe(z.string().url({ message: "Please enter a valid URL" })),
  slug: z.string()
    .min(3, { message: "Slug must be at least 3 characters" })
    .optional()
    .or(z.literal('')),
  domainId: z.string().optional(),
});

type Domain = {
  id: string;
  domainName: string;
  isVerified: boolean;
};

interface CreateLinkFormProps {
  domains: Domain[];
}

export function CreateLinkForm({ domains }: CreateLinkFormProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      slug: "",
      domainId: domains[0]?.id,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create link");
      }

      await response.json();
      form.reset();
      toast.success("Link created successfully");
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Link</DialogTitle>
          <DialogDescription>
            Create a new shortened link. You can optionally specify a custom slug and select a domain.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    The original URL you want to shorten
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Slug (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="my-custom-link" {...field} />
                  </FormControl>
                  <FormDescription>
                    Leave empty for a randomly generated slug
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {domains.length > 0 && (
              <FormField
                control={form.control}
                name="domainId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domain</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a domain" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* TODO: Add a test domain if we are on development mode */}
                        {domains.map((domain) => (
                          <SelectItem key={domain.id} value={domain.id}>
                            {domain.domainName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the domain for your shortened link
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Creating..." : "Create Link"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 