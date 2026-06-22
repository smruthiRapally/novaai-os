import React from 'react';
import { RevenueAreaChart, ProfitLossChart, RevenueLineChart, revenueData } from '../components/dashboard/RevenueChart';
import StatCard from '../components/dashboard/StatCard';
import customers from '../data/customers';
import { MdAttachMoney, MdTrendingUp, MdAccountBalance, MdShoppingCart, MdArrowUpward, MdArrowDownward } from 'react-icons/md';

const mrr = customers.reduce((s, c) => s + c.mrr, 0);
const arr = mrr * 12;
const yearData = revenueData['1Y'];
const totalRevenue = yearData.reduce((s, d) => s + d.revenue, 0);
const totalExpenses = yearData.reduce((s, d) => s + d.expenses, 0);
const totalProfit = totalRevenue - totalExpenses;
const profitMonths = yearData.filter(d => d.profit >= 0).length;
const lossMonths = yearData.filter(d => d.profit < 0).length;

const breakdown = [
  { plan: 'Enterprise', count: customers.filter(c => c.plan === 'Enterprise' && c.status === 'Active').length, price: 4200, color: 'var(--purple)' },
  { plan: 'Pro', count: customers.filter(c => c.plan === 'Pro' && c.status === 'Active').length, price: 890, color: 'var(--cyan)' },
  { plan: 'Starter', count: customers.filter(c => c.plan === 'Starter' && c.status === 'Active').length, price: 290, color: 'var(--green)' },
];

export default function Revenue() {
  return (
    <>
      <div className="page-header">
        <h1>Revenue</h1>
        <p>Financial overview with realistic profit & loss tracking.</p>
      </div>

      <div className="stat-grid">
        <StatCard index={0} label="MRR" value={`$${mrr.toLocaleString()}`} change="18% vs last month" changeDir="up" icon={<MdAttachMoney size={20} />} color="var(--green)" />
        <StatCard index={1} label="ARR" value={`$${arr.toLocaleString()}`} change="on track for $600k" changeDir="up" icon={<MdTrendingUp size={20} />} color="var(--purple)" />
        <StatCard index={2} label="Annual Revenue" value={`₹${(totalRevenue / 1000).toFixed(0)}k`} change={`${profitMonths} profit months`} changeDir="up" icon={<MdAccountBalance size={20} />} color="var(--cyan)" />
        <StatCard index={3} label="Annual Profit" value={totalProfit > 0 ? `₹${(totalProfit / 1000).toFixed(0)}k` : `-₹${(Math.abs(totalProfit) / 1000).toFixed(0)}k`} change={`${lossMonths} loss months`} changeDir={totalProfit > 0 ? 'up' : 'down'} icon={<MdShoppingCart size={20} />} color={totalProfit > 0 ? 'var(--green)' : 'var(--red)'} />
      </div>

      <div style={{ marginBottom: 24 }}>
        <RevenueAreaChart />
      </div>

      <div style={{ marginBottom: 24 }}>
        <ProfitLossChart />
      </div>

      <div className="glass-card" style={{ marginBottom: 24 }}>
        <div className="chart-title">All Months — Revenue & Profit/Loss</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Revenue</th>
                <th>Expenses</th>
                <th>Profit / Loss</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {yearData.map(d => (
                <tr key={d.label}>
                  <td style={{ fontWeight: 600 }}>{d.label}</td>
                  <td style={{ color: 'var(--green)', fontWeight: 600 }}>₹{d.revenue.toLocaleString()}</td>
                  <td style={{ color: 'var(--orange)' }}>₹{d.expenses.toLocaleString()}</td>
                  <td style={{ color: d.profit >= 0 ? 'var(--green)' : 'var(--red)', fontWeight: 700 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {d.profit >= 0 ? <MdArrowUpward size={14} /> : <MdArrowDownward size={14} />}
                      ₹{Math.abs(d.profit).toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${d.profit >= 0 ? 'badge-green' : 'badge-red'}`}>
                      {d.profit >= 0 ? 'Profit' : 'Loss'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card">
        <div className="chart-title">Revenue by Plan</div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Plan</th><th>Active Customers</th><th>Price / month</th><th>MRR Contribution</th></tr></thead>
            <tbody>
              {breakdown.map(b => (
                <tr key={b.plan}>
                  <td><span className="badge" style={{ background: `${b.color}18`, color: b.color }}>{b.plan}</span></td>
                  <td>{b.count}</td>
                  <td>${b.price.toLocaleString()}</td>
                  <td style={{ color: 'var(--green)', fontWeight: 700 }}>${(b.count * b.price).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
