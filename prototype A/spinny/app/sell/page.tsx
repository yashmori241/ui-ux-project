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
    <div className="pt-[72px] min-h-screen bg-bg-primary">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-label text-brand-gold mb-4">SELL YOUR CAR</p>
        <h1 className="text-display-md mb-8">Get the Best Price.</h1>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 mb-12">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500
                    ${i <= step ? 'bg-brand-gold text-bg-primary' : 'bg-bg-surface border border-border-default text-text-muted'}`}
                >
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span className={`text-xs hidden sm:inline ${i <= step ? 'text-brand-gold' : 'text-text-muted'}`}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-[2px] bg-bg-surface2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-gold transition-all duration-700 ease-luxury"
                    style={{ width: i < step ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div ref={stepRef}>
          {/* Step 1: Car Details */}
          {step === 0 && (
            <form onSubmit={handleStep1} className="space-y-6">
              <div>
                <label className="text-xs text-text-muted mb-2 block">Brand</label>
                <select
                  {...carForm.register('brand')}
                  className="w-full bg-bg-surface border border-border-default rounded-card px-4 py-3 text-sm text-text-primary
                    focus:border-brand-gold focus:outline-none transition-colors"
                >
                  <option value="">Select Brand</option>
                  {brands.map((b) => (<option key={b} value={b}>{b}</option>))}
                </select>
                {carForm.formState.errors.brand && (
                  <p className="text-brand-red text-xs mt-1">{carForm.formState.errors.brand.message as string}</p>
                )}
              </div>

              <div>
                <label className="text-xs text-text-muted mb-2 block">Model</label>
                <input
                  {...carForm.register('model')}
                  placeholder="e.g. Creta SX(O)"
                  className="w-full bg-bg-surface border border-border-default rounded-card px-4 py-3 text-sm text-text-primary
                    focus:border-brand-gold focus:outline-none transition-colors placeholder:text-text-subtle"
                />
                {carForm.formState.errors.model && (
                  <p className="text-brand-red text-xs mt-1">{carForm.formState.errors.model.message as string}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-text-muted mb-2 block">Year</label>
                  <select
                    {...carForm.register('year')}
                    className="w-full bg-bg-surface border border-border-default rounded-card px-4 py-3 text-sm text-text-primary
                      focus:border-brand-gold focus:outline-none transition-colors"
                  >
                    <option value="">Year</option>
                    {Array.from({ length: 15 }, (_, i) => 2024 - i).map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-2 block">Variant</label>
                  <input
                    {...carForm.register('variant')}
                    placeholder="e.g. Diesel AT"
                    className="w-full bg-bg-surface border border-border-default rounded-card px-4 py-3 text-sm text-text-primary
                      focus:border-brand-gold focus:outline-none transition-colors placeholder:text-text-subtle"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-text-muted mb-2 block">Kilometers Driven</label>
                <input
                  {...carForm.register('mileage')}
                  placeholder="e.g. 25000"
                  className="w-full bg-bg-surface border border-border-default rounded-card px-4 py-3 text-sm text-text-primary
                    focus:border-brand-gold focus:outline-none transition-colors placeholder:text-text-subtle"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-brand-gold text-bg-primary font-semibold rounded-card
                  hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all flex items-center justify-center gap-2"
              >
                Continue <ChevronRight size={16} />
              </button>
            </form>
          )}

          {/* Step 2: Contact */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="text-xs text-text-muted mb-2 block">Your Name</label>
                <input
                  {...contactForm.register('name')}
                  placeholder="Full Name"
                  className="w-full bg-bg-surface border border-border-default rounded-card px-4 py-3 text-sm text-text-primary
                    focus:border-brand-gold focus:outline-none transition-colors placeholder:text-text-subtle"
                />
                {contactForm.formState.errors.name && (
                  <p className="text-brand-red text-xs mt-1">{contactForm.formState.errors.name.message as string}</p>
                )}
              </div>

              <div>
                <label className="text-xs text-text-muted mb-2 block">Phone Number</label>
                <div className="flex gap-3">
                  <input
                    {...contactForm.register('phone')}
                    placeholder="10-digit number"
                    maxLength={10}
                    className="flex-1 bg-bg-surface border border-border-default rounded-card px-4 py-3 text-sm text-text-primary
                      focus:border-brand-gold focus:outline-none transition-colors placeholder:text-text-subtle"
                  />
                  {!otpSent && (
                    <button
                      onClick={contactForm.handleSubmit(handleSendOtp)}
                      className="px-5 py-3 bg-brand-gold text-bg-primary text-sm font-semibold rounded-card whitespace-nowrap"
                    >
                      Send OTP
                    </button>
                  )}
                </div>
                {contactForm.formState.errors.phone && (
                  <p className="text-brand-red text-xs mt-1">{contactForm.formState.errors.phone.message as string}</p>
                )}
              </div>

              {otpSent && !otpVerified && (
                <div>
                  <label className="text-xs text-text-muted mb-3 block">Enter OTP</label>
                  <div className="flex gap-3 justify-center">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { otpRefs.current[i] = el; }}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        className="w-12 h-14 bg-bg-surface border border-border-default rounded-card text-center text-xl text-text-primary
                          focus:border-brand-gold focus:outline-none transition-colors font-display"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-text-subtle text-center mt-3">Use OTP: 123456</p>
                </div>
              )}

              {otpVerified && (
                <div className="flex items-center gap-2 text-brand-gold text-sm">
                  <Check size={16} /> OTP Verified Successfully
                </div>
              )}
            </div>
          )}

          {/* Step 3: Price */}
          {step === 2 && (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto mb-6">
                <Check size={28} className="text-brand-gold" />
              </div>
              <p className="text-text-muted text-sm mb-4">Your car&apos;s estimated value</p>
              <div ref={priceRef}>
                <p className="text-stat">
                  ₹{estimatedPrice.toLocaleString('en-IN')}
                </p>
              </div>
              <p className="text-text-muted text-sm mt-4 mb-8">
                This is a preliminary estimate. Book an inspection for an accurate valuation.
              </p>
              <button className="px-8 py-3.5 bg-brand-gold text-bg-primary font-semibold rounded-card
                hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all">
                Book Free Inspection
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
