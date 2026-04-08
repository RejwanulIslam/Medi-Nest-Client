"use client"

import { useState } from "react"
import { updateOrder } from "@/action/medicine.action"

const statusConfig: Record<string, { label: string; dot: string; bg: string; text: string; border: string }> = {
  Pending: {
    label: "Pending",
    dot: "bg-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
  },
  Processing: {
    label: "Processing",
    dot: "bg-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
  },
  Shipped: {
    label: "Shipped",
    dot: "bg-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/40",
    text: "text-violet-700 dark:text-violet-300",
    border: "border-violet-200 dark:border-violet-800",
  },
  Delivered: {
    label: "Delivered",
    dot: "bg-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800",
  },
}

const statusOptions = [
  { value: "Pending", emoji: "🟡", label: "Pending" },
  { value: "Processing", emoji: "🔄", label: "Processing" },
  { value: "Shipped", emoji: "🚚", label: "Shipped" },
  { value: "Delivered", emoji: "✅", label: "Delivered" },
]

export default function SellerOrderCard({ data }: { data: any }) {
  const [open, setOpen] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(data.order?.status || "Pending")
  const [loading, setLoading] = useState(false)

  const cfg = statusConfig[currentStatus] || statusConfig["Pending"]

  const handleStatusChange = async (status: string) => {
    setLoading(true)
    try {
      await updateOrder(status, data.orderId)
      setCurrentStatus(status)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <div className="relative group rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/80 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-visible">
      {/* Top accent bar */}
      <div className={`h-1 w-full rounded-t-2xl ${cfg.dot} opacity-80`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 shadow-inner">
              <span className="text-lg">💊</span>
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-base leading-tight truncate">
                {data.product?.medicineName}
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                {data.product?.manufacturer}
              </p>
            </div>
          </div>

          {/* Status badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border flex-shrink-0 ${cfg.bg} ${cfg.text} ${cfg.border}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse`} />
            {cfg.label}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 dark:border-slate-700/50 mb-4" />

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <InfoCell
            icon="📦"
            label="Quantity"
            value={`${data.quantity} pcs`}
          />
          <InfoCell
            icon="💰"
            label="Total"
            value={`৳ ${data.order?.totalAmount}`}
            highlight
          />
          <InfoCell
            icon="👤"
            label="Customer ID"
            value={data.order?.customerId?.slice(0, 10) + "..."}
          />
          <InfoCell
            icon="📅"
            label="Order Date"
            value={new Date(data.order?.createdAt).toLocaleDateString("en-BD", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          />
        </div>

        {/* Shipping Address */}
        {data.order?.shippingAddress && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-700/40 mb-4">
            <span className="text-sm">📍</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Ship to:{" "}
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {data.order.shippingAddress}
              </span>
            </span>
          </div>
        )}

        {/* Update Status */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl text-sm font-medium border-2 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <span>⚙️</span>
                Update Status
                <span
                  className={`ml-auto transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                >
                  ▾
                </span>
              </>
            )}
          </button>

          {open && (
            <div className="absolute z-20 bottom-full mb-2 left-0 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-2xl overflow-hidden">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleStatusChange(opt.value)}
                  className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-colors
                    ${currentStatus === opt.value
                      ? "bg-slate-100 dark:bg-slate-700 font-semibold text-slate-800 dark:text-slate-100"
                      : "hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-600 dark:text-slate-300"
                    }`}
                >
                  <span>{opt.emoji}</span>
                  <span>{opt.label}</span>
                  {currentStatus === opt.value && (
                    <span className="ml-auto text-xs text-slate-400">current</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoCell({
  icon,
  label,
  value,
  highlight,
}: {
  icon: string
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="flex flex-col gap-0.5 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-700/40">
      <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
        <span className="text-[11px]">{icon}</span> {label}
      </span>
      <span
        className={`text-sm font-semibold leading-tight ${
          highlight
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-slate-700 dark:text-slate-200"
        }`}
      >
        {value}
      </span>
    </div>
  )
}