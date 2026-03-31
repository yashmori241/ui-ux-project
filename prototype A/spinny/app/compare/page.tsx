'use client';

import { useState } from 'react';
import { X, Search, Plus } from 'lucide-react';
import { cars, Car } from '@/lib/data/cars';
import { formatPrice, formatMileage } from '@/lib/utils/formatters';
import Image from 'next/image';

export default function ComparePage() {
  const [selected, setSelected] = useState<Car[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = cars.filter((c) => 
    `${c.make} ${c.model}`.toLowerCase().includes(search.toLowerCase()) &&
    !selected.find((s) => s.id === c.id)
  );

  const addCar = (car: Car) => {
    if (selected.length < 3) { setSelected([...selected, car]); setModalOpen(false); setSearch(''); }
  };

  const removeCar = (id: string) => setSelected(selected.filter((c) => c.id !== id));

  const specs = [
    { label: 'Price', key: (c: Car) => formatPrice(c.price) },
    { label: 'Year', key: (c: Car) => c.year.toString() },
    { label: 'Mileage', key: (c: Car) => formatMileage(c.mileage) },
    { label: 'Fuel', key: (c: Car) => c.fuelType },
    { label: 'Transmission', key: (c: Car) => c.transmission },
    { label: 'Engine', key: (c: Car) => c.engine },
    { label: 'Power', key: (c: Car) => c.power },
    { label: 'Seats', key: (c: Car) => `${c.seats}` },
    { label: 'Body Type', key: (c: Car) => c.bodyType },
    { label: 'Color', key: (c: Car) => c.color },
    { label: 'Owners', key: (c: Car) => `${c.owners}` },
    { label: 'Inspection', key: (c: Car) => `${c.inspectionScore}/200` },
    { label: 'Location', key: (c: Car) => c.location },
  ];

  return (
    <div className="pt-[80px] min-h-screen bg-bg-primary relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-gold/[0.02] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 py-20">
        <div className="flex items-center gap-6 mb-10 opacity-60">
           <div className="w-12 h-[1px] bg-brand-gold/50" />
           <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">PORTFOLIO INTELLIGENCE</p>
           <div className="w-12 h-[1px] bg-brand-gold/50" />
        </div>
        
        <h1 className="text-display-lg mb-16 tracking-tighter leading-[0.85]">
          Side-by-Side <br />
          <span className="italic font-display gold-text-gradient">Precision</span> Matrix<span className="text-brand-gold">.</span>
        </h1>
 
        {selected.length === 0 ? (
          <div className="text-center py-40 glass-elite luxury-border rounded-[56px] relative overflow-hidden animate-in fade-in zoom-in-95 duration-1000">
            <div className="absolute inset-0 bg-brand-gold/[0.03] blur-[150px] rounded-full pointer-events-none" />
            <div className="relative z-10">
               <div className="w-24 h-24 rounded-full glass-elite border border-brand-gold/20 flex items-center justify-center mx-auto mb-10 shadow-[0_20px_50px_rgba(197,160,89,0.15)]">
                  <Plus size={36} className="text-brand-gold" />
               </div>
               <p className="text-text-muted text-xl mb-12 font-body max-w-sm mx-auto opacity-70 font-light italic">
                 Initialize your comparative analysis by selecting assets from the institutional portfolio.
               </p>
               <button onClick={() => setModalOpen(true)}
                 className="px-12 py-6 bg-brand-gold text-bg-primary font-black text-[11px] uppercase tracking-[0.4em] rounded-full hover:shadow-[0_0_50px_rgba(197,160,89,0.5)] transition-all duration-700">
                 SELECT INITIAL ASSET
               </button>
            </div>
          </div>
        ) : (
          <div className="glass-elite luxury-border rounded-[56px] p-12 lg:p-16 relative overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-1000">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/[0.03] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
             
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr>
                    <th className="w-64 text-left py-12 pr-16 border-b border-white/5 align-bottom">
                      {selected.length < 3 && (
                        <button onClick={() => setModalOpen(true)}
                          className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold hover:text-white transition-all duration-700 flex items-center gap-4 group">
                          <div className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center group-hover:border-white/40 transition-all duration-700 group-hover:scale-110">
                             <Plus size={14} />
                          </div>
                          ADD TO MATRIX
                        </button>
                      )}
                    </th>
                    {selected.map((car) => (
                      <th key={car.id} className="p-12 border-b border-white/5 text-center">
                        <div className="relative group mx-auto max-w-[300px]">
                          <button onClick={() => removeCar(car.id)}
                            className="absolute -top-4 -right-4 w-10 h-10 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center z-20 hover:border-brand-red transition-all duration-500 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
                            <X size={16} className="text-text-muted hover:text-brand-red transition-colors" />
                          </button>
                          <div className="w-full aspect-[16/10] relative rounded-[40px] overflow-hidden mb-8 shadow-[0_30px_70px_rgba(0,0,0,0.7)] glass-elite p-[1px] group-hover:-translate-y-2 transition-transform duration-1000">
                            <div className="absolute inset-0 z-10 shadow-[inset_0_0_80px_rgba(0,0,0,0.4)] pointer-events-none" />
                            <Image src={car.images[0]} alt={car.model} fill className="object-cover group-hover:scale-110 transition-transform duration-[3000ms] ease-luxury desaturate-[0.3] group-hover:desaturate-0" sizes="300px" />
                          </div>
                          <p className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-brand-gold/60 mb-3">{car.year} {car.make.toUpperCase()}</p>
                          <p className="text-3xl font-display font-black text-text-primary tracking-tighter leading-none">{car.model}</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {specs.map((spec, idx) => (
                    <tr key={spec.label} className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors duration-500">
                      <td className="py-8 pr-12 text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted/40 group-hover:text-brand-gold/60 transition-colors duration-700">{spec.label}</td>
                      {selected.map((car) => (
                        <td key={car.id} className={`p-12 text-sm text-text-primary text-center tracking-tight font-medium ${idx === 0 ? 'text-xl gold-text-gradient font-black' : ''}`}>
                          {spec.key(car).toUpperCase()}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Car Modal - Executive Search */}
      {modalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-6 animate-in fade-in duration-700">
          <div className="absolute inset-0 bg-bg-primary/95 backdrop-blur-md" onClick={() => setModalOpen(false)} />
          <div className="relative glass-elite border border-white/5 rounded-[56px] w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.9)] animate-in zoom-in-95 slide-in-from-bottom-10 duration-700">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/[0.05] blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
             
            <div className="p-10 border-b border-white/5 bg-white/[0.01] flex items-center gap-8">
              <Search size={24} className="text-brand-gold shadow-[0_0_20px_rgba(197,160,89,0.3)]" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Query asset portfolio by make, model, or year..." autoFocus
                className="flex-1 bg-transparent text-xl font-display font-black text-text-primary focus:outline-none placeholder:text-text-muted/30 tracking-tight" />
              <button onClick={() => setModalOpen(false)} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-red transition-all cursor-pointer group">
                 <X size={20} className="text-text-muted group-hover:text-brand-red duration-500" />
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[60vh] p-6 space-y-4 custom-scrollbar">
              {filtered.length > 0 ? filtered.map((car) => (
                <button key={car.id} onClick={() => addCar(car)}
                  className="w-full flex items-center gap-8 p-8 rounded-[40px] hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all duration-700 text-left group relative">
                  <div className="w-28 h-20 relative rounded-2xl overflow-hidden flex-shrink-0 luxury-border glass-elite p-[1px]">
                    <Image src={car.images[0]} alt={car.model} fill className="object-cover desaturate-[0.5] group-hover:desaturate-0 transition-all duration-1000" sizes="150px" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-brand-gold/60 mb-2 group-hover:text-brand-gold transition-colors">{car.year} {car.make.toUpperCase()}</p>
                    <p className="text-2xl font-display font-black text-text-primary tracking-tight leading-none group-hover:translate-x-2 transition-transform duration-700">{car.model}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-mono font-black text-brand-gold/80 tracking-tighter group-hover:scale-110 transition-transform duration-700">{formatPrice(car.price)}</p>
                    <p className="text-[8px] font-bold text-text-muted/40 uppercase tracking-widest mt-1">AVAILABLE</p>
                  </div>
                </button>
              )) : (
                <div className="py-20 text-center opacity-40 font-mono text-[10px] uppercase tracking-[0.4em]">NO MATCHING ASSETS IDENTIFIED</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
