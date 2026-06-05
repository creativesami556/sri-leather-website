"use client";

import { useState } from "react";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  title: string;
  collection: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  badge?: string;
  discount?: string;
}

export default function ProductCard({
  id,
  title,
  collection,
  price,
  originalPrice,
  image,
  alt,
  badge,
  discount,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <Link href={`/product/${id}`} className="group cursor-pointer block">
      <div className="relative aspect-[3/4] bg-[#FDFBF7] rounded-xl overflow-hidden mb-4 product-card-shadow transition-transform duration-500 group-hover:-translate-y-2">
        <img
          className="w-full h-full object-cover"
          src={image || undefined}
          alt={alt}
          loading="lazy"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#321716] transition-all hover:scale-110 active:scale-95 z-10 cursor-pointer"
        >
          <span
            className="material-symbols-outlined transition-colors duration-200"
            style={{
              fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0",
              color: isFavorite ? "#ba1a1a" : "inherit",
            }}
          >
            favorite
          </span>
        </button>

        {/* Floating Badges */}
        {badge && (
          <div className="absolute bottom-3 left-3 flex flex-col gap-1">
            <span className="px-3 py-1 bg-[#321716] text-[#ffdad7] font-label-uppercase text-[10px] rounded-full uppercase tracking-widest font-bold shadow-sm">
              {badge}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="font-label-uppercase text-label-uppercase text-outline uppercase tracking-wider text-[10px]">
          {collection}
        </p>
        <h3 className="font-headline-sm text-body-lg text-[#321716] truncate group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-body-lg font-bold text-[#321716]">
            {formatPrice(price)}
          </span>
          {originalPrice && (
            <>
              <span className="text-body-sm text-outline line-through">
                {formatPrice(originalPrice)}
              </span>
              <span className="text-label-uppercase text-[11px] text-tertiary-container font-bold">
                {discount || `${Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF`}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
