"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Grid3x3, ShoppingCart, Heart, User } from "lucide-react";
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

  // INSTANT KILL SWITCH — if we're on any /admin route → return null
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 z-50 shadow-xl"
    >
      <div className="flex justify-around items-center h-16 px-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="relative flex flex-col items-center gap-1 py-1 px-3"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-purple-100/50 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <motion.div
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    y: isActive ? -3 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                >
                  <Icon
                    className="w-6 h-6"
                    strokeWidth={isActive ? 2.3 : 1.8}
                    stroke={isActive ? "#7C3AED" : "#9CA3AF"}
                    fill={isActive ? "#7C3AED" : "none"}
                  />
                </motion.div>

                <span
                  className={`text-[11px] font-semibold ${
                    isActive ? "text-purple-600" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Center Logo — clickable to Cart */}
      <Link
        href="/cart"
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-xl border-2 border-white flex items-center justify-center"
      >
        <Image
          src="/images/logo-1.jpg"
          alt="StudEx"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
      </Link>
    </motion.div>
  );
}