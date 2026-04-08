import { getAllOrder } from "@/action/medicine.action"
import AdminDashboardClient from "@/components/wellcomeComponent/Admindashboardclient"
import { medicineService } from "@/service/medicine.service"
import { userService } from "@/service/user.service"

export default async function AdminDashboardPage() {
  // Replace with real server-side data fetching
    const res = await userService.getAlluser()
    const {data} = await userService.getAlluser()
    console.log(data)
 const seler=data.filter((data:any)=>data?.role=="SELER")
 const allOrders = await getAllOrder()
       const totalRevenue= allOrders.reduce((sum:any, g:any) => sum + g.order.totalAmount, 0)
      const  pendingOrders=allOrders.filter((order:any)=>order.order.status=="Pending") 
          const { data: medData } = await medicineService.getMedicine()
      

  console.log("allOrders",allOrders)
  const stats = {
    totalUsers: res?.data?.length,
    totalSellers: seler.length,
    totalOrders: allOrders.length,
    totalRevenue: totalRevenue,
    pendingOrders: pendingOrders.length,
    totalProducts: medData.length,
  }

  return <AdminDashboardClient stats={stats} />
}
