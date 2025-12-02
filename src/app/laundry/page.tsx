// src/app/laundry/page.tsx  ← FINAL FIXED VERSION (NO MORE ERRORS)

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Shirt, Truck, Clock, Star, Search, ChevronLeft, 
  Sparkles, Package, Zap, ShieldCheck, MapPin  // ← MapPin added here
} from "lucide-react";
import { useState, useMemo } from "react";

const laundryVendors = [
  {
    id: "freshfold",
    name: "FreshFold OAU",
    rating: 4.9,
    reviews: 892,
    responseTime: "12 mins",
    turnaround: "24–48 hrs",
    price: "From ₦3,000",
    location: "Moremi Hall Basement",
    img: "laundry-vendor-1.jpg",
    verified: true,
    express: true,
    bookings: 1200,
  },
  {
    id: "pressking",
    name: "PressKing Laundry",
    rating: 4.9,
    reviews: 756,
    responseTime: "15 mins",
    turnaround: "24–36 hrs",
    price: "From ₦4,000",
    location: "SUB Gate",
    img: "laundry-vendor-4.jpg",
    verified: true,
    express: true,
    bookings: 1100,
  },
  {
    id: "cleanqueen",
    name: "CleanQueen",
    rating: 4.8,
    reviews: 643,
    responseTime: "18 mins",
    turnaround: "36–48 hrs",
    price: "From ₦2,500",
    location: "Angola Hall",
    img: "laundry-vendor-2.jpg",
    verified: true,
    express: false,
    bookings: 980,
  },
  {
    id: "spinglow",
    name: "Spin & Glow",
    rating: 4.7,
    reviews: 521,
    responseTime: "20 mins",
    turnaround: "36–72 hrs",
    price: "From ₦3,500",
    location: "Fajuyi Hall",
    img: "laundry-vendor-3.jpg",
    verified: false,
    express: false,
    bookings: 850,
  },
];

export default function LaundryPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredVendors = useMemo(() => {
    return laundryVendors.filter(vendor =>
      vendor.name.toLowerCase().includes(search.toLowerCase()) ||
      vendor.location.toLowerCase().includes(search.toLowerCase())
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

        <h1 className="text-center text-3xl font-black bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent pb-4 flex items-center justify-center gap-3">
          <Shirt className="w-9 h-9" />
          Laundry
        </h1>

        <div className="px-4 pb-4 flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search laundry or hostel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-300 transition"
            />
          </div>
        </div>
      </motion.div>

      <div className="px-6 pt-6 pb-32 space-y-8">

        {/* HERO BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-teal-600 text-white rounded-3xl p-8 text-center shadow-2xl"
        >
          <h2 className="text-3xl font-black mb-3">Fresh Clothes, Zero Stress</h2>
          <p className="text-lg opacity-95">Pickup • Wash • Fold • Deliver • Escrow Protected</p>
          <div className="flex justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full">
              <Truck className="w-5 h-5" /> Free Pickup
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full">
              <Zap className="w-5 h-5" /> Express 24hr Available
            </div>
          </div>
        </motion.div>

        {/* TOP LAUNDRY SERVICES */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-600" />
              Top Laundry Services
            </h2>
            <span className="text-sm text-gray-600">{filteredVendors.length} active</span>
          </div>

          <div className="space-y-5">
            {filteredVendors.map((vendor, i) => (
              <Link href={`/laundry/${vendor.id}`} key={vendor.id}>
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
                      src={`/images/${vendor.img}`}
                      alt={vendor.name}
                      fill
                      className="object-cover"
                    />
                    {vendor.verified && (
                      <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-black px-2 py-1 rounded-full">
                        Verified
                      </div>
                    )}
                    {vendor.express && (
                      <div className="absolute top-12 left-3 bg-orange-500 text-white text-xs font-black px-2 py-1 rounded-full animate-pulse">
                        24hr Express
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-5 pr-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-black text-gray-900">{vendor.name}</h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" /> {vendor.location}
                      </p>

                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          <span className="font-bold">{vendor.rating}</span>
                          <span className="text-gray-500">({vendor.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-5 h-5 text-teal-600" />
                          <span>{vendor.responseTime} reply</span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-black text-purple-600">{vendor.price}</span>
                          <p className="text-xs text-gray-600">{vendor.turnaround}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Booked</p>
                          <p className="text-lg font-black text-teal-600">{vendor.bookings}+ times</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-5">
                      <button className="flex-1 bg-gray-100 text-purple-600 font-black py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-purple-100 transition">
                        <Package className="w-5 h-5" /> View Prices
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-black py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition">
                        <Truck className="w-5 h-5" /> Book Pickup
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        <div className="bg-gradient-to-r from-purple-50 to-teal-50 rounded-3xl p-6 text-center border-2 border-purple-200">
          <ShieldCheck className="w-14 h-14 text-purple-600 mx-auto mb-3" />
          <p className="font-black text-xl">100% Escrow Protected</p>
          <p className="text-gray-700 mt-1">Pay only when your clothes come back fresh & perfect</p>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t z-50 shadow-2xl">
        <div className="flex justify-around py-3">
          <Link href="/" className="text-gray-500 text-xs">Home</Link>
          <Link href="/categories" className="text-gray-500 text-xs">Categories</Link>
          <Link href="/laundry" className="text-purple-600 font-black text-sm">Laundry</Link>
          <Link href="/bookings" className="text-gray-500 text-xs">Bookings</Link>
          <Link href="/account" className="text-gray-500 text-xs">Account</Link>
        </div>
      </div>
    </>
  );
}