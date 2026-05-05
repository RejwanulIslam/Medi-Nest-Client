import SmartSearch from "@/components/SmartSearch"
import { medicineService } from "@/service/medicine.service"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Search Medicines | MediNest",
  description: "Search from our extensive catalog of genuine medicines. Get AI-powered smart suggestions as you type and discover medicines recommended for you.",
}

export default async function SearchPage() {
  const { data: medicines } = await medicineService.getMedicine()

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 transition-colors">
      <SmartSearch allMedicines={medicines ?? []} />
    </main>
  )
}
