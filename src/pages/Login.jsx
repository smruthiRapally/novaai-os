import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdSpaceDashboard, MdVisibility, MdVisibilityOff } from 'react-icons/md';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate('/'), 800);
  };

  return (
    <div className="login-bg">
      <motion.div
        className="login-box"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg, var(--purple), var(--cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <MdSpaceDashboard size={26} color="#fff" />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 6, background: 'linear-gradient(135deg, #C4B5FD, #22D3EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>NOVA AI</h1>
          <p style={{ color: 'var(--text-2)', fontSize: '0.82rem' }}>Startup Intelligence Platform</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@startup.ai"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="form-group" style={{ position: 'relative' }}>
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type={showPw ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ paddingRight: 44 }}
            />
            <button type="button" onClick={() => setShowPw(s => !s)} style={{ position: 'absolute', right: 12, bottom: 10, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)' }}>
              {showPw ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
            </button>
          </div>

          <motion.button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: 8, fontSize: '0.95rem' }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? (
              <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                Signing in…
              </motion.span>
            ) : 'Sign In'}
          </motion.button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-3)', marginTop: 20 }}>
          Demo mode — any credentials work
        </p>
      </motion.div>
    </div>
  );
}
