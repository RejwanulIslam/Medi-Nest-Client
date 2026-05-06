'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, CheckCircle, Clock, CircleDollarSign, Filter, MapPin, Calendar, ChevronDown, ChevronUp, ShoppingBag, Activity } from 'lucide-react'

interface Product {
  id: string
  medicineName: string
  price: number
  image: string
  stock: number
  detels: string
  manufacturer: string
}

interface OrderInfo {
  id: string
  customerId: string
  shippingAddress: string
  totalAmount: number
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  order: OrderInfo
  product: Product
}

type FilterType = OrderInfo['status'] | 'All'

const STATUS_FILTERS: FilterType[] = [
  'All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled',
]

const STATUS_CONFIG = {
  Delivered: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800/60',
    dot: 'bg-emerald-500',
    bar: 'from-emerald-400 to-teal-500',
    pill: 'bg-emerald-500',
  },
  Pending: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800/60',
    dot: 'bg-amber-400',
    bar: 'from-amber-400 to-orange-400',
    pill: 'bg-amber-500',
  },
  Processing: {
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    text: 'text-violet-700 dark:text-violet-300',
    border: 'border-violet-200 dark:border-violet-800/60',
    dot: 'bg-violet-500',
    bar: 'from-violet-400 to-purple-500',
    pill: 'bg-violet-500',
  },
  Shipped: {
    bg: 'bg-sky-50 dark:bg-sky-950/40',
    text: 'text-sky-700 dark:text-sky-300',
    border: 'border-sky-200 dark:border-sky-800/60',
    dot: 'bg-sky-500',
    bar: 'from-sky-400 to-blue-500',
    pill: 'bg-sky-500',
  },
  Cancelled: {
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    text: 'text-rose-700 dark:text-rose-300',
    border: 'border-rose-200 dark:border-rose-800/60',
    dot: 'bg-rose-500',
    bar: 'from-rose-400 to-red-500',
    pill: 'bg-rose-500',
  },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

function processOrders(data: any): { order: OrderInfo; items: OrderItem[] }[] {
  let items = Array.isArray(data) ? data : (data?.data || []);
  if (!Array.isArray(items)) return [];

  // If the array is empty, return empty
  if (items.length === 0) return [];

  // Check if it's an array of OrderItems (has orderId)
  if (items[0].orderId !== undefined) {
    const map = new Map<string, { order: OrderInfo; items: OrderItem[] }>()
    for (const item of items) {
      if (!item?.order || !item?.orderId) continue

      if (!map.has(item.orderId)) {
        map.set(item.orderId, { order: item.order, items: [] })
      }
      map.get(item.orderId)!.items.push(item)
    }
    return Array.from(map.values())
  } else {
    // Otherwise, assume it's an array of Orders
    return items.map((order: any) => ({
      order: order,
      items: order.items || []
    }))
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
}

function OrderGroupCard({ order, items }: { order: OrderInfo; items: OrderItem[] }) {
  const [expanded, setExpanded] = useState(false)
  const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG['Pending']

  const deduped = useMemo(() => {
    const map = new Map<string, { item: OrderItem; totalQty: number }>()
    for (const item of items) {
      if (!map.has(item.productId)) {
        map.set(item.productId, { item, totalQty: 0 })
      }
      map.get(item.productId)!.totalQty += item.quantity
    }
    return Array.from(map.values())
  }, [items])

  const previewItems = expanded ? deduped : deduped.slice(0, 2)

  return (
    <motion.div
      variants={cardVariants as any}
      className={`group relative bg-white dark:bg-slate-900 rounded-3xl border ${cfg.border} shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden`}
    >
      {/* Top gradient bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${cfg.bar}`} />

      {/* Subtle hover glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${cfg.bar} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[10px] tracking-widest uppercase font-bold text-slate-400 dark:text-slate-500 mb-1">Order ID</p>
            <p className="text-sm font-mono font-bold text-slate-700 dark:text-slate-200">
              #{order.id.slice(0, 10)}…
            </p>
          </div>
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${cfg.border} ${cfg.bg} ${cfg.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
            {order.status}
          </span>
        </div>

        <div className="w-full h-px bg-slate-100 dark:bg-slate-800 mb-4" />

        {/* Product list */}
        <div className="flex flex-col gap-3 mb-4">
          {previewItems.map(({ item, totalQty }) => (
            <div key={item.productId} className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-800 flex-shrink-0">
                {item.product?.image ? (
                  <Image src={item.product.image} alt={item.product.medicineName} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-slate-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate leading-tight">
                  {item.product?.medicineName}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 truncate">
                  {item.product?.manufacturer}
                </p>
              </div>
              <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                <span className="text-sm font-black text-slate-800 dark:text-slate-100">
                  ৳{(item.product?.price ?? 0) * totalQty}
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full font-bold">
                  ×{totalQty}
                </span>
              </div>
            </div>
          ))}

          {deduped.length > 2 && (
            <button
              onClick={() => setExpanded(v => !v)}
              className={`flex items-center gap-1.5 text-xs font-bold mt-1 ${cfg.text} hover:opacity-80 transition-opacity`}
            >
              {expanded
                ? <><ChevronUp className="w-3.5 h-3.5" /> Show less</>
                : <><ChevronDown className="w-3.5 h-3.5" /> +{deduped.length - 2} more items</>
              }
            </button>
          )}
        </div>

        <div className="w-full h-px bg-slate-100 dark:bg-slate-800 mb-4" />

        {/* Meta */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className={`rounded-2xl p-3 ${cfg.bg} border ${cfg.border}`}>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 mb-1.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Address
            </p>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">
              {order.shippingAddress}
            </p>
          </div>
          <div className={`rounded-2xl p-3 ${cfg.bg} border ${cfg.border}`}>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 mb-1.5 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Date
            </p>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {formatDate(order.createdAt)}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {deduped.length} product{deduped.length !== 1 ? 's' : ''}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total</span>
            <span className={`text-xl font-black ${cfg.text}`}>৳{order.totalAmount}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

export default function AllOrdersClient({ allOrders }: { allOrders: any }) {
  const [filter, setFilter] = useState<FilterType>('All')

  const groupedOrders = useMemo(() => processOrders(allOrders), [allOrders])

  const filteredGroups = useMemo(() =>
    filter === 'All'
      ? groupedOrders
      : (groupedOrders || []).filter(g => g.order.status === filter),
    [filter, groupedOrders]
  )

  const stats = useMemo(() => ({
    total: (groupedOrders || []).length,
    delivered: (groupedOrders || [])?.filter(g => g.order?.status === 'Delivered')?.length,
    pending: (groupedOrders || [])?.filter(g => g.order?.status === 'Pending')?.length,
    totalAmount: (groupedOrders || [])?.reduce((sum: any, g: any) => sum + g.order?.totalAmount, 0),
  }), [groupedOrders])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            <Package className="w-3.5 h-3.5" />
            Admin Panel
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-1">
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">Orders</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {groupedOrders.length} total orders across the platform.
          </p>
        </div>
      </motion.div>

      {/* ── Stats Strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: 'Total Orders', value: stats.total, Icon: Package, accent: 'from-indigo-500 to-violet-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10', text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-100 dark:border-indigo-500/20' },
          { label: 'Delivered', value: stats.delivered, Icon: CheckCircle, accent: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-100 dark:border-emerald-500/20' },
          { label: 'Pending', value: stats.pending, Icon: Clock, accent: 'from-amber-500 to-orange-400', bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-100 dark:border-amber-500/20' },
          { label: 'Total Revenue', value: `৳${stats.totalAmount.toLocaleString()}`, Icon: CircleDollarSign, accent: 'from-rose-500 to-pink-500', bg: 'bg-rose-50 dark:bg-rose-500/10', text: 'text-rose-600 dark:text-rose-400', border: 'border-rose-100 dark:border-rose-500/20' },
        ].map((stat) => (
          <div key={stat.label} className={`flex items-center gap-4 ${stat.bg} border ${stat.border} rounded-3xl p-5`}>
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.accent} text-white shadow-md flex-shrink-0`}>
              <stat.Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">{stat.label}</p>
              <p className={`text-xl font-black ${stat.text}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── Filter Pills ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-2 flex-wrap"
      >
        <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
        {STATUS_FILTERS.map((s) => {
          const count = s === 'All'
            ? (groupedOrders || []).length
            : (groupedOrders || []).filter(g => g.order?.status === s).length
          const isActive = filter === s
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`text-xs font-bold px-4 py-2 rounded-full border transition-all duration-200 ${isActive
                ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-md shadow-indigo-200 dark:shadow-indigo-900/40 scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600'
                }`}
            >
              {s} <span className="opacity-60 ml-0.5">({count})</span>
            </button>
          )
        })}
      </motion.div>

      {/* ── Grid ── */}
      <AnimatePresence mode="wait">
        {filteredGroups.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-4">
              <Package className="w-10 h-10 text-slate-400 dark:text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">No Orders Found</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">No orders match the selected filter.</p>
          </motion.div>
        ) : (
          <motion.div
            key={filter}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {(filteredGroups || []).map(({ order, items }) => (
              <OrderGroupCard key={order.id} order={order} items={items} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}