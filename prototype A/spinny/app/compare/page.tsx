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
    <div className="pt-[72px] min-h-screen bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-label text-brand-gold mb-4">COMPARE</p>
        <h1 className="text-display-md mb-8">Compare Cars Side by Side.</h1>

        {selected.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-6">⚖️</p>
            <p className="text-text-muted text-lg mb-6">Add cars to start comparing</p>
            <button onClick={() => setModalOpen(true)}
              className="px-6 py-3 bg-brand-gold text-bg-primary font-semibold rounded-card">
              <Plus size={16} className="inline mr-2" /> Add Car
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 bg-bg-primary w-36 text-left p-4">
                    {selected.length < 3 && (
                      <button onClick={() => setModalOpen(true)}
                        className="text-xs text-brand-gold hover:underline flex items-center gap-1">
                        <Plus size={12} /> Add Car
                      </button>
                    )}
                  </th>
                  {selected.map((car) => (
                    <th key={car.id} className="p-4 min-w-[200px]">
                      <div className="relative">
                        <button onClick={() => removeCar(car.id)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-bg-surface2 rounded-full flex items-center justify-center">
                          <X size={12} className="text-text-muted" />
                        </button>
                        <div className="w-full aspect-[4/3] relative rounded-card overflow-hidden mb-3">
                          <Image src={car.images[0]} alt={car.model} fill className="object-cover" sizes="200px" />
                        </div>
                        <p className="text-sm font-display font-bold text-text-primary">{car.year} {car.make}</p>
                        <p className="text-xs text-text-muted">{car.model}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specs.map((spec) => (
                  <tr key={spec.label} className="border-t border-border-default">
                    <td className="sticky left-0 z-10 bg-bg-primary p-4 text-sm text-text-muted font-medium">{spec.label}</td>
                    {selected.map((car) => (
                      <td key={car.id} className="p-4 text-sm text-text-primary">{spec.key(car)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Car Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setModalOpen(false)} />
          <div className="relative bg-bg-surface border border-border-default rounded-card w-full max-w-md max-h-[70vh] overflow-hidden">
            <div className="p-4 border-b border-border-default flex items-center gap-3">
              <Search size={16} className="text-text-muted" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search cars..." autoFocus
                className="flex-1 bg-transparent text-sm text-text-primary focus:outline-none placeholder:text-text-subtle" />
              <button onClick={() => setModalOpen(false)}><X size={18} className="text-text-muted" /></button>
            </div>
            <div className="overflow-y-auto max-h-[50vh]">
              {filtered.map((car) => (
                <button key={car.id} onClick={() => addCar(car)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-bg-surface2 transition-colors text-left">
                  <div className="w-16 h-12 relative rounded-sm overflow-hidden flex-shrink-0">
                    <Image src={car.images[0]} alt={car.model} fill className="object-cover" sizes="64px" />
                  </div>
                  <div>
                    <p className="text-sm text-text-primary font-medium">{car.year} {car.make} {car.model}</p>
                    <p className="text-xs text-text-muted">{formatPrice(car.price)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
