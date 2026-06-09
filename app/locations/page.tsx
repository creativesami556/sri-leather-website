"use client";

import { useState } from "react";

export default function StoreLocationsPage() {
  const showrooms = [
    {
      name: "Ashok Nagar",
      tag: "MAIN BRANCH",
      address: "R.C. Puram, BHEL, Hyderabad, Telangana",
      timings: "10:00 AM - 10:00 PM (Daily)",
      phone: "+91 92954 03036",
      whatsapp: "919295403036",
      mapUrl: "https://www.google.com/maps/place/Sri+Leather/@17.5053928,78.3051429,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb92a687b4a4d1:0xfaf7b984a3bd5034!8m2!3d17.5053928!4d78.3077178!16s%2Fg%2F11bc8xbhd_?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D",
      x: "35%",
      y: "40%",
    },
    {
      name: "Ameenpur",
      tag: "BRANCH",
      address: "G849+PFX, Maruthi Hill Society, Rajender Reddy Nagar Colony, Bandam Kommu, Chanda Nagar, Ramachandrapuram, Hyderabad, Telangana 502032",
      timings: "10:00 AM - 10:00 PM (Daily)",
      phone: "+91 92954 03036",
      whatsapp: "919295403036",
      mapUrl: "https://www.google.com/maps/place/NEW+SRI+LEATHER/@17.5234603,78.2605547,14z/data=!4m10!1m2!2m1!1sSri+Leather+Beeramguda+Hyderabad!3m6!1s0x3bcb93b396aa2dd7:0x6ee5748034e6feff!8m2!3d17.5068995!4d78.3186427!15sCiBTcmkgTGVhdGhlciBCZWVyYW1ndWRhIEh5ZGVyYWJhZJIBCnNob2Vfc3RvcmXgAQA!16s%2Fg%2F11wpy2t0gk?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D",
      x: "65%",
      y: "35%",
    },
    {
      name: "Beeramguda",
      tag: "BRANCH",
      address: "Beram Guda, Sri Krishna Nagar Colony, Raghavendra Colony, Ramachandrapuram, Hyderabad, Telangana 502032",
      timings: "10:00 AM - 10:00 PM (Daily)",
      phone: "+91 83280 45745",
      whatsapp: "918328045745",
      mapUrl: "https://www.google.com/maps/place/NEW+SRI+LEATHER/@17.5242927,78.2969511,17z/data=!4m15!1m8!3m7!1s0x3bcb8d4e7b39c6e5:0xf42493cf52ad0aa2!2sBeram+Guda,+Sri+Krishna+Nagar+Colony,+Raghavendra+Colony,+Ramachandrapuram,+Hyderabad,+Telangana+502032!3b1!8m2!3d17.5244229!4d78.2999311!16s%2Fg%2F1s04dgkqn!3m5!1s0x3bcb8df0d6ddbe5f:0x9f876ff600a6e9d2!8m2!3d17.5234603!4d78.2986635!16s%2Fg%2F11wc1tycbv?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D",
      x: "48%",
      y: "68%",
    },
  ];

  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.6));
  };

  return (
    <main className="max-w-container-max mx-auto min-h-screen pb-16 bg-[#fcf9f8]">
      {/* Banner Section */}
      <section className="relative h-64 md:h-80 bg-[#321716] overflow-hidden flex flex-col justify-center items-center text-center px-4">
        {/* Background Overlay of Shoeboxes / Showroom */}
        <div className="absolute inset-0 opacity-20 bg-cover bg-center bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuDA0j8N_uW1Ipva9VOu_J4ebnnn6aIaHXoZBh_tbcgiqRHrWVCpDX2lgS1uxBRnffFKf1a6QN3ltEwrUefHD7CLywLKXeIudlZ9LRtLbHFU-nZ0Ix2awyUXwC5Sy_94Yj3lY_gyf_Vs2QEttpF1v1ADC0m8c4c6oHhKYR9vP7-xP9SS4vu4sqEPL1xTbZFxDHiattrVdSS81eDwherNXrYOTK2ZyuthhHGnXzzsSHu4qXsZxrU-dA54EHJsp4GTQkAKj29VeImMePYd')]" />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 space-y-3 max-w-2xl">
          <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Visit Our Showrooms
          </h1>
          <p className="text-body-md text-[#ffdad7] font-medium max-w-xl mx-auto leading-relaxed">
            Experience the touch of genuine leather and the precision of craftsmanship in person.
          </p>
        </div>
      </section>

      {/* Content grid */}
      <section className="px-margin-mobile md:px-margin-desktop py-12 max-w-4xl mx-auto space-y-12">
        <h2 className="font-display-lg text-2xl md:text-3xl font-bold text-[#321716] text-center border-b border-outline-variant/10 pb-4">
          Discover Near You
        </h2>

        {/* Showrooms list */}
        <div className="grid grid-cols-1 gap-6">
          {showrooms.map((showroom) => (
            <div
              key={showroom.name}
              className="bg-white rounded-2xl p-6 border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-display-lg text-xl font-bold text-[#321716]">
                    {showroom.name}
                  </h3>
                  <span className="bg-[#ffe088] text-[#241a00] text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {showroom.tag}
                  </span>
                </div>
                <div className="space-y-1.5 text-body-sm text-[#504443]">
                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#5e5e5c]">location_on</span>
                    {showroom.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#5e5e5c]">schedule</span>
                    {showroom.timings}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                <a
                  href={`tel:${showroom.phone.replace(/\s+/g, "")}`}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 border border-outline-variant rounded-xl font-bold text-body-sm text-[#321716] hover:bg-[#f6f3f2] active:scale-95 transition-all text-center"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  Call
                </a>
                <a
                  href={`https://wa.me/${showroom.whatsapp}?text=Hi! I want to inquire about Sri Leather shoes.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 border border-outline-variant rounded-xl font-bold text-body-sm text-[#321716] hover:bg-[#f6f3f2] active:scale-95 transition-all text-center"
                >
                  <span className="material-symbols-outlined text-[18px] text-emerald-600">chat</span>
                  WhatsApp
                </a>
                <a
                  href={showroom.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-[#4a2c2a] text-[#ffdad7] rounded-xl font-bold text-body-sm hover:opacity-90 active:scale-95 transition-all text-center"
                >
                  <span className="material-symbols-outlined text-[18px]">directions</span>
                  Directions
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Mock Map */}
        <div className="space-y-4">
          <h3 className="font-display-lg text-lg font-bold text-[#321716]">Showrooms Map View</h3>
          <div className="relative aspect-[16/9] w-full bg-[#1e1e1a] rounded-2xl overflow-hidden border border-outline-variant/30 shadow-inner flex items-center justify-center">
            {/* Map Roads / Topology Mockup Grid */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 transition-transform duration-300"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M0 10h100M0 50h100M0 90h100M10 0v100M50 0v100M90 0v100' stroke='%234a4740' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
                transform: `scale(${zoomLevel})`,
              }}
            />

            {/* Simulated route lines */}
            <svg
              className="absolute inset-0 w-full h-full stroke-emerald-600/30 stroke-[2] fill-none transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <path d="M 50,0 Q 40,30 35,40 T 48,68 T 65,35" />
            </svg>

            {/* Pins */}
            {showrooms.map((pin) => (
              <div
                key={pin.name}
                className="absolute transition-all duration-300"
                style={{
                  left: pin.x,
                  top: pin.y,
                  transform: `translate(-50%, -100%) scale(${zoomLevel})`,
                }}
              >
                <a
                  href={pin.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group cursor-pointer flex flex-col items-center"
                >
                  {/* Tooltip */}
                  <div
                    className="absolute bottom-full mb-2 bg-[#4a2c2a] text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    {pin.name} (View on Map)
                  </div>
                  {/* Pin Circle Icon */}
                  <div
                    className="w-8 h-8 rounded-full bg-[#4a2c2a] border-2 border-white flex items-center justify-center shadow-lg text-[#ffdad7] active:scale-90 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[16px]">store</span>
                  </div>
                </a>
              </div>
            ))}

            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
              <button
                onClick={handleZoomIn}
                className="w-10 h-10 bg-white/95 text-[#321716] shadow-md border border-outline-variant/30 rounded-xl flex items-center justify-center hover:bg-[#f6f3f2] active:scale-95 transition-all font-bold text-lg cursor-pointer"
              >
                +
              </button>
              <button
                onClick={handleZoomOut}
                className="w-10 h-10 bg-white/95 text-[#321716] shadow-md border border-outline-variant/30 rounded-xl flex items-center justify-center hover:bg-[#f6f3f2] active:scale-95 transition-all font-bold text-lg cursor-pointer"
              >
                -
              </button>
            </div>

            {/* Map Watermark */}
            <div className="absolute bottom-4 left-4 bg-black/45 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] text-white/75 font-semibold tracking-wider uppercase">
              Sri Leather Map HUD v1.2
            </div>
          </div>
        </div>

        {/* Connect With Us Banner */}
        <div className="bg-[#4a2c2a] text-white p-8 rounded-3xl text-center space-y-6 shadow-md relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,224,136,0.12),transparent)]" />
          <div className="relative z-10 space-y-2 max-w-md mx-auto">
            <h3 className="font-display-lg text-2xl font-bold text-[#ffdad7]">Connect With Us</h3>
            <p className="text-body-sm text-[#ffdad7]/80">
              Follow our official social handles and join our WhatsApp channel to stay updated on new styles and announcements.
            </p>
          </div>

          <div className="relative z-10 max-w-lg mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="#"
              className="flex items-center justify-center gap-3 px-5 py-4 bg-[#25d366] text-white font-bold rounded-2xl text-body-sm hover:scale-[1.03] active:scale-[0.98] transition-all shadow-md cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.023-5.102-2.884-6.964-1.861-1.862-4.332-2.884-6.963-2.885-5.437 0-9.863 4.42-9.866 9.865-.001 1.716.463 3.39 1.337 4.888L1.996 22.01l4.651-1.218z" />
              </svg>
              <span>WhatsApp Channel</span>
            </a>

            <a
              href="https://instagram.com/srileathers_hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-5 py-4 bg-gradient-to-tr from-[#f9ce3f] via-[#e1306c] to-[#833ab4] text-white font-bold rounded-2xl text-body-sm hover:scale-[1.03] active:scale-[0.98] transition-all shadow-md cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span>Instagram</span>
            </a>

            <a
              href="https://facebook.com/srileathers"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-5 py-4 bg-[#1877f2] text-white font-bold rounded-2xl text-body-sm hover:scale-[1.03] active:scale-[0.98] transition-all shadow-md cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h3v-9h3.625L16 8h-4V6.71c0-.817.516-1.007.924-1.007H16V2h-3.838C8.91 2 9 5.84 9 6.71V8z" />
              </svg>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
