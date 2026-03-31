'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Search, CheckCircle, Home, Key } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { MarqueeStrip } from '@/components/ui/MarqueeStrip';
import { CarCard } from '@/components/ui/CarCard';
import { cars } from '@/lib/data/cars';

// Removed top-level ScrollTrigger registration for SSR safety

/* ===================== HERO SECTION ===================== */
/* ===================== HERO SECTION ===================== */
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let ctx: gsap.Context;
    try {
      gsap.registerPlugin(ScrollTrigger);
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      ctx = gsap.context(() => {
        // Parallax on hero image
        if (imgRef.current) {
          gsap.to(imgRef.current, {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }

        // Content stagger entrance
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('.hero-label', { opacity: 1, y: 20, duration: 0.6, delay: 0.3 })
          .from('.hero-line-1', { opacity: 1, y: 60, duration: 0.8 }, 0.7)
          .from('.hero-line-2', { opacity: 1, y: 60, duration: 0.8 }, 0.9)
          .from('.hero-sub', { opacity: 1, y: 20, duration: 0.6 }, 1.1)
          .from('.hero-ctas', { opacity: 1, y: 20, duration: 0.6 }, 1.3);

        // Scroll indicator fade
        if (scrollIndicatorRef.current) {
          gsap.to(scrollIndicatorRef.current, {
            opacity: 0,
            scrollTrigger: {
              trigger: heroRef.current,
              start: '80px top',
              end: '160px top',
              scrub: true,
            },
          });
        }
      }, heroRef);

      return () => ctx.revert();
    } catch (e) {
      console.warn('Hero GSAP failed:', e);
    }
  }, []);

  return (
    <section ref={heroRef} className="relative w-full overflow-hidden" style={{ height: '100svh' }}>
      {/* Background Image */}
      <div ref={imgRef} className="absolute inset-0 w-full h-[140%] -top-[20%] overflow-hidden" suppressHydrationWarning>
        <Image
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80"
          alt="Premium dark car on dramatic background"
          fill
          priority
          sizes="100vw"
          className="object-cover animate-ken-burns"
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(5,5,5,0.98) 0%, rgba(5,5,5,0.7) 45%, rgba(5,5,5,0.2) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 w-full">
          <div className="max-w-[850px]">
            <div className="hero-label flex items-center gap-4 mb-8 opacity-60">
               <div className="w-12 h-[1px] bg-brand-gold/50" />
               <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">PORTFOLIO REDEFINED</p>
            </div>
            
            <h1 className="hero-title relative mb-14">
              <span className="hero-line-1 text-display-xl block tracking-[-0.06em] leading-[0.85] text-text-primary" style={{ textShadow: '0 20px 80px rgba(0,0,0,0.9)' }}>
                Find Your
              </span>
              <span className="hero-line-2 text-display-xl block tracking-[-0.04em] leading-[0.85] italic font-display gold-text-gradient py-4" style={{ textShadow: '0 20px 100px rgba(197,160,89,0.4)' }}>
                Luxury Heritage
              </span>
              <span className="hero-line-3 text-display-xl block tracking-[-0.06em] leading-[0.85] text-text-primary" style={{ textShadow: '0 20px 80px rgba(0,0,0,0.9)' }}>
                Portfolio<span className="text-brand-gold">.</span>
              </span>
            </h1>

            <p className="hero-sub text-lg text-text-muted mt-12 font-body max-w-[580px] tracking-wide leading-relaxed opacity-70">
              Curating India&apos;s most prestigious pre-owned automotive assets. 
              Each vehicle is a testament to engineering excellence and certified provenance.
            </p>

            <div className="hero-ctas flex gap-8 mt-16 flex-wrap items-center">
              <Link href="/browse">
                <MagneticButton variant="gold" className="px-12 h-16 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full">
                  ACCESS COLLECTION
                </MagneticButton>
              </Link>
              <Link href="/sell">
                <MagneticButton variant="ghost" className="px-12 h-16 text-[10px] font-bold uppercase tracking-[0.3em] border-white/10 hover:border-brand-gold/40 rounded-full">
                  INITIALIZE ACQUISITION
                </MagneticButton>
              </Link>
            </div>
            
            {/* Floating Asset Terminal */}
            <div className="hidden xl:flex absolute top-1/2 right-[5%] -translate-y-1/2 glass-elite p-12 flex-col gap-10 luxury-border rounded-[48px] w-[340px] animate-in fade-in duration-1000 delay-700 z-20 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
               <div className="flex items-center justify-between">
                 <div className="w-14 h-14 rounded-full border border-brand-gold/20 flex items-center justify-center relative">
                   <div className="w-2 h-2 rounded-full bg-brand-gold shadow-[0_0_20px_rgba(197,160,89,0.8)]" />
                   <div className="absolute inset-0 rounded-full border border-brand-gold/40 animate-ping opacity-20" />
                 </div>
                 <span className="text-[9px] font-mono text-brand-gold/60 uppercase tracking-widest">LIVE DATA FEED</span>
               </div>
               
               <div>
                 <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold/60 mb-2">AVAILABLE ASSETS</p>
                 <p className="text-5xl font-display font-black text-white tracking-tighter">750<span className="text-brand-gold font-light opacity-50">+</span></p>
                 <p className="text-xs text-text-muted mt-4 font-mono leading-relaxed opacity-60">Verified portfolios under institutional management.</p>
               </div>

               <div className="pt-8 border-t border-white/5 space-y-4">
                 <div className="flex justify-between items-center text-[10px] font-mono tracking-widest">
                   <span className="text-text-subtle">PROVENANCE</span>
                   <span className="text-brand-gold">CERTIFIED</span>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-mono tracking-widest">
                   <span className="text-text-subtle">ACQUISITION</span>
                   <span className="text-brand-gold">IMMEDIATE</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-text-muted tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown size={18} className="text-text-muted" style={{ animation: 'bounce-scroll 2s ease-in-out infinite' }} />
      </div>
    </section>
  );
}

/* ===================== TRUST NUMBERS ===================== */
function TrustNumbers() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const counters = sectionRef.current?.querySelectorAll('.stat-number');
      counters?.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0', 10);
        gsap.fromTo(
          counter,
          { textContent: 0 },
          {
            textContent: target,
            duration: 1.8,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: counter,
              start: 'top 80%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: 200000, suffix: '+', label: 'Authorized Acquisitions', display: '2,00,000' },
    { number: 10000, suffix: '+', label: 'Portfolio Assets', display: '10,000' },
    { number: 200, suffix: '', label: 'Technical Verifications', display: '200' },
    { number: 20, suffix: '+', label: 'Operational Hubs', display: '20' },
  ];

  return (
    <section ref={sectionRef} className="bg-bg-primary py-40 overflow-hidden border-y border-white/5 relative">
      <div className="absolute inset-0 bg-brand-gold/[0.02] pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-elite rounded-[48px] p-12 text-center relative overflow-hidden group hover:luxury-border transition-all duration-1000 ease-luxury shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
            >
              <div className="text-stat gold-text-gradient font-display font-black tracking-tighter mb-6">
                <span className="stat-number" data-target={stat.number}>
                  0
                </span>
                <span className="text-3xl opacity-50 ml-1">{stat.suffix}</span>
              </div>
              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-text-muted group-hover:text-brand-gold transition-colors duration-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const howItWorksSteps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'Access a curated portfolio of certified automotive assets, rigorously vetted for institutional standards.',
    icon: <Search className="w-8 h-8 text-brand-gold/60" />,
  },
  {
    num: '02',
    title: 'Verification',
    desc: 'Every asset undergoes a 200-point forensic technical verification to ensure flawless heritage.',
    icon: <CheckCircle className="w-8 h-8 text-brand-gold/60" />,
  },
  {
    num: '03',
    title: 'Assessment',
    desc: 'Experience dynamic dynamic assessments at your preferred location, engineered for absolute transparency.',
    icon: <Home className="w-8 h-8 text-brand-gold/60" />,
  },
  {
    num: '04',
    title: 'Succession',
    desc: 'Seamless ownership transition with institutional-grade handling of paperwork and RC protocols.',
    icon: <Key className="w-8 h-8 text-brand-gold/60" />,
  },
];

/* ===================== HOW IT WORKS (SCROLLJACK) ===================== */
function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width: 769px)': function () {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: '.how-it-works',
              start: 'top top',
              end: '+=300%', // Tightened to remove black space
              pin: '.how-it-works-inner',
              scrub: 1,
              anticipatePin: 1,
            },
          });

          howItWorksSteps.forEach((_, i) => {
            if (i < howItWorksSteps.length - 1) {
              tl.to(
                `#step-${i}`,
                { opacity: 0, yPercent: -15, scale: 0.95, duration: 0.3, ease: 'power2.inOut' },
                i * 0.25 + 0.2
              );
              tl.from(
                `#step-${i + 1}`,
                { opacity: 0, yPercent: 15, scale: 1.05, duration: 0.3, ease: 'power2.out' },
                i * 0.25 + 0.25
              );
            }
          });

          // Dynamic Background Glow
          gsap.to('.how-it-works-glow', {
            x: (i) => i * 100, // Moves across steps
            scrollTrigger: {
              trigger: '.how-it-works',
              start: 'top top',
              end: '+=300%',
              scrub: 2,
            }
          });
        },
        '(max-width: 768px)': function () {
          // Mobile: simple scroll reveals
          howItWorksSteps.forEach((_, i) => {
            gsap.from(`#step-${i}`, {
              opacity: 0,
              y: 40,
              duration: 0.6,
              scrollTrigger: {
                trigger: `#step-${i}`,
                start: 'top 85%',
                once: true,
              },
            });
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* Desktop: scrolljack */}
      <div className="how-it-works hidden md:block" style={{ height: '400vh' }}>
        <div
          className="how-it-works-inner bg-bg-primary flex items-center relative overflow-hidden"
          style={{ height: '100vh' }}
        >
          {/* Dynamic Background Glow */}
          <div className="how-it-works-glow absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-[1px] bg-brand-gold/30" />
               <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">THE CONCIERGE JOURNEY</p>
            </div>
            <h2 className="text-display-lg mb-20 tracking-tighter">
              A Refined Path to<br />Institutional Quality<span className="text-brand-gold">.</span>
            </h2>
            <div className="relative" style={{ minHeight: 300 }}>
              {howItWorksSteps.map((step, i) => (
                <div
                  key={step.num}
                  id={`step-${i}`}
                  className="absolute inset-0 flex items-start gap-16"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <div className="flex-1 max-w-lg">
                    <span className="text-display-xl gold-text-gradient block mb-4">
                      {step.num}
                    </span>
                    <h3 className="text-display-md text-text-primary mb-4">
                      {step.title}
                    </h3>
                    <p className="text-text-muted text-lg leading-relaxed font-body">
                      {step.desc}
                    </p>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-64 h-64 rounded-full bg-bg-surface border border-border-default flex items-center justify-center glass shadow-2xl">
                      {step.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div className="md:hidden py-20 bg-bg-primary">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-label text-brand-gold mb-4">HOW IT WORKS</p>
          <h2 className="text-display-lg mb-12">
            Four Simple Steps.
          </h2>
          <div className="space-y-6">
            {howItWorksSteps.map((step, i) => (
              <div
                key={step.num}
                id={`step-${i}`}
                className="bg-bg-surface border border-border-default rounded-card p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl font-display font-bold gold-text-gradient">
                    {step.num}
                  </span>
                  <div className="w-16 h-16 rounded-full bg-bg-surface2 flex items-center justify-center glass shadow-lg">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== FEATURED CARS (DRAGGABLE CAROUSEL) ===================== */
function FeaturedCars() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const lastVelocity = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    isDragging.current = true;
    startX.current = e.pageX - track.offsetLeft;
    scrollLeft.current = track.scrollLeft;
    track.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const track = trackRef.current;
    if (!track) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = x - startX.current;
    track.scrollLeft = scrollLeft.current - walk;
    lastVelocity.current = walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    const track = trackRef.current;
    if (!track) return;
    track.style.cursor = 'grab';
    // Momentum
    gsap.to(track, {
      scrollLeft: track.scrollLeft - lastVelocity.current * 8,
      duration: 0.8,
      ease: 'power2.out',
    });
  };

  const featuredCars = cars.filter((c) => c.trending).slice(0, 6);
  // If not enough trending, fill with others
  const displayCars =
    featuredCars.length >= 6
      ? featuredCars
      : [...featuredCars, ...cars.filter((c) => !c.trending)].slice(0, 6);

  return (
    <section className="py-32 bg-bg-primary border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
      
      <div className="max-w-[1400px] mx-auto px-6 mb-16">
        <div className="flex items-center gap-4 mb-8 opacity-60">
           <div className="w-12 h-[1px] bg-brand-gold/50" />
           <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">ACQUISITION PORTFOLIO</p>
        </div>
        <div className="flex items-end justify-between gap-12">
          <h2 className="text-display-lg tracking-tighter leading-[0.9]">
            Selected <br />
            <span className="italic font-display gold-text-gradient">Heritage Assets</span><span className="text-brand-gold">.</span>
          </h2>
          <Link
            href="/browse"
            className="hidden md:inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold hover:text-white transition-all group"
          >
            DISCOVER ENTIRE REPOSITORY
            <div className="w-8 h-[1px] bg-brand-gold/30 group-hover:w-12 group-hover:bg-white transition-all" />
          </Link>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        <div
          ref={trackRef}
          data-cursor="drag"
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 select-none"
          style={{ cursor: 'grab', scrollbarWidth: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {displayCars.map((car) => (
            <div key={car.id} className="min-w-[320px] max-w-[320px] flex-shrink-0">
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden text-center mt-8">
        <Link
          href="/browse"
          className="text-sm text-brand-gold hover:underline font-body"
        >
          View All Cars →
        </Link>
      </div>
    </section>
  );
}

/* ===================== SPINNY ASSURED ===================== */
function SpinnyAssured() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from('.assured-feature', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: '🛡️', title: '200-Point Inspection', desc: 'Rigorous quality checks covering engine, body, electricals, and more.' },
    { icon: '↩️', title: '5-Day Money Back', desc: "Not satisfied? Return the car within 5 days. No questions asked." },
    { icon: '📋', title: 'Free RC Transfer', desc: 'We handle all the paperwork. Hassle-free ownership transfer.' },
    { icon: '🏠', title: 'Home Test Drive', desc: 'Experience the car at your doorstep before making a decision.' },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-32 relative overflow-hidden border-y border-white/5"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-24">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold mb-6">THE GOLD STANDARD</p>
            <h2 className="text-display-lg mb-8 tracking-tighter">Uncompromising Quality.</h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto font-body leading-relaxed opacity-80">
              Every vehicle in our collection undergoes a rigorous 200-point mechanical 
              and physical evaluation to meet our institutional standards.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="assured-feature glass rounded-[40px] p-10 text-left luxury-border-transparent hover:luxury-border transition-all duration-700 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500">
                {f.icon}
              </div>
              <h3 className="text-xl font-display font-black text-text-primary mb-4 tracking-tight">{f.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== TESTIMONIALS ===================== */
function Testimonials() {
  const testimonials = [
    {
      name: 'Rahul Sharma',
      car: 'Hyundai Creta 2023',
      quote: "The entire experience was seamless. From browsing to getting the car delivered at my doorstep — Spinny made it feel effortless. Can't recommend enough!",
      rating: 5,
      city: 'Delhi',
    },
    {
      name: 'Priya Menon',
      car: 'Tata Nexon EV 2023',
      quote: "I was skeptical about buying a used EV, but the 200-point inspection report gave me complete confidence. The car was in pristine condition!",
      rating: 5,
      city: 'Bangalore',
    },
    {
      name: 'Aditya Patel',
      car: 'BMW 320d 2021',
      quote: 'Found a luxury car at an incredible price. The transparency in pricing and condition report was unlike anything I had seen before. Spinny is the real deal.',
      rating: 5,
      city: 'Mumbai',
    },
  ];

  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-[1400px] mx-auto px-6">
        <p className="text-label text-brand-gold mb-4">TESTIMONIALS</p>
        <h2 className="text-display-md mb-12">What Our Customers Say.</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-bg-surface border border-border-default rounded-card p-8 card-hover"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-brand-gold text-sm">★</span>
                ))}
              </div>
              <p className="text-text-primary text-sm leading-relaxed mb-6 font-body italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-display font-bold text-text-primary">{t.name}</p>
                <p className="text-text-muted text-xs mt-1">
                  Bought {t.car} · {t.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== BRAND GRID ===================== */
function BrandGrid() {
  const brands = [
    'Maruti Suzuki', 'Hyundai', 'Tata', 'Honda', 'Toyota',
    'Mahindra', 'Ford', 'Kia', 'Volkswagen', 'Skoda',
    'Renault', 'BMW', 'Audi', 'Jeep', 'MG',
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
  };

  return (
    <section className="py-24 bg-[#0D0D0D]">
      <div className="max-w-[1400px] mx-auto px-6">
        <p className="text-label text-brand-gold mb-4 text-center">POPULAR BRANDS</p>
        <h2 className="text-display-md text-center mb-12">Explore by Brand.</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {brands.map((brand) => (
            <Link href={`/browse?brand=${encodeURIComponent(brand)}`} key={brand}>
              <div
                className="glass rounded-2xl p-8 text-center transition-all duration-500 ease-luxury hover:border-brand-gold/40 cursor-pointer card-hover"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transition: 'transform 0.1s ease-out, border-color 0.3s ease' }}
                data-cursor
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-bg-surface2/50 flex items-center justify-center border border-white/5 shadow-inner">
                  <span className="text-xl font-display font-black gold-text-gradient">
                    {brand[0]}
                  </span>
                </div>
                <span className="text-sm font-body font-semibold tracking-wide text-text-muted hover:text-brand-gold transition-colors">{brand}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== CTA SECTION ===================== */
function CTASection() {
  return (
    <section className="py-40 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-bg-primary" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-gold/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 text-center relative z-10">
        <div className="glass p-16 rounded-[40px] border-white/5 inline-block w-full max-w-5xl">
          <p className="text-label text-brand-gold mb-6 tracking-[0.2em]">GET STARTED</p>
          <h2 className="text-display-lg mb-6 leading-tight">Ready to Find Your<br />Perfect Car?</h2>
          <p className="text-text-muted text-xl mb-12 max-w-2xl mx-auto font-body leading-relaxed">
            Join 2,00,000+ happy customers who found their dream car on Spinny. <br className="hidden md:block" />
            Experience a new standard of trust and quality.
          </p>
          <div className="flex gap-8 justify-center flex-wrap items-center mt-4">
            <Link href="/browse">
              <MagneticButton variant="gold" className="px-12 py-6 text-xl shadow-[0_0_50px_rgba(201,168,76,0.3)]">
                Browse 10,000+ Cars →
              </MagneticButton>
            </Link>
            <Link href="/sell">
              <MagneticButton variant="outline" className="px-12 py-6 text-xl border-white/20">
                Sell Your Car
              </MagneticButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== HOME PAGE ===================== */
export default function HomePage() {
  useEffect(() => {
    // Global Reveal Observer for "Luxury" Entrance
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, []);

  return (
    <main className="bg-bg-primary">
      <HeroSection />
      <div className="reveal">
        <MarqueeStrip />
      </div>
      <div className="reveal">
        <TrustNumbers />
      </div>
      <HowItWorks />
      <div className="reveal">
        <FeaturedCars />
      </div>
      <div className="reveal">
        <SpinnyAssured />
      </div>
      <div className="reveal">
        <Testimonials />
      </div>
      <div className="reveal">
        <BrandGrid />
      </div>
      <div className="reveal">
        <CTASection />
      </div>
    </main>
  );
}
