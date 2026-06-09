"use client";

import { useState } from "react";
import Link from "next/link";

export default function AboutContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      // Simulate form submission
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const getWhatsAppSupportLink = () => {
    const text = "Hello Sri Leather Support! I am looking for assistance regarding your products.";
    return `https://wa.me/919295403036?text=${encodeURIComponent(text)}`;
  };

  return (
    <main className="max-w-container-max mx-auto min-h-screen bg-[#fcf9f8] pb-20">
      {/* Banner Segment */}
      <section className="relative h-72 md:h-96 bg-[#321716] overflow-hidden flex flex-col justify-center items-center text-center px-4">
        {/* Background Overlay */}
        <div className="absolute inset-0 opacity-20 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1590674899484-d5640e854abe?q=80&w=1200&auto=format&fit=crop')]" />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 space-y-4 max-w-2xl">
          <span className="bg-[#ffe088] text-[#241a00] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            ESTABLISHED TRUST
          </span>
          <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Heritage in Every Step
          </h1>
          <p className="text-body-md text-[#ffdad7]/90 max-w-xl mx-auto leading-relaxed">
            Sri Leather has been the cornerstone of quality footwear for generations. We blend time-honored craftsmanship with contemporary design to deliver durability that speaks for itself.
          </p>
        </div>
      </section>

      {/* Main content columns */}
      <section className="px-margin-mobile md:px-margin-desktop py-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Left Column: Legacy Details */}
        <div className="md:col-span-7 space-y-8">
          <div className="space-y-4">
            <h2 className="font-display-lg text-2xl md:text-3xl font-bold text-[#321716]">
              Trusted Local Footwear Store
            </h2>
            <p className="text-body-md text-[#504443] leading-relaxed">
              For over two decades, Sri Leather has served as more than just a showroom. It is a destination for those who seek reliability. Every pair of shoes in our collection is vetted for structural integrity and comfort.
            </p>
          </div>

          {/* Premium Highlight Card */}
          <div className="bg-[#fcf9f8] border-l-4 border-[#4a2c2a] p-5 rounded-r-2xl shadow-sm space-y-3 bg-gradient-to-r from-amber-50/20 to-transparent">
            <h4 className="font-body-md font-bold text-[#321716] flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-700">verified</span>
              Premium Quality Guarantee
            </h4>
            <p className="text-body-sm text-[#504443] leading-relaxed">
              We exclusively use full-grain leather and high-grade materials to ensure your footwear ages beautifully with every step you take.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#4a2c2a] pt-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Genuine Leather
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Hand-Finished
              </span>
            </div>
          </div>

          {/* Stats Badges */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-outline-variant/15 p-6 rounded-2xl text-center shadow-sm hover:-translate-y-1 transition-transform">
              <h3 className="font-display-lg text-3xl font-extrabold text-[#4a2c2a]">20+</h3>
              <p className="text-body-xs font-bold text-[#504443] uppercase tracking-wider mt-1">
                Years of Heritage
              </p>
            </div>
            <div className="bg-white border border-outline-variant/15 p-6 rounded-2xl text-center shadow-sm hover:-translate-y-1 transition-transform">
              <h3 className="font-display-lg text-3xl font-extrabold text-[#4a2c2a]">50k+</h3>
              <p className="text-body-xs font-bold text-[#504443] uppercase tracking-wider mt-1">
                Happy Customers
              </p>
            </div>
          </div>

          {/* Image Feature */}
          <div className="relative aspect-[16/10] bg-[#1e1e1a] rounded-3xl overflow-hidden border border-outline-variant/10 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop"
              className="w-full h-full object-cover opacity-80"
              alt="Artisan stitching shoes"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm p-4 rounded-xl text-center text-white text-xs font-medium">
              &quot;Quality is not an act, it is a habit.&quot; — Handcrafting Heritage
            </div>
          </div>
        </div>

        {/* Right Column: Contact Details & Form */}
        <div className="md:col-span-5 space-y-8">
          <div className="bg-white border border-outline-variant/20 rounded-3xl p-6 shadow-sm space-y-6">
            <h3 className="font-display-lg text-xl font-bold text-[#321716] border-b border-outline-variant/10 pb-3">
              Get in Touch
            </h3>

            {/* Timings and Address */}
            <div className="space-y-4 text-body-sm text-[#504443]">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-[#4a2c2a] shrink-0">store</span>
                <div>
                  <h5 className="font-bold text-[#321716] mb-0.5">Our Showroom</h5>
                  <p>123 Heritage Lane, Footwear District, City Center, TG, 500001</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="material-symbols-outlined text-[#4a2c2a] shrink-0">schedule</span>
                <div>
                  <h5 className="font-bold text-[#321716] mb-0.5">Showroom Timings</h5>
                  <p>10:00 AM - 10:00 PM<br />Open everyday including Sunday</p>
                </div>
              </div>
            </div>

            {/* Testimonials Card snippet */}
            <div className="bg-[#fcf9f8] p-4 rounded-2xl border border-outline-variant/10 space-y-2">
              <div className="flex text-amber-500 gap-0.5 text-sm">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                <span className="text-body-xs font-bold text-[#321716] ml-2">4.8/5</span>
              </div>
              <p className="text-body-xs text-outline italic leading-relaxed">
                &quot;Best leather shop in town! The durability of their boots and shoes is unmatched!&quot;
              </p>
              <p className="text-[10px] font-bold text-[#321716] text-right">— Aditya, loyal customer</p>
            </div>
          </div>

          {/* Message Form */}
          <div className="bg-white border border-outline-variant/20 rounded-3xl p-6 shadow-sm space-y-5">
            <h3 className="font-display-lg text-lg font-bold text-[#321716]">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-body-xs font-bold text-[#321716]">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/30 focus:outline-none focus:border-[#4a2c2a] text-body-sm text-[#1c1b1b]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-body-xs font-bold text-[#321716]">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/30 focus:outline-none focus:border-[#4a2c2a] text-body-sm text-[#1c1b1b]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-body-xs font-bold text-[#321716]">Your Message</label>
                <textarea
                  rows={3}
                  placeholder="Tell us what you're looking for..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/30 focus:outline-none focus:border-[#4a2c2a] text-body-sm text-[#1c1b1b] resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#4a2c2a] text-[#ffdad7] font-bold rounded-xl text-body-sm hover:opacity-90 active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                Send Inquiry
              </button>
            </form>

            {submitted && (
              <p className="text-xs text-center text-emerald-700 font-bold animate-pulse">
                Message sent successfully! We will contact you soon.
              </p>
            )}

            <div className="border-t border-outline-variant/10 pt-4 flex flex-col items-center gap-2">
              <span className="text-[10px] text-outline">Or reach out instantly via</span>
              <a
                href={getWhatsAppSupportLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#25d366] hover:bg-[#20ba56] text-white rounded-xl font-bold text-body-sm flex items-center justify-center gap-2 active:scale-95 transition-all text-center cursor-pointer"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.023-5.102-2.884-6.964-1.861-1.862-4.332-2.884-6.963-2.885-5.437 0-9.863 4.42-9.866 9.865-.001 1.716.463 3.39 1.337 4.888L1.996 22.01l4.651-1.218z" />
                </svg>
                WhatsApp Support
              </a>
            </div>
          </div>

          {/* Micro Map Link Card */}
          <Link
            href="/locations"
            className="block border border-outline-variant/10 rounded-3xl overflow-hidden shadow-sm relative group hover:scale-[1.01] transition-transform duration-300 cursor-pointer"
          >
            <div className="relative aspect-[16/9] bg-[#1e1e1a]">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M0 10h100M0 50h100M0 90h100M10 0v100M50 0v100M90 0v100' stroke='%234a4740' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
                }}
              />
              <div className="absolute inset-0 bg-black/45 flex flex-col justify-center items-center gap-2">
                <span className="material-symbols-outlined text-3xl text-[#ffe088] group-hover:scale-110 transition-transform">map</span>
                <span className="text-white font-bold text-sm">Click to View Showrooms</span>
                <span className="text-[#ffdad7] text-[10px] font-semibold uppercase tracking-wider">3 locations in hyderabad</span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
