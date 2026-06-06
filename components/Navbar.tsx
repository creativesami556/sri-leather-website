"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const savedCart = localStorage.getItem("sri_leather_cart");
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        const count = items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
        setCartCount(count);
      } catch (e) {
        setCartCount(0);
      }
    } else {
      setCartCount(0);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    updateCartCount();

    // Listen to storage event (cart updates)
    window.addEventListener("storage", updateCartCount);

    // Listen to Supabase auth state change
    const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);

      if (currentUser) {
        let dbRole = null;
        try {
          const { data, error } = await supabaseBrowser
            .from("profiles")
            .select("role")
            .or(`id.eq.${currentUser.id},email.eq.${currentUser.email}`)
            .maybeSingle();
          if (error) {
            console.error("Navbar profiles query error:", error);
          }
          if (data) dbRole = data.role;
        } catch (e) {
          console.error("Navbar profiles query exception:", e);
        }

        const isUserAdmin = 
          dbRole === "admin" ||
          currentUser.user_metadata?.role === "admin" ||
          currentUser.app_metadata?.role === "admin" ||
          currentUser.email === "admin@srileather.com";
        
        setIsAdmin(!!isUserAdmin);
      } else {
        setIsAdmin(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", updateCartCount);
      subscription.unsubscribe();
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/shop");
    }
    setSearchFocused(false);
  };

  return (
    <>
      <header
        className={`docked full-width top-0 sticky z-50 transition-all duration-300 bg-[#fcf9f8] border-b border-outline-variant/10 ${
          isScrolled
            ? "bg-opacity-95 backdrop-blur-md shadow-[0px_15px_40px_0px_rgba(74,44,42,0.08)]"
            : "shadow-[0px_10px_30px_0px_rgba(74,44,42,0.04)]"
        }`}
      >
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-[#321716] hover:opacity-80 active:scale-95 transition-all cursor-pointer flex items-center p-1 rounded-lg hover:bg-[#f6f3f2]"
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <Link href="/">
              <h1 className="font-headline-md text-headline-md font-bold text-[#321716] cursor-pointer tracking-tight">
                Sri Leather
              </h1>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="w-full bg-[#f6f3f2] flex items-center px-4 py-2 rounded-full border border-outline-variant/30 focus-within:border-primary transition-all">
                <span className="material-symbols-outlined text-outline mr-2">search</span>
                <input
                  className="bg-transparent border-none outline-none focus:ring-0 text-body-md w-full placeholder:text-outline/60 text-[#1c1b1b]"
                  placeholder="Search handcrafted leather..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                />
              </div>
            </form>

            {/* Search Suggestions */}
            {searchFocused && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white shadow-xl rounded-xl border border-outline-variant/10 transition-all z-50 p-2">
                <div className="p-3 text-label-uppercase font-label-uppercase text-outline-variant text-[11px] tracking-wider font-semibold">
                  Popular Suggestions
                </div>
                <Link
                  href="/shop?q=Chelsea"
                  className="flex items-center gap-3 p-3 hover:bg-[#f6f3f2] rounded-lg text-body-sm transition-colors text-[#1c1b1b]"
                >
                  <span className="material-symbols-outlined text-outline">trending_up</span>
                  Tan Leather Chelsea Boots
                </Link>
                <Link
                  href="/shop?q=Oxford"
                  className="flex items-center gap-3 p-3 hover:bg-[#f6f3f2] rounded-lg text-body-sm transition-colors text-[#1c1b1b]"
                >
                  <span className="material-symbols-outlined text-outline">trending_up</span>
                  Premium Oxford Formals
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/shop" className="text-[#504443] hover:text-[#321716] transition-colors md:hidden flex items-center">
              <span className="material-symbols-outlined">search</span>
            </Link>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                  className="hidden md:flex items-center gap-1 text-[#321716] hover:opacity-80 transition-all cursor-pointer bg-[#f6f3f2] px-3 py-1.5 rounded-full"
                >
                  <span className="material-symbols-outlined text-[20px]">account_circle</span>
                  <span className="text-xs font-bold text-[#321716] max-w-[80px] truncate">
                    {user.user_metadata?.full_name?.split(" ")[0] || "Account"}
                  </span>
                  <span className="material-symbols-outlined text-[16px]">expand_more</span>
                </button>

                {showAccountDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowAccountDropdown(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-[#d4c3c1]/40 rounded-xl shadow-lg z-50 p-2 space-y-1">
                      <div className="px-3 py-2 border-b border-[#d4c3c1]/10 text-left">
                        <p className="text-xs font-bold text-[#321716] truncate">
                          {user.user_metadata?.full_name || "User Account"}
                        </p>
                        <p className="text-[10px] text-outline truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/wishlist"
                        onClick={() => setShowAccountDropdown(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#504443] hover:bg-[#f6f3f2] rounded-lg transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">favorite</span> My Wishlist
                      </Link>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setShowAccountDropdown(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#504443] hover:bg-[#f6f3f2] rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">admin_panel_settings</span> Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={async () => {
                          setShowAccountDropdown(false);
                          await supabaseBrowser.auth.signOut();
                          router.push("/");
                          router.refresh();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#ba1a1a] hover:bg-red-50 rounded-lg transition-colors text-left border-t border-[#d4c3c1]/10 pt-2 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">logout</span> Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:flex items-center gap-1 px-4 py-2 border border-outline rounded-full font-bold text-[#321716] hover:bg-[#f6f3f2] active:scale-95 transition-all text-xs uppercase tracking-wider"
              >
                Sign In
              </Link>
            )}

            <Link
              href="/wishlist"
              className="text-[#321716] hover:opacity-80 transition-all relative flex items-center gap-1"
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              <span className="hidden md:inline font-label-uppercase text-label-uppercase text-[#321716]">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-[#4a2c2a] text-[#ffdad7] text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 animate-fade-in"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Slide-out Navigation Drawer panel */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] max-w-[85vw] bg-[#fcf9f8] shadow-2xl z-[101] transition-transform duration-300 ease-in-out transform p-6 flex flex-col justify-between ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-8">
          {/* Header row */}
          <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
            <Link href="/" onClick={() => setIsDrawerOpen(false)}>
              <h2 className="font-display-lg text-2xl font-extrabold text-[#321716]">
                Sri Leather
              </h2>
            </Link>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="text-[#321716] w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f6f3f2] active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {[
              { label: "Home", href: "/", icon: "home" },
              { label: "Explore Collection", href: "/shop", icon: "explore" },
              { label: "Store Locations", href: "/locations", icon: "store" },
              { label: "My Wishlist & Cart", href: "/wishlist", icon: "favorite" },
              { label: "About & Contact", href: "/about", icon: "info" },
              ...(isAdmin ? [{ label: "Admin Portal", href: "/admin", icon: "admin_panel_settings" }] : []),
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsDrawerOpen(false)}
                className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-body-md font-bold text-[#321716] hover:bg-[#4a2c2a]/5 hover:text-[#4a2c2a] transition-all"
              >
                <span className="material-symbols-outlined text-[#504443]">{item.icon}</span>
                {item.label}
              </Link>
            ))}

            {user ? (
              <button
                onClick={async () => {
                  setIsDrawerOpen(false);
                  await supabaseBrowser.auth.signOut();
                  router.push("/");
                  router.refresh();
                }}
                className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-body-md font-bold text-[#ba1a1a] hover:bg-red-50 transition-all text-left cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#ba1a1a]">logout</span>
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsDrawerOpen(false)}
                className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-body-md font-bold text-[#20ba56] hover:bg-emerald-50 transition-all"
              >
                <span className="material-symbols-outlined text-[#20ba56]">login</span>
                Sign In
              </Link>
            )}
          </nav>
        </div>

        {/* Footer/Social Info */}
        <div className="border-t border-outline-variant/10 pt-6 space-y-4">
          <p className="text-body-xs text-outline">
            Crafting luxury for your feet since 2005. Built for durability, styled for life.
          </p>
          <div className="flex gap-4">
            {["facebook", "instagram", "alternate_email"].map((soc) => (
              <a
                key={soc}
                href="#"
                className="w-9 h-9 rounded-full bg-[#f6f3f2] hover:bg-[#4a2c2a]/10 flex items-center justify-center text-[#321716] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">{soc}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
