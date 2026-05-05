"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Users,
  ShoppingCart,
  PlusCircle,
  Settings,
  LogOut,
  ChevronRight,
  Stethoscope,
  X,
  Tags,
  Pill,
  UserCog,
  CreditCard,
  Bot
} from "lucide-react";
import { cn } from "@/lib/utils";
import { userRole } from "@/constrans/userRole";
import { logOut } from "@/lib/auth-actions";

// ─── Icon Map ───────────────────────────────────────────────────────────────
const iconMap: Record<string, React.ElementType> = {
  "/admin-dashboard/viws-all-user": Users,
  "/admin-dashboard/manage-categorys": Tags,
  "/admin-dashboard/viws-oll-order": ClipboardList,
  "/admin-dashboard/all-medicine": Pill,
  "/admin-dashboard/insights": Bot,
  "/user-dashboard/myorder": ShoppingCart,
  "/user-dashboard/manage-profile": UserCog,
  "/user-dashboard/mycard": CreditCard,
  "/seler-dashboard/add-medicine": PlusCircle,
  "/seler-dashboard/manage-medicine": Package,
  "/seler-dashboard/viwsorder": ClipboardList,
};

// ─── Types ───────────────────────────────────────────────────────────────────
interface NavItem {
  title: string;
  url: string;
  isActive?: boolean;
}
interface RouteGroup {
  title: string;
  items: NavItem[];
}
interface DashboardSidebarProps {
  routes: RouteGroup[];
  user: { name?: string; email?: string; image?: string; role?: string } | null;
  isOpen: boolean;
  onClose: () => void;
}



// ─── Sidebar Component ───────────────────────────────────────────────────────
export function DashboardSidebar({ routes, user, isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();

  // Close on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) onClose();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onClose]);

  const roleLabel =
    user?.role === userRole.admin
      ? "Administrator"
      : user?.role === userRole.seler
        ? "Seller"
        : "User";

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* ── Logo / Brand ── */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-200/60 dark:border-white/[0.06]">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30">
          <Stethoscope className="w-4.5 h-4.5 text-white" strokeWidth={2} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
            MediNest
          </p>
          <p className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            {roleLabel}
          </p>
        </div>
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="ml-auto lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10">
        {routes.map((group) => (
          <div key={group.title}>
            <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = iconMap[item.url] ?? LayoutDashboard;
                const isActive = pathname === item.url || pathname.startsWith(item.url + "/");
                return (
                  <li key={item.url}>
                    <Link
                      href={item.url}
                      onClick={onClose}
                      className={cn(
                        "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 shadow-sm"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <span
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200",
                          isActive
                            ? "bg-emerald-500/20 dark:bg-emerald-400/20 text-emerald-600 dark:text-emerald-400"
                            : "bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                        )}
                      >
                        <Icon className="w-4 h-4" strokeWidth={1.75} />
                      </span>
                      <span className="flex-1">{item.title}</span>
                      {isActive && (
                        <ChevronRight className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── Footer: Settings + Logout ── */}
      <div className="px-3 py-4 border-t border-slate-200/60 dark:border-white/[0.06] space-y-0.5">

        {/* todo */}
        {/* <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white transition-all duration-200 group"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-white/10 transition-colors">
            <Settings className="w-4 h-4" strokeWidth={1.75} />
          </span>
          Settings
        </Link> */}


        <button onClick={async () => await logOut()}

          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 group"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-400 group-hover:bg-red-100 dark:group-hover:bg-red-500/20 transition-colors">
            <LogOut className="w-4 h-4" strokeWidth={1.75} />
          </span>
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop Sidebar (always visible ≥ lg) ── */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 z-40 bg-white/70 dark:bg-slate-950/80 backdrop-blur-xl border-r border-slate-200/60 dark:border-white/[0.06]">
        {sidebarContent}
      </aside>

      {/* ── Mobile Overlay + Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />
            {/* Drawer */}
            <motion.aside
              key="sidebar-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-white dark:bg-slate-950 border-r border-slate-200/60 dark:border-white/[0.06] lg:hidden shadow-2xl"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
