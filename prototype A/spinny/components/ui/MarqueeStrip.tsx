'use client';

export function MarqueeStrip() {
  const items = [
    'SPINNY ASSURED ®',
    '200-POINT INSPECTION',
    '5-DAY MONEY BACK',
    'HOME TEST DRIVE',
    '3-YEAR WARRANTY',
    'FREE RC TRANSFER',
  ];

  const content = items.map((item, i) => (
    <span key={i} className="flex items-center gap-6 px-6 whitespace-nowrap">
      <span className="text-label text-text-primary/80 tracking-[0.18em]">{item}</span>
      <span className="text-brand-gold text-[8px]">◆</span>
    </span>
  ));

  return (
    <div className="w-full overflow-hidden bg-[#111111]" style={{ height: 44 }}>
      <div className="marquee-track flex items-center h-full">
        <div className="flex items-center">{content}</div>
        <div className="flex items-center">{content}</div>
        <div className="flex items-center">{content}</div>
        <div className="flex items-center">{content}</div>
      </div>
    </div>
  );
}
