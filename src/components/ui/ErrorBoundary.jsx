import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: '#0F1117', color: '#F8FAFC',
        fontFamily: 'Inter, sans-serif', textAlign: 'center', padding: 32,
      }}>
        <div style={{ maxWidth: 460 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16, margin: '0 auto 24px',
            background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem',
          }}>⚡</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 12 }}>
            Something went wrong
          </h1>
          <p style={{ color: '#64748B', lineHeight: 1.6, marginBottom: 28 }}>
            NOVA AI hit an unexpected error. Refreshing usually fixes it.
          </p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <pre style={{
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 10, padding: 16, fontSize: '0.75rem', color: '#EF4444',
              textAlign: 'left', marginBottom: 24, overflow: 'auto', maxHeight: 200,
            }}>
              {this.state.error.toString()}
            </pre>
          )}
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '11px 28px', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: 'var(--accent)', color: '#fff',
              fontSize: '0.95rem', fontWeight: 600, fontFamily: 'inherit',
            }}
          >
            Reload App
          </button>
        </div>
      </div>
    );
  }
}
