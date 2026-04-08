'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'

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
    glow: 'shadow-emerald-100 dark:shadow-emerald-900/20',
    bar: 'from-emerald-400 to-teal-500',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
      </svg>
    ),
  },
  Pending: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800/60',
    dot: 'bg-amber-400',
    glow: 'shadow-amber-100 dark:shadow-amber-900/20',
    bar: 'from-amber-400 to-orange-400',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
      </svg>
    ),
  },
  Processing: {
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    text: 'text-violet-700 dark:text-violet-300',
    border: 'border-violet-200 dark:border-violet-800/60',
    dot: 'bg-violet-500',
    glow: 'shadow-violet-100 dark:shadow-violet-900/20',
    bar: 'from-violet-400 to-purple-500',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
        <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39z" clipRule="evenodd" />
      </svg>
    ),
  },
  Shipped: {
    bg: 'bg-sky-50 dark:bg-sky-950/40',
    text: 'text-sky-700 dark:text-sky-300',
    border: 'border-sky-200 dark:border-sky-800/60',
    dot: 'bg-sky-500',
    glow: 'shadow-sky-100 dark:shadow-sky-900/20',
    bar: 'from-sky-400 to-blue-500',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M6.5 3c-1.051 0-2.093.04-3.125.117A1.49 1.49 0 002 4.607V10.5h9V3H6.5zM12 3v7.5h2.strips M12 10.5h6V6.871a1.5 1.5 0 00-.423-1.06l-2.88-2.88A1.5 1.5 0 0013.628 2.5H12v8z" />
        <path d="M2 12v2.5A1.5 1.5 0 003.5 16h.605a2.5 2.5 0 014.79 0h1.21a2.5 2.5 0 014.79 0H16.5a1.5 1.5 0 001.5-1.5V12H2z" />
      </svg>
    ),
  },
  Cancelled: {
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    text: 'text-rose-700 dark:text-rose-300',
    border: 'border-rose-200 dark:border-rose-800/60',
    dot: 'bg-rose-500',
    glow: 'shadow-rose-100 dark:shadow-rose-900/20',
    bar: 'from-rose-400 to-red-500',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
      </svg>
    ),
  },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('En', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

function MedicineIcon() {
  return (
    <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  )
}

// Group order items by orderId
function groupOrdersByOrderId(items: OrderItem[]) {
  const map = new Map<string, { order: OrderInfo; items: OrderItem[] }>()
  for (const item of items) {
    if (!map.has(item.orderId)) {
      map.set(item.orderId, { order: item.order, items: [] })
    }
    map.get(item.orderId)!.items.push(item)
  }
  return Array.from(map.values())
}

function OrderGroupCard({ order, items }: { order: OrderInfo; items: OrderItem[] }) {
  const [expanded, setExpanded] = useState(false)
  const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG['Pending']

  // Deduplicate items by productId, sum quantities
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
    <div className={`
      group relative bg-white dark:bg-zinc-900 rounded-2xl border ${cfg.border}
      shadow-sm hover:shadow-md ${cfg.glow} transition-all duration-300 overflow-hidden
    `}>
      {/* Top gradient bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${cfg.bar}`} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400 dark:text-slate-500">
              Order ID
            </span>
            <span className="text-sm font-mono font-semibold text-slate-700 dark:text-slate-200 tracking-tight">
              #{order.id.slice(0, 12)}…
            </span>
          </div>

          <div className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
            border ${cfg.border} ${cfg.bg} ${cfg.text}
          `}>
            {cfg.icon}
            {order.status}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent mb-4" />

        {/* Product list */}
        <div className="flex flex-col gap-3 mb-4">
          {previewItems.map(({ item, totalQty }) => (
            <div key={item.productId} className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-800 flex-shrink-0">
                {item.product.image ? (
                  <Image
                    src={item.product.image}
                    alt={item.product.medicineName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <MedicineIcon />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate leading-tight">
                  {item.product.medicineName}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  {item.product.manufacturer}
                </p>
              </div>
              <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  ৳{item.product.price * totalQty}
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  ×{totalQty}
                </span>
              </div>
            </div>
          ))}

          {deduped.length > 2 && (
            <button
              onClick={() => setExpanded(v => !v)}
              className="text-xs text-indigo-500 dark:text-indigo-400 font-medium hover:underline text-left mt-1 transition-colors"
            >
              {expanded ? '▲ কম দেখাও' : `▼ আরও ${deduped.length - 2}টি পণ্য দেখাও`}
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent mb-4" />

        {/* Meta info grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className={`rounded-xl p-2.5 ${cfg.bg} border ${cfg.border}`}>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 mb-1">Address</p>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1">
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {order.shippingAddress}
            </p>
          </div>
          <div className={`rounded-xl p-2.5 ${cfg.bg} border ${cfg.border}`}>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 mb-1">Date</p>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1">
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(order.createdAt)}
            </p>
          </div>
        </div>

        {/* Footer total */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {deduped.length} different products
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total</span>
            <span className={`text-lg font-bold ${cfg.text}`}>
              ৳{order.totalAmount}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AllOrdersClient({ allOrders }: { allOrders: OrderItem[] }) {
  const [filter, setFilter] = useState<FilterType>('All')

  const groupedOrders = useMemo(() => groupOrdersByOrderId(allOrders), [allOrders])

  const filteredGroups = useMemo(() =>
    filter === 'All'
      ? groupedOrders
      : groupedOrders.filter(g => g.order.status === filter),
    [filter, groupedOrders]
  )

  const stats = useMemo(() => {
    const uniqueOrders = groupedOrders
    return {
      total: uniqueOrders.length,
      delivered: uniqueOrders.filter(g => g.order.status === 'Delivered').length,
      pending: uniqueOrders.filter(g => g.order.status === 'Pending').length,
      totalAmount: uniqueOrders.reduce((sum, g) => sum + g.order.totalAmount, 0),
    }
  }, [groupedOrders])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">

      {/* ── Header ── */}
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-slate-200/70 dark:border-zinc-800 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">All orders</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">All orders in the system are shown here.</p>
              </div>
            </div>

            {/* Stat chips */}
            <div className="flex gap-2.5 flex-wrap">
              {[
                { label: 'Total Order', value: stats.total, color: 'from-indigo-500 to-violet-500', light: 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-100 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-300' },
                { label: 'Delivered', value: stats.delivered, color: 'from-emerald-400 to-teal-500', light: 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300' },
                { label: 'Pending', value: stats.pending, color: 'from-amber-400 to-orange-400', light: 'bg-amber-50 dark:bg-amber-950/50 border-amber-100 dark:border-amber-900/60 text-amber-700 dark:text-amber-300' },
                { label: 'Total Income', value: `৳${stats.totalAmount}`, color: 'from-rose-400 to-pink-500', light: 'bg-rose-50 dark:bg-rose-950/50 border-rose-100 dark:border-rose-900/60 text-rose-700 dark:text-rose-300' },
              ].map(stat => (
                <div key={stat.label} className={`border rounded-2xl px-4 py-2.5 text-center min-w-[80px] ${stat.light}`}>
                  <p className="text-[10px] font-bold tracking-wide uppercase opacity-70">{stat.label}</p>
                  <p className="text-xl font-bold mt-0.5">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">

        {/* ── Filter Pills ── */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
          <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18v2.586a1 1 0 01-.293.707L13 15v5l-2-1v-4L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {STATUS_FILTERS.map((s) => {
            const count = s === 'All'
              ? groupedOrders.length
              : groupedOrders.filter(g => g.order.status === s).length
            const isActive = filter === s
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`
                  flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200
                  ${isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-transparent shadow-md shadow-indigo-200 dark:shadow-indigo-900/40 scale-105'
                    : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }
                `}
              >
                {s === 'All' ? 'All' : s}
                <span className={`ml-1.5 text-[10px] ${isActive ? 'opacity-80' : 'opacity-50'}`}>
                  ({count})
                </span>
              </button>
            )
          })}
        </div>

        {/* ── Grid ── */}
        {filteredGroups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400 dark:text-slate-600">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 shadow-inner">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M20 7H4a1 1 0 00-1 1v10a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1zM16 3H8l-1 4h10l-1-4z" />
              </svg>
            </div>
            <p className="text-base font-semibold text-slate-600 dark:text-slate-400">কোনো অর্ডার নেই</p>
            <p className="text-sm mt-1 text-slate-400 dark:text-slate-600">এই স্ট্যাটাসে কোনো অর্ডার পাওয়া যায়নি।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGroups.map(({ order, items }) => (
              <OrderGroupCard key={order.id} order={order} items={items} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}