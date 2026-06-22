import React from 'react';
import { motion } from 'framer-motion';
import AIInsightCards from '../components/ai/AIInsights';
import { MdAutoAwesome } from 'react-icons/md';

export default function AIInsightsPage() {
  return (
    <>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: 'linear-gradient(135deg, var(--purple), var(--cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MdAutoAwesome size={18} color="#fff" />
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.03em' }}>AI Insights</h1>
        </div>
        <p style={{ color: 'var(--text-2)', fontSize: '0.875rem' }}>
          AI-generated intelligence about your business, updated continuously.
        </p>
      </div>

      <div className="glass-card" style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 42, height: 42, borderRadius: 11, background: 'linear-gradient(135deg, var(--purple), var(--cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <MdAutoAwesome size={20} color="#fff" />
        </div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 3 }}>AI Analysis Active</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-2)' }}>
            Monitoring 8 customers · 8 projects · 8 team members · Revenue data updated 2h ago
          </div>
        </div>
        <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
          <span className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
            Live
          </span>
        </div>
      </div>

      <AIInsightCards />
    </>
  );
}
