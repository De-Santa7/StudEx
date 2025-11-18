// src/app/seller/onboarding/page.tsx
"use client";

import { Store, ChevronRight, CheckCircle, Upload, FileText, X, Shield, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SellerOnboarding() {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState({
    id: { name: "", data: "" },
    admission: { name: "", data: "" },
  });
  const [businessAge, setBusinessAge] = useState(false);
  const router = useRouter();

  const handleFile = (type: "id" | "admission", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFiles(prev => ({
        ...prev,
        [type]: { name: file.name, data: reader.result as string },
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (type: "id" | "admission") => {
    setFiles(prev => ({ ...prev, [type]: { name: "", data: "" } }));
  };

  const handleSubmit = () => {
    const application = {
      status: "pending",
      submittedAt: new Date().toISOString(),
      files: {
        id: files.id.data ? { name: files.id.name, data: files.id.data } : null,
        admission: files.admission.data ? { name: files.admission.name, data: files.admission.data } : null,
      },
      businessAgeConfirmed: businessAge,
    };

    localStorage.setItem("sellerApplication", JSON.stringify(application));
    localStorage.setItem("isSellerPending", "true");
    router.push("/account");
  };

  const isStep2Complete = files.id.data && files.admission.data && businessAge;

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <>
      {/* TOP BAR — BIG LOGO */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white/80 backdrop-blur-xl z-40 border-b border-white/20 shadow-sm"
      >
        <div className="flex items-center justify-between p-4">
          <Link href="/account" className="text-purple-600">
            <ChevronRight className="w-7 h-7 rotate-180" />
          </Link>
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-1.jpg"
              alt="StudEx Logo"
              width={160}
              height={50}
              className="h-11 w-auto object-contain"
              priority
            />
          </Link>
          <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
            Become a Seller
          </h1>
        </div>
      </motion.div>

      <div className="p-6 pb-32">
        {/* PROGRESS STEPS */}
        <motion.div {...fadeInUp} className="flex justify-center items-center mb-10 gap-4">
          {[1, 2, 3].map((i, idx) => (
            <div key={i} className="flex items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: i <= step ? 1 : 0.9 }}
                className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg shadow-lg transition-all ${
                  i <= step
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {i < step ? <CheckCircle className="w-7 h-7" /> : i}
              </motion.div>
              {idx < 2 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: i < step ? 1 : 0 }}
                  className={`w-20 h-1.5 origin-left transition-all ${
                    i < step ? "bg-gradient-to-r from-teal-500 to-emerald-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* STEP 1: WELCOME */}
        {step === 1 && (
          <motion.div {...fadeInUp} className="text-center space-y-8">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="w-28 h-28 mx-auto bg-gradient-to-br from-purple-100 to-teal-100 rounded-full flex items-center justify-center shadow-xl"
            >
              <Store className="w-16 h-16 text-purple-600" />
            </motion.div>
            <h2 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
              Sell on StudEx
            </h2>
            <p className="text-sm text-gray-600 max-w-xs mx-auto leading-relaxed">
              Join thousands of campus sellers. Earn real money. Get verified in 24–48 hours.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep(2)}
              className="w-full py-5 rounded-2xl font-black text-white bg-gradient-to-r from-teal-500 to-emerald-500 shadow-2xl flex items-center justify-center gap-3"
            >
              Start Application
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {/* STEP 2: DOCUMENTS + HONESTY */}
        {step === 2 && (
          <motion.div {...fadeInUp} className="space-y-8">
            <h2 className="text-xl font-black text-gray-800">Verify Your Identity</h2>

            <div className="space-y-6">
              {/* STUDENT ID */}
              <motion.div whileHover={{ y: -2 }}>
                <label className="block">
                  <div className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                    files.id.data ? "border-emerald-500 bg-emerald-50" : "border-purple-300 hover:border-purple-500"
                  }`}>
                    <FileText className="w-10 h-10 mx-auto mb-3 text-purple-600" />
                    <p className="text-sm font-bold text-gray-800">Student ID</p>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG, or PDF</p>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFile("id", e)}
                    />
                  </div>
                  {files.id.name && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-3 p-3 bg-emerald-100 rounded-xl flex items-center justify-between shadow-sm"
                    >
                      <p className="text-xs font-bold text-emerald-800 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        {files.id.name}
                      </p>
                      <button
                        onClick={() => removeFile("id")}
                        className="p-1.5 hover:bg-red-200 rounded-full transition"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    </motion.div>
                  )}
                </label>
              </motion.div>

              {/* ADMISSION LETTER */}
              <motion.div whileHover={{ y: -2 }}>
                <label className="block">
                  <div className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                    files.admission.data ? "border-emerald-500 bg-emerald-50" : "border-purple-300 hover:border-purple-500"
                  }`}>
                    <FileText className="w-10 h-10 mx-auto mb-3 text-purple-600" />
                    <p className="text-sm font-bold text-gray-800">Admission Letter</p>
                    <p className="text-xs text-gray-500 mt-1">Proof of enrollment</p>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFile("admission", e)}
                    />
                  </div>
                  {files.admission.name && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-3 p-3 bg-emerald-100 rounded-xl flex items-center justify-between shadow-sm"
                    >
                      <p className="text-xs font-bold text-emerald-800 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        {files.admission.name}
                      </p>
                      <button
                        onClick={() => removeFile("admission")}
                        className="p-1.5 hover:bg-red-200 rounded-full transition"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    </motion.div>
                  )}
                </label>
              </motion.div>

              {/* HONESTY CHECKBOX — NO FAKE PROOF */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-r from-purple-50 to-teal-50 rounded-2xl p-5 border-2 border-purple-200"
              >
                <label className="flex items-start gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={businessAge}
                    onChange={(e) => setBusinessAge(e.target.checked)}
                    className="w-6 h-6 text-teal-600 rounded focus:ring-0 mt-0.5"
                  />
                  <div>
                    <p className="font-bold text-gray-800 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-purple-600" />
                      Business Age Declaration
                    </p>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      I confirm that I have been selling on campus for <strong>6 months or more</strong>. 
                      This helps us maintain trust and quality.
                    </p>
                  </div>
                </label>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: isStep2Complete ? 1.02 : 1 }}
              whileTap={{ scale: isStep2Complete ? 0.98 : 1 }}
              onClick={() => setStep(3)}
              disabled={!isStep2Complete}
              className="w-full py-5 rounded-2xl font-black text-white shadow-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: isStep2Complete
                  ? "linear-gradient(to right, #14B8A6, #10B981)"
                  : "#9CA3AF"
              }}
            >
              {isStep2Complete ? (
                <>
                  Continue to Review
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                "Complete All Fields"
              )}
            </motion.button>
          </motion.div>
        )}

        {/* STEP 3: SUCCESS */}
        {step === 3 && (
          <motion.div {...fadeInUp} className="text-center space-y-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.6, repeat: 1 }}
              className="w-28 h-28 mx-auto bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center shadow-xl"
            >
              <CheckCircle className="w-16 h-16 text-emerald-600" />
            </motion.div>
            <h2 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
              Application Submitted!
            </h2>
            <p className="text-sm text-gray-600 max-w-xs mx-auto leading-relaxed">
              We’ll review your documents and <strong>notify you via app</strong> within <strong>48 hours</strong>.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              className="w-full py-5 rounded-2xl font-black text-white bg-gradient-to-r from-teal-500 to-emerald-500 shadow-2xl"
            >
              Done — Back to Account
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* BOTTOM NAV — ACCOUNT MODE */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-white/20 z-50 shadow-2xl"
      >
        <div className="flex justify-around py-3">
          <Link href="/" className="text-gray-500"><span className="text-xs">Home</span></Link>
          <Link href="/categories" className="text-gray-500"><span className="text-xs">Shop</span></Link>
          <Link href="/cart" className="text-gray-500"><span className="text-xs">Cart</span></Link>
          <Link href="/wishlist" className="text-gray-500"><span className="text-xs">Wishlist</span></Link>
          <div className="text-teal-600 font-black"><span className="text-xs">Account</span></div>
        </div>
      </motion.div>
    </>
  );
}