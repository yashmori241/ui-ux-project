'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { SlidersHorizontal, X, ChevronDown, Search, CheckCircle, Home, Key, Gauge, Fuel } from 'lucide-react';
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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
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
    setPriceRange([0, 10000000]);
    setSortBy('');
  };

  const activeFilters = [...selectedBrands, ...selectedBodyTypes, ...selectedFuel, ...selectedTransmission];

  const renderFilters = () => (
    <div className="space-y-10">
      {/* Valuation Index */}
      <div className="pb-10 border-b border-white/5">
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold">VALUATION INDEX</h3>
           <span className="text-[10px] font-mono text-brand-gold/40">INR</span>
        </div>
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-end">
               <p className="text-[8px] font-bold uppercase tracking-widest text-text-subtle opacity-50">MINIMUM</p>
               <p className="text-xs font-mono text-text-primary tracking-tighter">{formatPrice(priceRange[0])}</p>
            </div>
            <input
              type="range" min={0} max={10000000} step={100000} value={priceRange[0]}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPriceRange([Math.min(val, priceRange[1] - 100000), priceRange[1]]);
              }}
              className="w-full h-[1px] bg-white/10 appearance-none rounded-full accent-brand-gold cursor-pointer"
            />
          </div>
          <div className="space-y-4">
             <div className="flex justify-between items-end">
                <p className="text-[8px] font-bold uppercase tracking-widest text-text-subtle opacity-50">MAXIMUM</p>
                <p className="text-xs font-mono text-text-primary tracking-tighter">{formatPrice(priceRange[1])}</p>
             </div>
            <input
              type="range" min={0} max={10000000} step={100000} value={priceRange[1]}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPriceRange([priceRange[0], Math.max(val, priceRange[0] + 100000)]);
              }}
              className="w-full h-[1px] bg-white/10 appearance-none rounded-full accent-brand-gold cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Asset Origin */}
      <div className="pb-10 border-b border-white/5">
        <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-8">ASSET ORIGIN</h3>
        <div className="grid grid-cols-1 gap-4 max-h-64 overflow-y-auto pr-4 custom-scrollbar">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center justify-between cursor-pointer group">
              <span className={`text-[9px] font-bold uppercase tracking-widest transition-all duration-500
                ${selectedBrands.includes(brand) ? 'text-brand-gold' : 'text-text-muted group-hover:text-text-primary'}`}>
                {brand}
              </span>
              <div className={`w-3.5 h-3.5 rounded-full border transition-all duration-500 flex items-center justify-center
                ${selectedBrands.includes(brand) ? 'border-brand-gold bg-brand-gold/20' : 'border-white/10 group-hover:border-white/30'}`}>
                <input
                  type="checkbox" checked={selectedBrands.includes(brand)}
                  onChange={() => toggleFilter(selectedBrands, setSelectedBrands, brand)}
                  className="hidden"
                />
                {selectedBrands.includes(brand) && <div className="w-1 h-1 rounded-full bg-brand-gold animate-in zoom-in-50 duration-300" />}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Configuration */}
      <div className="pb-10 border-b border-white/5">
        <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-8">CONFIGURATION</h3>
        <div className="flex flex-wrap gap-2.5">
          {bodyTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleFilter(selectedBodyTypes, setSelectedBodyTypes, type)}
              className={`px-4 py-2 text-[8px] font-bold uppercase tracking-widest rounded-full border transition-all duration-700
                ${selectedBodyTypes.includes(type)
                  ? 'border-brand-gold bg-brand-gold/10 text-brand-gold shadow-[0_0_20px_rgba(197,160,89,0.2)]'
                  : 'border-white/5 text-text-muted hover:border-white/20'
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Propulsion Protocol */}
      <div className="pb-10 border-b border-white/5">
         <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-8">PROPULSION PROTOCOL</h3>
         <div className="flex flex-wrap gap-2.5">
           {fuelTypes.map((type) => (
             <button
               key={type}
               onClick={() => toggleFilter(selectedFuel, setSelectedFuel, type)}
               className={`px-4 py-2 text-[8px] font-bold uppercase tracking-widest rounded-full border transition-all duration-700
                 ${selectedFuel.includes(type)
                   ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                   : 'border-white/5 text-text-muted hover:border-white/20'
                 }`}
             >
               {type}
             </button>
           ))}
         </div>
      </div>

      <div className="pb-10">
         <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-8">DRIVETRAIN</h3>
         <div className="flex flex-wrap gap-2.5">
           {transmissionTypes.map((type) => (
             <button
               key={type}
               onClick={() => toggleFilter(selectedTransmission, setSelectedTransmission, type)}
               className={`px-4 py-2 text-[8px] font-bold uppercase tracking-widest rounded-full border transition-all duration-700
                 ${selectedTransmission.includes(type)
                   ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                   : 'border-white/5 text-text-muted hover:border-white/20'
                 }`}
             >
               {type}
             </button>
           ))}
         </div>
      </div>
    </div>
  );

  return (
    <div className="pt-[80px] min-h-screen bg-bg-primary relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold/[0.03] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        {/* Header Module */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8 opacity-60">
               <div className="w-12 h-[1px] bg-brand-gold/50" />
               <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">ASSET REPOSITORY</p>
            </div>
            <h1 className="text-display-lg tracking-tighter leading-[0.85] mb-8">
               Discover Your <br />
               <span className="italic font-display gold-text-gradient">Next Heritage Asset</span><span className="text-brand-gold">.</span>
            </h1>
            <div className="flex items-center gap-6 text-[10px] font-mono text-text-muted uppercase tracking-widest opacity-60">
              <span className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-brand-gold animate-pulse" />
                {filteredCars.length} IDENTIFIED ASSETS
              </span>
              <span className="w-[1px] h-3 bg-white/10" />
              <span>MARKET REAL-TIME FEED</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Sort Protocol */}
            <div className="relative hidden md:block group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white/[0.03] border border-white/5 rounded-full
                  px-8 py-3.5 text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted pr-12 focus:border-brand-gold/40 focus:outline-none transition-all cursor-pointer hover:bg-white/[0.05]"
              >
                <option value="">METRIC ALIGNMENT</option>
                <option value="price-low">VALUATION: ASCENDING</option>
                <option value="price-high">VALUATION: DESCENDING</option>
                <option value="year-new">VINTAGE: RECENT FIRST</option>
                <option value="mileage-low">TELEMETRY: OPTIMIZED</option>
              </select>
              <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-brand-gold/40 pointer-events-none group-hover:text-brand-gold transition-colors" />
            </div>

            {/* Mobile filter toggle */}
            <button
              className="md:hidden flex items-center gap-3 px-6 py-3.5 bg-white/[0.03] border border-white/5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-brand-gold"
              onClick={() => setMobileFilterOpen(true)}
            >
              <SlidersHorizontal size={14} />
              PROTOCOL FILTERS
            </button>
          </div>
        </div>

        {/* Active Protocol Chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-10 animate-in fade-in slide-in-from-left-4 duration-700">
            {activeFilters.map((filter) => (
              <span
                key={filter}
                className="px-5 py-2 glass-elite border border-brand-gold/20 rounded-full text-[9px] font-bold uppercase tracking-widest text-brand-gold flex items-center gap-3 hover:border-brand-gold/40 transition-all"
              >
                {filter}
                <button
                  onClick={() => {
                    setSelectedBrands((prev) => prev.filter((v) => v !== filter));
                    setSelectedBodyTypes((prev) => prev.filter((v) => v !== filter));
                    setSelectedFuel((prev) => prev.filter((v) => v !== filter));
                    setSelectedTransmission((prev) => prev.filter((v) => v !== filter));
                  }}
                  className="hover:text-white transition-colors"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            <button
              onClick={clearAll}
              className="px-5 py-2 text-[9px] font-bold uppercase tracking-widest text-text-subtle hover:text-brand-red transition-colors"
            >
              RESET ALL
            </button>
          </div>
        )}

        <div className="flex gap-12 items-start">
          {/* Institutional Sidebar Filter */}
          <aside className="hidden lg:block w-72 xl:w-80 flex-shrink-0 sticky top-[120px]">
            <div className="glass-elite luxury-border rounded-[42px] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">PORTFOLIO FILTERS</h2>
                <div className="relative flex items-center justify-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                   <div className="absolute inset-0 rounded-full border border-brand-gold animate-ping opacity-20" />
                </div>
              </div>
              
              {renderFilters()}
            </div>
          </aside>

          {/* Results Repository */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                : filteredCars.map((car, i) => (
                    <div key={car.id} className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-luxury fill-mode-both" style={{ animationDelay: `${i * 100}ms` }}>
                      <CarCard car={car} />
                    </div>
                  ))}
            </div>

            {!loading && filteredCars.length === 0 && (
              <div className="text-center py-32 glass-elite luxury-border rounded-[42px] max-w-2xl mx-auto">
                <p className="text-display-md text-text-muted mb-6 opacity-40 italic">Asset Identification Failed.</p>
                <p className="text-text-subtle uppercase text-[9px] tracking-[0.4em] mb-10">NO ASSETS MATCH CURRENT PROTOCOL CRITERIA</p>
                <button 
                  onClick={clearAll} 
                  className="px-10 py-5 bg-brand-gold text-bg-primary text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:shadow-[0_0_50px_rgba(197,160,89,0.4)] transition-all"
                >
                  RESET PORTFOLIO PROTOCOLS
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Protocol Overlay */}
      <div
        className={`fixed inset-0 z-[9995] md:hidden transition-all duration-700 ease-luxury
          ${mobileFilterOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-700
            ${mobileFilterOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileFilterOpen(false)}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 glass-elite bg-bg-surface/90 rounded-t-[42px] p-10 max-h-[90vh] overflow-y-auto
            transition-transform duration-1000 ease-luxury shadow-[0_-40px_100px_rgba(0,0,0,0.8)]
            ${mobileFilterOpen ? 'translate-y-0' : 'translate-y-[110%]'}`}
        >
          <div className="w-12 h-[1px] bg-brand-gold/30 rounded-full mx-auto mb-10" />
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">PROTOCOL FILTERS</h2>
            <button onClick={() => setMobileFilterOpen(false)} className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-text-muted hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>
          {renderFilters()}
          <button
            onClick={() => setMobileFilterOpen(false)}
            className="w-full mt-10 py-5 bg-brand-gold text-bg-primary text-[10px] font-black uppercase tracking-[0.4em] rounded-full"
          >
            INITIALIZE {filteredCars.length} ASSETS
          </button>
        </div>
      </div>
    </div>
  );
}
