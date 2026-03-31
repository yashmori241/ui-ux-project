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
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-bg-primary relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80" alt="Luxury car" fill className="object-cover opacity-30" />
        </div>
        <div className="relative z-10 text-center max-w-md px-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="font-display text-3xl font-bold text-text-primary">SPINNY</span>
            <span className="w-2 h-2 rounded-full bg-brand-gold" />
          </div>
          <h2 className="text-display-md mb-4">Your Dream Car is One Step Away.</h2>
          <p className="text-text-muted font-body">Join 2,00,000+ happy customers.</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-bg-surface flex items-center justify-center p-8 pt-[72px]">
        <div className="w-full max-w-md">
          <div className="relative flex bg-bg-primary rounded-card p-1 mb-8">
            <div ref={indicatorRef} className="absolute top-1 bottom-1 bg-brand-gold rounded-sm transition-all duration-300 ease-luxury"
              style={{ left: activeTab === 'login' ? '4px' : '50%', width: 'calc(50% - 4px)' }} />
            <button onClick={() => handleTabSwitch('login')} className={`relative z-10 flex-1 py-2.5 text-sm font-semibold rounded-sm transition-colors ${activeTab === 'login' ? 'text-bg-primary' : 'text-text-muted'}`}>Login</button>
            <button onClick={() => handleTabSwitch('register')} className={`relative z-10 flex-1 py-2.5 text-sm font-semibold rounded-sm transition-colors ${activeTab === 'register' ? 'text-bg-primary' : 'text-text-muted'}`}>Register</button>
          </div>
          <h1 className="text-display-md mb-2">{activeTab === 'login' ? 'Welcome Back.' : 'Create Account.'}</h1>
          <p className="text-text-muted text-sm mb-8">{activeTab === 'login' ? 'Login to continue.' : 'Register to start.'}</p>
          <div className="space-y-4">
            {activeTab === 'register' && (
              <div>
                <label className="text-xs text-text-muted mb-2 block">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
                  className="w-full bg-bg-primary border border-border-default rounded-card px-4 py-3 text-sm text-text-primary focus:border-brand-gold focus:outline-none placeholder:text-text-subtle" />
              </div>
            )}
            <div>
              <label className="text-xs text-text-muted mb-2 block">Phone Number</label>
              <div className="flex gap-3">
                <span className="flex items-center px-3 bg-bg-primary border border-border-default rounded-card text-sm text-text-muted">+91</span>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="10-digit" maxLength={10}
                  className="flex-1 bg-bg-primary border border-border-default rounded-card px-4 py-3 text-sm text-text-primary focus:border-brand-gold focus:outline-none placeholder:text-text-subtle" />
              </div>
            </div>
            {error && <p className="text-brand-red text-xs">{error}</p>}
            {!otpSent ? (
              <button onClick={handleSendOtp} className="w-full py-3.5 bg-brand-gold text-bg-primary font-semibold rounded-card hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all">Get OTP</button>
            ) : (
              <div>
                <label className="text-xs text-text-muted mb-3 block">Enter OTP</label>
                <div className="flex gap-3">
                  {otp.map((digit, i) => (
                    <input key={i} ref={(el) => { otpRefs.current[i] = el; }} type="text" maxLength={1} value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="flex-1 h-14 bg-bg-primary border border-border-default rounded-card text-center text-xl text-text-primary focus:border-brand-gold focus:outline-none font-display" />
                  ))}
                </div>
                <p className="text-xs text-text-subtle text-center mt-3">Use OTP: 123456</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
