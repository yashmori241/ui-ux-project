'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { Heart, MapPin, Shield, ChevronLeft, ChevronRight, X, Fuel, Gauge, Settings2, Users, Palette, Calendar } from 'lucide-react';
import { getCarById, cars } from '@/lib/data/cars';
import { useShortlistStore } from '@/lib/store/shortlistStore';
import { formatPrice, formatMileage, formatEMI } from '@/lib/utils/formatters';
import { calculateEMI } from '@/lib/utils/emi';
import { CarCard } from '@/components/ui/CarCard';
import { MagneticButton } from '@/components/ui/MagneticButton';

export default function CarDetailPage() {
  const { id } = useParams();
  const car = getCarById(id as string);
  const [currentImage, setCurrentImage] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const mainImgRef = useRef<HTMLDivElement>(null);
  const { toggle, isShortlisted } = useShortlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // EMI calculator state initialization uses car directly
  const [loanAmount, setLoanAmount] = useState(car ? Math.round(car.price * 0.8) : 0);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenure, setTenure] = useState(60);
  const emi = calculateEMI(loanAmount, interestRate, tenure);

  const handleThumbnailClick = (index: number) => {
    if (mainImgRef.current) {
      gsap.to(mainImgRef.current, {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
          setCurrentImage(index);
          gsap.to(mainImgRef.current, { opacity: 1, duration: 0.3 });
        },
      });
    } else {
      setCurrentImage(index);
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!fullScreen || !car) return;
      if (e.key === 'Escape') setFullScreen(false);
      if (e.key === 'ArrowRight') setCurrentImage((p) => (p + 1) % car.images.length);
      if (e.key === 'ArrowLeft') setCurrentImage((p) => (p - 1 + car.images.length) % car.images.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [fullScreen, car]);

  if (!car) {
    return (
      <div className="pt-[72px] min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-display-md text-text-subtle mb-4">Car not found</p>
          <Link href="/browse" className="text-brand-gold hover:underline">Back to Browse</Link>
        </div>
      </div>
    );
  }

  const liked = isShortlisted(car.id);
  const similarCars = cars.filter((c) => c.id !== car.id && c.bodyType === car.bodyType).slice(0, 4);

  const specs = [
    { icon: <Calendar size={16} />, label: 'Year', value: car.year },
    { icon: <Gauge size={16} />, label: 'Mileage', value: formatMileage(car.mileage) },
    { icon: <Fuel size={16} />, label: 'Fuel', value: car.fuelType },
    { icon: <Settings2 size={16} />, label: 'Transmission', value: car.transmission },
    { icon: <Users size={16} />, label: 'Owners', value: `${car.owners} Owner` },
    { icon: <Palette size={16} />, label: 'Color', value: car.color },
  ];

  return (
    <div className="pt-[80px] min-h-screen bg-bg-primary relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-gold/[0.02] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        {/* Architectural Breadcrumb */}
        <div className="flex items-center gap-4 mb-10 text-[9px] font-bold uppercase tracking-[0.4em] text-text-muted/60">
          <Link href="/browse" className="hover:text-brand-gold transition-colors">PORTFOLIO</Link>
          <div className="w-1 h-1 rounded-full bg-brand-gold/30" />
          <span className="text-text-primary/40">{car.make}</span>
          <div className="w-1 h-1 rounded-full bg-brand-gold/30" />
          <span className="text-brand-gold">{car.model}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Asset Visualization Column */}
          <div className="flex-1">
            {/* Technical Asset Viewer */}
            <div className="mb-12">
              <div
                ref={mainImgRef}
                className="relative aspect-[16/9] rounded-[48px] overflow-hidden cursor-pointer group shadow-[0_60px_120px_rgba(0,0,0,0.8)] glass-elite p-[1px]"
                onClick={() => setFullScreen(true)}
              >
                <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.5)]" />
                <div className="absolute top-8 left-8 z-20 flex gap-3">
                   <div className="px-4 py-2 glass-elite luxury-border rounded-full text-[8px] font-bold uppercase tracking-widest text-brand-gold">
                      ASSET VERIFIED
                   </div>
                   {car.assured && (
                     <div className="px-4 py-2 bg-brand-gold/20 border border-brand-gold/40 rounded-full text-[8px] font-bold uppercase tracking-widest text-brand-gold backdrop-blur-md">
                        INSTITUTIONAL GRADE
                     </div>
                   )}
                </div>

                {mounted && (
                  <Image
                    src={car.images[currentImage]}
                    alt={`${car.make} ${car.model}`}
                    fill
                    sizes="(max-width: 1400px) 100vw, 80vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-[3000ms] ease-luxury"
                    priority
                  />
                )}
              </div>

              <div className="flex gap-4 mt-8 overflow-x-auto pb-4 custom-scrollbar">
                {car.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => handleThumbnailClick(i)}
                    className={`relative w-28 h-20 rounded-2xl overflow-hidden flex-shrink-0 border transition-all duration-700
                      ${i === currentImage ? 'border-brand-gold shadow-[0_0_20px_rgba(197,160,89,0.3)]' : 'border-white/5 opacity-40 hover:opacity-100'}`}
                  >
                    <Image src={img} alt={`Metadata ${i + 1}`} fill sizes="112px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Institutional Tab Architecture */}
            <div className="border-b border-white/5 mb-12">
              <div className="flex gap-12 lg:gap-16">
                {['overview', 'mechanical', 'amenities', 'forensic'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-6 text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-700 relative
                      ${activeTab === tab ? 'text-brand-gold' : 'text-text-muted/60 hover:text-white'}`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-brand-gold animate-in fade-in slide-in-from-left-full duration-700" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Manifest Content */}
            <div className="mb-16">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  {specs.map((s) => (
                    <div key={s.label} className="glass-elite luxury-border rounded-[36px] p-10 group hover:bg-white/[0.02] transition-colors duration-700">
                      <div className="flex items-center gap-4 text-brand-gold/40 mb-6 group-hover:text-brand-gold transition-colors">
                        {s.icon}
                        <span className="text-[9px] font-bold uppercase tracking-[0.4em]">{s.label}</span>
                      </div>
                      <span className="text-2xl font-mono text-text-primary tracking-tighter">{s.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'mechanical' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 animate-in fade-in duration-1000">
                  {[
                    ['Propulsion Unit', car.engine],
                    ['Power Output', car.power],
                    ['Cabin Configuration', `${car.seats} Integrated Seats`],
                    ['Heritage Classification', car.bodyType],
                    ['Regional Registration', car.registrationState],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between py-6 border-b border-white/5 group">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted/60 group-hover:text-brand-gold/80 transition-colors">{label}</span>
                      <span className="text-sm text-text-primary font-mono tracking-tight">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'amenities' && (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-1000">
                  {car.features.map((f) => (
                    <div key={f} className="flex items-center gap-4 p-5 glass-elite luxury-border rounded-2xl text-[10px] font-bold uppercase tracking-widest text-text-muted/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/40 shadow-[0_0_8px_rgba(197,160,89,0.3)]" />
                      {f}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'forensic' && (
                <div className="glass-elite luxury-border rounded-[48px] p-10 relative overflow-hidden animate-in fade-in duration-1000">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[100px] rounded-full translate-x-1/4 -translate-y-1/4" />
                  <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                    <div className="relative w-40 h-40">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="3" />
                        <circle
                          cx="50" cy="50" r="45" fill="none" stroke="#C5A059" strokeWidth="3"
                          strokeLinecap="round"
                          className="transition-all duration-[2000ms] ease-luxury"
                          strokeDasharray={`${(car.inspectionScore / 200) * 283} 283`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-display font-black text-brand-gold">{car.inspectionScore}</span>
                        <span className="text-[10px] font-bold text-text-muted/40 tracking-[0.4em] mt-1">/ 200</span>
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold mb-4 opacity-100">FORENSIC EVALUATION</h4>
                      <p className="font-display text-3xl font-black text-text-primary mb-4 leading-tight">Master Inspection Manifest</p>
                      <p className="text-sm text-text-muted opacity-60 max-w-md leading-relaxed font-light">
                        Certified performance. This asset has been subjected to a rigorous 200-point forensic technical examination, meeting all institutional standards for acquisition.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fiscal Portolio Module */}
            <div className="glass-elite luxury-border rounded-[48px] p-12 lg:p-16 mb-16 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/[0.04] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-12">
                   <div className="w-12 h-[1px] bg-brand-gold/30" />
                   <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold">FISCAL CONCIERGE</p>
                </div>
                
                <div className="space-y-12 relative z-10">
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted/60">CAPITAL ALLOCATION</label>
                      <span className="text-2xl font-mono text-brand-gold tracking-tighter">{formatPrice(loanAmount)}</span>
                    </div>
                    <input type="range" min={100000} max={car.price} step={10000} value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-[1px] bg-white/10 appearance-none rounded-full accent-brand-gold cursor-pointer" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-6">
                      <div className="flex justify-between items-end">
                        <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted/60">APR INDEX</label>
                        <span className="text-lg font-mono text-text-primary">{interestRate}%</span>
                      </div>
                      <input type="range" min={6} max={18} step={0.5} value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full h-[1px] bg-white/10 appearance-none rounded-full accent-brand-gold cursor-pointer" />
                    </div>
                    <div className="space-y-6">
                      <div className="flex justify-between items-end">
                        <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted/60">DURATION (MONTHS)</label>
                        <span className="text-lg font-mono text-text-primary">{tenure}</span>
                      </div>
                      <input type="range" min={12} max={84} step={6} value={tenure}
                        onChange={(e) => setTenure(Number(e.target.value))}
                        className="w-full h-[1px] bg-white/10 appearance-none rounded-full accent-brand-gold cursor-pointer" />
                    </div>
                  </div>
                  
                  <div className="pt-12 border-t border-white/5 mt-10 flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <div>
                      <p className="text-text-muted text-[10px] font-bold uppercase tracking-[0.4em] mb-4 opacity-60">MONTHLY FISCAL COMMITMENT</p>
                      <p className="text-6xl font-display font-black gold-text-gradient tracking-tighter">{formatEMI(emi)}</p>
                    </div>
                    <button className="px-12 py-6 bg-brand-gold text-bg-primary text-[11px] font-black uppercase tracking-[0.4em] rounded-full hover:shadow-[0_0_50px_rgba(197,160,89,0.4)] transition-all duration-700">
                      INITIALIZE FUNDING
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Institutional Recommendations */}
            {similarCars.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-10">
                   <div className="w-12 h-[1px] bg-brand-gold/30" />
                   <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold">SIMILAR ASSETS</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {similarCars.map((c) => (
                    <CarCard key={c.id} car={c} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Precision Action Module (Sticky Card) */}
          <div className="lg:w-[420px] flex-shrink-0">
            <div className="sticky top-[120px] glass-elite luxury-border rounded-[48px] p-10 lg:p-12 shadow-[0_60px_120px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/[0.05] blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              
              <div className="flex items-start justify-between mb-10 relative z-10">
                <div className="max-w-[80%]">
                  <h1 className="font-display font-black text-3xl lg:text-4xl text-text-primary tracking-tighter leading-[0.9] mb-4">
                    {car.year} <br />
                    <span className="italic gold-text-gradient">{car.make}</span> <br />
                    {car.model}
                  </h1>
                  <div className="flex items-center gap-3 text-text-muted/60 text-[9px] font-bold uppercase tracking-[0.3em]">
                    <MapPin size={12} className="text-brand-gold/60" />
                    <span>{car.location} OPERATIONAL HUB</span>
                  </div>
                </div>
                <button
                  onClick={() => toggle(car.id)}
                  className="w-14 h-14 rounded-full glass-elite border border-white/5 flex items-center justify-center group transition-all duration-700 hover:border-brand-gold/40"
                  data-cursor
                >
                  <Heart
                    size={22}
                    className={mounted && liked ? 'fill-brand-red text-brand-red scale-110' : 'text-text-muted/40 group-hover:text-brand-gold transition-all duration-500'}
                  />
                </button>
              </div>

              <div className="mb-10 relative z-10">
                <p className="text-4xl font-mono font-black text-text-primary tracking-tighter flex items-end gap-3">
                  {formatPrice(car.price)}
                  <span className="text-xs text-text-muted/40 font-bold uppercase tracking-widest mb-2">INR</span>
                </p>
                <div className="flex items-center gap-4 mt-3">
                   <p className="text-sm text-text-muted line-through opacity-40">{formatPrice(car.originalPrice)}</p>
                   <div className="w-1 h-1 rounded-full bg-brand-gold/30" />
                   <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">ASSET SECURE</p>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <button className="w-full py-6 bg-brand-gold text-bg-primary font-black text-[10px] uppercase tracking-[0.4em] rounded-full hover:shadow-[0_0_40px_rgba(197,160,89,0.5)] transition-all duration-700">
                  SECURE ASSET NOW
                </button>
                <button className="w-full py-6 glass-elite luxury-border text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-full hover:bg-white/[0.05] transition-all duration-700">
                  REGISTER TEST DRIVE
                </button>
              </div>

              <div className="mt-10 pt-10 border-t border-white/5 relative z-10">
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                   <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-muted">EXECUTIVE CONCIERGE ACTIVE</p>
                </div>
                <button className="w-full py-5 bg-white/[0.02] border border-white/5 rounded-2xl text-[9px] font-bold uppercase tracking-[0.4em] text-text-muted hover:text-white hover:border-brand-gold/30 transition-all duration-700">
                  AUTHENTICATE ENQUIRY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Asset Modal */}
      {fullScreen && (
        <div className="fixed inset-0 z-[99999] bg-bg-primary/98 backdrop-blur-3xl flex items-center justify-center animate-in fade-in duration-700">
          <button
            onClick={() => setFullScreen(false)}
            className="absolute top-10 right-10 w-16 h-16 rounded-full glass-elite border border-white/10 flex items-center justify-center text-text-muted hover:text-white transition-all duration-500"
          >
            <X size={28} />
          </button>
          
          <button
            onClick={() => setCurrentImage((p) => (p - 1 + car.images.length) % car.images.length)}
            className="absolute left-10 w-16 h-16 rounded-full glass-elite border border-white/10 flex items-center justify-center text-brand-gold hover:text-white transition-all duration-500"
          >
            <ChevronLeft size={32} />
          </button>
          
          <button
            onClick={() => setCurrentImage((p) => (p + 1) % car.images.length)}
            className="absolute right-10 w-16 h-16 rounded-full glass-elite border border-white/10 flex items-center justify-center text-brand-gold hover:text-white transition-all duration-500"
          >
            <ChevronRight size={32} />
          </button>
          
          <div className="relative w-[90vw] h-[80vh] group">
            {mounted && (
              <Image
                src={car.images[currentImage]}
                alt={`${car.make} ${car.model} expansion`}
                fill
                className="object-contain"
              />
            )}
          </div>

          <div className="absolute bottom-12 flex gap-4">
            {car.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`transition-all duration-1000 rounded-full ${i === currentImage ? 'bg-brand-gold w-16 h-1' : 'bg-white/10 w-4 h-1'}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
