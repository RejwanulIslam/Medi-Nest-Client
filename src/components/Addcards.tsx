"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { crateOrder, deleteCard } from "@/action/medicine.action"
import {
  Truck,
  CreditCard,
  ShoppingBag,
  MapPin,
  Phone,
  User,
  ChevronRight,
  Package,
  CheckCircle2,
  Sun,
  Moon,
} from "lucide-react"

type PaymentMethod = "cod" | "stripe" | null

export default function Addcard({ product }: { product: any[] }) {
  const router = useRouter()
  const [dark, setDark] = useState(false)
  const [open, setOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)
  const [shippingAddress, setShippingAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  // Sync dark class on <html> for Tailwind dark mode
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [dark])

  const totalAmount = product.reduce((total, item) => {
    const price = item.product?.price || 0
    const quantity = item.quantity || 0
    return total + price * quantity
  }, 0)

  const postCodOrder = async () => {
    if (!shippingAddress || !phone || !name) return
    setLoading(true)
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
        })),
      }
      await crateOrder(orderData)
      const idsToDelete = product.map((item) => item.id)
      await deleteCard(idsToDelete)
      setOpen(false)
      router.push("/order-success")
    } finally {
      setLoading(false)
    }
  }

  const goToStripe = () => {
    if (!shippingAddress || !phone || !name) return
    const params = new URLSearchParams({
      totalAmount: String(totalAmount),
      shippingAddress,
      phone,
      name,
      items: JSON.stringify(
        product.map((item) => ({
          cartItemId: item.id,          // ← cart delete এর জন্য
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

  const canProceed = shippingAddress && phone && name
  const codActive = paymentMethod === "cod"
  const stripeActive = paymentMethod === "stripe"

  return (
    <div
      className={`min-h-screen transition-colors duration-300 p-6
        ${dark
          ? "bg-[#0f1117] text-slate-100"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-800"
        }`}
    >
      {/* ─── Topbar ─── */}
      <div className="max-w-5xl mx-auto mb-8 flex items-center gap-3">
        <div className="p-2 bg-indigo-600 rounded-xl">
          <ShoppingBag className="text-white w-5 h-5" />
        </div>
        <h1 className={`text-2xl font-bold tracking-tight ${dark ? "text-slate-100" : "text-slate-800"}`}>
          My Cart
        </h1>
        <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 font-semibold">
          {product.length} item{product.length !== 1 && "s"}
        </Badge>

        {/* ── Theme Toggle ── */}
        <button
          onClick={() => setDark(!dark)}
          aria-label="Toggle theme"
          className={`ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border transition-all duration-200
            ${dark
              ? "bg-slate-800 border-slate-600 text-yellow-400 hover:bg-slate-700"
              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"
            }`}
        >
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span>{dark ? "Light" : "Dark"}</span>
        </button>
      </div>

      {/* ─── Product Grid ─── */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {product.map((item: any) => (
          <Card
            key={item.id}
            className={`group overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border-0
              ${dark ? "bg-[#1a1d27] border border-slate-700/50" : "bg-white"}`}
          >
            <CardHeader className="p-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
              <img
                src={item.product.image ?? "https://i.ibb.co/yc1DkDrb/colorful-pills-syringe.jpg"}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                alt={item.product.medicineName}
              />
              <Badge className="absolute top-3 right-3 z-20 bg-white/90 text-indigo-700 font-bold text-xs shadow">
                Qty: {item.quantity}
              </Badge>
            </CardHeader>

            <CardContent className="p-4">
              <CardTitle className={`text-sm font-bold line-clamp-2 mb-1 ${dark ? "text-slate-100" : "text-slate-800"}`}>
                {item.product.medicineName}
              </CardTitle>
              <div className="flex items-center justify-between mt-2">
                <span className="text-indigo-500 font-bold text-base">৳ {item.product.price}</span>
                <span className={`text-xs ${dark ? "text-slate-400" : "text-slate-400"}`}>
                  Subtotal:{" "}
                  <span className={`font-semibold ${dark ? "text-slate-300" : "text-slate-600"}`}>
                    ৳ {item.product.price * item.quantity}
                  </span>
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ─── Summary Bar ─── */}
      <div className="max-w-5xl mx-auto">
        <div className={`rounded-2xl shadow-lg p-5 flex items-center justify-between gap-4
          ${dark ? "bg-[#1a1d27] border border-slate-700/50" : "bg-white"}`}
        >
          <div>
            <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>Order Total</p>
            <p className="text-2xl font-black text-indigo-500">৳ {totalAmount.toLocaleString()}</p>
          </div>
          <Button
            onClick={() => setOpen(true)}
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 rounded-xl shadow-md transition-all duration-200 flex items-center gap-2"
          >
            Proceed to Checkout <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* ──────────── Checkout Dialog ──────────── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={`max-w-lg rounded-3xl border-0 shadow-2xl p-0 overflow-hidden
            ${dark ? "bg-[#1a1d27] text-slate-100" : "bg-white text-slate-800"}`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-5">
            <DialogTitle className="text-white text-lg font-bold flex items-center gap-2">
              <Package className="w-5 h-5" /> Confirm Your Order
            </DialogTitle>
            <p className="text-indigo-200 text-sm mt-0.5">Fill in details & choose payment</p>
          </div>

          <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Order Summary */}
            <div className={`rounded-2xl p-4 space-y-2.5 ${dark ? "bg-[#12151f]" : "bg-slate-50"}`}>
              <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${dark ? "text-slate-400" : "text-slate-500"}`}>
                Order Summary
              </p>
              {product.map((item: any) => (
                <div key={item.id} className={`flex justify-between text-sm ${dark ? "text-slate-300" : "text-slate-700"}`}>
                  <span className="font-medium">
                    {item.product.medicineName}{" "}
                    <span className={dark ? "text-slate-500" : "text-slate-400"}>× {item.quantity}</span>
                  </span>
                  <span className="font-bold">৳ {item.product.price * item.quantity}</span>
                </div>
              ))}
              <div className={`border-t pt-2.5 flex justify-between font-black text-base text-indigo-500
                ${dark ? "border-slate-700" : "border-slate-200"}`}>
                <span>Total</span>
                <span>৳ {totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="space-y-3">
              <p className={`text-xs font-bold uppercase tracking-widest ${dark ? "text-slate-400" : "text-slate-500"}`}>
                Delivery Information
              </p>

              {/* Name */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`pl-10 rounded-xl border transition-colors
                    ${dark
                      ? "bg-[#12151f] border-slate-600 text-slate-100 placeholder:text-slate-500 focus:border-indigo-400"
                      : "bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-indigo-400"
                    }`}
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Mobile Number (e.g. 01XXXXXXXXX)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`pl-10 rounded-xl border transition-colors
                    ${dark
                      ? "bg-[#12151f] border-slate-600 text-slate-100 placeholder:text-slate-500 focus:border-indigo-400"
                      : "bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-indigo-400"
                    }`}
                />
              </div>

              {/* Address */}
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                <textarea
                  placeholder="Full Shipping Address"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  rows={2}
                  className={`w-full pl-10 pr-3 py-2.5 rounded-xl border focus:ring-2 focus:ring-indigo-100 outline-none text-sm resize-none transition-colors
                    ${dark
                      ? "bg-[#12151f] border-slate-600 text-slate-100 placeholder:text-slate-500 focus:border-indigo-400"
                      : "bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-indigo-400"
                    }`}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <p className={`text-xs font-bold uppercase tracking-widest ${dark ? "text-slate-400" : "text-slate-500"}`}>
                Payment Method
              </p>

              <div className="grid grid-cols-2 gap-3">
                {/* COD */}
                <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer
                    ${codActive
                      ? "border-emerald-500 bg-emerald-500/10 shadow-md"
                      : dark
                        ? "border-slate-700 bg-[#12151f] hover:border-emerald-500/40 hover:bg-emerald-500/5"
                        : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50"
                    }`}
                >
                  <div className={`p-2 rounded-xl ${codActive ? "bg-emerald-500" : dark ? "bg-slate-700" : "bg-slate-100"}`}>
                    <Truck className={`w-5 h-5 ${codActive ? "text-white" : dark ? "text-slate-300" : "text-slate-500"}`} />
                  </div>
                  <span className={`text-xs font-bold text-center leading-tight
                    ${codActive ? "text-emerald-500" : dark ? "text-slate-300" : "text-slate-600"}`}>
                    Cash on Delivery
                  </span>
                  {codActive && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                </button>

                {/* Stripe */}
                <button
                  onClick={() => setPaymentMethod("stripe")}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer
                    ${stripeActive
                      ? "border-indigo-500 bg-indigo-500/10 shadow-md"
                      : dark
                        ? "border-slate-700 bg-[#12151f] hover:border-indigo-500/40 hover:bg-indigo-500/5"
                        : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50"
                    }`}
                >
                  <div className={`p-2 rounded-xl ${stripeActive ? "bg-indigo-500" : dark ? "bg-slate-700" : "bg-slate-100"}`}>
                    <CreditCard className={`w-5 h-5 ${stripeActive ? "text-white" : dark ? "text-slate-300" : "text-slate-500"}`} />
                  </div>
                  <span className={`text-xs font-bold text-center leading-tight
                    ${stripeActive ? "text-indigo-400" : dark ? "text-slate-300" : "text-slate-600"}`}>
                    Pay Online
                  </span>
                  {stripeActive && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                </button>
              </div>
            </div>

            {/* Action Button */}
            {paymentMethod === "cod" && (
              <Button
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl h-12 shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                disabled={!canProceed || loading}
                onClick={postCodOrder}
              >
                <Truck className="w-4 h-4" />
                {loading ? "Placing Order..." : "Place Order (COD)"}
              </Button>
            )}

            {paymentMethod === "stripe" && (
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl h-12 shadow-lg shadow-indigo-500/20 flex items-center gap-2"
                disabled={!canProceed}
                onClick={goToStripe}
              >
                <CreditCard className="w-4 h-4" />
                Continue to Payment
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}

            {!paymentMethod && (
              <Button
                className={`w-full font-bold rounded-xl h-12 cursor-not-allowed
                  ${dark ? "bg-slate-700 text-slate-500" : "bg-slate-200 text-slate-400"}`}
                disabled
              >
                Select a Payment Method
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}