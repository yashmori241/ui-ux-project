'use client';

import { useState } from 'react';
import { calculateEMI, getTotalInterest, getTotalPayment, generateAmortization } from '@/lib/utils/emi';
import { formatPrice } from '@/lib/utils/formatters';
import { ChevronDown } from 'lucide-react';

export default function EMIPage() {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(9.5);
  const [tenure, setTenure] = useState(60);
  const [showTable, setShowTable] = useState(false);

  const emi = calculateEMI(principal, rate, tenure);
  const totalInterest = getTotalInterest(principal, rate, tenure);
  const totalPayment = getTotalPayment(principal, rate, tenure);
  const interestPercent = Math.round((totalInterest / totalPayment) * 100);
  const schedule = generateAmortization(principal, rate, tenure);

  return (
    <div className="pt-[80px] min-h-screen bg-bg-primary relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-gold/[0.02] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 py-20 flex flex-col lg:flex-row gap-20 items-start">
        {/* Left: Editorial Header */}
        <div className="lg:w-1/2 lg:sticky lg:top-[120px]">
           <div className="flex items-center gap-6 mb-10 opacity-60">
             <div className="w-12 h-[1px] bg-brand-gold/50" />
             <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold">FISCAL ARCHITECTURE</p>
             <div className="w-12 h-[1px] bg-brand-gold/50" />
           </div>
           <h1 className="text-display-lg mb-10 tracking-tighter leading-[0.85]">
             Precision Loan<br />
             <span className="italic font-display gold-text-gradient">Optimization</span> Matrix<span className="text-brand-gold">.</span>
           </h1>
           <p className="text-text-muted text-xl leading-relaxed font-body max-w-lg opacity-70 font-light">
             Calculate your monthly commitments with clinical precision. 
             Engineered to provide complete transparency into your institutional financial roadmap.
           </p>
           
           <div className="mt-16 p-10 glass-elite luxury-border rounded-[48px] inline-flex items-center gap-8 group hover:bg-white/[0.02] transition-all duration-1000">
              <div className="w-16 h-16 rounded-full glass-elite border border-brand-gold/20 flex items-center justify-center group-hover:border-brand-gold/40 transition-colors duration-700 shadow-[0_0_30px_rgba(197,160,89,0.1)]">
                 <span className="text-2xl grayscale group-hover:grayscale-0 transition-all duration-700">📈</span>
              </div>
              <div>
                 <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold/60 mb-2">CURRENT MARKET INDEX</p>
                 <p className="text-base font-bold text-text-primary">Institutional Baseline: <span className="text-brand-gold">9.5% APR</span></p>
              </div>
           </div>
        </div>

        {/* Right: Calculator Module */}
        <div className="lg:w-1/2 w-full glass-elite p-12 lg:p-16 luxury-border rounded-[56px] relative overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-right-12 duration-1000">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/[0.03] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          <div className="grid grid-cols-1 gap-16 relative z-10">
            {/* Precision Controls */}
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted/60">CAPITAL ALLOCATION</label>
                  <span className="text-2xl font-mono text-brand-gold tracking-tighter">{formatPrice(principal)}</span>
                </div>
                <input type="range" min={100000} max={5000000} step={50000} value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))} 
                  className="w-full h-[1px] bg-white/10 appearance-none rounded-full accent-brand-gold cursor-pointer" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted/60">APR PERCENTAGE</label>
                    <span className="text-lg font-mono text-text-primary">{rate}%</span>
                  </div>
                  <input type="range" min={6} max={18} step={0.5} value={rate}
                    onChange={(e) => setRate(Number(e.target.value))} 
                    className="w-full h-[1px] bg-white/10 appearance-none rounded-full accent-brand-gold cursor-pointer" />
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted/60">DURATION (MONTHS)</label>
                    <span className="text-lg font-mono text-text-primary">{tenure}</span>
                  </div>
                  <input type="range" min={12} max={84} step={6} value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))} 
                    className="w-full h-[1px] bg-white/10 appearance-none rounded-full accent-brand-gold cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Results Manifest */}
            <div className="flex flex-col md:flex-row gap-16 pt-16 border-t border-white/5 mt-8 items-center">
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted/40 mb-4">MONTHLY FISCAL OUTLAY</p>
                <p className="text-6xl font-display font-black gold-text-gradient tracking-tighter" style={{ textShadow: '0 0 50px rgba(197,160,89,0.3)' }}>
                  ₹{emi.toLocaleString('en-IN')}
                </p>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <path d={`M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831`}
                      fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="2" />
                    <path d={`M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831`}
                      fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round"
                      className="transition-all duration-[2000ms] ease-luxury"
                      strokeDasharray={`${100 - interestPercent}, 100`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-[10px] font-mono font-bold text-brand-gold">{100 - interestPercent}%</span>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
                    <div><p className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-muted/40">INTEREST TOTAL</p><p className="text-sm font-mono text-text-primary tracking-tight">{formatPrice(totalInterest)}</p></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <div><p className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-muted/40">TOTAL PAYABLE</p><p className="text-sm font-mono text-text-primary tracking-tight">{formatPrice(totalPayment)}</p></div>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full py-6 bg-brand-gold text-bg-primary font-black text-[11px] uppercase tracking-[0.5em] rounded-full hover:shadow-[0_0_50px_rgba(197,160,89,0.4)] transition-all duration-700">
               INITIALIZE FUNDING PROTOCOL
            </button>
          </div>
        </div>

        {/* Amortization Manifest */}
        <div className="w-full pb-24 h-auto mt-20">
           <div className="h-[1px] w-full bg-white/5 mb-24" />
           
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
              <div>
                 <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-gold mb-6">FORENSIC AUDIT</p>
                 <h2 className="text-display-md tracking-tighter leading-tight">Amortization <span className="italic font-display">Service Manifest</span>.</h2>
              </div>
              <button onClick={() => setShowTable(!showTable)}
                className="flex items-center gap-6 px-10 py-5 glass-elite border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold hover:border-brand-gold/40 transition-all duration-700 group">
                {showTable ? 'COLLAPSE FISCAL AUDIT' : 'EXPAND FISCAL AUDIT'}
                <ChevronDown size={16} className={`transition-transform duration-700 ease-luxury ${showTable ? 'rotate-180' : ''}`} />
              </button>
           </div>

          {showTable && (
            <div className="glass-elite luxury-border rounded-[56px] p-12 lg:p-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="py-8 text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted/40">MONTHLY CYCLE</th>
                      <th className="py-8 text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted/40 text-right">PRINCIPAL REDUCTION</th>
                      <th className="py-8 text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted/40 text-right">INTEREST SERVICE</th>
                      <th className="py-8 text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted/40 text-right">RESIDUAL BALANCE</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-sm tracking-tight">
                    {schedule.map((row) => (
                      <tr key={row.month} className="border-b border-white/5 group hover:bg-white/[0.03] transition-colors duration-500">
                        <td className="py-6 text-text-primary/40 font-bold tracking-widest group-hover:text-brand-gold duration-500">CYCLE #{row.month.toString().padStart(2, '0')}</td>
                        <td className="py-6 text-right text-text-primary/80 group-hover:text-white transition-colors">{formatPrice(row.principal)}</td>
                        <td className="py-6 text-right text-brand-gold/40 group-hover:text-brand-gold/80 transition-colors">{formatPrice(row.interest)}</td>
                        <td className="py-6 text-right text-text-primary font-black">{formatPrice(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
