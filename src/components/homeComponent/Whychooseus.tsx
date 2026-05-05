"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Zap, Layers, Lock, Stethoscope, RefreshCcw } from "lucide-react"

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
    title: "100% Genuine Medicines",
    desc: "All medicines are sourced directly from licensed distributors. Zero compromise on quality.",
    className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-900/10",
    accent: "bg-emerald-500",
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-500" />,
    title: "Fast Delivery",
    desc: "Delivered to your doorstep within 24 hours.",
    className: "md:col-span-1 md:row-span-1 bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-900/10",
    accent: "bg-amber-500",
  },
  {
    icon: <Layers className="w-6 h-6 text-blue-500" />,
    title: "5,000+ Collection",
    desc: "Prescription, generic, and OTC in one place.",
    className: "md:col-span-1 md:row-span-1 bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-900/10",
    accent: "bg-blue-500",
  },
  {
    icon: <Lock className="w-6 h-6 text-violet-500" />,
    title: "Secure Payments",
    desc: "bKash, Nagad, Card, or COD. Fully encrypted.",
    className: "md:col-span-1 md:row-span-1 bg-gradient-to-br from-violet-50 to-purple-50/50 dark:from-violet-950/20 dark:to-purple-900/10",
    accent: "bg-violet-500",
  },
  {
    icon: <Stethoscope className="w-6 h-6 text-rose-500" />,
    title: "Expert Consultation",
    desc: "Our licensed pharmacist team is available 24/7 to answer your health questions anytime.",
    className: "md:col-span-2 md:row-span-1 bg-gradient-to-br from-rose-50 to-pink-50/50 dark:from-rose-950/20 dark:to-pink-900/10",
    accent: "bg-rose-500",
  },
  {
    icon: <RefreshCcw className="w-6 h-6 text-cyan-500" />,
    title: "Easy Returns",
    desc: "7-day return policy. Full refund guaranteed.",
    className: "md:col-span-1 md:row-span-1 bg-gradient-to-br from-cyan-50 to-sky-50/50 dark:from-cyan-950/20 dark:to-sky-900/10",
    accent: "bg-cyan-500",
  },
]

const stats = [
  { value: "50k+", label: "Happy Customers" },
  { value: "5k+", label: "Medicine Types" },
  { value: "24/7", label: "Support Available" },
  { value: "98%", label: "Delivery Success" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
}

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 overflow-hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/5 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-slate-600 dark:text-slate-300">
              Our Advantages
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6"
          >
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Choose Us?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400"
          >
            We don't just sell medicines — we are committed to ensuring your health and well-being every step of the way with our premium services.
          </motion.p>
        </div>

        {/* Bento Box Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={itemVariants as any}
              whileHover={{ scale: 1.02 }}
              className={`group relative overflow-hidden rounded-3xl border border-slate-200/50 dark:border-slate-700/50 p-8 ${f.className} shadow-sm hover:shadow-xl transition-all duration-300`}
            >
              {/* Decorative background circle */}
              <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full ${f.accent} opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-150 transition-all duration-500`} />

              <div className="flex flex-col h-full relative z-10">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                    {f.icon}
                  </div>
                </div>
                <h3 className={`font-bold text-slate-900 dark:text-white mb-3 ${f.className.includes('col-span-2') ? 'text-2xl' : 'text-xl'}`}>
                  {f.title}
                </h3>
                <p className={`text-slate-600 dark:text-slate-400 leading-relaxed mt-auto ${f.className.includes('col-span-2') ? 'text-lg' : 'text-base'}`}>
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats strip - Premium Redesign */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] bg-slate-900 dark:bg-slate-800 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 mix-blend-overlay" />
          <div className="relative grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-800 dark:divide-slate-700">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-10 md:p-12 group">
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                  className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 group-hover:text-emerald-400 transition-colors"
                >
                  {s.value}
                </motion.span>
                <span className="text-slate-400 text-sm md:text-base font-medium tracking-wide uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}