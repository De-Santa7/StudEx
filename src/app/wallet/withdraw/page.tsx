// src/app/wallet/withdraw/page.tsx
"use client";

import { ArrowLeft, Send, AlertCircle, CheckCircle, Loader, X } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WithdrawPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [bankSearchInput, setBankSearchInput] = useState("");
  
  const [formData, setFormData] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    amount: "",
  });

  const [verification, setVerification] = useState({
    status: null as "pending" | "verified" | "invalid" | null,
    verifiedName: "",
    verifiedBank: "",
  });

  useEffect(() => {
    const balance = localStorage.getItem("walletBalance");
    setWalletBalance(balance ? parseFloat(balance) : 0);
  }, []);

  const banks = [
    "GTBank",
    "Access Bank",
    "UBA",
    "First Bank",
    "Zenith Bank",
    "Fidelity Bank",
    "Wema Bank",
    "Polaris Bank",
    "Ecobank",
    "FCMB",
    "Unity Bank",
    "Stanbic Bank",
    "Guaranty Trust Bank",
    "Diamond Bank",
    "Heritage Bank",
  ];

  // Filter banks based on search input
  const filteredBanks = banks.filter(bank =>
    bank.toLowerCase().includes(bankSearchInput.toLowerCase())
  );

  const handleBankSelect = (bank: string) => {
    setFormData(prev => ({ ...prev, bankName: bank }));
    setBankSearchInput("");
    setShowBankDropdown(false);
    setErrorMessage("");
    setVerification({ status: null, verifiedName: "", verifiedBank: "" });
  };

  const handleBankInputChange = (value: string) => {
    setBankSearchInput(value);
    setFormData(prev => ({ ...prev, bankName: value }));
    setShowBankDropdown(true);
    setErrorMessage("");
    setVerification({ status: null, verifiedName: "", verifiedBank: "" });
  };

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, accountNumber: value }));
    setErrorMessage("");
    
    // Auto-verify when account number reaches 10 digits
    if (value.length === 10 && formData.bankName) {
      verifyBankAccount(value, formData.bankName);
    } else if (value.length < 10) {
      setVerification({ status: null, verifiedName: "", verifiedBank: "" });
      setFormData(prev => ({ ...prev, accountName: "" }));
    }
  };

  // Mock bank verification data
  const mockBankAccounts: Record<string, Record<string, { name: string; valid: boolean }>> = {
    "GTBank": {
      "1234567890": { name: "Amara Johnson", valid: true },
      "1234567891": { name: "Chinedu Okafor", valid: true },
      "1234567892": { name: "Tunde Ahmed", valid: true },
      "9999999999": { name: "Invalid Account", valid: false },
    },
    "Access Bank": {
      "0987654321": { name: "Zainab Hassan", valid: true },
      "0987654322": { name: "Grace Obi", valid: true },
      "1111111111": { name: "Test User", valid: false },
    },
    "UBA": {
      "1122334455": { name: "Blessing Nwosu", valid: true },
      "1122334456": { name: "Fatima Yusuf", valid: true },
      "2222222222": { name: "Invalid Account", valid: false },
    },
    "First Bank": {
      "5566778899": { name: "Ikechukwu Eze", valid: true },
      "5566778800": { name: "Aisha Mohammed", valid: true },
      "3333333333": { name: "Invalid Account", valid: false },
    },
    "Zenith Bank": {
      "4433221100": { name: "Chioma Okonkwo", valid: true },
      "4433221101": { name: "Segun Adeyemi", valid: true },
      "4444444444": { name: "Invalid Account", valid: false },
    },
  };

  // Simulate bank API call to verify account
  const verifyBankAccount = async (accountNumber: string, bankName: string) => {
    setVerifying(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const bankAccounts = mockBankAccounts[bankName];
    
    if (!bankAccounts) {
      // For banks not in mock data, accept any 10-digit account number
      setVerification({
        status: "verified",
        verifiedName: user?.name || "Account Holder",
        verifiedBank: bankName,
      });
      setFormData(prev => ({ ...prev, accountName: user?.name || "Account Holder" }));
      setErrorMessage("");
    } else {
      const accountData = bankAccounts[accountNumber];

      if (accountData && accountData.valid) {
        setVerification({
          status: "verified",
          verifiedName: accountData.name,
          verifiedBank: bankName,
        });
        setFormData(prev => ({ ...prev, accountName: accountData.name }));
        setErrorMessage("");
      } else {
        setVerification({
          status: "invalid",
          verifiedName: "",
          verifiedBank: "",
        });
        setFormData(prev => ({ ...prev, accountName: "" }));
        setErrorMessage("Invalid account details. This account number doesn't match our bank records.");
      }
    }

    setVerifying(false);
  };

  const validateForm = () => {
    if (!formData.accountName.trim()) {
      setErrorMessage("Account holder name is required");
      return false;
    }
    if (!formData.accountNumber.trim()) {
      setErrorMessage("Account number is required");
      return false;
    }
    if (formData.accountNumber.length !== 10) {
      setErrorMessage("Account number must be exactly 10 digits");
      return false;
    }
    if (!formData.bankName) {
      setErrorMessage("Please select or enter a bank");
      return false;
    }
    if (verification.status !== "verified") {
      setErrorMessage("Please verify your account details first");
      return false;
    }
    if (!formData.amount) {
      setErrorMessage("Amount is required");
      return false;
    }
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      setErrorMessage("Please enter a valid amount");
      return false;
    }
    if (amount > walletBalance) {
      setErrorMessage(`Insufficient balance. Your balance is ₦${walletBalance.toLocaleString()}`);
      return false;
    }
    if (amount < 500) {
      setErrorMessage("Minimum withdrawal amount is ₦500");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const amount = parseFloat(formData.amount);
      const newBalance = walletBalance - amount;
      
      // Update wallet balance
      localStorage.setItem("walletBalance", newBalance.toString());
      
      // Save withdrawal history
      const withdrawalHistory = JSON.parse(localStorage.getItem("withdrawalHistory") || "[]");
      withdrawalHistory.unshift({
        id: Date.now(),
        amount,
        accountName: formData.accountName,
        accountNumber: formData.accountNumber.slice(-4),
        bankName: formData.bankName,
        status: "pending",
        date: new Date().toISOString(),
        userEmail: user?.email,
      });
      localStorage.setItem("withdrawalHistory", JSON.stringify(withdrawalHistory));
      
      setSuccessMessage(`Withdrawal of ₦${amount.toLocaleString()} initiated successfully! Processing time: 24-48 hours`);
      
      setTimeout(() => {
        setFormData({ accountName: "", accountNumber: "", bankName: "", amount: "" });
        setVerification({ status: null, verifiedName: "", verifiedBank: "" });
        router.push("/wallet/history");
      }, 2000);
      
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      {/* TOP BAR */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white/90 backdrop-blur-xl z-40 border-b border-purple-100 shadow-sm"
      >
        <div className="flex items-center justify-between p-4 max-w-2xl mx-auto">
          <Link href="/account" className="flex items-center gap-2 text-purple-600 hover:text-purple-700">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </Link>
          <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
            Withdraw Funds
          </h1>
          <div className="w-10" />
        </div>
      </motion.div>

      <div className="p-4 pb-24 max-w-2xl mx-auto">
        {/* BALANCE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-600 via-purple-500 to-teal-500 rounded-2xl p-6 text-white shadow-2xl mb-6"
        >
          <p className="text-sm opacity-90 font-semibold mb-2">Available Balance</p>
          <p className="text-3xl font-black">₦{walletBalance.toLocaleString()}</p>
        </motion.div>

        {/* SUCCESS MESSAGE */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-4 flex gap-3 mb-6"
          >
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-green-800 text-sm">{successMessage}</p>
            </div>
          </motion.div>
        )}

        {/* ERROR MESSAGE */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3 mb-6"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="font-semibold text-red-800 text-sm">{errorMessage}</p>
          </motion.div>
        )}

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Bank Selection - Searchable */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Bank Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search or type bank name..."
                value={bankSearchInput || formData.bankName}
                onChange={(e) => handleBankInputChange(e.target.value)}
                onFocus={() => setShowBankDropdown(true)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                disabled={loading || verifying}
              />
              
              {formData.bankName && !showBankDropdown && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, bankName: "" }));
                    setBankSearchInput("");
                    setVerification({ status: null, verifiedName: "", verifiedBank: "" });
                  }}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Dropdown */}
              {showBankDropdown && filteredBanks.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto"
                >
                  {filteredBanks.map(bank => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => handleBankSelect(bank)}
                      className="w-full text-left px-4 py-3 hover:bg-purple-50 border-b border-gray-100 last:border-b-0 transition font-semibold text-gray-800"
                    >
                      {bank}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Type to search or enter any bank name</p>
          </div>

          {/* Account Number - Auto Verify */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Account Number
            </label>
            <div className="relative">
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleAccountNumberChange}
                placeholder="Enter your 10-digit account number"
                maxLength={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                disabled={loading || verifying || !formData.bankName}
              />
              
              {verifying && formData.accountNumber.length === 10 && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="absolute right-3 top-3"
                >
                  <Loader className="w-5 h-5 text-teal-600" />
                </motion.div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Account verification happens automatically</p>
          </div>

          {/* VERIFICATION RESULT */}
          {verification.status === "verified" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border-2 border-green-300 rounded-2xl p-4"
            >
              <div className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-green-800 text-sm mb-2">Account Verified ✓</p>
                  <div className="bg-white rounded-lg p-3 space-y-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Account Holder:</span> {verification.verifiedName}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Bank:</span> {verification.verifiedBank}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Account Number:</span> {formData.accountNumber.slice(0, 2)}****{formData.accountNumber.slice(-2)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {verification.status === "invalid" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border-2 border-red-300 rounded-2xl p-4"
            >
              <div className="flex gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-red-800 text-sm">Account Verification Failed ✗</p>
                  <p className="text-xs text-red-700 mt-1">
                    Invalid account details. Please check and try again.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* WITHDRAWAL AMOUNT - only show if verified */}
          {verification.status === "verified" && (
            <>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Withdrawal Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-2xl font-bold text-gray-600">₦</span>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="0"
                    min="500"
                    max={walletBalance}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                    disabled={loading}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum: ₦500 | Maximum: ₦{walletBalance.toLocaleString()}</p>
              </div>

              {/* INFO BOX */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-xs text-blue-800">
                  <span className="font-bold">Processing Time:</span> Withdrawals typically take 24-48 hours to reflect in your bank account. You will receive a confirmation email once the transfer is complete.
                </p>
              </div>

              {/* SUBMIT BUTTON */}
              <motion.button
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-teal-500 text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Send className="w-5 h-5" />
                    </motion.div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Withdraw Now
                  </>
                )}
              </motion.button>
            </>
          )}
        </motion.form>

        {/* SECURITY NOTE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200"
        >
          <p className="text-xs text-gray-600">
            <span className="font-bold">🔒 Security:</span> Your bank details are verified and encrypted. All withdrawals are processed securely.
          </p>
        </motion.div>
      </div>
    </>
  );
}