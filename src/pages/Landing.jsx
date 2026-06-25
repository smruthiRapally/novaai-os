import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MdAutoAwesome, 
  MdSpeed, 
  MdTrendingUp, 
  MdSupervisorAccount, 
  MdCheckCircle, 
  MdArrowForward,
  MdCode,
  MdBolt,
  MdSecurity,
  MdMenu,
  MdClose,
  MdOutlineMarkEmailRead
} from 'react-icons/md';
import '../styles/landing.css';

// Capabilities / Bento-grid features
const FEATURES = [
  {
    icon: <MdAutoAwesome size={24} />,
    title: "Neural Operations Core",
    desc: "Autonomous AI agents monitoring critical business systems. Flags execution blockages, drafts customer responses, and coordinates work tickets."
  },
  {
    icon: <MdSpeed size={24} />,
    title: "Instant State Synchronization",
    desc: "Engineered with client-side intelligence pipelines. Experience zero-latency data transfers, live updates, and continuous system optimizations."
  },
  {
    icon: <MdTrendingUp size={24} />,
    title: "Financial Intelligence Ledger",
    desc: "Real-time calculation of MRR, ARR, and cash burn metrics. Automated invoice tracing helps calculate exact LTV and runway predictions."
  },
  {
    icon: <MdSupervisorAccount size={24} />,
    title: "Team Orchestration Unit",
    desc: "Smart workspace mapping that matches tasks directly to developer capacities. Tracks sprint metrics, code velocity, and capability balances."
  },
  {
    icon: <MdBolt size={24} />,
    title: "Connected Task Matrices",
    desc: "Interactive board columns linked directly to codebase branches. Real-time updates prevent scope creep and align teams."
  },
  {
    icon: <MdSecurity size={24} />,
    title: "Enterprise Shielding",
    desc: "State-of-the-art security patterns ensuring isolation. Role-based access keys, single-sign-on (SSO), and absolute log integrity."
  }
];

// Product Modules Tabs
const MODULES = [
  {
    id: "neural",
    name: "Neural Core",
    title: "Autonomous Intelligence Operations",
    desc: "The Neural Core serves as the central brain of your business operations. It coordinates vector search retrieval, accumulates contextual data, and automatically triggers background system checks to optimize development flow.",
    specs: ["Vector database integrations", "Context aggregation triggers", "Autonomous agent tasking", "Proactive anomaly warnings"],
    preview: `// Booting Nova Neural Core Dispatcher
const neuralCore = new NovaNeuralCore({
  accuracyRate: 0.995,
  autonomousAgents: ["TicketAuditor", "CashFlowTracker"],
  vectorDbUrl: "https://db.nova.ai"
});

await neuralCore.initialize();
const analysis = await neuralCore.runSystemScan();
console.log(\`[Nova AI] Core health index: \${analysis.score}%\`);`
  },
  {
    id: "ledger",
    name: "Financial Ledger",
    title: "Predictive Capital Tracking",
    desc: "Manage and forecast capital movement with silicon speed. Receive immediate alerts on customer subscription renewals, project burn multipliers, and projected ARR runway curves before the fiscal quarter finishes.",
    specs: ["Live invoice routing", "Churn anomaly detectors", "Multi-currency ledgers", "Forward runway forecasting"],
    preview: `// Instantiating Nova Financial Engine
const ledgerManager = new NovaLedger();
const baseMRR = await ledgerManager.calculateMRR();

const projections = ledgerManager.projectRunway({
  investmentBurn: 45000,
  growthFactor: 1.22
});

console.log(\`[Ledger] MRR: $\${baseMRR} | Estimated Runway: \${projections.months} mo\`);`
  },
  {
    id: "orchestrator",
    name: "Team Orchestrator",
    title: "Developer Capacity Coordination",
    desc: "Coordinate engineers, tasks, and code review lifecycles. Leverage automated sprint capacity suggestions and capability matching to place the optimal engineer on high-impact backlog requests.",
    specs: ["Developer skill matrices", "Sprint velocity graphs", "Automated repository setup", "GitHub commit scrapers"],
    preview: `// Invoking Team Capacity Balancer
const orchestrator = new TeamOrchestrator();
const currentCapacity = await orchestrator.getSprintMetrics();

const assignments = orchestrator.balanceBacklog({
  tickets: ["Setup OAuth SSO", "Refactor API"],
  engineers: ["Rohan", "Maya", "Priya"]
});

console.log("[Orchestrator] Optimized schedule: ", assignments);`
  }
];

// Interactive Sandbox Commands
const CONSOLE_COMMANDS = {
  opt: {
    command: "nova optimize --mrr-runway",
    logs: [
      "[INFO] Querying subscriber contract databases...",
      "[INFO] Analysing contract leakages across active billing tiers...",
      "[SUCCESS] Automation applied: Scheduled 3 personalized retention sequences.",
      "[METRIC] Recaptured annual contract value: +$14,500.",
      "[METRIC] Net revenue growth projection: +12.4%."
    ]
  },
  status: {
    command: "nova status --active-agents",
    logs: [
      "[SYSTEM] Active Neural Agents: 3 of 3 running.",
      " ➔ TicketAuditor-v2    [IDLE] - Listening for git commit hooks.",
      " ➔ CashFlowTracker-v1  [BUSY] - Auditing Stripe merchant accounts.",
      " ➔ CapacityPlanner-v3  [IDLE] - Building capacity forecasts.",
      "[SYSTEM] CPU: 2.4% | Memory allocation: 256MB / 2048MB."
    ]
  },
  kernel: {
    command: "nova kernel --benchmark",
    logs: [
      "[KERNEL] Measuring memory and execution boundaries...",
      "[KERNEL] CPU units allocated: 8 Vector Processing cores.",
      "[KERNEL] Database query feedback latency: 0.08ms.",
      "[SUCCESS] Memory allocation hit ratio: 99.98%."
    ]
  }
};

export default function Landing() {
  const [activeModule, setActiveModule] = useState("neural");
  const [consoleKey, setConsoleKey] = useState("opt");
  const [consoleText, setConsoleText] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Waitlist Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Console typing simulator
  useEffect(() => {
    const data = CONSOLE_COMMANDS[consoleKey];
    setConsoleText([`$ ${data.command}`]);
    let idx = 0;
    const timer = setInterval(() => {
      if (idx < data.logs.length) {
        const nextLine = data.logs[idx];
        setConsoleText(prev => [...prev, nextLine]);
        idx++;
      } else {
        clearInterval(timer);
      }
    }, 400);
    return () => clearInterval(timer);
  }, [consoleKey]);

  // Handle Waitlist Submit
  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  const openWaitlist = () => {
    setIsSuccess(false);
    setName('');
    setEmail('');
    setCompany('');
    setIsModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="landing-body">
      {/* HEADER / NAVIGATION */}
      <header className="landing-header">
        <div className="landing-nav-container">
          <div className="landing-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="landing-logo-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span>NOVA AI</span>
          </div>

          <nav className="landing-nav-links">
            <a href="#features" className="landing-nav-link">Core Intelligence</a>
            <a href="#overview" className="landing-nav-link">Platform Overview</a>
            <a href="#modules" className="landing-nav-link">Explore Features</a>
            <a href="#pricing" className="landing-nav-link">Access Plans</a>
          </nav>

          <div className="landing-nav-actions">
            <button className="btn-landing-secondary" onClick={openWaitlist}>
              Sign In
            </button>
            <button className="btn-landing-primary" onClick={openWaitlist}>
              Request Access <MdArrowForward />
            </button>
            
            {/* Mobile menu trigger */}
            <button 
              className="mobile-only" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              style={{ background: 'none', border: 'none', color: 'var(--landing-text-main)', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', marginLeft: 8 }}
            >
              {isMobileMenuOpen ? <MdClose /> : <MdMenu />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute', top: '100%', left: 0, right: 0,
                background: '#ffffff', borderBottom: '1px solid var(--landing-border)',
                padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16, zIndex: 999,
                boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
              }}
            >
              <a href="#features" className="landing-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Core Intelligence</a>
              <a href="#overview" className="landing-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Platform Overview</a>
              <a href="#modules" className="landing-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Explore Features</a>
              <a href="#pricing" className="landing-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Access Plans</a>
              <div style={{ height: 1, background: 'var(--landing-border)' }} />
              <button className="btn-landing-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={openWaitlist}>
                Sign In
              </button>
              <button className="btn-landing-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={openWaitlist}>
                Request Access <MdArrowForward />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div 
            className="hero-tag"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MdAutoAwesome /> Enterprise autonomous startup orchestration
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            The Autonomous <span className="text-landing-gradient">Operating System</span> for Startups.
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
          >
            Empower your team with a premium silicon core, integrated financial auditing ledgers, and autonomous neural coordination agents. Designed for high-velocity teams.
          </motion.p>

          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
          >
            <button className="btn-landing-primary" style={{ padding: '14px 36px', fontSize: '1rem' }} onClick={openWaitlist}>
              Request Beta Access <MdArrowForward size={18} />
            </button>
            <a href="#features" className="btn-landing-secondary" style={{ padding: '14px 36px', fontSize: '1rem' }}>
              Explore Capabilities
            </a>
          </motion.div>

          {/* Hero Interactive Showcase Graphic (Clean, modern SaaS mockup) */}
          <motion.div 
            className="showcase-wrapper"
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
          >
            <div style={{
              background: '#ffffff',
              border: '1px solid var(--landing-border)',
              borderRadius: 24,
              padding: '36px 40px',
              boxShadow: 'var(--shadow-xl)',
              textAlign: 'left'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 40, alignItems: 'center' }}>
                {/* Left col - startup intelligence points */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-purple)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                      Nova Intelligence Engine
                    </div>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--landing-text-main)', marginBottom: 16, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                      Automate startup operations with silicon speed.
                    </h3>
                    <p style={{ color: 'var(--landing-text-muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                      Nova AI-OS runs persistent background agents that verify team velocity, check subscription contract statuses, and optimize your startup's ARR automatically.
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--accent-teal)', display: 'flex' }}><MdCheckCircle size={18} /></span>
                      <span style={{ color: 'var(--landing-text-main)', fontWeight: 500 }}>Autonomous data auditing</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--accent-teal)', display: 'flex' }}><MdCheckCircle size={18} /></span>
                      <span style={{ color: 'var(--landing-text-main)', fontWeight: 500 }}>Predictive financial runaways</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--accent-purple)', display: 'flex' }}><MdAutoAwesome size={18} /></span>
                      <span style={{ color: 'var(--landing-text-main)', fontWeight: 500 }}>Backlog capability optimization</span>
                    </div>
                  </div>
                </div>

                {/* Right col - Modern, clean image representing the platform */}
                <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--landing-border)', boxShadow: 'var(--shadow-lg)' }}>
                  <img 
                    src="/nova-intelligence.png" 
                    alt="Nova Platform Overview" 
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CORE INTELLIGENCE GRID */}
      <section id="features" className="features-section">
        <div className="section-header">
          <span className="landing-section-tag">Core Intelligence</span>
          <h2 className="landing-section-title">Designed to power <span className="text-landing-gradient">high-growth startups</span></h2>
        </div>

        <div className="features-grid">
          {FEATURES.map((feat, index) => (
            <motion.div 
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <div className="feature-icon-wrapper">
                {feat.icon}
              </div>
              <h3 className="feature-name">{feat.title}</h3>
              <p className="feature-desc">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE NOVA SECTION (Image 2 style) */}
      <section className="why-choose-section" style={{ background: 'rgba(252, 251, 247, 0.4)', backdropFilter: 'blur(8px)', padding: '90px 24px', borderTop: '1px solid var(--landing-border)', borderBottom: '1px solid var(--landing-border)', position: 'relative', zIndex: 10 }}>
        <div className="why-choose-grid">
          {/* Left Column: Big visual card like their gym photo */}
          <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', border: '1px solid var(--landing-border)', boxShadow: 'var(--shadow-lg)', background: '#ffffff', aspectRatio: '4/3' }}>
            <img 
              src="/why-choose.png" 
              alt="Nova Startup Team Collaboration" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* Overlay Tag like their gyms tag */}
            <div style={{ 
              position: 'absolute', bottom: 24, left: 24, 
              background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
              color: '#ffffff', padding: '12px 24px', borderRadius: 16,
              fontWeight: 800, fontSize: '0.95rem', boxShadow: 'var(--shadow-md)',
              display: 'flex', flexDirection: 'column', gap: 2
            }}>
              <span>10X VELOCITY</span>
              <span style={{ fontSize: '0.7rem', opacity: 0.85, fontWeight: 500 }}>Team Productivity</span>
            </div>
          </div>

          {/* Right Column: Text & 2x2 Feature Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, textAlign: 'left' }}>
            <div>
              <span className="landing-section-tag" style={{ textAlign: 'left', margin: 0 }}>Startup Optimization</span>
              <h2 className="module-info-title" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.2rem)', fontWeight: 900, marginTop: 10, marginBottom: 16 }}>Why Choose Nova AI-OS?</h2>
              <p style={{ color: 'var(--landing-text-muted)', fontSize: '0.96rem', lineHeight: 1.65, margin: 0 }}>
                Nova AI-OS is the global builder community's most premium startup operations kernel. We combine cutting-edge context vectors, real-time capital ledgers, and capacity matrices to deliver real, lasting workflow improvements. Whether you are a seed-stage team or a scaling enterprise, our system is built to balance operations and coordinate growth automatically.
              </p>
            </div>

            {/* 2x2 Grid of features */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
              <div style={{ background: '#ffffff', border: '1px solid var(--landing-border)', borderRadius: 16, padding: 20, boxShadow: 'var(--shadow-sm)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--landing-text-main)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: 'var(--accent-purple)', display: 'flex' }}><MdAutoAwesome size={16} /></span>
                  Neural Control
                </h4>
                <p style={{ color: 'var(--landing-text-muted)', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>
                  Automated background agents listening for system bottlenecks and flagging alerts.
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid var(--landing-border)', borderRadius: 16, padding: 20, boxShadow: 'var(--shadow-sm)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--landing-text-main)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: 'var(--accent-blue)', display: 'flex' }}><MdTrendingUp size={16} /></span>
                  Predictive Ledger
                </h4>
                <p style={{ color: 'var(--landing-text-muted)', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>
                  Real-time cash ledger and MRR calculation engines with forward forecasting.
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid var(--landing-border)', borderRadius: 16, padding: 20, boxShadow: 'var(--shadow-sm)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--landing-text-main)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: 'var(--accent-teal)', display: 'flex' }}><MdBolt size={16} /></span>
                  Sprint Balance
                </h4>
                <p style={{ color: 'var(--landing-text-muted)', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>
                  Developer task matrices matched dynamically to sprint velocities.
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid var(--landing-border)', borderRadius: 16, padding: 20, boxShadow: 'var(--shadow-sm)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--landing-text-main)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: 'var(--accent-purple)', display: 'flex' }}><MdSecurity size={16} /></span>
                  Enterprise Guard
                </h4>
                <p style={{ color: 'var(--landing-text-muted)', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>
                  Role access keys, single-sign-on (SSO), and absolute transaction isolation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT MODULES DEEP-DIVE TABS */}
      <section id="modules" className="modules-section">
        <div className="section-header">
          <span className="landing-section-tag">Explore Features</span>
          <h2 className="landing-section-title">Explore our <span className="text-landing-gradient">specialized engines</span></h2>
        </div>

        {/* Tab Buttons */}
        <div className="module-tabs">
          {MODULES.map(mod => (
            <button 
              key={mod.id}
              className={`module-tab-btn ${activeModule === mod.id ? 'active' : ''}`}
              onClick={() => setActiveModule(mod.id)}
            >
              {mod.name}
            </button>
          ))}
        </div>

        {/* Tab Panel Content */}
        <AnimatePresence mode="wait">
          {MODULES.map(mod => mod.id === activeModule && (
            <motion.div 
              key={mod.id}
              className="module-preview-panel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {/* Left Column Description */}
              <div>
                <h3 className="module-info-title">{mod.title}</h3>
                <p className="module-info-desc">{mod.desc}</p>
                <div className="module-spec-list">
                  {mod.specs.map((spec, i) => (
                    <div key={i} className="module-spec-item">
                      <span className="module-spec-check"><MdCheckCircle size={16} /></span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column Visual Representation (No device frames, clean and sharp) */}
              <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid var(--landing-border)', boxShadow: 'var(--shadow-md)', background: '#ffffff' }}>
                <img 
                  src={mod.id === 'neural' ? '/neural-core.png' : mod.id === 'ledger' ? '/financial-ledger.png' : '/team-orchestrator.png'} 
                  alt={mod.name} 
                  style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* PRICING PLANS SECTION */}
      <section id="pricing" className="pricing-section">
        <div className="section-header">
          <span className="landing-section-tag">Access Plans</span>
          <h2 className="landing-section-title">Scale with <span className="text-landing-gradient">silicon intelligence</span></h2>
        </div>

        <div className="pricing-grid">
          {/* Free Tier */}
          <div className="pricing-card">
            <span className="pricing-tier-name">Developer Sandbox</span>
            <div className="pricing-price-row">
              <span className="pricing-tier-price">$0</span>
            </div>
            <p className="pricing-tier-desc">Perfect to experience the interface features and configure local sensor telemetry streams.</p>
            <div className="pricing-features-list">
              <div className="pricing-feature-item">
                <span className="pricing-feature-check"><MdCheckCircle size={16} /></span>
                <span>Unified machine status matrices</span>
              </div>
              <div className="pricing-feature-item">
                <span className="pricing-feature-check"><MdCheckCircle size={16} /></span>
                <span>Standard local telemetry caches</span>
              </div>
              <div className="pricing-feature-item">
                <span className="pricing-feature-check"><MdCheckCircle size={16} /></span>
                <span>1 Connected cleanroom cluster</span>
              </div>
            </div>
            <button className="btn-landing-secondary" style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }} onClick={openWaitlist}>
              Join Waitlist
            </button>
          </div>

          {/* Growth Tier (New Plan) */}
          <div className="pricing-card">
            <span className="pricing-tier-name" style={{ color: 'var(--accent-blue)' }}>Growth Cluster</span>
            <div className="pricing-price-row">
              <span className="pricing-tier-price">$49<span style={{ fontSize: '1rem', color: 'var(--landing-text-muted)' }}>/mo</span></span>
              <span className="pricing-original-price">$69</span>
              <span className="pricing-discount-badge">Save 30%</span>
            </div>
            <p className="pricing-tier-desc">Ideal for scaling cleanrooms requiring persistent database sync, live yield ledgers, and capacity metrics.</p>
            <div className="pricing-features-list">
              <div className="pricing-feature-item">
                <span className="pricing-feature-check"><MdCheckCircle size={16} /></span>
                <span>Up to 5 connected cleanrooms</span>
              </div>
              <div className="pricing-feature-item">
                <span className="pricing-feature-check"><MdCheckCircle size={16} /></span>
                <span>1 Persistent diagnostic agent</span>
              </div>
              <div className="pricing-feature-item">
                <span className="pricing-feature-check"><MdCheckCircle size={16} /></span>
                <span>Real-time sensor logs & yield curves</span>
              </div>
              <div className="pricing-feature-item">
                <span className="pricing-feature-check"><MdCheckCircle size={16} /></span>
                <span>Standard email support</span>
              </div>
            </div>
            <button className="btn-landing-secondary" style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }} onClick={openWaitlist}>
              Start Growth Trial
            </button>
          </div>

          {/* Premium Tier */}
          <div className="pricing-card premium-tier">
            <span className="pricing-tier-name" style={{ color: 'var(--accent-purple)' }}>Scaling Cluster</span>
            <div className="pricing-price-row">
              <span className="pricing-tier-price">$99<span style={{ fontSize: '1rem', color: 'var(--landing-text-muted)' }}>/mo</span></span>
              <span className="pricing-original-price">$149</span>
              <span className="pricing-discount-badge">Save 33%</span>
            </div>
            <p className="pricing-tier-desc">Designed for high-volume semiconductor fabs requiring full autonomous predictive maintenance operations.</p>
            <div className="pricing-features-list">
              <div className="pricing-feature-item">
                <span className="pricing-feature-check"><MdCheckCircle size={16} /></span>
                <span>Unlimited cleanrooms & tool matrices</span>
              </div>
              <div className="pricing-feature-item">
                <span className="pricing-feature-check"><MdCheckCircle size={16} /></span>
                <span>3 Persistent autonomous agents</span>
              </div>
              <div className="pricing-feature-item">
                <span className="pricing-feature-check"><MdCheckCircle size={16} /></span>
                <span>Sub-millisecond query loops</span>
              </div>
              <div className="pricing-feature-item">
                <span className="pricing-feature-check"><MdCheckCircle size={16} /></span>
                <span>Advanced predictive yield & defect diagnostics</span>
              </div>
            </div>
            <button className="btn-landing-primary" style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }} onClick={openWaitlist}>
              Request Priority Access
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-brand-logo">
              <div className="landing-logo-box" style={{ width: 28, height: 28 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span>NOVA AI-OS</span>
            </div>
            <p className="footer-brand-desc">
              The premium autonomous operating system for modern startups. Coordinate developers, assets, and cash flow with silicon speed.
            </p>
          </div>

          <div>
            <h4 className="footer-title">Platform</h4>
            <div className="footer-links">
              <span className="footer-link" onClick={openWaitlist}>Neural Core</span>
              <span className="footer-link" onClick={openWaitlist}>Financial Ledger</span>
              <span className="footer-link" onClick={openWaitlist}>Team Orchestrator</span>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Resources</h4>
            <div className="footer-links">
              <a href="#features" className="footer-link">Capabilities</a>
              <a href="#modules" className="footer-link">System Modules</a>
              <a href="#sandbox" className="footer-link">CLI Terminal</a>
              <a href="#pricing" className="footer-link">Pricing Plans</a>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Compliance</h4>
            <div className="footer-links">
              <span className="footer-link">Role Isolation</span>
              <span className="footer-link">Security Policies</span>
              <span className="footer-link">Audit logs</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} NOVA AI. All rights reserved. Developed for Smruthi R.
          </div>
          <div className="footer-socials">
            <span className="footer-link" style={{ fontSize: '0.8rem' }}>Privacy Policy</span>
            <span className="footer-link" style={{ fontSize: '0.8rem' }}>Terms of Use</span>
          </div>
        </div>
      </footer>

      {/* PREMIUM REQUEST ACCESS / WAITLIST MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay">
            <motion.div 
              className="modal-container"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <MdClose size={16} />
              </button>

              {!isSuccess ? (
                <>
                  <h3 className="modal-title">Request Beta Access</h3>
                  <p className="modal-desc">
                    Nova AI-OS is currently in private beta. Complete the details below to request early deployment for your startup.
                  </p>

                  <form onSubmit={handleWaitlistSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="modal-form-group">
                      <label className="modal-form-label">Full Name</label>
                      <input 
                        className="modal-form-input" 
                        type="text" 
                        required 
                        placeholder="Smruthi Rapally"
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                    </div>
                    <div className="modal-form-group">
                      <label className="modal-form-label">Work Email</label>
                      <input 
                        className="modal-form-input" 
                        type="email" 
                        required 
                        placeholder="smruthi@startup.ai"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="modal-form-group">
                      <label className="modal-form-label">Company Name</label>
                      <input 
                        className="modal-form-input" 
                        type="text" 
                        placeholder="Nova Technologies"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                      />
                    </div>

                    <button className="modal-submit-btn" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending Request...' : 'Submit Request'}
                    </button>
                  </form>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div className="modal-success-icon">
                    <MdOutlineMarkEmailRead size={32} />
                  </div>
                  <h3 className="modal-title" style={{ marginBottom: 12 }}>You are on the list!</h3>
                  <p className="modal-desc" style={{ marginBottom: 24 }}>
                    Thank you for applying, <strong>{name}</strong>. We've registered <strong>{email}</strong> for early deployment credentials.
                  </p>
                  <button className="btn-landing-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setIsModalOpen(false)}>
                    Back to Home
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
