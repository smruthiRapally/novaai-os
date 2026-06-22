import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KanbanBoard from '../components/projects/KanbanBoard';
import StatCard from '../components/dashboard/StatCard';
import projects from '../data/projects';
import { MdWork, MdCheckCircle, MdPending, MdPlayCircle, MdClose, MdPeople } from 'react-icons/md';

const todo = projects.filter(p => p.status === 'Todo').length;
const inProgress = projects.filter(p => p.status === 'In Progress').length;
const done = projects.filter(p => p.status === 'Done').length;

const priorityClass = { High: 'badge-red', Medium: 'badge-yellow', Low: 'badge-green' };
const statusClass = { 'Todo': 'badge-blue', 'In Progress': 'badge-yellow', 'Done': 'badge-green' };

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="page-header">
        <h1>Projects</h1>
        <p>Track all ongoing work. Tap any card for full project overview.</p>
      </div>

      <div className="stat-grid">
        <StatCard index={0} label="Total"       value={projects.length} icon={<MdWork size={20} />}        color="var(--accent)" />
        <StatCard index={1} label="In Progress" value={inProgress}      icon={<MdPlayCircle size={20} />}  color="var(--orange)" />
        <StatCard index={2} label="To Do"       value={todo}            icon={<MdPending size={20} />}     color="var(--text-2)" />
        <StatCard index={3} label="Done"        value={done}            icon={<MdCheckCircle size={20} />} color="var(--green)" />
      </div>

      {/* Desktop: Kanban board */}
      <div className="glass-card desktop-only" style={{ overflowX: 'auto' }}>
        <div className="chart-title">Project Board</div>
        <KanbanBoard />
      </div>

      {/* Mobile: stacked project cards */}
      <div className="mobile-only">
        <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          All Projects — {projects.length}
        </div>
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            className="mobile-row-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => setSelected(p)}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                <span style={{ fontWeight: 700, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</span>
              </div>
              <span className={`badge ${statusClass[p.status]}`} style={{ flexShrink: 0, marginLeft: 8 }}>{p.status}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
              <span className={`badge ${priorityClass[p.priority]}`}>{p.priority}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>{p.assignee}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>Due {p.due}</span>
            </div>

            {p.progress > 0 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-3)', marginBottom: 4 }}>
                  <span>Progress</span><span>{p.progress}%</span>
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${p.progress}%`, background: p.color, borderRadius: 2, transition: 'width 0.6s ease' }} />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div className="detail-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={e => e.target === e.currentTarget && setSelected(null)}>
            <motion.div className="detail-panel"
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: selected.color }} />
                    <span className={`badge ${priorityClass[selected.priority]}`}>{selected.priority}</span>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', lineHeight: 1.3 }}>{selected.title}</div>
                </div>
                <button className="btn-ghost btn" onClick={() => setSelected(null)} style={{ padding: 8, flexShrink: 0 }}>
                  <MdClose size={18} />
                </button>
              </div>

              <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.65, marginBottom: 18 }}>{selected.description}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                {[
                  { label: 'Status',   value: selected.status },
                  { label: 'Due',      value: selected.due },
                  { label: 'Client',   value: selected.client },
                  { label: 'Assignee', value: selected.assignee },
                  { label: 'Tasks',    value: `${selected.tasks.done}/${selected.tasks.total}` },
                  { label: 'Progress', value: `${selected.progress}%` },
                ].map(({ label, value }) => (
                  <div key={label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 9, padding: '10px 12px' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-3)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{value}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MdPeople size={12} /> Team
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {selected.team.map(m => (
                    <span key={m} style={{ background: 'var(--accent-dim)', color: 'var(--accent)', borderRadius: 20, padding: '4px 12px', fontSize: '0.78rem', fontWeight: 500 }}>{m}</span>
                  ))}
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px', fontSize: '0.85rem', color: 'var(--text-2)', lineHeight: 1.6 }}>
                {selected.notes}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
