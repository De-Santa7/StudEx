// src/app/verify/page.tsx
"use client";

import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function VerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("pendingEmail");
    if (saved) setEmail(saved);
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === "123456") {
      localStorage.removeItem("pendingEmail");
      router.push("/");
    } else {
      alert("Wrong code! Try 123456");
    }
  };

  return (
    <div className="min-h-email flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 to-purple-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center" style={{ border: "2px solid #7C3AED" }}>
        <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: "#14B8A6" }} />
        <h1 className="text-2xl font-bold" style={{ color: "#14B8A6" }}>Verify Your Account</h1>
        <p className="mt-2 text-sm" style={{ color: "#14B8A6", opacity: 0.8 }}>
          We sent a 6-digit code to <strong>{email || "your email"}</strong>
        </p>

        <form onSubmit={handleVerify} className="mt-8">
          <input
            type="text"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            className="w-full text-center text-2xl tracking-widest py-4 rounded-2xl"
            style={{
              backgroundColor: "#F9FAFB",
              border: "2px solid #E5E7EB",
              color: "#14B8A6",
              letterSpacing: "0.5rem",
            }}
            onFocus={(e) => e.target.style.borderColor = "#7C3AED"}
            onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
          />

          <button
            type="submit"
            className="w-full mt-6 py-4 rounded-2xl font-bold text-white"
            style={{ backgroundColor: "#14B8A6" }}
          >
            Verify & Continue
          </button>
        </form>

        <p className="mt-6 text-xs" style={{ color: "#14B8A6", opacity: 0.7 }}>
          Fake code: <strong>123456</strong>
        </p>
      </div>
    </div>
  );
}