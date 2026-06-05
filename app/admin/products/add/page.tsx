"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { products, Product } from "@/lib/products";

function AddProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  // Form states
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [category, setCategory] = useState("Formal");
  const [gender, setGender] = useState("Men");
  const [collection, setCollection] = useState("Heritage Elite");
  const [material, setMaterial] = useState("Full Grain Leather");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [globalStock, setGlobalStock] = useState("35");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTrending, setIsTrending] = useState(true);
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop");
  const [badgeText, setBadgeText] = useState("");

  // Variants
  const [variants, setVariants] = useState([
    { color: "Dark Chocolate", size: 42, stock: 15, sku: "SL-OX-DC-42", hex: "#4A2C2A" },
    { color: "Chestnut Brown", size: 42, stock: 8, sku: "SL-OX-CB-42", hex: "#8B4513" },
  ]);

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Collections lookup
  const [collectionOptions, setCollectionOptions] = useState<string[]>([]);

  useEffect(() => {
    const savedCols = localStorage.getItem("sri_leather_admin_collections");
    if (savedCols) {
      const cols = JSON.parse(savedCols);
      setCollectionOptions(cols.map((c: any) => c.name));
    } else {
      setCollectionOptions(["Heritage Collection", "Modern Essentials", "School Collection"]);
    }
  }, []);

  useEffect(() => {
    if (editId) {
      const saved = localStorage.getItem("sri_leather_admin_products");
      const list: Product[] = saved ? JSON.parse(saved) : products;
      const match = list.find((p) => p.id === editId);
      if (match) {
        setTitle(match.title);
        setArticle(match.article);
        setCategory(match.categories[1] || match.categories[0] || "Formal");
        setGender(
          match.categories.includes("Women")
            ? "Women"
            : match.categories.includes("Kids")
            ? "Kids"
            : match.categories.includes("Unisex")
            ? "Unisex"
            : "Men"
        );
        setCollection(match.collection || "");
        setMaterial(match.features[0] || "Premium Hide");
        setPrice(match.price.toString());
        setOriginalPrice(match.originalPrice ? match.originalPrice.toString() : "");
        setIsNewArrival(match.badge?.toLowerCase().includes("new") || false);
        setImageUrl(match.image);
        setBadgeText(match.badge || "");

        // Load variants from product colors & sizes
        if (match.colors && match.colors.length > 0) {
          const loadedVariants = match.colors.flatMap((c) => {
            const productSizes = match.sizes && match.sizes.length > 0 ? match.sizes : [40];
            return productSizes.map((sz, idx) => ({
              color: c.name,
              size: sz,
              stock: 10,
              sku: `SL-VAR-${c.name.substring(0, 2).toUpperCase()}-${sz}-${idx}-${Date.now().toString().slice(-4)}`,
              hex: c.hex,
            }));
          });
          setVariants(loadedVariants);
        }
      }
    }
  }, [editId]);

  const handleAddVariant = () => {
    setVariants([
      ...variants,
      {
        color: "Tan",
        size: 40,
        stock: 10,
        sku: `SL-VAR-${Date.now()}`,
        hex: "#D4AF37",
      },
    ]);
  };

  const handleDeleteVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleUpdateVariant = (index: number, key: string, value: string | number) => {
    setVariants(
      variants.map((v, i) => (i === index ? { ...v, [key]: value } : v))
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !article) {
      alert("Please fill in Product Name, Article #, and Price.");
      return;
    }

    setSaving(true);

    setTimeout(() => {
      const saved = localStorage.getItem("sri_leather_admin_products");
      let list: Product[] = saved ? JSON.parse(saved) : [...products];

      const productCategories = [gender, category];

      const newProduct: Product = {
        id: editId || `prod-new-${Date.now()}`,
        title,
        article,
        collection: collection || (isNewArrival ? "NEW ARRIVAL" : "CLASSIC"),
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        image: imageUrl,
        alt: `${title} luxury leather shoe`,
        badge: badgeText || (isNewArrival ? "NEW ARRIVAL" : isFeatured ? "FEATURED" : undefined),
        categories: productCategories,
        description: `Handcrafted premium shoe styled in high-grade ${material} with tailored support.`,
        features: [
          material,
          "Stitched leather welt details",
          "Ergonomic padded ortholite insoles",
          "High-grip premium outsoles"
        ],
        colors: variants.map((v) => ({ name: v.color, hex: v.hex })),
        sizes: Array.from(new Set(variants.map((v) => Number(v.size)))),
        thumbnails: [imageUrl],
      };

      if (editId) {
        list = list.map((p) => (p.id === editId ? newProduct : p));
      } else {
        list.push(newProduct);
      }

      localStorage.setItem("sri_leather_admin_products", JSON.stringify(list));
      setSaving(false);
      setSavedSuccess(true);

      setTimeout(() => {
        router.push("/admin/products");
      }, 1500);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-32">
      {savedSuccess && (
        <div className="fixed top-24 right-8 bg-[#4a2c2a] text-[#ffdad7] border border-[#ffe088] px-6 py-3 rounded-xl shadow-xl z-50 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[20px] text-[#ffe088]">check_circle</span>
          <span className="text-body-sm font-semibold">Product Saved Successfully! Redirecting...</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-12">
        {/* Section 1: Basic Info */}
        <section className="space-y-6">
          <div className="border-l-4 border-[#321716] pl-4">
            <h3 className="font-display-lg text-xl font-bold text-[#321716]">Basic Information</h3>
            <p className="text-body-sm text-[#504443]">Essential details for the product registry.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#504443] uppercase tracking-wider block">Product Name</label>
              <input
                type="text"
                placeholder="e.g. Classic Oxford Brogue"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-[#d4c3c1] py-2 focus:ring-0 focus:border-[#321716] transition-all text-body-md outline-none"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#504443] uppercase tracking-wider block">Article #</label>
              <input
                type="text"
                placeholder="e.g. SL-102"
                value={article}
                onChange={(e) => setArticle(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-[#d4c3c1] py-2 focus:ring-0 focus:border-[#321716] transition-all text-body-md outline-none"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#504443] uppercase tracking-wider block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-[#d4c3c1] py-2 focus:ring-0 focus:border-[#321716] transition-all text-body-md outline-none"
              >
                <option value="Formal">Formal</option>
                <option value="Sports">Sports</option>
                <option value="School">School</option>
                <option value="Sneakers">Sneakers</option>
                <option value="Loafers">Loafers</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#504443] uppercase tracking-wider block">Target Segment / Gender</label>
              <div className="flex gap-4 pt-2">
                {["Men", "Women", "Kids", "Unisex"].map((g) => (
                  <label key={g} className="flex items-center gap-2 cursor-pointer text-body-sm font-semibold">
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === g}
                      onChange={() => setGender(g)}
                      className="w-4 h-4 text-[#321716] border-[#827472] focus:ring-[#321716]"
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#504443] uppercase tracking-wider block">Collection / Line</label>
              <select
                value={collectionOptions.includes(collection) ? collection : "Custom"}
                onChange={(e) => {
                  if (e.target.value === "Custom") {
                    setCollection("");
                  } else {
                    setCollection(e.target.value);
                  }
                }}
                className="w-full bg-transparent border-0 border-b border-[#d4c3c1] py-2 focus:ring-0 focus:border-[#321716] transition-all text-body-md outline-none cursor-pointer"
              >
                {collectionOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
                <option value="Custom">Custom / Enter New...</option>
              </select>
              {!collectionOptions.includes(collection) && (
                <input
                  type="text"
                  placeholder="Enter custom collection name"
                  value={collection}
                  onChange={(e) => setCollection(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-[#d4c3c1] py-2 mt-2 focus:ring-0 focus:border-[#321716] transition-all text-body-md outline-none"
                />
              )}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#504443] uppercase tracking-wider block">Material</label>
              <input
                type="text"
                placeholder="Full Grain Calf Leather"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-[#d4c3c1] py-2 focus:ring-0 focus:border-[#321716] transition-all text-body-md outline-none"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Pricing & Logistics */}
        <section className="space-y-6">
          <div className="border-l-4 border-[#321716] pl-4">
            <h3 className="font-display-lg text-xl font-bold text-[#321716]">Pricing & Layout</h3>
            <p className="text-body-sm text-[#504443]">Manage active price figures and listing attributes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#504443] uppercase tracking-wider block">Price (INR)</label>
              <input
                type="number"
                placeholder="e.g. 3999"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-[#d4c3c1] py-2 focus:ring-0 focus:border-[#321716] transition-all text-body-md outline-none"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#504443] uppercase tracking-wider block">Original Price (INR) (Optional)</label>
              <input
                type="number"
                placeholder="e.g. 5999"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-[#d4c3c1] py-2 focus:ring-0 focus:border-[#321716] transition-all text-body-md outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#504443] uppercase tracking-wider block">Badge Label (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Sale, 20% OFF"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-[#d4c3c1] py-2 focus:ring-0 focus:border-[#321716] transition-all text-body-md outline-none"
              />
            </div>
            <div className="flex items-center gap-6 pt-6">
              <label className="flex items-center gap-2 cursor-pointer text-body-sm font-semibold text-[#321716]">
                <input
                  type="checkbox"
                  checked={isNewArrival}
                  onChange={(e) => setIsNewArrival(e.target.checked)}
                  className="rounded text-[#321716] border-[#827472] focus:ring-[#321716]"
                />
                <span>Set as New Arrival</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-body-sm font-semibold text-[#321716]">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-[#321716] border-[#827472] focus:ring-[#321716]"
                />
                <span>Showcase in Featured</span>
              </label>
            </div>
          </div>
        </section>

        {/* Section 3: Media Upload */}
        <section className="space-y-6">
          <div className="border-l-4 border-[#321716] pl-4">
            <h3 className="font-display-lg text-xl font-bold text-[#321716]">Product Image</h3>
            <p className="text-body-sm text-[#504443]">Provide a valid URL to show the item in storefront.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#504443] uppercase tracking-wider block">Image Source URL</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-[#d4c3c1] py-2 focus:ring-0 focus:border-[#321716] transition-all text-body-md outline-none"
              />
            </div>
            {imageUrl && (
              <div className="relative w-40 h-40 rounded-xl overflow-hidden border border-[#d4c3c1] group bg-stone-100 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute top-1 right-1 bg-red-100 text-[#ba1a1a] rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Section 4: Variant Manager */}
        <section className="space-y-6">
          <div className="border-l-4 border-[#321716] pl-4 flex justify-between items-end">
            <div>
              <h3 className="font-display-lg text-xl font-bold text-[#321716]">Variants</h3>
              <p className="text-body-sm text-[#504443]">Manage sizes, colors, and stock per variant.</p>
            </div>
            <button
              onClick={handleAddVariant}
              type="button"
              className="flex items-center gap-1 text-[#321716] font-bold text-xs uppercase hover:underline cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Add Variant
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {variants.map((variant, index) => (
              <div key={index} className="p-5 bg-white rounded-xl border border-[#d4c3c1]/40 flex flex-col sm:flex-row gap-4 shadow-sm relative">
                <div className="flex items-center gap-3 sm:flex-col sm:justify-center">
                  <div className="w-16 h-16 bg-[#fcf9f8] rounded-lg flex items-center justify-center border border-[#d4c3c1]/30 relative cursor-pointer group hover:bg-[#f6f3f2] transition-colors">
                    <div
                      className="w-10 h-10 rounded-full shadow-inner border border-[#d4c3c1]/20 group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: variant.hex }}
                    />
                    <input
                      type="color"
                      value={variant.hex}
                      onChange={(e) => handleUpdateVariant(index, "hex", e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      title="Choose color manually"
                    />
                  </div>
                  <span className="text-[9px] font-bold text-[#321716]/60 text-center uppercase tracking-wider hidden sm:block">
                    Click to pick
                  </span>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-start pr-6">
                    <div>
                      <h4 className="font-bold text-sm text-[#321716]">
                        {variant.color || "Unnamed Color"} / UK {variant.size}
                      </h4>
                    </div>
                    <button
                      onClick={() => handleDeleteVariant(index)}
                      className="absolute top-4 right-4 text-[#504443] hover:text-[#ba1a1a] transition-colors cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-[#504443] block mb-1 font-bold">Color Name</label>
                      <input
                        type="text"
                        value={variant.color}
                        onChange={(e) => handleUpdateVariant(index, "color", e.target.value)}
                        className="w-full bg-[#fcf9f8] border-0 border-b border-[#d4c3c1] px-2 py-1 text-xs focus:ring-0 focus:border-[#321716]"
                        placeholder="e.g. Tan"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-[#504443] block mb-1 font-bold">Size (UK)</label>
                      <select
                        value={variant.size}
                        onChange={(e) => handleUpdateVariant(index, "size", Number(e.target.value))}
                        className="w-full bg-[#fcf9f8] border-0 border-b border-[#d4c3c1] px-2 py-1 text-xs focus:ring-0 focus:border-[#321716]"
                      >
                        {[6, 7, 8, 9, 10, 11].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-[#504443] block mb-1 font-bold">Stock</label>
                      <input
                        type="number"
                        value={variant.stock}
                        onChange={(e) => handleUpdateVariant(index, "stock", Number(e.target.value))}
                        className="w-full bg-[#fcf9f8] border-0 border-b border-[#d4c3c1] px-2 py-1 text-xs focus:ring-0 focus:border-[#321716]"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-wider text-[#504443] block mb-1 font-bold">SKU</label>
                      <input
                        type="text"
                        value={variant.sku}
                        onChange={(e) => handleUpdateVariant(index, "sku", e.target.value)}
                        className="w-full bg-[#fcf9f8] border-0 border-b border-[#d4c3c1] px-2 py-1 text-xs focus:ring-0 focus:border-[#321716]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sticky Footer Actions */}
        <footer className="fixed bottom-0 left-0 right-0 md:left-64 bg-white border-t border-[#d4c3c1]/50 p-4 z-40 flex items-center justify-end gap-4 backdrop-blur-md bg-white/95 shadow-md">
          <div className="max-w-5xl w-full mx-auto flex justify-end gap-4 px-6">
            <button
              type="button"
              onClick={() => router.push("/admin/products")}
              className="px-6 py-2.5 rounded-full border border-[#321716] text-[#321716] font-bold text-xs uppercase tracking-wider hover:bg-[#f6f3f2] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-full bg-[#4a2c2a] text-[#ffdad7] font-bold text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer min-w-[130px] justify-center"
            >
              {saving ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                  Saving...
                </>
              ) : (
                <>Save Product</>
              )}
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}

export default function AddProductPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-[#504443]">Loading form...</div>}>
      <AddProductForm />
    </Suspense>
  );
}
