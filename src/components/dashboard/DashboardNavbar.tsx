"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Search,
  Sun,
  Moon,
  Bell,
  ChevronRight,
  Home,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { logOut } from "@/lib/auth-actions";

interface DashboardNavbarProps {
  pageTitle: string;
  user: { name?: string; email?: string; image?: string; role?: string } | null;
  onMenuClick: () => void;
}

function getInitials(name?: string): string {
  if (!name) return "U";
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function DashboardNavbar({ pageTitle, user, onMenuClick }: DashboardNavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="sticky top-0 z-30 w-full h-16 flex items-center px-4 sm:px-6 gap-3 sm:gap-4 border-b border-slate-200/60 dark:border-white/[0.06] bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl">

      {/* Hamburger – mobile only */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors"
        aria-label="Open sidebar"
        id="dashboard-menu-button"
      >
        <Menu className="w-5 h-5" strokeWidth={1.75} />
      </button>

      {/* ── Breadcrumb ── */}
      <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-sm">
        <Link
          href="/"
          className="flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
        >
          <Home className="w-3.5 h-3.5" />
          <span>MediNest</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
        <span className="font-semibold text-slate-800 dark:text-slate-100">{pageTitle}</span>
      </nav>

      {/* Mobile page title */}
      <span className="sm:hidden flex-1 text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
        {pageTitle}
      </span>

      {/* Spacer */}
      <div className="flex-1 hidden sm:block" />

      {/* ── Search Bar ── */}
      {/* <div
        className={cn(
          "hidden md:flex items-center gap-2 h-9 px-3.5 rounded-xl border text-sm transition-all duration-200",
          searchFocused
            ? "w-64 border-emerald-400/70 bg-white dark:bg-slate-900 shadow-sm shadow-emerald-500/10"
            : "w-44 border-slate-200/70 dark:border-white/10 bg-slate-100/60 dark:bg-white/[0.05]"
        )}
      >
        <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" strokeWidth={1.75} />
        <input
          type="search"
          placeholder="Search…"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="flex-1 bg-transparent outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 text-sm"
          id="dashboard-search-input"
        />
        {searchFocused && (
          <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-medium text-slate-400 dark:text-slate-500 bg-slate-200/60 dark:bg-white/10 px-1.5 py-0.5 rounded-md">
            ESC
          </kbd>
        )}
      </div> */}

      {/* ── Theme Switcher ── */}
      {mounted && (
        <button
          onClick={toggleTheme}
          id="dashboard-theme-toggle"
          aria-label="Toggle theme"
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-700 dark:hover:text-white transition-all duration-200"
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === "dark" ? (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="w-4.5 h-4.5" strokeWidth={1.75} />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="w-4.5 h-4.5" strokeWidth={1.75} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      )}

      {/* ── Notification Bell ── */}
      <button
        id="dashboard-notifications-button"
        aria-label="Notifications"
        className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-700 dark:hover:text-white transition-all duration-200"
      >
        <Bell className="w-4.5 h-4.5" strokeWidth={1.75} />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950" />
      </button>

      {/* ── User Profile Dropdown ── */}
      <div className="relative" ref={profileRef}>
        <button
          id="dashboard-profile-button"
          onClick={() => setProfileOpen((v) => !v)}
          className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200 group"
          aria-expanded={profileOpen}
          aria-haspopup="true"
        >
          {/* Avatar */}
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-[11px] font-bold shadow-sm">
            {getInitials(user?.name)}
          </div>
          <span className="hidden sm:block text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors max-w-[100px] truncate">
            {user?.name ?? "User"}
          </span>
          <ChevronRight
            className={cn(
              "hidden sm:block w-3.5 h-3.5 text-slate-400 transition-transform duration-200",
              profileOpen && "rotate-90"
            )}
          />
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {profileOpen && (
            <motion.div
              key="profile-dropdown"
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-white/[0.08] shadow-xl shadow-slate-200/60 dark:shadow-black/40 overflow-hidden z-50"
            >
              {/* User info header */}
              <div className="px-4 py-3 border-b border-slate-100 dark:border-white/[0.06] bg-slate-50/60 dark:bg-white/[0.03]">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {user?.name ?? "User"}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {user?.email ?? ""}
                </p>
              </div>
              {/* Menu items */}
              <div className="p-1.5 space-y-0.5">
                <Link
                  href="/user-dashboard/manage-profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.07] hover:text-slate-900 dark:hover:text-white transition-colors"
                  id="profile-menu-profile-link"
                >
                  <User className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
                  My Profile
                </Link>

                {/* todo */}
                {/* <Link
                  href="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.07] hover:text-slate-900 dark:hover:text-white transition-colors"
                  id="profile-menu-settings-link"
                >
                  <Settings className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
                  Settings
                </Link> */}

              </div>
              <div className="p-1.5 border-t border-slate-100 dark:border-white/[0.06]">
                <button
                  onClick={async () => await logOut()}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  id="profile-menu-logout-link"
                >
                  <LogOut className="w-4 h-4" strokeWidth={1.75} />
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
