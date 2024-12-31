import { Link } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("rounded-lg bg-foreground/10 p-2", className)}>
      <Link className="h-4 w-4" />
    </div>
  );
} 