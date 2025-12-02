// src/app/page.tsx  ← Your OFFICIAL, PREMIUM Landing Page
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Heart, MessageCircle, Shield, Zap, Users, Star, CheckCircle, TrendingUp, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/authStore";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    // Redirect logged-in users to home
    if (isLoggedIn) {
      router.push("/home");
    }
  }, [isLoggedIn, router]);

  // Show nothing while checking auth or if logged in
  if (!mounted || isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-teal-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-16 h-16 text-white" />
        </motion.div>
      </div>
    );
  }

  const particlePositions = Array.from({ length: 8 }, () => ({
    x: Math.random() * 100,
    delay: Math.random() * 5,
  }));

  return (
    <>
      {/* HERO SECTION - PREMIUM */}
      <section className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-teal-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full"
              initial={{ y: -100, x: `${pos.x}%`, opacity: 0.3 }}
              animate={{ y: "100vh", opacity: [0.3, 0.8, 0.3] }}
              transition={{
                duration: 15 + i * 2,
                delay: pos.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 mb-8"
          >
            <TrendingUp className="w-5 h-5 text-teal-400" />
            <span className="text-white font-bold text-sm">Nigeria's #1 Campus Marketplace</span>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-black text-white leading-tight mb-6"
          >
            Beauty Meets
            <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-teal-400 bg-clip-text text-transparent animate-gradient">
              Convenience
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-3xl text-white/95 mt-6 font-medium max-w-3xl mx-auto"
          >
            Book lashes, nails, makeup artists & barbers near you — fast, safe, and affordable.
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(168, 85, 247, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="group px-12 py-6 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-black text-2xl rounded-full shadow-2xl flex items-center gap-4"
              >
                Get Started Free
                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition" />
              </motion.button>
            </Link>
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white font-bold text-2xl rounded-full hover:bg-white/20 transition"
              >
                Sign In
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { value: "10K+", label: "Happy Students" },
              { value: "500+", label: "Verified Vendors" },
              { value: "4.9★", label: "Average Rating" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="text-center bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
              >
                <p className="text-4xl md:text-5xl font-black text-white">{stat.value}</p>
                <p className="text-sm md:text-base text-white/80 mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.p
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/70 font-medium"
          >
            Scroll to explore ↓
          </motion.p>
        </motion.div>
      </section>

      {/* FEATURES - PREMIUM DESIGN */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-600 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <Award className="w-16 h-16 text-purple-600" />
            </motion.div>
            <h2 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Why Choose StudEx?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The smartest way to find trusted services on campus
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: "Premium Vendors Only", desc: "Verified lash techs, barbers & makeup artists", color: "purple" },
              { icon: Shield, title: "Safe & Secure", desc: "Escrow payments — money held till job is done", color: "blue" },
              { icon: MessageCircle, title: "Chat & Bargain", desc: "Negotiate price directly with seller", color: "teal" },
              { icon: Zap, title: "Instant Booking", desc: "Book in 10 seconds, no back and forth", color: "yellow" },
              { icon: Heart, title: "Save Your Faves", desc: "Wishlist vendors you love", color: "pink" },
              { icon: Users, title: "Real Reviews", desc: "See what others are saying before booking", color: "green" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl transition border border-white"
              >
                <div className={`w-16 h-16 bg-gradient-to-r from-${feature.color}-100 to-${feature.color}-200 rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-10 h-10 text-${feature.color}-600`} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - PREMIUM */}
      <section className="py-32 bg-gradient-to-br from-purple-900 via-purple-800 to-teal-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-4 border-white rounded-full"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-6xl md:text-7xl font-black text-white mb-6"
          >
            They Love StudEx
          </motion.h2>
          <p className="text-xl text-white/80 mb-16 max-w-2xl mx-auto">
            Join thousands of happy students already booking services
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Chioma", text: "Finally found a lash tech that doesn't ghost! Booked same day", rating: 5, course: "Mass Comm" },
              { name: "David", text: "My barber now has 300+ bookings from here. Game changer!", rating: 5, course: "Engineering" },
              { name: "Aisha", text: "Got my birthday makeup done for 35k instead of 60k. Bargained sharp!", rating: 5, course: "Law" },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/10 backdrop-blur-2xl p-8 rounded-3xl border border-white/20 hover:bg-white/15 transition"
              >
                <div className="flex justify-center mb-6">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-7 h-7 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white text-xl italic mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-teal-600 rounded-full flex items-center justify-center text-white font-black">
                    {t.name[0]}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-black text-lg">{t.name}</p>
                    <p className="text-white/60 text-sm">{t.course} Student</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA - ULTRA PREMIUM */}
      <section className="py-40 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600 rounded-full blur-3xl"
          />
        </div>

        <div className="text-center px-6 relative z-10">
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="text-6xl md:text-8xl font-black text-white mb-6"
          >
            Ready to Glow Up?
          </motion.h2>
          <p className="text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
            Join 10,000+ Nigerian students already using StudEx
          </p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
          >
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 30px 80px rgba(168, 85, 247, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-20 py-10 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-black text-4xl rounded-full shadow-2xl flex items-center gap-6 mx-auto"
              >
                Start Booking Now
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-12 h-12" />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 flex items-center justify-center gap-6 flex-wrap"
          >
            {["No Credit Card Required", "100% Free", "Instant Access"].map((text, i) => (
              <div key={i} className="flex items-center gap-2 text-white/70">
                <CheckCircle className="w-5 h-5 text-teal-400" />
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FOOTER - PREMIUM */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <motion.p
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400 bg-clip-text text-transparent inline-block"
            >
              StudEx • Made in Nigeria 🇳🇬
            </motion.p>
          </div>
          <div className="flex justify-center gap-8 mb-8 text-sm">
            <Link href="/terms" className="text-white/60 hover:text-white transition">Terms</Link>
            <Link href="/privacy" className="text-white/60 hover:text-white transition">Privacy</Link>
            <Link href="/contact" className="text-white/60 hover:text-white transition">Contact</Link>
          </div>
          <p className="text-white/40 text-center text-sm">© 2025 StudEx. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}