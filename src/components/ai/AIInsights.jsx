import React from 'react';
import { motion } from 'framer-motion';

const insights = [
  { icon: '📈', color: '#DC2626', title: 'Revenue Momentum', body: 'MRR grew 18% month-over-month. Enterprise tier is driving the surge — 3 new Enterprise deals closed this month.', score: 82, label: 'Growth Score' },
  { icon: '⚠️', color: '#F59E0B', title: 'Churn Risk Alert', body: 'Arjun Mehta shows signs of disengagement — last login 34 days ago, no API calls in 2 weeks. Consider a check-in call.', score: 38, label: 'Retention Score' },
  { icon: '🚀', color: '#10B981', title: 'Team Productivity', body: '5 out of 8 projects are on track. Engineering velocity increased 23% after last sprint retro adjustments.', score: 74, label: 'Velocity Score' },
  { icon: '💡', color: '#6B7280', title: 'Expansion Opportunity', body: 'Sneha Patel and Vikram Joshi are nearing their Pro plan limits. Upgrade conversations could add ₹2K+ MRR.', score: 91, label: 'Opportunity Score' },
  { icon: '🎯', color: '#EF4444', title: 'Sales Pipeline', body: 'Pipeline coverage is 2.4x quota. 4 deals in late-stage. Close rate this quarter is 34%, up from 28% last quarter.', score: 67, label: 'Pipeline Health' },
  { icon: '🔧', color: '#3B82F6', title: 'Infrastructure Load', body: 'API response times averaged 142ms this week — within SLA. No incidents in 47 days. Uptime at 99.97%.', score: 97, label: 'Reliability Score' },
];

export default function AIInsightCards() {
  return (
    <div className="insights-grid">
      {insights.map((ins, i) => (
        <motion.div
          className="insight-card"
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div className="insight-icon-wrap" style={{ background: `${ins.color}18` }}>
              {ins.icon}
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{ins.title}</div>
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.65, marginBottom: 16 }}>{ins.body}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: 'var(--text-3)' }}>
            <span style={{ flexShrink: 0 }}>{ins.label}</span>
            <div className="score-bar">
              <motion.div
                className="score-fill"
                style={{ background: ins.color }}
                initial={{ width: 0 }}
                animate={{ width: `${ins.score}%` }}
                transition={{ delay: i * 0.08 + 0.3, duration: 1, ease: 'easeOut' }}
              />
            </div>
            <span style={{ color: ins.color, fontWeight: 700, flexShrink: 0 }}>{ins.score}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
