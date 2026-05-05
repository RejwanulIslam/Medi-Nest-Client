"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  X,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Pill,
  Clock,
  Activity,
} from "lucide-react"
import { getMedicine } from "@/action/medicine.action"
import { aiApi } from "@/lib/ai-api"

type Medicine = {
  id: string
  medicineName: string
  price: number
  manufacturer: string
  image?: string
  stock: number
  category?: string
}

// ── Skeleton loaders ──────────────────────────────────────────
function SuggestionSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 animate-pulse">
      <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 flex-shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-3/4" />
        <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full w-1/2" />
      </div>
      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-12" />
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-4 animate-pulse">
      <div className="aspect-square rounded-2xl bg-slate-200 dark:bg-slate-800 mb-4" />
      <div className="space-y-2 px-1">
        <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full w-1/2" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-4/5" />
        <div className="h-px bg-slate-100 dark:bg-slate-800 my-3" />
        <div className="flex items-center justify-between">
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-full w-16" />
          <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  )
}

// ── Medicine Card ─────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
}

function MedicineCard({ medicine }: { medicine: Medicine }) {
  return (
    <motion.div variants={cardVariants as any}>
      <Link href={`/allmedicine/${medicine.id}`} className="block h-full">
        <div className="group relative h-full flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-4 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 overflow-hidden cursor-pointer">
          {/* Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Image */}
          <div className="relative aspect-square mb-4 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950/50 p-4 flex items-center justify-center flex-shrink-0">
            {medicine.stock > 0 ? (
              <span className="absolute top-2 left-2 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-1">
                <Activity className="w-2.5 h-2.5" /> In Stock
              </span>
            ) : (
              <span className="absolute top-2 left-2 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50">
                Out of Stock
              </span>
            )}
            {medicine.image ? (
              <img
                src={medicine.image}
                alt={medicine.medicineName}
                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <Pill className="w-12 h-12 text-slate-300 dark:text-slate-700" />
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 px-1">
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 truncate">
              {medicine.manufacturer}
            </p>
            <h3 className="text-base font-black text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight mb-auto">
              {medicine.medicineName}
            </h3>

            <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-0.5">Price</p>
                <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 leading-none">
                  ৳{medicine.price}
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white text-slate-400 transition-colors duration-300">
                <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ── Main Component ─────────────────────────────────────────────
interface SmartSearchProps {
  allMedicines: Medicine[]
}

export default function SmartSearch({ allMedicines }: SmartSearchProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<Medicine[]>([])
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [suggestionLoading, setSuggestionLoading] = useState(false)
  const [recommendLoading, setRecommendLoading] = useState(false)
  const [recommended, setRecommended] = useState<Medicine[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)

  // Load initial recommendations on mount
  useEffect(() => {
    setRecommendLoading(true)
    const shuffled = [...allMedicines].sort(() => Math.random() - 0.5).slice(0, 8)
    setTimeout(() => {
      setRecommended(shuffled)
      setRecommendLoading(false)
    }, 800)
  }, [allMedicines])

  // Debounced search suggestions
  const fetchSuggestions = useCallback(async (q: string) => {
    if (!q.trim()) {
      setSuggestions([])
      setAiSuggestions([])
      setShowDropdown(false)
      return
    }
    setSuggestionLoading(true)
    setShowDropdown(true)

    try {
      const [data, aiData] = await Promise.all([
        getMedicine({ serch: q }),
        q.length >= 3 ? aiApi.searchSuggestions(q) : Promise.resolve({ suggestions: [] })
      ]);
      setSuggestions(Array.isArray(data) ? data.slice(0, 6) : [])
      setAiSuggestions(aiData.suggestions || [])
    } catch {
      setSuggestions([])
      setAiSuggestions([])
    } finally {
      setSuggestionLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => fetchSuggestions(query), 350)
    return () => clearTimeout(timer)
  }, [query, fetchSuggestions])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handle)
    return () => document.removeEventListener("mousedown", handle)
  }, [])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return
    if (e.key === "ArrowDown") {
      setSelectedIndex((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        router.push(`/allmedicine/${suggestions[selectedIndex].id}`)
        setShowDropdown(false)
      } else if (query.trim()) {
        router.push(`/allmedicine?search=${encodeURIComponent(query)}`)
        setShowDropdown(false)
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">

      {/* ── Search Section ── */}
      <section className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Search
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
            Find Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
              Medicine
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8 text-base">
            Search from our catalog of genuine medicines with smart suggestions.
          </p>
        </motion.div>

        {/* Search Bar + Dropdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative"
        >
          {/* Input */}
          <div className="relative flex items-center bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-slate-900/30 transition-all duration-300 focus-within:border-emerald-500 focus-within:shadow-emerald-500/10 focus-within:shadow-2xl">
            <Search className="absolute left-5 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelectedIndex(-1) }}
              onFocus={() => query.trim() && setShowDropdown(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search medicines, categories, brands..."
              className="w-full pl-14 pr-14 py-5 text-base font-medium text-slate-900 dark:text-white bg-transparent rounded-2xl outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            {query && (
              <button
                onClick={() => { setQuery(""); setSuggestions([]); setShowDropdown(false) }}
                className="absolute right-5 w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dropdown Suggestions */}
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-2xl shadow-slate-900/10 dark:shadow-slate-900/50 z-50 overflow-hidden"
              >
                {suggestionLoading ? (
                  <div className="py-2">
                    {[...Array(4)].map((_, i) => <SuggestionSkeleton key={i} />)}
                  </div>
                ) : suggestions.length > 0 || aiSuggestions.length > 0 ? (
                  <>
                    {aiSuggestions.length > 0 && (
                      <div className="border-b border-slate-100 dark:border-slate-800 py-2 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/10 dark:to-teal-900/10">
                        {aiSuggestions.map((s, i) => (
                          <div
                            key={`ai-${i}`}
                            onClick={() => { setQuery(s); setShowDropdown(false); router.push(`/allmedicine?search=${encodeURIComponent(s)}`) }}
                            className="px-4 py-2 hover:bg-emerald-100/50 dark:hover:bg-emerald-500/20 cursor-pointer flex items-center gap-3 transition-colors"
                          >
                            <Sparkles className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Search for <span className="font-bold">"{s}"</span></span>
                          </div>
                        ))}
                      </div>
                    )}
                    {suggestions.length > 0 && (
                      <>
                        <div className="px-4 pt-3 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            Medicine Results
                          </span>
                        </div>
                        <ul className="py-1">
                          {suggestions.map((med, idx) => (
                            <li key={med.id}>
                              <Link
                                href={`/allmedicine/${med.id}`}
                                onClick={() => setShowDropdown(false)}
                                className={`flex items-center gap-3 px-4 py-3 transition-colors ${selectedIndex === idx
                                    ? "bg-emerald-50 dark:bg-emerald-500/10"
                                    : "hover:bg-slate-50 dark:hover:bg-slate-800/60"
                                  }`}
                              >
                                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                  {med.image ? (
                                    <img src={med.image} alt={med.medicineName} className="w-full h-full object-cover" />
                                  ) : (
                                    <Pill className="w-4 h-4 text-slate-400" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0 text-left">
                                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{med.medicineName}</p>
                                  <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{med.manufacturer}</p>
                                </div>
                                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                                  ৳{med.price}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    <div className="border-t border-slate-100 dark:border-slate-800">
                      <Link
                        href={`/allmedicine?search=${encodeURIComponent(query)}`}
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
                      >
                        <Search className="w-3.5 h-3.5" />
                        See all results for &quot;{query}&quot;
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center py-8 text-center px-4">
                    <Search className="w-8 h-8 text-slate-300 dark:text-slate-700 mb-2" />
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400">No medicines found</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Try searching with a different term</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trending Tags */}
          <div className="flex items-center gap-2 mt-4 flex-wrap justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Trending:</span>
            {["Paracetamol", "Vitamin C", "Amoxicillin", "Omeprazole", "Ibuprofen"].map((tag) => (
              <button
                key={tag}
                onClick={() => { setQuery(tag); inputRef.current?.focus() }}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500/30"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Recommended Section ── */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Personalised For You
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
              Recommended{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-400">
                Medicines
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
              Curated picks based on popular choices in your region.
            </p>
          </div>
          <Link
            href="/allmedicine"
            className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recommendLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {recommended.map((med) => (
              <MedicineCard key={med.id} medicine={med} />
            ))}
          </motion.div>
        )}

        <div className="flex justify-center mt-8 md:hidden">
          <Link
            href="/allmedicine"
            className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 px-6 py-2.5 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
          >
            View All Medicines <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Quick Category Links ── */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Browse by Category
          </h3>
        </div>
        <div className="flex gap-3 flex-wrap">
          {["Antibiotics", "Pain Relief", "Vitamins", "Antacids", "Diabetes", "Heart Care", "Skin Care", "Eye Care"].map((cat, i) => {
            const colors = [
              "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30",
              "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30",
              "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30",
              "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-500/30",
              "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30",
              "bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-500/30",
              "bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-500/30",
              "bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-500/30",
            ]
            return (
              <Link
                key={cat}
                href={`/allmedicine?category=${encodeURIComponent(cat)}`}
                className={`text-sm font-bold px-4 py-2 rounded-full border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${colors[i % colors.length]}`}
              >
                {cat}
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
