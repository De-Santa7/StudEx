// src/app/seller/add/page.tsx
"use client";

import { Camera, Package, DollarSign, Tag, FileText, ChevronLeft, Upload } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddProduct() {  // ← THIS LINE WAS MISSING
  const [form, setForm] = useState({
    name: "",
    price: "",
    condition: "new",
    description: "",
    category: "",
    images: [] as File[],
  });
  const [preview, setPreview] = useState<string[]>([]);
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImage = (e: any) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, images: files });

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const product = {
      ...form,
      id: Date.now().toString(),
      seller: "You",
      hostel: "New Hall",
      date: new Date().toLocaleDateString(),
    };
    const existing = JSON.parse(localStorage.getItem("sellerProducts") || "[]");
    localStorage.setItem("sellerProducts", JSON.stringify([...existing, product]));
    router.push("/seller");
  };

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <Link href="/seller" className="text-purple-600">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg font-bold" style={{ color: "#7C3AED" }}>Add Product</h1>
          <div />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 pb-24 space-y-4">
        {/* Images */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "#7C3AED" }}>
            <Camera className="w-4 h-4 inline mr-1" />
            Product Photos (up to 4)
          </label>
          <div className="grid grid-cols-4 gap-2">
            {preview.map((src, i) => (
              <img key={i} src={src} alt="" className="w-full h-24 object-cover rounded-xl" />
            ))}
            {preview.length < 4 && (
              <label className="border-2 border-dashed rounded-xl h-24 flex items-center justify-center cursor-pointer">
                <Upload className="w-6 h-6 text-gray-400" />
                <input type="file" multiple accept="image/*" onChange={handleImage} className="hidden" />
              </label>
            )}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "#7C3AED" }}>
            <Package className="w-4 h-4 inline mr-1" />
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. iPhone 13"
            className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ borderColor: "#7C3AED" }}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "#7C3AED" }}>
            <DollarSign className="w-4 h-4 inline mr-1" />
            Price (₦)
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="15000"
            className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ borderColor: "#7C3AED" }}
            required
          />
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "#7C3AED" }}>
            <Tag className="w-4 h-4 inline mr-1" />
            Condition
          </label>
          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ borderColor: "#7C3AED" }}
          >
            <option value="new">Brand New</option>
            <option value="like-new">Like New</option>
            <option value="used">Used</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "#7C3AED" }}>
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ borderColor: "#7C3AED" }}
            required
          >
            <option value="">Select Category</option>
            <option>Electronics</option>
            <option>Fashion & Beauty</option>
            <option>Books</option>
            <option>Home</option>
            <option>Food</option>
            <option>Services</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "#7C3AED" }}>
            <FileText className="w-4 h-4 inline mr-1" />
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your item..."
            rows={4}
            className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ borderColor: "#7C3AED" }}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 transition-all shadow-lg"
        >
          Post Item
        </button>
      </form>
    </>
  );
}