"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Loader2, Zap, Shield, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const DEMO_CREDENTIALS = [
  {
    label: "Admin",
    email: "admin@email.com",
    password: "12345678",
    icon: Shield,
    color: "from-violet-500 to-purple-600",
    bgLight: "bg-violet-50 hover:bg-violet-100 border-violet-200 text-violet-700",
    bgDark: "dark:bg-violet-950/40 dark:hover:bg-violet-900/50 dark:border-violet-800 dark:text-violet-300",
  },
  {
    label: "User",
    email: "user@email.com",
    password: "12345678",
    icon: Zap,
    color: "from-sky-500 to-blue-600",
    bgLight: "bg-sky-50 hover:bg-sky-100 border-sky-200 text-sky-700",
    bgDark: "dark:bg-sky-950/40 dark:hover:bg-sky-900/50 dark:border-sky-800 dark:text-sky-300",
  },
  {
    label: "Seller",
    email: "seler@email.com",
    password: "12345678",
    icon: ShoppingBag,
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700",
    bgDark: "dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 dark:border-emerald-800 dark:text-emerald-300",
  },
];

interface LoginFormProps {
  onSwitchToSignup?: () => void;
}

export function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleDemoLogin = (cred: (typeof DEMO_CREDENTIALS)[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
    toast.info(`Demo credentials loaded for ${cred.label}`, {
      description: `Email: ${cred.email}`,
      duration: 2500,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await authClient.signIn.email({ email, password });
      if (data?.user) {
        toast.success("Login successful! Welcome back.", {
          description: `Signed in as ${data.user.email}`,
          duration: 3000,
        });
        router.push("/");
        router.refresh();
      } else {
        toast.error("Invalid credentials. Please try again.", {
          description: error?.message || "Check your email and password.",
          duration: 4000,
        });
      }
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: typeof window !== "undefined" ? window.location.origin : "https://medinest-client-pearl.vercel.app",
      });
      if (data?.data) {
        router.push("/");
      }
    } catch {
      toast.error("Google sign-in failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg shadow-teal-500/30"
        >
          <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-3xl font-bold tracking-tight text-foreground"
        >
          Welcome back
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-1.5 text-sm text-muted-foreground"
        >
          Sign in to your MediNest account
        </motion.p>
      </div>

      {/* Google Login */}
      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        type="button"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading || isLoading}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="relative flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:pointer-events-none disabled:opacity-60"
      >
        {isGoogleLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        ) : (
          <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
        )}
        <span>{isGoogleLoading ? "Connecting..." : "Continue with Google"}</span>
      </motion.button>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="my-6 flex items-center gap-3"
      >
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-muted-foreground">or sign in with email</span>
        <div className="h-px flex-1 bg-border" />
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.32, duration: 0.4 }}
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Email Field */}
        <div className="space-y-1.5">
          <label htmlFor="login-email" className="block text-sm font-medium text-foreground">
            Email address
          </label>
          <div className="relative">
            <Mail
              className={`absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors ${focusedField === "email" ? "text-teal-500" : "text-muted-foreground"
                }`}
            />
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              placeholder="you@example.com"
              className="w-full rounded-xl border bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-500/30"
              style={{
                borderColor: focusedField === "email" ? "rgb(20 184 166)" : undefined,
              }}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="login-password" className="block text-sm font-medium text-foreground">
              Password
            </label>
            <a href="#" className="text-xs font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock
              className={`absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors ${focusedField === "password" ? "text-teal-500" : "text-muted-foreground"
                }`}
            />
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              placeholder="••••••••"
              className="w-full rounded-xl border bg-background py-3 pl-10 pr-11 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-500/30"
              style={{
                borderColor: focusedField === "password" ? "rgb(20 184 166)" : undefined,
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading || isGoogleLoading}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-teal-500/25 transition-all hover:shadow-lg hover:shadow-teal-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2"
              >
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </motion.span>
            ) : (
              <motion.span
                key="text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Sign in
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.form>

      {/* Demo Credentials */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="mt-8"
      >
        <div className="mb-3 flex items-center gap-2">
          <Zap className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Quick Access
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {DEMO_CREDENTIALS.map((cred) => {
            const Icon = cred.icon;
            return (
              <motion.button
                key={cred.label}
                type="button"
                onClick={() => handleDemoLogin(cred)}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-xs font-medium transition-all ${cred.bgLight} ${cred.bgDark}`}
              >
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${cred.color} shadow-sm`}>
                  <Icon className="h-3.5 w-3.5 text-white" />
                </div>
                <span>{cred.label}</span>
              </motion.button>
            );
          })}
        </div>
        <p className="mt-2.5 text-center text-[11px] text-muted-foreground/70">
          Click a role to auto-fill credentials
        </p>
      </motion.div>

      {/* Switch to Signup */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-8 text-center text-sm text-muted-foreground"
      >
        Don&apos;t have an account?{" "}
        {onSwitchToSignup ? (
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="font-semibold text-teal-600 hover:text-teal-500 dark:text-teal-400 hover:underline transition-colors"
          >
            Create one
          </button>
        ) : (
          <Link href="/signup" className="font-semibold text-teal-600 hover:text-teal-500 dark:text-teal-400 hover:underline transition-colors">
            Create one
          </Link>
        )}
      </motion.p>
    </motion.div>
  );
}
