"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products, Product } from "@/lib/products";

export default function ManageProductsPage() {
  const router = useRouter();
  const [adminProducts, setAdminProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Notification states
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("sri_leather_admin_products");
    if (saved) {
      setAdminProducts(JSON.parse(saved));
    } else {
      setAdminProducts(products);
      localStorage.setItem("sri_leather_admin_products", JSON.stringify(products));
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const saveToStorage = (updatedList: Product[]) => {
    setAdminProducts(updatedList);
    localStorage.setItem("sri_leather_admin_products", JSON.stringify(updatedList));
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const updated = adminProducts.filter((p) => p.id !== id);
      saveToStorage(updated);
      triggerToast(`Successfully deleted "${title}"`);
    }
  };

  const handleDuplicate = (product: Product) => {
    const newId = `prod-dup-${Date.now()}`;
    const newArticle = `${product.article}-DUP`;
    const duplicatedProduct: Product = {
      ...product,
      id: newId,
      title: `${product.title} (Copy)`,
      article: newArticle,
    };
    const updated = [duplicatedProduct, ...adminProducts];
    saveToStorage(updated);
    triggerToast(`Duplicated "${product.title}" as "${duplicatedProduct.title}"`);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/products/add?id=${id}`);
  };

  // Filtering products
  const filteredProducts = adminProducts.filter((p) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      p.title.toLowerCase().includes(query) ||
      p.article.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query);

    const matchesCategory =
      activeCategory === "All" ||
      p.categories.some((cat) => cat.toLowerCase() === activeCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  // Pagination calculations
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );



  return (
    <div className="space-y-8 pb-24 relative">
      {/* Toast alert popup */}
      {toastMessage && (
        <div className="fixed top-24 right-8 bg-[#4a2c2a] text-[#ffdad7] border border-[#ffe088] px-6 py-3 rounded-xl shadow-xl z-50 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[20px] text-[#ffe088]">check_circle</span>
          <span className="text-body-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Actions Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="font-display-lg text-2xl md:text-3xl font-bold text-[#321716]">Manage Products</h3>
          <p className="font-body-sm text-[#504443] mt-1">Oversee and update your premium footwear catalog.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Search bar */}
          <div className="relative flex-1 md:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#504443]">
              search
            </span>
            <input
              type="text"
              placeholder="Search by name, article..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#d4c3c1]/70 rounded-xl focus:ring-2 focus:ring-[#321716] focus:border-transparent transition-all outline-none text-body-sm text-[#1c1b1b]"
            />
          </div>

          {/* Quick Category filter button */}
          <select
            value={activeCategory}
            onChange={(e) => {
              setActiveCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2.5 border border-[#d4c3c1] rounded-xl bg-white text-body-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#321716]"
          >
            <option value="All">All Categories</option>
            <option value="Formal">Formal</option>
            <option value="Casual">Casual</option>
            <option value="Sneakers">Sneakers</option>
            <option value="Accessories">Accessories</option>
          </select>

          {/* Add Product link */}
          <Link
            href="/admin/products/add"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#4a2c2a] text-[#ffdad7] rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-sm font-semibold text-body-sm"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Add Product
          </Link>
        </div>
      </section>

      {/* Inventory Table / List */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#d4c3c1]/40 overflow-hidden">
        <div className="overflow-x-auto">
          {/* Desktop Table View */}
          <table className="w-full text-left border-collapse hidden md:table">
            <thead>
              <tr className="bg-[#fcf9f8] border-b border-[#d4c3c1]/40">
                <th className="px-6 py-4 font-semibold text-xs text-[#504443] uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 font-semibold text-xs text-[#504443] uppercase tracking-wider">Article No.</th>
                <th className="px-6 py-4 font-semibold text-xs text-[#504443] uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 font-semibold text-xs text-[#504443] uppercase tracking-wider">Stock Status</th>
                <th className="px-6 py-4 font-semibold text-xs text-[#504443] uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 font-semibold text-xs text-[#504443] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d4c3c1]/20">
              {paginatedProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#fcf9f8]/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#eae7e7] rounded-lg overflow-hidden flex-shrink-0">
                        <img className="w-full h-full object-cover" src={prod.image} alt="" />
                      </div>
                      <div>
                        <p className="font-body-md font-bold text-[#321716]">{prod.title}</p>
                        <p className="text-[12px] text-[#504443]">{prod.collection || "Regular Line"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-body-sm text-[#1c1b1b] font-medium">{prod.article}</td>
                  <td className="px-6 py-4 font-body-sm text-[#504443]">
                    {prod.categories.join(", ")}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#ffe088] text-[#241a00] uppercase">
                      24 in stock
                    </span>
                  </td>
                  <td className="px-6 py-4 font-body-md font-extrabold text-[#321716]">
                    ₹{prod.price.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleEdit(prod.id)}
                        className="p-2 rounded-full hover:bg-[#eae7e7] text-[#504443] hover:text-[#321716] transition-colors"
                        title="Edit"
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button
                        onClick={() => handleDuplicate(prod)}
                        className="p-2 rounded-full hover:bg-[#eae7e7] text-[#504443] hover:text-[#321716] transition-colors"
                        title="Duplicate"
                      >
                        <span className="material-symbols-outlined text-[20px]">content_copy</span>
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id, prod.title)}
                        className="p-2 rounded-full hover:bg-red-50 text-[#ba1a1a] transition-colors"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile List View */}
          <div className="md:hidden divide-y divide-[#d4c3c1]/20">
            {paginatedProducts.map((prod) => (
              <div key={prod.id} className="p-4 space-y-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-[#eae7e7] rounded-lg overflow-hidden flex-shrink-0">
                    <img className="w-full h-full object-cover" src={prod.image} alt="" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-body-md font-bold text-[#321716]">{prod.title}</p>
                        <p className="text-xs text-[#504443]">
                          {prod.article} • {prod.categories[0] || "Footwear"}
                        </p>
                      </div>
                      <span className="text-[#321716] font-extrabold text-sm">
                        ₹{prod.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ffe088] text-[#241a00] uppercase">
                        24 in stock
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(prod.id)}
                      className="p-2 rounded-lg border border-[#d4c3c1]/70 text-[#504443] hover:text-[#321716]"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button
                      onClick={() => handleDuplicate(prod)}
                      className="p-2 rounded-lg border border-[#d4c3c1]/70 text-[#504443] hover:text-[#321716]"
                    >
                      <span className="material-symbols-outlined text-[18px]">content_copy</span>
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(prod.id, prod.title)}
                    className="px-4 py-1.5 rounded-lg border border-[#ba1a1a] text-[#ba1a1a] text-[12px] font-bold uppercase tracking-wider hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination bar */}
        <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#d4c3c1]/40 bg-[#fcf9f8]/60">
          <span className="font-body-sm text-[#504443] text-center sm:text-left">
            Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
          </span>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 border border-[#d4c3c1] rounded-lg hover:bg-white transition-colors disabled:opacity-40 disabled:hover:bg-transparent text-[#1c1b1b] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              <span className="font-body-sm font-semibold">Previous</span>
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg font-body-sm font-semibold transition-colors cursor-pointer ${
                    currentPage === index + 1
                      ? "bg-[#4a2c2a] text-[#ffdad7]"
                      : "hover:bg-white text-[#504443]"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 border border-[#d4c3c1] rounded-lg hover:bg-white transition-colors disabled:opacity-40 disabled:hover:bg-transparent text-[#1c1b1b] cursor-pointer"
            >
              <span className="font-body-sm font-semibold">Next</span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="bg-white p-6 rounded-2xl border border-[#d4c3c1]/40 shadow-sm">
        <h4 className="font-display-lg text-lg font-bold text-[#321716] mb-4">Inventory Health</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#504443] font-semibold">Optimal Stock</span>
            <span className="font-bold text-[#1c1b1b]">112 Items</span>
          </div>
          <div className="w-full bg-[#eae7e7] h-2 rounded-full">
            <div className="bg-[#735c00] h-2 rounded-full" style={{ width: "78%" }}></div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#504443] font-semibold">Low Stock Alert</span>
            <span className="font-bold text-[#ba1a1a]">12 Items</span>
          </div>
          <div className="w-full bg-[#eae7e7] h-2 rounded-full">
            <div className="bg-[#ba1a1a] h-2 rounded-full" style={{ width: "8%" }}></div>
          </div>
        </div>
      </section>
    </div>
  );
}
