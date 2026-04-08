"use client"

const steps = [
  {
    step: "01",
    icon: "🔍",
    title: "Search Medicine",
    desc: "Find your required medicine by name, category, or prescription quickly and easily.",
    accent: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-100 dark:border-blue-800/40",
    connector: "bg-gradient-to-b from-blue-300 to-emerald-300 dark:from-blue-700 dark:to-emerald-700",
  },
  {
    step: "02",
    icon: "🛒",
    title: "Add to Cart",
    desc: "Add your chosen medicines to the cart, set quantities, and check for available discounts.",
    accent: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-100 dark:border-emerald-800/40",
    connector: "bg-gradient-to-b from-emerald-300 to-amber-300 dark:from-emerald-700 dark:to-amber-700",
  },
  {
    step: "03",
    icon: "💳",
    title: "Make Payment",
    desc: "Pay securely via bKash, Nagad, card, or cash on delivery — your choice, fully encrypted.",
    accent: "from-amber-500 to-orange-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-100 dark:border-amber-800/40",
    connector: "bg-gradient-to-b from-amber-300 to-rose-300 dark:from-amber-700 dark:to-rose-700",
  },
  {
    step: "04",
    icon: "🚚",
    title: "Get Delivered",
    desc: "Your order is packed and dispatched fast. Track it in real-time with your tracking link.",
    accent: "from-rose-500 to-pink-600",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    border: "border-rose-100 dark:border-rose-800/40",
    connector: null,
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
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900/50 pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-rose-100 dark:bg-rose-900/10 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-100 dark:bg-blue-900/10 rounded-full blur-3xl opacity-30" />

      <div className="relative max-w-6xl mx-auto px-4">

        {/* ── HOW IT WORKS ── */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50 mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight">
            Order in Just{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-blue-600 dark:text-blue-400">4 Easy Steps</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-100 dark:bg-blue-900/50 -z-0 rounded" />
            </span>
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
            Order your medicines from home in just a few minutes — fast, simple, and hassle-free.
          </p>
        </div>

        {/* Desktop: horizontal steps */}
        <div className="hidden md:flex items-start justify-between gap-4 mb-20 relative">
          <div className="absolute top-9 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-300 via-emerald-300 via-amber-300 to-rose-300 dark:from-blue-700 dark:via-emerald-700 dark:via-amber-700 dark:to-rose-700" />

          {steps.map((s, i) => (
            <div key={i} className="relative flex flex-col items-center text-center flex-1 group">
              <div className={`relative z-10 w-[72px] h-[72px] rounded-2xl bg-gradient-to-br ${s.accent} flex items-center justify-center text-3xl shadow-xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {s.icon}
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 text-[10px] font-black text-slate-500 dark:text-slate-400 flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <div className={`rounded-2xl border p-5 ${s.bg} ${s.border} w-full hover:shadow-lg transition-shadow duration-300`}>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-2">{s.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="flex md:hidden flex-col gap-0 mb-16">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.accent} flex items-center justify-center text-xl shadow-lg flex-shrink-0`}>
                  {s.icon}
                </div>
                {s.connector && (
                  <div className={`w-0.5 flex-1 min-h-8 mt-1 ${s.connector}`} />
                )}
              </div>
              <div className={`rounded-2xl border p-4 mb-4 flex-1 ${s.bg} ${s.border}`}>
                <span className="text-xs font-black text-slate-400 dark:text-slate-500 tracking-widest">{s.step}</span>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-1">{s.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── TESTIMONIALS ── */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-700/50 mb-4">
            Customer Reviews
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
            What Our Customers Say ❤️
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-4 right-5 text-5xl text-slate-100 dark:text-slate-700 font-serif leading-none select-none">"</div>

              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-amber-400 text-sm">★</span>
                ))}
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5 relative z-10">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3 border-t border-slate-100 dark:border-slate-700/50 pt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-xs shadow">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{t.name}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">📍 {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}