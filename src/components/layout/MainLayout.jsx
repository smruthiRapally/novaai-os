import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Toast from '../ui/Toast';
import GlobalSearch from '../ui/GlobalSearch';

const titles = {
  '/': 'Dashboard',
  '/customers': 'Customers',
  '/employees': 'Team',
  '/projects': 'Projects',
  '/tasks': 'Tasks',
  '/revenue': 'Revenue',
  '/reports': 'Reports',
  '/ai': 'AI Insights',
  '/settings': 'Settings',
};

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function MainLayout() {
  const location = useLocation();
  const title = titles[location.pathname] || 'NOVA AI';
  const [searchOpen, setSearchOpen] = useState(false);

  // Ctrl+K / Cmd+K global shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(s => !s);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title={title} onSearchOpen={() => setSearchOpen(true)} />
        <div className="page-body">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      <Toast />
    </div>
  );
}
