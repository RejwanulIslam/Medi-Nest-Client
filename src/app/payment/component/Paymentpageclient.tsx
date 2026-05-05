"use client"

import { useRouter } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import {
  Lock,
  ChevronLeft,
  Package,
  MapPin,
  Phone,
  User,
  Truck,
} from "lucide-react"
import { OrderItem } from "../payment.interface"
import { CheckoutForm } from "./CheckoutForm"
import { motion } from "framer-motion"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const CARD_BRANDS = ["VISA", "MC", "AMEX"] as const

interface PaymentPageClientProps {
  totalAmount: number
  shippingAddress: string
  phone: string
  name: string
  items: OrderItem[]
}

export function PaymentPageClient({
  totalAmount,
  shippingAddress,
  phone,
  name,
  items,
}: PaymentPageClientProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex items-start justify-center p-4 md:p-8 transition-colors duration-300">
      <div className="w-full max-w-4xl">

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-6 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Cart
        </motion.button>

        <div className="grid lg:grid-cols-5 gap-6 items-start">

          {/* ── Left Column: Summary + Delivery ── */}
          <div className="lg:col-span-2 space-y-4">
            <OrderSummaryCard items={items} totalAmount={totalAmount} />
            <DeliveryInfoCard name={name} phone={phone} shippingAddress={shippingAddress} />
          </div>

          {/* ── Right Column: Stripe Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-slate-200/70 dark:border-white/[0.07] bg-white dark:bg-slate-900/50 overflow-hidden shadow-sm">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-white font-bold text-lg flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Secure Payment
                    </h2>
                    <p className="text-indigo-200 text-xs mt-0.5">
                      Your payment info is encrypted &amp; secure
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {CARD_BRANDS.map((brand) => (
                      <span
                        key={brand}
                        className="bg-white/20 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-md tracking-wider"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stripe Elements */}
              <div className="p-6">
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    items={items}
                    totalAmount={totalAmount}
                    shippingAddress={shippingAddress}
                    phone={phone}
                    name={name}
                  />
                </Elements>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ─── Order Summary Card ───────────────────────────────────────────────────────
function OrderSummaryCard({
  items,
  totalAmount,
}: {
  items: OrderItem[]
  totalAmount: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-slate-200/70 dark:border-white/[0.07] bg-white dark:bg-slate-900/50 p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <Package className="w-4 h-4 text-indigo-500 dark:text-indigo-400" strokeWidth={1.75} />
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          Order Summary
        </p>
      </div>

      <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <img
              src={(item as any).image || "https://i.ibb.co/yc1DkDrb/colorful-pills-syringe.jpg"}
              alt={item.medicineName}
              className="w-10 h-10 rounded-xl object-cover border border-slate-100 dark:border-white/10 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                {item.medicineName}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">× {item.quantity}</p>
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 shrink-0">
              ৳ {(item.price * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.06] space-y-1.5">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            ৳ {totalAmount.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400">Delivery</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">Free</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/[0.06] flex justify-between items-center">
        <span className="font-black text-slate-800 dark:text-slate-100">Total</span>
        <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
          ৳ {totalAmount.toLocaleString()}
        </span>
      </div>
    </motion.div>
  )
}

// ─── Delivery Info Card ───────────────────────────────────────────────────────
function DeliveryInfoCard({
  name,
  phone,
  shippingAddress,
}: {
  name: string
  phone: string
  shippingAddress: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.08 }}
      className="rounded-2xl border border-slate-200/70 dark:border-white/[0.07] bg-white dark:bg-slate-900/50 p-5 space-y-3"
    >
      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
        <Truck className="w-3.5 h-3.5" strokeWidth={2} />
        Delivering To
      </p>
      <div className="space-y-2">
        <div className="flex items-center gap-2.5 text-sm">
          <User className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={1.75} />
          <span className="font-semibold text-slate-800 dark:text-slate-100">{name || "—"}</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm">
          <Phone className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={1.75} />
          <span className="text-slate-600 dark:text-slate-400">{phone || "—"}</span>
        </div>
        <div className="flex items-start gap-2.5 text-sm">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" strokeWidth={1.75} />
          <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {shippingAddress || "—"}
          </span>
        </div>
      </div>
    </motion.div>
  )
}