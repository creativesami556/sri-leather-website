"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#251312] border-t border-[#4a2c2a]/30 w-full py-16 px-margin-mobile md:px-margin-desktop mt-auto text-white">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-gutter pb-12">
        <div className="space-y-6">
          <h2 className="font-display-lg text-2xl font-bold text-white tracking-tight">
            Sri Leather
          </h2>
          <p className="font-body-sm text-[#ffdad7]/80 max-w-xs">
            Dedicated to the art of fine shoemaking since 2005. Premium quality, unparalleled durability.
          </p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-[#ffdad7]/80 cursor-pointer hover:text-[#ffe088] hover:scale-110 transition-all">
              public
            </span>
            <span className="material-symbols-outlined text-[#ffdad7]/80 cursor-pointer hover:text-[#ffe088] hover:scale-110 transition-all">
              share
            </span>
            <span className="material-symbols-outlined text-[#ffdad7]/80 cursor-pointer hover:text-[#ffe088] hover:scale-110 transition-all">
              contacts
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-display-lg text-sm font-bold text-[#ffe088] uppercase tracking-wider">
            Information
          </h4>
          <nav className="flex flex-col gap-3">
            <Link
              className="text-body-sm text-[#ffdad7]/80 hover:text-white transition-colors"
              href="/about"
            >
              About Us
            </Link>
            <Link
              className="text-body-sm text-[#ffdad7]/80 hover:text-white transition-colors"
              href="/about#sustainability"
            >
              Sustainability
            </Link>
            <Link
              className="text-body-sm text-[#ffdad7]/80 hover:text-white transition-colors"
              href="/locations"
            >
              Store Locator
            </Link>
          </nav>
        </div>

        <div className="space-y-4">
          <h4 className="font-display-lg text-sm font-bold text-[#ffe088] uppercase tracking-wider">
            Help &amp; Support
          </h4>
          <nav className="flex flex-col gap-3">
            <Link
              className="text-body-sm text-[#ffdad7]/80 hover:text-white transition-colors"
              href="/about#shipping-policy"
            >
              Shipping Policy
            </Link>
            <Link
              className="text-body-sm text-[#ffdad7]/80 hover:text-white transition-colors"
              href="/about#privacy-policy"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>

        <div className="space-y-4">
          <h4 className="font-display-lg text-sm font-bold text-[#ffe088] uppercase tracking-wider">
            Connect With Us
          </h4>
          <p className="font-body-sm text-[#ffdad7]/80">
            Follow our official channels to stay updated on new collections and store arrivals.
          </p>
          <div className="flex flex-col gap-3 pt-2">
            <a
              href="https://instagram.com/srileathers_hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-body-sm text-[#ffdad7]/80 hover:text-white transition-colors group"
            >
              <svg className="w-5 h-5 fill-current text-[#ffe088] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://facebook.com/srileathers"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-body-sm text-[#ffdad7]/80 hover:text-white transition-colors group"
            >
              <svg className="w-5 h-5 fill-current text-[#ffe088] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h3v-9h3.625L16 8h-4V6.71c0-.817.516-1.007.924-1.007H16V2h-3.838C8.91 2 9 5.84 9 6.71V8z" />
              </svg>
              <span>Facebook Page</span>
            </a>
            <a
              href="https://wa.me/918978191986"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-body-sm text-[#ffdad7]/80 hover:text-white transition-colors group"
            >
              <svg className="w-5 h-5 fill-current text-[#ffe088] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.023-5.102-2.884-6.964-1.861-1.862-4.332-2.884-6.963-2.885-5.437 0-9.863 4.42-9.866 9.865-.001 1.716.463 3.39 1.337 4.888L1.996 22.01l4.651-1.218z" />
              </svg>
              <span>WhatsApp Channel</span>
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-container-max mx-auto pt-8 border-t border-white/10 text-center">
        <p className="text-body-xs text-[#ffdad7]/45">
          © {new Date().getFullYear()} Sri Leather. Crafted for Durability.
        </p>
      </div>
    </footer>
  );
}
