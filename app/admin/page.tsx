"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { products, Product } from "@/lib/products";

export default function AdminDashboardPage() {
  const [adminProducts, setAdminProducts] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("sri_leather_admin_products");
    if (saved) {
      setAdminProducts(JSON.parse(saved));
    } else {
      // Initialize with catalog products
      setAdminProducts(products);
      localStorage.setItem("sri_leather_admin_products", JSON.stringify(products));
    }
  }, []);

  // Simple computations
  const totalProductsCount = adminProducts.length;
  const activeOffersCount = adminProducts.filter((p) => p.discount).length || 3;
  const lowStockCount = 8; // Simulated low stock warning indicator
  const uniqueCategories = Array.from(new Set(adminProducts.flatMap((p) => p.categories))).length || 6;

  // Recent 5 arrivals
  const recentArrivals = adminProducts.slice(-5).reverse();

  return (
    <div className="space-y-10 pb-20">
      {/* Analytics Section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-[#FDFBF7] p-5 rounded-xl border border-[#d4c3c1]/30 shadow-sm flex flex-col gap-2 hover:-translate-y-1 transition-transform">
          <span className="material-symbols-outlined text-[#321716] text-[28px]">inventory_2</span>
          <div>
            <p className="text-[#504443] font-semibold text-[11px] uppercase tracking-wider">Total Products</p>
            <p className="font-display-lg text-2xl font-bold text-[#321716] mt-1">{totalProductsCount}</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-[#FDFBF7] p-5 rounded-xl border border-[#d4c3c1]/30 shadow-sm flex flex-col gap-2 hover:-translate-y-1 transition-transform">
          <span className="material-symbols-outlined text-[#321716] text-[28px]">campaign</span>
          <div>
            <p className="text-[#504443] font-semibold text-[11px] uppercase tracking-wider">Active Offers</p>
            <p className="font-display-lg text-2xl font-bold text-[#321716] mt-1">{activeOffersCount}</p>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-[#FDFBF7] p-5 rounded-xl border border-[#d4c3c1]/30 shadow-sm flex flex-col gap-2 hover:-translate-y-1 transition-transform">
          <span className="material-symbols-outlined text-[#ba1a1a] text-[28px]">priority_high</span>
          <div>
            <p className="text-[#504443] font-semibold text-[11px] uppercase tracking-wider">Low Stock</p>
            <p className="font-display-lg text-2xl font-bold text-[#321716] mt-1">{lowStockCount}</p>
          </div>
        </div>
        {/* Card 4 */}
        <div className="bg-[#FDFBF7] p-5 rounded-xl border border-[#d4c3c1]/30 shadow-sm flex flex-col gap-2 hover:-translate-y-1 transition-transform">
          <span className="material-symbols-outlined text-[#321716] text-[28px]">category</span>
          <div>
            <p className="text-[#504443] font-semibold text-[11px] uppercase tracking-wider">Categories</p>
            <p className="font-display-lg text-2xl font-bold text-[#321716] mt-1">{uniqueCategories}</p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="font-semibold text-xs text-[#504443] uppercase tracking-widest mb-4">Quick Actions</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          <Link
            href="/admin/products/add"
            className="flex-shrink-0 flex items-center gap-2 bg-[#4a2c2a] text-[#ffdad7] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add Product
          </Link>
          <Link
            href="/admin/collections"
            className="flex-shrink-0 flex items-center gap-2 border border-[#321716] text-[#321716] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#eae7e7] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">view_carousel</span>
            Manage Banners
          </Link>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="bg-white border border-[#d4c3c1]/30 p-6 rounded-2xl shadow-sm space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-display-lg text-xl font-bold text-[#321716]">Recent Arrivals</h2>
            <p className="text-xs text-[#504443] mt-1">Latest additions to the Sri Leather inventory.</p>
          </div>
          <Link
            href="/admin/products"
            className="text-xs font-bold text-amber-800 hover:underline uppercase tracking-wider"
          >
            View All
          </Link>
        </div>

        <div className="divide-y divide-[#d4c3c1]/15">
          {recentArrivals.map((prod) => (
            <div key={prod.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0 hover:bg-[#fcf9f8]/40 transition-colors rounded-xl px-2">
              <div className="h-16 w-16 bg-[#eae7e7] rounded-lg overflow-hidden flex-shrink-0">
                <img alt={prod.alt} className="w-full h-full object-cover" src={prod.image} />
              </div>
              <div className="flex-grow">
                <p className="font-body-md font-bold text-[#321716]">{prod.title}</p>
                <p className="text-[#504443] text-xs">Art: {prod.article} • {prod.collection || "Regular Collection"}</p>
              </div>
              <div className="text-right">
                <p className="text-[#321716] font-extrabold text-sm">₹{prod.price.toLocaleString("en-IN")}</p>
                {prod.discount ? (
                  <span className="text-[9px] font-bold bg-[#ffe088] text-[#241a00] px-2 py-0.5 rounded-full mt-1 inline-block uppercase">
                    {prod.discount}
                  </span>
                ) : (
                  <span className="text-[9px] font-bold bg-[#fcf9f8] text-[#504443] border border-[#d4c3c1] px-2 py-0.5 rounded-full mt-1 inline-block uppercase">
                    Active
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Action Button for Adding New Item */}
      <Link
        href="/admin/products/add"
        className="fixed bottom-20 right-6 h-14 w-14 rounded-full bg-[#4a2c2a] text-[#ffdad7] shadow-xl flex items-center justify-center hover:opacity-90 active:scale-90 transition-transform z-40 md:hidden"
        title="Add Product"
      >
        <span className="material-symbols-outlined text-[30px]">add</span>
      </Link>
    </div>
  );
}
