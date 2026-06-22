import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import customers from '../../data/customers';
import { MdClose, MdEmail, MdCalendarToday, MdAttachMoney } from 'react-icons/md';

const statusClass = { Active: 'badge-green', Churned: 'badge-red', Trial: 'badge-yellow', Pending: 'badge-cyan' };

export default function CustomerGrid() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="customer-grid">
        {customers.map((c, i) => (
          <motion.div
            key={c.id}
            className="customer-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelected(c)}
          >
            <div className="customer-avatar" style={{ background: `${c.color}22`, color: c.color }}>
              {c.avatar}
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 2 }}>{c.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-2)', marginBottom: 12 }}>{c.company}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>{c.project}</span>
              <span className={`badge ${statusClass[c.status]}`}>{c.status}</span>
            </div>
            {c.mrr > 0 && (
              <div style={{ marginTop: 10, fontSize: '0.8rem', color: 'var(--green)', fontWeight: 600 }}>
                ${c.mrr.toLocaleString()} / mo
              </div>
            )}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 13, background: `${selected.color}22`, color: selected.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800 }}>{selected.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{selected.name}</div>
                    <div style={{ color: 'var(--text-2)', fontSize: '0.85rem' }}>{selected.company}</div>
                  </div>
                </div>
                <button className="btn-ghost btn" onClick={() => setSelected(null)} style={{ padding: 8 }}>
                  <MdClose size={18} />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                {[
                  { label: 'Plan', value: selected.plan },
                  { label: 'Status', value: <span className={`badge ${statusClass[selected.status]}`}>{selected.status}</span> },
                  { label: 'MRR', value: selected.mrr > 0 ? `$${selected.mrr.toLocaleString()}` : '—', color: 'var(--green)' },
                  { label: 'Joined', value: selected.joined },
                  { label: 'Meetings', value: selected.meetings },
                  { label: 'Invoices', value: selected.invoices },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: color || 'var(--text)' }}>{value}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Current Project</div>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px', fontWeight: 500 }}>{selected.project}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Notes</div>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px', fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.6 }}>{selected.notes}</div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
                <button className="btn btn-primary" style={{ flex: 1 }}>
                  <MdEmail size={15} /> Send Email
                </button>
                <button className="btn btn-outline">
                  <MdAttachMoney size={15} /> Invoice
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
