import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/dashboard/StatCard';
import { RevenueAreaChart, ProfitLossChart } from '../components/dashboard/RevenueChart';
import { MdPeople, MdAttachMoney, MdWork, MdTrendingUp, MdClose } from 'react-icons/md';
import projects from '../data/projects';
import customers from '../data/customers';
import { formatINR } from '../utils/format';

const activeCustomers = customers.filter(c => c.status === 'Active').length;
const totalMRR = customers.reduce((s, c) => s + c.mrr, 0);
const openProjects = projects.filter(p => p.status !== 'Done').length;

const activityFeed = [
  { id: 1, icon: '🎉', color: '#10B981', title: 'Acme Corp upgraded to Enterprise', time: '2h ago', user: 'Rahul Sharma', desc: 'Account upgraded from Pro to Enterprise plan. MRR increased by ₹2,76,000.', project: 'Marketing Site', date: 'Jun 22, 2026', type: 'Revenue' },
  { id: 2, icon: '👋', color: '#6B7280', title: 'New team member onboarded', time: '5h ago', user: 'Anika Patel', desc: 'Anika Patel joined as Frontend Engineer. Access granted to all project repos.', project: 'Analytics Tool', date: 'Jun 22, 2026', type: 'HR' },
  { id: 3, icon: '🚀', color: '#F59E0B', title: 'Portfolio Website moved to In Progress', time: '1d ago', user: 'Priya Nair', desc: 'Project status updated. Sprint 3 kicked off with 4 active tasks.', project: 'Portfolio Website', date: 'Jun 21, 2026', type: 'Project' },
  { id: 4, icon: '⚠️', color: '#EF4444', title: 'Nova Systems account churned', time: '2d ago', user: 'Arjun Mehta', desc: 'Account closed. Reason: pricing. Follow-up scheduled with sales team.', project: 'Client Dashboard', date: 'Jun 20, 2026', type: 'Customer' },
  { id: 5, icon: '✅', color: '#6B7280', title: 'Landing Page marked complete', time: '3d ago', user: 'Tom Hughes', desc: 'Project delivered on time. Client satisfaction score: 9/10. Invoice sent.', project: 'Landing Page', date: 'Jun 19, 2026', type: 'Project' },
  { id: 6, icon: '📊', color: '#3B82F6', title: 'Q2 Financial Report generated', time: '4d ago', user: 'System', desc: 'Automated Q2 report generated. Revenue: ₹80,00,000. Expenses: ₹52,00,000. Profit: ₹28,00,000.', project: '—', date: 'Jun 18, 2026', type: 'Report' },
];

const typeColor = { Revenue: '#10B981', HR: '#6B7280', Project: '#F59E0B', Customer: '#EF4444', Report: '#6B7280' };

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState(null);

  return (
    <>
      <div className="page-header">
        <h1>Good morning, Smruthi 👋</h1>
        <p>Here's what's happening at NOVA AI today.</p>
      </div>

      <div className="stat-grid">
        <StatCard index={0} label="Monthly Recurring Revenue" value={formatINR(totalMRR)} change="18% vs last month" changeDir="up" icon={<MdAttachMoney size={20} />} color="var(--green)" to="/app/revenue" />
        <StatCard index={1} label="Active Customers" value={activeCustomers} change="2 new this month" changeDir="up" icon={<MdPeople size={20} />} color="var(--accent)" to="/app/customers" />
        <StatCard index={2} label="Open Projects" value={openProjects} change="1 overdue" changeDir="down" icon={<MdWork size={20} />} color="var(--orange)" to="/app/projects" />
        <StatCard index={3} label="ARR" value={formatINR(totalMRR * 12)} change="on track" changeDir="up" icon={<MdTrendingUp size={20} />} color="var(--neutral)" to="/app/revenue" />
      </div>

      <div className="charts-row" style={{ marginBottom: 24 }}>
        <RevenueAreaChart />
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="chart-title">Activity Feed</div>
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {activityFeed.slice(0, 5).map(a => (
              <div key={a.id} className="activity-item" onClick={() => setSelectedActivity(a)}>
                <div className="activity-pulse" style={{ background: `${a.color}18` }}>
                  <span style={{ fontSize: '0.85rem' }}>{a.icon}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 500, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-ghost" style={{ marginTop: 8, width: '100%', justifyContent: 'center', fontSize: '0.8rem' }} onClick={() => navigate('/app/reports')}>
            View all activity →
          </button>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <ProfitLossChart />
      </div>

      <div className="glass-card desktop-only">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div className="chart-title" style={{ marginBottom: 0 }}>Recent Customers</div>
          <button className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '6px 14px' }} onClick={() => navigate('/app/customers')}>View all</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Customer</th><th>Company</th><th>Plan</th><th>MRR</th><th>Status</th></tr></thead>
            <tbody>
              {customers.slice(0, 5).map(c => (
                <tr key={c.id} style={{ cursor: 'pointer' }} onClick={() => navigate('/app/customers')}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: `${c.color}22`, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem' }}>{c.avatar}</div>
                      <span style={{ fontWeight: 600 }}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-2)' }}>{c.company}</td>
                  <td>{c.plan}</td>
                  <td style={{ color: 'var(--green)', fontWeight: 600 }}>{c.mrr > 0 ? formatINR(c.mrr) : '—'}</td>
                  <td><span className={`badge ${c.status === 'Active' ? 'badge-green' : c.status === 'Churned' ? 'badge-red' : c.status === 'Trial' ? 'badge-yellow' : 'badge-blue'}`}>{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile customer cards — shown instead of table on small screens */}
      <div className="glass-card mobile-only" style={{ marginTop: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div className="chart-title" style={{ marginBottom: 0 }}>Recent Customers</div>
          <button className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '6px 12px', minHeight: 'unset' }} onClick={() => navigate('/app/customers')}>View all</button>
        </div>
        <div className="mobile-customer-list" style={{ display: 'block', marginBottom: 0 }}>
          {customers.slice(0, 5).map(c => (
            <div key={c.id} className="mobile-row-card" onClick={() => navigate('/app/customers')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: `${c.color}22`, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>{c.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{c.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>{c.company} · {c.plan}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <span className={`badge ${c.status === 'Active' ? 'badge-green' : c.status === 'Churned' ? 'badge-red' : 'badge-yellow'}`}>{c.status}</span>
                {c.mrr > 0 && <span style={{ fontSize: '0.8rem', color: 'var(--green)', fontWeight: 600 }}>{formatINR(c.mrr)}/mo</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedActivity && (
          <motion.div className="detail-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={e => e.target === e.currentTarget && setSelectedActivity(null)}>
            <motion.div className="detail-panel"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 11, background: `${selectedActivity.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                    {selectedActivity.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 3 }}>{selectedActivity.title}</div>
                    <span className="badge" style={{ background: `${typeColor[selectedActivity.type]}18`, color: typeColor[selectedActivity.type] }}>{selectedActivity.type}</span>
                  </div>
                </div>
                <button className="btn-ghost btn" onClick={() => setSelectedActivity(null)} style={{ padding: 8 }}>
                  <MdClose size={18} />
                </button>
              </div>
              <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 20 }}>{selectedActivity.desc}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { label: 'Date', value: selectedActivity.date },
                  { label: 'Time', value: selectedActivity.time },
                  { label: 'User', value: selectedActivity.user },
                  { label: 'Related Project', value: selectedActivity.project },
                ].map(({ label, value }) => (
                  <div key={label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 9, padding: '11px 13px' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
