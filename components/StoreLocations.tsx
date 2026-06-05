"use client";

import Link from "next/link";

export default function StoreLocations() {
  const stores = [
    {
      name: "Ashok Nagar",
      type: "Main Branch",
      mapUrl: "https://www.google.com/maps/place/Sri+Leather/@17.5053928,78.3051429,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb92a687b4a4d1:0xfaf7b984a3bd5034!8m2!3d17.5053928!4d78.3077178!16s%2Fg%2F11bc8xbhd_?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Ameenpur",
      type: "Branch",
      mapUrl: "https://www.google.com/maps/place/NEW+SRI+LEATHER/@17.5234603,78.2605547,14z/data=!4m10!1m2!2m1!1sSri+Leather+Beeramguda+Hyderabad!3m6!1s0x3bcb93b396aa2dd7:0x6ee5748034e6feff!8m2!3d17.5068995!4d78.3186427!15sCiBTcmkgTGVhdGhlciBCZWVyYW1ndWRhIEh5ZGVyYWJhZJIBCnNob2Vfc3RvcmXgAQA!16s%2Fg%2F11wpy2t0gk?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Beeramguda",
      type: "Modern Retail Outlet",
      mapUrl: "https://www.google.com/maps/place/NEW+SRI+LEATHER/@17.5242927,78.2969511,17z/data=!4m15!1m8!3m7!1s0x3bcb8d4e7b39c6e5:0xf42493cf52ad0aa2!2sBeram+Guda,+Sri+Krishna+Nagar+Colony,+Raghavendra+Colony,+Ramachandrapuram,+Hyderabad,+Telangana+502032!3b1!8m2!3d17.5244229!4d78.2999311!16s%2Fg%2F1s04dgkqn!3m5!1s0x3bcb8df0d6ddbe5f:0x9f876ff600a6e9d2!8m2!3d17.5234603!4d78.2986635!16s%2Fg%2F11wc1tycbv?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D",
    },
  ];

  return (
    <section className="py-12 px-margin-mobile max-w-container-max mx-auto">
      <h3 className="font-headline-sm text-headline-sm text-primary mb-6">
        Our Hyderabad Showrooms
      </h3>
      <div className="space-y-4">
        {stores.map((store) => (
          <div
            key={store.name}
            className="flex items-center justify-between p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors"
          >
            <div>
              <h5 className="font-body-lg font-bold text-on-surface">{store.name}</h5>
              <p className="text-body-sm text-on-surface-variant">{store.type}</p>
            </div>
            <a
              href={store.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:scale-110 active:scale-95 transition-transform flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/50"
            >
              <span className="material-symbols-outlined">map</span>
            </a>
          </div>
        ))}
      </div>
      <Link
        href="/locations"
        className="w-full mt-6 py-4 border border-primary text-primary hover:bg-[#321716] hover:border-[#321716] hover:text-white rounded-xl font-label-uppercase text-label-uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
      >
        <span className="material-symbols-outlined">location_on</span> View All Stores
      </Link>
    </section>
  );
}
