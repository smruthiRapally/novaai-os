import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProfitLossChart, RevenueAreaChart, RevenueLineChart } from '../components/dashboard/RevenueChart';
import { MdDownload, MdClose, MdBarChart, MdPeople, MdWork, MdTrendingUp } from 'react-icons/md';
import { useToast } from '../context/ToastContext';

const reports = [
  { id: 1, icon: <MdBarChart size={22} />, title: 'Q2 2026 Financial Report', desc: 'Revenue, expenses and P&L for Q2', date: 'Jun 30, 2026', type: 'Finance', color: '#10B981',
    insights: ['Revenue grew 28% QoQ to ₹2,44,000', 'May had a ₹5,000 loss due to infrastructure spend', 'Jun was the best month: ₹28,000 profit', 'Expenses increased 18% due to new hires'] },
  { id: 2, icon: <MdPeople size={22} />, title: 'Customer Health Report', desc: 'Churn analysis and retention metrics', date: 'Jun 22, 2026', type: 'Customers', color: '#64748B',
    insights: ['Churn rate at 2.1% — below industry benchmark', '1 account churned (Nova Systems) due to pricing', '2 trial accounts in conversion pipeline', 'NPS score: 62 (up from 54 last quarter)'] },
  { id: 3, icon: <MdWork size={22} />, title: 'Team Performance Review', desc: 'Productivity and velocity metrics', date: 'Jun 20, 2026', type: 'HR', color: '#F59E0B',
    insights: ['Sprint velocity up 23% after retro changes', '5 of 8 projects on schedule', 'Average task completion time: 2.3 days', '1 team member on leave, coverage arranged'] },
  { id: 4, icon: <MdTrendingUp size={22} />, title: 'Sales Pipeline Summary', desc: 'Deals, conversion rates, forecasts', date: 'Jun 15, 2026', type: 'Sales', color: '#F59E0B',
    insights: ['Pipeline coverage: 2.4x quota', '4 deals in final negotiation stage', 'Close rate: 34% (up from 28% last quarter)', 'Forecasted new MRR: ₹12,500 this month'] },
  { id: 5, icon: <MdBarChart size={22} />, title: 'Infrastructure Cost Report', desc: 'Cloud spend and optimization', date: 'Jun 10, 2026', type: 'Engineering', color: '#EF4444',
    insights: ['AWS spend: ₹8,200/month (-12% after optimization)', 'Uptime: 99.97% — 0 incidents this quarter', 'API avg response time: 142ms (within SLA)', 'Database storage grew 34% — plan upgrade needed'] },
  { id: 6, icon: <MdTrendingUp size={22} />, title: 'Marketing ROI Report', desc: 'CAC, LTV, and channel performance', date: 'Jun 5, 2026', type: 'Marketing', color: '#3B82F6',
    insights: ['CAC reduced to ₹4,200 (down 18%)', 'LTV:CAC ratio: 8.7x', 'Top channel: organic search (42% of signups)', 'Paid campaigns paused — ROI below threshold'] },
];

const typeColor = { Finance: 'badge-green', Customers: 'badge-red', HR: 'badge-yellow', Sales: 'badge-blue', Engineering: 'badge-red', Marketing: 'badge-blue' };

export default function Reports() {
  const [selected, setSelected] = useState(null);
  const { addToast } = useToast();

  const download = (format, title) => {
    addToast(`${title} exported as ${format}`, 'success');
  };

  return (
    <>
      <div className="page-header">
        <h1>Reports</h1>
        <p>Click any report card to view details and export.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }} className="reports-charts-row">
        <RevenueAreaChart compact />
        <ProfitLossChart compact />
      </div>

      <div className="reports-grid">
        {reports.map((r, i) => (
          <motion.div
            className="report-card"
            key={r.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => setSelected(r)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 11, background: `${r.color}18`, color: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {r.icon}
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}>{r.date}</span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
              <span className={`badge ${typeColor[r.type]}`}>{r.type}</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 6 }}>{r.title}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-2)', marginBottom: 16, lineHeight: 1.5 }}>{r.desc}</div>
            <button className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '6px 12px' }}
              onClick={e => { e.stopPropagation(); download('PDF', r.title); }}>
              <MdDownload size={14} /> Export
            </button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div className="detail-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={e => e.target === e.currentTarget && setSelected(null)}>
            <motion.div className="detail-panel"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 11, background: `${selected.color}18`, color: selected.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {selected.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: 4 }}>{selected.title}</div>
                    <span className={`badge ${typeColor[selected.type]}`}>{selected.type}</span>
                  </div>
                </div>
                <button className="btn-ghost btn" onClick={() => setSelected(null)} style={{ padding: 8 }}>
                  <MdClose size={18} />
                </button>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Key Insights</div>
                {selected.insights.map((ins, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: selected.color, marginTop: 6, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.5 }}>{ins}</span>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Export Options</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['PDF', 'CSV', 'Excel'].map(fmt => (
                  <button key={fmt} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '0.82rem' }}
                    onClick={() => { download(fmt, selected.title); setSelected(null); }}>
                    <MdDownload size={14} /> {fmt}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
