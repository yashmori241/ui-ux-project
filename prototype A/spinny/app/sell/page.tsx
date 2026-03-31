'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ChevronRight, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { brands } from '@/lib/data/cars';

const carSchema = z.object({
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.string().min(1, 'Year is required'),
  variant: z.string().min(1, 'Variant is required'),
  mileage: z.string().min(1, 'Mileage is required'),
});

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit phone number'),
});

export default function SellPage() {
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const stepRef = useRef<HTMLDivElement>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const priceRef = useRef<HTMLDivElement>(null);

  const carForm = useForm({ resolver: zodResolver(carSchema) });
  const contactForm = useForm({ resolver: zodResolver(contactSchema) });

  const steps = ['Car Details', 'Contact Info', 'Get Price'];

  const goToStep = (nextStep: number) => {
    if (stepRef.current) {
      gsap.fromTo(
        stepRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
    setStep(nextStep);
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    carForm.handleSubmit(() => goToStep(1))(e);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // Check OTP
    if (newOtp.join('') === '123456') {
      setOtpVerified(true);
      setTimeout(() => {
        setEstimatedPrice(Math.floor(Math.random() * 500000) + 500000);
        goToStep(2);
      }, 500);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (step === 2 && priceRef.current && estimatedPrice > 0) {
      gsap.from(priceRef.current, {
        filter: 'blur(16px)',
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
      });
    }
  }, [step, estimatedPrice]);

  return (
    <div className="pt-[80px] min-h-screen bg-bg-primary relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-gold/[0.03] blur-[180px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 py-20 flex flex-col lg:flex-row gap-24 items-start">
        {/* Left: Editorial Content Asset */}
        <div className="lg:w-1/2 lg:sticky lg:top-[140px]">
           <div className="flex items-center gap-4 mb-10 opacity-60">
             <div className="w-12 h-[1px] bg-brand-gold/50" />
             <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">VALUATION CONCIERGE</p>
           </div>
           
           <h1 className="text-display-lg mb-10 tracking-tighter leading-[0.85]">
             Automotive Portfolio <br />
             <span className="italic font-display gold-text-gradient">Liquidation Protocol</span><span className="text-brand-gold">.</span>
           </h1>
           
           <p className="text-text-muted text-lg font-body max-w-lg leading-relaxed opacity-70 font-light mb-16">
             The definitive gateway for transitioning high-value automotive assets. 
             Experience a sophisticated liquidation process engineered for precision, transparency, and immediate fiscal settlement.
           </p>
           
           <div className="space-y-10">
              {[
                { title: 'REAL-TIME VALUATION', desc: 'Instant preliminary assessment based on global market telemetry.' },
                { title: 'TECHNICAL VERIFICATION', desc: 'Forensic doorstep evaluation conducted by master technicians.' },
                { title: 'FISCAL SETTLEMENT', desc: 'Immediate fund securement upon protocol verification.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                   <div className="w-6 h-6 rounded-full border border-brand-gold/20 flex items-center justify-center mt-1 group-hover:border-brand-gold/50 transition-all duration-1000">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
                   </div>
                   <div>
                     <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold/80 mb-2">{item.title}</h4>
                     <p className="text-sm text-text-muted opacity-60 font-medium group-hover:opacity-100 transition-opacity duration-700">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Right: Liquidation Terminal Module */}
        <div className="lg:w-1/2 w-full max-w-xl glass-elite p-12 lg:p-16 luxury-border rounded-[48px] relative overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.8)]">
           <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/[0.03] blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          {/* Verification Progress */}
          <div className="flex items-center gap-4 mb-16">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-4 flex-1">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all duration-1000
                    ${i <= step ? 'bg-brand-gold text-bg-primary shadow-[0_0_20px_rgba(197,160,89,0.4)]' : 'bg-white/5 border border-white/5 text-text-muted/40'}`}
                >
                  {i < step ? <Check size={16} /> : `0${i + 1}`}
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-[1px] bg-white/5 relative">
                    <div 
                      className="absolute inset-0 bg-brand-gold transition-all duration-1000 ease-luxury"
                      style={{ width: i < step ? '100%' : '0%' }} 
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div ref={stepRef}>
            {/* Step 1: Asset Identification */}
            {step === 0 && (
              <form onSubmit={handleStep1} className="space-y-10">
                <div className="space-y-6">
                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-muted/60 mb-4 block">PORTFOLIO ORIGIN</label>
                    <select
                      {...carForm.register('brand')}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 text-xs text-text-primary uppercase tracking-[0.1em]
                        focus:border-brand-gold/40 focus:bg-white/[0.05] focus:outline-none transition-all appearance-none cursor-pointer font-mono"
                    >
                      <option value="" className="bg-bg-primary">SELECT MANUFACTURER</option>
                      {brands.map((b) => (<option key={b} value={b} className="bg-bg-primary">{b}</option>))}
                    </select>
                    {carForm.formState.errors.brand && (
                      <p className="text-brand-red text-[9px] mt-3 font-bold uppercase tracking-widest">{carForm.formState.errors.brand.message as string}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-muted/60 mb-4 block">MODEL SPECIFICATION</label>
                    <input
                      {...carForm.register('model')}
                      placeholder="ENTER NOMINAL MODEL"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 text-xs text-text-primary
                        focus:border-brand-gold/40 focus:bg-white/[0.05] focus:outline-none transition-all placeholder:text-text-subtle font-mono tracking-widest"
                    />
                    {carForm.formState.errors.model && (
                      <p className="text-brand-red text-[9px] mt-3 font-bold uppercase tracking-widest">{carForm.formState.errors.model.message as string}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-muted/60 mb-4 block">VINTAGE</label>
                      <select
                        {...carForm.register('year')}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-5 text-xs text-text-primary
                          focus:border-brand-gold/40 focus:outline-none transition-all font-mono"
                      >
                        <option value="" className="bg-bg-primary">YEAR</option>
                        {Array.from({ length: 15 }, (_, i) => 2024 - i).map((y) => (
                          <option key={y} value={y} className="bg-bg-primary">{y}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-muted/60 mb-4 block">CONFIGURATION</label>
                      <input
                        {...carForm.register('variant')}
                        placeholder="VARIANT"
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-5 text-xs text-text-primary
                          focus:border-brand-gold/40 focus:outline-none transition-all placeholder:text-text-subtle font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-muted/60 mb-4 block">TELEMETRY READING (KM)</label>
                    <input
                      {...carForm.register('mileage')}
                      placeholder="TOTAL DISPLACEMENT"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 text-xs text-text-primary
                        focus:border-brand-gold/40 focus:outline-none transition-all placeholder:text-text-subtle font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-6 bg-brand-gold text-bg-primary font-black text-[10px] uppercase tracking-[0.4em] rounded-full
                    hover:shadow-[0_0_50px_rgba(197,160,89,0.5)] transition-all duration-700 ease-luxury transform hover:scale-[1.02]"
                >
                  INITIALIZE ASSESSMENT <ChevronRight size={14} className="inline ml-2" />
                </button>
              </form>
            )}

            {/* Step 2: Verification Sequence */}
            {step === 1 && (
              <div className="space-y-10">
                <div className="space-y-8">
                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-muted/60 mb-4 block">AUTHORIZED IDENTITY</label>
                    <input
                      {...contactForm.register('name')}
                      placeholder="NOMINAL IDENTITY"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 text-xs text-text-primary
                        focus:border-brand-gold/40 focus:outline-none transition-all placeholder:text-text-subtle font-mono"
                    />
                    {contactForm.formState.errors.name && (
                      <p className="text-brand-red text-[9px] mt-3 font-bold uppercase tracking-widest">{contactForm.formState.errors.name.message as string}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-muted/60 mb-4 block">TELEMETRY ACCESS LINK</label>
                    <div className="flex gap-4">
                      <input
                        {...contactForm.register('phone')}
                        placeholder="CONNECTION SEQUENCE"
                        maxLength={10}
                        className="flex-1 bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-5 text-xs text-text-primary
                          focus:border-brand-gold/40 focus:outline-none transition-all placeholder:text-text-subtle font-mono"
                      />
                      {!otpSent && (
                        <button
                          onClick={contactForm.handleSubmit(handleSendOtp)}
                          className="px-10 py-5 bg-brand-gold text-bg-primary text-[10px] font-black uppercase tracking-[0.3em] rounded-full whitespace-nowrap"
                        >
                          GENERATE
                        </button>
                      )}
                    </div>
                    {contactForm.formState.errors.phone && (
                      <p className="text-brand-red text-[9px] mt-3 font-bold uppercase tracking-widest">{contactForm.formState.errors.phone.message as string}</p>
                    )}
                  </div>

                  {otpSent && !otpVerified && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                      <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-muted/60 mb-6 block text-center">IDENTITY SEQUENCE REQUIRED</label>
                      <div className="flex gap-4 justify-center">
                        {otp.map((digit, i) => (
                          <input
                            key={i}
                            ref={(el) => { otpRefs.current[i] = el; }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                            className="w-12 h-16 bg-white/[0.03] border border-white/5 rounded-2xl text-center text-xl text-text-primary
                              focus:border-brand-gold focus:outline-none transition-all font-mono"
                          />
                        ))}
                      </div>
                      <p className="text-[9px] text-brand-gold text-center mt-8 font-bold uppercase tracking-[0.3em]">Protocol Reference: 123456</p>
                    </div>
                  )}

                  {otpVerified && (
                    <div className="flex items-center justify-center gap-3 text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em] animate-in zoom-in-95 duration-700">
                      <Check size={18} /> INITIALIZATION SUCCESSFUL
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Valuation Manifest */}
            {step === 2 && (
              <div className="text-center py-10">
                <div className="w-20 h-20 rounded-full border border-brand-gold/30 flex items-center justify-center mx-auto mb-10 relative">
                  <Check size={32} className="text-brand-gold" />
                  <div className="absolute inset-0 rounded-full border border-brand-gold animate-ping opacity-20" />
                </div>
                
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted mb-6">PRELIMINARY ASSESSMENT MANIFEST</p>
                
                <div ref={priceRef} className="mb-10">
                  <p className="text-6xl font-display font-black gold-text-gradient tracking-tighter">
                    ₹{estimatedPrice.toLocaleString('en-IN')}
                  </p>
                </div>
                
                <p className="text-xs text-text-muted font-mono leading-relaxed max-w-sm mx-auto mb-16 opacity-60">
                  This valuation is a preliminary market assessment. Final settlement is contingent upon institutional technical verification.
                </p>
                
                <button className="px-12 py-6 bg-brand-gold text-bg-primary font-black text-[10px] uppercase tracking-[0.4em] rounded-full
                  hover:shadow-[0_0_50px_rgba(197,160,89,0.5)] transition-all duration-700">
                  INITIALIZE FORENSIC INSPECTION
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
