"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardNavbar } from "./DashboardNavbar";

interface Route {
  title: string;
  items: { title: string; url: string; isActive?: boolean }[];
}
interface DashboardShellProps {
  children: React.ReactNode;
  routes: Route[];
  user: { name?: string; email?: string; image?: string; role?: string } | null;
  pageTitle: string;
}

export function DashboardShell({ children, routes, user, pageTitle }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <DashboardSidebar
        routes={routes}
        user={user}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main column */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top navbar */}
        <DashboardNavbar
          pageTitle={pageTitle}
          user={user}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Content with fade-in on route change */}
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="flex-1 p-4 sm:p-6 lg:p-8"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
