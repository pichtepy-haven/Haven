import { Link } from 'react-router';
import { User, Stethoscope, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import HavenLogo from '../components/HavenLogo';

export default function AccountTypeSelection() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl"
      >
        {/* Logo */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center mb-8">
            <HavenLogo size="lg" />
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">
            Welcome to Haven
          </h1>
          <p className="text-secondary text-lg">
            How will you be using Haven today?
          </p>
        </div>

        {/* Account Type Cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {/* Patient */}
          <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400 }}>
            <div className="bg-card rounded-[var(--radius-card)] p-8 border-2 border-border hover:border-primary transition-all shadow-sm hover:shadow-md">
              <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mb-6">
                <User className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Patient</h3>
              <p className="text-secondary text-sm leading-relaxed mb-7">
                Manage your personal health records with AI-powered guidance and secure doctor sharing.
              </p>
              <div className="space-y-2.5">
                <Link to="/patient/signin"
                  className="block w-full px-5 py-3 bg-primary text-primary-foreground rounded-[var(--radius-button)] text-center font-semibold text-sm hover:bg-[var(--primary-hover)] transition-colors">
                  Sign In
                </Link>
                <Link to="/patient/signup"
                  className="block w-full px-5 py-3 bg-accent border border-border text-secondary rounded-[var(--radius-button)] text-center font-semibold text-sm hover:border-primary/30 transition-colors">
                  Create Account
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Healthcare Provider */}
          <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400 }}>
            <div className="bg-card rounded-[var(--radius-card)] p-8 border-2 border-border hover:border-[var(--doctor-note)] transition-all shadow-sm hover:shadow-md">
              <div className="w-14 h-14 bg-[var(--doctor-note-bg)] rounded-2xl flex items-center justify-center mb-6">
                <Stethoscope className="text-[var(--doctor-note)]" size={28} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Healthcare Provider</h3>
              <p className="text-secondary text-sm leading-relaxed mb-7">
                Review patient-shared records and collaborate on care with verified secure access.
              </p>
              <div className="space-y-2.5">
                <Link to="/doctor/signin"
                  className="block w-full px-5 py-3 bg-[var(--doctor-note)] text-white rounded-[var(--radius-button)] text-center font-semibold text-sm hover:opacity-90 transition-opacity">
                  Sign In
                </Link>
                <Link to="/doctor/signup"
                  className="block w-full px-5 py-3 bg-accent border border-border text-secondary rounded-[var(--radius-button)] text-center font-semibold text-sm hover:border-primary/30 transition-colors">
                  Apply for Access
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Back + Admin link */}
        <div className="flex items-center justify-between px-1">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-secondary hover:text-foreground transition-colors">
            <ArrowLeft size={16} />
            Back to home
          </Link>
          <Link to="/admin/signin" className="text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors">
            Admin access
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
