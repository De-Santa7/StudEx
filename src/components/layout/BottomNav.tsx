// src/components/layout/BottomNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Grid3x3, ShoppingCart, Heart, User, Store } from "lucide-react";
import Image from "next/image";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/categories", icon: Grid3x3, label: "Shop" },
  { href: "/cart", icon: ShoppingCart, label: "Cart" },
  { href: "/wishlist", icon: Heart, label: "Wishlist" },
  { href: "/account", icon: User, label: "Account" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-white/20 z-50 shadow-2xl"
    >
      <div className="flex justify-around items-center h-20 px-2">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 h-full"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="relative flex flex-col items-center gap-1 py-2 px-3 rounded-2xl"
              >
                {/* ACTIVE INDICATOR */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-t from-purple-100 to-transparent rounded-2xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* ICON */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.15 : 1,
                    y: isActive ? -4 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Icon
                    className="w-7 h-7"
                    strokeWidth={isActive ? 2.5 : 1.8}
                    stroke={isActive ? "#7C3AED" : "#9CA3AF"}
                    fill={isActive ? "#7C3AED" : "none"}
                  />
                </motion.div>

                {/* LABEL */}
                <motion.span
                  className={`text-xs font-black transition-all ${
                    isActive
                      ? "text-purple-600"
                      : "text-gray-500"
                  }`}
                  animate={{
                    opacity: isActive ? 1 : 0.7,
                    y: isActive ? -2 : 0,
                  }}
                >
                  {item.label}
                </motion.span>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* MINI LOGO IN CENTER (PAU VIBE) */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-white">
        <Image
          src="/images/logo-1.jpg"
          alt="StudEx"
          width={40}
          height={40}
          className="w-9 h-9 rounded-full object-cover"
          priority
        />
      </div>
    </motion.div>
  );
}