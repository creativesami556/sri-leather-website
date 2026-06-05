"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: "dashboard" },
    { label: "Inventory", href: "/admin/products", icon: "inventory_2" },
    { label: "Collections", href: "/admin/collections", icon: "auto_awesome_motion" },
    { label: "Settings", href: "/admin/settings", icon: "settings" },
  ];

  return (
    <div className="flex min-h-screen bg-[#fcf9f8] text-[#1c1b1b]">
      {/* NavigationDrawer (Desktop Sidebar) */}
      <aside className="hidden md:flex flex-col h-screen border-r border-[#d4c3c1] bg-[#fcf9f8] w-64 fixed left-0 top-0 z-50">
        <div className="p-6">
          <Link href="/">
            <h1 className="font-display-lg text-2xl font-bold text-[#321716] tracking-tight hover:opacity-80 transition-opacity">
              Sri Leather
            </h1>
          </Link>
          <div className="mt-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4a2c2a] flex items-center justify-center overflow-hidden">
              <img
                alt="Admin User Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBO3gXKcIXwQ6u14IQMqKg1ijUDMZcn6JK-axZ9qksOLnRrkkL3mAgabrfUuSwdum7oLBF_c5d5uuqUssfnXC7ikvsZ0_fR3jp-xw5Rga7KyxE3ysT9QNdOU4idfRUmABnPSRuU0ohrEYZpZ_7wNnmpp8jN4Gg_gboWdgjd4WhBbqpz0OFzSoro0brwqM3rNHWTOowIDDt7Hmmxua-vWM6yh3QxjlhjpQtITBW65XZA4vnb9cYHDffw8zHevEgYDnfhHworeVHP06V"
              />
            </div>
            <div>
              <p className="font-body-sm font-bold text-[#1c1b1b]">Sri Leather Admin</p>
              <p className="text-[11px] text-[#504443] uppercase tracking-wider">Heritage Manager</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                  isActive
                    ? "bg-[#4a2c2a] text-[#ffdad7]"
                    : "text-[#504443] hover:bg-[#eae7e7]"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="font-body-md text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-6 border-t border-[#d4c3c1] flex justify-between items-center">
          <span className="text-[11px] text-[#504443]">v1.0.4</span>
          <Link href="/" className="text-xs font-bold text-[#321716] hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">store</span> Storefront
          </Link>
        </div>
      </aside>

      {/* Mobile Drawer Slide-out Backdrop & Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="w-64 h-full bg-[#fcf9f8] p-6 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex justify-between items-center">
                <h1 className="font-display-lg text-2xl font-bold text-[#321716]">Sri Leather</h1>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="material-symbols-outlined text-[#321716]">close</span>
                </button>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4a2c2a] overflow-hidden">
                  <img
                    alt="Admin"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBO3gXKcIXwQ6u14IQMqKg1ijUDMZcn6JK-axZ9qksOLnRrkkL3mAgabrfUuSwdum7oLBF_c5d5uuqUssfnXC7ikvsZ0_fR3jp-xw5Rga7KyxE3ysT9QNdOU4idfRUmABnPSRuU0ohrEYZpZ_7wNnmpp8jN4Gg_gboWdgjd4WhBbqpz0OFzSoro0brwqM3rNHWTOowIDDt7Hmmxua-vWM6yh3QxjlhjpQtITBW65XZA4vnb9cYHDffw8zHevEgYDnfhHworeVHP06V"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-sm">Admin User</p>
                  <p className="text-xs text-[#504443]">Heritage Manager</p>
                </div>
              </div>
              <nav className="mt-8 space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                        isActive
                          ? "bg-[#4a2c2a] text-[#ffdad7]"
                          : "text-[#504443] hover:bg-[#eae7e7]"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="border-t border-[#d4c3c1] pt-4 flex justify-between items-center">
              <span className="text-xs text-[#504443]">v1.0.4</span>
              <Link href="/" className="text-xs font-bold text-[#321716] hover:underline">
                View Site
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* TopAppBar */}
        <header className="flex justify-between items-center px-6 py-4 w-full z-40 bg-[#fcf9f8] sticky top-0 border-b border-[#d4c3c1] backdrop-blur-md bg-white/80">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-[#1c1b1b] hover:text-[#321716]"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="font-display-lg text-lg md:text-xl font-bold text-[#321716]">
              {pathname === "/admin"
                ? "Dashboard"
                : pathname.startsWith("/admin/products/add")
                ? "Add New Product"
                : pathname.startsWith("/admin/products")
                ? "Inventory"
                : pathname.startsWith("/admin/collections")
                ? "Collections"
                : "Settings"}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowNotificationBadge(false)}
              className="relative p-2 text-[#504443] hover:text-[#321716] transition-colors"
            >
              <span className="material-symbols-outlined">notifications</span>
              {showNotificationBadge && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-[#fcf9f8]"></span>
              )}
            </button>

            {/* Account drop down toggle */}
            <div className="relative">
              <div
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="flex items-center gap-2 cursor-pointer group select-none"
              >
                <span className="font-body-sm font-semibold text-[#504443] group-hover:text-[#321716] transition-colors">
                  Account
                </span>
                <span className="material-symbols-outlined text-[#504443] group-hover:text-[#321716]">
                  expand_more
                </span>
              </div>

              {isAccountMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsAccountMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-[#d4c3c1]/40 rounded-xl shadow-lg z-50 p-2 space-y-1">
                    <Link
                      href="/admin/settings"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#504443] hover:bg-[#f6f3f2] rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">settings</span> Settings
                    </Link>
                    <Link
                      href="/"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#504443] hover:bg-[#f6f3f2] rounded-lg transition-colors border-t border-[#d4c3c1]/10 pt-2"
                    >
                      <span className="material-symbols-outlined text-sm">logout</span> Exit Admin
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic page content */}
        <main className="flex-grow p-6 md:p-8 space-y-8 w-full max-w-container-max mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (simulating layout) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#fcf9f8] border-t border-[#d4c3c1] px-4 py-3 flex justify-between items-center z-50 md:hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 flex-1 ${
                isActive ? "text-[#321716] font-bold" : "text-[#504443]"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
