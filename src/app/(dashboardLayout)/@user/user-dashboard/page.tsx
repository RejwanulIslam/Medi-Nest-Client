import UserDashboardClient from "@/components/wellcomeComponent/Userdashboardclient"
import { orderService } from "@/service/orderservices"
import { userService } from "@/service/user.service"

export default async function UserDashboardPage() {
  // Replace with real server-side data fetching
  const { data } = await userService.getSeation()
  const ORDER = await orderService.myOrders(data.user.id)
  const deliveredOrders = (ORDER?.data || []).filter((order: any) => order.status == "Delivered")
  const pendingOrders = (ORDER?.data || []).filter((order: any) => order.status == "Pending")
  const totalSpent = (ORDER?.data || []).reduce((sum: any, g: any) => sum + g.totalAmount, 0)

  const stats = {
    totalOrders: (ORDER?.data || []).length,
    deliveredOrders: (deliveredOrders || []).length,
    pendingOrders: (pendingOrders || []).length,
    totalSpent: totalSpent,
  }

  return <UserDashboardClient stats={stats} />
}