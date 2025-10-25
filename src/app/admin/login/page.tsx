// src/app/admin/login/page.tsx
"use client";

import { Shield, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter(); // CORRECT

  const handleLogin = (e: any) => {
    e.preventDefault();

    // Hardcoded admin credentials
    if (email === "admin@studex.com" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 mx-auto mb-4" style={{ color: "#7C3AED" }} />
            <h1 className="text-2xl font-bold" style={{ color: "#7C3AED" }}>Admin Login</h1>
            <p className="text-sm text-gray-600 mt-2">Manage StudEx platform</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#7C3AED" }}>
                <Mail className="w-4 h-4 inline mr-1" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@studex.com"
                className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500"
                style={{ borderColor: "#7C3AED" }}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-2" style={{ color: "#7C3AED" }}>
                <Lock className="w-4 h-4 inline mr-1" />
                Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full p-3 pr-12 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500"
                style={{ borderColor: "#7C3AED" }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-10 text-gray-500 hover:text-purple-600 transition"
              >
                {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-bold text-white mt-6 bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 transition-all shadow-lg"
            >
              Login as Admin
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-6">
            Default: <strong>admin@studex.com</strong> / <strong>admin123</strong>
          </p>
        </div>
      </div>
    </>
  );
}