import { Link, useLocation } from 'react-router';
import { Home, FileText, Brain, Share2, User } from 'lucide-react';
import AIChatPopup from './AIChatPopup';

interface PatientLayoutProps {
  children: React.ReactNode;
}

export default function PatientLayout({ children }: PatientLayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: '/patient/dashboard', icon: Home, label: 'Home' },
    { path: '/patient/records', icon: FileText, label: 'Records' },
    { path: '/patient/ai', icon: Brain, label: 'AI' },
    { path: '/patient/sharing', icon: Share2, label: 'Sharing' },
    { path: '/patient/profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Main Content */}
      <div className="max-w-2xl mx-auto">
        {children}
      </div>

      {/* AI Chat Popup */}
      <AIChatPopup />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-md z-40">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            {navItems.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex flex-col items-center gap-1 py-2 px-3 min-w-[56px] transition-colors rounded-xl ${
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-secondary'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-accent' : ''}`}>
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span className="text-[11px] font-semibold">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
