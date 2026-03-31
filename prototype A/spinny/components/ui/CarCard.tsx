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
    <Link href={`/car/${car.id}`} className="block group">
      <div className="bg-bg-surface border border-border-default rounded-card overflow-hidden card-hover">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={car.images[0]}
            alt={`${car.make} ${car.model} ${car.year}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {car.assured && (
              <span className="px-2 py-1 bg-brand-gold/90 text-bg-primary text-[10px] font-bold uppercase tracking-wider rounded-sm">
                Assured
              </span>
            )}
            {car.trending && (
              <span className="px-2 py-1 bg-brand-red/90 text-white text-[10px] font-bold uppercase tracking-wider rounded-sm">
                Trending
              </span>
            )}
          </div>

          {/* Heart */}
          <button
            onClick={handleLike}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-bg-primary/60 backdrop-blur-sm
              flex items-center justify-center transition-all duration-300
              hover:bg-bg-primary/80"
            aria-label={liked ? 'Remove from shortlist' : 'Add to shortlist'}
            data-cursor
          >
            <Heart
              size={16}
              className={`transition-all duration-300 ${
                mounted && liked ? 'fill-brand-red text-brand-red scale-110' : 'text-white'
              }`}
              style={{
                transform: mounted && liked ? 'scale(1.1)' : 'scale(1)',
              }}
            />
          </button>

          {/* Price overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg-primary/80 to-transparent p-3 pt-8">
            <span className="text-lg font-display font-bold text-text-primary">
              {formatPrice(car.price)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-display font-bold text-text-primary text-base mb-1 truncate">
            {car.year} {car.make} {car.model}
          </h3>

          <div className="flex items-center gap-3 text-text-muted text-xs mb-3">
            <span className="flex items-center gap-1">
              <Gauge size={12} />
              {formatMileage(car.mileage)}
            </span>
            <span className="w-[3px] h-[3px] rounded-full bg-text-subtle" />
            <span className="flex items-center gap-1">
              <Fuel size={12} />
              {car.fuelType}
            </span>
            <span className="w-[3px] h-[3px] rounded-full bg-text-subtle" />
            <span className="flex items-center gap-1">
              <Settings2 size={12} />
              {car.transmission}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-brand-gold font-medium">
              {formatEMI(car.emiPerMonth)}
            </span>
            <span className="text-xs text-text-subtle">
              {car.location}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
