import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Eye, EyeOff, Stethoscope, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import HavenLogo from '../../components/HavenLogo';

export default function DoctorSignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn('doctor', 'Dr. Sarah Johnson', formData.email);
    navigate('/doctor/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="w-full max-w-md">
        <Link to="/select-account"
          className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={16} />Back
        </Link>

        <div className="mb-8">
          <Link to="/" className="inline-flex items-center mb-6">
            <HavenLogo size="md" />
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[var(--doctor-note-bg)] rounded-2xl flex items-center justify-center">
              <Stethoscope className="text-[var(--doctor-note)]" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">Provider Portal</h1>
              <p className="text-sm text-muted-foreground">Healthcare professional access</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-[var(--radius-card)] p-7 border border-border shadow-sm space-y-5">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Professional Email</label>
            <input type="email" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-input-background border border-input rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground transition-colors"
              placeholder="dr.smith@hospital.org" required />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-foreground">Password</label>
              <a href="#" className="text-sm text-primary hover:underline font-medium">Forgot password?</a>
            </div>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-input-background border border-input rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground pr-12 transition-colors"
                placeholder="••••••••" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button type="submit"
            className="w-full px-6 py-3.5 bg-primary text-primary-foreground rounded-[var(--radius-button)] hover:bg-[var(--primary-hover)] transition-colors font-bold shadow-sm">
            Sign In
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-secondary">
          New to Haven?{' '}
          <Link to="/doctor/signup" className="text-primary hover:underline font-semibold">Apply for access</Link>
        </p>
      </motion.div>
    </div>
  );
}
