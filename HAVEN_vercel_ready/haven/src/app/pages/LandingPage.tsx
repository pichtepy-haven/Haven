import { useState, useRef } from 'react';
import { Link } from 'react-router';
import { Lock, Brain, UserCheck, Menu, X, Zap, Activity, Sparkles, ArrowRight, CheckCircle2, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AIChatPopup from '../components/AIChatPopup';
import HavenLogo from '../components/HavenLogo';

const DEMO_QA: [string, string][] = [
  ['What is normal blood pressure?', 'Normal blood pressure is below 120/80 mmHg. Readings of 130/80 or higher are considered high. Key lifestyle tips: reduce sodium, exercise regularly, and avoid smoking.'],
  ['How often should I get a check-up?', 'Most adults benefit from an annual physical exam. Key screenings vary by age — cholesterol every 5 years, diabetes every 3 years (45+), blood pressure yearly.'],
  ['Tips for better sleep?', 'Adults need 7–9 hours nightly. Good sleep hygiene: consistent schedule, dark & cool room (60–67°F), no screens 1 hour before bed, avoid caffeine after 2 PM.'],
  ['What does high cholesterol mean?', 'Desirable total cholesterol: below 200 mg/dL. LDL (bad) should be under 100 mg/dL; HDL (good) above 60 mg/dL is protective. Diet, exercise, and statins are common management strategies.'],
];

function InlineAIDemo() {
  const [messages, setMessages] = useState<{ q: string; a: string }[]>([]);
  const [typing, setTyping] = useState(false);
  const [asked, setAsked] = useState<Set<number>>(new Set());
  const endRef = useRef<HTMLDivElement>(null);

  const ask = (i: number) => {
    if (typing || asked.has(i)) return;
    setAsked(prev => new Set(prev).add(i));
    setTyping(true);
    const [q, a] = DEMO_QA[i];
    setMessages(prev => [...prev, { q, a: '' }]);
    setTimeout(() => {
      setMessages(prev => prev.map((m, idx) => idx === prev.length - 1 ? { ...m, a } : m));
      setTyping(false);
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    }, 900);
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
      {/* Demo chat header */}
      <div className="bg-[#0077b6] px-4 py-3 flex items-center gap-2.5">
        <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
          <Brain size={16} className="text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-white">Haven AI</span>
            <span className="px-1.5 py-0.5 bg-white/15 rounded text-xs font-semibold text-white">Guest</span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-white/60">General guidance · No account needed</span>
          </div>
        </div>
        <div className="ml-auto flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
        </div>
      </div>

      {/* Messages */}
      <div className="h-52 overflow-y-auto px-4 py-4 space-y-3 bg-background">
        <div className="flex justify-start gap-2">
          <div className="w-7 h-7 bg-accent border border-border rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <Brain size={13} className="text-foreground" />
          </div>
          <div className="bg-card border border-border rounded-xl px-3 py-2.5 max-w-[85%]">
            <div className="flex items-center gap-1 mb-1">
              <Sparkles size={10} className="text-secondary" />
              <span className="text-xs font-bold text-secondary">Haven AI</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">Hi! I can answer general health questions — no account needed. Try a question below or use the floating chat button!</p>
          </div>
        </div>

        {messages.map((m, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-end">
              <div className="bg-[#1a1a2e] text-white rounded-xl px-3 py-2 max-w-[80%] text-sm">{m.q}</div>
            </div>
            {m.a ? (
              <div className="flex justify-start gap-2">
                <div className="w-7 h-7 bg-accent border border-border rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Brain size={13} className="text-foreground" />
                </div>
                <div className="bg-card border border-border rounded-xl px-3 py-2.5 max-w-[85%]">
                  <div className="flex items-center gap-1 mb-1">
                    <Sparkles size={10} className="text-secondary" />
                    <span className="text-xs font-bold text-secondary">Haven AI</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{m.a}</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-start gap-2">
                <div className="w-7 h-7 bg-accent border border-border rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Brain size={13} className="text-foreground" />
                </div>
                <div className="bg-card border border-border rounded-xl px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 150, 300].map(d => (
                      <span key={d} className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Quick questions */}
      <div className="px-4 py-3 border-t border-border bg-background">
        <p className="text-xs text-muted-foreground mb-2 font-medium">Try asking:</p>
        <div className="flex flex-wrap gap-1.5">
          {DEMO_QA.map(([q], i) => (
            <button key={i} onClick={() => ask(i)}
              className={`px-2.5 py-1 rounded-full text-xs transition-all border ${
                asked.has(i)
                  ? 'bg-[#1a1a2e] text-white border-transparent'
                  : 'border-border text-secondary hover:border-foreground/40 hover:text-foreground'
              }`}>
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Sign in nudge */}
      <div className="px-4 py-3 border-t border-border bg-card flex items-center gap-2.5">
        <Lock size={13} className="text-primary flex-shrink-0" />
        <p className="text-xs text-secondary flex-1">Sign in to unlock personalized insights from your records</p>
        <Link to="/select-account"
          className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-bold hover:opacity-90 transition-opacity whitespace-nowrap">
          Sign In <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  );
}

const features = [
  { icon: Lock, title: 'End-to-End Encryption', description: 'Records encrypted before leaving your device. Zero-knowledge architecture means only you have access.', iconBg: 'bg-primary', iconColor: 'text-primary-foreground' },
  { icon: Brain, title: 'AI Health Assistant', description: 'Personalized insights powered by your complete encrypted health history.', iconBg: 'bg-accent', iconColor: 'text-primary' },
  { icon: UserCheck, title: 'Doctor Collaboration', description: 'Share records securely with time-limited, revocable access. Full audit trail.', iconBg: 'bg-[var(--doctor-note-bg)]', iconColor: 'text-[var(--doctor-note)]' },
  { icon: Users, title: 'Patient Ownership', description: 'You own your data. Export anytime, delete anytime. No lock-in, ever.', iconBg: 'bg-accent', iconColor: 'text-primary' },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-card/90 border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/"><HavenLogo size="md" /></Link>

            <div className="hidden md:flex items-center gap-3">
              <Link to="/select-account"
                className="px-4 py-2 text-sm font-semibold text-secondary hover:text-foreground transition-colors">
                Sign In
              </Link>
              <Link to="/select-account"
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-[var(--radius-button)] hover:bg-[var(--primary-hover)] transition-colors font-semibold text-sm shadow-sm">
                Get Started Free
              </Link>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-foreground hover:bg-accent transition-colors">
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-border bg-card">
            <div className="px-6 py-5 space-y-1">
              {['Features', 'Security', 'AI Assistant'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 text-sm font-medium text-secondary hover:text-foreground transition-colors">
                  {item}
                </a>
              ))}
              <div className="pt-4 space-y-2 border-t border-border mt-4">
                <Link to="/select-account" onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 text-center text-sm font-semibold text-secondary hover:text-foreground border border-border rounded-[var(--radius-button)] hover:bg-accent transition-colors">
                  Sign In
                </Link>
                <Link to="/select-account" onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 bg-primary text-primary-foreground rounded-[var(--radius-button)] text-center font-semibold text-sm">
                  Get Started Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-primary rounded-[var(--radius-pill)] text-sm font-semibold mb-8 border border-border">
              <Zap size={14} className="text-primary" />
              Encrypted · Private · Yours
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
              Your Health Data.<br />
              <span className="text-primary">Your Control.</span>
            </h1>
            <p className="text-lg text-secondary mb-10 leading-relaxed max-w-xl">
              Haven gives you a private, encrypted vault for all your health records — with AI-powered guidance and secure collaboration with your care team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/select-account"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-[var(--radius-button)] hover:bg-[var(--primary-hover)] transition-colors font-bold text-center shadow-sm">
                Create Free Account
              </Link>
              <a href="#ai-assistant"
                className="px-8 py-4 bg-card border-2 border-border text-secondary rounded-[var(--radius-button)] hover:bg-accent hover:border-primary/30 transition-all font-semibold flex items-center justify-center gap-2">
                <Sparkles size={18} className="text-primary" />
                Try AI Assistant
              </a>
            </div>
          </motion.div>

          {/* Hero Card */}
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }} className="relative">
            <div className="bg-card rounded-[var(--radius-card)] p-8 border border-border shadow-lg">
              <div className="flex items-center justify-between mb-6 pb-5 border-b border-border">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Health Vault</p>
                  <p className="font-bold text-foreground">Jane's Records</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-accent rounded-[var(--radius-pill)]">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-primary">Unlocked</span>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Lock, label: 'Encrypted Health Vault', sub: 'Zero-knowledge · 47 records', bg: 'bg-primary', iconC: 'text-white' },
                  { icon: Brain, label: 'AI Health Assistant', sub: 'Private · On your data', bg: 'bg-accent', iconC: 'text-primary' },
                  { icon: UserCheck, label: 'Secure Doctor Access', sub: '2 active shares · Time-limited', bg: 'bg-[var(--doctor-note-bg)]', iconC: 'text-[var(--doctor-note)]' },
                  { icon: Activity, label: 'Health Score', sub: '87/100 · Great Progress', bg: 'bg-accent', iconC: 'text-primary' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border hover:border-primary/30 transition-colors">
                    <div className={`w-10 h-10 ${item.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={item.iconC} size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent rounded-full opacity-50 blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-primary/10 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-10 md:py-18">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Everything You Need</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-5 tracking-tight">
              Healthcare, Reimagined
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Privacy-first technology that puts patients back in control of their health data.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-card rounded-[var(--radius-card)] p-7 border border-border hover:border-primary/40 hover:shadow-md transition-all group">
                <div className={`w-12 h-12 ${f.iconBg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <f.icon className={f.iconColor} size={22} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{f.title}</h3>
                <p className="text-secondary leading-relaxed text-sm">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section id="ai-assistant" className="py-20 md:py-28 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: description */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-primary rounded-[var(--radius-pill)] text-sm font-semibold mb-6 border border-border">
                <Sparkles size={14} />
                AI Health Assistant — Free Preview
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-5 tracking-tight">
                Ask a Health Question.<br />
                <span className="text-primary">Right Now.</span>
              </h2>
              <p className="text-lg text-secondary mb-8 leading-relaxed">
                No account needed. Get instant, evidence-based answers to your general health questions from Haven AI.
              </p>

              {/* Guest vs Personal comparison */}
              <div className="space-y-4 mb-8">
                <div className="bg-background rounded-xl border border-border p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 bg-[#111184] rounded-lg flex items-center justify-center">
                      <Brain size={14} className="text-white" />
                    </div>
                    <span className="font-bold text-foreground text-sm">Guest Mode</span>
                    <span className="ml-auto px-2 py-0.5 bg-accent text-secondary rounded-full text-xs font-semibold">Free</span>
                  </div>
                  <ul className="space-y-1.5">
                    {['General health & wellness Q&A', 'Evidence-based educational guidance', 'No account required'].map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm text-secondary">
                        <CheckCircle2 size={14} className="text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary/5 rounded-xl border border-primary/20 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                      <Brain size={14} className="text-white" />
                    </div>
                    <span className="font-bold text-foreground text-sm">Personal AI (Signed In)</span>
                    <span className="ml-auto px-2 py-0.5 bg-primary text-primary-foreground rounded-full text-xs font-semibold">Premium</span>
                  </div>
                  <ul className="space-y-1.5">
                    {['Answers based on your own records', 'Medication reminders & lab insights', 'Your full health history in context', 'Personalized recommendations'].map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm text-secondary">
                        <CheckCircle2 size={14} className="text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link to="/patient/signup"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-[var(--radius-button)] hover:bg-[var(--primary-hover)] transition-colors font-bold shadow-sm">
                Unlock Personal AI — Free
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Right: interactive demo */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <InlineAIDemo />
              <p className="text-xs text-muted-foreground text-center mt-3">
                This is a preview — sign in to access your personal AI with full record context.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Zero-Knowledge</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-5 tracking-tight">
              Built For Privacy, First
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Your health data is encrypted on your device. Not even Haven can read your records.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'You Encrypt', desc: 'Data encrypted on your device before it ever leaves' },
              { step: '02', title: 'We Store', desc: 'Encrypted data stored with bank-grade security infrastructure' },
              { step: '03', title: 'You Control', desc: 'Only your key can decrypt. Grant and revoke access instantly.' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <span className="text-lg font-bold text-primary-foreground">{item.step}</span>
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">{item.title}</h4>
                <p className="text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-primary rounded-[var(--radius-card)] p-12 md:p-16 shadow-lg">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-5 tracking-tight">
              Start Owning Your Health Data
            </h2>
            <p className="text-lg text-primary-foreground/75 mb-10 max-w-xl mx-auto leading-relaxed">
              Join over 250,000 patients who trust Haven to keep their health records private, secure, and accessible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/patient/signup"
                className="px-8 py-4 bg-white text-primary rounded-[var(--radius-button)] hover:bg-accent font-bold transition-colors shadow-sm">
                Create Free Account
              </Link>
              <Link to="/doctor/signup"
                className="px-8 py-4 bg-primary-foreground/10 text-primary-foreground border-2 border-primary-foreground/20 rounded-[var(--radius-button)] hover:bg-primary-foreground/20 font-semibold transition-colors">
                Healthcare Provider?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <HavenLogo size="sm" />
              <p className="text-sm text-secondary mt-4 leading-relaxed max-w-xs">
                Your health record. Private, encrypted, and always yours.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-xs font-medium text-muted-foreground">99.9% uptime · HIPAA compliant</span>
              </div>
            </div>

            {[
              { title: 'Product', links: ['Features', 'Security', 'AI Assistant', 'Pricing', 'Changelog'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Security', 'Compliance'] },
            ].map((col) => (
              <div key={col.title}>
                <h5 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wide">{col.title}</h5>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-secondary hover:text-foreground transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">&copy; 2026 Haven Health Technologies. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link to="/admin/signin" className="text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating AI chat — auto guest mode since no one is signed in on landing page */}
      <AIChatPopup bottomOffset="bottom-8" />
    </div>
  );
}
