"use client"
import { useState } from "react"
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
} from "lucide-react"

type PaymentMethod = "cod" | "stripe" | null

export default function Addcard({ product }: { product: any[] }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)
  const [shippingAddress, setShippingAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

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

  return (
    // ── use `dark` class on <html> (managed by your homepage toggle) ──
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 p-6 transition-colors duration-300">

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8 flex items-center gap-3">
        <div className="p-2 bg-indigo-600 dark:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900">
          <ShoppingBag className="text-white w-5 h-5" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          My Cart
        </h1>
        <Badge
          variant="secondary"
          className="ml-auto bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-semibold border-0"
        >
          {product.length} item{product.length !== 1 && "s"}
        </Badge>
      </div>

      {/* Product Grid */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {product.map((item: any) => (
          <Card
            key={item.id}
            className="group overflow-hidden border-0 shadow-md hover:shadow-xl dark:shadow-slate-900 transition-all duration-300 bg-white dark:bg-slate-800/80 dark:border dark:border-slate-700/50 rounded-2xl"
          >
            <CardHeader className="p-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
              <img
                src={
                  item.product.image ??
                  "https://i.ibb.co/yc1DkDrb/colorful-pills-syringe.jpg"
                }
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                alt={item.product.medicineName}
              />
              <Badge className="absolute top-3 right-3 z-20 bg-white/90 dark:bg-slate-900/90 text-indigo-700 dark:text-indigo-300 font-bold text-xs shadow">
                Qty: {item.quantity}
              </Badge>
            </CardHeader>

            <CardContent className="p-4">
              <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-2 mb-1">
                {item.product.medicineName}
              </CardTitle>
              <div className="flex items-center justify-between mt-2">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold text-base">
                  ৳ {item.product.price}
                </span>
                <span className="text-slate-400 dark:text-slate-500 text-xs">
                  Subtotal:{" "}
                  <span className="text-slate-600 dark:text-slate-300 font-semibold">
                    ৳ {item.product.price * item.quantity}
                  </span>
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Bar */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-slate-800/80 dark:border dark:border-slate-700/50 rounded-2xl shadow-lg p-5 flex items-center justify-between gap-4 transition-colors duration-300">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Order Total</p>
            <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
              ৳ {totalAmount.toLocaleString()}
            </p>
          </div>
          <Button
            onClick={() => setOpen(true)}
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold px-8 rounded-xl shadow-md hover:shadow-indigo-200 dark:hover:shadow-indigo-900 transition-all duration-200 flex items-center gap-2"
          >
            Proceed to Checkout
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Checkout Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg rounded-3xl border-0 dark:border dark:border-slate-700/50 shadow-2xl p-0 overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300">
          {/* Dialog Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-700 dark:to-violet-800 px-6 py-5">
            <DialogTitle className="text-white text-lg font-bold flex items-center gap-2">
              <Package className="w-5 h-5" />
              Confirm Your Order
            </DialogTitle>
            <p className="text-indigo-200 text-sm mt-0.5">
              Fill in details & choose payment
            </p>
          </div>

          <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Order Summary */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 space-y-2.5 border border-transparent dark:border-slate-700/40">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">
                Order Summary
              </p>
              {product.map((item: any) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm text-slate-700 dark:text-slate-300"
                >
                  <span className="font-medium">
                    {item.product.medicineName}{" "}
                    <span className="text-slate-400 dark:text-slate-500">× {item.quantity}</span>
                  </span>
                  <span className="font-bold">
                    ৳ {item.product.price * item.quantity}
                  </span>
                </div>
              ))}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-2.5 flex justify-between font-black text-base text-indigo-600 dark:text-indigo-400">
                <span>Total</span>
                <span>৳ {totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Delivery Information
              </p>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <Input
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 focus:border-indigo-400 focus:ring-indigo-300"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <Input
                  placeholder="Mobile Number (e.g. 01XXXXXXXXX)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 focus:border-indigo-400 focus:ring-indigo-300"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 dark:text-slate-500" />
                <textarea
                  placeholder="Full Shipping Address"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  rows={2}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 outline-none text-sm resize-none text-slate-700 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Payment Method
              </p>

              <div className="grid grid-cols-2 gap-3">
                {/* Cash on Delivery */}
                <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                    paymentMethod === "cod"
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 shadow-md shadow-emerald-100 dark:shadow-emerald-900/30"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-300 hover:bg-emerald-50/50 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/30"
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl ${
                      paymentMethod === "cod"
                        ? "bg-emerald-500 dark:bg-emerald-600"
                        : "bg-slate-100 dark:bg-slate-700"
                    }`}
                  >
                    <Truck
                      className={`w-5 h-5 ${
                        paymentMethod === "cod"
                          ? "text-white"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-xs font-bold text-center leading-tight ${
                      paymentMethod === "cod"
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    Cash on Delivery
                  </span>
                  {paymentMethod === "cod" && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  )}
                </button>

                {/* Online Payment */}
                <button
                  onClick={() => setPaymentMethod("stripe")}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                    paymentMethod === "stripe"
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 shadow-md shadow-indigo-100 dark:shadow-indigo-900/30"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 hover:bg-indigo-50/50 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/30"
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl ${
                      paymentMethod === "stripe"
                        ? "bg-indigo-500 dark:bg-indigo-600"
                        : "bg-slate-100 dark:bg-slate-700"
                    }`}
                  >
                    <CreditCard
                      className={`w-5 h-5 ${
                        paymentMethod === "stripe"
                          ? "text-white"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-xs font-bold text-center leading-tight ${
                      paymentMethod === "stripe"
                        ? "text-indigo-700 dark:text-indigo-400"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    Pay Online
                  </span>
                  {paymentMethod === "stripe" && (
                    <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            {paymentMethod === "cod" && (
              <Button
                className="w-full bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold rounded-xl h-12 shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30 transition-all duration-200 flex items-center gap-2"
                disabled={!canProceed || loading}
                onClick={postCodOrder}
              >
                <Truck className="w-4 h-4" />
                {loading ? "Placing Order..." : "Place Order (COD)"}
              </Button>
            )}

            {paymentMethod === "stripe" && (
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold rounded-xl h-12 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 transition-all duration-200 flex items-center gap-2"
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
                className="w-full bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 font-bold rounded-xl h-12 cursor-not-allowed"
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