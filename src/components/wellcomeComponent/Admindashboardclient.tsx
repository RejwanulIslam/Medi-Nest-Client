'use client'

interface AdminStats {
  totalUsers: number
  totalSellers: number
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  totalProducts: number
}

const recentActivity = [
  { id: 1, message: 'New order #ORD-8821 placed', time: '2 min ago', dot: 'bg-blue-500' },
  { id: 2, message: 'New user registered: john@email.com', time: '14 min ago', dot: 'bg-emerald-500' },
  { id: 3, message: 'Seller "MediCare" approved', time: '1 hr ago', dot: 'bg-violet-500' },
  { id: 4, message: 'Order #ORD-8819 delivered', time: '2 hr ago', dot: 'bg-teal-500' },
  { id: 5, message: 'Product "Amoxicillin 500mg" added', time: '3 hr ago', dot: 'bg-amber-500' },
]

const quickLinks = [
  { label: 'Manage Users', icon: '👥', href: '/admin-dashboard/viws-all-user', from: 'from-blue-500', to: 'to-cyan-500' },
  { label: 'Manage Sellers', icon: '🏪', href: '/admin-dashboard/viws-all-user', from: 'from-violet-500', to: 'to-purple-600' },
  { label: 'All Orders', icon: '📦', href: '/admin-dashboard/viws-oll-order', from: 'from-amber-500', to: 'to-orange-500' },
  { label: 'Products', icon: '💊', href: '/admin-dashboard/all-medicine', from: 'from-emerald-500', to: 'to-teal-500' },
  { label: 'Revenue', icon: '💰', href: '/admin-dashboard/not-abbale', from: 'from-rose-500', to: 'to-pink-500' },
  { label: 'Settings', icon: '⚙️', href: '/admin-dashboard/not-abbale', from: 'from-slate-500', to: 'to-slate-600' },
]

function StatCard({
  label, value, icon, sub, accent,
}: {
  label: string
  value: string | number
  icon: string
  sub?: string
  accent: string
}) {
  return (
    <div className="relative bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-gradient-to-r ${accent} text-white opacity-90`}>
          Live
        </span>
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">{label}</p>
      {sub && <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{sub}</p>}
    </div>
  )
}

export default function AdminDashboardClient({ stats }: { stats: AdminStats }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">

      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-800 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 border-b border-zinc-800">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                Admin Control Panel
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Admin</span> 👋
              </h1>
              <p className="text-slate-400 text-sm mt-2">
                Here's what's happening across your platform today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-2xl shadow-lg shadow-violet-500/30">
                🛡️
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── Stats Grid ── */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">Platform Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard label="Total Users" value={stats.totalUsers.toLocaleString()} icon="👥" accent="from-blue-500 to-cyan-500" />
            <StatCard label="Sellers" value={stats.totalSellers} icon="🏪" accent="from-violet-500 to-purple-600" />
            <StatCard label="Total Orders" value={stats.totalOrders.toLocaleString()} icon="📦" accent="from-amber-500 to-orange-400" />
            <StatCard label="Revenue" value={`৳${stats.totalRevenue.toLocaleString()}`} icon="💰" accent="from-emerald-500 to-teal-500" />
            <StatCard label="Pending" value={stats.pendingOrders} icon="⏳" sub="Need attention" accent="from-rose-500 to-pink-500" />
            <StatCard label="Products" value={stats.totalProducts} icon="💊" accent="from-slate-500 to-slate-600" />
          </div>
        </section>

        {/* ── Quick Links + Activity ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Quick Links */}
          <section className="lg:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex flex-col items-center justify-center gap-2 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.from} ${link.to} flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform duration-200`}>
                    {link.icon}
                  </div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 text-center leading-tight">{link.label}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Recent Activity */}
         
        </div>

        {/* ── Footer note ── */}
        <p className="text-center text-[11px] text-slate-400 dark:text-slate-600 pb-4">
          Admin Panel · All rights reserved © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}