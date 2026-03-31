'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Settings, Calendar, LogOut } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';
import { useShortlistStore } from '@/lib/store/shortlistStore';
import { cars } from '@/lib/data/cars';
import { CarCard } from '@/components/ui/CarCard';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { shortlist } = useShortlistStore();
  const [activeTab, setActiveTab] = useState('shortlist');
  const [editName, setEditName] = useState(false);
  const [nameVal, setNameVal] = useState('');
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) router.push('/login');
  }, [mounted, isAuthenticated, router]);

  // eslint-disable-next-line
  useEffect(() => { if (user) setNameVal(user.name); }, [user]);

  if (!mounted || !isAuthenticated) return (
    <div className="pt-[72px] min-h-screen bg-bg-primary flex items-center justify-center">
      <p className="text-text-muted">Loading...</p>
    </div>
  );

  const shortlistedCars = cars.filter((c) => shortlist.includes(c.id));
  const tabs = [
    { id: 'shortlist', label: 'My Shortlist', icon: <Heart size={16} /> },
    { id: 'bookings', label: 'My Bookings', icon: <Calendar size={16} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
  ];

  return (
    <div className="pt-[72px] min-h-screen bg-bg-primary">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-label text-brand-gold mb-2">DASHBOARD</p>
            <h1 className="text-display-md">Welcome, {user?.name}.</h1>
          </div>
          <button onClick={() => { logout(); router.push('/'); }}
            className="flex items-center gap-2 px-4 py-2 border border-border-default rounded-card text-sm text-text-muted hover:text-brand-red hover:border-brand-red transition-all">
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border-default">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative
                ${activeTab === tab.id ? 'text-brand-gold' : 'text-text-muted hover:text-text-primary'}`}>
              {tab.icon} {tab.label}
              {activeTab === tab.id && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold" />}
              {tab.id === 'shortlist' && shortlist.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-brand-gold text-bg-primary text-[10px] font-bold rounded-full">{shortlist.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'shortlist' && (
          shortlistedCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shortlistedCars.map((c) => <CarCard key={c.id} car={c} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <Heart size={48} className="mx-auto text-text-subtle mb-4" />
              <p className="text-text-muted text-lg mb-2">No shortlisted cars yet</p>
              <a href="/browse" className="text-brand-gold text-sm hover:underline">Browse Cars →</a>
            </div>
          )
        )}

        {activeTab === 'bookings' && (
          <div className="text-center py-20">
            <Calendar size={48} className="mx-auto text-text-subtle mb-4" />
            <p className="text-text-muted text-lg mb-2">No bookings yet</p>
            <a href="/browse" className="text-brand-gold text-sm hover:underline">Browse Cars →</a>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-lg space-y-6">
            <div className="bg-bg-surface border border-border-default rounded-card p-6">
              <div className="flex justify-between items-center">
                <div><p className="text-xs text-text-muted mb-1">Name</p>
                  {editName ? (
                    <div className="flex gap-2">
                      <input value={nameVal} onChange={(e) => setNameVal(e.target.value)}
                        className="bg-bg-primary border border-border-default rounded-card px-3 py-1.5 text-sm text-text-primary focus:border-brand-gold focus:outline-none" />
                      <button onClick={() => setEditName(false)} className="text-xs text-brand-gold">Save</button>
                      <button onClick={() => setEditName(false)} className="text-xs text-text-muted">Cancel</button>
                    </div>
                  ) : (
                    <p className="text-sm text-text-primary">{user?.name}</p>
                  )}
                </div>
                {!editName && <button onClick={() => setEditName(true)} className="text-xs text-brand-gold">Edit</button>}
              </div>
            </div>
            <div className="bg-bg-surface border border-border-default rounded-card p-6">
              <p className="text-xs text-text-muted mb-1">Phone</p>
              <p className="text-sm text-text-primary">{user?.phone}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
