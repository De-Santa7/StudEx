// src/app/categories/page.tsx
"use client";

import { ChevronLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CategoriesPage() {
  const cardHover = {
    whileHover: { y: -6, scale: 1.03 },
    whileTap: { scale: 0.98 },
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  const categories = [
    {
      title: "Food & Snacks",
      href: "/food",
      image: "/images/food-1.jpg",
      alt: "Jollof, Suya, Drinks, Pizza",
      border: "hover:border-teal-300",
    },
    {
      title: "Nails",
      href: "/nails",
      image: "/images/nails-1.jpg",
      alt: "Manicure, pedicure, gel, acrylic",
      border: "hover:border-pink-300",
    },
    {
      title: "Laundry",
      href: "/laundry",
      image: "/images/laundry-1.jpg",
      alt: "Wash, fold, press, pickup",
      border: "hover:border-blue-300",
    },
    {
      title: "Lashes",
      href: "/lashes",
      image: "/images/lashes-1.jpg",
      alt: "Extensions, lifts, volume",
      border: "hover:border-rose-300",
    },
    {
      title: "Drinks",
      href: "/drinks",
      image: "/images/drinks-1.jpg",
      alt: "Smoothies, soda, energy drinks",
      border: "hover:border-green-300",
    },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b shadow-sm">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-black">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-black">All Categories</h1>
          <div />
        </div>
      </div>

      <div className="p-4 pb-24">
        <motion.div
          className="grid grid-cols-2 gap-4"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <motion.div key={cat.href} {...fadeInUp}>
              <Link href={cat.href}>
                <motion.div
                  {...cardHover}
                  className={`bg-surface p-5 rounded-2xl text-center hover:shadow-lg transition-all duration-300 cursor-pointer border border-transparent ${cat.border}`}
                >
                  <div className="relative w-full h-36 mb-3 rounded-2xl overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.alt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-lg font-bold text-black">{cat.title}</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Back to Home CTA */}
        <motion.div {...fadeInUp} className="mt-8 flex justify-center">
          <Link href="/">
            <motion.button
              whileHover={{ x: -4 }}
              className="flex items-center gap-2 text-black font-medium text-sm hover:underline"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50 shadow-lg">
        <div className="flex justify-around py-2">
          <Link href="/" className="text-black/60">
            <span className="text-xs">Home</span>
          </Link>
          <div className="text-primary font-bold">
            <span className="text-xs">Categories</span>
          </div>
          <Link href="/cart" className="text-black/60">
            <span className="text-xs">Cart</span>
          </Link>
          <Link href="/wishlist" className="text-black/60">
            <span className="text-xs">Wishlist</span>
          </Link>
          <Link href="/account" className="text-black/60">
            <span className="text-xs">Account</span>
          </Link>
        </div>
      </div>
    </>
  );
}
