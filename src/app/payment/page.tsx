"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import {
  Lock,
  ChevronLeft,
  Package,
} from "lucide-react"
import { OrderItem } from "./payment.interface"
import { CheckoutForm } from "./component/CheckoutForm"

//  Load Stripe 
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)


export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const totalAmount = Number(searchParams.get("totalAmount") ?? 0)
  const shippingAddress = searchParams.get("shippingAddress") ?? ""
  const phone = searchParams.get("phone") ?? ""
  const name = searchParams.get("name") ?? ""
  const items: OrderItem[] = JSON.parse(searchParams.get("items") ?? "[]")

  // Card brand icons (simple text-based for now, swap for SVG if needed)
  const cardBrands = ["VISA", "MC", "AMEX"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center p-4 md:p-8 transition-colors duration-300">
      <div className="w-full max-w-4xl">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors duration-200 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Cart
        </button>

        <div className="grid lg:grid-cols-5 gap-6">

          {/* ── Left: Order Summary ────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-slate-800/80 dark:border dark:border-slate-700/50 rounded-2xl shadow-md p-5">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  Order Summary
                </p>
              </div>

              <div className="space-y-3 max-h-56 overflow-y-auto pr-1 custom-scroll">
                {items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img
                      src={item.image || "https://i.ibb.co/yc1DkDrb/colorful-pills-syringe.jpg"}
                      alt={item.medicineName}
                      className="w-11 h-11 rounded-xl object-cover border border-slate-100 dark:border-slate-700 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                        {item.medicineName}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        × {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 shrink-0">
                      ৳ {item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Subtotal</span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    ৳ {totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1.5">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Delivery</span>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    Free
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex justify-between items-center">
                <span className="font-black text-slate-800 dark:text-slate-100">Total</span>
                <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                  ৳ {totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Delivery info */}
            <div className="bg-white dark:bg-slate-800/80 dark:border dark:border-slate-700/50 rounded-2xl shadow-md p-5 space-y-2.5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
                Delivering To
              </p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{phone}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {shippingAddress}
              </p>
            </div>
          </div>

          {/* ── Right: Payment Form ───────────────────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-800/80 dark:border dark:border-slate-700/50 rounded-2xl shadow-md overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-700 dark:to-violet-800 px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-white font-bold text-lg flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Secure Payment
                    </h2>
                    <p className="text-indigo-200 text-xs mt-0.5">
                      Your payment info is encrypted
                    </p>
                  </div>
                  {/* Card brand badges */}
                  <div className="flex gap-2">
                    {cardBrands.map((brand) => (
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
          </div>
        </div>
      </div>
    </div>
  )
}