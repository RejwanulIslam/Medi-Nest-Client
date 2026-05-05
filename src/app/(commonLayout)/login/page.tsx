import AuthPageLayout from "@/components/auth-page-layout";
import { LoginForm } from "@/components/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | MediNest",
  description: "Sign in to your MediNest account to access your medicines and orders.",
};

export default function LoginPage() {
  return (
    <AuthPageLayout>
      <LoginForm />
    </AuthPageLayout>
  );
}
