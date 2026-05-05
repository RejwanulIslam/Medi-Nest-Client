"use client"

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import {
  AlertCircle,
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  ShieldCheck,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { OrderItem } from "../payment.interface"
import { createPayment } from "@/action/payment.action"
import { crateOrder, deleteCard } from "@/action/medicine.action"

// ─── Stripe appearance — adapts to dark/light via class observer ─────────────
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

// ─────────────────────────────────────────────────────────────────────────────

export function CheckoutForm({
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

  // ── Order save + cart clear ──────────────────────────────────────────────
  const saveOrderAndClearCart = async () => {
    // 1) Save order
    await crateOrder({
      shippingAddress,
      totalAmount,
      phone,
      name,
      paymentMethod: "stripe",
      items: items.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    })

    const idsToDelete: string[] = items
      .map((item: any) => item.cartItemId)
      .filter(Boolean)

    if (idsToDelete.length > 0) {
      await deleteCard(idsToDelete)
    }
  }

  // ── Form submit ──────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setStatus("loading")
    setErrorMsg("")

    try {
      // 1) Create PaymentIntent
      const res = await createPayment({
        items,
        totalAmount,
        shippingAddress,
        phone,
        name,
      })

      if (res.status !== 200) throw new Error("Failed to create payment intent")

      const { clientSecret } = res.data

      // 2) Confirm card payment
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

      // 3) Stripe error
      if (error) {
        setErrorMsg(error.message ?? "Payment failed")
        setStatus("error")
        return
      }

      // 4) Success — save order & clear cart
      if (paymentIntent?.status === "succeeded") {
        await saveOrderAndClearCart()
        setStatus("success")
        setTimeout(() => router.push("/order-success"), 1800)
      }
    } catch (err: any) {
      setErrorMsg(err.message ?? "Something went wrong. Please try again.")
      setStatus("error")
    }
  }

  // ── Success UI ───────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
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

  // ── Main form ────────────────────────────────────────────────────────────
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