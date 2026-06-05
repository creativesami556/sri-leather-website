"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavBar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", icon: "home", href: "/" },
    { label: "Search", icon: "search", href: "/shop" },
    { label: "Stores", icon: "location_on", href: "/locations" },
    { label: "Wishlist", icon: "favorite", href: "/wishlist" },
    { label: "Profile", icon: "person", href: "/about" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 px-2 pb-safe bg-surface dark:bg-surface-dim shadow-[0px_-10px_30px_0px_rgba(74,44,42,0.04)] border-t border-outline-variant/10 z-50 md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center justify-center rounded-xl px-3 py-1 scale-95 duration-150 transition-all ${
              isActive
                ? "bg-primary-container dark:bg-primary text-on-primary-container dark:text-on-primary"
                : "text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-label-uppercase text-label-uppercase text-[10px] mt-1">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
