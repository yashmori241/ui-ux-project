'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const handleTabSwitch = (tab: 'login' | 'register') => {
    setActiveTab(tab);
    setOtpSent(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
  };

  const handleSendOtp = () => {
    if (!/^[6-9]\d{9}$/.test(phone)) { setError('Enter a valid 10-digit number'); return; }
    if (activeTab === 'register' && name.length < 2) { setError('Enter your name'); return; }
    setError('');
    setOtpSent(true);
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp]; newOtp[index] = value; setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
    if (newOtp.join('') === '123456') { login({ name: name || 'User', phone }); router.push('/dashboard'); }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
  };

  return (
    <div className="min-h-screen bg-bg-primary relative flex items-center justify-center overflow-hidden">
      {/* Cinematic Backdrop */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=90" 
          alt="Atmospheric Asset Detail" 
          fill 
          className="object-cover opacity-25 desaturate-[0.8] scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/40 via-transparent to-bg-primary" />
      </div>

      {/* Modular Access Point */}
      <div className="relative z-10 w-full max-w-[540px] px-6">
        <div className="glass-elite luxury-border rounded-[48px] p-12 md:p-16 shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-8 opacity-40">
              <div className="w-10 h-[1px] bg-brand-gold/50" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">AUTHORIZED ACCESS ONLY</p>
              <div className="w-10 h-[1px] bg-brand-gold/50" />
            </div>
            
            <h1 className="text-display-md mb-4 tracking-tighter">
              Secure Executive <br />
              <span className="italic font-display gold-text-gradient">Portal</span><span className="text-brand-gold">.</span>
            </h1>
            <p className="text-text-muted text-xs font-mono uppercase tracking-widest opacity-60">
              Initialize session to manage your automotive legacy.
            </p>
          </div>

          {/* Access Tabs */}
          <div className="flex glass rounded-full p-1.5 mb-12 border-white/5 relative">
            <div 
              className="absolute top-1.5 bottom-1.5 bg-brand-gold rounded-full transition-all duration-700 ease-luxury shadow-[0_0_20px_rgba(197,160,89,0.4)]"
              style={{ left: activeTab === 'login' ? '6px' : 'calc(50% + 2px)', width: 'calc(50% - 8px)' }} 
            />
            <button 
              onClick={() => handleTabSwitch('login')} 
              className={`relative z-10 flex-1 py-3 text-[9px] font-bold uppercase tracking-[0.3em] rounded-full transition-colors duration-500 ${activeTab === 'login' ? 'text-bg-primary' : 'text-text-muted hover:text-text-primary'}`}
            >
              AUTHENTICATE
            </button>
            <button 
              onClick={() => handleTabSwitch('register')} 
              className={`relative z-10 flex-1 py-3 text-[9px] font-bold uppercase tracking-[0.3em] rounded-full transition-colors duration-500 ${activeTab === 'register' ? 'text-bg-primary' : 'text-text-muted hover:text-text-primary'}`}
            >
              INITIALIZE
            </button>
          </div>

          <div className="space-y-8">
            {activeTab === 'register' && (
              <div>
                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-muted/60 mb-4 block">AUTHORIZED IDENTITY</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="NOMINAL IDENTITY"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 text-xs text-text-primary focus:border-brand-gold/40 focus:bg-white/[0.05] focus:outline-none transition-all placeholder:text-text-subtle font-mono tracking-widest" 
                />
              </div>
            )}
            
            <div>
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-muted/60 mb-4 block">TELEMETRY ACCESS LINK</label>
              <div className="flex gap-4">
                <div className="flex items-center px-6 bg-white/[0.03] border border-white/5 rounded-2xl text-[10px] text-brand-gold font-mono tracking-widest">+91</div>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} 
                  placeholder="CONNECTION SEQUENCE" 
                  maxLength={10}
                  className="flex-1 bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 text-xs text-text-primary focus:border-brand-gold/40 focus:bg-white/[0.05] focus:outline-none transition-all placeholder:text-text-subtle font-mono tracking-widest" 
                />
              </div>
            </div>

            {error && <p className="text-brand-red text-[9px] font-bold uppercase tracking-[0.2em] text-center">{error}</p>}

            {!otpSent ? (
              <button 
                onClick={handleSendOtp} 
                className="w-full py-6 bg-brand-gold text-bg-primary font-black text-[10px] uppercase tracking-[0.4em] rounded-full hover:shadow-[0_0_50px_rgba(197,160,89,0.5)] transition-all duration-700 ease-luxury transform hover:scale-[1.02] active:scale-[0.98]"
              >
                GENERATE VERIFICATION
              </button>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-muted/60 mb-6 block text-center">IDENTITY SEQUENCE REQUIRED</label>
                <div className="flex gap-4 justify-center mb-8">
                  {otp.map((digit, i) => (
                    <input 
                      key={i} 
                      ref={(el) => { otpRefs.current[i] = el; }} 
                      type="text" 
                      maxLength={1} 
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)} 
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-12 h-16 bg-white/[0.03] border border-white/5 rounded-2xl text-center text-xl text-text-primary focus:border-brand-gold focus:bg-white/[0.05] focus:outline-none font-mono tracking-tighter transition-all shadow-inner" 
                    />
                  ))}
                </div>
                <div className="pt-8 border-t border-white/5 text-center">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-subtle">Verification Protocol: <span className="text-brand-gold">123456</span></p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
