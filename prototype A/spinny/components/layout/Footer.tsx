import Link from 'next/link';

export function Footer() {
  const columns = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
        { label: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Buy Car',
      links: [
        { label: 'Browse Cars', href: '/browse' },
        { label: 'How It Works', href: '#' },
        { label: 'EMI Calculator', href: '/emi' },
        { label: 'Compare Cars', href: '/compare' },
      ],
    },
    {
      title: 'Sell Car',
      links: [
        { label: 'Sell Your Car', href: '/sell' },
        { label: 'Get Valuation', href: '/sell' },
        { label: 'Why Sell to Spinny', href: '#' },
        { label: 'RC Transfer', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'Contact Us', href: '#' },
        { label: 'FAQs', href: '#' },
        { label: 'Warranty Policy', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-bg-primary border-t border-brand-gold/20">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        {/* Top */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display text-2xl font-bold text-text-primary tracking-tight">
                SPINNY
              </span>
              <span className="w-2 h-2 rounded-full bg-brand-gold" />
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              India&apos;s most trusted platform to buy and sell certified used cars.
              Every car comes with a 200-point inspection, 5-day money back guarantee,
              and free RC transfer.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-bg-surface border border-border-default flex items-center justify-center
                    text-text-muted text-xs hover:border-brand-gold hover:text-brand-gold transition-all duration-300"
                  data-cursor
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-label text-brand-gold mb-4">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-muted hover:text-text-primary transition-colors duration-300"
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

        {/* Bottom */}
        <div className="pt-8 border-t border-border-default flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-subtle text-xs">
            © {new Date().getFullYear()} Spinny. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-text-subtle text-xs hover:text-text-muted transition-colors duration-300"
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
