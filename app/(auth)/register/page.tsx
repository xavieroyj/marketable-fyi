import { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import RegisterForm from "../components/register-form";

export const metadata: Metadata = {
  title: "Register | LinkPro",
  description: "Create a new LinkPro account to start managing your shortened links.",
};

export default function RegisterPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600 to-blue-600" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo className="h-8 w-8 text-white" />
          <span className="ml-2">LinkPro</span>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;LinkPro&apos;s custom domain feature has transformed how we share links. Our brand consistency has never been better!&rdquo;
            </p>
            <footer className="text-sm">Michael Chen - Social Media Manager</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>
          <RegisterForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link 
              href="/login" 
              className="hover:text-brand underline underline-offset-4"
            >
              Already have an account? Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 