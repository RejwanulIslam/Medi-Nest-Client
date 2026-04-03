"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import {
  ShieldCheck,
  Lock,
  CreditCard,
  ChevronLeft,
  Package,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

// ── Load Stripe ──────────────────────────────────────────────────────────────
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// ── Types ────────────────────────────────────────────────────────────────────
interface OrderItem {
  productId: string
  medicineName: string
  price: number
  quantity: number
  image: string
}

// ── Stripe Element Appearance (adapts to dark/light via CSS vars) ─────────────
function useStripeAppearance() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"))
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  return {
    style: {
      base: {
        fontSize: "15px",
        fontFamily: "'DM Sans', sans-serif",
        color: isDark ? "#e2e8f0" : "#1e293b",
        "::placeholder": { color: isDark ? "#475569" : "#94a3b8" },
        iconColor: isDark ? "#818cf8" : "#6366f1",
      },
      invalid: { color: "#f87171", iconColor: "#f87171" },
      complete: { color: isDark ? "#34d399" : "#10b981" },
    },
  }
}

// ── Inner checkout form ───────────────────────────────────────────────────────
function CheckoutForm({
  items,
  totalAmount,
  shippingAddress,
  phone,
  name,
}: {
  items: OrderItem[]
  totalAmount: number
  shippingAddress: string
  phone: string
  name: string
}) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const stripeOptions = useStripeAppearance()

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setStatus("loading")
    setErrorMsg("")

    try {
      // 1) Create PaymentIntent on your Express backend
      const res = await fetch(
        "http://localhost:5000/api/payment/create-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            totalAmount,
            shippingAddress,
            phone,
            name,
            items,
          }),
        }
      )

      if (!res.ok) throw new Error("Failed to create payment intent")

      const { clientSecret } = await res.json()

      // 2) Confirm the payment with Stripe.js
      const cardNumber = elements.getElement(CardNumberElement)
      if (!cardNumber) throw new Error("Card element not found")

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardNumber,
            billing_details: { name, phone },
          },
        }
      )

      if (error) {
        setErrorMsg(error.message ?? "Payment failed")
        setStatus("error")
        return
      }

      if (paymentIntent?.status === "succeeded") {
        setStatus("success")
        setTimeout(() => router.push("/order-success"), 1800)
      }
    } catch (err: any) {
      setErrorMsg(err.message ?? "Something went wrong")
      setStatus("error")
    }
  }

  // ── Success state ─────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Payment Successful!
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Redirecting to your order…
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Card Number */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          Card Number
        </label>
        <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-900/50 transition-all">
          <CreditCard className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
          <div className="flex-1">
            <CardNumberElement options={stripeOptions} />
          </div>
        </div>
      </div>

      {/* Expiry + CVC */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            Expiry
          </label>
          <div className="px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-900/50 transition-all">
            <CardExpiryElement options={stripeOptions} />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1">
            CVC <Lock className="w-3 h-3" />
          </label>
          <div className="px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-900/50 transition-all">
            <CardCvcElement options={stripeOptions} />
          </div>
        </div>
      </div>

      {/* Error */}
      {status === "error" && (
        <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60">
          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
          <p className="text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!stripe || status === "loading"}
        className="w-full h-14 rounded-xl font-bold text-white text-base bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 dark:from-indigo-500 dark:to-violet-600 dark:hover:from-indigo-600 dark:hover:to-violet-700 shadow-xl shadow-indigo-200 dark:shadow-indigo-900/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2.5"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            Pay ৳ {totalAmount.toLocaleString()}
          </>
        )}
      </button>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-4 pt-1">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5" />
          256-bit SSL
        </div>
        <span className="text-slate-200 dark:text-slate-700">|</span>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
          <Lock className="w-3.5 h-3.5" />
          Powered by Stripe
        </div>
      </div>
    </form>
  )
}

// ── Page Component ────────────────────────────────────────────────────────────
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