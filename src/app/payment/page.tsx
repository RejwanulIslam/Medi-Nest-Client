

import { Suspense } from "react"
import { OrderItem } from "./payment.interface"
import { PaymentPageClient } from "./component/Paymentpageclient"

interface PaymentPageProps {
  searchParams: Promise<{
    totalAmount?: string
    shippingAddress?: string
    phone?: string
    name?: string
    items?: string
  }>
}

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const params = await searchParams

  const totalAmount = Number(params.totalAmount ?? 0)
  const shippingAddress = params.shippingAddress ?? ""
  const phone = params.phone ?? ""
  const name = params.name ?? ""

  let items: OrderItem[] = []
  try {
    items = JSON.parse(params.items ?? "[]")
  } catch {
    items = []
  }

  return (
    <Suspense fallback={<PaymentPageSkeleton />}>
      <PaymentPageClient
        totalAmount={totalAmount}
        shippingAddress={shippingAddress}
        phone={phone}
        name={name}
        items={items}
      />
    </Suspense>
  )
}

// Loading skeleton
function PaymentPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-5 gap-6 animate-pulse">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl h-64" />
          <div className="bg-white dark:bg-slate-800 rounded-2xl h-36" />
        </div>
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-800 rounded-2xl h-96" />
        </div>
      </div>
    </div>
  )
}