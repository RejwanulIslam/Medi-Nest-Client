"use client"


import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  CheckCircle2,
  Package,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Home,
} from "lucide-react"

// ── Confetti particle ─────────────────────────────────────────────
function ConfettiPiece({ index }: { index: number }) {
  const colors = [
    "#6366f1", "#8b5cf6", "#ec4899", "#f59e0b",
    "#10b981", "#3b82f6", "#f97316", "#14b8a6",
  ]
  const color = colors[index % colors.length]
  const left = `${(index * 1.67) % 100}%`
  const delay = `${(index * 0.05) % 2}s`
  const duration = `${2.5 + (index % 4) * 0.5}s`
  const size = `${6 + (index % 5)}px`
  const shape = index % 3 === 0 ? "50%" : index % 3 === 1 ? "2px" : "0%"

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left,
        top: "-20px",
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: shape,
        animation: `confettiFall ${duration} ${delay} ease-in forwards`,
        opacity: 0,
      }}
    />
  )
}

// ── Order steps ───────────────────────────────────────────────────
const STEPS = [
  { icon: "✅", label: "Confirmed",  active: true  },
  { icon: "📦", label: "Packing",   active: false },
  { icon: "🚚", label: "Shipping",  active: false },
  { icon: "🏠", label: "Delivered", active: false },
]

// ── Main Client Component ─────────────────────────────────────────
export function OrderSuccessClient() {
  const router = useRouter()
  const [mounted, setMounted]     = useState(false)
  const [confetti, setConfetti]   = useState(false)
  const [countdown, setCountdown] = useState(10)

  // Mount animations
  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true),  100)
    const t2 = setTimeout(() => setConfetti(true), 500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // Countdown → redirect
  useEffect(() => {
    if (countdown === 0) { router.push("/"); return }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown, router])

  return (
    <>
      {/* ── Injected keyframes & fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg);   opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes popIn {
          0%   { transform: scale(0) rotate(-10deg); opacity: 0; }
          70%  { transform: scale(1.15) rotate(3deg); }
          100% { transform: scale(1)   rotate(0deg);  opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(28px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.55; }
          100% { transform: scale(1.9); opacity: 0;    }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes trackFill {
          from { width: 0%;  }
          to   { width: 25%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .font-sora   { font-family: 'Sora', sans-serif; }
        .font-dmsans { font-family: 'DM Sans', sans-serif; }

        .anim-pop    { animation: popIn   0.65s cubic-bezier(.34,1.56,.64,1) 0.2s both; }
        .anim-float  { animation: floatY  3s ease-in-out infinite; }
        .anim-fade   { animation: fadeIn  0.5s ease both; }

        .slide-1 { animation: slideUp 0.5s 0.25s ease both; }
        .slide-2 { animation: slideUp 0.5s 0.40s ease both; }
        .slide-3 { animation: slideUp 0.5s 0.55s ease both; }
        .slide-4 { animation: slideUp 0.5s 0.70s ease both; }
        .slide-5 { animation: slideUp 0.5s 0.82s ease both; }
        .slide-6 { animation: slideUp 0.5s 0.94s ease both; }

        .shimmer-text {
          background: linear-gradient(
            90deg,
            #6366f1 0%, #8b5cf6 25%, #ec4899 50%, #8b5cf6 75%, #6366f1 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        .pulse-ring { position: relative; }
        .pulse-ring::before,
        .pulse-ring::after {
          content: '';
          position: absolute;
          inset: -14px;
          border-radius: 50%;
          border: 2px solid rgba(99,102,241,0.5);
          animation: pulseRing 2.2s ease-out infinite;
        }
        .pulse-ring::after { animation-delay: 1s; }

        .track-fill {
          animation: trackFill 1.2s 0.8s ease both;
        }

        .btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .btn-secondary:hover { background: #f1f5f9 !important; }
        .btn-primary, .btn-secondary { transition: all 0.2s ease; }
      `}</style>

      {/* ── Page wrapper ── */}
      <main
        className="font-dmsans min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 15% 50%, #eef2ff 0%, transparent 55%)," +
            "radial-gradient(ellipse at 85% 15%, #fdf2f8 0%, transparent 55%)," +
            "radial-gradient(ellipse at 60% 85%, #ecfdf5 0%, transparent 55%)," +
            "#f8fafc",
        }}
      >
        {/* Confetti layer */}
        {confetti && (
          <div
            aria-hidden="true"
            style={{
              position: "fixed", inset: 0,
              pointerEvents: "none", zIndex: 50, overflow: "hidden",
            }}
          >
            {Array.from({ length: 60 }).map((_, i) => (
              <ConfettiPiece key={i} index={i} />
            ))}
          </div>
        )}

        {/* Decorative blobs */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "-8rem", left: "-8rem",
          width: "24rem", height: "24rem", borderRadius: "50%",
          background: "radial-gradient(#6366f1, #8b5cf6)",
          opacity: 0.15, filter: "blur(60px)",
        }} />
        <div aria-hidden="true" style={{
          position: "absolute", bottom: "-8rem", right: "-8rem",
          width: "24rem", height: "24rem", borderRadius: "50%",
          background: "radial-gradient(#ec4899, #f59e0b)",
          opacity: 0.15, filter: "blur(60px)",
        }} />

        {/* ── Card ── */}
        <div
          className={`relative z-10 w-full max-w-lg ${mounted ? "anim-fade" : ""}`}
          style={{ opacity: mounted ? undefined : 0 }}
        >
          <div style={{
            background: "rgba(255,255,255,0.82)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            boxShadow: "0 25px 80px rgba(99,102,241,0.15), 0 8px 32px rgba(0,0,0,0.08)",
            border: "1px solid rgba(99,102,241,0.12)",
            overflow: "hidden",
          }}>

            {/* Rainbow top strip */}
            <div style={{
              height: "4px",
              background: "linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899,#f59e0b,#10b981,#3b82f6)",
            }} />

            <div style={{ padding: "2.5rem 2rem 2rem", textAlign: "center" }}>

              {/* ── Animated checkmark ── */}
              <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <div className="pulse-ring">
                  <div
                    className="anim-pop anim-float"
                    style={{
                      width: "96px", height: "96px", borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#ec4899 100%)",
                      boxShadow: "0 20px 60px rgba(99,102,241,0.45)",
                    }}
                  >
                    <CheckCircle2 size={48} color="white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* ── Headline ── */}
              <div className="slide-1">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "6px" }}>
                  <Sparkles size={14} color="#f59e0b" />
                  <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8" }}>
                    Order Confirmed
                  </span>
                  <Sparkles size={14} color="#f59e0b" />
                </div>
                <h1 className="font-sora shimmer-text" style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1.1, marginBottom: "0.75rem" }}>
                  Thank You!
                </h1>
                <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.6, maxWidth: "360px", margin: "0 auto" }}>
                  Your order has been confirmed and is being prepared with care. You'll receive an update soon.
                </p>
              </div>

              {/* ── Progress tracker ── */}
              <div className="slide-2" style={{
                marginTop: "1.75rem",
                padding: "1.25rem",
                borderRadius: "16px",
                background: "linear-gradient(135deg,#f5f3ff,#fdf2f8)",
                border: "1px solid rgba(139,92,246,0.15)",
                textAlign: "left",
              }}>
                <p className="font-sora" style={{
                  fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
                  textTransform: "uppercase", color: "#818cf8", marginBottom: "1rem",
                }}>
                  Delivery Progress
                </p>

                {/* Track bar */}
                <div style={{
                  height: "6px", background: "#e2e8f0", borderRadius: "999px",
                  overflow: "hidden", marginBottom: "1.25rem",
                }}>
                  <div
                    className="track-fill"
                    style={{
                      height: "100%", width: "0%", borderRadius: "999px",
                      background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
                    }}
                  />
                </div>

                {/* Steps */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "8px" }}>
                  {STEPS.map((step, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", textAlign: "center" }}>
                      <div style={{
                        width: "36px", height: "36px", borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "16px",
                        background: step.active
                          ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
                          : "#e2e8f0",
                        boxShadow: step.active ? "0 4px 16px rgba(99,102,241,0.35)" : "none",
                        opacity: step.active ? 1 : 0.45,
                        filter: step.active ? "none" : "grayscale(1)",
                      }}>
                        {step.icon}
                      </div>
                      <span style={{
                        fontSize: "10px", fontWeight: 600, lineHeight: 1.3,
                        color: step.active ? "#6366f1" : "#94a3b8",
                      }}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Info chips ── */}
              <div className="slide-3" style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: "12px", marginTop: "1rem",
              }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "12px 14px", borderRadius: "14px",
                  background: "#f0fdf4", border: "1px solid #bbf7d0",
                  textAlign: "left",
                }}>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "10px",
                    background: "#dcfce7", display: "flex", alignItems: "center",
                    justifyContent: "center", flexShrink: 0,
                  }}>
                    <Package size={16} color="#16a34a" />
                  </div>
                  <div>
                    <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#22c55e" }}>Delivery</p>
                    <p style={{ fontSize: "11px", fontWeight: 600, color: "#14532d" }}>3–5 Business Days</p>
                  </div>
                </div>

                <div style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "12px 14px", borderRadius: "14px",
                  background: "#eff6ff", border: "1px solid #bfdbfe",
                  textAlign: "left",
                }}>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "10px",
                    background: "#dbeafe", display: "flex", alignItems: "center",
                    justifyContent: "center", flexShrink: 0,
                  }}>
                    <ShoppingBag size={16} color="#2563eb" />
                  </div>
                  <div>
                    <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3b82f6" }}>Support</p>
                    <p style={{ fontSize: "11px", fontWeight: 600, color: "#1e3a8a" }}>24/7 Available</p>
                  </div>
                </div>
              </div>

              {/* ── Buttons ── */}
              <div className="slide-4" style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "1.25rem" }}>
                <Link
                  href="/user-dashboard/orders"
                  className="btn-primary"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: "8px", padding: "14px", borderRadius: "16px",
                    background: "linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#ec4899 100%)",
                    color: "white", fontWeight: 700, fontSize: "14px",
                    fontFamily: "'Sora', sans-serif",
                    boxShadow: "0 8px 28px rgba(99,102,241,0.38)",
                    textDecoration: "none",
                  }}
                >
                  <Package size={16} />
                  Track My Order
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/"
                  className="btn-secondary"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: "8px", padding: "14px", borderRadius: "16px",
                    background: "#f8fafc", border: "1px solid #e2e8f0",
                    color: "#475569", fontWeight: 600, fontSize: "14px",
                    textDecoration: "none",
                  }}
                >
                  <Home size={16} />
                  Back to Home
                </Link>
              </div>

              {/* ── Countdown ── */}
              <div className="slide-5" style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: "8px", marginTop: "1.25rem",
              }}>
                <div style={{ position: "relative", width: "28px", height: "28px" }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="14" cy="14" r="11" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
                    <circle
                      cx="14" cy="14" r="11" fill="none"
                      stroke="#6366f1" strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray={`${(countdown / 10) * 69.1} 69.1`}
                      style={{ transition: "stroke-dasharray 1s linear" }}
                    />
                  </svg>
                  <span style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "9px", fontWeight: 700, color: "#6366f1",
                  }}>
                    {countdown}
                  </span>
                </div>
                <p style={{ fontSize: "12px", color: "#94a3b8" }}>
                  Redirecting in{" "}
                  <span style={{ fontWeight: 600, color: "#6366f1" }}>{countdown}s</span>
                </p>
              </div>
            </div>

            {/* Bottom strip */}
            <div style={{
              padding: "12px", textAlign: "center",
              background: "#f8fafc", borderTop: "1px solid #f1f5f9",
            }}>
              <p style={{ fontSize: "11px", color: "#94a3b8" }}>
                Questions?{" "}
                <a href="mailto:support@medico.com" style={{ color: "#6366f1", fontWeight: 600 }}>
                  support@medico.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}