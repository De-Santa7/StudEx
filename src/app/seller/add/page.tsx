// src/app/seller/add/page.tsx
"use client";

import { Camera, Package, DollarSign, Tag, FileText, ChevronLeft, Upload, X, AlertCircle } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    condition: "new",
    description: "",
    category: "",
    images: [] as File[],
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
    if (!form.name) newErrors.push("Product name is required");
    if (!form.price || Number(form.price) <= 0) newErrors.push("Valid price is required");
    if (!form.category) newErrors.push("Category is required");
    if (!form.description) newErrors.push("Description is required");
    if (form.images.length === 0) newErrors.push("At least 1 photo is required");
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const product = {
      ...form,
      id: Date.now().toString(),
      seller: "You",
      hostel: "New Hall",
      date: new Date().toLocaleDateString("en-GB"),
      price: Number(form.price),
    };

    const existing = JSON.parse(localStorage.getItem("sellerProducts") || "[]");
    localStorage.setItem("sellerProducts", JSON.stringify([...existing, product]));

    router.push("/seller");
  };

  const fadeInUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };
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
          <Link href="/seller" className="text-purple-600">
            <ChevronLeft className="w-7 h-7" />
          </Link>
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
            Add Product
          </h1>
        </div>
      </motion.div>

      {/* ERROR BANNER */}
      {errors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <p className="font-bold text-red-800">Please fix the following:</p>
            <ul className="text-sm text-red-700 mt-1">
              {errors.map((err, i) => (
                <li key={i}>• {err}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="p-4 pb-32 space-y-6">
        {/* IMAGES — GRID + REMOVE */}
        <motion.div {...fadeInUp}>
          <label className="block text-sm font-bold mb-3 flex items-center gap-2" style={{ color: "#7C3AED" }}>
            <Camera className="w-5 h-5" />
            Product Photos <span className="text-xs font-normal text-gray-500">(up to 4)</span>
          </label>
          <div className="grid grid-cols-4 gap-3">
            {preview.map((src, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative group"
              >
                <img src={src} alt="" className="w-full h-24 object-cover rounded-xl shadow-md" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
            {preview.length < 4 && (
              <label className="border-2 border-dashed border-purple-300 rounded-xl h-24 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 transition-colors">
                <Upload className="w-6 h-6 text-purple-500 mb-1" />
                <span className="text-xs text-purple-600 font-medium">Add</span>
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

        {/* NAME */}
        <motion.div {...fadeInUp}>
          <label className="block text-sm font-bold mb-2 flex items-center gap-2" style={{ color: "#7C3AED" }}>
            <Package className="w-5 h-5" />
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. iPhone 13 Pro Max"
            className="w-full p-4 rounded-2xl border-2 focus:outline-none focus:ring-0 transition-all"
            style={{ borderColor: form.name ? "#7C3AED" : "#d1d5db" }}
            required
          />
        </motion.div>

        {/* PRICE */}
        <motion.div {...fadeInUp}>
          <label className="block text-sm font-bold mb-2 flex items-center gap-2" style={{ color: "#7C3AED" }}>
            <DollarSign className="w-5 h-5" />
            Price (₦)
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="15,000"
            className="w-full p-4 rounded-2xl border-2 focus:outline-none focus:ring-0 transition-all"
            style={{ borderColor: form.price ? "#7C3AED" : "#d1d5db" }}
            required
          />
        </motion.div>

        {/* CONDITION & CATEGORY — ROW */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div {...fadeInUp}>
            <label className="block text-sm font-bold mb-2 flex items-center gap-2" style={{ color: "#7C3AED" }}>
              <Tag className="w-5 h-5" />
              Condition
            </label>
            <select
              name="condition"
              value={form.condition}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl border-2 focus:outline-none transition-all"
              style={{ borderColor: "#7C3AED" }}
            >
              <option value="new">Brand New</option>
              <option value="like-new">Like New</option>
              <option value="used">Used</option>
            </select>
          </motion.div>

          <motion.div {...fadeInUp}>
            <label className="block text-sm font-bold mb-2" style={{ color: "#7C3AED" }}>
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl border-2 focus:outline-none transition-all"
              style={{ borderColor: form.category ? "#7C3AED" : "#d1d5db" }}
              required
            >
              <option value="">Select</option>
              <option>Electronics</option>
              <option>Fashion & Beauty</option>
              <option>Books</option>
              <option>Home</option>
              <option>Food</option>
              <option>Services</option>
            </select>
          </motion.div>
        </div>

        {/* DESCRIPTION */}
        <motion.div {...fadeInUp}>
          <label className="block text-sm font-bold mb-2 flex items-center gap-2" style={{ color: "#7C3AED" }}>
            <FileText className="w-5 h-5" />
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your item in detail..."
            rows={5}
            className="w-full p-4 rounded-2xl border-2 focus:outline-none focus:ring-0 transition-all resize-none"
            style={{ borderColor: form.description ? "#7C3AED" : "#d1d5db" }}
            required
          />
        </motion.div>

        {/* SUBMIT — HERO BUTTON */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-5 rounded-2xl font-black text-lg text-white bg-gradient-to-r from-purple-600 via-purple-500 to-teal-500 shadow-2xl flex items-center justify-center gap-3"
        >
          <Package className="w-6 h-6" />
          Post Item for Sale
        </motion.button>
      </form>

      {/* BOTTOM NAV — SELLER MODE */}
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
          <div className="text-teal-600 font-black"><span className="text-xs">Seller</span></div>
        </div>
      </motion.div>
    </>
  );
}