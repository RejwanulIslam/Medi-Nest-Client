"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Floating pill component for the decorative background
function FloatingPill({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full opacity-20 dark:opacity-10 ${className}`}
      animate={{
        y: [0, -16, 0],
        rotate: [0, 8, -8, 0],
      }}
      transition={{
        duration: 7 + delay,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

interface AuthPageLayoutProps {
  children: React.ReactNode;
}

export default function AuthPageLayout({ children }: AuthPageLayoutProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle animated gradient mesh background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      t += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Gradient blob 1
      const g1 = ctx.createRadialGradient(
        cx + Math.sin(t) * 150,
        cy + Math.cos(t * 0.7) * 100,
        0,
        cx,
        cy,
        Math.max(canvas.width, canvas.height) * 0.65
      );
      g1.addColorStop(0, "rgba(20, 184, 166, 0.15)");
      g1.addColorStop(1, "rgba(20, 184, 166, 0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gradient blob 2
      const g2 = ctx.createRadialGradient(
        cx + Math.cos(t * 1.3) * 200,
        cy + Math.sin(t * 0.9) * 150,
        0,
        cx,
        cy,
        Math.max(canvas.width, canvas.height) * 0.5
      );
      g2.addColorStop(0, "rgba(6, 182, 212, 0.12)");
      g2.addColorStop(1, "rgba(6, 182, 212, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Animated gradient background */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0" />

      {/* Decorative grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Floating decorative blobs */}
      <FloatingPill
        className="h-40 w-40 bg-teal-400 blur-3xl -top-10 -left-10"
        delay={0}
      />
      <FloatingPill
        className="h-56 w-56 bg-cyan-400 blur-3xl -bottom-16 -right-16"
        delay={2}
      />
      <FloatingPill
        className="h-24 w-24 bg-teal-300 blur-2xl top-1/3 -left-8"
        delay={4}
      />
      <FloatingPill
        className="h-32 w-32 bg-sky-400 blur-2xl bottom-1/4 right-1/4"
        delay={1.5}
      />

      {/* Brand badge - top left */}
      <div className="absolute left-6 top-6 z-10 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 shadow-md">
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <span className="text-sm font-bold tracking-tight text-foreground">MediNest</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 py-20 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/80 p-7 shadow-2xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-background/70 dark:shadow-black/40 sm:p-8"
          >
            {/* Card top shimmer */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
            {children}
          </motion.div>

          {/* Bottom terms */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-5 text-center text-xs text-muted-foreground/60"
          >
            Protected by SSL encryption. Your data is safe with us.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
