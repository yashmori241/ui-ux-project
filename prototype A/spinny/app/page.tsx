'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
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
      <div ref={imgRef} className="absolute inset-0 w-full h-[130%] -top-[15%]">
        <Image
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80"
          alt="Premium dark car on dramatic background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.6) 55%, rgba(10,10,10,0.15) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 w-full">
          <div className="max-w-[680px]">
            <p className="hero-label text-label text-brand-gold mb-6">
              INDIA&apos;S MOST TRUSTED USED CAR PLATFORM
            </p>
            <h1 className="hero-title relative">
              <span className="hero-line-1 text-display-xl block tracking-[-0.03em] leading-[0.95]" style={{ textShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>Find Your</span>
              <span className="hero-line-2 text-display-xl block tracking-[-0.03em] leading-[0.95]" style={{ textShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>Perfect Car.</span>
            </h1>
            <p className="hero-sub text-lg text-text-muted mt-8 font-body max-w-[480px]" style={{ fontWeight: 300, lineHeight: 1.6 }}>
              India&apos;s most trusted certified used car platform. <br className="hidden md:block" />
              Guaranteed Quality · Delivered to Your Door.
            </p>
            <div className="hero-ctas flex gap-4 mt-10 flex-wrap">
              <Link href="/browse">
                <MagneticButton variant="gold">
                  Browse Cars
                  <span className="ml-1">→</span>
                </MagneticButton>
              </Link>
              <Link href="/sell">
                <MagneticButton variant="ghost">Sell Your Car</MagneticButton>
              </Link>
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
    { number: 200000, suffix: '+', label: 'Happy Customers', display: '2,00,000' },
    { number: 10000, suffix: '+', label: 'Cars Available', display: '10,000' },
    { number: 200, suffix: '', label: 'Quality Checks', display: '200' },
    { number: 20, suffix: '+', label: 'Cities', display: '20' },
  ];

  return (
    <section ref={sectionRef} className="bg-bg-primary py-32">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-gold rounded-3xl p-10 text-center glow-accent"
            >
              <div className="text-stat gold-text-gradient font-black">
                <span className="stat-number" data-target={stat.number}>
                  0
                </span>
                <span>{stat.suffix}</span>
              </div>
              <p className="text-label text-text-muted mt-4 font-bold tracking-widest leading-loose">{stat.label}</p>
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
    title: 'Browse',
    desc: '10,000+ certified cars at your fingertips. Filter by brand, budget, body type, and more.',
    icon: '🔍',
  },
  {
    num: '02',
    title: 'Inspect',
    desc: 'Every car verified with a 200-point quality check. No hidden damages, no surprises.',
    icon: '✓',
  },
  {
    num: '03',
    title: 'Test Drive',
    desc: 'We bring the car to you. Test drive at your doorstep, no pressure.',
    icon: '🏠',
  },
  {
    num: '04',
    title: 'Own It',
    desc: 'Seamless paperwork. RC transfer handled. Delivered to your door with a 5-day money-back guarantee.',
    icon: '🔑',
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
              end: '+=400%',
              pin: '.how-it-works-inner',
              scrub: 0.8,
              anticipatePin: 1,
            },
          });

          howItWorksSteps.forEach((_, i) => {
            if (i < howItWorksSteps.length - 1) {
              tl.to(
                `#step-${i}`,
                { opacity: 0, yPercent: -20, duration: 0.3 },
                i * 0.25 + 0.2
              );
              tl.from(
                `#step-${i + 1}`,
                { opacity: 0, yPercent: 20, duration: 0.3 },
                i * 0.25 + 0.25
              );
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
      <div className="how-it-works hidden md:block" style={{ height: '500vh' }}>
        <div
          className="how-it-works-inner bg-bg-primary flex items-center"
          style={{ height: '100vh' }}
        >
          <div className="max-w-[1400px] mx-auto px-6 w-full">
            <p className="text-label text-brand-gold mb-4">HOW IT WORKS</p>
            <h2 className="text-display-lg mb-16">
              Four Simple Steps to<br />Your Dream Car.
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
                    <div className="w-64 h-64 rounded-full bg-bg-surface border border-border-default flex items-center justify-center">
                      <span className="text-7xl">{step.icon}</span>
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
                  <div className="w-12 h-12 rounded-full bg-bg-surface2 flex items-center justify-center text-2xl">
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
    <section className="py-24 bg-bg-primary">
      <div className="max-w-[1400px] mx-auto px-6 mb-12">
        <p className="text-label text-brand-gold mb-4">FEATURED</p>
        <div className="flex items-end justify-between">
          <h2 className="text-display-md">Handpicked for You.</h2>
          <Link
            href="/browse"
            className="hidden md:inline-flex text-sm text-brand-gold hover:underline font-body"
          >
            View All Cars →
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
      className="py-24 relative overflow-hidden"
      style={{
        background:
          '#0D0D0D radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 60%)',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 text-center">
        {/* Badge */}
        <div className="mx-auto mb-12 relative w-48 h-48">
          <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow">
            <defs>
              <path
                id="circle-text"
                d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              />
            </defs>
            <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="1" />
            <text className="text-[11px] fill-brand-gold tracking-[0.3em] uppercase">
              <textPath href="#circle-text">
                SPINNY ASSURED ® · SPINNY ASSURED ® · SPINNY ASSURED ® ·{' '}
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">✓</span>
          </div>
        </div>

        <h2 className="text-display-md mb-4">The Spinny Promise</h2>
        <p className="text-text-muted text-lg mb-16 max-w-xl mx-auto font-body">
          Every car on Spinny comes with guarantees that give you complete peace of mind.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="assured-feature bg-bg-surface border border-border-default rounded-card p-6 text-center"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-display font-bold text-text-primary mb-2">{f.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{f.desc}</p>
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
          <div className="flex gap-6 justify-center flex-wrap">
            <Link href="/browse">
              <MagneticButton variant="gold" className="px-10 py-5 text-lg">
                Browse 10,000+ Cars →
              </MagneticButton>
            </Link>
            <Link href="/sell">
              <MagneticButton variant="outline" className="px-10 py-5 text-lg">
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
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <TrustNumbers />
      <HowItWorks />
      <FeaturedCars />
      <SpinnyAssured />
      <Testimonials />
      <BrandGrid />
      <CTASection />
    </>
  );
}
