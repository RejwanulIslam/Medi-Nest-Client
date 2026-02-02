import { Route } from "@/types";

export const selerRoutes:Route[]=[
    {
      title: "Medicin Management",
      items: [
       
        {
          title: "Add Medicine",
          url: "/seler-dashboard/add-medicine",
          isActive:true
        },
        {
          title: "Manage Medicine",
          url: "/seler-dashboard/manage-medicine",
          isActive:true
        },
        {
          title: "Viws Order",
          url: "/seler-dashboard/viwsorder",
          isActive:true
        },
      ],
    }
]

