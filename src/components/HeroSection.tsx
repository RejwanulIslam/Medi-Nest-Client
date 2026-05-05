"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ChevronRight,
  Shield,
  Truck,
  Clock,
  Star,
  HeartPulse,
  Pill,
  Stethoscope,
  FlaskConical,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const IMAGES = [
  "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=900&q=80",
];

const STATS = [
  { icon: ShoppingBag, value: "50K+", label: "Orders Delivered" },
  { icon: Pill, value: "5K+", label: "Medicines" },
  { icon: Star, value: "4.9★", label: "Avg. Rating" },
  { icon: HeartPulse, value: "99%", label: "Satisfaction" },
];

const FLOATING_BADGES = [
  {
    icon: Shield,
    title: "100% Certified",
    sub: "All products verified",
    color: "from-emerald-500 to-teal-500",
    delay: 0,
    position: "bottom-6 left-6",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    sub: "Same-day dispatch",
    color: "from-blue-500 to-cyan-500",
    delay: 1.5,
    position: "top-6 right-6",
  },
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % IMAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as const,  // ← add "as const"
      },
    },
  };

  return (
    <section className="relative w-full min-h-[92vh] flex flex-col justify-center overflow-hidden">
      {/* ── Animated Background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-0" />

      {/* Glowing orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-24 w-[600px] h-[600px] rounded-full bg-emerald-500/20 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 -right-24 w-[700px] h-[700px] rounded-full bg-teal-500/15 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/2 w-[350px] h-[350px] rounded-full bg-cyan-500/10 blur-[80px]"
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating medicine icons (decorative) */}
      {[
        { Icon: Pill, x: "8%", y: "15%", delay: 0, size: 18 },
        { Icon: Stethoscope, x: "85%", y: "22%", delay: 1, size: 20 },
        { Icon: FlaskConical, x: "12%", y: "75%", delay: 2, size: 16 },
        { Icon: HeartPulse, x: "80%", y: "70%", delay: 0.5, size: 18 },
        { Icon: Shield, x: "50%", y: "8%", delay: 1.5, size: 15 },
      ].map(({ Icon, x, y, delay, size }, i) => (
        <motion.div
          key={i}
          className="absolute z-[1] text-emerald-400/20"
          style={{ left: x, top: y }}
          animate={{ y: [0, -12, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <Icon size={size} />
        </motion.div>
      ))}

      {/* ── Main Content ── */}
      <div className="relative z-10 container px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-10 items-center max-w-7xl mx-auto">

          {/* ── Left: Text ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="flex flex-col gap-7 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold tracking-wide">
                <HeartPulse className="w-4 h-4 animate-pulse" />
                Certified Healthcare Platform
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.08]">
                Your Trusted{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    Online
                  </span>
                  {/* Underline glow */}
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-60" />
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                  Pharmacy
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-[540px] mx-auto lg:mx-0"
            >
              Get reliable, high-quality over-the-counter medicines delivered
              directly to your door.{" "}
              <span className="text-emerald-400 font-medium">
                Fast, safe, and convenient
              </span>{" "}
              healthcare at your fingertips.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden rounded-full px-8 py-6 text-base font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-2xl shadow-emerald-500/30 border-0 transition-all duration-300 hover:scale-105 hover:shadow-emerald-400/40"
              >
                <Link href="/allmedicine" className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Shop Medicines
                  <span className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                    →
                  </span>
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="group rounded-full px-8 py-6 text-base font-semibold border border-white/15 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105"
              >
                <Link href="/about" className="flex items-center gap-2">
                  Learn More
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 max-w-[540px] mx-auto lg:mx-0"
            >
              {STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center lg:items-start gap-1 p-3 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-sm hover:bg-white/10 transition-colors duration-200"
                >
                  <Icon className="w-4 h-4 text-emerald-400 mb-0.5" />
                  <span className="text-lg font-black text-white leading-none">{value}</span>
                  <span className="text-xs text-slate-400 leading-tight">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Image Slider ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[560px] mx-auto order-1 lg:order-2"
          >
            {/* Main image frame */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(16,185,129,0.18)] border border-white/10">
              {/* Gradient overlay on image */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={IMAGES[currentImage]}
                  alt={`Healthcare image ${currentImage + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.85, ease: "easeInOut" }}
                />
              </AnimatePresence>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                {IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`transition-all duration-400 rounded-full ${i === currentImage
                        ? "w-7 h-2.5 bg-emerald-400"
                        : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
                      }`}
                  />
                ))}
              </div>

              {/* Progress bar */}
              <motion.div
                key={currentImage}
                className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-emerald-400 to-teal-400 z-20"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4.5, ease: "linear" }}
              />
            </div>

            {/* Floating Badges */}
            {FLOATING_BADGES.map(({ icon: Icon, title, sub, color, delay, position }) => (
              <motion.div
                key={title}
                className={`absolute ${position} z-30`}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay }}
              >
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/90 backdrop-blur-lg border border-white/10 shadow-2xl">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white leading-none">{title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Decorative ring */}
            <div className="absolute -inset-4 rounded-[2rem] border border-emerald-500/10 pointer-events-none" />
            <div className="absolute -inset-8 rounded-[2.5rem] border border-emerald-500/5 pointer-events-none" />

            {/* Delivery badge */}
            <motion.div
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Clock className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white whitespace-nowrap">
                Same-Day Delivery Available
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom Wave ── */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            className="fill-slate-50 dark:fill-slate-950"
          />
        </svg>
      </div>
    </section>
  );
}
