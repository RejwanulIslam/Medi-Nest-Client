"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ChevronRight, ShoppingBag, Activity } from "lucide-react";
import Link from "next/link";

interface Hero7Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
}

const IMAGES = [
  "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=800&q=80"
];

const Hero7 = ({
  heading = "Your Trusted Online Pharmacy for OTC Medicines",
  description = "Get reliable, high-quality over-the-counter medicines delivered directly to your door. Fast, safe, and convenient healthcare at your fingertips.",
  button = {
    text: "Shop Now",
    url: "/allmedicine",
  },
}: Hero7Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 py-12 md:py-24 lg:py-32 flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-6xl mx-auto">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1"
          >
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-emerald-600 dark:text-emerald-400 font-medium tracking-wide text-sm md:text-base">
              <Activity className="w-5 h-5" />
              <span>Certified Healthcare Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {heading.split(" ").map((word, i) => (
                <span key={i}>
                  {word.toLowerCase() === "pharmacy" || word.toLowerCase() === "medicines" ? (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                      {word}{" "}
                    </span>
                  ) : (
                    word + " "
                  )}
                </span>
              ))}
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-[600px] mx-auto lg:mx-0">
              {description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="rounded-full px-8 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition-all hover:scale-105 hover:-translate-y-1">
                <Link href={button.url}>
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  {button.text}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-all">
                <Link href="/about">
                  Learn More
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Image Slider */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square max-w-[500px] mx-auto order-1 lg:order-2"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/10 border border-white/20 dark:border-white/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={IMAGES[currentImageIndex]}
                  alt={`Pharmacy Image ${currentImageIndex + 1}`}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {/* Slider Indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                {IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === currentImageIndex 
                        ? "bg-white scale-125 shadow-sm" 
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Decorative Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 z-30"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">100% Secure</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Verified Products</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>

      {/* Visual Flow Indicator to Next Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <span className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-2 hidden md:block">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-8 h-12 rounded-full border-2 border-slate-300 dark:border-slate-700 flex justify-center p-1 cursor-pointer hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors"
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' })}
        >
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1.5 h-3 bg-emerald-500 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero7;
