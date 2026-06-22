import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projects from '../../data/projects';
import { MdClose, MdPeople, MdCalendarToday, MdNotes } from 'react-icons/md';

const columns = [
  { key: 'Todo', color: '#64748B', label: 'To Do' },
  { key: 'In Progress', color: '#F59E0B', label: 'In Progress' },
  { key: 'Done', color: '#10B981', label: 'Done' },
];

const priorityClass = { High: 'badge-red', Medium: 'badge-yellow', Low: 'badge-green' };

export default function KanbanBoard() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="kanban-board">
        {columns.map(col => {
          const cards = projects.filter(p => p.status === col.key);
          return (
            <div className="kanban-col" key={col.key}>
              <div className="kanban-col-header">
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: col.color, display: 'inline-block' }} />
                  {col.label}
                </span>
                <span style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 20, padding: '2px 10px', fontSize: '0.72rem', color: 'var(--text-2)' }}>
                  {cards.length}
                </span>
              </div>

              {cards.map((card, i) => (
                <motion.div
                  className="kanban-card"
                  key={card.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setSelected(card)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: card.color, flexShrink: 0 }} />
                    <div className="kanban-card-title" style={{ margin: 0 }}>{card.title}</div>
                  </div>
                  <div className="kanban-card-meta">
                    <span className={`badge ${priorityClass[card.priority]}`}>{card.priority}</span>
                    <span>{card.assignee}</span>
                  </div>
                  {card.progress > 0 && (
                    <div style={{ marginTop: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-3)', marginBottom: 4 }}>
                        <span>Progress</span><span>{card.progress}%</span>
                      </div>
                      <div style={{ height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${card.progress}%`, background: card.color, borderRadius: 2 }} />
                      </div>
                    </div>
                  )}
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', marginTop: 8 }}>Due {card.due}</div>
                </motion.div>
              ))}
            </div>
          );
        })}
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
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: selected.color }} />
                    <span className={`badge ${priorityClass[selected.priority]}`}>{selected.priority}</span>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '1.15rem' }}>{selected.title}</div>
                </div>
                <button className="btn-ghost btn" onClick={() => setSelected(null)} style={{ padding: 8 }}>
                  <MdClose size={18} />
                </button>
              </div>

              <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: 20 }}>{selected.description}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                {[
                  { label: 'Status', value: selected.status },
                  { label: 'Due Date', value: selected.due },
                  { label: 'Client', value: selected.client },
                  { label: 'Assignee', value: selected.assignee },
                  { label: 'Tasks', value: `${selected.tasks.done} / ${selected.tasks.total} done` },
                  { label: 'Progress', value: `${selected.progress}%` },
                ].map(({ label, value }) => (
                  <div key={label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 9, padding: '11px 13px' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{value}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                  <MdPeople size={14} style={{ color: 'var(--text-3)', marginTop: 2 }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Team</span>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {selected.team.map(m => (
                    <span key={m} style={{ background: 'var(--accent-dim)', color: 'var(--accent)', borderRadius: 20, padding: '4px 12px', fontSize: '0.8rem', fontWeight: 500 }}>{m}</span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Notes</div>
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px', fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.6 }}>{selected.notes}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
