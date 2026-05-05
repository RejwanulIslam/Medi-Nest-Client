"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addCategory } from "@/action/medicine.action"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { Tag, PlusCircle, Layers, Loader2 } from "lucide-react"

export interface CategoryCardProps {
  id: string
  categorieName: string
}

interface CategoryCardContainerProps {
  initialData: CategoryCardProps[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export function CategoryCardContainer({ initialData }: CategoryCardContainerProps) {
  const [newCategory, setNewCategory] = useState("")
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<CategoryCardProps[]>(initialData ?? [])

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return
    setLoading(true)
    try {
      const res = await addCategory({ categorieName: newCategory })
      if (res.categorieName) {
        toast.success("Category added successfully!")
        setCategories((prev) => [...prev, res])
        setNewCategory("")
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to add category")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAddCategory()
  }

  return (
    <div className="space-y-10">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            <Layers className="w-3.5 h-3.5" />
            Admin Panel
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-1">
            Manage <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Categories</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {categories.length} {categories.length === 1 ? "category" : "categories"} currently registered.
          </p>
        </div>
      </motion.div>

      {/* ── Add Category Input ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/60 dark:border-slate-800 shadow-sm"
      >
        <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
          <PlusCircle className="w-4 h-4 text-emerald-500" />
          Add a New Category
        </p>
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Enter category name (e.g. Antibiotics)..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-12 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus-visible:ring-emerald-500 flex-1"
          />
          <Button
            onClick={handleAddCategory}
            disabled={loading || !newCategory.trim()}
            className="h-12 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/20 disabled:opacity-50 transition-all"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Adding...</>
            ) : (
              <><PlusCircle className="w-4 h-4 mr-2" /> Add</>
            )}
          </Button>
        </div>
      </motion.div>

      {/* ── Category Grid ── */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6 flex items-center gap-2">
          <Tag className="w-4 h-4" /> All Categories
        </h2>
        <AnimatePresence mode="popLayout">
          {categories.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-4">
                <Tag className="w-10 h-10 text-slate-400 dark:text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">No Categories Yet</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Add your first category using the form above.</p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {categories.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants as any}
                  layout
                  className="group relative flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 overflow-hidden"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Category #{index + 1}</p>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {item.categorieName}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}