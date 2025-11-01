// src/app/seller/onboarding/page.tsx
"use client";

import { Store, ChevronRight, CheckCircle, Upload, Calendar, FileText, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SellerOnboarding() {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState({
    id: { name: "", data: "" },
    admission: { name: "", data: "" },
    proof: { name: "", data: "" },
  });
  const router = useRouter();

  const handleFile = (type: string, e: any) => {
    const file = e.target.files[0];
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

  const removeFile = (type: string) => {
    setFiles(prev => ({ ...prev, [type]: { name: "", data: "" } }));
  };

  const handleSubmit = () => {
    const application = {
      status: "pending",
      submittedAt: new Date().toISOString(),
      files: {
        id: files.id.data ? { name: files.id.name, data: files.id.data } : null,
        admission: files.admission.data ? { name: files.admission.name, data: files.admission.data } : null,
        proof: files.proof.data ? { name: files.proof.name, data: files.proof.data } : null,
      },
    };

    localStorage.setItem("sellerApplication", JSON.stringify(application));
    localStorage.setItem("isSellerPending", "true");
    router.push("/account");
  };

  const isStep2Complete = files.id.data && files.admission.data && files.proof.data;

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <Link href="/account" className="p-2">
            <ChevronRight className="w-6 h-6 rotate-180" style={{ color: "#7C3AED" }} />
          </Link>
          <h1 className="text-xl font-bold" style={{ color: "#7C3AED" }}>Seller Application</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="p-6 pb-32">
        {/* Progress Steps */}
        <div className="flex justify-center items-center mb-8 gap-4">
          {[1, 2, 3].map((i, idx) => (
            <div key={i} className="flex items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                  i <= step
                    ? "bg-teal-500 text-white shadow-lg"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {i < step ? <CheckCircle className="w-6 h-6" /> : i}
              </div>
              {idx < 2 && (
                <div
                  className={`w-16 h-1 transition-all ${
                    i < step ? "bg-teal-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Intro */}
        {step === 1 && (
          <div className="text-center space-y-6">
            <Store className="w-20 h-20 mx-auto" style={{ color: "#7C3AED" }} />
            <h2 className="text-2xl font-bold" style={{ color: "#7C3AED" }}>
              Become a Verified Seller
            </h2>
            <p className="text-sm text-gray-600">
              Submit documents for approval. We'll review in 24-48 hours.
            </p>
            <button
              onClick={() => setStep(2)}
              className="w-full py-4 rounded-2xl font-bold text-white shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: "#14B8A6" }}
            >
              Start Application
            </button>
          </div>
        )}

        {/* Step 2: Upload Documents */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold" style={{ color: "#7C3AED" }}>
              Upload Documents
            </h2>

            <div className="space-y-5">
              {/* Student ID */}
              <label className="block">
                <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-teal-500 transition-all">
                  <FileText className="w-9 h-9 mx-auto mb-2" style={{ color: "#7C3AED" }} />
                  <p className="text-sm font-medium">Student ID</p>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFile("id", e)}
                  />
                </div>
                {files.id.name && (
                  <div className="mt-2 p-3 bg-teal-50 rounded-xl flex items-center justify-between">
                    <p className="text-xs text-green-700 font-medium">
                      {files.id.name}
                    </p>
                    <button
                      onClick={() => removeFile("id")}
                      className="p-1 hover:bg-red-100 rounded-full transition"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                )}
              </label>

              {/* Admission Letter */}
              <label className="block">
                <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-teal-500 transition-all">
                  <FileText className="w-9 h-9 mx-auto mb-2" style={{ color: "#7C3AED" }} />
                  <p className="text-sm font-medium">Admission Letter</p>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFile("admission", e)}
                  />
                </div>
                {files.admission.name && (
                  <div className="mt-2 p-3 bg-teal-50 rounded-xl flex items-center justify-between">
                    <p className="text-xs text-green-700 font-medium">
                      {files.admission.name}
                    </p>
                    <button
                      onClick={() => removeFile("admission")}
                      className="p-1 hover:bg-red-100 rounded-full transition"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                )}
              </label>

              {/* Business Proof */}
              <label className="block">
                <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-teal-500 transition-all">
                  <Calendar className="w-9 h-9 mx-auto mb-2" style={{ color: "#7C3AED" }} />
                  <p className="text-sm font-medium">Business Proof (1+ Year)</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Receipt, invoice, or bank statement
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFile("proof", e)}
                  />
                </div>
                {files.proof.name && (
                  <div className="mt-2 p-3 bg-teal-50 rounded-xl flex items-center justify-between">
                    <p className="text-xs text-green-700 font-medium">
                      {files.proof.name}
                    </p>
                    <button
                      onClick={() => removeFile("proof")}
                      className="p-1 hover:bg-red-100 rounded-full transition"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                )}
              </label>
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={!isStep2Complete}
              className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-50 shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: "#14B8A6" }}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 3: Submit */}
        {step === 3 && (
          <div className="text-center space-y-6">
            <CheckCircle className="w-20 h-20 mx-auto" style={{ color: "#14B8A6" }} />
            <h2 className="text-2xl font-bold" style={{ color: "#7C3AED" }}>
              Application Submitted!
            </h2>
            <p className="text-sm text-gray-600">
              We'll review your documents and notify you within 48 hours.
            </p>
            <button
              onClick={handleSubmit}
              className="w-full py-4 rounded-2xl font-bold text-white shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: "#14B8A6" }}
            >
              Done
            </button>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="flex justify-around py-2">
          <Link href="/" className="text-primary/60"><span className="text-xs">Home</span></Link>
          <Link href="/fashion" className="text-primary/60"><span className="text-xs">Shop</span></Link>
          <Link href="/cart" className="text-primary/60"><span className="text-xs">Cart</span></Link>
          <Link href="/wishlist" className="text-primary/60"><span className="text-xs">Wishlist</span></Link>
          <Link href="/account" className="text-primary font-bold"><span className="text-xs">Account</span></Link>
        </div>
      </div>
    </>
  );
}