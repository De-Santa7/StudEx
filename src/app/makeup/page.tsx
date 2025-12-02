// src/app/makeup/page.tsx  ← MAKEUP CATEGORY PAGE (PERFECT STUDEx 2.0)

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, Clock, MapPin, MessageCircle, Calendar, Filter, Search, ChevronLeft, X, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";

const makeupArtists = [
  {
    id: "zara",
    name: "Zara Glam",
    rating: 4.9,
    reviews: 267,
    responseTime: "7 mins",
    duration: "45–120 mins",
    price: "From ₦12,000",
    location: "Moremi Hall",
    img: "makeup-1.jpg",
    verified: true,
    styles: 28,
  },
  {
    id: "deola",
    name: "Deola Beauty",
    rating: 4.8,
    reviews: 198,
    responseTime: "10 mins",
    duration: "60–150 mins",
    price: "From ₦15,000",
    location: "Angola Hall",
    img: "makeup-2.jpg",
    verified: true,
    styles: 34,
  },
  {
    id: "mide",
    name: "Mide Facebeat",
    rating: 4.7,
    reviews: 176,
    responseTime: "12 mins",
    duration: "50–130 mins",
    price: "From ₦10,000",
    location: "Fajuyi Hall",
    img: "makeup-3.jpg",
    verified: false,
    styles: 25,
  },
  {
    id: "lola",
    name: "Lola Luxe",
    rating: 4.9,
    reviews: 154,
    responseTime: "9 mins",
    duration: "70–160 mins",
    price: "From ₦18,000",
    location: "Postgraduate Hall",
    img: "makeup-4.jpg",
    verified: true,
    styles: 30,
  },
];

export default function MakeupPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredArtists = useMemo(() => {
    return makeupArtists.filter(artist =>
      artist.name.toLowerCase().includes(search.toLowerCase()) ||
      artist.location.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <>
      {/* TOP BAR */}
      <motion.div initial={{ y: -30 }} animate={{ y: 0 }} className="sticky top-0 bg-white/95 backdrop-blur-xl z-50 border-b shadow-sm">
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
          Makeup
        </h1>

        <div className="px-4 pb-4 flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search artist or hostel..."
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

      <div className="px-6 pt-6 pb-32 space-y-8">

        {/* HERO BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-teal-600 text-white rounded-3xl p-8 text-center shadow-2xl"
        >
          <h2 className="text-3xl font-black mb-3">Beat That Slays</h2>
          <p className="text-lg opacity-95">Glam • Soft • Editorial • Same-day available • Escrow safe</p>
        </motion.div>

        {/* TOP ARTISTS */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-600" />
              Top Makeup Artists
            </h2>
            <span className="text-sm text-gray-600">{filteredArtists.length} available</span>
          </div>

          <div className="space-y-5">
            {filteredArtists.map((artist, i) => (
              <Link href={`/makeup/${artist.id}`} key={artist.id}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden flex"
                >
                  <div className="relative w-32 h-40 flex-shrink-0">
                    <Image src={`/images/${artist.img}`} alt={artist.name} fill className="object-cover" />
                    {artist.verified && (
                      <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-black px-2 py-1 rounded-full">
                        Verified
                      </div>
                    )}
                  </div>

                  <div className="flex-1 p-5 pr-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-black text-gray-900">{artist.name}</h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" /> {artist.location}
                      </p>

                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          <span className="font-bold">{artist.rating}</span>
                          <span className="text-gray-500">({artist.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-5 h-5 text-teal-600" />
                          <span>{artist.responseTime} reply</span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-4">
                        <span className="text-2xl font-black text-purple-600">{artist.price}</span>
                        <span className="text-sm text-gray-600">{artist.duration} • {artist.styles} looks</span>
                      </div>
                    </div>

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

      {/* FILTER MODAL */}
      {filterOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/60 z-50 flex items-end" onClick={() => setFilterOpen(false)}>
          <motion.div initial={{ y: 400 }} animate={{ y: 0 }} className="bg-white rounded-t-3xl p-8 w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">Filters</h3>
              <button onClick={() => setFilterOpen(false)}><X className="w-8 h-8" /></button>
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
          <Link href="/makeup" className="text-purple-600 font-black text-sm">Makeup</Link>
          <Link href="/bookings" className="text-gray-500 text-xs">Bookings</Link>
          <Link href="/account" className="text-gray-500 text-xs">Account</Link>
        </div>
      </div>
    </>
  );
}