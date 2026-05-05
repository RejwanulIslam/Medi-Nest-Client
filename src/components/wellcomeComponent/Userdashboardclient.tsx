'use client'

import { motion } from 'framer-motion'
import {
  Package,
  CheckCircle,
  Clock,
  CreditCard,
  Search,
  User,
  MessageSquare,
  Activity,
  HeartPulse
} from 'lucide-react'

interface UserStats {
  totalOrders: number
  deliveredOrders: number
  pendingOrders: number
  totalSpent: number
}

const quickLinks = [
  { label: 'Browse Medicines', icon: Search, href: '/allmedicine', from: 'from-blue-500', to: 'to-cyan-500' },
  { label: 'My Orders', icon: Package, href: '/user-dashboard/myorder', from: 'from-amber-500', to: 'to-orange-400' },
  { label: 'My Profile', icon: User, href: '/user-dashboard/manage-profile', from: 'from-violet-500', to: 'to-purple-600' },
  { label: 'Support', icon: MessageSquare, href: '/user-dashboard/upcomeingFetere', from: 'from-rose-500', to: 'to-pink-500' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

function StatCard({ label, value, Icon, accent, sub }: {
  label: string; value: string | number; Icon: any; accent: string; sub?: string
}) {
  return (
    <motion.div
      variants={itemVariants as any}
      className="relative bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accent}`} />

      {/* Background glow on hover */}
      <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className={`p-3 rounded-2xl bg-gradient-to-br ${accent} text-white shadow-md`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <p className="text-3xl font-black text-slate-900 dark:text-white relative z-10">{value}</p>
      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1 relative z-10">{label}</p>
      {sub && <p className="text-xs text-amber-500 font-medium mt-1.5 relative z-10 flex items-center gap-1"><Clock className="w-3 h-3" /> {sub}</p>}
    </motion.div>
  )
}

export default function UserDashboardClient({ stats }: { stats: UserStats }) {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300 pb-12">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800 shadow-sm mb-8">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/4 w-72 h-72 rounded-full bg-indigo-400/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-300 text-xs font-bold px-3 py-1.5 rounded-full mb-4 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                My Dashboard
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">User</span> 👋
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-base">Track your orders, manage your profile, and explore medicines.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 flex-shrink-0">
                <HeartPulse className="w-8 h-8" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* ── Stats ── */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4" /> Your Summary
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            <StatCard label="Total Orders" value={stats.totalOrders} Icon={Package} accent="from-blue-500 to-cyan-500" />
            <StatCard label="Delivered" value={stats.deliveredOrders} Icon={CheckCircle} accent="from-emerald-500 to-teal-500" />
            <StatCard label="Pending" value={stats.pendingOrders} Icon={Clock} sub="In progress" accent="from-amber-500 to-orange-400" />
            <StatCard label="Total Spent" value={`৳${stats.totalSpent.toLocaleString()}`} Icon={CreditCard} accent="from-violet-500 to-purple-600" />
          </motion.div>
        </section>

        {/* ── Quick Links ── */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6 flex items-center gap-2">
            <Package className="w-4 h-4" /> Quick Actions
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {quickLinks.map((link) => (
              <motion.a
                variants={itemVariants as any}
                key={link.label}
                href={link.href}
                className="group flex flex-col items-center justify-center gap-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-6 hover:shadow-xl hover:border-blue-500/30 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${link.from} ${link.to} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`}>
                  <link.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 text-center leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{link.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </section>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-sm font-medium text-slate-400 dark:text-slate-500 pt-8"
        >
          MediShop · Your trusted medicine partner © {new Date().getFullYear()}
        </motion.p>
      </div>
    </div>
  )
}