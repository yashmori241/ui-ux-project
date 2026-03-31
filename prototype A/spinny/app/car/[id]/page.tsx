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
    <div className="pt-[72px] min-h-screen bg-bg-primary">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-xs text-text-muted">
          <Link href="/browse" className="hover:text-brand-gold">Browse</Link>
          <span>/</span>
          <span className="text-text-primary">{car.make} {car.model}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1">
            {/* Gallery */}
            <div className="mb-6">
              <div
                ref={mainImgRef}
                className="relative aspect-[16/9] rounded-card overflow-hidden cursor-pointer"
                onClick={() => setFullScreen(true)}
              >
                {mounted && (
                  <Image
                    src={car.images[currentImage]}
                    alt={`${car.make} ${car.model} - Image ${currentImage + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover"
                    priority
                  />
                )}
              </div>

              <div className="flex gap-3 mt-3 overflow-x-auto">
                {car.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => handleThumbnailClick(i)}
                    className={`relative w-20 h-14 rounded-sm overflow-hidden flex-shrink-0 border-2 transition-all duration-300
                      ${i === currentImage ? 'border-brand-gold' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <Image src={img} alt={`Thumbnail ${i + 1}`} fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-border-default mb-6">
              <div className="flex gap-6">
                {['overview', 'specifications', 'features', 'inspection'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-medium capitalize transition-all duration-300 relative
                      ${activeTab === tab ? 'text-brand-gold' : 'text-text-muted hover:text-text-primary'}`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="mb-8">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {specs.map((s) => (
                    <div key={s.label} className="bg-bg-surface border border-border-default rounded-card p-4">
                      <div className="flex items-center gap-2 text-text-muted mb-1">
                        {s.icon}
                        <span className="text-xs">{s.label}</span>
                      </div>
                      <span className="text-sm font-semibold text-text-primary">{s.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="space-y-3">
                  {[
                    ['Engine', car.engine],
                    ['Power', car.power],
                    ['Seats', `${car.seats} Seater`],
                    ['Body Type', car.bodyType],
                    ['Registration', car.registrationState],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between py-3 border-b border-border-default">
                      <span className="text-sm text-text-muted">{label}</span>
                      <span className="text-sm text-text-primary font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'features' && (
                <div className="grid grid-cols-2 gap-3">
                  {car.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-text-primary">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                      {f}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'inspection' && (
                <div className="bg-bg-surface border border-border-default rounded-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-20 h-20">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                        <circle
                          cx="50" cy="50" r="45" fill="none" stroke="#C9A84C" strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={`${(car.inspectionScore / 200) * 283} 283`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-brand-gold">{car.inspectionScore}</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-display font-bold text-text-primary">Inspection Score</p>
                      <p className="text-sm text-text-muted">{car.inspectionScore}/200 points passed</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Inline EMI Calculator */}
            <div className="bg-bg-surface border border-border-default rounded-card p-6 mb-8">
              <h3 className="text-label text-brand-gold mb-6">EMI CALCULATOR</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-text-muted mb-1 block">Loan Amount: {formatPrice(loanAmount)}</label>
                  <input type="range" min={100000} max={car.price} step={10000} value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-brand-gold" />
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-1 block">Interest Rate: {interestRate}%</label>
                  <input type="range" min={6} max={18} step={0.5} value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-brand-gold" />
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-1 block">Tenure: {tenure} months</label>
                  <input type="range" min={12} max={84} step={6} value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full accent-brand-gold" />
                </div>
                <div className="pt-4 border-t border-border-default">
                  <p className="text-text-muted text-xs">Monthly EMI</p>
                  <p className="text-display-md gold-text-gradient">{formatEMI(emi)}</p>
                </div>
              </div>
            </div>

            {/* Similar Cars */}
            {similarCars.length > 0 && (
              <div>
                <h3 className="text-label text-brand-gold mb-6">SIMILAR CARS</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {similarCars.map((c) => (
                    <CarCard key={c.id} car={c} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sticky Card */}
          <div className="lg:w-[380px] flex-shrink-0">
            <div className="sticky top-[88px] bg-bg-surface border border-border-default rounded-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-display font-bold text-xl text-text-primary">
                    {car.year} {car.make} {car.model}
                  </h1>
                  <div className="flex items-center gap-2 mt-1 text-text-muted text-xs">
                    <MapPin size={12} />
                    <span>{car.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggle(car.id)}
                  className="p-2 rounded-full bg-bg-surface2"
                  data-cursor
                >
                  <Heart
                    size={18}
                    className={mounted && liked ? 'fill-brand-red text-brand-red' : 'text-text-muted'}
                  />
                </button>
              </div>

              {car.assured && (
                <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-brand-gold/10 border border-brand-gold/20 rounded-card">
                  <Shield size={14} className="text-brand-gold" />
                  <span className="text-xs text-brand-gold font-medium">Spinny Assured</span>
                </div>
              )}

              <div className="mb-6">
                <p className="text-3xl font-display font-bold text-text-primary">{formatPrice(car.price)}</p>
                <p className="text-sm text-text-muted line-through mt-1">{formatPrice(car.originalPrice)}</p>
                <p className="text-sm text-brand-gold mt-1">EMI from {formatEMI(car.emiPerMonth)}</p>
              </div>

              <div className="space-y-3">
                <MagneticButton variant="gold" className="w-full justify-center">
                  Book Free Test Drive
                </MagneticButton>
                <Link href="/compare" className="block">
                  <MagneticButton variant="outline" className="w-full justify-center">
                    Add to Compare
                  </MagneticButton>
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-border-default">
                <p className="text-xs text-text-muted mb-2">Have questions?</p>
                <button className="w-full py-2.5 bg-bg-surface2 border border-border-default rounded-card text-sm text-text-primary hover:border-brand-gold transition-all">
                  Contact Spinny
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Gallery Modal */}
      {fullScreen && (
        <div className="fixed inset-0 z-[99999] bg-bg-primary/95 flex items-center justify-center">
          <button
            onClick={() => setFullScreen(false)}
            className="absolute top-6 right-6 p-2 text-text-muted hover:text-text-primary"
          >
            <X size={24} />
          </button>
          <button
            onClick={() => setCurrentImage((p) => (p - 1 + car.images.length) % car.images.length)}
            className="absolute left-6 p-3 bg-bg-surface rounded-full text-text-muted hover:text-text-primary"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrentImage((p) => (p + 1) % car.images.length)}
            className="absolute right-6 p-3 bg-bg-surface rounded-full text-text-muted hover:text-text-primary"
          >
            <ChevronRight size={24} />
          </button>
          <div className="relative w-[90vw] h-[70vh]">
            {mounted && (
              <Image
                src={car.images[currentImage]}
                alt={`${car.make} ${car.model} fullscreen`}
                fill
                className="object-contain"
              />
            )}
          </div>
          <div className="absolute bottom-8 flex gap-2">
            {car.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === currentImage ? 'bg-brand-gold w-6' : 'bg-text-subtle'}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
