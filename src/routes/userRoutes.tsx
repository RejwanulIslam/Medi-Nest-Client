import { Route } from "@/types";

export const userRoutes:Route[]=[
    {
      title: "Blog Management",
      items: [
       
        {
          title: "My Order",
          url: "/user-dashboard/myorder",
          isActive:true
        },
        {
          title: "Manage Profile",
          url: "/user-dashboard/manage-profile",
          isActive:true
        },
        {
          title: "My Card",
          url: "/user-dashboard/mycard",
          isActive:true
        },
     
      ],
    }
]

