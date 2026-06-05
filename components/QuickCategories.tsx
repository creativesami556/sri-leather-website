"use client";

import Link from "next/link";

export default function QuickCategories() {
  const categories = [
    { label: "Men", icon: "male", slug: "men" },
    { label: "Women", icon: "female", slug: "women" },
    { label: "Kids", icon: "child_care", slug: "kids" },
    { label: "Daily", icon: "directions_walk", slug: "daily" },
    { label: "School", icon: "school", slug: "school" },
    { label: "Accs", icon: "style", slug: "accessories" },
  ];

  return (
    <section className="py-10 px-margin-mobile max-w-container-max mx-auto">
      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 justify-start md:justify-center">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={`/shop?category=${cat.slug}`}
            className="flex flex-col items-center gap-2 min-w-[72px] group"
          >
            <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-105 shadow-sm active:scale-95">
              <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
            </div>
            <span className="font-label-uppercase text-label-uppercase text-on-surface group-hover:text-primary transition-colors text-center">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
