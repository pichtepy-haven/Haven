import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Eye, EyeOff, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import HavenLogo from '../../components/HavenLogo';

export default function PatientSignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn('patient', 'Jane Doe', formData.email);
    navigate('/patient/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Back */}
        <Link to="/select-account"
          className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={16} />
          Back
        </Link>

        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center mb-6">
            <HavenLogo size="md" />
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">Welcome back</h1>
          <p className="text-secondary">Sign in to your patient account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card rounded-[var(--radius-card)] p-7 border border-border shadow-sm space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">Email</label>
            <input
              type="email" id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-input-background border border-input rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground transition-colors"
              placeholder="jane@example.com" required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="text-sm font-semibold text-foreground">Password</label>
              <a href="#" className="text-sm text-primary hover:underline font-medium">Forgot password?</a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-input-background border border-input rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground pr-12 transition-colors"
                placeholder="••••••••" required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Vault PIN hint */}
          <div className="flex items-start gap-3 bg-accent rounded-xl p-3.5 border border-border">
            <Lock className="text-primary mt-0.5 flex-shrink-0" size={16} />
            <p className="text-xs text-secondary leading-relaxed">
              After signing in, you'll unlock your encrypted vault with your 6-digit PIN to access records.
            </p>
          </div>

          <button type="submit"
            className="w-full px-6 py-3.5 bg-primary text-primary-foreground rounded-[var(--radius-button)] hover:bg-[var(--primary-hover)] transition-colors font-bold text-base shadow-sm">
            Sign In
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-secondary">
          Don't have an account?{' '}
          <Link to="/patient/signup" className="text-primary hover:underline font-semibold">
            Create account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
