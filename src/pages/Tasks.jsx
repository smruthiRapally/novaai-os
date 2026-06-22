import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdAdd, MdClose, MdDelete, MdEdit, MdCheck } from 'react-icons/md';
import { useToast } from '../context/ToastContext';

const STORAGE_KEY = 'startup_os_tasks';

const defaultTasks = [
  { id: 1, text: 'Fix Login Page', desc: 'Users reporting 500 error on password reset flow.', done: false, priority: 'High', due: '2026-06-25', created: '2026-06-20' },
  { id: 2, text: 'Update Pricing Page', desc: 'Add annual billing toggle and enterprise tier CTA.', done: false, priority: 'High', due: '2026-06-28', created: '2026-06-20' },
  { id: 3, text: 'Client Review Call', desc: 'Prepare deck and demo for Acme Corp quarterly review.', done: false, priority: 'Medium', due: '2026-07-01', created: '2026-06-21' },
  { id: 4, text: 'Add Analytics Tracking', desc: 'Integrate Mixpanel for funnel analysis on onboarding.', done: false, priority: 'Medium', due: '2026-07-05', created: '2026-06-21' },
  { id: 5, text: 'Board Deck for July', desc: 'Compile MRR, burn rate, pipeline, and team updates.', done: false, priority: 'High', due: '2026-07-10', created: '2026-06-22' },
  { id: 6, text: 'Approve Anika\'s onboarding', desc: 'Review and approve NDA, equipment list, access requests.', done: true, priority: 'Medium', due: '2026-06-20', created: '2026-06-18' },
  { id: 7, text: 'SSO Setup for Enterprise', desc: 'Configure SAML SSO for Acme and Apex accounts.', done: true, priority: 'Low', due: '2026-06-18', created: '2026-06-15' },
  { id: 8, text: 'Post Q2 Retrospective', desc: 'Write up team retrospective and share action items.', done: true, priority: 'Low', due: '2026-06-22', created: '2026-06-19' },
];

const load = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultTasks; }
  catch { return defaultTasks; }
};
const save = (tasks) => localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

const priorityColor = { High: 'var(--red)', Medium: 'var(--orange)', Low: 'var(--green)' };
const priorityBg = { High: 'var(--red-dim)', Medium: 'var(--orange-dim)', Low: 'var(--green-dim)' };

export default function Tasks() {
  const [tasks, setTasks] = useState(load);
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [selected, setSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { addToast } = useToast();

  const update = (next) => { setTasks(next); save(next); };

  const toggle = (id) => {
    const next = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    update(next);
    const task = tasks.find(t => t.id === id);
    if (!task.done) addToast(`"${task.text}" completed!`, 'success');
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const task = { id: Date.now(), text: input.trim(), desc: '', done: false, priority, due: '', created: new Date().toISOString().split('T')[0] };
    update([task, ...tasks]);
    setInput('');
    addToast('Task added', 'info');
  };

  const deleteTask = (id) => {
    update(tasks.filter(t => t.id !== id));
    setSelected(null);
    addToast('Task deleted', 'error');
  };

  const pending = tasks.filter(t => !t.done);
  const completed = tasks.filter(t => t.done);

  return (
    <>
      <div className="page-header">
        <h1>Tasks</h1>
        <p>{pending.length} pending · {completed.length} completed</p>
      </div>

      <div className="glass-card" style={{ marginBottom: 20 }}>
        <form onSubmit={addTask} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <input
            className="form-input"
            placeholder="Add a new task…"
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{ flex: 1, minWidth: 200 }}
          />
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 9, color: 'var(--text)', fontSize: '0.875rem', cursor: 'pointer' }}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button type="submit" className="btn btn-primary">
            <MdAdd size={18} /> Add Task
          </button>
        </form>
      </div>

      {pending.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
            Pending — {pending.length}
          </div>
          <div className="tasks-list">
            {pending.map((t, i) => (
              <motion.div
                key={t.id}
                className="task-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => { setSelected(t); setEditMode(false); }}
              >
                <div
                  className={`task-checkbox${t.done ? ' checked' : ''}`}
                  onClick={e => { e.stopPropagation(); toggle(t.id); }}
                >
                  {t.done && <MdCheck size={12} color="#fff" />}
                </div>
                <span className="task-text">{t.text}</span>
                {t.due && <span style={{ fontSize: '0.72rem', color: 'var(--text-3)', flexShrink: 0 }}>Due {t.due}</span>}
                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: priorityColor[t.priority], background: priorityBg[t.priority], padding: '3px 10px', borderRadius: 20, flexShrink: 0 }}>
                  {t.priority}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
            Completed — {completed.length}
          </div>
          <div className="tasks-list">
            {completed.map((t, i) => (
              <motion.div
                key={t.id}
                className="task-item done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.55 }}
                onClick={() => { setSelected(t); setEditMode(false); }}
              >
                <div className="task-checkbox checked" onClick={e => { e.stopPropagation(); toggle(t.id); }}>
                  <MdCheck size={12} color="#fff" />
                </div>
                <span className="task-text done">{t.text}</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: priorityColor[t.priority], background: priorityBg[t.priority], padding: '3px 10px', borderRadius: 20, flexShrink: 0 }}>
                  {t.priority}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>{selected.text}</span>
                <button className="btn-ghost btn" onClick={() => setSelected(null)} style={{ padding: 8 }}>
                  <MdClose size={18} />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
                {[
                  { label: 'Priority', value: <span style={{ color: priorityColor[selected.priority], fontWeight: 600 }}>{selected.priority}</span> },
                  { label: 'Status', value: selected.done ? <span className="badge badge-green">Completed</span> : <span className="badge badge-yellow">Pending</span> },
                  { label: 'Due Date', value: selected.due || '—' },
                  { label: 'Created', value: selected.created },
                ].map(({ label, value }) => (
                  <div key={label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 9, padding: '11px 13px' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{value}</div>
                  </div>
                ))}
              </div>

              {selected.desc && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Description</div>
                  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px', fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.6 }}>{selected.desc}</div>
                </div>
              )}

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { toggle(selected.id); setSelected(null); }}>
                  <MdCheck size={15} /> {selected.done ? 'Mark Pending' : 'Mark Complete'}
                </button>
                <button className="btn btn-outline" style={{ color: 'var(--red)', borderColor: 'var(--red-dim)' }} onClick={() => deleteTask(selected.id)}>
                  <MdDelete size={15} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
