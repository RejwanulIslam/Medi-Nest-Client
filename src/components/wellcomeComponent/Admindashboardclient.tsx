'use client'

import { motion } from 'framer-motion'
import {
  Users,
  Store,
  Package,
  CircleDollarSign,
  Clock,
  Pill,
  Settings,
  TrendingUp,
  ShieldCheck,
  Activity
} from 'lucide-react'

interface AdminStats {
  totalUsers: number
  totalSellers: number
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  totalProducts: number
}

const quickLinks = [
  { label: 'Manage Users', icon: Users, href: '/admin-dashboard/viws-all-user', from: 'from-blue-500', to: 'to-cyan-500' },
  { label: 'Manage Sellers', icon: Store, href: '/admin-dashboard/viws-all-user', from: 'from-violet-500', to: 'to-purple-600' },
  { label: 'All Orders', icon: Package, href: '/admin-dashboard/viws-oll-order', from: 'from-amber-500', to: 'to-orange-500' },
  { label: 'Products', icon: Pill, href: '/admin-dashboard/all-medicine', from: 'from-emerald-500', to: 'to-teal-500' },
  { label: 'Revenue', icon: TrendingUp, href: '/admin-dashboard/not-abbale', from: 'from-rose-500', to: 'to-pink-500' },
  { label: 'Settings', icon: Settings, href: '/admin-dashboard/not-abbale', from: 'from-slate-500', to: 'to-slate-600' },
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

function StatCard({
  label, value, Icon, sub, accent,
}: {
  label: string
  value: string | number
  Icon: any
  sub?: string
  accent: string
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
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400`}>
          Live
        </span>
      </div>
      <p className="text-3xl font-black text-slate-900 dark:text-white relative z-10">{value}</p>
      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1 relative z-10">{label}</p>
      {sub && <p className="text-xs text-rose-500 font-medium mt-1.5 relative z-10 flex items-center gap-1"><Activity className="w-3 h-3" /> {sub}</p>}
    </motion.div>
  )
}

export default function AdminDashboardClient({ stats }: { stats: AdminStats }) {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300 pb-12">

      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800 shadow-sm mb-8">
        {/* Decorative circles */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 text-violet-600 dark:text-violet-300 text-xs font-bold px-3 py-1.5 rounded-full mb-4 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                Admin Control Panel
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-500">Admin</span> 👋
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-base">
                Here's what's happening across your platform today.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white shadow-xl shadow-violet-500/20">
                <ShieldCheck className="w-8 h-8" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* ── Stats Grid ── */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4" /> Platform Overview
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5"
          >
            <StatCard label="Total Users" value={stats.totalUsers.toLocaleString()} Icon={Users} accent="from-blue-500 to-cyan-500" />
            <StatCard label="Sellers" value={stats.totalSellers} Icon={Store} accent="from-violet-500 to-purple-600" />
            <StatCard label="Total Orders" value={stats.totalOrders.toLocaleString()} Icon={Package} accent="from-amber-500 to-orange-400" />
            <StatCard label="Revenue" value={`৳${stats.totalRevenue.toLocaleString()}`} Icon={CircleDollarSign} accent="from-emerald-500 to-teal-500" />
            <StatCard label="Pending" value={stats.pendingOrders} Icon={Clock} sub="Need attention" accent="from-rose-500 to-pink-500" />
            <StatCard label="Products" value={stats.totalProducts} Icon={Pill} accent="from-slate-500 to-slate-600" />
          </motion.div>
        </section>

        {/* ── Quick Links ── */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6 flex items-center gap-2">
            <Settings className="w-4 h-4" /> Quick Actions
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {quickLinks.map((link) => (
              <motion.a
                variants={itemVariants as any}
                key={link.label}
                href={link.href}
                className="group flex flex-col items-center justify-center gap-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-6 hover:shadow-xl hover:border-violet-500/30 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${link.from} ${link.to} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`}>
                  <link.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 text-center leading-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{link.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </section>

        {/* ── Footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-sm font-medium text-slate-400 dark:text-slate-500 pt-8"
        >
          Admin Panel · All rights reserved © {new Date().getFullYear()}
        </motion.p>
      </div>
    </div>
  )
}