import { useState } from 'react';
import { UserCheck, Clock, Shield, QrCode, Link as LinkIcon, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PatientLayout from '../../components/PatientLayout';

type Tab = 'active' | 'pending' | 'history';

const activeShares = [
  { id: 1, doctorName: 'Dr. Sarah Johnson', specialty: 'Cardiology', institution: 'City General Hospital', recordCount: 12, expires: 'June 11, 2026', expiresIn: 'in 5 days', lastAccessed: '2 hours ago', scope: 'Read Only', recordTypes: ['Lab Results', 'Vitals', 'Doctor Notes'], avatar: 'SJ' },
  { id: 2, doctorName: 'Dr. Michael Chen', specialty: 'General Practice', institution: 'Westside Medical Clinic', recordCount: 47, expires: 'July 4, 2026', expiresIn: 'in 28 days', lastAccessed: '3 days ago', scope: 'Read & Notes', recordTypes: ['All Records'], avatar: 'MC' },
];

const pendingRequests = [
  { id: 1, doctorName: 'Dr. Emily Rodriguez', specialty: 'Dermatology', institution: 'Advanced Skin Care Center', requestedDate: 'Today, 9:42 AM', message: 'Requesting access to review skin condition records and allergy history for your upcoming consultation.', avatar: 'ER' },
  { id: 2, doctorName: 'Dr. Alan Park', specialty: 'Ophthalmology', institution: 'Vision First Clinic', requestedDate: 'Yesterday, 3:15 PM', message: 'Would like to review your general health history before your eye exam next week.', avatar: 'AP' },
];

const historyItems = [
  { id: 1, doctorName: 'Dr. James Wilson', specialty: 'Orthopedics', status: 'Expired', duration: '7 days', endDate: 'May 28, 2026', recordCount: 8 },
  { id: 2, doctorName: 'Dr. Lisa Park', specialty: 'Dermatology', status: 'Revoked', duration: '3 days', endDate: 'May 15, 2026', recordCount: 4 },
  { id: 3, doctorName: 'Dr. Thomas Wright', specialty: 'Neurology', status: 'Expired', duration: '14 days', endDate: 'April 30, 2026', recordCount: 22 },
  { id: 4, doctorName: 'Dr. Amanda Foster', specialty: 'Endocrinology', status: 'Expired', duration: '30 days', endDate: 'April 2, 2026', recordCount: 15 },
];

export default function SharingCenter() {
  const [activeTab, setActiveTab] = useState<Tab>('active');
  const [showQR, setShowQR] = useState(false);
  const [revokedIds, setRevokedIds] = useState<Set<number>>(new Set());
  const [approvedIds, setApprovedIds] = useState<Set<number>>(new Set());
  const [declinedIds, setDeclinedIds] = useState<Set<number>>(new Set());

  const visibleShares = activeShares.filter(s => !revokedIds.has(s.id));
  const visibleRequests = pendingRequests.filter(r => !approvedIds.has(r.id) && !declinedIds.has(r.id));

  return (
    <PatientLayout>
      <div className="px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Sharing Center</h1>
            <p className="text-xs font-medium text-muted-foreground mt-1">You control all access to your records</p>
          </div>
          <button onClick={() => setShowQR(true)}
            className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center hover:bg-[var(--primary-hover)] transition-colors shadow-sm">
            <Plus className="text-primary-foreground" size={22} />
          </button>
        </div>

        {/* Security Banner */}
        <div className="bg-accent rounded-[var(--radius-card)] p-4 border border-border flex items-start gap-3">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
            <Shield className="text-primary-foreground" size={18} />
          </div>
          <p className="text-sm text-secondary leading-relaxed">
            <strong className="text-foreground font-bold">You're in full control.</strong> All access is time-limited and end-to-end encrypted. Revoke instantly at any time.
          </p>
        </div>

        {/* Quick Share */}
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setShowQR(true)}
            className="flex items-center gap-3 p-4 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/40 hover:shadow-sm transition-all">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <QrCode className="text-primary" size={20} />
            </div>
            <div className="text-left">
              <p className="font-bold text-foreground text-sm">QR Share</p>
              <p className="text-xs text-muted-foreground">Scan to grant access</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/40 hover:shadow-sm transition-all">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <LinkIcon className="text-primary" size={20} />
            </div>
            <div className="text-left">
              <p className="font-bold text-foreground text-sm">Share Link</p>
              <p className="text-xs text-muted-foreground">Send secure link</p>
            </div>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border">
          {(['active', 'pending', 'history'] as Tab[]).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold text-sm transition-colors border-b-2 whitespace-nowrap capitalize ${
                activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}>
              {tab === 'active' ? 'Active Access' : tab === 'pending' ? 'Pending' : 'History'}
              {tab === 'active' && (
                <span className="ml-2 px-1.5 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-bold">
                  {visibleShares.length}
                </span>
              )}
              {tab === 'pending' && visibleRequests.length > 0 && (
                <span className="ml-2 px-1.5 py-0.5 bg-[var(--warning)] text-white rounded-full text-xs font-bold">
                  {visibleRequests.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Active Access */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            {visibleShares.map((share) => (
              <motion.div key={share.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-[var(--radius-card)] p-5 border border-border shadow-sm">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-[var(--doctor-note-bg)] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-[var(--doctor-note)]">{share.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{share.doctorName}</h3>
                      <p className="text-sm text-secondary">{share.specialty}</p>
                      <p className="text-xs text-muted-foreground">{share.institution}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 bg-accent text-primary rounded-[var(--radius-pill)] text-xs font-bold border border-primary/20">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  {[
                    { label: 'Access Scope', value: share.scope },
                    { label: 'Records Shared', value: `${share.recordCount} records` },
                    { label: 'Expires', value: share.expiresIn, icon: true },
                    { label: 'Last Viewed', value: share.lastAccessed },
                  ].map((item) => (
                    <div key={item.label} className="bg-background rounded-xl p-3 border border-border">
                      <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                      <p className="text-sm font-semibold text-foreground flex items-center gap-1">
                        {item.icon && <Clock size={13} className="text-muted-foreground" />}
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Record Types Shared</p>
                  <div className="flex flex-wrap gap-1.5">
                    {share.recordTypes.map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-accent text-secondary rounded-[var(--radius-pill)] text-xs font-semibold">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2.5 bg-accent text-secondary rounded-[var(--radius-button)] font-semibold text-sm hover:border-primary/30 border border-border transition-colors">
                    Extend Access
                  </button>
                  <button onClick={() => setRevokedIds(prev => new Set([...prev, share.id]))}
                    className="flex-1 px-4 py-2.5 bg-destructive/10 text-destructive rounded-[var(--radius-button)] font-semibold text-sm hover:bg-destructive/15 transition-colors">
                    Revoke
                  </button>
                </div>
              </motion.div>
            ))}

            {visibleShares.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <UserCheck className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No Active Shares</h3>
                <p className="text-secondary text-sm">Share your records securely using the QR or link options above.</p>
              </div>
            )}
          </div>
        )}

        {/* Pending */}
        {activeTab === 'pending' && (
          <div className="space-y-4">
            {visibleRequests.map((req) => (
              <motion.div key={req.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-[var(--radius-card)] p-5 border border-border shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-[var(--doctor-note-bg)] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-[var(--doctor-note)]">{req.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{req.doctorName}</h3>
                      <p className="text-sm text-secondary">{req.specialty}</p>
                      <p className="text-xs text-muted-foreground">{req.institution}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{req.requestedDate}</span>
                </div>
                <div className="bg-background rounded-xl p-3.5 mb-4 border border-border">
                  <p className="text-sm text-foreground italic leading-relaxed">"{req.message}"</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setApprovedIds(prev => new Set([...prev, req.id]))}
                    className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-[var(--radius-button)] font-semibold text-sm hover:bg-[var(--primary-hover)] transition-colors">
                    Approve Access
                  </button>
                  <button onClick={() => setDeclinedIds(prev => new Set([...prev, req.id]))}
                    className="flex-1 px-4 py-2.5 bg-card border border-border text-secondary rounded-[var(--radius-button)] font-semibold text-sm hover:bg-accent transition-colors">
                    Decline
                  </button>
                </div>
              </motion.div>
            ))}

            {visibleRequests.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-primary" size={28} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">No Pending Requests</h3>
                <p className="text-secondary text-sm">All requests have been handled.</p>
              </div>
            )}
          </div>
        )}

        {/* History */}
        {activeTab === 'history' && (
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground">Past access sessions — read only</p>
            {historyItems.map((item) => (
              <div key={item.id} className="bg-card rounded-[var(--radius-card)] p-4 border border-border opacity-70">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{item.doctorName}</h4>
                    <p className="text-xs text-muted-foreground">{item.specialty} · {item.recordCount} records · {item.duration}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2.5 py-1 rounded-[var(--radius-pill)] text-xs font-bold ${
                      item.status === 'Expired' ? 'bg-accent text-muted-foreground' : 'bg-destructive/10 text-destructive'
                    }`}>
                      {item.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{item.endDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QR Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={() => setShowQR(false)}>
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-full bg-card rounded-t-[var(--radius-modal)] p-6 pb-12 shadow-lg"
              onClick={(e) => e.stopPropagation()}>
              <div className="w-10 h-1 bg-border rounded-full mx-auto mb-6"></div>
              <h2 className="text-xl font-bold text-foreground text-center mb-2">Share via QR Code</h2>
              <p className="text-secondary text-sm text-center mb-7">Have your doctor scan this to request access to your records.</p>

              <div className="w-52 h-52 mx-auto bg-foreground rounded-2xl flex items-center justify-center mb-6 p-4">
                <div className="grid grid-cols-7 gap-0.5 w-full h-full">
                  {Array.from({ length: 49 }).map((_, i) => (
                    <div key={i} className={`rounded-sm ${
                      [0,1,2,3,4,5,7,11,13,14,17,19,21,23,25,27,28,31,33,35,37,39,41,43,44,45,46,47,48].includes(i)
                        ? 'bg-card' : 'bg-foreground'
                    }`} />
                  ))}
                </div>
              </div>

              <div className="text-center mb-7">
                <p className="text-xs text-muted-foreground">Haven Secure Share · Expires in 24 hours</p>
                <p className="text-sm font-mono font-bold text-primary mt-1">HVNS-4829-XXXX-7731</p>
              </div>

              <div className="space-y-2.5">
                <button className="w-full px-6 py-3.5 bg-primary text-primary-foreground rounded-[var(--radius-button)] font-bold hover:bg-[var(--primary-hover)] transition-colors">
                  Share Link Instead
                </button>
                <button onClick={() => setShowQR(false)}
                  className="w-full px-6 py-3.5 bg-card border border-border text-secondary rounded-[var(--radius-button)] font-semibold hover:bg-accent transition-colors">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PatientLayout>
  );
}
