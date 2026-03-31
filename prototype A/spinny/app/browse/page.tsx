'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { cars, brands, bodyTypes, fuelTypes, transmissionTypes } from '@/lib/data/cars';
import { CarCard } from '@/components/ui/CarCard';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { formatPrice } from '@/lib/utils/formatters';

export default function BrowsePage() {
  const [loading, setLoading] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);
  const [selectedFuel, setSelectedFuel] = useState<string[]>([]);
  const [selectedTransmission, setSelectedTransmission] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 6000000]);
  const [sortBy, setSortBy] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredCars = useMemo(() => {
    let result = [...cars];

    if (selectedBrands.length > 0) {
      result = result.filter((c) => selectedBrands.includes(c.make));
    }
    if (selectedBodyTypes.length > 0) {
      result = result.filter((c) => selectedBodyTypes.includes(c.bodyType));
    }
    if (selectedFuel.length > 0) {
      result = result.filter((c) => selectedFuel.includes(c.fuelType));
    }
    if (selectedTransmission.length > 0) {
      result = result.filter((c) => selectedTransmission.includes(c.transmission));
    }
    result = result.filter((c) => c.price >= priceRange[0] && c.price <= priceRange[1]);

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'year-new') result.sort((a, b) => b.year - a.year);
    if (sortBy === 'mileage-low') result.sort((a, b) => a.mileage - b.mileage);

    return result;
  }, [selectedBrands, selectedBodyTypes, selectedFuel, selectedTransmission, priceRange, sortBy]);

  const toggleFilter = useCallback((arr: string[], setArr: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  }, []);

  const clearAll = () => {
    setSelectedBrands([]);
    setSelectedBodyTypes([]);
    setSelectedFuel([]);
    setSelectedTransmission([]);
    setPriceRange([0, 6000000]);
    setSortBy('');
  };

  const activeFilters = [...selectedBrands, ...selectedBodyTypes, ...selectedFuel, ...selectedTransmission];

  const renderFilters = () => (
    <div className="space-y-6">
      {/* Budget */}
      <div>
        <h3 className="text-label text-brand-gold mb-4">BUDGET</h3>
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={6000000}
            step={100000}
            value={priceRange[0]}
            onChange={(e) => {
              const val = Number(e.target.value);
              setPriceRange([Math.min(val, priceRange[1] - 100000), priceRange[1]]);
            }}
            className="w-full accent-brand-gold"
          />
          <input
            type="range"
            min={0}
            max={6000000}
            step={100000}
            value={priceRange[1]}
            onChange={(e) => {
              const val = Number(e.target.value);
              setPriceRange([priceRange[0], Math.max(val, priceRange[0] + 100000)]);
            }}
            className="w-full accent-brand-gold"
          />
          <div className="flex justify-between text-xs text-text-muted">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-label text-brand-gold mb-4">BRAND</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleFilter(selectedBrands, setSelectedBrands, brand)}
                className="accent-brand-gold w-4 h-4"
              />
              <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Body Type */}
      <div>
        <h3 className="text-label text-brand-gold mb-4">BODY TYPE</h3>
        <div className="flex flex-wrap gap-2">
          {bodyTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleFilter(selectedBodyTypes, setSelectedBodyTypes, type)}
              className={`px-3 py-1.5 text-xs rounded-card border transition-all duration-300
                ${selectedBodyTypes.includes(type)
                  ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                  : 'border-border-default text-text-muted hover:border-text-subtle'
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Fuel */}
      <div>
        <h3 className="text-label text-brand-gold mb-4">FUEL TYPE</h3>
        <div className="flex flex-wrap gap-2">
          {fuelTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleFilter(selectedFuel, setSelectedFuel, type)}
              className={`px-3 py-1.5 text-xs rounded-card border transition-all duration-300
                ${selectedFuel.includes(type)
                  ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                  : 'border-border-default text-text-muted hover:border-text-subtle'
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div>
        <h3 className="text-label text-brand-gold mb-4">TRANSMISSION</h3>
        <div className="flex gap-2">
          {transmissionTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleFilter(selectedTransmission, setSelectedTransmission, type)}
              className={`px-3 py-1.5 text-xs rounded-card border transition-all duration-300
                ${selectedTransmission.includes(type)
                  ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                  : 'border-border-default text-text-muted hover:border-text-subtle'
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {activeFilters.length > 0 && (
        <button
          onClick={clearAll}
          className="text-xs text-brand-red hover:underline"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="pt-[72px] min-h-screen bg-bg-primary">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display-md">Browse Cars</h1>
            <p className="text-text-muted text-sm mt-2">
              {filteredCars.length} cars found
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Sort */}
            <div className="relative hidden md:block">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-bg-surface border border-border-default rounded-card
                  px-4 py-2 text-sm text-text-muted pr-8 focus:border-brand-gold focus:outline-none"
              >
                <option value="">Sort By</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year-new">Year: Newest First</option>
                <option value="mileage-low">Mileage: Low to High</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            </div>

            {/* Mobile filter toggle */}
            <button
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-bg-surface border border-border-default rounded-card text-sm text-text-muted"
              onClick={() => setMobileFilterOpen(true)}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {activeFilters.map((filter) => (
              <span
                key={filter}
                className="px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 rounded-full text-xs text-brand-gold flex items-center gap-2"
              >
                {filter}
                <button
                  onClick={() => {
                    setSelectedBrands((prev) => prev.filter((v) => v !== filter));
                    setSelectedBodyTypes((prev) => prev.filter((v) => v !== filter));
                    setSelectedFuel((prev) => prev.filter((v) => v !== filter));
                    setSelectedTransmission((prev) => prev.filter((v) => v !== filter));
                  }}
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-[280px] flex-shrink-0">
            <div className="sticky top-[88px] bg-bg-surface border border-border-default rounded-card p-6">
              <h2 className="text-label text-brand-gold mb-6">FILTERS</h2>
              {renderFilters()}
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
            >
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                : filteredCars.map((car) => <CarCard key={car.id} car={car} />)}
            </div>

            {!loading && filteredCars.length === 0 && (
              <div className="text-center py-20">
                <p className="text-display-md text-text-subtle mb-4">No cars found</p>
                <p className="text-text-muted mb-6">Try adjusting your filters</p>
                <button onClick={clearAll} className="text-brand-gold hover:underline text-sm">
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <div
        className={`fixed inset-0 z-[9990] md:hidden transition-all duration-300
          ${mobileFilterOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300
            ${mobileFilterOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileFilterOpen(false)}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 bg-bg-surface rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto
            transition-transform duration-500 ease-luxury
            ${mobileFilterOpen ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <div className="w-10 h-1 bg-text-subtle rounded-full mx-auto mb-6" />
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-label text-brand-gold">FILTERS</h2>
            <button onClick={() => setMobileFilterOpen(false)}>
              <X size={20} className="text-text-muted" />
            </button>
          </div>
          {renderFilters()}
          <button
            onClick={() => setMobileFilterOpen(false)}
            className="w-full mt-6 py-3 bg-brand-gold text-bg-primary font-semibold rounded-card"
          >
            Show {filteredCars.length} Results
          </button>
        </div>
      </div>
    </div>
  );
}
