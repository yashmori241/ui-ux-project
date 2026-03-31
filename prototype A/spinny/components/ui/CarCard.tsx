'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Fuel, Gauge, Settings2 } from 'lucide-react';
import { useShortlistStore } from '@/lib/store/shortlistStore';
import { formatPrice, formatMileage, formatEMI } from '@/lib/utils/formatters';
import type { Car } from '@/lib/data/cars';
import { useState, useEffect } from 'react';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const { toggle, isShortlisted } = useShortlistStore();
  const [mounted, setMounted] = useState(false);
  const liked = isShortlisted(car.id);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(car.id);
  };

  return (
    <Link href={`/car/${car.id}`} className="block group perspective-1000">
      <div className="glass-elite luxury-border rounded-[42px] overflow-hidden transition-all duration-1000 ease-luxury group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.8)] group-hover:-translate-y-2 relative">
        {/* Specular Highlight Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
        
        {/* Image Module */}
        <div className="relative aspect-[16/11] overflow-hidden">
          <Image
            src={car.images[0]}
            alt={`${car.make} ${car.model}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover desaturate-[0.6] sepia-[0.1] brightness-[0.8] transition-all duration-[2500ms] ease-luxury group-hover:scale-110 group-hover:desaturate-0 group-hover:brightness-100 group-hover:rotate-1"
          />
          
          {/* Atmospheric Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-60" />
          <div className="absolute inset-0 bg-brand-gold/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          {/* Institutional Badges */}
          <div className="absolute top-6 left-6 flex flex-col gap-3">
            {car.assured && (
              <div className="glass-elite px-4 py-2 text-[8px] font-bold uppercase tracking-[0.4em] rounded-full border-brand-gold/30 text-brand-gold shadow-[0_10px_30px_rgba(197,160,89,0.3)] backdrop-blur-md">
                VERIFIED HERITAGE
              </div>
            )}
            {car.trending && (
              <div className="glass px-4 py-2 text-[8px] font-bold uppercase tracking-[0.4em] rounded-full border-white/10 text-white/70 backdrop-blur-md">
                HIGH ACQUISITION
              </div>
            )}
          </div>

          {/* Heart/Shortlist */}
          <button
            onClick={handleLike}
            className="absolute top-6 right-6 w-12 h-12 rounded-full glass border-white/10
              flex items-center justify-center transition-all duration-700
              hover:bg-brand-gold hover:text-bg-primary group/heart z-10"
            aria-label={liked ? 'Remove from portfolio' : 'Add to portfolio'}
          >
            <Heart
              size={18}
              className={`transition-all duration-700 ${
                mounted && liked ? 'fill-current text-white scale-110' : 'text-white/40 group-hover/heart:text-bg-primary'
              }`}
            />
          </button>
        </div>

        {/* Technical Data Module */}
        <div className="p-10 relative">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-[10px] font-mono font-bold text-brand-gold/60 uppercase tracking-[0.2em] mb-2">{car.year}</p>
              <h3 className="font-display font-black text-text-primary text-2xl tracking-tighter leading-none group-hover:text-brand-gold transition-colors duration-700">
                {car.make} <span className="opacity-60">{car.model}</span>
              </h3>
            </div>
            <div className="w-10 h-[10px] bg-brand-gold/20 rounded-full overflow-hidden">
               <div className="w-full h-full bg-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>
          </div>

          <div className="flex items-center gap-10 text-text-muted text-[9px] uppercase font-bold tracking-[0.3em] font-mono mb-10 opacity-60">
            <div className="flex items-center gap-3 group/stat">
              <Gauge size={14} className="text-brand-gold/40 group-hover/stat:text-brand-gold transition-colors" />
              <span>{formatMileage(car.mileage).toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-3 group/stat">
              <Fuel size={14} className="text-brand-gold/40 group-hover/stat:text-brand-gold transition-colors" />
              <span>{car.fuelType.toUpperCase()}</span>
            </div>
          </div>

          {/* Financial Protocol Section */}
          <div className="flex items-end justify-between pt-10 border-t border-white/5">
            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-text-muted/60 mb-3">Portfolio Valuation</p>
              <p className="text-3xl font-display font-black text-text-primary tracking-tighter gold-text-gradient">
                {formatPrice(car.price)}
              </p>
            </div>
            <div className="text-right">
                <p className="text-[10px] font-mono font-bold text-brand-gold tracking-tight mb-2">
                  {formatEMI(car.emiPerMonth)}<span className="opacity-40">/MO</span>
                </p>
                <p className="text-[8px] font-bold text-text-subtle uppercase tracking-[0.3em] opacity-60">OPERATIONAL PROTOCOL</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
