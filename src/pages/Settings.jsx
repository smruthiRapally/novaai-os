import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MdPerson, MdNotifications, MdPalette, MdSecurity, MdSave } from 'react-icons/md';
import { useToast } from '../context/ToastContext';

const tabs = [
  { key: 'profile', label: 'Profile', icon: <MdPerson size={16} /> },
  { key: 'notifications', label: 'Notifications', icon: <MdNotifications size={16} /> },
  { key: 'appearance', label: 'Appearance', icon: <MdPalette size={16} /> },
  { key: 'security', label: 'Security', icon: <MdSecurity size={16} /> },
];

export default function Settings({ theme, setTheme }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [toggles, setToggles] = useState({ emailNotifs: true, slackNotifs: false, twoFactor: true, aiInsights: true, weeklyDigest: false });
  const [selectedTheme, setSelectedTheme] = useState(theme || 'system');
  const { addToast } = useToast();

  useEffect(() => {
    if (theme) setSelectedTheme(theme);
  }, [theme]);

  const toggle = (key) => setToggles(t => ({ ...t, [key]: !t[key] }));

  return (
    <>
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account and workspace preferences.</p>
      </div>

      <div className="settings-tabs">
        {tabs.map(t => (
          <button key={t.key} className={`settings-tab${activeTab === t.key ? ' active' : ''}`} onClick={() => setActiveTab(t.key)}
            style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 600 }}>
        {activeTab === 'profile' && (
          <motion.div className="glass-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 60, height: 60, borderRadius: 15, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.3rem', color: '#fff' }}>A</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 2 }}>Alex Founder</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-2)' }}>alex@startup.ai · Admin</div>
              </div>
            </div>
            {[{ label: 'Full Name', value: 'Alex Founder' }, { label: 'Email', value: 'alex@startup.ai' }, { label: 'Company', value: 'AI Startup OS' }, { label: 'Role', value: 'Founder & CEO' }].map(f => (
              <div key={f.label} className="form-group">
                <label className="form-label">{f.label}</label>
                <input className="form-input" defaultValue={f.value} />
              </div>
            ))}
            <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={() => addToast('Profile saved successfully', 'success')}>
              <MdSave size={16} /> Save Changes
            </button>
          </motion.div>
        )}

        {activeTab === 'notifications' && (
          <motion.div className="glass-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {[
              { key: 'emailNotifs', label: 'Email Notifications', desc: 'Receive updates, alerts, and weekly summaries via email' },
              { key: 'slackNotifs', label: 'Slack Notifications', desc: 'Push real-time alerts to your Slack workspace' },
              { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Get a Sunday morning summary of key business metrics' },
              { key: 'aiInsights', label: 'AI Insight Alerts', desc: 'Get notified when AI detects risks or opportunities' },
            ].map(({ key, label, desc }) => (
              <div className="settings-row" key={key}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>{desc}</div>
                </div>
                <div className={`toggle${toggles[key] ? ' on' : ''}`} onClick={() => toggle(key)} />
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'appearance' && (
          <motion.div className="glass-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ fontWeight: 700, marginBottom: 16 }}>Theme Mode</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
              {[
                { key: 'dark', label: 'Dark', emoji: '🌙' },
                { key: 'light', label: 'Light', emoji: '☀️' },
                { key: 'system', label: 'System', emoji: '💻' },
              ].map(t => (
                <div key={t.key} onClick={() => {
                    setSelectedTheme(t.key);
                    setTheme(t.key);
                    addToast(`Theme set to ${t.label}`, 'info');
                  }}
                  style={{ padding: '16px', borderRadius: 12, border: `2px solid ${selectedTheme === t.key ? 'var(--accent)' : 'var(--border)'}`, background: selectedTheme === t.key ? 'var(--accent-dim)' : 'transparent', cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{t.emoji}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: selectedTheme === t.key ? 'var(--accent)' : 'var(--text-2)' }}>{t.label}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>Theme choice is persisted and follows the selected system preference when set to System.</div>
          </motion.div>
        )}

        {activeTab === 'security' && (
          <motion.div className="glass-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="settings-row">
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 2 }}>Two-Factor Authentication</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>Add an extra layer of security with TOTP or SMS</div>
              </div>
              <div className={`toggle${toggles.twoFactor ? ' on' : ''}`} onClick={() => toggle('twoFactor')} />
            </div>
            <div className="settings-row">
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 2 }}>Password</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>Last changed 45 days ago</div>
              </div>
              <button className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '7px 16px' }}
                onClick={() => addToast('Password change email sent', 'info')}>Change</button>
            </div>
            <div className="settings-row">
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 2 }}>Active Sessions</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>2 active sessions</div>
              </div>
              <button className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '7px 16px', color: 'var(--red)', borderColor: 'var(--red-dim)' }}
                onClick={() => addToast('All other sessions revoked', 'success')}>Revoke All</button>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
