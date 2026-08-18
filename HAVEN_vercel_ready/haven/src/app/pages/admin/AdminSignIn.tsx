import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Eye, EyeOff, Shield, ArrowLeft } from 'lucide-react';
import HavenLogo from '../../components/HavenLogo';

export default function AdminSignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', mfaCode: '' });
  const [step, setStep] = useState<'credentials' | 'mfa'>('credentials');

  const handleCredentials = (e: React.FormEvent) => { e.preventDefault(); setStep('mfa'); };
  const handleMFA = (e: React.FormEvent) => { e.preventDefault(); navigate('/admin/dashboard'); };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="w-full max-w-md">
        <Link to="/"
          className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={16} />Return to Haven
        </Link>

        <div className="mb-8">
          <Link to="/" className="inline-flex items-center mb-6">
            <HavenLogo size="md" />
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center border border-border">
              <Shield className="text-secondary" size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">Admin Portal</h1>
              <p className="text-sm text-muted-foreground">Restricted · Authorized personnel only</p>
            </div>
          </div>
        </div>

        {step === 'credentials' ? (
          <form onSubmit={handleCredentials} className="bg-card rounded-[var(--radius-card)] p-7 border border-border shadow-sm space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Admin Email</label>
              <input type="email" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-input-background border border-input rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground transition-colors"
                placeholder="admin@haven.health" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-input-background border border-input rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground pr-12 transition-colors"
                  placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button type="submit"
              className="w-full px-6 py-3.5 bg-primary text-primary-foreground rounded-[var(--radius-button)] hover:bg-[var(--primary-hover)] transition-colors font-bold shadow-sm">
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={handleMFA} className="bg-card rounded-[var(--radius-card)] p-7 border border-border shadow-sm space-y-5">
            <div className="text-center mb-3">
              <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4 border border-border">
                <Shield className="text-primary" size={24} />
              </div>
              <p className="text-sm text-secondary font-medium">A 6-digit code has been sent to your registered authenticator app.</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2 text-center">Verification Code</label>
              <input type="text" value={formData.mfaCode}
                onChange={(e) => setFormData({ ...formData, mfaCode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                className="w-full px-4 py-4 bg-input-background border border-input rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground text-center tracking-[0.6em] text-2xl font-mono font-bold transition-colors"
                placeholder="000000" required maxLength={6} />
            </div>
            <button type="submit"
              className="w-full px-6 py-3.5 bg-primary text-primary-foreground rounded-[var(--radius-button)] hover:bg-[var(--primary-hover)] transition-colors font-bold shadow-sm">
              Verify & Sign In
            </button>
            <button type="button" onClick={() => setStep('credentials')}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
              ← Back to credentials
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
