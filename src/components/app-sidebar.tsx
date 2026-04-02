
"use client"
import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { userRole } from "@/constrans/userRole"
import { Route } from "@/types"
import { adminRoutes } from "@/routes/adminRoutes"
import { userRoutes } from "@/routes/userRoutes"
import { selerRoutes } from "@/routes/selerRoutes"



export function AppSidebar({ user, ...props }: { user: userRole & React.ComponentProps<typeof Sidebar> }) {
  console.log('first',user)
    if (!user) return null
  let routes: Route[] = []

  switch (user?.role) {
    case userRole.admin: routes = adminRoutes
      break;
    case userRole.user: routes = userRoutes
      break;
    case userRole.seler: routes = selerRoutes
      break;

    default: routes = []
      break;
  }

  return (
    <Sidebar {...props}>
   
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}


