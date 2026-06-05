"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Slide {
  image: string;
  alt: string;
  subtitle: string;
  title: string;
  buttonText: string;
  link: string;
}

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("sri_leather_admin_collections");
    if (saved) {
      const collections = JSON.parse(saved);
      const featured = collections.filter((c: any) => c.featured);
      if (featured.length > 0) {
        const loadedSlides = featured.map((c: any) => ({
          image: c.bannerUrl,
          alt: c.name,
          subtitle: "Featured Spotlight",
          title: c.name,
          buttonText: "Shop Now",
          link: `/shop?q=${encodeURIComponent(c.name)}`
        }));
        setSlides(loadedSlides);
        return;
      }
    }

    // Default slides fallback
    setSlides([
      {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDA0j8N_uW1Ipva9VOu_J4ebnnn6aIaHXoZBh_tbcgiqRHrWVCpDX2lgS1uxBRnffFKf1a6QN3ltEwrUefHD7CLywLKXeIudlZ9LRtLbHFU-nZ0Ix2awyUXwC5Sy_94Yj3lY_gyf_Vs2QEttpF1v1ADC0m8c4c6oHhKYR9vP7-xP9SS4vu4sqEPL1xTbZFxDHiattrVdSS81eDwherNXrYOTK2ZyuthhHGnXzzsSHu4qXsZxrU-dA54EHJsp4GTQkAKj29VeImMePYd",
        alt: "Handcrafted brown leather dress shoes",
        subtitle: "New Arrivals",
        title: "Timeless Elegance in Leather",
        buttonText: "Shop Now",
        link: "/shop"
      },
      {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFsqGGHOlbi3cOdaGbCwbwifOSVLOv2Ndb4r53r3vHh0hxMTOS324Nh3EQQDYh8UtpUoRGHoI5j2UbZNEcfc2mZzpj9bEdb4MH0FX9n4gqba9e90IoKoCEd_6e0sEzggb9mz9I9PdX8AsBloTsab57LoFB3UM6ZkRED7UJGTRhd-NJTRgNEDQdjrKGHCC6q9Y9ekVb1gsmiT_NKCCDqh0HtUj_N23WpGeTvFQlSa_KEji_iYECMOiLn9C9srJUKmCCMMORn39Y1Qzn",
        alt: "Elegant leather sandals and occasion footwear",
        subtitle: "Festival Offers",
        title: "Celebrate in Style & Comfort",
        buttonText: "View Offers",
        link: "/shop"
      }
    ]);
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <section className="relative overflow-hidden w-full h-[618px] md:h-[707px]">
      <div
        className="carousel-track h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full h-full relative flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src={slide.image}
              alt={slide.alt}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex flex-col justify-end p-margin-mobile pb-16 md:p-16">
              <span className="font-label-uppercase text-label-uppercase text-primary-fixed mb-2 tracking-wider">
                {slide.subtitle}
              </span>
              <h2 className="font-display-lg-mobile md:text-display-lg text-display-lg-mobile text-white mb-6 max-w-2xl font-bold">
                {slide.title}
              </h2>
              <div className="flex gap-4">
                <Link
                  href={slide.link}
                  className="bg-primary-container text-on-primary-container hover:bg-primary hover:text-white px-8 py-3 rounded-full font-label-uppercase text-label-uppercase transition-all text-center"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white flex items-center justify-center transition-all cursor-pointer z-20 group"
        aria-label="Previous slide"
      >
        <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
          chevron_left
        </span>
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white flex items-center justify-center transition-all cursor-pointer z-20 group"
        aria-label="Next slide"
      >
        <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">
          chevron_right
        </span>
      </button>
    </section>
  );
}
