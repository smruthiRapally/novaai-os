import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell, ReferenceLine, Legend, LineChart, Line
} from 'recharts';
import { formatINR, formatINRTick } from '../../utils/format';

export const revenueData = {
  '7D': [
    { label: 'Mon', revenue: 4200, expenses: 3100, profit: 1100 },
    { label: 'Tue', revenue: 3800, expenses: 2900, profit: 900 },
    { label: 'Wed', revenue: 5100, expenses: 3600, profit: 1500 },
    { label: 'Thu', revenue: 4700, expenses: 5200, profit: -500 },
    { label: 'Fri', revenue: 6200, expenses: 4100, profit: 2100 },
    { label: 'Sat', revenue: 3200, expenses: 2800, profit: 400 },
    { label: 'Sun', revenue: 2900, expenses: 3400, profit: -500 },
  ],
  '30D': [
    { label: 'W1', revenue: 18400, expenses: 14200, profit: 4200 },
    { label: 'W2', revenue: 21000, expenses: 22500, profit: -1500 },
    { label: 'W3', revenue: 19800, expenses: 16800, profit: 3000 },
    { label: 'W4', revenue: 24500, expenses: 19000, profit: 5500 },
  ],
  '90D': [
    { label: 'Jan', revenue: 50000, expenses: 30000, profit: 20000 },
    { label: 'Feb', revenue: 40000, expenses: 55000, profit: -15000 },
    { label: 'Mar', revenue: 70000, expenses: 45000, profit: 25000 },
  ],
  '1Y': [
    { label: 'Jan', revenue: 50000, expenses: 30000, profit: 20000 },
    { label: 'Feb', revenue: 40000, expenses: 55000, profit: -15000 },
    { label: 'Mar', revenue: 70000, expenses: 45000, profit: 25000 },
    { label: 'Apr', revenue: 62000, expenses: 48000, profit: 14000 },
    { label: 'May', revenue: 55000, expenses: 60000, profit: -5000 },
    { label: 'Jun', revenue: 80000, expenses: 52000, profit: 28000 },
    { label: 'Jul', revenue: 74000, expenses: 56000, profit: 18000 },
    { label: 'Aug', revenue: 90000, expenses: 61000, profit: 29000 },
    { label: 'Sep', revenue: 68000, expenses: 71000, profit: -3000 },
    { label: 'Oct', revenue: 95000, expenses: 64000, profit: 31000 },
    { label: 'Nov', revenue: 88000, expenses: 59000, profit: 29000 },
    { label: 'Dec', revenue: 110000, expenses: 72000, profit: 38000 },
  ],
};

const tooltip = {
  backgroundColor: '#161821',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 10, color: '#F8FAFC', fontSize: 13
};

const fmt = v => formatINRTick(v);
const fmtFull = v => formatINR(Math.abs(v));

const filters = ['7D', '30D', '90D', '1Y'];

export function RevenueAreaChart({ compact = false }) {
  const [active, setActive] = useState('1Y');
  const data = revenueData[active];

  return (
    <div className="glass-card" style={{ padding: compact ? '16px' : '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div className="chart-title" style={{ marginBottom: 0 }}>Revenue vs Expenses</div>
        <div className="chart-filters">
          {filters.map(f => (
            <button key={f} className={`chart-filter-btn${active === f ? ' active' : ''}`} onClick={() => setActive(f)}>{f}</button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={compact ? 180 : 240}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gExp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="label" stroke="transparent" tick={{ fill: '#64748B', fontSize: 11 }} />
          <YAxis stroke="transparent" tick={{ fill: '#64748B', fontSize: 11 }} tickFormatter={fmt} />
          <Tooltip contentStyle={tooltip} formatter={(v, n) => [fmtFull(v), n]} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#8B5CF6" fill="url(#gRev)" strokeWidth={2.5} dot={false} />
          <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#F59E0B" fill="url(#gExp)" strokeWidth={2.5} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ProfitLossChart({ compact = false }) {
  const [active, setActive] = useState('1Y');
  const data = revenueData[active];

  return (
    <div className="glass-card" style={{ padding: compact ? '16px' : '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div className="chart-title" style={{ marginBottom: 0 }}>Profit / Loss</div>
        <div className="chart-filters">
          {filters.map(f => (
            <button key={f} className={`chart-filter-btn${active === f ? ' active' : ''}`} onClick={() => setActive(f)}>{f}</button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={compact ? 160 : 220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="label" stroke="transparent" tick={{ fill: '#64748B', fontSize: 11 }} />
          <YAxis stroke="transparent" tick={{ fill: '#64748B', fontSize: 11 }} tickFormatter={fmt} />
          <Tooltip contentStyle={tooltip} formatter={(v) => [fmtFull(v), 'Profit/Loss']} />
          <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
          <Bar dataKey="profit" name="Profit/Loss" radius={[4, 4, 4, 4]}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.profit >= 0 ? '#10B981' : '#EF4444'} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RevenueLineChart() {
  const data = revenueData['1Y'];
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="label" stroke="transparent" tick={{ fill: '#64748B', fontSize: 11 }} />
        <YAxis stroke="transparent" tick={{ fill: '#64748B', fontSize: 11 }} tickFormatter={fmt} />
        <Tooltip contentStyle={tooltip} formatter={(v, n) => [fmtFull(v), n]} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#8B5CF6" strokeWidth={2.5} dot={false} />
        <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#F59E0B" strokeWidth={2.5} dot={false} />
        <Line type="monotone" dataKey="profit" name="Profit" stroke="#10B981" strokeWidth={2.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default RevenueAreaChart;
