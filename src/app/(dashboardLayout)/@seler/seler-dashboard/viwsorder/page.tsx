import { getAllOrder } from '@/action/medicine.action'
import SellerOrderCard from '@/components/SellerOrderCard'
import { userService } from '@/service/user.service'

export default async function SellerOrdersPage() {
  const allOrders = await getAllOrder()
  const { data } = await userService.getSeation()

  const myOrders = (allOrders || []).filter(
    (item: any) => item.product?.sellerId === data.user.id
  )

  // Summary stats
  const totalRevenue = (myOrders || []).reduce(
    (sum: number, item: any) => sum + (item?.order?.totalAmount || 0),
    0
  )
  const statusCounts = (myOrders || []).reduce((acc: Record<string, number>, item: any) => {
    const s = item?.order?.status || "Pending"
    acc[s] = (acc[s] || 0) + 1
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            📋 My Orders
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Manage and track all orders for your products
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <StatCard
            label="Total Orders"
            value={myOrders.length}
            icon="📦"
            color="text-slate-700 dark:text-slate-200"
          />
          <StatCard
            label="Total Revenue"
            value={`৳ ${totalRevenue}`}
            icon="💰"
            color="text-emerald-600 dark:text-emerald-400"
          />
          <StatCard
            label="Delivered"
            value={statusCounts["Delivered"] || 0}
            icon="✅"
            color="text-emerald-600 dark:text-emerald-400"
          />
          <StatCard
            label="Pending"
            value={statusCounts["Pending"] || 0}
            icon="🟡"
            color="text-amber-600 dark:text-amber-400"
          />
        </div>

        {/* Orders Grid */}
        {myOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-1">
              No orders yet
            </h2>
            <p className="text-slate-400 dark:text-slate-500 text-sm">
              Orders for your products will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {myOrders.map((item: any) => (
              <SellerOrderCard key={item.id} data={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string
  value: string | number
  icon: string
  color: string
}) {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 px-4 py-4 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base">{icon}</span>
        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{label}</span>
      </div>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
    </div>
  )
}