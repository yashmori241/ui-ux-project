'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.about-section').forEach((section) => {
        gsap.from(section, {
          opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 80%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.stat-counter').forEach((el) => {
        const target = parseInt(el.getAttribute('data-val') || '0');
        gsap.fromTo(el, { textContent: 0 }, {
          textContent: target, duration: 1.8, ease: 'power2.out', snap: { textContent: 1 },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const milestones = [
    { year: '2015', title: 'Founded', desc: 'Spinny was born with a mission to make used car buying trustworthy.' },
    { year: '2017', title: 'First Hub', desc: 'Launched our first Spinny Hub in Gurugram with 200 cars.' },
    { year: '2019', title: '5 Cities', desc: 'Expanded to Delhi, Mumbai, Bangalore, Hyderabad, and Pune.' },
    { year: '2021', title: 'Unicorn', desc: 'Became a unicorn with $283M Series E funding.' },
    { year: '2023', title: '20+ Cities', desc: 'Now serving over 20 cities across India with 10,000+ cars.' },
  ];

  const cities = [
    { name: 'Delhi', x: 195, y: 95 }, { name: 'Mumbai', x: 140, y: 190 },
    { name: 'Bangalore', x: 155, y: 260 }, { name: 'Hyderabad', x: 170, y: 220 },
    { name: 'Chennai', x: 175, y: 270 }, { name: 'Pune', x: 140, y: 200 },
    { name: 'Kolkata', x: 235, y: 150 }, { name: 'Jaipur', x: 165, y: 115 },
  ];

  return (
    <div ref={sectionRef} className="pt-[72px] min-h-screen bg-bg-primary">
      {/* Hero */}
      <div className="about-section py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-label text-brand-gold mb-4">ABOUT SPINNY</p>
          <h1 className="text-display-lg mb-6">Redefining How India<br />Buys Used Cars.</h1>
          <p className="text-text-muted text-lg leading-relaxed font-body">
            Spinny is India&apos;s most trusted platform for buying and selling certified used cars.
            We&apos;re on a mission to make every used car purchase as reliable and delightful as buying new.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="about-section bg-[#111111] py-20">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { val: 200000, suffix: '+', label: 'Cars Sold' },
            { val: 20, suffix: '+', label: 'Cities' },
            { val: 3000, suffix: '+', label: 'Team Members' },
            { val: 200, suffix: '', label: 'Point Inspection' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-stat">
                <span className="stat-counter" data-val={s.val}>0</span>{s.suffix}
              </p>
              <p className="text-label text-text-muted mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="about-section py-24">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-label text-brand-gold mb-4 text-center">OUR JOURNEY</p>
          <h2 className="text-display-md text-center mb-16">Milestones That Define Us.</h2>
          <div className="space-y-12 relative">
            <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-border-default" />
            {milestones.map((m) => (
              <div key={m.year} className="about-section flex gap-8 items-start relative">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center flex-shrink-0 relative z-10">
                  <span className="text-xs font-bold text-brand-gold">{m.year}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-text-primary mb-1">{m.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* India Map */}
      <div className="about-section py-24 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-label text-brand-gold mb-4">COVERAGE</p>
          <h2 className="text-display-md mb-12">Serving 20+ Cities Across India.</h2>
          <div className="relative mx-auto" style={{ maxWidth: 400, aspectRatio: '3/4' }}>
            <svg viewBox="0 0 350 450" className="w-full h-full">
              {/* Simplified India outline */}
              <path d="M160 30 L200 40 L230 60 L250 90 L260 130 L250 160 L240 150 L220 180 L200 220 L190 260 L175 300 L160 340 L150 370 L140 380 L155 390 L160 410 L140 420 L130 400 L120 370 L110 330 L100 290 L90 250 L100 210 L110 190 L130 170 L120 140 L110 120 L120 90 L130 60 L150 40 Z"
                fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5" />
              {cities.map((city) => (
                <g key={city.name}>
                  <circle cx={city.x} cy={city.y} r="4" fill="#C9A84C" />
                  <circle cx={city.x} cy={city.y} r="4" fill="none" stroke="#C9A84C" strokeWidth="1"
                    style={{ animation: 'pulse-marker 2s ease-out infinite' }} />
                  <text x={city.x + 8} y={city.y + 4} fill="#888880" fontSize="8" fontFamily="var(--font-body)">
                    {city.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="about-section py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-label text-brand-gold mb-4 text-center">OUR VALUES</p>
          <h2 className="text-display-md text-center mb-12">What We Stand For.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Trust', desc: 'Complete transparency in pricing, condition reports, and ownership history.' },
              { icon: '✨', title: 'Quality', desc: 'Every car undergoes a rigorous 200-point inspection before listing.' },
              { icon: '💡', title: 'Innovation', desc: 'Technology-first approach to make car buying seamless and delightful.' },
            ].map((v) => (
              <div key={v.title} className="about-section bg-bg-surface border border-border-default rounded-card p-8 text-center card-hover">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-display font-bold text-xl text-text-primary mb-3">{v.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
