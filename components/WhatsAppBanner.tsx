"use client";

export default function WhatsAppBanner() {
  return (
    <section className="py-12 px-margin-mobile max-w-container-max mx-auto">
      <a
        className="flex items-center justify-between bg-green-50 p-6 rounded-2xl border border-green-200 group transition-all duration-300 hover:shadow-md"
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white animate-float shadow-sm">
            <span className="material-symbols-outlined text-2xl">chat</span>
          </div>
          <div>
            <h4 className="font-body-lg font-bold text-green-900">Need Help?</h4>
            <p className="text-body-sm text-green-800">Chat with us on WhatsApp</p>
          </div>
        </div>
        <span className="material-symbols-outlined text-green-900 group-hover:translate-x-1 transition-transform">
          arrow_forward
        </span>
      </a>
    </section>
  );
}
