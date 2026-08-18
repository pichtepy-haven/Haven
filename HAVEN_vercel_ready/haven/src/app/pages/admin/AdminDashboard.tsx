import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Shield, Users, Stethoscope, Activity, AlertTriangle, CheckCircle2, Clock, Bell, Search, MoreHorizontal, LogOut, Database, FileText, TrendingUp } from 'lucide-react';
import HavenLogo from '../../components/HavenLogo';

const pendingVerifications = [
  { id: 1, name: 'Dr. Emily Torres', specialty: 'Neurology', institution: 'Metro Medical Center', license: 'MD-9284012', submitted: '2 hours ago', status: 'Pending' },
  { id: 2, name: 'Dr. James Okafor', specialty: 'Pediatrics', institution: 'City Children\'s Hospital', license: 'MD-7162834', submitted: '5 hours ago', status: 'Pending' },
  { id: 3, name: 'Dr. Aisha Rahman', specialty: 'Cardiology', institution: 'Northeast General', license: 'MD-4839201', submitted: 'Yesterday', status: 'Under Review' },
];

const recentUsers = [
  { id: 1, name: 'Jane Doe', role: 'Patient', joined: '1 hour ago', records: 12, status: 'Active' },
  { id: 2, name: 'Dr. Sarah Johnson', role: 'Provider', joined: '3 hours ago', patients: 4, status: 'Active' },
  { id: 3, name: 'Marcus Hill', role: 'Patient', joined: 'Yesterday', records: 31, status: 'Active' },
  { id: 4, name: 'Dr. Michael Chen', role: 'Provider', joined: '2 days ago', patients: 7, status: 'Active' },
  { id: 5, name: 'Priya Patel', role: 'Patient', joined: '3 days ago', records: 8, status: 'Active' },
];

const systemAlerts = [
  { type: 'warning', message: '2 provider licenses expire in 30 days', time: '10 min ago' },
  { type: 'info', message: 'System backup completed successfully', time: '2 hours ago' },
  { type: 'success', message: 'All encryption certificates valid', time: '4 hours ago' },
];

const stats = [
  { label: 'Total Patients', value: '1,284', change: '+12 today', icon: Users, colorBg: 'bg-blue-50', colorIcon: 'text-blue-500' },
  { label: 'Verified Providers', value: '47', change: '+2 this week', icon: Stethoscope, colorBg: 'bg-[var(--doctor-note-bg)]', colorIcon: 'text-[var(--doctor-note)]' },
  { label: 'Pending Approvals', value: '3', change: 'Needs review', icon: Clock, colorBg: 'bg-[var(--warning-bg)]', colorIcon: 'text-[var(--warning)]' },
  { label: 'Records Stored', value: '28,491', change: '+156 today', icon: Database, colorBg: 'bg-accent', colorIcon: 'text-primary' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <HavenLogo size="sm" />
            <span className="px-2.5 py-1 bg-[var(--destructive-bg)] text-destructive rounded-[var(--radius-pill)] text-xs font-bold border border-destructive/20">
              Admin
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="relative p-2.5 text-secondary hover:text-foreground hover:bg-accent rounded-xl transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--warning)] rounded-full border border-card"></span>
            </button>
            <div className="w-10 h-10 bg-[var(--destructive-bg)] rounded-xl flex items-center justify-center border border-destructive/20">
              <Shield className="text-destructive" size={18} />
            </div>
            <Link to="/"
              className="flex items-center gap-2 px-3 py-2 text-sm text-secondary hover:text-foreground hover:bg-accent rounded-xl transition-colors font-semibold">
              <LogOut size={15} />
              Sign Out
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Welcome */}
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Admin Console</p>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">System Overview</h1>
          <p className="text-sm text-secondary mt-1">Haven Health Platform · All regions · Last updated just now</p>
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
              <div className="text-xs text-primary mt-0.5 font-medium">{stat.change}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Pending Verifications */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card rounded-[var(--radius-card)] border border-border overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <h2 className="font-bold text-foreground">Provider Verifications</h2>
                  <span className="px-2 py-0.5 bg-[var(--warning-bg)] text-[var(--warning)] rounded-[var(--radius-pill)] text-xs font-bold">
                    {pendingVerifications.length} pending
                  </span>
                </div>
                <button className="text-sm text-primary hover:underline font-semibold">View all</button>
              </div>
              <div className="divide-y divide-border">
                {pendingVerifications.map((doc) => (
                  <div key={doc.id} className="px-6 py-4 hover:bg-accent/30 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[var(--doctor-note-bg)] rounded-xl flex items-center justify-center flex-shrink-0">
                          <Stethoscope className="text-[var(--doctor-note)]" size={16} />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.specialty} · {doc.institution}</p>
                          <p className="text-xs text-secondary font-mono mt-0.5">{doc.license}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`px-2.5 py-1 rounded-[var(--radius-pill)] text-xs font-bold ${
                          doc.status === 'Pending'
                            ? 'bg-[var(--warning-bg)] text-[var(--warning)]'
                            : 'bg-accent text-primary border border-primary/20'
                        }`}>
                          {doc.status}
                        </span>
                        <button className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors text-primary">
                          <CheckCircle2 size={15} />
                        </button>
                        <button className="w-8 h-8 bg-[var(--destructive-bg)] rounded-lg flex items-center justify-center hover:bg-destructive hover:text-white transition-colors text-destructive">
                          <AlertTriangle size={15} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 ml-13">Submitted {doc.submitted}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Users */}
            <div className="bg-card rounded-[var(--radius-card)] border border-border overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                <h2 className="font-bold text-foreground">Recent Users</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                  <input className="pl-8 pr-4 py-1.5 text-sm bg-background border border-input rounded-[var(--radius-input)] text-foreground focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground w-40 transition-colors"
                    placeholder="Search users..." />
                </div>
              </div>
              <div className="divide-y divide-border">
                {recentUsers.map((user) => (
                  <div key={user.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-accent/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        user.role === 'Provider' ? 'bg-[var(--doctor-note-bg)]' : 'bg-accent'
                      }`}>
                        {user.role === 'Provider'
                          ? <Stethoscope className="text-[var(--doctor-note)]" size={15} />
                          : <Users className="text-primary" size={15} />
                        }
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.role} · Joined {user.joined}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-secondary font-medium hidden sm:block">
                        {user.role === 'Patient' ? `${user.records} records` : `${user.patients} patients`}
                      </span>
                      <span className="px-2.5 py-1 bg-accent text-primary border border-primary/20 rounded-[var(--radius-pill)] text-xs font-bold">
                        {user.status}
                      </span>
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-5">
            {/* System Alerts */}
            <div className="bg-card rounded-[var(--radius-card)] border border-border overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-border">
                <h2 className="font-bold text-foreground text-sm">System Alerts</h2>
              </div>
              <div className="divide-y divide-border">
                {systemAlerts.map((alert, i) => (
                  <div key={i} className="px-5 py-4 flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      alert.type === 'warning' ? 'bg-[var(--warning-bg)]' :
                      alert.type === 'success' ? 'bg-accent' : 'bg-blue-50'
                    }`}>
                      {alert.type === 'warning' && <AlertTriangle className="text-[var(--warning)]" size={13} />}
                      {alert.type === 'success' && <CheckCircle2 className="text-primary" size={13} />}
                      {alert.type === 'info' && <Activity className="text-blue-500" size={13} />}
                    </div>
                    <div>
                      <p className="text-xs text-foreground font-medium leading-relaxed">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-[var(--radius-card)] border border-border p-5 shadow-sm">
              <h2 className="font-bold text-foreground text-sm mb-4">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { label: 'Export User Report', icon: FileText },
                  { label: 'View Audit Logs', icon: Activity },
                  { label: 'System Settings', icon: Shield },
                  { label: 'Usage Analytics', icon: TrendingUp },
                ].map(({ label, icon: Icon }) => (
                  <button key={label}
                    className="w-full flex items-center gap-3 px-4 py-2.5 bg-background border border-border rounded-[var(--radius-input)] text-sm text-secondary font-semibold hover:bg-accent hover:border-primary/20 hover:text-primary transition-colors text-left">
                    <Icon size={15} className="text-muted-foreground" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Security Status */}
            <div className="bg-accent rounded-[var(--radius-card)] border border-border p-4">
              <div className="flex items-start gap-2.5">
                <Shield className="text-primary flex-shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="text-xs font-bold text-foreground mb-1">Security Status: Nominal</p>
                  <p className="text-xs text-secondary leading-relaxed">
                    All encryption keys valid. Zero unauthorized access attempts in the last 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
