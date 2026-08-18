import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Stethoscope, Users, FileText, Bell, Clock, ChevronRight, Search, Activity, Shield } from 'lucide-react';
import HavenLogo from '../../components/HavenLogo';

const sharedPatients = [
  { id: 1, name: 'Jane Doe', age: 34, condition: 'Hypertension', records: 12, lastShared: '2 hours ago', status: 'Active', avatar: 'JD' },
  { id: 2, name: 'Marcus Hill', age: 58, condition: 'Type 2 Diabetes', records: 31, lastShared: 'Yesterday', status: 'Active', avatar: 'MH' },
  { id: 3, name: 'Priya Patel', age: 27, condition: 'Asthma', records: 8, lastShared: '3 days ago', status: 'Active', avatar: 'PP' },
  { id: 4, name: 'Robert Kim', age: 45, condition: 'High Cholesterol', records: 5, lastShared: '1 week ago', status: 'Pending', avatar: 'RK' },
];

const recentActivity = [
  { patient: 'Jane Doe', action: 'Added blood pressure reading — 120/80', time: '2 hours ago' },
  { patient: 'Marcus Hill', action: 'New HbA1c lab results uploaded', time: '5 hours ago' },
  { patient: 'Priya Patel', action: 'Shared Ventolin inhaler prescription', time: 'Yesterday' },
];

const stats = [
  { label: 'Active Patients', value: '4', icon: Users, colorBg: 'bg-accent', colorIcon: 'text-primary' },
  { label: 'Pending Requests', value: '1', icon: Clock, colorBg: 'bg-[var(--warning-bg)]', colorIcon: 'text-[var(--warning)]' },
  { label: 'Records Viewed', value: '56', icon: FileText, colorBg: 'bg-blue-50', colorIcon: 'text-blue-600' },
  { label: 'Expiring Soon', value: '2', icon: Bell, colorBg: 'bg-red-50', colorIcon: 'text-red-500' },
];

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <HavenLogo size="sm" />
            <span className="px-2.5 py-1 bg-[var(--doctor-note-bg)] text-[var(--doctor-note)] rounded-[var(--radius-pill)] text-xs font-bold border border-[var(--doctor-note)]/20">
              Provider
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="relative p-2.5 text-secondary hover:text-foreground hover:bg-accent rounded-xl transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border border-card"></span>
            </button>
            <div className="w-10 h-10 bg-[var(--doctor-note-bg)] rounded-xl flex items-center justify-center border border-[var(--doctor-note)]/20">
              <Stethoscope className="text-[var(--doctor-note)]" size={18} />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Welcome */}
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Welcome back</p>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Dr. Sarah Johnson</h1>
          <p className="text-sm text-secondary mt-1">Cardiology · City General Hospital · License MD-2847319</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <motion.div key={stat.label} whileHover={{ y: -2 }}
              className="bg-card rounded-[var(--radius-card)] p-5 border border-border shadow-sm">
              <div className={`w-10 h-10 ${stat.colorBg} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className={stat.colorIcon} size={20} />
              </div>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs font-medium text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Patients Table */}
          <div className="md:col-span-2 bg-card rounded-[var(--radius-card)] border border-border overflow-hidden shadow-sm">
            <div className="px-6 py-5 border-b border-border flex items-center justify-between">
              <h2 className="font-bold text-foreground">Shared Patients</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
                <input className="pl-9 pr-4 py-2 text-sm bg-background border border-input rounded-[var(--radius-input)] text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground w-44 transition-colors"
                  placeholder="Search patients..." />
              </div>
            </div>
            <div className="divide-y divide-border">
              {sharedPatients.map((p) => (
                <div key={p.id} className="px-6 py-4 flex items-center justify-between hover:bg-accent/30 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--doctor-note-bg)] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-[var(--doctor-note)]">{p.avatar}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.age}y · {p.condition}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-medium text-secondary">{p.records} records</p>
                      <p className="text-xs text-muted-foreground">{p.lastShared}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-[var(--radius-pill)] text-xs font-bold ${
                      p.status === 'Active' ? 'bg-accent text-primary border border-primary/20' : 'bg-[var(--warning-bg)] text-[var(--warning)]'
                    }`}>
                      {p.status}
                    </span>
                    <ChevronRight className="text-muted-foreground" size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-5">
            {/* Recent Activity */}
            <div className="bg-card rounded-[var(--radius-card)] border border-border overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-border">
                <h2 className="font-bold text-foreground text-sm">Recent Activity</h2>
              </div>
              <div className="divide-y divide-border">
                {recentActivity.map((a, i) => (
                  <div key={i} className="px-5 py-4">
                    <p className="text-sm font-semibold text-foreground">{a.patient}</p>
                    <p className="text-xs text-secondary mt-0.5 leading-relaxed">{a.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{a.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-accent rounded-[var(--radius-card)] border border-border p-4">
              <div className="flex items-start gap-2.5">
                <Shield className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-secondary leading-relaxed">
                  All patient data is end-to-end encrypted. You can only access records patients have explicitly shared with you.
                </p>
              </div>
            </div>

            {/* Sign Out */}
            <div className="bg-card rounded-[var(--radius-card)] border border-border p-5 shadow-sm">
              <p className="text-xs text-muted-foreground mb-3 font-medium">Logged in as Dr. Sarah Johnson</p>
              <Link to="/"
                className="block w-full text-center px-4 py-2.5 bg-background border border-border text-secondary rounded-[var(--radius-button)] font-semibold hover:bg-accent transition-colors text-sm">
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
