import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MdNotifications, MdSearch, MdClose, MdMenu,
  MdPerson, MdSettings, MdLogout, MdOutlineNotifications
} from 'react-icons/md';
import GlobalSearch from '../ui/GlobalSearch';

const notifications = [
  { id: 1, text: 'Acme Corp upgraded to Enterprise', time: '2h ago', icon: '🎉' },
  { id: 2, text: 'New task assigned: Fix Login Page', time: '4h ago', icon: '📌' },
  { id: 3, text: 'Report generated: Q2 Financial', time: '1d ago', icon: '📊' },
];

const dropdownItems = [
  { icon: <MdPerson size={16} />, label: 'Profile', route: '/settings' },
  { icon: <MdSettings size={16} />, label: 'Settings', route: '/settings' },
  { icon: <MdOutlineNotifications size={16} />, label: 'Notifications', route: null },
  { icon: <MdLogout size={16} />, label: 'Logout', route: '/login', danger: true },
];

export default function Navbar({ title, onSearchOpen, onMenuOpen }) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="navbar">
      {/* Hamburger — mobile only */}
      <button className="hamburger-btn" onClick={onMenuOpen} aria-label="Open menu">
        <MdMenu size={20} />
      </button>

      <span className="navbar-title">{title}</span>

      <div className="navbar-right">
        {/* Search button */}
        <motion.div
          className="navbar-icon-btn"
          onClick={onSearchOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Search (Ctrl+K)"
          style={{ cursor: 'pointer' }}
        >
          <MdSearch size={18} />
        </motion.div>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <motion.div
            className="navbar-icon-btn"
            onClick={() => { setShowNotifs(s => !s); setShowProfile(false); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ position: 'relative', cursor: 'pointer' }}
          >
            <MdNotifications size={18} />
            <span style={{
              position: 'absolute', top: 6, right: 6,
              width: 7, height: 7, borderRadius: '50%',
              background: 'var(--purple)', border: '1.5px solid #0F1117',
            }} />
          </motion.div>

          <AnimatePresence>
            {showNotifs && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute', right: 0, top: 46,
                  width: 'min(300px, calc(100vw - 24px))', background: '#161821',
                  border: '1px solid var(--border)', borderRadius: 14,
                  padding: 8, boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                  zIndex: 200,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px 12px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Notifications</span>
                  <MdClose size={16} style={{ cursor: 'pointer', color: 'var(--text-3)' }} onClick={() => setShowNotifs(false)} />
                </div>
                {notifications.map(n => (
                  <div key={n.id} style={{ display: 'flex', gap: 10, padding: '10px', borderRadius: 9, cursor: 'pointer', transition: 'background 0.15s', alignItems: 'flex-start' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ fontSize: '1.1rem' }}>{n.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 500 }}>{n.text}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', marginTop: 2 }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile avatar — S for Smruthi */}
        <div ref={profileRef} style={{ position: 'relative' }}>
          <motion.div
            onClick={() => { setShowProfile(s => !s); setShowNotifs(false); }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            style={{
              width: 36, height: 36, borderRadius: 9, cursor: 'pointer',
              background: 'linear-gradient(135deg, #C084FC, #818CF8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: '0.9rem', color: '#fff',
              boxShadow: showProfile ? '0 0 0 2px var(--purple)' : '0 0 12px rgba(192,132,252,0.3)',
              transition: 'box-shadow 0.2s',
            }}
          >
            S
          </motion.div>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{
                  position: 'absolute', right: 0, top: 46,
                  width: 'min(220px, calc(100vw - 24px))', background: '#161821',
                  border: '1px solid var(--border)', borderRadius: 14,
                  padding: 6, boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
                  zIndex: 200,
                }}
              >
                {/* User info header */}
                <div style={{ padding: '10px 12px 12px', borderBottom: '1px solid var(--border)', marginBottom: 4 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                      background: 'linear-gradient(135deg, #C084FC, #818CF8)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: '0.9rem', color: '#fff',
                    }}>S</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Smruthi R</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-3)' }}>smruthi@novaai.com</div>
                    </div>
                  </div>
                </div>

                {dropdownItems.map((item, i) => (
                  <div key={i}
                    onClick={() => {
                      setShowProfile(false);
                      if (item.route) navigate(item.route);
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '9px 12px', borderRadius: 8, cursor: 'pointer',
                      color: item.danger ? 'var(--red)' : 'var(--text-2)',
                      fontSize: '0.875rem', fontWeight: 500, transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = item.danger ? 'var(--red-dim)' : 'var(--bg-card-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {item.icon}
                    {item.label}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
