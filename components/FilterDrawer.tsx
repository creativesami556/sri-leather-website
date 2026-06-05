"use client";

import { useState, useEffect } from "react";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilters: {
    genders: string[];
    maxPrice: number;
    size: number | null;
    color: string | null;
  };
  onApplyFilters: (filters: {
    genders: string[];
    maxPrice: number;
    size: number | null;
    color: string | null;
  }) => void;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  activeFilters,
  onApplyFilters,
}: FilterDrawerProps) {
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(10000);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const colors = [
    { name: "Dark Mahogany", hex: "#4A2C2A" },
    { name: "Midnight Black", hex: "#1C1B1B" },
    { name: "Tan Gold", hex: "#D4AF37" },
    { name: "Slate Grey", hex: "#827472" },
  ];

  const sizes = [6, 7, 8, 9, 10, 11];

  // Sync state with activeFilters when drawer opens
  useEffect(() => {
    if (isOpen) {
      setSelectedGenders(activeFilters.genders);
      setPriceRange(activeFilters.maxPrice);
      setSelectedSize(activeFilters.size);
      setSelectedColor(activeFilters.color);
    }
  }, [isOpen, activeFilters]);

  const handleGenderChange = (gender: string) => {
    setSelectedGenders((prev) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  };

  const handleClearAll = () => {
    setSelectedGenders([]);
    setPriceRange(10000);
    setSelectedSize(null);
    setSelectedColor(null);
  };

  const handleApply = () => {
    onApplyFilters({
      genders: selectedGenders,
      maxPrice: priceRange,
      size: selectedSize,
      color: selectedColor,
    });
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[60] transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-surface shadow-2xl p-6 flex flex-col z-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
            Refine Search
          </h2>
          <button
            className="p-2 hover:bg-surface-container rounded-full transition-all cursor-pointer flex items-center justify-center"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-8 pr-2 no-scrollbar">
          {/* Gender */}
          <div>
            <h4 className="font-label-uppercase text-label-uppercase text-primary font-bold mb-4">
              Gender
            </h4>
            <div className="space-y-3">
              {["Men", "Women", "Unisex"].map((gender) => (
                <label
                  key={gender}
                  className="flex items-center gap-3 cursor-pointer group text-on-surface"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary accent-primary"
                    checked={selectedGenders.includes(gender)}
                    onChange={() => handleGenderChange(gender)}
                  />
                  <span className="text-body-md group-hover:text-primary transition-colors">
                    {gender}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-label-uppercase text-label-uppercase text-primary font-bold mb-4">
              Price Range
            </h4>
            <input
              className="w-full accent-primary cursor-pointer"
              max="10000"
              min="0"
              step="100"
              type="range"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
            />
            <div className="flex justify-between mt-2 text-body-sm text-outline">
              <span>₹0</span>
              <span className="font-semibold text-primary">Max: ₹{priceRange.toLocaleString("en-IN")}</span>
              <span>₹10,000+</span>
            </div>
          </div>

          {/* Size */}
          <div>
            <h4 className="font-label-uppercase text-label-uppercase text-primary font-bold mb-4">
              Size (UK/IND)
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                  className={`aspect-square border rounded-lg flex items-center justify-center text-body-sm transition-all cursor-pointer font-semibold ${
                    selectedSize === size
                      ? "bg-primary-container text-on-primary-container border-primary"
                      : "border-outline-variant hover:border-primary hover:bg-primary-container/20 text-on-surface"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <h4 className="font-label-uppercase text-label-uppercase text-primary font-bold mb-4">
              Color
            </h4>
            <div className="flex flex-wrap gap-3">
              {colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setSelectedColor(selectedColor === c.hex ? null : c.hex)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform duration-200 cursor-pointer ${
                    selectedColor === c.hex
                      ? "border-primary scale-110 ring-2 ring-primary/45"
                      : "border-white ring-1 ring-outline-variant"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 mt-8 border-t border-outline-variant/10 flex gap-4">
          <button
            onClick={handleClearAll}
            className="flex-1 py-4 border border-outline-variant rounded-xl font-label-uppercase text-label-uppercase hover:bg-surface-container-low transition-all cursor-pointer text-on-surface font-bold text-center"
          >
            Clear All
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-4 bg-primary text-white rounded-xl font-label-uppercase text-label-uppercase hover:opacity-90 shadow-lg shadow-primary/20 transition-all cursor-pointer font-bold text-center"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
