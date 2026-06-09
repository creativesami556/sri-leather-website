"use client";

import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
  const [whatsappNumber, setWhatsappNumber] = useState("919295403036");
  const [adminName, setAdminName] = useState("Sri Leather Admin");
  const [adminRole, setAdminRole] = useState("Heritage Manager");
  const [adminEmail, setAdminEmail] = useState("manager@srileather.in");
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const savedPhone = localStorage.getItem("sri_leather_whatsapp_number");
    if (savedPhone === "918978191986") {
      localStorage.setItem("sri_leather_whatsapp_number", "919295403036");
      setWhatsappNumber("919295403036");
    } else if (savedPhone) {
      setWhatsappNumber(savedPhone);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("sri_leather_whatsapp_number", whatsappNumber);
    setToastMessage("Settings saved successfully!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-24 relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-8 bg-[#4a2c2a] text-[#ffdad7] border border-[#ffe088] px-6 py-3 rounded-xl shadow-xl z-50 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[20px] text-[#ffe088]">check_circle</span>
          <span className="text-body-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <div>
        <h3 className="font-display-lg text-2xl font-bold text-[#321716]">Store Settings</h3>
        <p className="font-body-sm text-[#504443] mt-1">Manage storefront details, checkout APIs, and administrative roles.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8 bg-white border border-[#d4c3c1]/40 rounded-2xl p-6 md:p-8 shadow-sm">
        {/* Section 1: Store Checkout Configuration */}
        <div className="space-y-4">
          <h4 className="font-bold text-sm text-[#321716] uppercase tracking-wider border-b border-[#d4c3c1]/20 pb-2">
            Store Checkout Integration
          </h4>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#504443] block">WhatsApp Business Number</label>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full bg-[#fcf9f8] border border-[#d4c3c1]/80 rounded-xl px-4 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-[#321716] focus:border-transparent outline-none"
              placeholder="e.g. 919295403036"
              required
            />
            <p className="text-[11px] text-[#504443]">
              The country-code prefixed number where checkout orders and product inquiries are dispatched via WhatsApp (e.g. 91 for India).
            </p>
          </div>
        </div>

        {/* Section 2: Admin Profile Details */}
        <div className="space-y-4 pt-4">
          <h4 className="font-bold text-sm text-[#321716] uppercase tracking-wider border-b border-[#d4c3c1]/20 pb-2">
            Manager Profile
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#504443] block">Full Name</label>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full bg-[#fcf9f8] border border-[#d4c3c1]/80 rounded-xl px-4 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-[#321716]"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#504443] block">Role Description</label>
              <input
                type="text"
                value={adminRole}
                onChange={(e) => setAdminRole(e.target.value)}
                className="w-full bg-[#fcf9f8] border border-[#d4c3c1]/80 rounded-xl px-4 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-[#321716]"
                required
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-bold text-[#504443] block">Email Contact</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full bg-[#fcf9f8] border border-[#d4c3c1]/80 rounded-xl px-4 py-2.5 text-body-sm focus:outline-none focus:ring-2 focus:ring-[#321716]"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 3: Notification Options */}
        <div className="space-y-4 pt-4">
          <h4 className="font-bold text-sm text-[#321716] uppercase tracking-wider border-b border-[#d4c3c1]/20 pb-2">
            Operations Alerts
          </h4>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={lowStockAlerts}
                onChange={(e) => setLowStockAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-[#321716] border-[#827472] focus:ring-[#321716]"
              />
              <div>
                <span className="text-body-sm font-semibold text-[#1c1b1b] block">Low Stock Alerts</span>
                <span className="text-[11px] text-[#504443]">Send notifications when product stock falls below 5 items.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-6 border-t border-[#d4c3c1]/20 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-[#4a2c2a] text-[#ffdad7] font-bold text-xs uppercase tracking-wider rounded-full hover:opacity-90 active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
