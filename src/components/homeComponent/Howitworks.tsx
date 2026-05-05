"use client"

import { motion } from "framer-motion"
import { Search, ShoppingCart, CreditCard, Truck, Quote } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: <Search className="w-8 h-8 text-blue-500" />,
    title: "Search Medicine",
    desc: "Find your required medicine by name, category, or prescription quickly and easily.",
    accent: "bg-blue-500",
    gradient: "from-blue-500/20 to-blue-500/0",
  },
  {
    step: "02",
    icon: <ShoppingCart className="w-8 h-8 text-emerald-500" />,
    title: "Add to Cart",
    desc: "Add your chosen medicines to the cart, set quantities, and check for available discounts.",
    accent: "bg-emerald-500",
    gradient: "from-emerald-500/20 to-emerald-500/0",
  },
  {
    step: "03",
    icon: <CreditCard className="w-8 h-8 text-amber-500" />,
    title: "Make Payment",
    desc: "Pay securely via bKash, Nagad, card, or cash on delivery — your choice, fully encrypted.",
    accent: "bg-amber-500",
    gradient: "from-amber-500/20 to-amber-500/0",
  },
  {
    step: "04",
    icon: <Truck className="w-8 h-8 text-rose-500" />,
    title: "Get Delivered",
    desc: "Your order is packed and dispatched fast. Track it in real-time with your tracking link.",
    accent: "bg-rose-500",
    gradient: "from-rose-500/20 to-rose-500/0",
  },
]

const testimonials = [
  {
    name: "Rafiqul Islam",
    location: "Dhaka",
    text: "Delivery was incredibly fast. No doubts about the medicine quality at all. Will definitely order again.",
    rating: 5,
    avatar: "RI",
  },
  {
    name: "Sumaiya Khan",
    location: "Chittagong",
    text: "Ordered at 11 PM and received it the very next morning. The service is truly outstanding!",
    rating: 5,
    avatar: "SK",
  },
  {
    name: "Md. Ali Hossain",
    location: "Rajshahi",
    text: "Very affordable prices and completely genuine medicines. The pharmacist helped me resolve my issue quickly.",
    rating: 5,
    avatar: "AH",
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-24 overflow-hidden bg-slate-50 dark:bg-slate-950">
      
      {/* Background Ornaments */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      <div className="absolute top-40 right-[-10%] w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HOW IT WORKS ── */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-blue-100/50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 backdrop-blur-sm"
          >
            <span className="text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Simple Process
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6"
          >
            Order in Just <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">4 Easy Steps</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-400"
          >
            Experience seamless healthcare delivery. From prescription to your doorstep in minutes.
          </motion.p>
        </div>

        {/* Desktop: Animated Horizontal Timeline */}
        <div className="hidden md:block relative mb-32">
          {/* Base Timeline line */}
          <div className="absolute top-[3.25rem] left-[10%] right-[10%] h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            {/* Animated Progress Line */}
            <motion.div 
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-emerald-500 via-amber-500 to-rose-500"
            />
          </div>

          <div className="flex justify-between relative z-10">
            {steps.map((s, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.3 + 0.5 }}
                className="flex flex-col items-center w-64 group cursor-default"
              >
                {/* Node */}
                <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                  <div className="relative w-24 h-24 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-300">
                    {s.icon}
                    <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-xl ${s.accent} text-white flex items-center justify-center font-bold text-sm shadow-lg`}>
                      {s.step}
                    </div>
                  </div>
                </div>
                
                {/* Text content */}
                <div className="text-center">
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden flex flex-col gap-10 mb-24 relative pl-6">
          <motion.div 
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-4 bottom-4 left-[35px] w-1 bg-gradient-to-b from-blue-500 via-emerald-500 via-amber-500 to-rose-500 rounded-full"
          />
          
          {steps.map((s, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative flex gap-6 items-start"
            >
              <div className="relative z-10 w-14 h-14 shrink-0 rounded-xl bg-white dark:bg-slate-900 shadow-lg border border-slate-100 dark:border-slate-800 flex items-center justify-center">
                {s.icon}
                <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-md ${s.accent} text-white flex items-center justify-center font-bold text-[10px]`}>
                  {s.step}
                </div>
              </div>
              <div className="pt-2">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{s.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── TESTIMONIALS ── */}
        <div className="text-center mb-16 max-w-3xl mx-auto pt-10 border-t border-slate-200 dark:border-slate-800/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-rose-100/50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800/50 backdrop-blur-sm"
          >
            <span className="text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
              Customer Reviews
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white"
          >
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-400">Customers Say</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute -top-5 -right-2 text-slate-100 dark:text-slate-800/50">
                <Quote className="w-24 h-24 rotate-12" fill="currentColor" stroke="none" />
              </div>

              <div className="flex gap-1 mb-6 relative z-10">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg key={j} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-slate-700 dark:text-slate-300 text-lg font-medium leading-relaxed mb-8 relative z-10 italic">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold shadow-md">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-base font-bold text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}