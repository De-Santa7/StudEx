// src/app/makeup/[id]/page.tsx  ← MAKEUP ARTIST PROFILE (GOD-TIER STUDEx 2.0)

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Star, MapPin, Clock, MessageCircle, Calendar, CheckCircle, Shield, ChevronLeft, Send } from "lucide-react";
import { useState } from "react";

const artists: Record<string, any> = {
  zara: {
    id: "zara",
    name: "Zara Glam",
    rating: 4.9,
    reviews: 612,
    responseTime: "7 mins",
    price: "From ₦12,000",
    location: "Moremi Hall",
    verified: true,
    img: "makeup-1.jpg",
    bio: "Your go-to for soft glam, editorial beats & bridal looks. 4+ years on campus. Same-day glam available!",
    skills: ["Soft Glam", "Editorial", "Bridal", "Cut Crease", "Fox Eye", "Smokey", "No-Makeup Makeup", "Full Glam"],
    portfolio: ["zara-1.jpg", "zara-2.jpg", "zara-3.jpg", "zara-4.jpg", "zara-5.jpg", "zara-6.jpg"],
    duration: "45–120 mins",
    availability: "Mon–Sun, 8AM–10PM",
  },
  deola: {
    id: "deola",
    name: "Deola Beauty",
    rating: 4.8,
    reviews: 489,
    responseTime: "10 mins",
    price: "From ₦15,000",
    location: "Angola Hall",
    verified: true,
    img: "makeup-2.jpg",
    bio: "Specializing in rich skin tones, bold colors & long-lasting beats. Seen on OAU pageant queens.",
    skills: ["Bold Glam", "Rich Skin", "Pageant", "Sunset Eyes", "Graphic Liner", "Dramatic Lashes"],
    portfolio: ["deola-1.jpg", "deola-2.jpg", "deola-3.jpg", "deola-4.jpg"],
  },
  // Add more later
};

export default function MakeupArtistProfile() {
  const router = useRouter();
  const { id } = useParams();
  const artistId = Array.isArray(id) ? id[0] : id;
  const artist = artists[artistId] || artists.zara;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, message]);
    setMessage("");
    setTimeout(() => {
      const lastMsg = document.getElementById(`msg-${messages.length}`);
      lastMsg?.classList.add("seen");
    }, 1500);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pb-32">

        {/* TOP BAR */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-2xl z-50 border-b">
          <div className="flex items-center justify-between p-4">
            <button onClick={() => router.back()} className="p-3 hover:bg-purple-100 rounded-full transition active:scale-95">
              <ChevronLeft className="w-8 h-8 text-purple-700" />
            </button>
            <h1 className="text-xl font-black text-gray-900">{artist.name}</h1>
            <div className="w-12" />
          </div>
        </div>

        {/* HERO IMAGE + BADGES */}
        <div className="relative h-80">
          <Image src={`/images/${artist.img}`} alt={artist.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {artist.responseTime.includes("7") && (
            <div className="absolute top-8 right-6 bg-green-500 text-white font-black px-5 py-2 rounded-full shadow-2xl animate-pulse text-sm">
              Same Day Available
            </div>
          )}

          {artist.id === "zara" && (
            <div className="absolute top-20 left-6 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-black px-5 py-2 rounded-full shadow-2xl rotate-12 text-sm">
              #1 on Campus
            </div>
          )}

          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-black drop-shadow-2xl">{artist.name}</h1>
            {artist.verified && (
              <div className="flex items-center gap-2 mt-2">
                <CheckCircle className="w-7 h-7 text-blue-400 drop-shadow-lg" />
                <span className="font-black text-lg">Verified Artist</span>
              </div>
            )}
          </div>
        </div>

        {/* STATS CARD */}
        <div className="px-6 -mt-10 relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-6 border-2 border-purple-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Star className="w-9 h-9 text-yellow-500 fill-current" />
                <div>
                  <span className="text-3xl font-black">{artist.rating}</span>
                  <span className="text-gray-600 ml-2">({artist.reviews} reviews)</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-purple-600">{artist.price}</p>
                <p className="text-sm text-gray-600">Starting price</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-purple-600" />
                <span className="font-bold">{artist.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-teal-600" />
                <span className="font-bold">Replies in {artist.responseTime}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="px-6 mt-8 space-y-8">

          {/* ABOUT */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <h2 className="text-2xl font-black mb-4">About</h2>
            <p className="text-gray-700 text-lg leading-relaxed">{artist.bio}</p>
          </motion.div>

          {/* SKILLS */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <h2 className="text-2xl font-black mb-4">Looks & Specialties</h2>
            <div className="flex flex-wrap gap-3">
              {artist.skills.map((skill: string) => (
                <span key={skill} className="px-6 py-3 bg-gradient-to-r from-purple-100 to-teal-100 text-purple-700 font-black rounded-full text-sm shadow-md">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* PORTFOLIO */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <h2 className="text-2xl font-black mb-4">Portfolio</h2>
            <div className="grid grid-cols-3 gap-3">
              {artist.portfolio.map((img: string, i: number) => (
                <div key={i} className="relative aspect-square rounded-2xl overflow-hidden shadow-xl ring-2 ring-purple-100">
                  <Image src={`/images/${img}`} alt="Beat" fill className="object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA BUTTONS */}
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="space-y-4">
            <Link href={`/makeup/${artistId}/book`}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="w-full py-6 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-black text-2xl rounded-3xl shadow-2xl flex items-center justify-center gap-4"
              >
                <Calendar className="w-9 h-9" /> Book Makeup Now
              </motion.button>
            </Link>

            <button className="w-full py-5 border-4 border-purple-300 text-purple-700 font-black text-xl rounded-3xl hover:bg-purple-50 transition">
              <MessageCircle className="w-7 h-7 inline mr-2" /> Chat with {artist.name.split(" ")[0]}
            </button>
          </motion.div>

          {/* ESCROW TRUST */}
          <div className="bg-gradient-to-r from-purple-50 to-teal-50 rounded-3xl p-6 text-center border-2 border-purple-200">
            <Shield className="w-14 h-14 text-purple-600 mx-auto mb-3" />
            <p className="font-black text-xl">100% Escrow Protected</p>
            <p className="text-gray-700 mt-1">You only pay when you say “PERFECT”</p>
          </div>

          {/* IN-PAGE CHAT */}
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-purple-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-teal-600 text-white p-6">
              <h3 className="text-xl font-black">Quick Chat</h3>
              <p className="text-sm opacity-90">Ask about look, skin tone, event type — replies fast</p>
            </div>

            <div className="h-64 overflow-y-auto p-5 space-y-4">
              {messages.length === 0 ? (
                <p className="text-center text-gray-400 mt-20 text-lg">Say hi and book your beat</p>
              ) : (
                messages.map((msg, i) => (
                  <div key={i} id={`msg-${i}`} className="flex justify-end">
                    <div className="bg-gradient-to-r from-purple-600 to-teal-600 text-white rounded-3xl rounded-br-none px-6 py-4 max-w-xs shadow-lg">
                      {msg}
                      <p className="text-xs opacity-70 text-right mt-1">Seen</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="e.g. Hi Zara! Can you do soft glam for dinner tomorrow?"
                  className="flex-1 bg-white border-2 border-purple-200 rounded-full px-6 py-4 focus:outline-none focus:border-purple-500 transition"
                />
                <button onClick={sendMessage} className="w-14 h-14 bg-gradient-to-r from-purple-600 to-teal-600 rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition">
                  <Send className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

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
      </div>
    </>
  );
}