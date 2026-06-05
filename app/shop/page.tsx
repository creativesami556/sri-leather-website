"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import FilterDrawer from "@/components/FilterDrawer";
import { products, Product } from "@/lib/products";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All Collection";
  const searchQuery = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Popular");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState(searchQuery);

  const [activeFilters, setActiveFilters] = useState<{
    genders: string[];
    maxPrice: number;
    size: number | null;
    color: string | null;
  }>({
    genders: [],
    maxPrice: 10000,
    size: null,
    color: null,
  });

  // Sync category & search query from URL search parameters
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      // Map slug to category name
      const mapping: { [key: string]: string } = {
        men: "Men",
        women: "Women",
        kids: "Kids",
        formal: "Formal",
        sports: "Sports",
        school: "School",
        sneakers: "Sneakers",
        loafers: "Loafers",
        accessories: "Accessories",
      };
      setSelectedCategory(mapping[cat.toLowerCase()] || "All Collection");
    } else {
      setSelectedCategory("All Collection");
    }
  }, [searchParams]);

  useEffect(() => {
    setSearchFilter(searchParams.get("q") || "");
  }, [searchParams]);

  const categories = [
    "All Collection",
    "Men",
    "Women",
    "Kids",
    "Formal",
    "Sports",
    "School",
    "Sneakers",
    "Loafers",
    "Accessories",
  ];

  const [productsList, setProductsList] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("sri_leather_admin_products");
    if (saved) {
      setProductsList(JSON.parse(saved));
    } else {
      setProductsList(products);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...productsList];

    // Filter by search query
    if (searchFilter) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
          p.collection.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    // Filter by selected category pill
    if (selectedCategory && selectedCategory !== "All Collection") {
      result = result.filter((p) => p.categories.includes(selectedCategory));
    }

    // Filter by selected genders from Drawer
    if (activeFilters.genders.length > 0) {
      result = result.filter((p) =>
        activeFilters.genders.some((gender) => p.categories.includes(gender))
      );
    }

    // Filter by price range max limit
    result = result.filter((p) => p.price <= activeFilters.maxPrice);

    // Filter by size
    if (activeFilters.size !== null) {
      result = result.filter((p) => p.sizes.includes(activeFilters.size!));
    }

    // Filter by color
    if (activeFilters.color !== null) {
      result = result.filter((p) =>
        p.colors.some((c) => c.hex.toLowerCase() === activeFilters.color!.toLowerCase())
      );
    }

    // Apply sorting
    if (sortOption === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Newest") {
      result.sort((a, b) => (a.badge === "New" ? -1 : 1));
    }

    return result;
  }, [searchFilter, selectedCategory, sortOption, productsList, activeFilters]);

  return (
    <main className="max-w-container-max mx-auto min-h-screen px-margin-mobile md:px-margin-desktop pt-4 pb-12">
      {/* Search & Filter Mobile Section */}
      <section className="md:hidden pt-2 pb-4">
        <div className="w-full bg-surface-container-low flex items-center px-4 py-3 rounded-xl border border-outline-variant/30 focus-within:border-primary-container transition-all">
          <span className="material-symbols-outlined text-outline mr-2">search</span>
          <input
            className="bg-transparent border-none outline-none focus:ring-0 text-body-md w-full text-on-surface"
            placeholder="Search products..."
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
      </section>

      {/* Category Horizontal Scroll */}
      <section className="py-2 border-b border-outline-variant/10">
        <div className="flex gap-3 overflow-x-auto hide-scrollbar py-2 flex-nowrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-label-uppercase text-label-uppercase whitespace-nowrap transition-all cursor-pointer font-bold ${
                selectedCategory === cat
                  ? "bg-primary-container text-on-primary-container border-primary"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-highest"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Toolbar: Filters & Sorting */}
      <section className="py-6 flex items-center justify-between border-b border-outline-variant/10 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg font-label-uppercase text-label-uppercase hover:bg-surface-container-low transition-all cursor-pointer font-bold text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            Filters
            {(activeFilters.genders.length > 0 ||
              activeFilters.maxPrice < 10000 ||
              activeFilters.size !== null ||
              activeFilters.color !== null) && (
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            )}
          </button>
          <p className="hidden md:block text-body-sm text-on-surface-variant">
            Showing {filteredProducts.length} products
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg font-label-uppercase text-label-uppercase hover:bg-surface-container-low transition-all cursor-pointer font-bold text-on-surface"
          >
            Sort By: {sortOption}
            <span className="material-symbols-outlined text-[20px]">expand_more</span>
          </button>
          {isSortDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsSortDropdownOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface shadow-2xl rounded-xl border border-outline-variant/10 transition-all z-40 p-2">
                {["Popular", "Price: Low to High", "Price: High to Low", "Newest"].map(
                  (opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSortOption(opt);
                        setIsSortDropdownOpen(false);
                      }}
                      className="w-full text-left block px-4 py-3 text-body-sm hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer text-on-surface"
                    >
                      {opt}
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </section>
      ) : (
        <section className="flex flex-col items-center justify-center py-24 text-center">
          <span className="material-symbols-outlined text-6xl text-outline mb-4">
            sentiment_dissatisfied
          </span>
          <h4 className="text-body-lg font-bold text-primary">No products found</h4>
          <p className="text-body-sm text-outline mt-2">
            Try adjusting your filters or category tabs to discover more leather craft.
          </p>
        </section>
      )}
      {/* Filter Side Panel */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        activeFilters={activeFilters}
        onApplyFilters={(filters) => setActiveFilters(filters)}
      />
    </main>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen py-24 gap-4">
        <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
        <p className="font-label-uppercase text-label-uppercase text-outline-variant">Loading Shop Catalog...</p>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
