// src/app/seller/onboarding/page.tsx
"use client";

import { Store, ChevronRight, CheckCircle, Upload, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SellerOnboarding() {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState({ id: null, jamb: null, proof: null });
  const router = useRouter();

  const handleFile = (type: string, e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFiles({ ...files, [type]: file.name });
    }
  };

  const handleSubmit = () => {
    // Save to localStorage (later: send to backend)
    const application = {
      status: "pending",
      submittedAt: new Date().toISOString(),
      files: Object.fromEntries(Object.entries(files).filter(([_, v]) => v)),
    };
    localStorage.setItem("sellerApplication", JSON.stringify(application));
    localStorage.setItem("isSellerPending", "true");
    router.push("/account");
  };

  return (
    <>
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
        <div className="flex justify-center mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                i <= step ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {i < step ? <CheckCircle className="w-5 h-5" /> : i}
            </div>
          ))}
        </div>

        {/* Step 1: Intro */}
        {step === 1 && (
          <div className="text-center space-y-6">
            <Store className="w-20 h-20 mx-auto" style={{ color: "#7C3AED" }} />
            <h2 className="text-2xl font-bold" style={{ color: "#7C3AED" }}>Become a Verified Seller</h2>
            <p className="text-sm text-gray-600">Submit documents for approval. We'll review in 24-48 hours.</p>
            <button
              onClick={() => setStep(2)}
              className="w-full py-4 rounded-2xl font-bold text-white"
              style={{ backgroundColor: "#14B8A6" }}
            >
              Start Application
            </button>
          </div>
        )}

        {/* Step 2: Upload Documents */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold" style={{ color: "#7C3AED" }}>Upload Documents</h2>

            <div className="space-y-4">
              <label className="block">
                <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-teal-500 transition">
                  <FileText className="w-8 h-8 mx-auto mb-2" style={{ color: "#7C3AED" }} />
                  <p className="text-sm">LASU Student ID</p>
                  <input type="file" className="hidden" accept=".pdf,.jpg,.png" onChange={(e) => handleFile("id", e)} />
                </div>
                {files.id && <p className="text-xs text-green-600 mt-1">Uploaded: {files.id}</p>}
              </label>

              <label className="block">
                <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-teal-500 transition">
                  <FileText className="w-8 h-8 mx-auto mb-2" style={{ color: "#7C3AED" }} />
                  <p className="text-sm">JAMB Admission Letter</p>
                  <input type="file" className="hidden" accept=".pdf,.jpg,.png" onChange={(e) => handleFile("jamb", e)} />
                </div>
                {files.jamb && <p className="text-xs text-green-600 mt-1">Uploaded: {files.jamb}</p>}
              </label>

              <label className="block">
                <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-teal-500 transition">
                  <Calendar className="w-8 h-8 mx-auto mb-2" style={{ color: "#7C3AED" }} />
                  <p className="text-sm">Business Proof (1+ Year)</p>
                  <p className="text-xs text-gray-500">Receipt, invoice, or bank statement</p>
                  <input type="file" className="hidden" accept=".pdf,.jpg,.png" onChange={(e) => handleFile("proof", e)} />
                </div>
                {files.proof && <p className="text-xs text-green-600 mt-1">Uploaded: {files.proof}</p>}
              </label>
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={!files.id || !files.jamb || !files.proof}
              className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-50"
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
            <h2 className="text-2xl font-bold" style={{ color: "#7C3AED" }}>Application Submitted!</h2>
            <p className="text-sm text-gray-600">We'll review your documents and notify you within 48 hours.</p>
            <button
              onClick={handleSubmit}
              className="w-full py-4 rounded-2xl font-bold text-white"
              style={{ backgroundColor: "#14B8A6" }}
            >
              Done
            </button>
          </div>
        )}
      </div>

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