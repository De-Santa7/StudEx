// src/app/login/page.tsx
"use client";

import { LogIn, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
          <p className="text-primary/70 mt-2">Login to StudEx</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-primary/60" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-primary/60" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-primary/80">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-accent font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}