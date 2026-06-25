import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdDashboard, MdPeople, MdWork, MdBarChart,
  MdAttachMoney, MdSettings, MdAutoAwesome, MdTask,
  MdSupervisorAccount, MdClose
} from 'react-icons/md';

const nav = [
  { to: '/app', icon: MdDashboard, label: 'Dashboard' },
  { to: '/app/projects', icon: MdWork, label: 'Projects' },
  { to: '/app/tasks', icon: MdTask, label: 'Tasks' },
  { to: '/app/customers', icon: MdPeople, label: 'Customers' },
  { to: '/app/employees', icon: MdSupervisorAccount, label: 'Team' },
  { to: '/app/revenue', icon: MdAttachMoney, label: 'Revenue' },
  { to: '/app/reports', icon: MdBarChart, label: 'Reports' },
  { to: '/app/ai', icon: MdAutoAwesome, label: 'AI Insights' },
  { to: '/app/settings', icon: MdSettings, label: 'Settings' },
];

export default function MobileDrawer({ open, onClose }) {
  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-drawer-overlay open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{ display: 'block' }}
          />
        )}
      </AnimatePresence>

      {/* Drawer panel */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, bottom: 0,
          width: 280, background: 'rgba(13,15,22,0.98)',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          zIndex: 301, display: 'flex', flexDirection: 'column',
        }}
        initial={{ x: -280 }}
        animate={{ x: open ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 380, damping: 36 }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 24px rgba(220,38,38,0.16)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent)' }}>
                NOVA AI
              </div>
              <div style={{ fontSize: '0.55rem', color: 'var(--text-3)', letterSpacing: '0.04em' }}>Startup Intelligence Platform</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)', cursor: 'pointer' }}>
            <MdClose size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ padding: '10px 10px', flex: 1, overflowY: 'auto' }}>
          {nav.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/app'}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
              onClick={onClose}
              style={{ fontSize: '0.95rem', padding: '12px 14px', marginBottom: 3 }}
            >
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Profile */}
        <div style={{ padding: '14px 16px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontSize: '0.9rem', flexShrink: 0 }}>S</div>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>Smruthi R</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-3)' }}>smruthi@novaai.com</div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
