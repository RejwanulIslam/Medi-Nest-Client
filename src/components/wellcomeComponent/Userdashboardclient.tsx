'use client'

interface UserStats {
  totalOrders: number
  deliveredOrders: number
  pendingOrders: number
  totalSpent: number
}

const recentOrders = [
  { id: '#ORD-881', product: 'PainKiller 500mg', date: 'Apr 7, 2026', amount: 90, status: 'Delivered' },
  { id: '#ORD-865', product: 'Vitamin C Chewable', date: 'Mar 29, 2026', amount: 120, status: 'Delivered' },
  { id: '#ORD-858', product: 'Amoxicillin 250mg', date: 'Mar 21, 2026', amount: 200, status: 'Pending' },
]

const STATUS_COLOR: Record<string, string> = {
  Delivered: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-900/40',
  Pending: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-100 dark:border-amber-900/40',
  Shipped: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border-blue-100 dark:border-blue-900/40',
  Cancelled: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border-rose-100 dark:border-rose-900/40',
}

const quickLinks = [
  { label: 'Browse Medicines', icon: '🔍', href: '/allmedicine', from: 'from-blue-500', to: 'to-cyan-500' },
  { label: 'My Orders', icon: '📦', href: '/user-dashboard/myorder', from: 'from-amber-500', to: 'to-orange-400' },
  { label: 'My Profile', icon: '👤', href: '/user-dashboard/manage-profile', from: 'from-violet-500', to: 'to-purple-600' },
  { label: 'Support', icon: '💬', href: '/user-dashboard/upcomeingFetere', from: 'from-rose-500', to: 'to-pink-500' },
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

export default function UserDashboardClient({ stats }: { stats: UserStats }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-zinc-900 dark:from-zinc-950 dark:via-blue-950/50 dark:to-zinc-950 border-b border-blue-900/40 dark:border-zinc-800">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/4 w-48 h-48 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                My Dashboard
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">User</span> 👋
              </h1>
              <p className="text-slate-400 text-sm mt-2">Track your orders, manage your profile, and explore medicines.</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl shadow-lg shadow-blue-500/30 flex-shrink-0">
              🧑‍⚕️
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── Stats ── */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">Your Summary</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard label="Total Orders" value={stats.totalOrders} icon="📦" accent="from-blue-500 to-cyan-500" />
            <StatCard label="Delivered" value={stats.deliveredOrders} icon="✅" accent="from-emerald-500 to-teal-500" />
            <StatCard label="Pending" value={stats.pendingOrders} icon="⏳" sub="In progress" accent="from-amber-500 to-orange-400" />
            <StatCard label="Total Spent" value={`৳${stats.totalSpent.toLocaleString()}`} icon="💳" accent="from-violet-500 to-purple-600" />
          </div>
        </section>

        {/* ── Quick Links ── */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex flex-col items-center justify-center gap-2.5 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.from} ${link.to} flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform duration-200`}>
                  {link.icon}
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 text-center leading-tight">{link.label}</span>
              </a>
            ))}
          </div>
        </section>

        

        <p className="text-center text-[11px] text-slate-400 dark:text-slate-600 pb-4">
          MediShop · Your trusted medicine partner © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}