import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { userService } from "@/service/user.service";
import { userRole } from "@/constrans/userRole";
import { adminRoutes } from "@/routes/adminRoutes";
import { userRoutes } from "@/routes/userRoutes";
import { selerRoutes } from "@/routes/selerRoutes";
import { Route } from "@/types";
import React from "react";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  user,
  seler,
  admin,
}: {
  user: React.ReactNode;
  seler: React.ReactNode;
  admin: React.ReactNode;
}) {
  const res = await userService.getSeation();
  const userInfo = res?.data?.user;

  // ── Resolve content, title, and routes based on role ──
  let mainContent: React.ReactNode = user;
  let pageTitle = "Dashboard";
  let routes: Route[] = userRoutes;

  switch (userInfo?.role) {
    case userRole.user:
      mainContent = user;
      pageTitle = "User Dashboard";
      routes = userRoutes;
      break;
    case userRole.seler:
      mainContent = seler;
      pageTitle = "Seller Dashboard";
      routes = selerRoutes;
      break;
    case userRole.admin:
      mainContent = admin;
      pageTitle = "Admin Dashboard";
      routes = adminRoutes;
      break;
    default:
      mainContent = user;
      pageTitle = "Dashboard";
      routes = userRoutes;
  }

  // Safe-to-pass user object (only serialisable fields)
  const safeUser = userInfo
    ? {
        name: userInfo.name ?? undefined,
        email: userInfo.email ?? undefined,
        image: userInfo.image ?? undefined,
        role: userInfo.role ?? undefined,
      }
    : null;

  return (
    <DashboardShell routes={routes} user={safeUser} pageTitle={pageTitle}>
      {mainContent}
    </DashboardShell>
  );
}
