'use client'

interface SellerStats {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  deliveredOrders: number
  averageRating: number
}

const recentOrders = [
  { id: '#ORD-881', product: 'PainKiller 500mg', qty: 2, amount: 60, status: 'Delivered', statusColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50' },
  { id: '#ORD-879', product: 'Amoxicillin', qty: 1, amount: 120, status: 'Pending', statusColor: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50' },
  { id: '#ORD-876', product: 'Vitamin C', qty: 3, amount: 90, status: 'Shipped', statusColor: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50' },
  { id: '#ORD-871', product: 'PainKiller 500mg', qty: 1, amount: 30, status: 'Delivered', statusColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50' },
]

const quickLinks = [
  { label: 'Add Product', icon: '➕', href: '/seller/products/new', from: 'from-emerald-500', to: 'to-teal-500' },
  { label: 'My Products', icon: '💊', href: '/seller/products', from: 'from-blue-500', to: 'to-cyan-500' },
  { label: 'My Orders', icon: '📦', href: '/seller/orders', from: 'from-amber-500', to: 'to-orange-400' },
  { label: 'Earnings', icon: '💵', href: '/seller/earnings', from: 'from-rose-500', to: 'to-pink-500' },
]

function StatCard({ label, value, icon, accent, sub }: {
  label: string; value: string | number; icon: string; accent: string; sub?: string
}) {
  return (
    <div className="relative bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
      <span className="text-2xl">{icon}</span>
      <p className="text-2xl font-black text-slate-900 dark:text-white mt-3">{value}</p>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">{label}</p>
      {sub && <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{sub}</p>}
    </div>
  )
}

export default function SellerDashboardClient({ stats }: { stats: SellerStats }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-zinc-900 dark:from-zinc-950 dark:via-emerald-950/60 dark:to-zinc-950 border-b border-emerald-900/50 dark:border-zinc-800">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Seller Dashboard
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Seller</span> 🏪
              </h1>
              <p className="text-slate-400 text-sm mt-2">Manage your products, track orders, and grow your sales.</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Rating badge */}
              <div className="bg-white/10 dark:bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-center">
                <p className="text-2xl font-black text-white">⭐ {stats.averageRating}</p>
                <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-widest">Avg. Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── Stats ── */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">Your Store Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <StatCard label="Products" value={stats.totalProducts} icon="💊" accent="from-blue-500 to-cyan-500" />
            <StatCard label="Total Orders" value={stats.totalOrders} icon="📦" accent="from-amber-500 to-orange-400" />
            <StatCard label="Revenue" value={`৳${stats.totalRevenue.toLocaleString()}`} icon="💵" accent="from-emerald-500 to-teal-500" />
            <StatCard label="Pending" value={stats.pendingOrders} icon="⏳" sub="Needs shipping" accent="from-rose-500 to-pink-500" />
            <StatCard label="Delivered" value={stats.deliveredOrders} icon="✅" accent="from-violet-500 to-purple-600" />
          </div>
        </section>

        {/* ── Quick Links + Orders ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Quick Links */}
          <section className="lg:col-span-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
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

          {/* Recent Orders Table */}
         
        </div>

        <p className="text-center text-[11px] text-slate-400 dark:text-slate-600 pb-4">
          Seller Portal · All rights reserved © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}