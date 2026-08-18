import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Eye, EyeOff, Stethoscope, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import HavenLogo from '../../components/HavenLogo';

const specialties = [
  'General Practice', 'Cardiology', 'Dermatology', 'Endocrinology',
  'Gastroenterology', 'Neurology', 'Oncology', 'Orthopedics',
  'Pediatrics', 'Psychiatry', 'Radiology', 'Surgery', 'Other'
];

export default function DoctorSignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '',
    specialty: '', licenseNumber: '', institution: '', acceptTerms: false
  });

  const { signIn } = useAuth();
  const handleStep1 = (e: React.FormEvent) => { e.preventDefault(); setStep(2); };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn('doctor', formData.fullName || 'Dr. Sarah Johnson', formData.email);
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
              <h1 className="text-2xl font-bold text-foreground tracking-tight">Provider Registration</h1>
              <p className="text-sm text-muted-foreground">Apply for verified healthcare access</p>
            </div>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-7">
          {[{ num: 1, label: 'Account' }, { num: 2, label: 'Credentials' }].map((s, i) => (
            <div key={s.num} className="flex items-center gap-3 flex-1">
              <div className={`flex items-center gap-2 px-4 py-1.5 rounded-[var(--radius-pill)] text-sm font-bold flex-shrink-0 ${
                step > s.num ? 'bg-primary text-primary-foreground' :
                step === s.num ? 'bg-primary text-primary-foreground' : 'bg-accent text-muted-foreground'
              }`}>
                {step > s.num ? <CheckCircle2 size={15} /> : <span>{s.num}</span>}
                {s.label}
              </div>
              {i === 0 && <div className="h-px flex-1 bg-border"></div>}
            </div>
          ))}
        </div>

        {step === 1 ? (
          <form onSubmit={handleStep1} className="bg-card rounded-[var(--radius-card)] p-7 border border-border shadow-sm space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
              <input type="text" value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 bg-input-background border border-input rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground transition-colors"
                placeholder="Dr. James Smith" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Professional Email</label>
              <input type="email" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-input-background border border-input rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground transition-colors"
                placeholder="dr.smith@hospital.org" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-input-background border border-input rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground pr-12 transition-colors"
                  placeholder="Minimum 8 characters" required />
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
          <form onSubmit={handleSubmit} className="bg-card rounded-[var(--radius-card)] p-7 border border-border shadow-sm space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Medical Specialty</label>
              <select value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                className="w-full px-4 py-3 bg-input-background border border-input rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground transition-colors"
                required>
                <option value="">Select specialty...</option>
                {specialties.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Medical License Number</label>
              <input type="text" value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                className="w-full px-4 py-3 bg-input-background border border-input rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground transition-colors"
                placeholder="MD-1234567" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Hospital / Institution</label>
              <input type="text" value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full px-4 py-3 bg-input-background border border-input rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground transition-colors"
                placeholder="City General Hospital" required />
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" id="terms" checked={formData.acceptTerms}
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                className="mt-1 w-4 h-4 rounded border-input accent-primary" required />
              <label htmlFor="terms" className="text-sm text-secondary leading-relaxed">
                I confirm my credentials are accurate and agree to the{' '}
                <a href="#" className="text-primary hover:underline font-semibold">Provider Terms</a>
              </label>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)}
                className="flex-1 px-4 py-3 bg-accent border border-border text-secondary rounded-[var(--radius-button)] font-semibold hover:bg-muted transition-colors">
                Back
              </button>
              <button type="submit"
                className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-[var(--radius-button)] font-bold hover:bg-[var(--primary-hover)] transition-colors">
                Submit
              </button>
            </div>
            <p className="text-xs text-muted-foreground text-center">Accounts verified within 1–2 business days.</p>
          </form>
        )}

        <p className="text-center mt-6 text-sm text-secondary">
          Already have an account?{' '}
          <Link to="/doctor/signin" className="text-primary hover:underline font-semibold">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
