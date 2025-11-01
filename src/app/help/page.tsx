"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        {/* ===== Header ===== */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-purple-600">Help & Support</h1>
          <p className="text-gray-500 mt-2">
            Need assistance? We're here to help you with anything related to your StudEx account.
          </p>
        </div>

        {/* ===== Support Options ===== */}
        <div className="border border-gray-200 rounded-lg p-8 shadow-sm bg-gray-50 space-y-6">
          <div className="flex items-center gap-3">
            <Mail size={20} className="text-purple-600" />
            <div>
              <p className="font-semibold text-gray-800">Email Support</p>
              <p className="text-sm text-gray-500">support@studex.com</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={20} className="text-teal-600" />
            <div>
              <p className="font-semibold text-gray-800">Call Us</p>
              <p className="text-sm text-gray-500">+234 800 123 4567</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MessageCircle size={20} className="text-purple-600" />
            <div>
              <p className="font-semibold text-gray-800">WhatsApp Support</p>
              <p className="text-sm text-gray-500">+234 812 345 6789</p>
            </div>
          </div>

          <div className="pt-4">
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold">
              Contact Support
            </Button>
          </div>
        </div>

        {/* ===== Footer Info ===== */}
        <div className="mt-10 border-t pt-6 text-center text-gray-500 text-sm">
          StudEx Support • Available 24/7 • Version 1.0.0
        </div>
      </motion.div>
    </main>
  );
}
