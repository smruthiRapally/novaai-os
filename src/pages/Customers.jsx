import React from 'react';
import CustomerGrid from '../components/customers/CustomerTable';
import StatCard from '../components/dashboard/StatCard';
import customers from '../data/customers';
import { MdPeople, MdAttachMoney, MdTrendingDown, MdStars } from 'react-icons/md';
import { formatINR } from '../utils/format';

const active = customers.filter(c => c.status === 'Active').length;
const mrr = customers.reduce((s, c) => s + c.mrr, 0);
const churned = customers.filter(c => c.status === 'Churned').length;

export default function Customers() {
  return (
    <>
      <div className="page-header">
        <h1>Customers</h1>
        <p>Manage and track your customer base. Tap any card to view details.</p>
      </div>
      <div className="stat-grid">
        <StatCard index={0} label="Total Customers" value={customers.length} icon={<MdPeople size={20} />} color="var(--purple)" />
        <StatCard index={1} label="Active" value={active} icon={<MdStars size={20} />} color="var(--green)" />
        <StatCard index={2} label="Total MRR" value={formatINR(mrr)} icon={<MdAttachMoney size={20} />} color="var(--cyan)" />
        <StatCard index={3} label="Churned" value={churned} icon={<MdTrendingDown size={20} />} color="var(--red)" />
      </div>
      <CustomerGrid />
    </>
  );
}
