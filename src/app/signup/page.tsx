// src/app/signup/page.tsx
"use client";

import { Mail, Lock, User, Eye, EyeOff, Store, Phone, MapPin, School } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authStore";

export default function UserSignup() {
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    level: "",
    hostel: "",
    matric: "",
  });
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  // Predefined departments (user can type custom if not found)
  const departments = [
    "Computer Science", "Business Administration", "Mass Communication", "Accounting", "Economics",
    "Political Science", "Law", "Medicine", "Engineering", "Pharmacy", "Nursing", "Architecture"
  ];

  // Only 100, 200, 300, 400, 500+ Level
  const levels = ["100 Level", "200 Level", "300 Level", "400 Level", "500+ Level"];
  const hostels = ["New Hall", "Old Hall", "FSS", "Annex", "Off-Campus", "Jaja", "Mariere", "Queen's Hall"];

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtp = () => {
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setSentOtp(generated);
    alert(`Your OTP is: ${generated}`);
    setMessage("OTP sent!");
  };

  const handleSignup = (e: any) => {
    e.preventDefault();
    if (step === 1) {
      sendOtp();
      setStep(2);
    } else {
      if (otp === sentOtp) {
        login({ name: form.name, email: form.email });
        localStorage.setItem("userProfile", JSON.stringify(form));
        setMessage("Verified! Welcome to StudEx");
        setTimeout(() => router.push("/"), 1500);
      } else {
        setMessage("Invalid OTP");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <Store className="w-16 h-16 mx-auto mb-4" style={{ color: "#7C3AED" }} />
            <h1 className="text-2xl font-bold" style={{ color: "#7C3AED" }}>
              {step === 1 ? "Join StudEx" : "Verify Account"}
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              {step === 1 ? "Create your student account" : "Enter 6-digit OTP"}
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {step === 1 ? (
              <>
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#7C3AED" }}>
                    <User className="w-4 h-4 inline mr-1" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500"
                    style={{ borderColor: "#7C3AED" }}
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#7C3AED" }}>
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@lasu.edu.ng"
                    className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500"
                    style={{ borderColor: "#7C3AED" }}
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#7C3AED" }}>
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="08012345678"
                    className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500"
                    style={{ borderColor: "#7C3AED" }}
                    required
                  />
                </div>

                {/* DEPARTMENT — NOW TYPEABLE */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#7C3AED" }}>
                    <School className="w-4 h-4 inline mr-1" />
                    Department
                  </label>
                  <input
                    type="text"
                    list="departments"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    placeholder="Type or select your department"
                    className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500"
                    style={{ borderColor: "#7C3AED" }}
                    required
                  />
                  <datalist id="departments">
                    {departments.map((d) => (
                      <option key={d} value={d} />
                    ))}
                  </datalist>
                  <p className="text-xs text-gray-500 mt-1">Can't find it? Just type it!</p>
                </div>

                {/* LEVEL — 100 to 500+ ONLY */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#7C3AED" }}>
                    Level
                  </label>
                  <select
                    name="level"
                    value={form.level}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500"
                    style={{ borderColor: "#7C3AED" }}
                    required
                  >
                    <option value="">Select Level</option>
                    {levels.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                {/* Hostel */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#7C3AED" }}>
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Hostel/Location
                  </label>
                  <select
                    name="hostel"
                    value={form.hostel}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500"
                    style={{ borderColor: "#7C3AED" }}
                    required
                  >
                    <option value="">Select Hostel</option>
                    {hostels.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                {/* Matric */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#7C3AED" }}>
                    Matric Number
                  </label>
                  <input
                    type="text"
                    name="matric"
                    value={form.matric}
                    onChange={handleChange}
                    placeholder="LASU/123456"
                    className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500"
                    style={{ borderColor: "#7C3AED" }}
                    required
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2" style={{ color: "#7C3AED" }}>
                    <Lock className="w-4 h-4 inline mr-1" />
                    Password
                  </label>
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create strong password"
                    className="w-full p-3 pr-12 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500"
                    style={{ borderColor: "#7C3AED" }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-10 text-gray-500 hover:text-purple-600"
                  >
                    {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </>
            ) : (
              /* OTP STEP */
              <div className="space-y-4">
                <div className="text-center p-4 bg-teal-50 rounded-xl">
                  <p className="text-sm text-teal-800">
                    OTP sent to <strong>{form.email}</strong>
                  </p>
                </div>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  className="w-full p-4 text-center text-2xl font-bold tracking-widest rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500"
                  style={{ borderColor: "#7C3AED", letterSpacing: "0.5em" }}
                  maxLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={sendOtp}
                  className="text-sm text-purple-600 underline w-full text-center"
                >
                  Resend OTP
                </button>
              </div>
            )}

            {message && (
              <p className={`text-sm text-center font-medium ${message.includes("Invalid") ? "text-red-600" : "text-green-600"}`}>
                {message}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-bold text-white mt-6 bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 transition-all shadow-lg"
            >
              {step === 1 ? "Send OTP" : "Verify & Join"}
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <a href="/login" className="underline text-purple-600 font-medium">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}