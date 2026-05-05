import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "All Management",
    items: [

      {
        title: "All User",
        url: "/admin-dashboard/viws-all-user",
        isActive: true
      },
      {
        title: "Manage Categorys",
        url: "/admin-dashboard/manage-categorys",
        isActive: true
      },
      {
        title: "All Order",
        url: "/admin-dashboard/viws-oll-order",
        isActive: true
      },
      {
        title: "All Medicine",
        url: "/admin-dashboard/all-medicine",
        isActive: true
      },
      {
        title: "Insights",
        url: "/admin-dashboard/insights",
        isActive: true
      },
    ],
  },
]
