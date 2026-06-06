"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase";

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
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
        const savedWish = localStorage.getItem(`sri_leather_wishlist_${session.user.id}`);
        if (savedWish) {
          try {
            const list = JSON.parse(savedWish);
            const isFav = list.some((item: any) => item.id === id);
            setIsFavorite(isFav);
          } catch (e) {
            console.error("Error parsing user wishlist", e);
          }
        }
      }
    });
  }, [id]);

  const formatPrice = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const { data: { session } } = await supabaseBrowser.auth.getSession();
      if (!session?.user) {
        const currentPath = window.location.pathname + window.location.search;
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
        return;
      }

      const uId = session.user.id;
      const currentWishlistStr = localStorage.getItem(`sri_leather_wishlist_${uId}`);
      let currentWishlist: any[] = [];
      if (currentWishlistStr) {
        try {
          currentWishlist = JSON.parse(currentWishlistStr);
        } catch (err) {
          console.error("Wishlist parse error", err);
        }
      }

      let updatedWishlist;
      if (isFavorite) {
        updatedWishlist = currentWishlist.filter((item: any) => item.id !== id);
        setIsFavorite(false);
      } else {
        const productToSave = {
          id,
          title,
          collection,
          price,
          originalPrice,
          image,
          alt,
          badge,
          discount,
        };
        updatedWishlist = [...currentWishlist, productToSave];
        setIsFavorite(true);
      }

      localStorage.setItem(`sri_leather_wishlist_${uId}`, JSON.stringify(updatedWishlist));
      // Trigger custom storage event to update other components dynamically
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Wishlist check session error:", err);
      const currentPath = window.location.pathname + window.location.search;
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
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
          onClick={handleWishlistToggle}
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
