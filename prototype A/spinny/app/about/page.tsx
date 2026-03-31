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
    <div ref={sectionRef} className="pt-[80px] min-h-screen bg-bg-primary relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-gold/[0.02] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      {/* Hero Module */}
      <div className="about-section py-32 text-center relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center gap-6 mb-12 opacity-60">
             <div className="w-12 h-[1px] bg-brand-gold/50" />
             <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">OUR FOUNDATION</p>
             <div className="w-12 h-[1px] bg-brand-gold/50" />
          </div>
          <h1 className="text-display-lg mb-10 tracking-tighter leading-[0.85]">
            Redefining the <br />
            <span className="italic font-display gold-text-gradient">Institutional Asset</span> Standard<span className="text-brand-gold">.</span>
          </h1>
          <p className="text-text-muted text-xl leading-relaxed font-body max-w-2xl mx-auto opacity-70 font-light">
            Spinny is the definitive ecosystem for certified automotive luxury. 
            Engineered for absolute transparency and institutional quality, we serve those who value precision and heritage.
          </p>
        </div>
      </div>

      {/* Metric Manifest */}
      <div className="about-section py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {[
            { val: 200000, suffix: '+', label: 'INSTITUTIONAL TRANSACTIONS' },
            { val: 20, suffix: '+', label: 'OPERATIONAL HUBS' },
            { val: 3000, suffix: '+', label: 'TECHNICAL SPECIALISTS' },
            { val: 200, suffix: '', label: 'FORENSIC EVALUATIONS' },
          ].map((s) => (
            <div key={s.label} className="glass-elite rounded-[48px] p-12 luxury-border group hover:bg-white/[0.03] transition-all duration-1000">
              <p className="text-5xl font-mono gold-text-gradient mb-6 tracking-tighter" style={{ textShadow: '0 0 30px rgba(197,160,89,0.2)' }}>
                <span className="stat-counter" data-val={s.val}>0</span>{s.suffix}
              </p>
              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-text-muted group-hover:text-brand-gold transition-colors duration-700">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Heritage Timeline */}
      <div className="about-section py-40 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6">
           <div className="text-center mb-32">
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold mb-8">THE GENESIS</p>
              <h2 className="text-display-md mb-10 tracking-tighter leading-tight">A Legacy of <span className="italic font-display text-brand-gold">Absolute Trust</span>.</h2>
           </div>
          <div className="space-y-32 relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-brand-gold/10 md:-translate-x-1/2" />
            {milestones.map((m, i) => (
              <div key={m.year} className={`about-section flex flex-col md:flex-row gap-16 items-start md:items-center relative ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-16 h-16 rounded-full glass-elite luxury-border border-brand-gold/40 flex items-center justify-center flex-shrink-0 relative z-10 md:absolute md:left-1/2 md:-translate-x-1/2 shadow-[0_0_30px_rgba(197,160,89,0.3)]">
                  <span className="text-[10px] font-mono font-bold text-brand-gold tracking-widest">{m.year}</span>
                </div>
                <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pl-24' : 'md:pr-24 md:text-right'}`}>
                  <h3 className="font-display font-black text-3xl text-text-primary mb-6 tracking-tighter">{m.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed max-w-sm ml-0 mr-auto lg:ml-auto lg:mr-0 opacity-60 font-medium">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Operational Coverage */}
      <div className="about-section py-32 relative overflow-hidden">
        <div className="absolute left-0 bottom-0 w-[600px] h-[600px] bg-brand-gold/[0.01] blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold mb-8">ASSET NETWORK</p>
          <h2 className="text-display-md mb-20 tracking-tighter">Institutional Coverage Across <span className="italic font-display">20+ Metros</span>.</h2>
          <div className="relative mx-auto mt-20" style={{ maxWidth: 460, aspectRatio: '3/4' }}>
            <svg viewBox="0 0 350 450" className="w-full h-full opacity-60">
              <path d="M160 30 L200 40 L230 60 L250 90 L260 130 L250 160 L240 150 L220 180 L200 220 L190 260 L175 300 L160 340 L150 370 L140 380 L155 390 L160 410 L140 420 L130 400 L120 370 L110 330 L100 290 L90 250 L100 210 L110 190 L130 170 L120 140 L110 120 L120 90 L130 60 L150 40 Z"
                fill="none" stroke="rgba(197,160,89,0.2)" strokeWidth="0.5" />
              {cities.map((city) => (
                <g key={city.name} className="group">
                  <circle cx={city.x} cy={city.y} r="3.5" fill="#C5A059" className="shadow-[0_0_15px_rgba(197,160,89,0.8)]" />
                  <circle cx={city.x} cy={city.y} r="3.5" fill="none" stroke="#C5A059" strokeWidth="0.5"
                    style={{ animation: 'pulse-marker 3s ease-out infinite' }} />
                  <text x={city.x + 10} y={city.y + 4} fill="currentColor" className="text-text-muted/40 font-mono group-hover:opacity-100 group-hover:text-brand-gold duration-700 ease-luxury" fontSize="8" letterSpacing="0.2em">
                    {city.name.toUpperCase()}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Asset Values Protocol */}
      <div className="about-section py-40 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold mb-12 text-center">CORE PROTOCOLS</p>
          <h2 className="text-display-md text-center mb-20 tracking-tighter">Engineered for <span className="italic font-display gold-text-gradient">Integrity</span>.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: 'ASSET TRUST', title: 'Institutional Integrity', desc: 'Complete transparency in pricing, forensic condition reports, and certified provenance.' },
              { icon: 'VERIFIED GRADE', title: 'Absolute Quality', desc: 'Every asset undergoes a rigorous 200-point physical and technical evaluation before certification.' },
              { icon: 'DIGITAL HUB', title: 'Precision Innovation', desc: 'Technology-first approach to make high-value automotive acquisitions seamless and secure.' },
            ].map((v) => (
              <div key={v.title} className="about-section glass-elite luxury-border rounded-[56px] p-12 text-center group hover:bg-white/[0.04] transition-all duration-1000">
                <div className="flex flex-col items-center mb-10">
                   <div className="w-16 h-[1px] bg-brand-gold/30 mb-8" />
                   <div className="text-[8px] font-bold uppercase tracking-[0.4em] text-brand-gold">{v.icon}</div>
                </div>
                <h3 className="font-display font-black text-3xl text-text-primary mb-6 tracking-tighter">{v.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed opacity-60 font-medium">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
