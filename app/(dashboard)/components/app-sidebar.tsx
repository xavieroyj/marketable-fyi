"use client";
import { usePathname } from "next/navigation";
import {
    Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ChartArea, Globe, Link2 } from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border">
        <div className="flex h-16 items-center px-4">
          <span className="text-lg font-semibold">LinkPro</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuButton isActive={pathname === "/dashboard"} asChild>
            <Link href="/dashboard">
              <Link2 className="w-4 h-4" />
              Links
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton isActive={pathname === "/dashboard/domains"} asChild>
            <Link href="/dashboard/domains">
              <Globe className="w-4 h-4" />
              Domains
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton isActive={pathname === "/dashboard/analytics"} asChild>
            <Link href="/dashboard/analytics">
              <ChartArea className="w-4 h-4" />
              Analytics
            </Link>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-border">
        <SidebarMenu>
          <SidebarMenuButton
            isActive={pathname === "/dashboard/settings"}
          >
            Settings
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
} 