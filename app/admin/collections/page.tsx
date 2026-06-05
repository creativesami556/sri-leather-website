"use client";

import { useState, useEffect } from "react";
import { products, Product } from "@/lib/products";

interface Collection {
  id: string;
  name: string;
  count: number;
  featured: boolean;
  bannerUrl: string;
}

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Form Fields State
  const [formName, setFormName] = useState("");
  const [formBannerUrl, setFormBannerUrl] = useState("");
  const [formFeatured, setFormFeatured] = useState(false);

  // Load from local storage
  useEffect(() => {
    // Load products
    const savedProducts = localStorage.getItem("sri_leather_admin_products");
    if (savedProducts) {
      setProductsList(JSON.parse(savedProducts));
    } else {
      setProductsList(products);
    }

    // Load collections
    const savedCols = localStorage.getItem("sri_leather_admin_collections");
    if (savedCols) {
      setCollections(JSON.parse(savedCols));
    } else {
      const defaultCols = [
        {
          id: "col-1",
          name: "Heritage Collection",
          count: 12,
          featured: true,
          bannerUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFtazwRJ3wC-TigvKu5Qzp1utPjnFYn7daWOEwWcL4JAdtXMrUdsQGs9OQAi9M2ADQJrE3bRxZ-13G7b754Wg3Cn_ox5g4PTSCtNVqWXg2Y3rmu-x4UehbatMbqNs10yf8oz0uwwMsUqzYB9C2VOA8IABaKe9wGgQ0r5o0icetc6z-KipO14LInjf9VP_TrIbyHwN49VIr71jO458-PG__iWIqBy4fY5jpqhH_p0KK5L-eVshP271AxCwI6bu3iLfrDynyaSzu3B7C",
        },
        {
          id: "col-2",
          name: "Modern Essentials",
          count: 8,
          featured: true,
          bannerUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXXNfbSMo-XcCCIad5iK3-hJCQQSMU9uHnzRbNtZGFMjaFPkzmt7XjSRrNyPL5TyIOGdOemJczbD4GLhnQicq1HKmiv0naazKuW7Y3L_iBYFJOpteXhG9u3ps-zJN8Gqd96vkzm5FQFr9qwFG7mRydv1vzyR8QNTPmPK03TrAD4_6Eh45_hVqNJxVr3MuWW4NP7aPzM6-Wzd92J41Wy4v0hUW7Xzvcq8W4k-93win5HcT1gfDIIIdryEaGtAHo4BZblLihB9Gu4aRO",
        },
        {
          id: "col-3",
          name: "School Collection",
          count: 6,
          featured: false,
          bannerUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHTW34avxTgISpZ9YpPnhakILwhuv3IRNXDay_njJ-ctNOl0eskqlvVNGuRbJvbhtXh8K4qydkah0ImxUxlzX_4FXoFxMQB9OCN22ZRlToZSz_YjozPltUSUC4RiAhirWUTv7LXJ7wPxk9dRqX-NPHmUwmG5OYGkxhYCDI2_PwanaSNLbfIDGXkaWiRZmCDQBaVeODLi4rX5C03XV-TxZ9089RukUL9zC--M68FwSmjH-ET7rW-f_xS6SZZgeUbydtc30KvpKCPpjE",
        },
      ];
      setCollections(defaultCols);
      localStorage.setItem("sri_leather_admin_collections", JSON.stringify(defaultCols));
    }
  }, []);

  const getAssociatedCount = (colName: string) => {
    return productsList.filter(
      (p) => p.collection.toLowerCase() === colName.toLowerCase()
    ).length;
  };

  const handleToggleFeatured = (id: string) => {
    const updated = collections.map((c) =>
      c.id === id ? { ...c, featured: !c.featured } : c
    );
    setCollections(updated);
    localStorage.setItem("sri_leather_admin_collections", JSON.stringify(updated));
  };

  const handleOpenAddModal = () => {
    setModalMode("add");
    setSelectedId(null);
    setFormName("");
    setFormBannerUrl("");
    setFormFeatured(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (col: Collection) => {
    setModalMode("edit");
    setSelectedId(col.id);
    setFormName(col.name);
    setFormBannerUrl(col.bannerUrl);
    setFormFeatured(col.featured);
    setIsModalOpen(true);
  };

  const handleSaveCollection = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: Collection[];

    const computedCount = getAssociatedCount(formName);

    if (modalMode === "add") {
      const newCol: Collection = {
        id: `col-${Date.now()}`,
        name: formName,
        count: computedCount,
        featured: formFeatured,
        bannerUrl: formBannerUrl || "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
      };
      updated = [...collections, newCol];
    } else {
      updated = collections.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              name: formName,
              count: computedCount,
              featured: formFeatured,
              bannerUrl: formBannerUrl,
            }
          : c
      );
    }

    setCollections(updated);
    localStorage.setItem("sri_leather_admin_collections", JSON.stringify(updated));
    setIsModalOpen(false);
  };

  const handleDeleteCollection = (id: string) => {
    if (confirm("Are you sure you want to delete this collection banner?")) {
      const updated = collections.filter((c) => c.id !== id);
      setCollections(updated);
      localStorage.setItem("sri_leather_admin_collections", JSON.stringify(updated));
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-8 pb-24 relative">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-display-lg text-2xl font-bold text-[#321716]">Banners &amp; Collections</h3>
          <p className="font-body-sm text-[#504443] mt-1">Configure primary homepage banners and product sets.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 bg-[#4a2c2a] text-[#ffdad7] text-xs font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          New Banner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((col) => (
          <div
            key={col.id}
            className="bg-white border border-[#d4c3c1]/40 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group"
          >
            <div className="relative h-44 bg-[#eae7e7] overflow-hidden">
              <img
                src={col.bannerUrl}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                alt={col.name}
              />
              <span
                className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                  col.featured ? "bg-[#ffe088] text-[#241a00]" : "bg-white/80 text-[#504443]"
                }`}
              >
                {col.featured ? "Featured Spotlight" : "Draft Collection"}
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-display-lg text-lg font-bold text-[#321716]">{col.name}</h4>
                <p className="text-xs text-[#504443] mt-1">{getAssociatedCount(col.name)} associated products</p>
              </div>
              <div className="flex justify-between items-center pt-4 mt-2 border-t border-[#d4c3c1]/20">
                <button
                  onClick={() => handleToggleFeatured(col.id)}
                  className="text-xs font-bold text-[#4a2c2a] hover:underline cursor-pointer"
                >
                  {col.featured ? "Deactivate" : "Make Featured"}
                </button>
                <button
                  onClick={() => handleOpenEditModal(col)}
                  className="px-3 py-1.5 border border-[#d4c3c1] rounded-lg text-xs font-semibold hover:bg-[#fcf9f8] cursor-pointer"
                >
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div
            className="bg-[#fcf9f8] w-full max-w-lg rounded-2xl border border-[#d4c3c1]/60 shadow-2xl p-6 md:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-display-lg text-xl font-bold text-[#321716]">
                {modalMode === "add" ? "Create Banner Collection" : "Edit Banner details"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#504443] hover:text-[#321716] cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveCollection} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#504443] uppercase tracking-wider block">
                  Collection Name
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-[#fcf9f8] border border-[#d4c3c1]/80 rounded-xl px-4 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-[#321716] focus:border-transparent outline-none"
                  placeholder="e.g. Classic Oxfords"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#504443] uppercase tracking-wider block">
                  Banner Image URL
                </label>
                <input
                  type="url"
                  value={formBannerUrl}
                  onChange={(e) => setFormBannerUrl(e.target.value)}
                  className="w-full bg-[#fcf9f8] border border-[#d4c3c1]/80 rounded-xl px-4 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-[#321716] focus:border-transparent outline-none"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-[10px] text-[#504443]">
                  Leave empty to auto-assign a default high-quality leather placeholder.
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-4">
                <input
                  type="checkbox"
                  id="modalFeatured"
                  checked={formFeatured}
                  onChange={(e) => setFormFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-[#321716] border-[#827472] focus:ring-[#321716]"
                />
                <label htmlFor="modalFeatured" className="text-xs font-bold text-[#321716] cursor-pointer">
                  Featured Spotlight
                </label>
              </div>

              <div className="pt-4 border-t border-[#d4c3c1]/20 flex justify-between gap-3">
                {modalMode === "edit" ? (
                  <button
                    type="button"
                    onClick={() => selectedId && handleDeleteCollection(selectedId)}
                    className="px-4 py-2.5 bg-[#ba1a1a] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:opacity-95 active:scale-95 transition-all cursor-pointer"
                  >
                    Delete Banner
                  </button>
                ) : (
                  <div></div>
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 border border-[#321716] text-[#321716] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#eae7e7] transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#4a2c2a] text-[#ffdad7] font-bold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
