// src/app/account/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Book,
  Layers,
  School,
  Heart,
  ShoppingBag,
  Store,
  Edit3,
  CheckCircle2,
  Lock,
  Save,
  ArrowLeft,
  Camera,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Profile {
  name: string;
  email: string;
  phone: string;
  department: string;
  level: string;
  school: string;
  campus: string;
  avatar: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    name: "John Doe",
    email: "johndoe@pau.edu.ng",  // ← PAU EMAIL
    phone: "+234 801 234 5678",
    department: "Computer Science",
    level: "400 Level",
    school: "Pan-Atlantic University",  // ← PAU
    campus: "Lekki Campus",  // ← PAU MAIN CAMPUS
    avatar: "",
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      const parsed = JSON.parse(saved);
      setProfile({
        ...profile,
        ...parsed,
        school: "Pan-Atlantic University",
        campus: parsed.campus || "Lekki Campus",
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setProfile(prev => ({ ...prev, avatar: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const removeAvatar = () => {
    setProfile(prev => ({ ...prev, avatar: "" }));
  };

  const saveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setIsEditing(false);
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };
  const cardHover = { whileHover: { y: -4, scale: 1.02 }, whileTap: { scale: 0.98 } };

  return (
    <>
      {/* TOP BAR — BIG LOGO */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white/80 backdrop-blur-xl z-40 border-b border-white/20 shadow-sm"
      >
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="text-purple-600 hover:bg-purple-50 p-2 rounded-full transition-all"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
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
            My Profile
          </h1>
        </div>
      </motion.div>

      <div className="p-6 pb-32 space-y-8">
        {/* PROFILE HEADER */}
        <motion.div {...fadeInUp} className="text-center">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-teal-100 shadow-xl">
              {profile.avatar ? (
                <Image
                  src={profile.avatar}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl font-black text-purple-600">
                  {profile.name[0]}
                </div>
              )}
            </div>

            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-purple-600 text-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-purple-700 transition-all">
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            )}

            {profile.avatar && isEditing && (
              <button
                onClick={removeAvatar}
                className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <h2 className="text-2xl font-black text-gray-800 mt-4">{profile.name}</h2>
          <p className="text-sm text-gray-600 flex items-center justify-center gap-1 mt-1">
            Verified PAU Student <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </p>
        </motion.div>

        {/* PERSONAL INFO — GLASS CARD */}
        <motion.div {...fadeInUp} className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30">
          <h3 className="text-lg font-black text-gray-800 mb-5 flex items-center justify-between">
            Personal Information
            {!isEditing && (
              <button
                onClick={toggleEdit}
                className="text-purple-600 hover:bg-purple-50 p-2 rounded-full transition-all"
              >
                <Edit3 className="w-5 h-5" />
              </button>
            )}
          </h3>

          <div className="space-y-5">
            {[
              { label: "Full Name", name: "name", icon: User },
              { label: "Student Email", name: "email", icon: Mail },
              { label: "Phone Number", name: "phone", icon: Phone },
              { label: "Department", name: "department", icon: Book },
              { label: "Level", name: "level", icon: Layers },
            ].map(({ label, name, icon: Icon }) => (
              <div key={name} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-teal-50 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600">{label}</p>
                  {isEditing ? (
                    <input
                      name={name}
                      value={profile[name as keyof Profile]}
                      onChange={handleChange}
                      className="w-full mt-1 p-3 rounded-xl border-2 focus:outline-none focus:ring-0 transition-all"
                      style={{ borderColor: profile[name as keyof Profile] ? "#7C3AED" : "#d1d5db" }}
                      {...(name === "email" ? { readOnly: true, style: { backgroundColor: "#f3f4f6", borderColor: "#9CA3AF" } } : {})}
                    />
                  ) : (
                    <p className="font-bold text-gray-800 mt-1">{profile[name as keyof Profile]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* STUDENT DETAILS */}
        <motion.div {...fadeInUp} className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30">
          <h3 className="text-lg font-black text-gray-800 mb-5">Student Details</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center">
                <School className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">School</p>
                <p className="font-bold text-gray-800">Pan-Atlantic University</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center">
                <Layers className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Campus</p>
                <p className="font-bold text-gray-800">{profile.campus}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* MARKETPLACE STATS */}
        <motion.div {...fadeInUp} className="grid grid-cols-3 gap-4">
          <motion.div {...cardHover} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-5 text-center shadow-md">
            <Store className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-black text-gray-800">12</p>
            <p className="text-xs text-gray-600">Sold</p>
          </motion.div>
          <motion.div {...cardHover} className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-5 text-center shadow-md">
            <ShoppingBag className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <p className="text-2xl font-black text-gray-800">5</p>
            <p className="text-xs text-gray-600">Bought</p>
          </motion.div>
          <motion.div {...cardHover} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-5 text-center shadow-md">
            <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <p className="text-2xl font-black text-gray-800">8</p>
            <p className="text-xs text-gray-600">Wishlist</p>
          </motion.div>
        </motion.div>

        {/* ACTION BUTTONS */}
        <motion.div {...fadeInUp} className="space-y-4">
          {isEditing ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={saveProfile}
              className="w-full py-5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleEdit}
              className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3"
            >
              <Edit3 className="w-5 h-5" />
              Edit Profile
            </motion.button>
          )}

          <Link href="/account/change-password" className="block">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 bg-white text-red-600 rounded-2xl font-black text-lg shadow-lg border-2 border-red-200 flex items-center justify-center gap-3"
            >
              <Lock className="w-5 h-5" />
              Change Password
            </motion.button>
          </Link>
        </motion.div>

        {/* FOOTER */}
        <motion.div {...fadeInUp} className="text-center text-xs text-gray-500 mt-8">
          <p>Member since 2025 • Campus: PAU • Version 1.0.0</p>
        </motion.div>
      </div>

      {/* BOTTOM NAV */}
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