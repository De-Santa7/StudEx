"use client";

import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddressBookPage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@school.edu.ng",
    phone: "+234 801 234 5678",
    department: "Computer Science",
    level: "400 Level",
    school: "University of Nigeria, Nsukka",
    campus: "Main Campus",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  const saveProfile = () => {
    setIsEditing(false);
    alert("✅ Profile updated successfully!");
  };

  return (
    <main className="min-h-screen bg-white text-gray-800 px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        {/* ===== Profile Header ===== */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-teal-500 flex items-center justify-center text-white text-4xl font-semibold shadow-md">
              {profile.name[0]}
            </div>
            <button
              onClick={toggleEdit}
              className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition"
            >
              <Edit3 size={16} />
            </button>
          </div>

          <h2 className="text-2xl font-bold text-purple-600">{profile.name}</h2>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Verified Student <CheckCircle2 size={14} className="text-teal-500" />
          </p>
        </div>

        {/* ===== Editable Profile Info ===== */}
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm bg-gray-50">
          <h3 className="text-lg font-semibold text-purple-600 mb-4">
            Personal Information
          </h3>

          <div className="space-y-4">
            {[
              { label: "Full Name", name: "name", icon: User },
              { label: "Student Email", name: "email", icon: Mail },
              { label: "Phone Number", name: "phone", icon: Phone },
              { label: "Department", name: "department", icon: Book },
              { label: "Level", name: "level", icon: Layers },
            ].map(({ label, name, icon: Icon }) => (
              <div key={name} className="flex items-center gap-3">
                <Icon size={18} className="text-teal-500" />
                {isEditing ? (
                  <Input
                    name={name}
                    value={profile[name as keyof typeof profile]}
                    onChange={handleChange}
                    className="border-gray-300 focus:ring-2 focus:ring-teal-500 w-full"
                  />
                ) : (
                  <p className="font-medium w-full">
                    {profile[name as keyof typeof profile]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ===== Student Details ===== */}
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm mt-6 bg-gray-50">
          <h3 className="text-lg font-semibold text-purple-600 mb-4">
            Student Details
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <School size={18} className="text-teal-500" />
              <p className="font-medium">{profile.school}</p>
            </div>
            <div className="flex items-center gap-3">
              <Layers size={18} className="text-teal-500" />
              <p className="font-medium">{profile.campus}</p>
            </div>
          </div>
        </div>

        {/* ===== Marketplace Stats ===== */}
        <div className="grid grid-cols-3 gap-4 mt-8 text-center">
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-purple-50 transition">
            <Store className="mx-auto text-purple-600 mb-2" size={20} />
            <h4 className="font-semibold text-gray-700">12</h4>
            <p className="text-xs text-gray-500">Items Sold</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-teal-50 transition">
            <ShoppingBag className="mx-auto text-teal-600 mb-2" size={20} />
            <h4 className="font-semibold text-gray-700">5</h4>
            <p className="text-xs text-gray-500">Bought</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-purple-50 transition">
            <Heart className="mx-auto text-purple-600 mb-2" size={20} />
            <h4 className="font-semibold text-gray-700">8</h4>
            <p className="text-xs text-gray-500">Wishlist</p>
          </div>
        </div>

        {/* ===== Action Buttons ===== */}
        <div className="mt-8 space-y-3">
          {isEditing ? (
            <Button
              onClick={saveProfile}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold flex items-center justify-center gap-2"
            >
              <Save size={16} />
              Save Changes
            </Button>
          ) : (
            <Button
              onClick={toggleEdit}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold flex items-center justify-center gap-2"
            >
              <Edit3 size={16} />
              Edit Profile
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => router.push("/account/address/change-password")}
            className="w-full border border-red-500 text-red-600 hover:bg-red-50 font-semibold flex items-center justify-center gap-2"
          >
            <Lock size={16} />
            Change Password
          </Button>
        </div>

        {/* ===== Footer Info ===== */}
        <div className="mt-10 border-t pt-6 text-center text-gray-500 text-sm">
          Member since 2025 • Campus: UNN • Version 1.0.0
        </div>
      </motion.div>
    </main>
  );
}
