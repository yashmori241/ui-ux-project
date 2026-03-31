import { Globe } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const columns = [
    {
      title: 'FOUNDATION',
      links: [
        { label: 'Asset Heritage', href: '/about' },
        { label: 'Executive Careers', href: '#' },
        { label: 'Media Repository', href: '#' },
        { label: 'Institutional Blog', href: '#' },
      ],
    },
    {
      title: 'ACQUISITION',
      links: [
        { label: 'Discover Portfolio', href: '/browse' },
        { label: 'Operational Protocol', href: '#' },
        { label: 'Fiscal Calculator', href: '/emi' },
        { label: 'Metric Comparison', href: '/compare' },
      ],
    },
    {
      title: 'LIQUIDATION',
      links: [
        { label: 'Initialize Sale', href: '/sell' },
        { label: 'Value Assessment', href: '/sell' },
        { label: 'Institutional Trust', href: '#' },
        { label: 'Succession RC', href: '#' },
      ],
    },
    {
      title: 'PROTOCOL',
      links: [
        { label: 'Administrative Hub', href: '#' },
        { label: 'Contact Executive', href: '#' },
        { label: 'Technical FAQ', href: '#' },
        { label: 'Security Policy', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-bg-primary luxury-border border-t-0 p-[1px] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-gold/[0.02] blur-[120px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 py-24">
        {/* Top */}
        <div className="flex flex-col lg:flex-row justify-between gap-20 mb-20">
          {/* Brand Module */}
          <div className="max-w-md">
            <div className="flex items-center gap-5 mb-10 group">
              <div className="w-11 h-11 rounded-full border border-brand-gold/30 flex items-center justify-center group-hover:border-brand-gold transition-all duration-[1500ms] bg-brand-gold/5 relative">
                <div className="w-2 h-2 rounded-full bg-brand-gold shadow-[0_0_20px_rgba(197,160,89,0.9)]" />
                <div className="absolute inset-0 rounded-full border border-brand-gold/40 animate-pulse opacity-20" />
              </div>
              <span className="font-display text-2xl font-black text-text-primary tracking-[0.4em] group-hover:text-brand-gold transition-colors duration-700">
                SPINNY
              </span>
            </div>
            <p className="text-text-muted text-xs leading-relaxed mb-12 opacity-60 font-body tracking-wide font-light max-w-sm">
              The definitive ecosystem for institutional automotive acquisition and liquidation. 
              Certified provenance through forensic technical evaluation.
            </p>
            <div className="flex gap-4">
              {[
                { name: 'X' },
                { name: 'Instagram' },
                { name: 'LinkedIn' },
                { name: 'YouTube' }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-12 h-12 rounded-full glass-elite luxury-border flex items-center justify-center
                    text-[9px] font-bold uppercase tracking-widest text-text-muted hover:text-brand-gold transition-all duration-700"
                  data-cursor
                >
                  <Globe size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Directory Columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold mb-10 opacity-80">{col.title}</h4>
                <ul className="space-y-6">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[9px] font-semibold uppercase tracking-[0.3em] text-text-muted hover:text-white transition-all duration-500 hover:translate-x-1 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Base */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 font-mono text-[9px] uppercase tracking-[0.3em]">
          <p className="text-text-subtle opacity-40" suppressHydrationWarning>
            © {new Date().getFullYear()} INSTITUTIONAL ASSETS. MANAGED BY SPINNY HOLDINGS.
          </p>
          <div className="flex flex-wrap justify-center gap-10">
            {['Privacy Protocol', 'Terms of Acquisition', 'Telemetric Cookies'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-text-subtle opacity-40 hover:opacity-100 hover:text-brand-gold transition-all"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
