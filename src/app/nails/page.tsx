// src/app/nails/page.tsx  ← FINAL NAILS PAGE (PURPLE-TEAL GRADIENT, IDENTICAL TO LASHES)

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, Clock, MapPin, MessageCircle, Calendar, Filter, Search, ChevronLeft, X, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";

const nailTechs = [
  {
    id: "temi",
    name: "Queen Nails by Temi",
    rating: 4.9,
    reviews: 189,
    responseTime: "8 mins",
    duration: "45–90 mins",
    price: "From ₦7,500",
    location: "Angola Hall Basement",
    img: "nails-vendor-1.jpg",
    verified: true,
    styles: 32,
  },
  {
    id: "glow",
    name: "Glow Studio",
    rating: 4.8,
    reviews: 143,
    responseTime: "12 mins",
    duration: "50–100 mins",
    price: "From ₦8,500",
    location: "Moremi Block C",
    img: "nails-vendor-2.jpg",
    verified: true,
    styles: 28,
  },
  {
    id: "nailbae",
    name: "Nail Bae OAU",
    rating: 4.7,
    reviews: 112,
    responseTime: "15 mins",
    duration: "40–80 mins",
    price: "From ₦6,000",
    location: "Fajuyi Hall",
    img: "nails-vendor-3.jpg",
    verified: false,
    styles: 19,
  },
  {
    id: "chrome",
    name: "Chrome Queen",
    rating: 4.9,
    reviews: 98,
    responseTime: "10 mins",
    duration: "60–120 mins",
    price: "From ₦9,000",
    location: "Postgraduate Hall",
    img: "nails-vendor-4.jpg",
    verified: true,
    styles: 26,
  },
];

export default function NailsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredTechs = useMemo(() => {
    return nailTechs.filter(tech =>
      tech.name.toLowerCase().includes(search.toLowerCase()) ||
      tech.location.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <>
      {/* TOP BAR */}
      <motion.div
        initial={{ y: -30 }}
        animate={{ y: 0 }}
        className="sticky top-0 bg-white/95 backdrop-blur-xl z-50 border-b shadow-sm"
      >
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-purple-100 rounded-full transition">
            <ChevronLeft className="w-7 h-7 text-purple-600" />
          </button>
          <Link href="/" className="relative w-32 h-12">
            <Image src="/images/logo-1.jpg" alt="StudEx" fill className="object-contain" priority />
          </Link>
          <div className="w-10" />
        </div>

        <h1 className="text-center text-3xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent pb-4">
          Nails
        </h1>

        {/* SEARCH + FILTER */}
        <div className="px-4 pb-4 flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search tech or hostel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
            />
          </div>
          <button onClick={() => setFilterOpen(true)} className="p-3.5 bg-gradient-to-r from-purple-100 to-teal-100 rounded-full">
            <Filter className="w-6 h-6 text-purple-600" />
          </button>
        </div>
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="px-6 pt-6 pb-32 space-y-8">

        {/* HERO BANNER — PURPLE TO TEAL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-teal-600 text-white rounded-3xl p-8 text-center shadow-2xl"
        >
          <h2 className="text-3xl font-black mb-3">Slay-Worthy Nails</h2>
          <p className="text-lg opacity-95">Chrome • 3D • Ombré • Same-day booking • Escrow protected</p>
        </motion.div>

        {/* TOP NAIL TECHS */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-600" />
              Top Nail Techs
            </h2>
            <span className="text-sm text-gray-600">{filteredTechs.length} available</span>
          </div>

          <div className="space-y-5">
            {filteredTechs.map((tech, i) => (
              <Link href={`/nails/${tech.id}`} key={tech.id}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden flex"
                >
                  {/* Image */}
                  <div className="relative w-32 h-40 flex-shrink-0">
                    <Image
                      src={`/images/${tech.img}`}
                      alt={tech.name}
                      fill
                      className="object-cover"
                    />
                    {tech.verified && (
                      <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-black px-2 py-1 rounded-full">
                        Verified
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-5 pr-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-black text-gray-900">{tech.name}</h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" /> {tech.location}
                      </p>

                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          <span className="font-bold">{tech.rating}</span>
                          <span className="text-gray-500">({tech.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-5 h-5 text-teal-600" />
                          <span>{tech.responseTime} reply</span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-4">
                        <span className="text-2xl font-black text-purple-600">{tech.price}</span>
                        <span className="text-sm text-grays-600">{tech.duration} • {tech.styles} styles</span>
                      </div>
                    </div>

                    {/* ACTION BUTTONS — PURPLE-TEAL GRADIENT */}
                    <div className="flex gap-3 mt-5">
                      <button className="flex-1 bg-gray-100 text-purple-600 font-black py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-purple-100 transition">
                        <MessageCircle className="w-5 h-5" /> Message
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-black py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition">
                        <Calendar className="w-5 h-5" /> Book Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* FILTER MODAL — PURPLE-TEAL */}
      {filterOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-end"
          onClick={() => setFilterOpen(false)}
        >
          <motion.div
            initial={{ y: 400 }}
            animate={{ y: 0 }}
            className="bg-white rounded-t-3xl p-8 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                Filters
              </h3>
              <button onClick={() => setFilterOpen(false)}>
                <X className="w-8 h-8" />
              </button>
            </div>
            <p className="text-center text-gray-600">Filters coming soon</p>
            <button className="w-full mt-8 py-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-black text-lg rounded-2xl">
              Apply Filters
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t z-50 shadow-2xl">
        <div className="flex justify-around py-3">
          <Link href="/" className="text-gray-500 text-xs">Home</Link>
          <Link href="/categories" className="text-gray-500 text-xs">Categories</Link>
          <Link href="/nails" className="text-purple-600 font-black text-sm">Nails</Link>
          <Link href="/bookings" className="text-gray-500 text-xs">Bookings</Link>
          <Link href="/account" className="text-gray-500 text-xs">Account</Link>
        </div>
      </div>
    </>
  );
}