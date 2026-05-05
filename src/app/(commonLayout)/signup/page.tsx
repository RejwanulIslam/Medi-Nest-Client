import AuthPageLayout from "@/components/auth-page-layout";
import { SignupForm } from "@/components/signup-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | MediNest",
  description: "Create your MediNest account and start exploring trusted medicines.",
};

export default function SignupPage() {
  return (
    <AuthPageLayout>
      <SignupForm />
    </AuthPageLayout>
  );
}
