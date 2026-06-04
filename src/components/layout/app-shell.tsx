import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { AppSidebar } from "@/components/layout/app-sidebar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-transparent text-slate-950 lg:grid lg:grid-cols-[280px_1fr]">
      <AppSidebar />
      <div className="flex min-h-screen flex-col">
        <header className="border-b border-slate-200/80 bg-white/70 px-6 py-5 backdrop-blur-md lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
                UrbanStep Footwear
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-slate-950">
                Intelligence Platform
              </h1>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm md:flex">
              <Sparkles className="h-4 w-4 text-sky-500" />
              Webinar demo · CSV driven
            </div>
          </div>
        </header>
        <main className="flex-1 px-6 py-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}



