"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  HeartPulse,
  CheckCircle2,
  ChevronDown,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import HomeFooters from "@/components/HomeFooters";

// ── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,  // ← add "as const"
    },
  },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// ── Data ─────────────────────────────────────────────────────────────────────
const CONTACT_CARDS = [
  {
    icon: MapPin,
    label: "Our Location",
    value: "Level-4, 34 Awal Centre",
    sub: "Banani, Dhaka-1213, Bangladesh",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    href: "https://maps.google.com",
  },
  {
    icon: Phone,
    label: "Phone & WhatsApp",
    value: "+880 1775532881",
    sub: "Mon–Sat, 9 AM – 9 PM",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    href: "tel:+8801234567890",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "rejwanul45@gmail.com",
    sub: "Reply within 24 hours",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    href: "mailto:rejwanul45@gmail.com",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "24/7 Support",
    sub: "Online chat always available",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    href: null,
  },
];

const FAQS = [
  {
    q: "How do I track my order?",
    a: "Once your order is dispatched, you'll receive an SMS with a tracking link. You can also log in to your account and visit the Orders section to see real-time status.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a 7-day hassle-free return policy. If you receive a damaged or incorrect product, contact our support team and we'll arrange a full refund or replacement immediately.",
  },
  {
    q: "Do you deliver nationwide?",
    a: "Yes! We deliver to all 64 districts of Bangladesh. Same-day delivery is available in Dhaka, and standard delivery takes 1–3 business days elsewhere.",
  },
  {
    q: "Are all medicines genuine?",
    a: "Absolutely. Every product on MediNest is sourced directly from licensed distributors and verified by our pharmacist team before listing. We have a zero-tolerance policy on counterfeit medicines.",
  },
  {
    q: "Can I get a prescription medicine without a prescription?",
    a: "No. Prescription medicines require a valid doctor's prescription uploaded during checkout. Our pharmacists review every prescription order before dispatch.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept bKash, Nagad, Rocket, all major credit/debit cards, and Cash on Delivery (COD). All online payments are fully encrypted.",
  },
];

const SUBJECTS = [
  "Order Issue",
  "Return / Refund",
  "Product Inquiry",
  "Delivery Problem",
  "Prescription Upload",
  "Other",
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", phone: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500)); // simulate send
    setLoading(false);
    setSent(true);
  }

  return (
    <main className="bg-slate-50 dark:bg-slate-950 min-h-screen">

      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-28 md:py-36">
        <div className="absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full bg-emerald-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold">
              <MessageCircle className="w-4 h-4" /> Get In Touch
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] mb-6">
              We&apos;d Love to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Hear From You
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
              Whether you have a question about an order, need prescription help, or just want to say hi — our team is ready to assist you 24/7.
            </motion.p>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" className="fill-slate-50 dark:fill-slate-950" />
          </svg>
        </div>
      </section>

      {/* ─── CONTACT CARDS ─────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {CONTACT_CARDS.map(({ icon: Icon, label, value, sub, color, bg, href }) => {
            const Wrapper = href ? "a" : "div";
            return (
              <motion.div key={label} variants={fadeUp}>
                <Wrapper
                  {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex flex-col gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  <div className={`w-12 h-12 rounded-2xl ${bg} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white leading-snug">{value}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{sub}</p>
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ─── FORM + MAP ─────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Form */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                <Send className="w-4 h-4" /> Send a Message
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">
                Drop Us a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Line</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-500 dark:text-slate-400 mb-8">
                Fill out the form and our team will get back to you within 24 hours.
              </motion.p>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center"
                >
                  <CheckCircle2 className="w-14 h-14 text-emerald-500" />
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Message Sent!</h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-xs">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <Button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", phone: "", message: "" }); }}
                    className="mt-2 rounded-full px-8 bg-emerald-600 hover:bg-emerald-700 text-white border-0">
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <motion.form variants={fadeUp} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name <span className="text-rose-500">*</span></label>
                      <Input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name"
                        className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-emerald-500 text-slate-900 dark:text-white placeholder:text-slate-400" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address <span className="text-rose-500">*</span></label>
                      <Input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com"
                        className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-emerald-500 text-slate-900 dark:text-white placeholder:text-slate-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
                      <Input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+880 1XXX XXXXXX"
                        className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-emerald-500 text-slate-900 dark:text-white placeholder:text-slate-400" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subject <span className="text-rose-500">*</span></label>
                      <select name="subject" value={form.subject} onChange={handleChange} required
                        className="w-full h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-900 dark:text-white px-3 text-sm">
                        <option value="" disabled>Select a subject</option>
                        {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Message <span className="text-rose-500">*</span></label>
                    <Textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us how we can help you..."
                      className="rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-emerald-500 text-slate-900 dark:text-white placeholder:text-slate-400 resize-none" />
                  </div>

                  <Button type="submit" disabled={loading} size="lg"
                    className="w-full h-13 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-xl shadow-emerald-500/20 border-0 transition-all duration-300 hover:scale-[1.02]">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Send Message</span>
                    )}
                  </Button>
                </motion.form>
              )}
            </motion.div>

            {/* Right panel — info + social */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7 }} className="space-y-6"
            >
              {/* Dark info card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-10 border border-slate-700 shadow-2xl">
                <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <HeartPulse className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-white font-black text-lg">MediNest Support</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-8">
                    Our dedicated support team is available around the clock. Whether it&apos;s a prescription query or a delivery update — we&apos;ve got you covered.
                  </p>
                  <div className="space-y-4">
                    {[
                      { icon: Phone, text: "+880 1234 567890", color: "text-blue-400" },
                      { icon: Mail, text: "support@medinest.com", color: "text-violet-400" },
                      { icon: MapPin, text: "Level-4, 34 Awal Centre, Banani, Dhaka", color: "text-emerald-400" },
                    ].map(({ icon: Icon, text, color }) => (
                      <div key={text} className="flex items-start gap-3">
                        <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${color}`} />
                        <span className="text-sm text-slate-300">{text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Social links */}
                  <div className="mt-8 pt-8 border-t border-slate-700">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-4">Follow Us</p>
                    <div className="flex gap-3">
                      {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                        <motion.a key={i} href="#" whileHover={{ y: -3 }}
                          className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors">
                          <Icon className="w-4 h-4" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Response time badges */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Avg Response", value: "< 2 hrs", color: "text-emerald-500" },
                  { label: "Satisfaction", value: "99%", color: "text-blue-400" },
                  { label: "Support", value: "24/7", color: "text-amber-400" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                    <span className={`text-2xl font-black ${color}`}>{value}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{label}</span>
                  </div>
                ))}
              </div>

              {/* Map embed placeholder */}
              <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg">
                <iframe
                  title="MediNest Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.696637!2d90.403938!3d23.793696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f4f3b7b5%3A0x1a2b3c4d5e6f7a8b!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-bold tracking-widest uppercase">
              FAQ
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Questions</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 dark:text-slate-400 text-lg">
              Can&apos;t find the answer? Reach out via the form above.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <motion.div key={i} variants={fadeUp}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{q}</span>
                  <ChevronDown className={`w-4 h-4 text-emerald-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                    {a}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-600 to-teal-600 p-12 text-center shadow-2xl shadow-emerald-500/25"
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5" />
            <div className="relative z-10">
              <MessageCircle className="w-12 h-12 text-white/80 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Still have questions?</h2>
              <p className="text-emerald-100 text-lg mb-8 max-w-lg mx-auto">
                Chat with our support team live — no waiting, no queues. We&apos;re here to help right now.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-full px-10 font-bold bg-white text-emerald-700 hover:bg-emerald-50 border-0 shadow-lg"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Send className="w-4 h-4 mr-2" /> Send a Message
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-10 font-bold border-white/40 text-white hover:bg-white/10 bg-transparent">
                  <a href="tel:+8801234567890"><Phone className="w-4 h-4 mr-2" /> Call Us Now</a>
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
