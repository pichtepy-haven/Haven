import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Eye, EyeOff, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import HavenLogo from '../../components/HavenLogo';

export default function PatientSignUp() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', confirmPassword: '', acceptTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn('patient', formData.fullName || 'Jane Doe', formData.email);
    navigate('/patient/dashboard');
  };

  const passwordStrength = formData.password.length >= 8 ? formData.password.length >= 12 ? 'strong' : 'medium' : formData.password.length > 0 ? 'weak' : null;

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
          <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">Create your account</h1>
          <p className="text-secondary">Start managing your health records securely</p>
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap gap-3 mb-6">
          {['Free forever', 'End-to-end encrypted', 'No credit card'].map((b) => (
            <div key={b} className="flex items-center gap-1.5 text-xs text-secondary">
              <CheckCircle2 size={13} className="text-primary" />
              <span className="font-medium">{b}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card rounded-[var(--radius-card)] p-7 border border-border shadow-sm space-y-5">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
            <input type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3 bg-input-background border border-input rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground transition-colors"
              placeholder="Jane Doe" required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
            <input type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-input-background border border-input rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground transition-colors"
              placeholder="jane@example.com" required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-input-background border border-input rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground pr-12 transition-colors"
                placeholder="Minimum 8 characters" required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {passwordStrength && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-1 flex-1">
                  {['weak', 'medium', 'strong'].map((level, i) => (
                    <div key={level} className={`h-1.5 flex-1 rounded-full transition-colors ${
                      passwordStrength === 'weak' && i === 0 ? 'bg-destructive' :
                      passwordStrength === 'medium' && i <= 1 ? 'bg-[var(--warning)]' :
                      passwordStrength === 'strong' ? 'bg-primary' : 'bg-border'
                    }`} />
                  ))}
                </div>
                <span className={`text-xs font-medium capitalize ${
                  passwordStrength === 'weak' ? 'text-destructive' :
                  passwordStrength === 'medium' ? 'text-[var(--warning)]' : 'text-primary'
                }`}>{passwordStrength}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Confirm Password</label>
            <div className="relative">
              <input type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 bg-input-background border border-input rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground pr-12 transition-colors"
                placeholder="••••••••" required
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input type="checkbox" id="terms"
              checked={formData.acceptTerms}
              onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
              className="mt-1 w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-primary accent-primary"
              required
            />
            <label htmlFor="terms" className="text-sm text-secondary leading-relaxed">
              I agree to the{' '}
              <a href="#" className="text-primary hover:underline font-medium">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-primary hover:underline font-medium">Privacy Policy</a>
            </label>
          </div>

          <button type="submit"
            className="w-full px-6 py-3.5 bg-primary text-primary-foreground rounded-[var(--radius-button)] hover:bg-[var(--primary-hover)] transition-colors font-bold text-base shadow-sm">
            Create Account
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-secondary">
          Already have an account?{' '}
          <Link to="/patient/signin" className="text-primary hover:underline font-semibold">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
