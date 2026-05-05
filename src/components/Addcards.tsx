"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Truck,
  CreditCard,
  ShoppingCart,
  MapPin,
  Phone,
  User,
  ChevronRight,
  Package,
  CheckCircle2,
  Trash2,
  AlertCircle,
  Loader2,
  ShoppingBag,
  X,
} from "lucide-react"
import { crateOrder, deleteCard } from "@/action/medicine.action"
import { cn } from "@/lib/utils"

type PaymentMethod = "cod" | "stripe" | null

const inputCls = cn(
  "w-full h-10 pl-10 pr-3.5 rounded-xl text-sm outline-none transition-all duration-200",
  "bg-slate-50 dark:bg-slate-900/60",
  "border border-slate-200 dark:border-white/10",
  "text-slate-900 dark:text-slate-100",
  "placeholder-slate-400 dark:placeholder-slate-500",
  "focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 dark:focus:border-emerald-500"
)

export default function Addcard({ product }: { product: any[] }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)
  const [shippingAddress, setShippingAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [orderError, setOrderError] = useState("")

  const totalAmount = product.reduce((total, item) => {
    return total + (item.product?.price || 0) * (item.quantity || 0)
  }, 0)

  const canProceed = shippingAddress.trim() && phone.trim() && name.trim()

  // ── COD Order ──────────────────────────────────────────────────────────────
  const postCodOrder = async () => {
    if (!canProceed) return
    setLoading(true)
    setOrderError("")
    try {

      const orderData = {
        shippingAddress,
        totalAmount,
        phone,
        name,
        paymentMethod: "cod",
        items: product.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
      }
      const data = await crateOrder(orderData)
      console.log("orderdata", orderData);
      console.log("cod data:", data)
      // crateOrder returns the saved order object on success, or null on error
      if (data) {
        const idsToDelete = product.map((item) => item.id)
        await deleteCard(idsToDelete)
        setOpen(false)
        router.push("/order-success")
      } else {
        setOrderError("Failed to place order. Please try again.")
      }
    } catch {
      setOrderError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // ── Go to Stripe ────────────────────────────────────────────────────────────
  const goToStripe = () => {
    if (!canProceed) return
    const params = new URLSearchParams({
      totalAmount: String(totalAmount),
      shippingAddress,
      phone,
      name,
      items: JSON.stringify(
        product.map((item) => ({
          cartItemId: item.id,
          productId: item.product.id,
          medicineName: item.product.medicineName,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image ?? "",
        }))
      ),
    })
    router.push(`/payment?${params.toString()}`)
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25">
          <ShoppingCart className="w-5 h-5 text-white" strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            My Cart
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {product.length} item{product.length !== 1 && "s"} ready to order
          </p>
        </div>
      </motion.div>

      {/* ── Product Grid ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {product.map((item: any, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.06 }}
            className="group rounded-2xl border border-slate-200/70 dark:border-white/[0.07] bg-white dark:bg-slate-900/50 overflow-hidden hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-black/20 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={item.product?.image ?? "https://i.ibb.co/yc1DkDrb/colorful-pills-syringe.jpg"}
                alt={item.product?.medicineName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Qty badge */}
              <span className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-slate-700 dark:text-slate-200 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                Qty: {item.quantity}
              </span>
            </div>

            {/* Info */}
            <div className="p-4">
              <p className="font-semibold text-sm text-slate-800 dark:text-slate-100 line-clamp-2 mb-3 leading-snug">
                {item.product?.medicineName}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                  ৳ {item.product?.price?.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Total:{" "}
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    ৳ {(item.product?.price * item.quantity).toLocaleString()}
                  </span>
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Summary + Checkout Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="rounded-2xl border border-slate-200/70 dark:border-white/[0.07] bg-white dark:bg-slate-900/50 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Order Total</p>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            ৳ {totalAmount.toLocaleString()}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Free delivery included</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          id="cart-checkout-btn"
          className="flex items-center gap-2 h-11 px-6 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25 transition-all duration-200 active:scale-[0.98]"
        >
          Proceed to Checkout
          <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>

      {/* ──────────── Checkout Dialog ──────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />

            {/* Sheet / Modal */}
            <motion.div
              key="dialog"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="fixed inset-x-4 bottom-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-full sm:w-[480px] max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-white/[0.08] flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-5 flex items-start justify-between shrink-0">
                <div>
                  <h2 className="text-white font-bold text-lg flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Confirm Your Order
                  </h2>
                  <p className="text-emerald-100 text-sm mt-0.5">
                    Fill in delivery details &amp; choose payment
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

                {/* Order Summary */}
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-white/[0.06] p-4 space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Order Summary
                  </p>
                  {product.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.product?.image ?? "https://i.ibb.co/yc1DkDrb/colorful-pills-syringe.jpg"}
                        alt={item.product?.medicineName}
                        className="w-9 h-9 rounded-lg object-cover border border-slate-200 dark:border-white/10 shrink-0"
                      />
                      <span className="flex-1 text-sm text-slate-700 dark:text-slate-300 font-medium truncate">
                        {item.product?.medicineName}
                        <span className="text-slate-400 dark:text-slate-500 ml-1">× {item.quantity}</span>
                      </span>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200 shrink-0">
                        ৳ {(item.product?.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08] flex justify-between font-black text-emerald-600 dark:text-emerald-400">
                    <span>Total</span>
                    <span>৳ {totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Delivery Information
                  </p>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={1.75} />
                    <input
                      id="checkout-name"
                      className={inputCls}
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={1.75} />
                    <input
                      id="checkout-phone"
                      className={inputCls}
                      placeholder="Mobile Number (01XXXXXXXXX)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" strokeWidth={1.75} />
                    <textarea
                      id="checkout-address"
                      className={cn(
                        "w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm outline-none resize-none transition-all duration-200",
                        "bg-slate-50 dark:bg-slate-900/60",
                        "border border-slate-200 dark:border-white/10",
                        "text-slate-900 dark:text-slate-100",
                        "placeholder-slate-400 dark:placeholder-slate-500",
                        "focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400"
                      )}
                      placeholder="Full Shipping Address"
                      rows={2}
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Payment Method
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {/* COD */}
                    <button
                      type="button"
                      id="payment-method-cod"
                      onClick={() => setPaymentMethod("cod")}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200",
                        paymentMethod === "cod"
                          ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 shadow-sm"
                          : "border-slate-200 dark:border-white/10 hover:border-emerald-300 dark:hover:border-emerald-500/40 hover:bg-emerald-50/50 dark:hover:bg-emerald-500/5"
                      )}
                    >
                      <span className={cn(
                        "flex items-center justify-center w-9 h-9 rounded-xl transition-colors",
                        paymentMethod === "cod" ? "bg-emerald-500" : "bg-slate-100 dark:bg-white/10"
                      )}>
                        <Truck className={cn("w-5 h-5", paymentMethod === "cod" ? "text-white" : "text-slate-500 dark:text-slate-400")} strokeWidth={1.75} />
                      </span>
                      <span className={cn("text-xs font-bold text-center", paymentMethod === "cod" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400")}>
                        Cash on Delivery
                      </span>
                      {paymentMethod === "cod" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </button>

                    {/* Stripe */}
                    <button
                      type="button"
                      id="payment-method-stripe"
                      onClick={() => setPaymentMethod("stripe")}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200",
                        paymentMethod === "stripe"
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 shadow-sm"
                          : "border-slate-200 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-500/40 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/5"
                      )}
                    >
                      <span className={cn(
                        "flex items-center justify-center w-9 h-9 rounded-xl transition-colors",
                        paymentMethod === "stripe" ? "bg-indigo-500" : "bg-slate-100 dark:bg-white/10"
                      )}>
                        <CreditCard className={cn("w-5 h-5", paymentMethod === "stripe" ? "text-white" : "text-slate-500 dark:text-slate-400")} strokeWidth={1.75} />
                      </span>
                      <span className={cn("text-xs font-bold text-center", paymentMethod === "stripe" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400")}>
                        Pay Online
                      </span>
                      {paymentMethod === "stripe" && <CheckCircle2 className="w-4 h-4 text-indigo-500" />}
                    </button>
                  </div>
                </div>

                {/* Error */}
                <AnimatePresence>
                  {orderError && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-sm text-red-600 dark:text-red-400"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {orderError}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                {paymentMethod === "cod" && (
                  <button
                    id="place-cod-order-btn"
                    disabled={!canProceed || loading}
                    onClick={postCodOrder}
                    className="w-full flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Placing Order…</> : <><Truck className="w-4 h-4" /> Place Order (COD)</>}
                  </button>
                )}

                {paymentMethod === "stripe" && (
                  <button
                    id="go-to-stripe-btn"
                    disabled={!canProceed}
                    onClick={goToStripe}
                    className="w-full flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <CreditCard className="w-4 h-4" />
                    Continue to Payment
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {!paymentMethod && (
                  <button
                    disabled
                    className="w-full h-11 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-white/[0.05] text-slate-400 dark:text-slate-600 cursor-not-allowed"
                  >
                    Select a Payment Method
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}