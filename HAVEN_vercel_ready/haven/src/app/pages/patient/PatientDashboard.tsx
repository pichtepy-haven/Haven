import { Link } from 'react-router';
import { FileText, Upload, MessageSquare, Share2, Heart, Activity, Droplet, Pill, AlertCircle, Plus, Calendar, TrendingUp, Bell, ChevronRight, Stethoscope } from 'lucide-react';
import { motion } from 'motion/react';
import PatientLayout from '../../components/PatientLayout';

const appointments = [
  { doctor: 'Dr. Michael Chen', specialty: 'General Practice', date: 'June 15, 2026', time: '10:30 AM', avatar: 'MC' },
  { doctor: 'Dr. Sarah Johnson', specialty: 'Cardiology', date: 'Sep 4, 2026', time: '2:00 PM', avatar: 'SJ' },
];

const medications = [
  { name: 'Lisinopril', dose: '10mg', frequency: 'Once daily · Morning', refillDue: 'Jun 20', colorBg: 'bg-blue-50', colorIcon: 'text-blue-600' },
  { name: 'Atorvastatin', dose: '20mg', frequency: 'Once daily · Evening', refillDue: 'Jul 5', colorBg: 'bg-purple-50', colorIcon: 'text-purple-600' },
  { name: 'Metformin', dose: '500mg', frequency: 'Twice daily · With meals', refillDue: 'Jun 28', colorBg: 'bg-teal-50', colorIcon: 'text-teal-600' },
];

const recentActivity = [
  { type: 'Lab Result', title: 'Complete Blood Count', date: 'Jun 3', icon: FileText, colorBg: 'bg-blue-50', colorIcon: 'text-blue-600' },
  { type: 'Vital Sign', title: 'Blood Pressure — 120/80', date: 'May 30', icon: Activity, colorBg: 'bg-pink-50', colorIcon: 'text-pink-600' },
  { type: 'Medication', title: 'Lisinopril prescription renewed', date: 'May 22', icon: Pill, colorBg: 'bg-purple-50', colorIcon: 'text-purple-600' },
  { type: 'Vaccination', title: 'Flu Shot 2026 administered', date: 'May 15', icon: Stethoscope, colorBg: 'bg-teal-50', colorIcon: 'text-teal-600' },
];

export default function PatientDashboard() {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <PatientLayout>
      <div className="px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{greeting}</p>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Jane Doe</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-muted-foreground">Vault Unlocked · 47 records</span>
            </div>
          </div>
          <button className="relative w-11 h-11 bg-card border border-border rounded-xl flex items-center justify-center hover:bg-accent transition-colors shadow-sm">
            <Bell size={18} className="text-secondary" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border border-card"></span>
          </button>
        </div>

        {/* Health Score Banner */}
        <div className="bg-primary rounded-[var(--radius-card)] p-6 text-primary-foreground shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/5 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground/5 rounded-full translate-y-8 -translate-x-4"></div>
          <div className="relative flex items-center justify-between mb-4">
            <div>
              <p className="text-primary-foreground/70 text-sm font-medium">Overall Health Score</p>
              <div className="flex items-end gap-2 mt-1">
                <span className="text-5xl font-bold">87</span>
                <span className="text-primary-foreground/60 text-sm mb-2">/ 100</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5 text-green-300 mb-1">
                <TrendingUp size={16} />
                <span className="text-sm font-semibold">+5 this month</span>
              </div>
              <p className="text-xs text-primary-foreground/50">Great Progress!</p>
            </div>
          </div>
          <div className="relative w-full bg-primary-foreground/20 rounded-full h-2">
            <div className="bg-primary-foreground rounded-full h-2" style={{ width: '87%' }}></div>
          </div>
          <p className="relative text-xs text-primary-foreground/50 mt-2">Based on 47 records · Updated today</p>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-base font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Plus, label: 'Add Record', to: '/patient/records' },
              { icon: Upload, label: 'Upload Lab', to: null },
              { icon: MessageSquare, label: 'Ask AI', to: '/patient/ai' },
              { icon: Share2, label: 'Share Records', to: '/patient/sharing' },
            ].map((action) => {
              const content = (
                <div className="flex items-center gap-3 p-4 bg-card rounded-[var(--radius-card)] border border-border hover:border-primary/40 hover:shadow-sm transition-all text-left">
                  <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    <action.icon className="text-primary" size={20} />
                  </div>
                  <span className="font-semibold text-foreground text-sm">{action.label}</span>
                </div>
              );
              return action.to ? (
                <Link key={action.label} to={action.to}>{content}</Link>
              ) : (
                <button key={action.label} className="text-left w-full">{content}</button>
              );
            })}
          </div>
        </div>

        {/* Health Snapshot */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-foreground">Health Snapshot</h2>
            <button className="text-sm text-primary font-semibold hover:underline">Trends</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Blood Pressure', value: '120/80', sub: 'Normal · Today', icon: Heart, colorBg: 'bg-red-50', colorIcon: 'text-red-500' },
              { label: 'Heart Rate', value: '72 bpm', sub: 'Normal · Today', icon: Activity, colorBg: 'bg-pink-50', colorIcon: 'text-pink-500' },
              { label: 'Weight', value: '145 lbs', sub: '↓ 2 lbs this month', icon: Droplet, colorBg: 'bg-blue-50', colorIcon: 'text-blue-500' },
              { label: 'Medications', value: '3', sub: 'Active prescriptions', icon: Pill, colorBg: 'bg-purple-50', colorIcon: 'text-purple-500' },
            ].map((item) => (
              <motion.div key={item.label} whileHover={{ scale: 1.02 }}
                className="bg-card rounded-[var(--radius-card)] p-4 border border-border shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 ${item.colorBg} rounded-lg flex items-center justify-center`}>
                    <item.icon className={item.colorIcon} size={16} />
                  </div>
                  <span className="text-xs font-semibold text-secondary">{item.label}</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{item.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Allergies Alert */}
        <div className="bg-[var(--warning-bg)] rounded-[var(--radius-card)] p-4 border border-[var(--warning)]/20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[var(--warning)] rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle className="text-white" size={18} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground text-sm mb-1.5">Known Allergies</h3>
              <div className="flex flex-wrap gap-2">
                {['Penicillin', 'Peanuts', 'Latex'].map((a) => (
                  <span key={a} className="px-2.5 py-1 bg-white text-[var(--warning)] rounded-[var(--radius-pill)] text-xs font-semibold border border-[var(--warning)]/20">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        {/* <div className="bg-card rounded-[var(--radius-card)] p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-foreground">Upcoming Appointments</h2>
            <button className="text-sm text-primary font-semibold hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {appointments.map((appt, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-background rounded-xl border border-border">
                <div className="w-10 h-10 bg-[var(--doctor-note-bg)] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-[var(--doctor-note)]">{appt.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{appt.doctor}</p>
                  <p className="text-xs text-muted-foreground">{appt.specialty}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-foreground">{appt.time}</p>
                  <p className="text-xs text-muted-foreground">{appt.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Active Medications */}
        {/* <div className="bg-card rounded-[var(--radius-card)] p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-foreground">Active Medications</h2>
            <button className="text-sm text-primary font-semibold hover:underline">Manage</button>
          </div>
          <div className="space-y-4">
            {medications.map((med, i) => (
              <div key={i} className="flex items-center gap-3 pb-4 last:pb-0 border-b border-border last:border-0">
                <div className={`w-10 h-10 ${med.colorBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Pill className={med.colorIcon} size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{med.name} <span className="text-muted-foreground font-normal">{med.dose}</span></p>
                  <p className="text-xs text-muted-foreground">{med.frequency}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-muted-foreground">Refill by</p>
                  <p className="text-xs font-bold text-foreground">{med.refillDue}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Latest Doctor Note */}
        {/* <div className="bg-[var(--doctor-note-bg)] rounded-[var(--radius-card)] p-5 border border-[var(--doctor-note)]/20">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-foreground text-sm">Latest Doctor Note</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Dr. Sarah Johnson · Cardiology</p>
            </div>
            <span className="text-xs text-muted-foreground bg-card px-2.5 py-1 rounded-[var(--radius-pill)] border border-border">2 days ago</span>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            Blood pressure stabilized at 120/80. Continue Lisinopril 10mg. Weight trending down — excellent progress. Follow up in 3 months or sooner if symptoms return.
          </p>
          <button className="mt-3 text-sm text-[var(--doctor-note)] font-semibold hover:underline flex items-center gap-1">
            View full note <ChevronRight size={14} />
          </button>
        </div> */}

        {/* Recent Activity */}
        <div className="bg-card rounded-[var(--radius-card)] p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-foreground">Recent Activity</h2>
            <Link to="/patient/records" className="text-sm text-primary font-semibold hover:underline">View all</Link>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-3 pb-4 last:pb-0 border-b border-border last:border-0">
                <div className={`w-10 h-10 ${item.colorBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <item.icon className={item.colorIcon} size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.type}</p>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}
