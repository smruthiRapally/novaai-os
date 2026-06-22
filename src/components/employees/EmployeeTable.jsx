import React from 'react';
import { motion } from 'framer-motion';
import employees from '../../data/employees';

const statusClass = { Active: 'badge-green', 'On Leave': 'badge-yellow', Inactive: 'badge-red' };
const roleColor = { Engineering: '#3B82F6', Product: '#8B5CF6', Design: '#F59E0B', Sales: '#10B981', Marketing: '#EF4444', Operations: '#22D3EE' };

export default function EmployeeTable() {
  return (
    <div className="glass-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <span style={{ fontWeight: 700 }}>All Team Members</span>
        <button className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '7px 16px' }}>+ Add Member</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Title</th>
              <th>Department</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e, i) => (
              <motion.tr key={e.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: `${roleColor[e.role]}22`, color: roleColor[e.role],
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '0.8rem', flexShrink: 0
                    }}>
                      {e.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{e.name}</span>
                  </div>
                </td>
                <td style={{ color: 'var(--text-2)' }}>{e.title}</td>
                <td>
                  <span className="badge" style={{ background: `${roleColor[e.role]}18`, color: roleColor[e.role] }}>
                    {e.role}
                  </span>
                </td>
                <td style={{ color: 'var(--text-2)' }}>{e.location}</td>
                <td style={{ fontWeight: 600 }}>${e.salary.toLocaleString()}</td>
                <td><span className={`badge ${statusClass[e.status]}`}>{e.status}</span></td>
                <td style={{ color: 'var(--text-3)' }}>{e.joined}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
