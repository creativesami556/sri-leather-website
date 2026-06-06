"use client";

import { useState, use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products, Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { supabaseBrowser } from "@/lib/supabase";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [catalogList, setCatalogList] = useState<Product[]>([]);
  const [whatsappNumber, setWhatsappNumber] = useState("918978191986");
  const [loading, setLoading] = useState(true);

  // Safe State initialization
  const [activeImage, setActiveImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState<number | string>("N/A");
  const [isFavorite, setIsFavorite] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("details");

  useEffect(() => {
    const saved = localStorage.getItem("sri_leather_admin_products");
    const list: Product[] = saved ? JSON.parse(saved) : products;
    setCatalogList(list);
    const match = list.find((p) => p.id === id);
    setProduct(match);
    if (match) {
      setActiveImage(match.image);
      setSelectedColor(match.colors[0]?.name || "");
      setSelectedSize(match.sizes[0] || "N/A");
    }
    const savedPhone = localStorage.getItem("sri_leather_whatsapp_number");
    if (savedPhone) {
      setWhatsappNumber(savedPhone);
    }
    
    // Load wishlist favorite state dynamically
    supabaseBrowser.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const savedWish = localStorage.getItem(`sri_leather_wishlist_${session.user.id}`);
        if (savedWish) {
          try {
            const wishlistItems = JSON.parse(savedWish);
            setIsFavorite(wishlistItems.some((item: any) => item.id === id));
          } catch (e) {
            console.error("Error parsing user wishlist", e);
          }
        }
      }
    });

    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <main className="max-w-container-max mx-auto min-h-screen px-margin-mobile md:px-margin-desktop py-24 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 border-4 border-[#321716]/10 border-t-[#321716] rounded-full animate-spin"></div>
        <p className="text-body-md text-[#504443] mt-4">Loading product details...</p>
      </main>
    );
  }

  // Fallback if product not found
  if (!product) {
    return (
      <main className="max-w-container-max mx-auto min-h-screen px-margin-mobile md:px-margin-desktop py-24 flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-6xl text-outline mb-4">
          inventory_2
        </span>
        <h1 className="font-headline-md text-headline-md font-bold text-[#321716]">
          Product Not Found
        </h1>
        <p className="text-body-md text-outline mt-2 mb-8">
          The product you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/shop"
          className="px-8 py-3 bg-[#4a2c2a] text-[#ffdad7] font-label-uppercase text-label-uppercase rounded-full font-bold shadow-md hover:opacity-90 active:scale-95 transition-all"
        >
          Back to Shop Catalog
        </Link>
      </main>
    );
  }

  // Construct Dynamic WhatsApp link
  const formattedMsg = `Hello! I'm interested in the ${product.title} (Art: ${product.article}), Size: ${selectedSize}, Color: ${selectedColor}. Is it available?`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMsg)}`;

  // Find related products (excluding current, match by category/gender)
  const relatedProducts = catalogList
    .filter((p) => p.id !== product.id && p.categories.some((c) => product.categories.includes(c)))
    .slice(0, 3);

  const formatPrice = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleWishlistToggle = async () => {
    if (!product) return;

    try {
      const { data: { session } } = await supabaseBrowser.auth.getSession();
      if (!session?.user) {
        const currentPath = window.location.pathname + window.location.search;
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
        return;
      }

      const uId = session.user.id;
      const currentWishlistStr = localStorage.getItem(`sri_leather_wishlist_${uId}`);
      let currentWishlist: any[] = [];
      if (currentWishlistStr) {
        try {
          currentWishlist = JSON.parse(currentWishlistStr);
        } catch (err) {
          console.error("Wishlist parse error", err);
        }
      }

      let updatedWishlist;
      if (isFavorite) {
        updatedWishlist = currentWishlist.filter((item: any) => item.id !== product.id);
        setIsFavorite(false);
      } else {
        const productToSave = {
          id: product.id,
          title: product.title,
          collection: product.collection,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          alt: product.alt,
          badge: product.badge,
          discount: product.discount,
        };
        updatedWishlist = [...currentWishlist, productToSave];
        setIsFavorite(true);
      }

      localStorage.setItem(`sri_leather_wishlist_${uId}`, JSON.stringify(updatedWishlist));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Product page wishlist check session error:", err);
      const currentPath = window.location.pathname + window.location.search;
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  };

  return (
    <main className="max-w-container-max mx-auto min-h-screen px-margin-mobile md:px-margin-desktop pt-4 pb-28 md:pb-16 bg-[#fcf9f8]">
      {/* Breadcrumbs */}
      <nav className="text-body-sm text-outline mb-6 flex items-center gap-2">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <Link href="/shop" className="hover:underline">Shop</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-[#321716] font-medium truncate max-w-[150px] md:max-w-xs">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] bg-[#FDFBF7] rounded-2xl overflow-hidden product-card-shadow">
            <img
              src={activeImage || undefined}
              alt={product.alt}
              className="w-full h-full object-cover"
            />
            <button className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur shadow-md rounded-full flex items-center justify-center text-[#321716] hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">zoom_in</span>
            </button>
          </div>

          {/* Thumbnails Row */}
          {product.thumbnails && product.thumbnails.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.thumbnails.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(thumb)}
                  className={`relative w-20 aspect-[3/4] rounded-lg overflow-hidden bg-[#FDFBF7] border-2 transition-all shrink-0 cursor-pointer ${
                    activeImage === thumb
                      ? "border-[#4a2c2a] scale-95 shadow-sm"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={thumb || undefined} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Specs */}
        <div className="space-y-6">
          {/* Badge */}
          {product.badge && (
            <span className="px-3.5 py-1 bg-[#ffe088] text-[#241a00] font-label-uppercase text-[10px] rounded-full uppercase tracking-wider font-bold shadow-sm inline-block">
              {product.badge}
            </span>
          )}

          <div>
            <h1 className="font-display-lg text-3xl md:text-4xl font-bold text-[#321716] tracking-tight leading-tight">
              {product.title}
            </h1>
            <p className="text-body-sm text-outline mt-1 font-semibold uppercase tracking-wider">
              Article: {product.article}
            </p>
          </div>

          {/* Reviews Star Ratings */}
          <div className="flex items-center gap-2 text-yellow-600">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className="material-symbols-outlined text-[18px] fill-current">
                  star
                </span>
              ))}
            </div>
            <span className="text-body-sm text-outline font-medium">(124 Reviews)</span>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-extrabold text-[#321716]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-body-lg text-outline line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="bg-[#4a2c2a] text-[#ffdad7] text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {product.discount || `${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF`}
                </span>
              </>
            )}
          </div>

          {/* Colors Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-body-md font-bold text-[#321716]">
                Color: <span className="text-[#5e5e5c] font-normal">{selectedColor}</span>
              </h4>
              <div className="flex gap-3 items-center">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer relative ${
                      selectedColor === color.name
                        ? "border-[#4a2c2a] ring-2 ring-[#4a2c2a]/30"
                        : "border-outline-variant hover:scale-105"
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-full shadow-inner block"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && product.sizes[0] !== 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-body-md font-bold text-[#321716]">Size (UK)</h4>
                <button className="text-xs text-[#321716] font-semibold hover:underline cursor-pointer">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg border text-body-sm font-bold text-center transition-all cursor-pointer ${
                      selectedSize === size
                        ? "bg-[#e1dfdc] border-[#5e5e5c] text-[#1c1b1b] shadow-sm font-extrabold"
                        : "border-outline-variant text-[#504443] bg-white hover:bg-[#f6f3f2]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Live WhatsApp Inquiry Preview box */}
          <div className="bg-[#fdfbf7] border border-emerald-600/10 p-4 rounded-xl space-y-2 relative overflow-hidden">
            <div className="flex items-center gap-2 text-emerald-800 font-label-uppercase text-label-uppercase font-bold text-[11px] tracking-wider">
              <svg className="w-4 h-4 fill-emerald-600" viewBox="0 0 24 24">
                <path d="M12.031 2c-5.506 0-9.969 4.471-9.969 9.986 0 1.764.459 3.419 1.259 4.873l-1.321 4.835 4.935-1.303c1.408.772 3.016 1.211 4.722 1.211 5.505 0 10.019-4.472 10.019-9.986 0-5.514-4.514-9.986-10.145-9.986zm5.135 14.188c-.213.606-1.03 1.184-1.625 1.278-.578.088-1.339.123-2.133-.139-3.08-1.019-5.053-4.166-5.202-4.368-.159-.2-.187-.27-.187-.497 0-.228.109-.344.223-.48.114-.138.251-.317.379-.475.129-.158.172-.27.257-.45.086-.18.043-.338-.021-.475-.065-.138-.578-1.396-.795-1.921-.215-.515-.431-.444-.579-.452-.149-.007-.318-.007-.487-.007s-.445.062-.678.318c-.233.256-.89.871-.89 2.129s.912 2.47 1.039 2.642c.127.172 1.797 2.75 4.354 3.856.608.263 1.082.42 1.452.54.61.193 1.165.166 1.603.1.488-.072 1.493-.61 1.706-1.198zm0 0" />
              </svg>
              WhatsApp Inquiry Preview
            </div>
            <p className="text-body-sm text-[#504443] font-mono leading-relaxed bg-[#f6f3f2]/50 p-2.5 rounded border border-outline-variant/20 italic">
              &quot;{formattedMsg}&quot;
            </p>
          </div>

          {/* Accordion Expandables */}
          <div className="border-t border-outline-variant/20 pt-4 space-y-4">
            {/* Product Details */}
            <div className="border-b border-outline-variant/10 pb-4">
              <button
                onClick={() => toggleSection("details")}
                className="w-full flex justify-between items-center text-body-md font-bold text-[#321716] py-1 cursor-pointer"
              >
                Product Details
                <span className="material-symbols-outlined transition-transform duration-300">
                  {openSection === "details" ? "expand_less" : "expand_more"}
                </span>
              </button>
              {openSection === "details" && (
                <div className="mt-3 text-body-sm text-[#504443] space-y-3 leading-relaxed">
                  <p>{product.description}</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {product.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Material & Care */}
            <div className="border-b border-outline-variant/10 pb-4">
              <button
                onClick={() => toggleSection("care")}
                className="w-full flex justify-between items-center text-body-md font-bold text-[#321716] py-1 cursor-pointer"
              >
                Material & Care
                <span className="material-symbols-outlined transition-transform duration-300">
                  {openSection === "care" ? "expand_less" : "expand_more"}
                </span>
              </button>
              {openSection === "care" && (
                <div className="mt-3 text-body-sm text-[#504443] leading-relaxed">
                  <p>
                    Premium full-grain leather upper. To clean, wipe gently with a damp cloth 
                    and treat with premium leather conditioner and soft polish. Store in a cool, 
                    dry place out of direct sunlight. Avoid contact with water or oil-based substances.
                  </p>
                </div>
              )}
            </div>

            {/* Shipping Info */}
            <div className="border-b border-outline-variant/10 pb-4">
              <button
                onClick={() => toggleSection("shipping")}
                className="w-full flex justify-between items-center text-body-md font-bold text-[#321716] py-1 cursor-pointer"
              >
                Store Purchase & Inquiries
                <span className="material-symbols-outlined transition-transform duration-300">
                  {openSection === "shipping" ? "expand_less" : "expand_more"}
                </span>
              </button>
              {openSection === "shipping" && (
                <div className="mt-3 text-body-sm text-[#504443] space-y-2 leading-relaxed text-left flex flex-col items-start">
                  <p>
                    We currently do not offer online ordering or home delivery. Please visit one of our physical showrooms to check sizes and purchase this product. You can click the &quot;Inquire on WhatsApp&quot; button below to check stock details or ask questions directly.
                  </p>
                  <Link
                    href="/locations"
                    className="inline-flex items-center gap-1.5 font-bold text-[#4a2c2a] hover:underline pt-1 text-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">map</span>
                    Find Showroom Locations
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 border-t border-outline-variant/20 pt-12">
          <h2 className="font-display-lg text-2xl md:text-3xl font-bold text-[#321716] mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-gutter">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky Bottom Actions Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-outline-variant/20 py-4 px-margin-mobile md:px-margin-desktop z-40 shadow-[0_-5px_20px_rgba(74,44,42,0.05)]">
        <div className="max-w-container-max mx-auto flex items-center justify-between gap-4">
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-outline rounded-xl font-label-uppercase text-label-uppercase font-bold text-[#321716] hover:bg-[#f6f3f2] active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <span
              className="material-symbols-outlined transition-colors duration-200"
              style={{
                fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0",
                color: isFavorite ? "#ba1a1a" : "inherit",
              }}
            >
              favorite
            </span>
            <span className="hidden sm:inline">Wishlist</span>
          </button>

          {/* WhatsApp Direct Order Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 bg-[#25d366] hover:bg-[#20ba56] text-white font-label-uppercase text-label-uppercase rounded-xl font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-center"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.023-5.102-2.884-6.964-1.861-1.862-4.332-2.884-6.963-2.885-5.437 0-9.863 4.42-9.866 9.865-.001 1.716.463 3.39 1.337 4.888L1.996 22.01l4.651-1.218z" />
            </svg>
            Inquire on WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
