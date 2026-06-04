"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChartNoAxesCombined, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Executive Dashboard", icon: LayoutDashboard },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-r border-slate-200/80 bg-slate-950 px-5 py-8 text-slate-100 lg:sticky lg:top-0 lg:h-screen">
      <div className="flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-sky-500/15 text-sky-300">
          <ChartNoAxesCombined className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-300">UrbanStep</p>
          <p className="text-xl font-semibold tracking-tight">CEO Dashboard</p>
        </div>
      </div>

      <nav className="mt-10 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-slate-100 text-slate-950 shadow-lg"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-10 rounded-lg border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
        <p className="font-semibold text-white">CSV activos</p>
        <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-400">
          <li>Ventas2025.csv</li>
          <li>Ventas2026.csv</li>
          <li>Clientes.csv</li>
          <li>Productos.csv</li>
          <li>Objetivos.csv</li>
        </ul>
      </div>
    </aside>
  );
}
