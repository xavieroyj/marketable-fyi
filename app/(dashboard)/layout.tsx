import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider defaultOpen>
            <div className="flex min-h-screen w-full">
                <AppSidebar />
                <main className="flex-1 overflow-y-auto">
                    <SidebarTrigger />
                    <div className="w-full px-4 py-6">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
} 