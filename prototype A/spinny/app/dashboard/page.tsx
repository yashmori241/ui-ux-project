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
    <div className="pt-[80px] min-h-screen bg-bg-primary relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-gold/[0.02] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 py-16">
        {/* Executive Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-16 border-b border-white/5 gap-12">
          <div className="flex-1">
            <div className="flex items-center gap-6 mb-10 opacity-60">
               <div className="w-12 h-[1px] bg-brand-gold/50" />
               <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">EXECUTIVE PORTFOLIO</p>
            </div>
            <h1 className="text-display-lg tracking-tighter leading-[0.85]">
              Welcome, <br />
              <span className="italic font-display gold-text-gradient">{user?.name}</span><span className="text-brand-gold">.</span>
            </h1>
          </div>
          <button onClick={() => { logout(); router.push('/'); }}
            className="flex items-center gap-6 px-10 py-5 glass-elite luxury-border rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-text-muted hover:text-brand-red hover:border-brand-red transition-all duration-700 group cursor-pointer">
            <LogOut size={16} className="group-hover:-translate-x-2 transition-transform duration-700" /> 
            INITIALIZE LOGOUT PROTOCOL
          </button>
        </div>

        {/* Tactical Navigation Matrix */}
        <div className="flex flex-wrap gap-12 mb-20 border-b border-white/5">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-6 pb-10 text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-700 relative group
                ${activeTab === tab.id ? 'text-brand-gold' : 'text-text-muted/60 hover:text-white'}`}>
              <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-700 ${activeTab === tab.id ? 'border-brand-gold bg-brand-gold/5 shadow-[0_0_20px_rgba(197,160,89,0.3)]' : 'border-white/10'}`}>
                 {tab.icon}
              </div>
              {tab.label === 'My Shortlist' ? 'ASSET REGISTRY' : tab.label === 'My Bookings' ? 'LOGISTICS MANIFEST' : 'ENTITY CONFIG'}
              {activeTab === tab.id && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-brand-gold animate-in fade-in slide-in-from-left-full duration-700" />
              )}
              {tab.id === 'shortlist' && shortlist.length > 0 && (
                <span className="ml-4 px-3 py-1 bg-brand-gold text-bg-primary text-[9px] font-black rounded-full shadow-[0_0_15px_rgba(197,160,89,0.4)]">{shortlist.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Registry Content Manifest */}
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
          {activeTab === 'shortlist' && (
            shortlistedCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {shortlistedCars.map((c) => <CarCard key={c.id} car={c} />)}
              </div>
            ) : (
              <div className="text-center py-40 glass-elite luxury-border rounded-[56px] opacity-60">
                <Heart size={48} className="mx-auto text-brand-gold/30 mb-10" />
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold mb-6">REGISTRY VACANT</p>
                <p className="text-xl font-body max-w-sm mx-auto mb-12 opacity-60">Your institutional asset selection is currently empty.</p>
                <a href="/browse" className="text-[10px] font-black uppercase tracking-[0.4em] text-white hover:text-brand-gold transition-colors duration-700">EXPLORE PORTFOLIO →</a>
              </div>
            )
          )}

          {activeTab === 'bookings' && (
            <div className="text-center py-40 glass-elite luxury-border rounded-[56px] opacity-60">
              <Calendar size={48} className="mx-auto text-brand-gold/30 mb-10" />
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold mb-6">MANIFEST VACANT</p>
              <p className="text-xl font-body max-w-sm mx-auto mb-12 opacity-60">No pending logistics or acquisition protocols identifed.</p>
              <a href="/browse" className="text-[10px] font-black uppercase tracking-[0.4em] text-white hover:text-brand-gold transition-colors duration-700">INITIATE ACQUISITION →</a>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="glass-elite luxury-border rounded-[48px] p-12 relative overflow-hidden group hover:bg-white/[0.02] transition-colors duration-1000">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/[0.05] blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
                 <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="flex-1">
                     <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold/60 mb-6">LEGAL ENTITY NAME</p>
                     {editName ? (
                      <div className="flex flex-col gap-6">
                        <input value={nameVal} onChange={(e) => setNameVal(e.target.value)}
                          className="bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-lg font-display text-text-primary focus:border-brand-gold/40 focus:outline-none transition-all duration-700" />
                        <div className="flex gap-8">
                           <button onClick={() => setEditName(false)} className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em] hover:text-white transition-colors">COMMIT PROTOCOL</button>
                           <button onClick={() => setEditName(false)} className="text-[10px] font-black text-text-muted/40 uppercase tracking-[0.3em] hover:text-white transition-colors">DISCARD</button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-3xl font-display font-black text-text-primary tracking-tighter">{user?.name}</p>
                    )}
                  </div>
                  {!editName && (
                     <button onClick={() => setEditName(true)} className="p-4 rounded-full glass-elite border border-white/5 text-text-muted/40 hover:text-brand-gold hover:border-brand-gold duration-700 transition-all group/icon">
                        <Settings size={18} className="group-hover/icon:rotate-90 transition-transform duration-700" />
                     </button>
                  )}
                </div>
              </div>

              <div className="glass-elite luxury-border rounded-[48px] p-12 relative overflow-hidden group hover:bg-white/[0.02] transition-colors duration-1000">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/[0.05] blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
                 <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold/60 mb-6 relative z-10">VERIFIED TELEMETRY INDEX</p>
                 <p className="text-3xl font-mono font-black text-text-primary tracking-tighter relative z-10">{user?.phone}</p>
                 <div className="mt-8 flex items-center gap-3 relative z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-text-muted/40">SECURE CHANNEL ACTIVE</span>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
