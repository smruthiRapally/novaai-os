import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MdDashboard, MdPeople, MdWork, MdBarChart,
  MdAttachMoney, MdSettings, MdAutoAwesome, MdTask,
  MdSupervisorAccount
} from 'react-icons/md';

const nav = [
  { to: '/', icon: MdDashboard, label: 'Dashboard' },
  { to: '/projects', icon: MdWork, label: 'Projects' },
  { to: '/tasks', icon: MdTask, label: 'Tasks' },
  { to: '/customers', icon: MdPeople, label: 'Customers' },
  { to: '/employees', icon: MdSupervisorAccount, label: 'Team' },
  { to: '/revenue', icon: MdAttachMoney, label: 'Revenue' },
  { to: '/reports', icon: MdBarChart, label: 'Reports' },
  { to: '/ai', icon: MdAutoAwesome, label: 'AI Insights' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* NOVA AI Logo */}
      <div style={{ padding: '18px 18px 14px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          {/* Logo mark */}
          <div style={{
            width: 34, height: 34, borderRadius: 9, flexShrink: 0,
            background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 12px 24px rgba(220,38,38,0.16)',
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div style={{
              fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.02em',
              color: 'var(--accent)',
              lineHeight: 1.1,
            }}>
              NOVA AI
            </div>
            <div style={{ fontSize: '0.62rem', color: 'var(--text-3)', letterSpacing: '0.04em', fontWeight: 500, marginTop: 1 }}>
              Startup Intelligence Platform
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav" style={{ marginTop: 8, flex: 1 }}>
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            {({ isActive }) => (
              <>
                <Icon size={17} />
                <span>{label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    style={{
                      position: 'absolute', right: 10,
                      width: 5, height: 5, borderRadius: '50%',
                      background: 'var(--accent)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <NavLink to="/settings" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
          <MdSettings size={17} />
          <span>Settings</span>
        </NavLink>

        {/* Smruthi R profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', marginTop: 4 }}>
          {/* Female avatar */}
          <div style={{
            width: 34, height: 34, borderRadius: 9, flexShrink: 0, overflow: 'hidden',
            background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 12px 24px rgba(220,38,38,0.16)',
            position: 'relative',
          }}>
            {/* Minimal female avatar illustration */}
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="11" r="5" fill="rgba(255,255,255,0.9)" />
              <path d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10" fill="rgba(255,255,255,0.85)" />
              <path d="M11 9c1-2 2.5-3.5 5-3.5S20 7 20 9" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" fill="none" />
            </svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Smruthi R
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              smruthi@novaai.com
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
