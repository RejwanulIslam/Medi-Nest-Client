"use client";

import { motion, type Variants, type Transition } from "framer-motion";
import {
  ShieldCheck, Truck, HeartPulse, Star, Users, Pill,
  Clock, Award, Target, Eye, Zap, ArrowRight,
  MapPin, Phone, Mail, CheckCircle2, TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HomeFooters from "@/components/HomeFooters";

// ── Variants ─────────────────────────────────────────────────────────────────

const transition: Transition = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

// ── Data ──────────────────────────────────────────────────────────────────────

const STATS = [
  { icon: Users, value: "50K+", label: "Happy Customers" },
  { icon: Pill, value: "5K+", label: "Medicine Types" },
  { icon: TrendingUp, value: "98%", label: "Delivery Success" },
  { icon: Clock, value: "24/7", label: "Support" },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "100% Genuine",
    desc: "Every product is sourced directly from licensed distributors. We never compromise on authenticity.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: HeartPulse,
    title: "Patient First",
    desc: "Your health is our top priority. Every decision we make centers around improving patient outcomes.",
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
  },
  {
    icon: Zap,
    title: "Speed & Reliability",
    desc: "Same-day dispatch and real-time tracking so your medicines arrive when you need them most.",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "We hold ourselves to the highest standards in pharmacy practice, customer service, and technology.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Eye,
    title: "Transparency",
    desc: "Clear pricing, honest information, and open communication. No hidden fees, ever.",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: Target,
    title: "Accessibility",
    desc: "Making quality healthcare affordable and reachable for everyone, everywhere in Bangladesh.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
];

const TEAM = [
  {
    name: "Dr. Arif Rahman",
    role: "Chief Pharmacist & Co-Founder",
    bio: "15+ years in clinical pharmacy. Passionate about making medicines accessible to all.",
    initials: "AR",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    name: "Nadia Islam",
    role: "Head of Operations",
    bio: "Supply chain expert ensuring every order reaches customers on time, every time.",
    initials: "NI",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Tanvir Hossain",
    role: "Lead Engineer",
    bio: "Builds the technology that powers MediNest's seamless shopping experience.",
    initials: "TH",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    name: "Sadia Akter",
    role: "Customer Success Lead",
    bio: "Dedicated to resolving every query with empathy, speed, and a smile.",
    initials: "SA",
    gradient: "from-rose-500 to-pink-500",
  },
];

const TIMELINE = [
  { year: "2021", title: "Founded", desc: "MediNest launched with 500 medicines and a dream to transform pharmacy in Bangladesh." },
  { year: "2022", title: "10K Customers", desc: "Crossed 10,000 active customers and expanded to 8 districts across the country." },
  { year: "2023", title: "5K+ Products", desc: "Our catalogue grew to 5,000+ medicines. Introduced same-day delivery in Dhaka." },
  { year: "2024", title: "AI-Powered", desc: "Launched AI-driven search, personalized recommendations, and a 24/7 health chatbot." },
  { year: "2025", title: "50K+ Served", desc: "50,000+ happy customers, 98% delivery success rate, and expanding nationwide." },
];

const WHY_US = [
  "Licensed & certified online pharmacy",
  "Cold-chain storage for temperature-sensitive medicines",
  "Pharmacist-verified orders before dispatch",
  "Secure payments — bKash, Nagad, Card, COD",
  "Easy 7-day return & full refund policy",
  "Real-time order tracking via SMS & app",
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main className="bg-slate-50 dark:bg-slate-950 min-h-screen">

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-28 md:py-36">
        <div className="absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full bg-emerald-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold"
            >
              <HeartPulse className="w-4 h-4 animate-pulse" /> Our Story
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] mb-6"
            >
              Redefining Healthcare,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                One Delivery at a Time
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10"
            >
              MediNest was born from a simple belief — that quality medicines should be just a few clicks away, not a privilege. We're building Bangladesh's most trusted online pharmacy, powered by technology and driven by compassion.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild size="lg"
                className="rounded-full px-8 font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-xl shadow-emerald-500/25 border-0"
              >
                <Link href="/allmedicine">
                  Shop Medicines <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild variant="outline" size="lg"
                className="rounded-full px-8 font-semibold border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
              >
                <Link href="#team">Meet the Team</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" className="fill-slate-50 dark:fill-slate-950" />
          </svg>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 -mt-2 pb-20">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {STATS.map(({ icon: Icon, value, label }) => (
            <motion.div
              key={label} variants={fadeUp}
              className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="text-3xl font-black text-slate-900 dark:text-white">{value}</span>
              <span className="text-sm text-slate-500 dark:text-slate-400 text-center font-medium">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── MISSION & VISION ─────────────────────────────────────────── */}
      <section className="bg-white dark:bg-slate-900 py-24 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-sm font-semibold"
              >
                <Target className="w-4 h-4" /> Our Mission
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6"
              >
                Making Healthcare{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                  Accessible
                </span>{" "}
                for Everyone
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                We believe no one should have to choose between their health and their budget. MediNest delivers genuine, affordable medicines to your doorstep with the speed and reliability you deserve.
              </motion.p>
              <motion.ul variants={stagger} className="space-y-3">
                {WHY_US.map((item) => (
                  <motion.li key={item} variants={fadeUp} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-10 border border-slate-700 shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">Our Vision</h3>
                  <p className="text-slate-300 leading-relaxed text-lg mb-8">
                    To become South Asia's most trusted digital pharmacy — where every household has instant access to genuine medicines, professional health advice, and a seamless care experience.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Founded", value: "2021" },
                      { label: "Headquarters", value: "Dhaka, BD" },
                      { label: "Districts Covered", value: "64+" },
                      { label: "Partner Brands", value: "200+" },
                    ].map(({ label, value }) => (
                      <div key={label} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-xl font-black text-white">{value}</p>
                        <p className="text-sm text-slate-400">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-bold tracking-widest uppercase"
            >
              Core Values
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              What We{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                Stand For
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Our values shape everything — from how we source medicines to how we treat every customer.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {VALUES.map(({ icon: Icon, title, desc, color, bg }) => (
              <motion.div
                key={title} variants={fadeUp}
                className={`group p-7 rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── TIMELINE ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-sm font-bold tracking-widest uppercase"
            >
              Our Journey
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
              Built With{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                Purpose
              </span>
            </motion.h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-teal-500 to-transparent" />
            <div className="space-y-12">
              {TIMELINE.map(({ year, title, desc }, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900 shadow-md z-10" />

                  <div className={`hidden md:flex w-[calc(50%-2rem)] ${i % 2 === 0 ? "justify-end pr-8" : "justify-start pl-8"}`}>
                    <span className="px-5 py-2 rounded-full bg-emerald-500 text-white text-sm font-black shadow-lg shadow-emerald-500/25">
                      {year}
                    </span>
                  </div>

                  <div className={`ml-16 md:ml-0 w-full md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pl-8" : "md:pr-8"}`}>
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                      <span className="md:hidden inline-block px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold mb-3">
                        {year}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TEAM ─────────────────────────────────────────────────────── */}
      <section id="team" className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-bold tracking-widest uppercase"
            >
              <Users className="w-4 h-4" /> The Team
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              People Behind{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                MediNest
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              A passionate team of pharmacists, engineers, and healthcare advocates working to transform your experience.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {TEAM.map(({ name, role, bio, initials, gradient }) => (
              <motion.div
                key={name} variants={fadeUp}
                className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-2xl font-black mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {initials}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{name}</h3>
                <p className="text-sm font-semibold text-emerald-500 mb-3">{role}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CONTACT STRIP ────────────────────────────────────────────── */}
      <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: MapPin, label: "Our Address", value: "Level-4, 34 Awal Centre, Banani, Dhaka", color: "text-emerald-500" },
              { icon: Phone, label: "Phone", value: "+880 1234 567890", color: "text-blue-500" },
              { icon: Mail, label: "Email", value: "support@medinest.com", color: "text-violet-500" },
            ].map(({ icon: Icon, label, value, color }) => (
              <motion.div
                key={label} variants={fadeUp}
                className="flex items-center gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0">
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-600 to-teal-600 p-12 text-center shadow-2xl shadow-emerald-500/25"
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5" />

            <div className="relative z-10">
              <HeartPulse className="w-12 h-12 text-white/80 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Ready to Experience Better Healthcare?
              </h2>
              <p className="text-emerald-100 text-lg mb-10 max-w-xl mx-auto">
                Join 50,000+ customers who trust MediNest for genuine medicines, fast delivery, and expert care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild size="lg"
                  className="rounded-full px-10 font-bold bg-white text-emerald-700 hover:bg-emerald-50 border-0 shadow-lg"
                >
                  <Link href="/allmedicine">
                    Shop Medicines <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild variant="outline" size="lg"
                  className="rounded-full px-10 font-bold border-white/40 text-white hover:bg-white/10 bg-transparent backdrop-blur-sm"
                >
                  <Link href="/signup">Create Free Account</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <HomeFooters />
    </main>
  );
}