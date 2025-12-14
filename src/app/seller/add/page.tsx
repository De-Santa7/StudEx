// src/app/seller/add/page.tsx
"use client";

import { Plus, X, AlertCircle, ChevronLeft, Image as ImageIcon } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AddService() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    images: [] as File[],
    duration: "",
    durationUnit: "hours",
  });
  const [preview, setPreview] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors(errors.filter(err => !err.includes(name)));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (preview.length + files.length > 4) {
      setErrors([...errors, "Max 4 images allowed"]);
      return;
    }

    setForm({ ...form, images: [...form.images, ...files] });

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setPreview(preview.filter((_, i) => i !== index));
    setForm({
      ...form,
      images: form.images.filter((_, i) => i !== index),
    });
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    if (!form.name.trim()) newErrors.push("Service name is required");
    if (!form.price || Number(form.price) <= 0) newErrors.push("Valid price is required");
    if (!form.category) newErrors.push("Category is required");
    if (!form.description.trim()) newErrors.push("Description is required");
    if (!form.duration) newErrors.push("Service duration is required");
    if (form.images.length === 0) newErrors.push("At least 1 photo is required");
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const service = {
      ...form,
      id: Date.now().toString(),
      seller: "You",
      hostel: "Campus",
      date: new Date().toLocaleDateString("en-GB"),
      price: Number(form.price),
      rating: 5.0,
      reviews: 0,
    };

    const existing = JSON.parse(localStorage.getItem("sellerProducts") || "[]");
    localStorage.setItem("sellerProducts", JSON.stringify([...existing, service]));

    router.push("/seller");
  };

  const categories = [
    { value: "Lashes", label: "Lashes", emoji: "✨" },
    { value: "Nails", label: "Nails", emoji: "💅" },
    { value: "Laundry", label: "Laundry", emoji: "🧺" },
    { value: "Food", label: "Food", emoji: "🍕" },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  return (
    <>
      {/* TOP BAR */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white/95 backdrop-blur-xl z-40 border-b border-gray-100 shadow-sm"
      >
        <div className="flex items-center gap-4 p-4 max-w-6xl mx-auto">
          <Link href="/seller">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </motion.button>
          </Link>
          <div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
              Add New Service
            </h1>
            <p className="text-xs text-gray-600 mt-0.5">Share what you offer to campus</p>
          </div>
        </div>
      </motion.div>

      {/* ERROR BANNER */}
      {errors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 bg-red-50 border border-red-300 rounded-xl p-4 flex gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-red-800 text-sm">Fix these errors:</p>
            <ul className="text-xs text-red-700 mt-2 space-y-1">
              {errors.map((err, i) => (
                <li key={i}>• {err}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="p-4 pb-32 space-y-6 max-w-3xl mx-auto">
        {/* PHOTOS SECTION */}
        <motion.div {...fadeInUp} className="space-y-3">
          <h2 className="text-lg font-bold text-gray-800">Service Photos</h2>
          <p className="text-sm text-gray-600">Add up to 4 photos of your work</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {preview.map((src, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative group rounded-lg overflow-hidden"
              >
                <img src={src} alt="" className="w-full h-24 object-cover" />
                <motion.button
                  type="button"
                  onClick={() => removeImage(i)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="w-3 h-3" />
                </motion.button>
              </motion.div>
            ))}

            {preview.length < 4 && (
              <label className="border-2 border-dashed border-purple-300 rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all">
                <ImageIcon className="w-6 h-6 text-purple-500 mb-1" />
                <span className="text-xs text-purple-600 font-semibold">Add Photo</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </motion.div>

        {/* SERVICE NAME */}
        <motion.div {...fadeInUp} className="space-y-2">
          <label className="text-sm font-bold text-gray-800">Service Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Hair braiding, Laundry service, Tutoring..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition bg-white"
          />
        </motion.div>

        {/* CATEGORY */}
        <motion.div {...fadeInUp} className="space-y-3">
          <label className="text-sm font-bold text-gray-800">Category</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {categories.map(cat => (
              <motion.button
                key={cat.value}
                type="button"
                onClick={() => setForm({ ...form, category: cat.value })}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-lg border-2 transition-all text-center relative overflow-hidden ${
                  form.category === cat.value
                    ? "border-purple-500 text-white"
                    : "border-gray-200 bg-white hover:border-gray-300 text-gray-800"
                }`}
              >
                {/* Liquid gradient fill */}
                {form.category === cat.value && (
                  <motion.div
                    layoutId="categoryFill"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-teal-500 -z-10"
                  />
                )}
                <div className="text-xl mb-1 relative z-10">{cat.emoji}</div>
                <div className="text-xs font-semibold relative z-10">{cat.label}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* PRICE & DURATION - SIDE BY SIDE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* PRICE */}
          <motion.div {...fadeInUp} className="space-y-2">
            <label className="text-sm font-bold text-gray-800">Price (₦)</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-lg font-bold text-gray-700">₦</span>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="5000"
                className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition bg-white"
              />
            </div>
          </motion.div>

          {/* DURATION */}
          <motion.div {...fadeInUp} className="space-y-2">
            <label className="text-sm font-bold text-gray-800">Duration</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="e.g. 30"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition bg-white"
              />
              <select
                name="durationUnit"
                value={form.durationUnit}
                onChange={handleChange}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500 bg-white font-semibold text-sm"
              >
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
              </select>
            </div>
            <p className="text-xs text-gray-600">How long each service takes</p>
          </motion.div>
        </div>

        {/* DESCRIPTION */}
        <motion.div {...fadeInUp} className="space-y-2">
          <label className="text-sm font-bold text-gray-800">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe what you offer, your experience, what's included, and what clients should expect..."
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition resize-none bg-white"
          />
          <p className="text-xs text-gray-600">Be detailed - it helps attract better clients!</p>
        </motion.div>

        {/* SUBMIT BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3 pt-4"
        >
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-teal-500 text-white font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Publish Service
          </motion.button>
        </motion.div>
      </form>
    </>
  );
}