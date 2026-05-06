
"use client"

import { getMedicine } from "@/action/medicine.action"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, FilterX, PackageOpen, ArrowRight, Activity, Zap } from "lucide-react"

export function MedicineCard({ medCategory, medData }: { medCategory: string[], medData: any }) {
  const [data, setData] = useState<any[]>([])
  const [serch, setSerch] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [manufacturer, setManufacturer] = useState("")
  const [category, setCategory] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const manufacturers = Array.from(
    new Set(
      (Array.isArray(medData) ? medData : [])?.map((item: any) => item.manufacturer)?.filter(Boolean)
    )
  );

  const categorys = Array.from(
    new Set(
      (Array.isArray(medCategory) ? medCategory : [])?.map((item: any) => item.categorieName)?.filter(Boolean)
    )
  );

  const getMedicines = async () => {
    setIsLoading(true)
    try {
      const result = await getMedicine({
        serch,
        minPrice,
        maxPrice,
        manufacturer,
        category
      })
      setData(result)
    } catch (error) {
      console.error("Failed to fetch medicines", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getMedicines()
    }, 300) // debounce API calls slightly

    return () => clearTimeout(delayDebounceFn)
  }, [serch, minPrice, maxPrice, manufacturer, category])

  const clearFilters = () => {
    setSerch("")
    setMinPrice("")
    setMaxPrice("")
    setManufacturer("")
    setCategory("")
  }

  const hasActiveFilters = serch || minPrice || maxPrice || manufacturer || category;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* ===== Header & Filter Section ===== */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Medicines</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400">Find and filter through our extensive catalog of genuine medicines.</p>
          </div>

          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="text-rose-500 border-rose-200 hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-950/30"
            >
              <FilterX className="w-4 h-4 mr-2" /> Clear Filters
            </Button>
          )}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200/60 dark:border-slate-800">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search medicine by name..."
                value={serch}
                onChange={(e) => setSerch(e.target.value)}
                className="pl-11 h-12 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus-visible:ring-emerald-500"
              />
            </div>

            {/* Manufacturer */}
            <Select
              value={manufacturer}
              onValueChange={(value) => setManufacturer(value === "all" ? "" : value)}
            >
              <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-emerald-500">
                <SelectValue placeholder="Manufacturer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Manufacturers</SelectItem>
                {manufacturers.map((item: any) => (
                  <SelectItem key={item} value={`${item}`}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Category */}
            <Select
              value={category}
              onValueChange={(value) => setCategory(value === "all" ? "" : value)}
            >
              <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-emerald-500">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categorys.map((item: any) => (
                  <SelectItem key={item} value={`${item}`}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range */}
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                placeholder="Min ৳"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="h-12 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus-visible:ring-emerald-500 text-center"
              />
              <span className="text-slate-400">-</span>
              <Input
                type="number"
                placeholder="Max ৳"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="h-12 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus-visible:ring-emerald-500 text-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===== Medicine Grid ===== */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4" />
            <p className="text-slate-500 dark:text-slate-400 font-medium">Fetching medicines...</p>
          </motion.div>
        ) : Array.isArray(data) && data.length > 0 ? (
          <motion.div
            key="grid"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {data.map((medicine: any) => (
              <motion.div key={medicine.id} variants={itemVariants as any}>
                <Link href={`/allmedicine/${medicine.id}`} className="block h-full">
                  <div className="group relative h-full flex flex-col rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-4 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 overflow-hidden">

                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Image Container */}
                    <div className="relative aspect-square mb-6 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950/50 p-6 flex items-center justify-center">
                      {medicine.stock > 0 ? (
                        <Badge className="absolute top-3 left-3 z-10 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 hover:bg-emerald-500/20 shadow-sm backdrop-blur-md">
                          <Activity className="w-3 h-3 mr-1" /> In Stock
                        </Badge>
                      ) : (
                        <Badge className="absolute top-3 left-3 z-10 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50 shadow-sm backdrop-blur-md">
                          Out of Stock
                        </Badge>
                      )}

                      <img
                        src={medicine.image ?? "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80"}
                        alt={medicine.medicineName}
                        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 px-2">
                      <div className="mb-4 flex-1">
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 line-clamp-1">
                          {medicine.manufacturer}
                        </p>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {medicine.medicineName}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">Price</p>
                          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 leading-none">
                            ৳ {medicine.price}
                          </p>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white text-slate-400 transition-colors duration-300 shadow-sm">
                          <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto"
          >
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-6">
              <PackageOpen className="w-12 h-12 text-slate-400 dark:text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Medicines Found</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8">
              We couldn't find any medicines matching your current filters. Try adjusting your search criteria.
            </p>
            <Button
              onClick={clearFilters}
              className="rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-8"
            >
              Clear All Filters
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
