import Addcard from "@/components/Addcards"
import { cardService } from "@/service/card.service"
import { userService } from "@/service/user.service"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

export default async function MyCardPage() {
  const { data } = await cardService.getcard()
  const { data: session } = await userService.getSeation()
  const filterByUserId = (data ?? []).filter(
    (item: any) => item.customerId === session?.user?.id
  )

  return (
    <div>
      {filterByUserId.length > 0 ? (
        <Addcard product={filterByUserId} />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="w-20 h-20 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mb-5 shadow-inner">
            <ShoppingCart className="w-9 h-9 text-emerald-500 dark:text-emerald-400" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-6">
            You haven&apos;t added any medicines yet. Browse our catalogue and find what you need.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-10 px-6 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/20 transition-all duration-200"
          >
            Browse Medicines
          </Link>
        </div>
      )}
    </div>
  )
}
