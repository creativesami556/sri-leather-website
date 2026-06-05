"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import QuickCategories from "@/components/QuickCategories";
import BentoCollections from "@/components/BentoCollections";
import ProductCard from "@/components/ProductCard";
import SchoolBanner from "@/components/SchoolBanner";
import StoreLocations from "@/components/StoreLocations";
import Testimonials from "@/components/Testimonials";
import WhatsAppBanner from "@/components/WhatsAppBanner";
import { products, Product } from "@/lib/products";

export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("sri_leather_admin_products");
    const list: Product[] = saved ? JSON.parse(saved) : products;
    // Filter out some good trending items (prefer ones with badges, or fallback to first 3)
    let trending = list.filter(
      (p) =>
        p.badge ||
        p.id === "prod-1" ||
        p.id === "prod-9" ||
        p.id === "prod-10"
    );
    if (trending.length === 0) {
      trending = list.slice(0, 3);
    }
    setTrendingProducts(trending.slice(0, 3));
  }, []);

  return (
    <div className="flex flex-col gap-10 pb-16">
      {/* 1. Hero Carousel */}
      <HeroSlider />

      {/* 2. Quick Categories */}
      <QuickCategories />

      {/* 3. Featured Collections */}
      <BentoCollections />

      {/* 4. Trending Now */}
      <section className="py-12 max-w-container-max mx-auto w-full">
        <div className="flex justify-between items-center px-margin-mobile mb-6">
          <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
            Trending Now
          </h3>
          <Link
            href="/shop"
            className="text-primary font-label-uppercase text-label-uppercase hover:underline font-semibold"
          >
            View All
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-margin-mobile md:grid md:grid-cols-3 md:gap-gutter md:overflow-visible">
          {trendingProducts.map((product) => (
            <div key={product.id} className="min-w-[240px] md:min-w-0 flex-1">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </section>

      {/* 5. School Collection Banner */}
      <SchoolBanner />

      {/* 6. Store Locations */}
      <div id="stores">
        <StoreLocations />
      </div>

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. WhatsApp Banner */}
      <WhatsAppBanner />
    </div>
  );
}
