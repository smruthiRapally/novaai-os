import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MdSearch, MdClose, MdWork, MdTask, MdPeople, MdBarChart, MdAttachMoney, MdDashboard, MdAutoAwesome } from 'react-icons/md';
import customers from '../../data/customers';
import projects from '../../data/projects';

// Static search index
const TASKS = [
  { id: 't1', text: 'Fix Login Page', priority: 'High' },
  { id: 't2', text: 'Update Pricing Page', priority: 'High' },
  { id: 't3', text: 'Client Review Call', priority: 'Medium' },
  { id: 't4', text: 'Add Analytics Tracking', priority: 'Medium' },
  { id: 't5', text: 'Board Deck for July', priority: 'High' },
  { id: 't6', text: "Approve Anika's onboarding", priority: 'Medium' },
  { id: 't7', text: 'SSO Setup for Enterprise', priority: 'Low' },
  { id: 't8', text: 'Post Q2 Retrospective', priority: 'Low' },
];

const PAGES = [
  { title: 'Dashboard', route: '/app', icon: <MdDashboard size={15} />, color: '#9CA3AF' },
  { title: 'Revenue', route: '/app/revenue', icon: <MdAttachMoney size={15} />, color: '#10B981' },
  { title: 'Reports', route: '/app/reports', icon: <MdBarChart size={15} />, color: '#3B82F6' },
  { title: 'AI Insights', route: '/app/ai', icon: <MdAutoAwesome size={15} />, color: '#9CA3AF' },
  { title: 'Projects', route: '/app/projects', icon: <MdWork size={15} />, color: '#F59E0B' },
  { title: 'Tasks', route: '/app/tasks', icon: <MdTask size={15} />, color: '#EF4444' },
  { title: 'Customers', route: '/app/customers', icon: <MdPeople size={15} />, color: '#9CA3AF' },
  { title: 'Team', route: '/app/employees', icon: <MdPeople size={15} />, color: '#9CA3AF' },
  { title: 'Settings', route: '/app/settings', icon: <MdDashboard size={15} />, color: '#64748B' },
];

const REPORTS = [
  { title: 'Q2 2026 Financial Report', route: '/app/reports', sub: 'Finance' },
  { title: 'Customer Health Report', route: '/app/reports', sub: 'Customers' },
  { title: 'Team Performance Review', route: '/app/reports', sub: 'HR' },
  { title: 'Sales Pipeline Summary', route: '/app/reports', sub: 'Sales' },
  { title: 'Infrastructure Cost Report', route: '/app/reports', sub: 'Engineering' },
  { title: 'Marketing ROI Report', route: '/app/reports', sub: 'Marketing' },
];

function fuzzy(str, query) {
  if (!query) return false;
  const s = str.toLowerCase();
  const q = query.toLowerCase().trim();
  if (s.includes(q)) return true;
  // simple fuzzy: all chars of query appear in order
  let qi = 0;
  for (let i = 0; i < s.length && qi < q.length; i++) {
    if (s[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

function buildResults(query) {
  if (!query.trim()) return [];
  const results = [];

  // Pages
  PAGES.filter(p => fuzzy(p.title, query)).forEach(p => {
    results.push({ type: 'Page', title: p.title, sub: 'Navigate to page', route: p.route, icon: p.icon, color: p.color });
  });

  // Projects
  projects.filter(p => fuzzy(p.title, query) || fuzzy(p.client, query)).forEach(p => {
    results.push({ type: 'Project', title: p.title, sub: `Client: ${p.client} · ${p.status}`, route: '/app/projects', icon: <MdWork size={15} />, color: p.color });
  });

  // Tasks
  TASKS.filter(t => fuzzy(t.text, query)).forEach(t => {
    results.push({ type: 'Task', title: t.text, sub: `Priority: ${t.priority}`, route: '/app/tasks', icon: <MdTask size={15} />, color: t.priority === 'High' ? '#EF4444' : t.priority === 'Medium' ? '#F59E0B' : '#10B981' });
  });

  // Customers
  customers.filter(c => fuzzy(c.name, query) || fuzzy(c.company, query) || fuzzy(c.project, query)).forEach(c => {
    results.push({ type: 'Customer', title: c.name, sub: `${c.company} · ${c.status}`, route: '/app/customers', icon: <MdPeople size={15} />, color: c.color });
  });

  // Reports
  REPORTS.filter(r => fuzzy(r.title, query) || fuzzy(r.sub, query)).forEach(r => {
    results.push({ type: 'Report', title: r.title, sub: r.sub, route: '/app/reports', icon: <MdBarChart size={15} />, color: '#3B82F6' });
  });

  return results.slice(0, 8);
}

const typeColor = { Page: '#9CA3AF', Project: '#F59E0B', Task: '#EF4444', Customer: '#9CA3AF', Report: '#3B82F6' };

export default function GlobalSearch({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const results = buildResults(query);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  const go = useCallback((route) => {
    navigate(route);
    onClose();
    setQuery('');
  }, [navigate, onClose]);

  useEffect(() => {
    const handler = (e) => {
      if (!open) return;
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') { setActiveIdx(i => Math.min(i + 1, results.length - 1)); e.preventDefault(); }
      if (e.key === 'ArrowUp') { setActiveIdx(i => Math.max(i - 1, 0)); e.preventDefault(); }
      if (e.key === 'Enter' && results[activeIdx]) { go(results[activeIdx].route); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, results, activeIdx, go, onClose]);

  useEffect(() => { setActiveIdx(0); }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          style={{ position: 'fixed', inset: 0, zIndex: 9000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 100 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={e => e.target === e.currentTarget && onClose()}
        >
          {/* Backdrop */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }} onClick={onClose} />

          <motion.div
            style={{ position: 'relative', width: '100%', maxWidth: 580, zIndex: 1 }}
            initial={{ scale: 0.94, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          >
            {/* Search box */}
            <div style={{ background: '#111827', border: '1px solid rgba(220,38,38,0.18)', borderRadius: results.length > 0 ? '16px 16px 0 0' : 16, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 0 0 1px rgba(220,38,38,0.12), 0 24px 60px rgba(0,0,0,0.6)' }}>
              <MdSearch size={20} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search projects, tasks, customers, reports…"
                style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: '1rem', color: 'var(--text)', fontFamily: 'inherit' }}
              />
              {query && (
                <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', display: 'flex', padding: 2 }}>
                  <MdClose size={16} />
                </button>
              )}
              <kbd style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid var(--border)', borderRadius: 6, padding: '2px 8px', fontSize: '0.72rem', color: 'var(--text-3)', flexShrink: 0, fontFamily: 'inherit' }}>ESC</kbd>
            </div>

            {/* Results */}
            <AnimatePresence>
              {query.trim() && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.12 }}
                  style={{ background: '#161821', border: '1px solid rgba(220,38,38,0.16)', borderTop: 'none', borderRadius: '0 0 16px 16px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.6)' }}
                >
                  {results.length === 0 ? (
                    <div style={{ padding: '28px 20px', textAlign: 'center', color: 'var(--text-3)', fontSize: '0.9rem' }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>🔍</div>
                      No results for "{query}"
                    </div>
                  ) : (
                    <div style={{ padding: 6 }}>
                      {results.map((r, i) => (
                        <motion.div
                          key={`${r.type}-${r.title}-${i}`}
                          onClick={() => go(r.route)}
                          onMouseEnter={() => setActiveIdx(i)}
                          animate={{ background: i === activeIdx ? 'rgba(220,38,38,0.08)' : 'transparent' }}
                          transition={{ duration: 0.1 }}
                          style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, cursor: 'pointer', border: i === activeIdx ? '1px solid rgba(220,38,38,0.2)' : '1px solid transparent' }}
                        >
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: `${r.color}18`, color: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {r.icon}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 600, fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.title}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginTop: 1 }}>{r.sub}</div>
                          </div>
                          <span style={{ fontSize: '0.7rem', fontWeight: 600, background: `${typeColor[r.type]}18`, color: typeColor[r.type], padding: '2px 9px', borderRadius: 20, flexShrink: 0 }}>
                            {r.type}
                          </span>
                          {i === activeIdx && (
                            <kbd style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid var(--border)', borderRadius: 5, padding: '1px 7px', fontSize: '0.68rem', color: 'var(--text-3)', flexShrink: 0 }}>↵</kbd>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                  <div style={{ borderTop: '1px solid var(--border)', padding: '8px 16px', display: 'flex', gap: 16, fontSize: '0.7rem', color: 'var(--text-3)' }}>
                    <span>↑↓ navigate</span>
                    <span>↵ open</span>
                    <span>ESC close</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state hint */}
            {!query.trim() && (
              <div style={{ background: '#161821', border: '1px solid rgba(220,38,38,0.16)', borderTop: 'none', borderRadius: '0 0 16px 16px', padding: '16px 18px', boxShadow: '0 24px 60px rgba(0,0,0,0.6)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Quick Jump</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {PAGES.slice(0, 6).map(p => (
                    <button key={p.route} onClick={() => go(p.route)}
                      style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--text-2)', fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-dim)'; e.currentTarget.style.color = 'var(--accent)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-2)'; }}
                    >
                      <span style={{ color: p.color }}>{p.icon}</span>
                      {p.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
