import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const navItems = ["Features", "Pricing", "Analytics", "FAQ"];

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <a className="text-xl font-bold" href="/">LinkPro</a>
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <a
                key={item}
                className="text-muted-foreground hover:text-foreground transition-colors"
                href={`#${item.toLowerCase()}`}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {session ? (
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
} 