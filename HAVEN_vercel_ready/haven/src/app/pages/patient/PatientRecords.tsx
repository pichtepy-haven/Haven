import { useState } from 'react';
import { Search, Plus, FileText, Activity, Pill, Syringe, Lock, MoreVertical, X, Upload, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PatientLayout from '../../components/PatientLayout';

type RecordType = 'All' | 'Lab Results' | 'Vitals' | 'Medications' | 'Vaccinations' | 'Visits';

interface Record {
  id: number;
  type: RecordType;
  title: string;
  date: string;
  tags: string[];
  icon: React.ElementType;
  colorBg: string;
  colorIcon: string;
  hasAttachment: boolean;
  detail?: string;
}

const records: Record[] = [
  { id: 1, type: 'Lab Results', title: 'Complete Blood Count', date: 'June 3, 2026', tags: ['Lab', 'Routine'], icon: FileText, colorBg: 'bg-blue-50', colorIcon: 'text-blue-600', hasAttachment: true, detail: 'All values within normal range. Hemoglobin 13.8 g/dL, WBC 6.2 K/µL, Platelets 245 K/µL.' },
  { id: 2, type: 'Vitals', title: 'Blood Pressure Check — 120/80', date: 'May 30, 2026', tags: ['Vitals', 'Daily'], icon: Activity, colorBg: 'bg-pink-50', colorIcon: 'text-pink-600', hasAttachment: false, detail: 'Systolic 120 / Diastolic 80. Normal range confirmed by Dr. Johnson.' },
  { id: 3, type: 'Medications', title: 'Lisinopril 10mg — Prescription', date: 'May 22, 2026', tags: ['Prescription', 'Blood Pressure'], icon: Pill, colorBg: 'bg-purple-50', colorIcon: 'text-purple-600', hasAttachment: false, detail: 'Prescribed by Dr. Sarah Johnson. Take once daily in the morning with or without food.' },
  { id: 4, type: 'Vaccinations', title: 'Influenza Vaccine 2026', date: 'May 15, 2026', tags: ['Immunization', 'Annual'], icon: Syringe, colorBg: 'bg-teal-50', colorIcon: 'text-teal-600', hasAttachment: true, detail: 'Quadrivalent influenza vaccine administered. Lot #FL2026-42A. No adverse reactions.' },
  { id: 5, type: 'Visits', title: 'Annual Physical Examination', date: 'May 10, 2026', tags: ['Checkup', 'Cardiology'], icon: FileText, colorBg: 'bg-orange-50', colorIcon: 'text-orange-600', hasAttachment: true, detail: 'Dr. Sarah Johnson — Cardiology. Overall health excellent. BP and cholesterol on target.' },
  { id: 6, type: 'Lab Results', title: 'Lipid Panel — Cholesterol', date: 'April 28, 2026', tags: ['Lab', 'Cholesterol'], icon: FileText, colorBg: 'bg-blue-50', colorIcon: 'text-blue-600', hasAttachment: true, detail: 'Total cholesterol 182 mg/dL. LDL 108, HDL 52. Within target range on Atorvastatin.' },
  { id: 7, type: 'Vitals', title: 'Weight & BMI Measurement', date: 'April 20, 2026', tags: ['Vitals', 'BMI'], icon: Activity, colorBg: 'bg-pink-50', colorIcon: 'text-pink-600', hasAttachment: false, detail: 'Weight 147 lbs, Height 5\'6". BMI 23.7 — Normal healthy range.' },
  { id: 8, type: 'Medications', title: 'Atorvastatin 20mg — Renewed', date: 'April 15, 2026', tags: ['Prescription', 'Cholesterol'], icon: Pill, colorBg: 'bg-purple-50', colorIcon: 'text-purple-600', hasAttachment: false, detail: 'Refill #3. Prescribed by Dr. Chen. Take nightly with dinner for best efficacy.' },
  { id: 9, type: 'Visits', title: 'Cardiology Follow-up', date: 'March 30, 2026', tags: ['Specialist', 'Cardiology'], icon: FileText, colorBg: 'bg-orange-50', colorIcon: 'text-orange-600', hasAttachment: true, detail: 'Six-month follow-up with Dr. Sarah Johnson. ECG normal. Continue current treatment regimen.' },
  { id: 10, type: 'Lab Results', title: 'HbA1c — Blood Sugar Test', date: 'March 15, 2026', tags: ['Lab', 'Diabetes Screen'], icon: FileText, colorBg: 'bg-blue-50', colorIcon: 'text-blue-600', hasAttachment: true, detail: 'HbA1c: 5.4% — Below pre-diabetes threshold of 5.7%. Continue monitoring annually.' },
];

const filterTabs: RecordType[] = ['All', 'Lab Results', 'Vitals', 'Medications', 'Vaccinations', 'Visits'];

export default function PatientRecords() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<RecordType>('All');
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = records.filter((r) => {
    const matchesType = activeFilter === 'All' || r.type === activeFilter;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <PatientLayout>
      <div className="px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Health Records</h1>
            <p className="text-xs font-medium text-muted-foreground mt-1">{records.length} records · All encrypted</p>
          </div>
          <button onClick={() => setShowAddModal(true)}
            className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center hover:bg-[var(--primary-hover)] transition-colors shadow-sm">
            <Plus className="text-primary-foreground" size={22} />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input type="text" value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search records, tags..."
            className="w-full pl-11 pr-10 py-3 bg-card border border-input rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground shadow-sm transition-colors"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
          {filterTabs.map((tab) => (
            <button key={tab} onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-[var(--radius-pill)] text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                activeFilter === tab
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-card border border-border text-secondary hover:border-primary/30 hover:bg-accent'
              }`}>
              {tab}
              {tab !== 'All' && (
                <span className={`ml-1.5 text-xs ${activeFilter === tab ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {records.filter(r => r.type === tab).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {(searchQuery || activeFilter !== 'All') && (
          <p className="text-xs text-muted-foreground font-medium">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
        )}

        {/* Records List */}
        <div className="space-y-3">
          {filtered.map((record) => (
            <motion.div key={record.id} whileHover={{ y: -1 }}
              onClick={() => setSelectedRecord(record)}
              className="bg-card rounded-[var(--radius-card)] p-5 border border-border hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer">
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 ${record.colorBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <record.icon className={record.colorIcon} size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{record.title}</h3>
                      <p className="text-xs text-muted-foreground">{record.type}</p>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground p-1 flex-shrink-0"
                      onClick={(e) => e.stopPropagation()}>
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  {record.detail && (
                    <p className="text-xs text-muted-foreground mb-2 leading-relaxed line-clamp-1">{record.detail}</p>
                  )}

                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    {record.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-accent text-secondary rounded-[var(--radius-pill)] text-xs font-semibold">
                        {tag}
                      </span>
                    ))}
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Lock size={11} />Encrypted
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{record.date}</span>
                    <div className="flex items-center gap-2">
                      {record.hasAttachment && (
                        <span className="text-xs text-muted-foreground bg-accent px-2 py-0.5 rounded-[var(--radius-pill)] font-medium">📎 Attachment</span>
                      )}
                      <ChevronRight className="text-muted-foreground" size={15} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-5">
              <FileText className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No records found</h3>
            <p className="text-secondary text-sm mb-6">Try adjusting your search or filter.</p>
            <button onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-[var(--radius-button)] font-semibold text-sm hover:bg-[var(--primary-hover)] transition-colors">
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Record Detail Sheet */}
      <AnimatePresence>
        {selectedRecord && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 flex items-end" onClick={() => setSelectedRecord(null)}>
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-full bg-card rounded-t-[var(--radius-modal)] p-6 pb-10 max-h-[75vh] overflow-y-auto shadow-lg"
              onClick={(e) => e.stopPropagation()}>
              <div className="w-10 h-1 bg-border rounded-full mx-auto mb-6"></div>
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-14 h-14 ${selectedRecord.colorBg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <selectedRecord.icon className={selectedRecord.colorIcon} size={26} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{selectedRecord.title}</h2>
                  <p className="text-sm text-muted-foreground">{selectedRecord.type} · {selectedRecord.date}</p>
                </div>
              </div>
              {selectedRecord.detail && (
                <div className="bg-background rounded-xl p-4 mb-4 border border-border">
                  <p className="text-sm text-foreground leading-relaxed">{selectedRecord.detail}</p>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mb-5">
                {selectedRecord.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-accent text-secondary rounded-[var(--radius-pill)] text-sm font-semibold">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 bg-accent rounded-xl p-3 border border-border">
                <Lock size={13} className="text-primary flex-shrink-0" />
                <span>End-to-end encrypted · Only you can access this record</span>
              </div>
              <div className="flex gap-3">
                {selectedRecord.hasAttachment && (
                  <button className="flex-1 px-4 py-3 bg-accent text-secondary rounded-[var(--radius-button)] font-semibold text-sm hover:border-primary/30 border border-border transition-colors">
                    View Attachment
                  </button>
                )}
                <button className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-[var(--radius-button)] font-semibold text-sm hover:bg-[var(--primary-hover)] transition-colors">
                  Share with Doctor
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Record Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 flex items-end" onClick={() => setShowAddModal(false)}>
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-full bg-card rounded-t-[var(--radius-modal)] p-6 pb-10 shadow-lg"
              onClick={(e) => e.stopPropagation()}>
              <div className="w-10 h-1 bg-border rounded-full mx-auto mb-6"></div>
              <h2 className="text-xl font-bold text-foreground mb-5">Add New Record</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Lab Result', icon: FileText, bg: 'bg-blue-50', text: 'text-blue-600' },
                  { label: 'Vital Sign', icon: Activity, bg: 'bg-pink-50', text: 'text-pink-600' },
                  { label: 'Medication', icon: Pill, bg: 'bg-purple-50', text: 'text-purple-600' },
                  { label: 'Vaccination', icon: Syringe, bg: 'bg-teal-50', text: 'text-teal-600' },
                  { label: 'Upload File', icon: Upload, bg: 'bg-orange-50', text: 'text-orange-600' },
                  { label: 'Doctor Visit', icon: FileText, bg: 'bg-accent', text: 'text-primary' },
                ].map((item) => (
                  <button key={item.label} onClick={() => setShowAddModal(false)}
                    className="flex items-center gap-3 p-4 bg-background rounded-[var(--radius-card)] border border-border hover:border-primary/40 hover:shadow-sm transition-all text-left">
                    <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={item.text} size={20} />
                    </div>
                    <span className="font-semibold text-foreground text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PatientLayout>
  );
}
