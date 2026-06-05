"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface BentoCol {
  title: string;
  subtitle?: string;
  image: string;
  alt: string;
  href: string;
  className: string;
}

export default function BentoCollections() {
  const [collections, setCollections] = useState<BentoCol[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("sri_leather_admin_collections");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Map the active admin collections to the Bento format (take first 3)
      const mapped = parsed.slice(0, 3).map((col: any, idx: number) => {
        let className = "col-span-1 h-64";
        if (idx === 0) className = "col-span-2 h-48";
        
        // Map name to search query for dynamic shop filtering
        const slug = encodeURIComponent(col.name);

        return {
          title: col.name,
          subtitle: col.featured ? "Featured Spotlight" : undefined,
          image: col.bannerUrl,
          alt: col.name,
          href: `/shop?q=${slug}`,
          className,
        };
      });
      setCollections(mapped);
    } else {
      // Fallback default collections
      setCollections([
        {
          title: "The Leather Edit",
          subtitle: "Premium Formals",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDS7GztoH9HKLl6JosjPHcixuMpTAvQ8dWI2S3XbNVfPKezcQRfC36qb52JBgTEH2SveD_g-rDyUHe6OXBbKBhrHDW4aIgJtAR_cBulNkxZDKDYO7q6BnIGh0GNYm6h_DT0rLzqc0Ay0eSIzSi-pEw84KQ3Wz9p5zN8oTMcE1CGCwO6GSZpxaaYr76dZv7JeF-tGFe7yKjeXPkmZ8jQhC9ARV2k2ehy0cNqzEuHJWj6G01FQdUD81-mDPI60LSiPK2Xud9E43uw4JFO",
          alt: "Formal wingtip leather oxford shoes",
          href: "/shop?category=formal",
          className: "col-span-2 h-48",
        },
        {
          title: "Urban Sneakers",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTugtoFn7hdGmzSciNMPmXy3GV9KouZ00MjP8yXzNcWqvGEHtOIFWYHbaEdq2mawpSZa0j7MVL1MvPgX0KAgoRURmYkQjOYRtO0EvLK9J4UIPyLrsOi85zLYWA3N0OuYJwfBcWhAfY0AaGFvS4ezQfkIudyoSYGvotQc4hYKyr0HRJLYs48poY8c8FLwzohs3qOy-3sF64PEj0btMVMAkN1u04D_g0-z-n7M1Mjkf3ui2rrxHo7PEa_bwmX3Ayoqkw35mpHD_Sh9QM",
          alt: "Minimalist urban leather sneakers",
          href: "/shop?category=sneakers",
          className: "col-span-1 h-64",
        },
        {
          title: "Comfort Daily",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFtz1cRI-0zGynnqgUCnyLXUr-rmbaSW2t9fS8pnG6p22SDRWwMP-jaTJnOZQ_j5KcAhx2R7uufM6RgUZgwshqg0AOloe0Yy_e1m7zRsnCv1tUnxqF6Xqs31cFx1Z1hjMzyCNjaTC_-HU2HHaRf11IUDPGzAnhHPynF3CbdV8cu4SqzRNsAxsftmz3X4oB0D7iW14sM0Y3LhXZkUNSrFIlu6mms87WKfsBPU77q4KnALAw6b_AM8o6JprwdELjeHSmZ9ok2XeZvDa2",
          alt: "Ergonomic leather everyday loafers",
          href: "/shop?category=loafers",
          className: "col-span-1 h-64",
        },
      ]);
    }
  }, []);

  return (
    <section className="px-margin-mobile max-w-container-max mx-auto space-y-4">
      <h3 className="font-headline-sm text-headline-sm text-primary mb-6">
        Curated Collections
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {collections.map((col, index) => (
          <Link
            key={index}
            href={col.href}
            className={`relative rounded-xl overflow-hidden premium-shadow group block ${col.className}`}
          >
            <div className="absolute inset-0 w-full h-full bg-surface-container-high">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={col.image}
                alt={col.alt}
              />
            </div>
            <div className="absolute inset-0 bg-black/30 p-6 flex flex-col justify-end transition-opacity group-hover:bg-black/45">
              <h4 className="font-headline-sm text-white font-bold">{col.title}</h4>
              {col.subtitle && (
                <p className="text-white/80 font-body-sm mt-1">{col.subtitle}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
