"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { products, Product } from "@/lib/products";
import { supabaseBrowser } from "@/lib/supabase";

interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: number | string;
  selectedColor: string;
}

export default function WishlistCartPage() {
  const [activeTab, setActiveTab] = useState<"wishlist" | "cart">("wishlist");

  // Load wishlist from localStorage or pre-populate with mock items
  const [wishlist, setWishlist] = useState<Product[]>([]);
  // Load cart from localStorage or pre-populate
  const [cart, setCart] = useState<CartItem[]>([]);
  const [whatsappNumber, setWhatsappNumber] = useState("919295403036");
  
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Listen to Supabase auth state change
    const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);

      if (currentUser) {
        // Logged-in user
        const guestWish = localStorage.getItem("sri_leather_wishlist");
        const userWishKey = `sri_leather_wishlist_${currentUser.id}`;
        const userWish = localStorage.getItem(userWishKey);
        
        let mergedWishlist = userWish ? JSON.parse(userWish) : [];
        if (guestWish) {
          try {
            const guestWishlist = JSON.parse(guestWish);
            const mergedMap = new Map();
            // Merge existing user wishlist items
            mergedWishlist.forEach((item: any) => mergedMap.set(item.id, item));
            // Merge guest wishlist items (taking priority or appending)
            guestWishlist.forEach((item: any) => mergedMap.set(item.id, item));
            mergedWishlist = Array.from(mergedMap.values());
            
            localStorage.setItem(userWishKey, JSON.stringify(mergedWishlist));
            localStorage.removeItem("sri_leather_wishlist");
          } catch (e) {
            console.error("Migration error", e);
          }
        }
        setWishlist(mergedWishlist);
      } else {
        // Not logged in
        setWishlist([]);
      }

      setAuthLoading(false);
    });

    // Load Cart (independent of login state)
    const savedCart = localStorage.getItem("sri_leather_cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        const isDummyCart =
          Array.isArray(parsed) &&
          parsed.length === 2 &&
          (parsed[0]?.product?.id === "prod-9" || parsed[0]?.product?.id === "prod-10") &&
          (parsed[1]?.product?.id === "prod-9" || parsed[1]?.product?.id === "prod-10");

        if (isDummyCart) {
          setCart([]);
          localStorage.setItem("sri_leather_cart", JSON.stringify([]));
          window.dispatchEvent(new Event("storage"));
        } else {
          setCart(parsed);
        }
      } catch (e) {
        setCart([]);
      }
    } else {
      setCart([]);
    }

    const savedPhone = localStorage.getItem("sri_leather_whatsapp_number");
    if (savedPhone === "918978191986") {
      localStorage.setItem("sri_leather_whatsapp_number", "919295403036");
      setWhatsappNumber("919295403036");
    } else if (savedPhone) {
      setWhatsappNumber(savedPhone);
    }

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const saveWishlist = (newWish: Product[]) => {
    setWishlist(newWish);
    if (user) {
      localStorage.setItem(`sri_leather_wishlist_${user.id}`, JSON.stringify(newWish));
    } else {
      localStorage.setItem("sri_leather_wishlist", JSON.stringify(newWish));
    }
  };

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("sri_leather_cart", JSON.stringify(newCart));
  };

  const removeFromWishlist = (id: string) => {
    const newWish = wishlist.filter((item) => item.id !== id);
    saveWishlist(newWish);
  };

  const moveToCart = (product: Product) => {
    // Check if already in cart
    const exists = cart.find((item) => item.product.id === product.id);
    let newCart = [...cart];

    if (exists) {
      newCart = cart.map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart.push({
        product,
        quantity: 1,
        selectedSize: product.sizes[0] || 9,
        selectedColor: product.colors[0]?.name || "Default",
      });
    }

    saveCart(newCart);
    // Remove from wishlist
    removeFromWishlist(product.id);
    setActiveTab("cart");
  };

  const updateCartQuantity = (id: string, delta: number) => {
    const newCart = cart
      .map((item) => {
        if (item.product.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    saveCart(newCart);
  };

  const removeCartItem = (id: string) => {
    const newCart = cart.filter((item) => item.product.id !== id);
    saveCart(newCart);
  };

  // Pricing calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryCharges = subtotal > 2000 || subtotal === 0 ? 0 : 150;
  const total = subtotal + deliveryCharges;

  // Checkout order text generator
  const getWhatsAppCheckoutLink = () => {
    if (cart.length === 0) return "#";
    let message = "*Sri Leather - Order Placement*\n\nI want to place an order for:\n";
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.product.title}* - Qty: ${item.quantity}, Size: ${item.selectedSize}, Color: ${item.selectedColor} (Price: ₹${item.product.price * item.quantity})\n`;
    });
    message += `\n*Subtotal:* ₹${subtotal.toLocaleString("en-IN")}`;
    message += `\n*Delivery Charges:* ${deliveryCharges === 0 ? "FREE" : `₹${deliveryCharges}`}`;
    message += `\n*Total Order Value:* ₹${total.toLocaleString("en-IN")}`;
    message += "\n\nPlease confirm availability and payment terms!";
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <main className="max-w-container-max mx-auto min-h-screen px-margin-mobile md:px-margin-desktop pt-4 pb-24 bg-[#fcf9f8]">
      {/* Header Tabs */}
      <section className="flex border-b border-outline-variant/20 mb-8 max-w-md mx-auto justify-center">
        <button
          onClick={() => setActiveTab("wishlist")}
          className={`flex-1 py-4 font-display-lg text-lg font-bold text-center border-b-2 transition-all cursor-pointer ${
            activeTab === "wishlist"
              ? "border-[#4a2c2a] text-[#321716]"
              : "border-transparent text-outline hover:text-[#321716]"
          }`}
        >
          Wishlist ({wishlist.length})
        </button>
        <button
          onClick={() => setActiveTab("cart")}
          className={`flex-1 py-4 font-display-lg text-lg font-bold text-center border-b-2 transition-all cursor-pointer ${
            activeTab === "cart"
              ? "border-[#4a2c2a] text-[#321716]"
              : "border-transparent text-outline hover:text-[#321716]"
          }`}
        >
          Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </button>
      </section>

      {/* Tab: Wishlist View */}
      {activeTab === "wishlist" && (
        <section className="max-w-4xl mx-auto">
          {authLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#321716]/10 border-t-[#321716] rounded-full animate-spin"></div>
              <p className="text-body-sm text-outline mt-4">Loading your wishlist...</p>
            </div>
          ) : !user ? (
            <div className="text-center py-20 space-y-6 max-w-sm mx-auto">
              <span className="material-symbols-outlined text-6xl text-outline mb-2">lock</span>
              <h3 className="font-display-lg text-xl font-bold text-[#321716]">Sign In to View Wishlist</h3>
              <p className="text-body-sm text-[#504443] leading-relaxed">
                Wishlist is only available for registered users. Log in to save items and sync them across all your devices.
              </p>
              <Link
                href="/login?redirect=/wishlist"
                className="inline-block px-8 py-3 bg-[#4a2c2a] text-[#ffdad7] font-bold text-label-uppercase rounded-xl hover:opacity-90 active:scale-95 transition-all text-xs uppercase tracking-wider"
              >
                Sign In or Sign Up
              </Link>
            </div>
          ) : wishlist.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-gutter">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-outline-variant/20 rounded-2xl p-4 relative flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow border border-outline-variant/10 flex items-center justify-center text-[#321716] hover:bg-[#ffe088] hover:text-[#241a00] active:scale-90 transition-all z-10 cursor-pointer"
                    aria-label="Remove item"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>

                  <div>
                    {/* Image */}
                    <Link href={`/product/${item.id}`} className="block relative aspect-[3/4] bg-[#FDFBF7] rounded-xl overflow-hidden mb-3">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {/* Tag */}
                    {item.badge && (
                      <span className="bg-[#ffe088] text-[#241a00] text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider inline-block mb-1.5">
                        {item.badge}
                      </span>
                    )}

                    {/* Title */}
                    <Link href={`/product/${item.id}`}>
                      <h4 className="font-body-md font-bold text-[#321716] group-hover:underline line-clamp-1">
                        {item.title}
                      </h4>
                    </Link>
                    <p className="text-body-sm text-outline mt-1 font-semibold">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Move to Cart */}
                  <button
                    onClick={() => moveToCart(item)}
                    className="w-full mt-4 py-2.5 bg-[#4a2c2a] text-[#ffdad7] rounded-xl font-label-uppercase text-[11px] font-bold tracking-wider hover:opacity-90 active:scale-[0.97] transition-all cursor-pointer uppercase"
                  >
                    Move to Cart
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 space-y-4">
              <span className="material-symbols-outlined text-6xl text-outline mb-2">favorite_border</span>
              <h3 className="font-display-lg text-xl font-bold text-[#321716]">Your Wishlist is Empty</h3>
              <p className="text-body-sm text-outline max-w-sm mx-auto">
                Explore our catalog to save handcrafted boots, sneakers, and formal oxfords you love.
              </p>
              <Link
                href="/shop"
                className="inline-block px-8 py-3 bg-[#4a2c2a] text-[#ffdad7] font-bold text-label-uppercase rounded-xl hover:opacity-90 active:scale-95 transition-all"
              >
                Go Shopping
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Tab: Cart View */}
      {activeTab === "cart" && (
        <section className="max-w-4xl mx-auto">
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Cart Items List */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-white border border-outline-variant/20 rounded-2xl p-4 flex gap-4 relative shadow-sm"
                  >
                    {/* Remove button */}
                    <button
                      onClick={() => removeCartItem(item.product.id)}
                      className="absolute top-4 right-4 text-outline hover:text-[#ba1a1a] transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>

                    {/* Image */}
                    <Link
                      href={`/product/${item.product.id}`}
                      className="w-20 md:w-24 aspect-[3/4] bg-[#FDFBF7] rounded-xl overflow-hidden shrink-0 block"
                    >
                      <img src={item.product.image} className="w-full h-full object-cover" alt="" />
                    </Link>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-1 pr-6">
                        <Link href={`/product/${item.product.id}`}>
                          <h4 className="font-body-md font-bold text-[#321716] hover:underline">
                            {item.product.title}
                          </h4>
                        </Link>
                        <p className="text-body-xs text-outline font-semibold">
                          Size: {item.selectedSize} | Color: {item.selectedColor}
                        </p>
                        <p className="text-body-sm font-bold text-[#321716] pt-1">
                          ₹{item.product.price.toLocaleString("en-IN")}
                        </p>
                      </div>

                      {/* Quantity Toggles */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, -1)}
                          className="w-8 h-8 rounded-lg border border-outline-variant flex items-center justify-center text-body-md text-[#321716] hover:bg-[#f6f3f2] active:scale-90 transition-all cursor-pointer font-bold"
                        >
                          -
                        </button>
                        <span className="text-body-sm font-bold text-[#321716] w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, 1)}
                          className="w-8 h-8 rounded-lg border border-outline-variant flex items-center justify-center text-body-md text-[#321716] hover:bg-[#f6f3f2] active:scale-90 transition-all cursor-pointer font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary box */}
              <div className="bg-white border border-outline-variant/20 rounded-2xl p-6 space-y-6 shadow-sm">
                <h3 className="font-display-lg text-lg font-bold text-[#321716] border-b border-outline-variant/10 pb-3">
                  Inquiry Summary
                </h3>

                {/* Store Purchase Advisory */}
                <div className="bg-[#fffbeb] border border-[#ffe088]/40 rounded-xl p-4 flex gap-3 text-[#735c00]">
                  <span className="material-symbols-outlined text-[20px] flex-shrink-0">store</span>
                  <div className="text-xs space-y-2 text-left w-full">
                    <div>
                      <p className="font-bold">Showroom Purchase Only</p>
                      <p className="opacity-90 leading-relaxed mt-0.5">
                        We do not accept online orders or deliver online. Please visit your nearest Sri Leather store to purchase. You can click below to inquire about stock details or availability.
                      </p>
                    </div>
                    <Link
                      href="/locations"
                      className="inline-flex items-center gap-1.5 font-bold text-[#4a2c2a] hover:underline pt-1 text-xs"
                    >
                      <span className="material-symbols-outlined text-[16px]">map</span>
                      Find Nearest Store
                    </Link>
                  </div>
                </div>

                <div className="space-y-3 text-body-sm text-[#504443]">
                  <div className="flex justify-between">
                    <span>Subtotal Value</span>
                    <span className="font-bold text-[#321716]">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="border-t border-outline-variant/10 pt-3 flex justify-between font-bold text-body-md text-[#321716]">
                    <span>Estimated Total</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <a
                    href={getWhatsAppCheckoutLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#25d366] hover:bg-[#20ba56] text-white rounded-xl font-label-uppercase text-xs font-bold tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all text-center uppercase cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.023-5.102-2.884-6.964-1.861-1.862-4.332-2.884-6.963-2.885-5.437 0-9.863 4.42-9.866 9.865-.001 1.716.463 3.39 1.337 4.888L1.996 22.01l4.651-1.218z" />
                    </svg>
                    Inquire via WhatsApp
                  </a>
                  <p className="text-[10px] text-center text-[#504443]">
                    Redirects to WhatsApp to check availability with our support team.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 space-y-4">
              <span className="material-symbols-outlined text-6xl text-outline mb-2">shopping_bag</span>
              <h3 className="font-display-lg text-xl font-bold text-[#321716]">Your Cart is Empty</h3>
              <p className="text-body-sm text-outline max-w-sm mx-auto">
                No items in your shopping cart. Add items from your wishlist or our collection page.
              </p>
              <Link
                href="/shop"
                className="inline-block px-8 py-3 bg-[#4a2c2a] text-[#ffdad7] font-bold text-label-uppercase rounded-xl hover:opacity-90 active:scale-95 transition-all"
              >
                Explore Collection
              </Link>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
