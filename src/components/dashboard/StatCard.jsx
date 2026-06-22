import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function StatCard({ label, value, change, changeDir, icon, color, to, index = 0 }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="stat-card"
      style={{ '--card-glow': `${color}14` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      onClick={() => to && navigate(to)}
      whileTap={to ? { scale: 0.98 } : {}}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div className="stat-label">{label}</div>
          <div className="stat-value" style={{ color: color || 'var(--text)' }}>{value}</div>
          {change && (
            <div className={`stat-change ${changeDir === 'up' ? 'up' : 'down'}`}>
              <span>{changeDir === 'up' ? '↑' : '↓'}</span> {change}
            </div>
          )}
        </div>
        {icon && (
          <div
            className="stat-icon-wrap"
            style={{ background: `${color}18`, color }}
          >
            {icon}
          </div>
        )}
      </div>
      {to && (
        <div style={{ marginTop: 14, fontSize: '0.72rem', color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: 4 }}>
          View details →
        </div>
      )}
    </motion.div>
  );
}
