import { getAllOrder } from "@/action/medicine.action"
import SellerDashboardClient from "@/components/wellcomeComponent/Sellerdashboardclient"
import { medicineService } from "@/service/medicine.service"
import { userService } from "@/service/user.service"

export default async function SellerDashboardPage() {
  // Replace with real server-side data fetching
  const { data } = await medicineService.getMedicine()

  const { data: seation } = await userService.getSeation()
  const filterByselerId = (data || []).filter((item: any) => item.sellerId == seation.user.id)

  const allOrders = await getAllOrder()
  const myOrders = (allOrders || []).filter((item: any) => item.product.sellerId === seation.user.id)
  const totalRevenue = (myOrders || []).reduce((sum: any, g: any) => sum + g.order.totalAmount, 0)
  const pendingOrders = (allOrders || []).filter((item: any) => item.order.status == "Pending")
  const deliveredOrders = (allOrders || []).filter((item: any) => item.order.status == "Delivered")

  console.log(allOrders)
  const stats = {
    totalProducts: filterByselerId?.length,
    totalOrders: myOrders?.length,
    totalRevenue: totalRevenue,
    pendingOrders: pendingOrders?.length,
    deliveredOrders: deliveredOrders?.length,
  }

  return <SellerDashboardClient stats={stats} />
}