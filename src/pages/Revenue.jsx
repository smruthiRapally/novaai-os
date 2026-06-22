import React from 'react';
import { RevenueAreaChart, ProfitLossChart, revenueData } from '../components/dashboard/RevenueChart';
import StatCard from '../components/dashboard/StatCard';
import customers from '../data/customers';
import { MdAttachMoney, MdTrendingUp, MdAccountBalance, MdShoppingCart, MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import { formatINR } from '../utils/format';

const mrr = customers.reduce((s, c) => s + c.mrr, 0);
const arr = mrr * 12;
const yearData = revenueData['1Y'];
const totalRevenue = yearData.reduce((s, d) => s + d.revenue, 0);
const totalExpenses = yearData.reduce((s, d) => s + d.expenses, 0);
const totalProfit = totalRevenue - totalExpenses;
const profitMonths = yearData.filter(d => d.profit >= 0).length;
const lossMonths = yearData.filter(d => d.profit < 0).length;

const breakdown = [
  { plan: 'Enterprise', count: customers.filter(c => c.plan === 'Enterprise' && c.status === 'Active').length, price: 350000, color: 'var(--purple)' },
  { plan: 'Pro',        count: customers.filter(c => c.plan === 'Pro'        && c.status === 'Active').length, price: 74000,  color: 'var(--cyan)' },
  { plan: 'Starter',    count: customers.filter(c => c.plan === 'Starter'    && c.status === 'Active').length, price: 24000,  color: 'var(--green)' },
];

export default function Revenue() {
  return (
    <>
      <div className="page-header">
        <h1>Revenue</h1>
        <p>Financial overview with realistic profit &amp; loss tracking.</p>
      </div>

      <div className="stat-grid">
        <StatCard index={0} label="MRR" value={formatINR(mrr)} change="18% vs last month" changeDir="up" icon={<MdAttachMoney size={20} />} color="var(--green)" />
        <StatCard index={1} label="ARR" value={formatINR(arr)} change="on track for ₹1.2Cr" changeDir="up" icon={<MdTrendingUp size={20} />} color="var(--purple)" />
        <StatCard index={2} label="Annual Revenue" value={formatINR(totalRevenue)} change={`${profitMonths} profit months`} changeDir="up" icon={<MdAccountBalance size={20} />} color="var(--cyan)" />
        <StatCard index={3} label="Annual Profit" value={formatINR(Math.abs(totalProfit))} change={`${lossMonths} loss months`} changeDir={totalProfit > 0 ? 'up' : 'down'} icon={<MdShoppingCart size={20} />} color={totalProfit > 0 ? 'var(--green)' : 'var(--red)'} />
      </div>

      <div style={{ marginBottom: 24 }}><RevenueAreaChart /></div>
      <div style={{ marginBottom: 24 }}><ProfitLossChart /></div>

      <div className="glass-card" style={{ marginBottom: 24 }}>
        <div className="chart-title">All Months — Revenue &amp; Profit/Loss</div>

        {/* Desktop table */}
        <div className="table-wrap desktop-only">
          <table>
            <thead>
              <tr>
                <th>Month</th><th>Revenue</th><th>Expenses</th><th>Profit / Loss</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {yearData.map(d => (
                <tr key={d.label}>
                  <td style={{ fontWeight: 600 }}>{d.label}</td>
                  <td style={{ color: 'var(--green)', fontWeight: 600 }}>{formatINR(d.revenue)}</td>
                  <td style={{ color: 'var(--orange)' }}>{formatINR(d.expenses)}</td>
                  <td style={{ color: d.profit >= 0 ? 'var(--green)' : 'var(--red)', fontWeight: 700 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {d.profit >= 0 ? <MdArrowUpward size={14} /> : <MdArrowDownward size={14} />}
                      {formatINR(Math.abs(d.profit))}
                    </span>
                  </td>
                  <td><span className={`badge ${d.profit >= 0 ? 'badge-green' : 'badge-red'}`}>{d.profit >= 0 ? 'Profit' : 'Loss'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mobile-only mobile-finance-list">
          {yearData.map(d => (
            <div key={d.label} className="mobile-row-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{d.label} 2026</span>
                <span className={`badge ${d.profit >= 0 ? 'badge-green' : 'badge-red'}`}>{d.profit >= 0 ? 'Profit' : 'Loss'}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {[
                  { label: 'Revenue', value: formatINR(d.revenue), color: 'var(--green)' },
                  { label: 'Expenses', value: formatINR(d.expenses), color: 'var(--orange)' },
                  { label: d.profit >= 0 ? 'Profit' : 'Loss', value: formatINR(Math.abs(d.profit)), color: d.profit >= 0 ? 'var(--green)' : 'var(--red)' },
                ].map(item => (
                  <div key={item.label} style={{ background: 'var(--bg)', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-3)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                    <div style={{ fontWeight: 700, fontSize: '0.8rem', color: item.color }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card">
        <div className="chart-title">Revenue by Plan</div>
        <div className="table-wrap desktop-only">
          <table>
            <thead><tr><th>Plan</th><th>Active Customers</th><th>Price / month</th><th>MRR Contribution</th></tr></thead>
            <tbody>
              {breakdown.map(b => (
                <tr key={b.plan}>
                  <td><span className="badge" style={{ background: `${b.color}18`, color: b.color }}>{b.plan}</span></td>
                  <td>{b.count}</td>
                  <td>{formatINR(b.price)}</td>
                  <td style={{ color: 'var(--green)', fontWeight: 700 }}>{formatINR(b.count * b.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {breakdown.map(b => (
            <div key={b.plan} className="mobile-row-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge" style={{ background: `${b.color}18`, color: b.color }}>{b.plan}</span>
                <span style={{ fontWeight: 700, color: 'var(--green)' }}>{formatINR(b.count * b.price)}/mo</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: 6 }}>
                {b.count} customers · {formatINR(b.price)}/mo each
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
