"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ArrowLeft, Save, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const toggleShow = (key: keyof typeof show) => {
    setShow({ ...show, [key]: !show[key] });
  };

  const handleSave = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("❌ New passwords do not match!");
      return;
    }

    alert("✅ Password changed successfully!");
    router.push("/account/address");
  };

  return (
    <main className="min-h-screen bg-white text-gray-800 px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        {/* ===== Header ===== */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push("/account/address")}
            className="flex items-center text-purple-600 hover:text-purple-700 transition font-medium"
          >
            <ArrowLeft size={18} className="mr-1" /> Back
          </button>
          <h2 className="text-xl font-bold text-purple-600 flex items-center gap-2">
            <Lock size={20} /> Change Password
          </h2>
        </div>

        {/* ===== Form ===== */}
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm bg-gray-50 space-y-5">
          {[
            {
              label: "Old Password",
              name: "oldPassword",
              value: passwords.oldPassword,
              showKey: "old",
            },
            {
              label: "New Password",
              name: "newPassword",
              value: passwords.newPassword,
              showKey: "new",
            },
            {
              label: "Confirm New Password",
              name: "confirmPassword",
              value: passwords.confirmPassword,
              showKey: "confirm",
            },
          ].map(({ label, name, value, showKey }) => (
            <div key={name}>
              <label className="text-sm font-semibold text-gray-600 mb-1 block">
                {label}
              </label>
              <div className="relative">
                <Input
                  type={show[showKey as keyof typeof show] ? "text" : "password"}
                  name={name}
                  value={value}
                  onChange={handleChange}
                  className="border-gray-300 focus:ring-2 focus:ring-teal-500 w-full pr-10"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
                <button
                  type="button"
                  onClick={() => toggleShow(showKey as keyof typeof show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {show[showKey as keyof typeof show] ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ===== Save Button ===== */}
        <div className="mt-8">
          <Button
            onClick={handleSave}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold flex items-center justify-center gap-2"
          >
            <Save size={16} />
            Save New Password
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
