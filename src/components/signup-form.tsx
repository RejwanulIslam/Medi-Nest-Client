"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Image as ImageIcon, Loader2, ChevronDown, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const ROLES = [
  { value: "USER", label: "Customer", description: "Browse and purchase medicines" },
  { value: "SELLER", label: "Seller", description: "List and sell medicines" },
] as const;

type Role = (typeof ROLES)[number]["value"];

interface SignupFormProps {
  onSwitchToLogin?: () => void;
}

export function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>("USER");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  const selectedRole = ROLES.find((r) => r.value === role)!;

  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strengthColors = ["", "bg-red-500", "bg-amber-500", "bg-yellow-400", "bg-emerald-500"];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const pwStrength = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) { toast.error("Please enter your name."); return; }
    if (!email) { toast.error("Please enter your email."); return; }
    if (password.length < 8) { toast.error("Password must be at least 8 characters."); return; }
    if (password !== confirmPassword) { toast.error("Passwords do not match."); return; }

    setIsLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
        role,
      } as Parameters<typeof authClient.signUp.email>[0]);

      if (data?.user) {
        toast.success("Account created successfully! Welcome to MediNest.", {
          description: `Signed up as ${data.user.email}`,
          duration: 3500,
        });
        router.push("/");
        router.refresh();
      } else if (error?.status === 422) {
        toast.error("An account with this email already exists.", {
          description: "Try signing in instead.",
        });
      } else {
        toast.error("Registration failed. Please try again.", {
          description: error?.message,
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
      await authClient.signIn.social({
        provider: "google",
        callbackURL: typeof window !== "undefined" ? window.location.origin : "https://medinest-client-pearl.vercel.app",
      });
    } catch {
      toast.error("Google sign-in failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-xl border bg-background py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:focus:ring-teal-500/30 ${focusedField === field ? "border-teal-500" : "border-border"
    }`;

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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-3xl font-bold tracking-tight text-foreground"
        >
          Create your account
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-1.5 text-sm text-muted-foreground"
        >
          Join MediNest — your trusted medicine platform
        </motion.p>
      </div>

      {/* Google */}
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
        <span>{isGoogleLoading ? "Connecting..." : "Sign up with Google"}</span>
      </motion.button>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="my-6 flex items-center gap-3"
      >
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-muted-foreground">or register with email</span>
        <div className="h-px flex-1 bg-border" />
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.32, duration: 0.4 }}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="signup-name" className="block text-sm font-medium text-foreground">
            Full name
          </label>
          <div className="relative">
            <User className={`absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors ${focusedField === "name" ? "text-teal-500" : "text-muted-foreground"}`} />
            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              placeholder="John Doe"
              className={`${inputClass("name")} pl-10 pr-4`}
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="signup-email" className="block text-sm font-medium text-foreground">
            Email address
          </label>
          <div className="relative">
            <Mail className={`absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors ${focusedField === "email" ? "text-teal-500" : "text-muted-foreground"}`} />
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              placeholder="you@example.com"
              className={`${inputClass("email")} pl-10 pr-4`}
            />
          </div>
        </div>

        {/* Image URL */}
        <div className="space-y-1.5">
          <label htmlFor="signup-image" className="block text-sm font-medium text-foreground">
            Profile image URL{" "}
            <span className="text-xs font-normal text-muted-foreground">(optional)</span>
          </label>
          <div className="relative">
            <ImageIcon className={`absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors ${focusedField === "image" ? "text-teal-500" : "text-muted-foreground"}`} />
            <input
              id="signup-image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              onFocus={() => setFocusedField("image")}
              onBlur={() => setFocusedField(null)}
              placeholder="https://example.com/avatar.jpg"
              className={`${inputClass("image")} pl-10 pr-4`}
            />
          </div>
        </div>

        {/* Role Selector */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">Account type</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsRoleOpen(!isRoleOpen)}
              className={`flex w-full items-center justify-between rounded-xl border bg-background px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${isRoleOpen ? "border-teal-500" : "border-border"
                }`}
            >
              <span className="font-medium text-foreground">{selectedRole.label}</span>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isRoleOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {isRoleOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-border bg-background/95 shadow-xl backdrop-blur-sm"
                >
                  {ROLES.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => { setRole(r.value); setIsRoleOpen(false); }}
                      className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors hover:bg-muted/60 ${role === r.value ? "text-teal-600 dark:text-teal-400" : "text-foreground"
                        }`}
                    >
                      <div>
                        <div className="font-medium">{r.label}</div>
                        <div className="text-xs text-muted-foreground">{r.description}</div>
                      </div>
                      {role === r.value && <CheckCircle2 className="h-4 w-4 text-teal-500" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Passwords */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label htmlFor="signup-password" className="block text-sm font-medium text-foreground">
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors ${focusedField === "password" ? "text-teal-500" : "text-muted-foreground"}`} />
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                placeholder="Min 8 chars"
                className={`${inputClass("password")} pl-10 pr-10`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-foreground">
              Confirm
            </label>
            <div className="relative">
              <Lock className={`absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors ${focusedField === "confirm" ? "text-teal-500" : "text-muted-foreground"}`} />
              <input
                id="signup-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setFocusedField("confirm")}
                onBlur={() => setFocusedField(null)}
                placeholder="Repeat password"
                className={`${inputClass("confirm")} pl-10 pr-10`}
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Password Strength */}
        {password && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-1.5">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= pwStrength ? strengthColors[pwStrength] : "bg-border"
                    }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Password strength:{" "}
              <span className={`font-medium ${pwStrength >= 3 ? "text-emerald-500" : pwStrength === 2 ? "text-amber-500" : "text-red-500"}`}>
                {strengthLabels[pwStrength]}
              </span>
            </p>
          </motion.div>
        )}

        {/* Confirm Match */}
        {confirmPassword && password !== confirmPassword && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500">
            Passwords do not match
          </motion.p>
        )}

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isLoading || isGoogleLoading}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full overflow-hidden rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-teal-500/25 transition-all hover:shadow-lg hover:shadow-teal-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating account...
              </motion.span>
            ) : (
              <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Create account
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.form>

      {/* Switch to Login */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-6 text-center text-sm text-muted-foreground"
      >
        Already have an account?{" "}
        {onSwitchToLogin ? (
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-semibold text-teal-600 hover:text-teal-500 dark:text-teal-400 hover:underline transition-colors"
          >
            Sign in
          </button>
        ) : (
          <Link href="/login" className="font-semibold text-teal-600 hover:text-teal-500 dark:text-teal-400 hover:underline transition-colors">
            Sign in
          </Link>
        )}
      </motion.p>

      {/* Terms */}
      <p className="mt-4 text-center text-xs text-muted-foreground/70">
        By creating an account, you agree to our{" "}
        <a href="#" className="underline hover:text-foreground transition-colors">Terms of Service</a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-foreground transition-colors">Privacy Policy</a>
      </p>
    </motion.div>
  );
}
