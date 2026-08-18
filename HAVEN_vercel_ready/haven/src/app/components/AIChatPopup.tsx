import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Mic, Brain, Minimize2, Sparkles, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message { role: 'user' | 'assistant'; content: string; time: string; }
function ts() { return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }

// ─── Guest responses (general health info, no personal data) ──────────────────

const GUEST_INIT = "Hi! I'm Haven AI in guest mode — I can answer general health questions right now, no account needed. Sign in to unlock personalized insights from your own records.";

const GUEST_QUICK = [
  'What is normal blood pressure?',
  'How often should I get a check-up?',
  'Tips for better sleep?',
  'What does high cholesterol mean?',
];

const GUEST_RULES: [RegExp, string][] = [
  [/haven|what.*is|about/i, "Haven is a private, encrypted health record vault. You control all your data — only you can read it. Sign in to manage your records and get AI-powered personalized health insights."],
  [/blood pressure|hypertension|bp/i, "Normal blood pressure is below 120/80 mmHg. High blood pressure (hypertension) is ≥130/80 and is a major risk factor for heart disease and stroke. Key lifestyle steps: reduce sodium, exercise regularly, maintain healthy weight, and avoid smoking."],
  [/check.?up|physical|how often|annual/i, "Most adults benefit from an annual physical exam. Key screenings vary by age — cholesterol every 5 years (20+), diabetes every 3 years (45+), blood pressure yearly. Sign in to Haven to track your specific screenings."],
  [/sleep|rest|insomnia/i, "Adults need 7–9 hours of sleep per night. Good sleep hygiene: consistent schedule, dark & cool room (60–67°F), no screens 1 hour before bed, avoid caffeine after 2 PM."],
  [/cholesterol|lipid|ldl|hdl/i, "Desirable total cholesterol: below 200 mg/dL. LDL (bad cholesterol) should be below 100 mg/dL; HDL (good) above 60 mg/dL is protective. Diet, exercise, and statins are common management strategies."],
  [/diabetes|blood sugar|glucose|hba1c/i, "Normal HbA1c is below 5.7%. 5.7–6.4% is pre-diabetic; 6.5%+ is diabetic. Type 2 diabetes is manageable with diet, exercise, and medication. Sign in to track your own glucose history in Haven."],
  [/heart|cardio|cardiac/i, "Heart health starts with lifestyle: 150 min/week aerobic exercise, heart-healthy diet (vegetables, whole grains, low saturated fat), no smoking, and stress management."],
  [/exercise|workout|activity|fitness/i, "WHO recommends 150–300 min of moderate aerobic activity per week, plus 2 days of muscle-strengthening exercises. Even short 10-minute walks count toward your daily goal."],
  [/weight|bmi|obesity|overweight/i, "Healthy BMI is 18.5–24.9. The best approach: sustainable lifestyle changes — balanced diet and regular activity — rather than crash diets. Even a 5–10% weight loss significantly reduces health risks."],
  [/stress|anxiety|mental|mood/i, "Chronic stress raises blood pressure, weakens immunity, and disrupts sleep. Evidence-based approaches: mindfulness meditation, regular exercise, adequate sleep, and professional counseling when needed."],
  [/vaccine|vaccination|immuniz/i, "Adult vaccines recommended by the CDC: annual flu shot, COVID-19 boosters, Tdap (tetanus), shingles vaccine (50+), pneumococcal vaccine (65+). Sign in to Haven to track your full vaccination history."],
];

function guestReply(msg: string) {
  for (const [rx, res] of GUEST_RULES) if (rx.test(msg)) return res;
  return "Great health question! As a guest I can share general wellness information. Sign in to Haven to get personalized insights based on your own records, labs, medications, and vitals.";
}

// ─── Authenticated responses (personal data) ─────────────────────────────────

function authInit(name: string) {
  return `Hi ${name}! I'm your personal Haven AI — I have access to your 47 encrypted health records and can give you personalized insights. What would you like to know today?`;
}

const AUTH_QUICK = [
  'What are my recent lab results?',
  'Any medication reminders today?',
  'Summarize my last doctor visit',
  'When is my next appointment?',
];

const AUTH_RULES: [RegExp, string][] = [
  [/lab|result|cbc|cholesterol|blood test/i, "Your most recent CBC (June 3) was all within normal range — Hemoglobin 13.8 g/dL ✓, WBC 6.2 K/µL ✓, Platelets 245 K/µL ✓. Your lipid panel (April 28) shows total cholesterol improved from 198 to 182 mg/dL. Great progress!"],
  [/medication|medicine|pill|drug|remind/i, "You have 3 active medications:\n• Lisinopril 10mg — daily morning (refill Jun 20)\n• Atorvastatin 20mg — daily evening (refill Jul 5)\n• Metformin 500mg — twice daily with meals (refill Jun 28)\n\nNo missed doses in the past 7 days."],
  [/doctor.*visit|last.*visit|note/i, "Your last visit was with Dr. Sarah Johnson (Cardiology) on May 10. Key notes: blood pressure stabilized at 120/80, continue current medications, weight trending down. Follow up in 3 months."],
  [/appointment|next.*visit|schedule|when/i, "Your next appointment is with Dr. Michael Chen (General Practice) on June 15, 2026 at 10:30 AM. Dr. Johnson's follow-up is September 4 at 2:00 PM."],
  [/blood pressure|bp|pressure/i, "Your blood pressure trend over the past 30 days:\n• June 3: 120/80 ✓\n• May 30: 118/78 ✓\n• May 22: 122/81 ✓\n\nExcellent — consistently normal. Your Lisinopril is working well."],
  [/weight|bmi/i, "Your weight was recorded at 145 lbs (May 30) — down 2 lbs from last month. Height 5'6\", BMI 23.4 — normal range. Great trend!"],
  [/score|health score|overall/i, "Your current health score is 87/100 — up 5 points this month! Key drivers: stable blood pressure, improved cholesterol, consistent medication adherence, and weight loss of 2 lbs."],
  [/allerg/i, "Your allergy record shows: Penicillin (severe), Peanuts (moderate), Latex (mild). These are flagged on all your shared records."],
];

function authReply(msg: string) {
  for (const [rx, res] of AUTH_RULES) if (rx.test(msg)) return res;
  return "I've reviewed your recent records. Everything looks generally well — blood pressure stable at 120/80, all labs normal, medications on track. What specific area would you like to explore?";
}

// ─── Component ────────────────────────────────────────────────────────────────

interface AIChatPopupProps {
  /** CSS class for the bottom offset. Default 'bottom-[84px]' works above patient bottom nav.
   *  Pass 'bottom-8' for pages without a bottom nav (e.g. landing page). */
  bottomOffset?: string;
}

export default function AIChatPopup({ bottomOffset = 'bottom-[84px]' }: AIChatPopupProps) {
  const { isAuthenticated, user } = useAuth();
  const isGuest = !isAuthenticated;

  const buildInit = (): Message => ({
    role: 'assistant',
    content: isGuest ? GUEST_INIT : authInit(user?.name ?? 'there'),
    time: ts(),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [buildInit()]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const prevAuth = useRef(isAuthenticated);
  const endRef = useRef<HTMLDivElement>(null);

  // Reset when auth state changes (guest ↔ personal)
  useEffect(() => {
    if (prevAuth.current !== isAuthenticated) {
      prevAuth.current = isAuthenticated;
      setMessages([buildInit()]);
      setUnread(0);
    }
  }); // run every render but only acts when auth changes

  useEffect(() => {
    if (isOpen) { endRef.current?.scrollIntoView({ behavior: 'smooth' }); setUnread(0); }
  }, [messages, isOpen]);

  const send = (text?: string) => {
    const content = (text || input).trim();
    if (!content) return;
    setMessages(prev => [...prev, { role: 'user', content, time: ts() }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply = isGuest ? guestReply(content) : authReply(content);
      setMessages(prev => [...prev, { role: 'assistant', content: reply, time: ts() }]);
      if (!isOpen) setUnread(n => n + 1);
    }, 1000 + Math.random() * 500);
  };

  const quickReplies = isGuest ? GUEST_QUICK : AUTH_QUICK;
  const showQuick = messages.length <= 1;

  // Theming: dark/charcoal for guest, teal/primary for personal
  const headerBg = isGuest ? 'bg-[#0066b5]' : 'bg-primary';
  const headerText = 'text-white';
  const sendBg = isGuest ? 'bg-[#0077b6] hover:opacity-80' : 'bg-primary hover:opacity-90';
  const userBubble = isGuest ? 'bg-[#0066b0] text-white' : 'bg-primary text-primary-foreground';
  const quickActiveCls = isGuest
    ? 'bg-[#0066b5] text-white border-transparent'
    : 'bg-primary text-primary-foreground border-transparent';

  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className={`fixed ${bottomOffset} right-4 z-50 w-[340px] sm:w-[380px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col`}
          >
            {/* Header */}
            <div className={`${headerBg} ${headerText} px-4 py-3 flex items-center justify-between flex-shrink-0`}>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
                  <Brain size={18} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">
                      {isGuest ? 'Haven AI' : 'Personal Health AI'}
                    </span>
                    {isGuest
                      ? <span className="px-1.5 py-0.5 bg-white/15 rounded text-xs font-semibold">Guest</span>
                      : <span className="px-1.5 py-0.5 bg-white/15 rounded text-xs font-semibold">Personal</span>
                    }
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-white/65">
                      {isGuest ? 'General guidance · No account needed' : `Encrypted · ${user?.name ?? ''}`}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setIsMinimized(v => !v)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                  <Minimize2 size={15} />
                </button>
                <button onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                  <X size={15} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="h-64 overflow-y-auto p-4 space-y-3 bg-background flex-shrink-0">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'assistant' && (
                        <div className="w-7 h-7 bg-accent border border-border rounded-lg flex items-center justify-center flex-shrink-0 mt-1 mr-2">
                          <Brain size={13} className={isGuest ? 'text-foreground' : 'text-primary'} />
                        </div>
                      )}
                      <div className={`max-w-[83%] rounded-xl px-3 py-2.5 ${
                        msg.role === 'user' ? userBubble : 'bg-card border border-border text-foreground'
                      }`}>
                        {msg.role === 'assistant' && (
                          <div className="flex items-center gap-1 mb-1.5">
                            <Sparkles size={11} className={isGuest ? 'text-secondary' : 'text-primary'} />
                            <span className={`text-xs font-bold ${isGuest ? 'text-secondary' : 'text-primary'}`}>
                              {isGuest ? 'Haven AI' : 'Personal AI'}
                            </span>
                          </div>
                        )}
                        <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                        <p className={`text-xs mt-1.5 ${msg.role === 'user' ? 'opacity-60' : 'text-secondary'}`}>{msg.time}</p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="w-7 h-7 bg-accent border border-border rounded-lg flex items-center justify-center flex-shrink-0 mt-1 mr-2">
                        <Brain size={13} className={isGuest ? 'text-foreground' : 'text-primary'} />
                      </div>
                      <div className="bg-card border border-border rounded-xl px-4 py-3">
                        <div className="flex gap-1">
                          {[0, 150, 300].map(d => (
                            <span key={d} className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce"
                              style={{ animationDelay: `${d}ms` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={endRef} />
                </div>

                {/* Quick replies */}
                {showQuick && (
                  <div className="px-3 py-2 border-t border-border bg-background flex-shrink-0">
                    <div className="flex flex-wrap gap-1.5">
                      {quickReplies.map(r => (
                        <button key={r} onClick={() => send(r)}
                          className="px-2.5 py-1 border border-border text-secondary rounded-full text-xs hover:border-foreground/40 hover:text-foreground transition-colors">
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Guest upgrade nudge */}
                {isGuest && (
                  <div className="mx-3 mb-2 mt-1 p-2.5 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-2.5 flex-shrink-0">
                    <Lock size={14} className="text-primary flex-shrink-0" />
                    <p className="text-xs text-secondary flex-1">Sign in for personalized health insights</p>
                    <Link to="/select-account" onClick={() => setIsOpen(false)}
                      className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-bold hover:opacity-90 transition-opacity whitespace-nowrap">
                      Sign In <ArrowRight size={11} />
                    </Link>
                  </div>
                )}

                {/* Input */}
                <div className="px-3 py-3 border-t border-border bg-card flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 flex items-center gap-2 bg-background border border-input rounded-xl px-3 py-2">
                      <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && send()}
                        placeholder={isGuest ? 'Ask a health question...' : 'Ask about your health...'}
                        className="flex-1 text-sm bg-transparent text-foreground focus:outline-none placeholder:text-secondary"
                      />
                      <Mic size={15} className="text-secondary flex-shrink-0" />
                    </div>
                    <button onClick={() => send()}
                      className={`w-9 h-9 ${sendBg} rounded-xl flex items-center justify-center text-white flex-shrink-0 transition-opacity`}>
                      <Send size={15} />
                    </button>
                  </div>
                  <p className="text-xs text-secondary text-center mt-1.5">
                    {isGuest ? 'General info only · Not medical advice' : 'AI responses are informational only'}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      {!isOpen && (
        <motion.button
          onClick={() => { setIsOpen(true); setUnread(0); }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className={`fixed ${bottomOffset} right-4 z-40 w-14 h-14 ${isGuest ? 'bg-[#0066b6]' : 'bg-primary'} rounded-full flex items-center justify-center shadow-xl`}
        >
          <MessageSquare className="text-white" size={22} />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center font-bold">
              {unread}
            </span>
          )}
          {/* Pulse ring */}
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-white opacity-20"
            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
          {/* Guest label */}
          {isGuest && (
            <span className="absolute right-16 bottom-1 bg-[#0066b6] text-white text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap shadow pointer-events-none">
              Try AI · Free
            </span>
          )}
        </motion.button>
      )}
    </>
  );
}
