import { useState } from 'react';
import { User, Shield, Bell, Smartphone, Key, Download, Trash2, ChevronRight, Lock, LogOut, Globe, Heart, Activity, Camera } from 'lucide-react';
import PatientLayout from '../../components/PatientLayout';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

interface ToggleProps { checked: boolean; onChange: () => void; }

function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button onClick={onChange}
      className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${checked ? 'bg-primary' : 'bg-border'}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  );
}

function SettingsRow({ icon: Icon, title, desc, chevron = true, danger = false, onClick }: {
  icon: React.ElementType; title: string; desc: string; chevron?: boolean; danger?: boolean; onClick?: () => void;
}) {
  return (
    <button onClick={onClick}
      className={`w-full px-5 py-4 flex items-center justify-between transition-colors ${danger ? 'hover:bg-destructive/5' : 'hover:bg-accent/50'}`}>
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${danger ? 'bg-destructive/10' : 'bg-accent'}`}>
          <Icon className={danger ? 'text-destructive' : 'text-primary'} size={18} />
        </div>
        <div className="text-left">
          <div className={`font-semibold text-sm ${danger ? 'text-destructive' : 'text-foreground'}`}>{title}</div>
          <div className="text-xs text-muted-foreground">{desc}</div>
        </div>
      </div>
      {chevron && <ChevronRight className={danger ? 'text-destructive' : 'text-muted-foreground'} size={18} />}
    </button>
  );
}

export default function PatientProfile() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [notifications, setNotifications] = useState({ push: true, email: true, sms: false, reminders: true });
  const [showPersonal, setShowPersonal] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);

  const handleSignOut = () => { signOut(); navigate('/'); };

  return (
    <PatientLayout>
      <div className="px-6 py-8 space-y-6">
        {/* Profile Header */}
        <div className="bg-card rounded-[var(--radius-card)] border border-border p-7 shadow-sm text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center border-4 border-card shadow-sm">
              <User className="text-primary" size={40} />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-card shadow">
              <Camera className="text-primary-foreground" size={14} />
            </button>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight mb-0.5">Jane Doe</h1>
          <p className="text-sm text-muted-foreground">jane.doe@gmail.com</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-muted-foreground">Vault Unlocked · Member since Jan 2025</span>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-6 pt-6 border-t border-border">
            {[
              { value: '47', label: 'Records' },
              { value: '2', label: 'Shares' },
              { value: '87', label: 'Score' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Health Profile Quick View */}
        <div className="bg-card rounded-[var(--radius-card)] border border-border p-5 shadow-sm">
          <h2 className="font-bold text-foreground mb-4">Health Profile</h2>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'Blood Type', value: 'A+', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
              { label: 'Height', value: "5'6\"", icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50' },
              { label: 'Weight', value: '145 lbs', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-50' },
            ].map((item) => (
              <div key={item.label} className="bg-background rounded-xl p-3 text-center border border-border">
                <div className={`w-8 h-8 ${item.bg} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <item.icon className={item.color} size={16} />
                </div>
                <p className="font-bold text-foreground text-sm">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-border last:border-0">
              <span className="text-muted-foreground font-medium">Date of Birth</span>
              <span className="text-foreground font-semibold">March 14, 1992</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground font-medium">Phone</span>
              <span className="text-foreground font-semibold">+1 (555) 234-7890</span>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-card rounded-[var(--radius-card)] border border-border overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-bold text-foreground">Personal Information</h2>
          </div>
          <div className="divide-y divide-border">
            <button onClick={() => setShowPersonal(!showPersonal)}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center">
                  <User className="text-primary" size={18} />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground text-sm">Profile Details</div>
                  <div className="text-xs text-muted-foreground">Name, DOB, address, insurance</div>
                </div>
              </div>
              <ChevronRight className={`text-muted-foreground transition-transform ${showPersonal ? 'rotate-90' : ''}`} size={18} />
            </button>

            {showPersonal && (
              <div className="px-5 py-4 space-y-3 bg-background">
                {[
                  { label: 'Full Name', value: 'Jane Doe' },
                  { label: 'Email', value: 'jane.doe@gmail.com' },
                  { label: 'Phone', value: '+1 (555) 234-7890' },
                  { label: 'Date of Birth', value: 'March 14, 1992' },
                  { label: 'Address', value: '142 Maple Street, Austin, TX 78701' },
                  { label: 'Insurance', value: 'BlueCross BlueShield · #BCB-94820' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-4">
                    <span className="text-xs text-muted-foreground font-medium flex-shrink-0">{item.label}</span>
                    <span className="text-xs text-foreground font-semibold text-right">{item.value}</span>
                  </div>
                ))}
                <button className="text-sm text-primary font-semibold hover:underline mt-1">Edit information</button>
              </div>
            )}

            <button onClick={() => setShowEmergency(!showEmergency)}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center">
                  <Heart className="text-primary" size={18} />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground text-sm">Emergency Contacts</div>
                  <div className="text-xs text-muted-foreground">2 contacts added</div>
                </div>
              </div>
              <ChevronRight className={`text-muted-foreground transition-transform ${showEmergency ? 'rotate-90' : ''}`} size={18} />
            </button>

            {showEmergency && (
              <div className="px-5 py-4 space-y-3 bg-background">
                {[
                  { name: 'Robert Doe', relation: 'Spouse', phone: '+1 (555) 876-5432' },
                  { name: 'Carol Doe', relation: 'Mother', phone: '+1 (555) 321-0987' },
                ].map((c, i) => (
                  <div key={i} className="flex items-center justify-between bg-card rounded-xl p-3.5 border border-border">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.relation} · {c.phone}</p>
                    </div>
                    <button className="text-sm text-primary hover:underline font-semibold">Edit</button>
                  </div>
                ))}
                <button className="text-sm text-primary font-semibold hover:underline">+ Add contact</button>
              </div>
            )}
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-card rounded-[var(--radius-card)] border border-border overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-bold text-foreground">Privacy & Security</h2>
          </div>
          <div className="divide-y divide-border">
            <SettingsRow icon={Lock} title="Change PIN" desc="Update your 6-digit vault PIN" />
            <SettingsRow icon={Key} title="Recovery Phrase" desc="View or regenerate backup phrase" />
            <SettingsRow icon={Smartphone} title="Connected Devices" desc="3 devices · This iPhone (active)" />
            <SettingsRow icon={Shield} title="Biometric Authentication" desc="Face ID / Fingerprint enabled" />
            <SettingsRow icon={Globe} title="Privacy Settings" desc="Control data sharing & analytics" />
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-[var(--radius-card)] border border-border overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-bold text-foreground">Notifications</h2>
          </div>
          <div className="divide-y divide-border">
            {[
              { key: 'push' as const, label: 'Push Notifications', desc: 'Alerts on this device' },
              { key: 'email' as const, label: 'Email Notifications', desc: 'Sent to jane.doe@gmail.com' },
              { key: 'sms' as const, label: 'SMS Messages', desc: 'Sent to +1 (555) 234-7890' },
              { key: 'reminders' as const, label: 'Medication Reminders', desc: 'Daily dose reminders' },
            ].map((item) => (
              <div key={item.key} className="px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center">
                    <Bell className="text-primary" size={18} />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
                <Toggle checked={notifications[item.key]}
                  onChange={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))} />
              </div>
            ))}
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-card rounded-[var(--radius-card)] border border-border overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-bold text-foreground">Data Management</h2>
          </div>
          <div className="divide-y divide-border">
            <SettingsRow icon={Download} title="Export All Data" desc="Download your complete record (PDF/JSON)" />
            <SettingsRow icon={Trash2} title="Delete Account" desc="Permanently delete all your data" danger />
          </div>
        </div>

        {/* Sign Out */}
        <button onClick={handleSignOut}
          className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-card border border-border text-secondary rounded-[var(--radius-button)] font-semibold hover:bg-accent transition-colors shadow-sm">
          <LogOut size={18} />
          Sign Out
        </button>

        {/* App Info */}
        <div className="text-center py-3 space-y-2">
          <p className="text-xs text-muted-foreground">Haven Version 1.0.0 · Build 2026.06</p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <span>·</span>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}
