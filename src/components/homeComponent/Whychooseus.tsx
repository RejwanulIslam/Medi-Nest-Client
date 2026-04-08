"use client"

const features = [
  {
    icon: "🛡️",
    title: "100% Genuine Medicines",
    desc: "All medicines are sourced directly from licensed distributors. Zero compromise on quality, ever.",
    accent: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-100 dark:border-emerald-800/40",
    shadow: "hover:shadow-emerald-100 dark:hover:shadow-emerald-900/30",
  },
  {
    icon: "⚡",
    title: "Fast Delivery",
    desc: "Medicines delivered to your doorstep within 24 hours. Same-day delivery available for urgent orders.",
    accent: "from-amber-400 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-100 dark:border-amber-800/40",
    shadow: "hover:shadow-amber-100 dark:hover:shadow-amber-900/30",
  },
  {
    icon: "💊",
    title: "Huge Medicine Collection",
    desc: "Over 5,000+ types of medicines on one platform — prescription, generic, and OTC all in one place.",
    accent: "from-blue-400 to-indigo-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-100 dark:border-blue-800/40",
    shadow: "hover:shadow-blue-100 dark:hover:shadow-blue-900/30",
  },
  {
    icon: "🔒",
    title: "Secure Payments",
    desc: "Pay via bKash, Nagad, card, or cash on delivery — every transaction is fully encrypted.",
    accent: "from-violet-400 to-purple-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-100 dark:border-violet-800/40",
    shadow: "hover:shadow-violet-100 dark:hover:shadow-violet-900/30",
  },
  {
    icon: "👨‍⚕️",
    title: "Expert Consultation",
    desc: "Our licensed pharmacist team is available 24/7 to answer your health questions anytime.",
    accent: "from-rose-400 to-pink-500",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    border: "border-rose-100 dark:border-rose-800/40",
    shadow: "hover:shadow-rose-100 dark:hover:shadow-rose-900/30",
  },
  {
    icon: "♻️",
    title: "Easy Return Policy",
    desc: "Return within 7 days for any issue — full refund guaranteed, no questions asked.",
    accent: "from-cyan-400 to-sky-500",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    border: "border-cyan-100 dark:border-cyan-800/40",
    shadow: "hover:shadow-cyan-100 dark:hover:shadow-cyan-900/30",
  },
]

const stats = [
  { value: "50,000+", label: "Happy Customers" },
  { value: "5,000+", label: "Medicine Types" },
  { value: "24/7", label: "Support Available" },
  { value: "98%", label: "Delivery Success" },
]

export default function WhyChooseUs() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50 mb-4">
            Our Advantages
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight">
            Why{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-emerald-600 dark:text-emerald-400">Choose Us?</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-emerald-100 dark:bg-emerald-900/50 -z-0 rounded" />
            </span>
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            We don't just sell medicines — we are committed to ensuring your health and well-being every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl border p-6 ${f.bg} ${f.border} hover:shadow-xl ${f.shadow} transition-all duration-300 hover:-translate-y-1 cursor-default`}
            >
              <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-3xl rounded-tr-2xl bg-gradient-to-br ${f.accent} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${f.accent} shadow-md flex-shrink-0`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">{f.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-700 dark:to-teal-600 p-8 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{s.value}</span>
                <span className="text-emerald-100 text-xs mt-1 font-medium tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}