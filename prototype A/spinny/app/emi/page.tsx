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
    <div className="pt-[72px] min-h-screen bg-bg-primary">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-label text-brand-gold mb-4">FINANCIAL TOOLS</p>
        <h1 className="text-display-md mb-2">EMI Calculator</h1>
        <p className="text-text-muted mb-12">Plan your car purchase smartly.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Sliders */}
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-text-muted">Loan Amount</label>
                <span className="text-sm text-brand-gold font-semibold">{formatPrice(principal)}</span>
              </div>
              <input type="range" min={100000} max={5000000} step={50000} value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full accent-brand-gold" />
              <div className="flex justify-between text-xs text-text-subtle mt-1">
                <span>₹1L</span><span>₹50L</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-text-muted">Interest Rate</label>
                <span className="text-sm text-brand-gold font-semibold">{rate}%</span>
              </div>
              <input type="range" min={6} max={18} step={0.5} value={rate}
                onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-brand-gold" />
              <div className="flex justify-between text-xs text-text-subtle mt-1">
                <span>6%</span><span>18%</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm text-text-muted">Loan Tenure</label>
                <span className="text-sm text-brand-gold font-semibold">{tenure} months</span>
              </div>
              <input type="range" min={12} max={84} step={6} value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))} className="w-full accent-brand-gold" />
              <div className="flex justify-between text-xs text-text-subtle mt-1">
                <span>12 mo</span><span>84 mo</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <div className="bg-bg-surface border border-border-default rounded-card p-8 mb-6">
              <p className="text-text-muted text-sm mb-2">Monthly EMI</p>
              <p className="text-stat text-brand-gold" style={{ fontSize: 'clamp(40px, 6vw, 64px)' }}>
                ₹{emi.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Donut Chart */}
            <div className="flex items-center gap-8 mb-6">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path d={`M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831`}
                    fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="3" />
                  <path d={`M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831`}
                    fill="none" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={`${100 - interestPercent}, 100`} />
                </svg>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-sm bg-brand-gold" />
                  <div><p className="text-xs text-text-muted">Principal</p><p className="text-sm font-semibold text-text-primary">{formatPrice(principal)}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-sm bg-brand-gold/30" />
                  <div><p className="text-xs text-text-muted">Interest</p><p className="text-sm font-semibold text-text-primary">{formatPrice(totalInterest)}</p></div>
                </div>
              </div>
            </div>

            <div className="bg-bg-surface border border-border-default rounded-card p-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Total Payment</span>
                <span className="text-text-primary font-semibold">{formatPrice(totalPayment)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Amortization Table */}
        <div className="mt-12">
          <button onClick={() => setShowTable(!showTable)}
            className="flex items-center gap-2 text-sm text-brand-gold hover:underline mb-4">
            {showTable ? 'Hide' : 'Show'} Amortization Schedule
            <ChevronDown size={14} className={`transition-transform ${showTable ? 'rotate-180' : ''}`} />
          </button>
          {showTable && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-default">
                    <th className="text-left py-3 text-text-muted font-medium">Month</th>
                    <th className="text-right py-3 text-text-muted font-medium">Principal</th>
                    <th className="text-right py-3 text-text-muted font-medium">Interest</th>
                    <th className="text-right py-3 text-text-muted font-medium">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.slice(0, showTable ? undefined : 12).map((row) => (
                    <tr key={row.month} className="border-b border-border-default/50">
                      <td className="py-2 text-text-primary">{row.month}</td>
                      <td className="py-2 text-right text-text-primary">₹{row.principal.toLocaleString('en-IN')}</td>
                      <td className="py-2 text-right text-text-muted">₹{row.interest.toLocaleString('en-IN')}</td>
                      <td className="py-2 text-right text-text-primary">₹{row.balance.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
