'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, GitCompareArrows, Menu, X, ChevronRight } from 'lucide-react';
import { useShortlistStore } from '@/lib/store/shortlistStore';
import { useAuthStore } from '@/lib/store/authStore';

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const shortlist = useShortlistStore((s) => s.shortlist);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // eslint-disable-next-line
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Browse Cars', href: '/browse' },
    { label: 'Sell Car', href: '/sell' },
    { label: 'EMI Calculator', href: '/emi' },
    { label: 'About', href: '/about' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[9990] transition-all duration-500 ease-luxury ${
          scrolled
            ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-border-default'
            : 'bg-transparent'
        }`}
        style={{ height: 72 }}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display text-2xl font-bold text-text-primary tracking-tight">
              SPINNY
            </span>
            <span className="w-2 h-2 rounded-full bg-brand-gold group-hover:scale-125 transition-transform duration-300" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-body font-medium tracking-wide transition-colors duration-300 relative
                  ${pathname === link.href ? 'text-brand-gold' : 'text-text-muted hover:text-text-primary'}`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-brand-gold" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/compare"
              className="p-2 text-text-muted hover:text-brand-gold transition-colors duration-300"
              data-cursor
            >
              <GitCompareArrows size={20} />
            </Link>
            <Link
              href="/dashboard"
              className="relative p-2 text-text-muted hover:text-brand-gold transition-colors duration-300"
              data-cursor
            >
              <Heart size={20} />
              {mounted && shortlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-gold text-bg-primary text-[10px] font-bold flex items-center justify-center">
                  {shortlist.length}
                </span>
              )}
            </Link>
            <Link
              href={isAuthenticated ? '/dashboard' : '/login'}
              className="ml-2 px-5 py-2 bg-brand-gold text-bg-primary text-sm font-semibold rounded-card
                hover:bg-brand-gold/90 transition-all duration-300 ease-luxury"
              data-cursor
            >
              {mounted ? (isAuthenticated ? 'Dashboard' : 'Login') : 'Login'}
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 text-text-primary z-[9999]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-cursor
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <div
        className={`fixed inset-0 z-[9980] bg-bg-primary transition-all duration-500 ease-luxury lg:hidden
          ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col justify-center items-start h-full px-8 pt-20">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between w-full py-5 border-b border-border-default"
              style={{
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08 + 0.2}s`,
              }}
            >
              <span className="text-display-md text-text-primary group-hover:text-brand-gold transition-colors">
                {link.label}
              </span>
              <ChevronRight
                size={24}
                className="text-text-muted group-hover:text-brand-gold group-hover:translate-x-1 transition-all"
              />
            </Link>
          ))}
          <div className="flex gap-4 mt-8" style={{
            opacity: mobileOpen ? 1 : 0,
            transition: `opacity 0.5s ease ${0.6}s`,
          }}>
            <Link
              href="/compare"
              className="px-5 py-3 border border-border-default rounded-card text-sm text-text-muted hover:text-brand-gold hover:border-brand-gold transition-all"
            >
              Compare
            </Link>
            <Link
              href="/dashboard"
              className="px-5 py-3 border border-border-default rounded-card text-sm text-text-muted hover:text-brand-gold hover:border-brand-gold transition-all relative"
            >
              Shortlist
              {mounted && shortlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-gold text-bg-primary text-[10px] font-bold flex items-center justify-center">
                  {shortlist.length}
                </span>
              )}
            </Link>
            <Link
              href={isAuthenticated ? '/dashboard' : '/login'}
              className="px-5 py-3 bg-brand-gold text-bg-primary text-sm font-semibold rounded-card"
            >
              {mounted ? (isAuthenticated ? 'Dashboard' : 'Login') : 'Login'}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
