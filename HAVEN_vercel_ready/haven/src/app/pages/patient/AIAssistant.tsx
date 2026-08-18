import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, Brain, TrendingUp, Pill, Calendar, FileText, Activity, Sparkles, ThumbsUp, ThumbsDown, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PatientLayout from '../../components/PatientLayout';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  confidence?: number;
  sources?: number;
  timestamp: string;
}

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const AI_RESPONSES: Record<string, string> = {
  blood: "Your blood pressure has been consistently normal over the past 30 days:\n\n• June 3: 120/80 mmHg ✓\n• May 30: 118/78 mmHg ✓\n• May 22: 122/81 mmHg ✓\n\nAverage is 120/80 — optimal. Dr. Johnson's treatment plan is working well. Continue Lisinopril as prescribed and maintain your low-sodium diet.",
  medication: "You have 3 active medications:\n\n1. Lisinopril 10mg — once daily (morning)\n   Refill due: June 20\n\n2. Atorvastatin 20mg — once daily (evening)\n   Refill due: July 5\n\n3. Metformin 500mg — twice daily with meals\n   Refill due: June 28\n\nNo missed doses in the past 7 days. Would you like me to set up refill reminders?",
  lab: "Your most recent Complete Blood Count (June 3, 2026) shows all values within normal range:\n\n• Hemoglobin: 13.8 g/dL ✓\n• WBC: 6.2 K/µL ✓\n• Platelets: 245 K/µL ✓\n• Hematocrit: 41.2% ✓\n\nYour lipid panel from April 28 also shows improvement — total cholesterol down from 198 to 182 mg/dL.",
  doctor: "Key points for your upcoming visit with Dr. Chen on June 15:\n\n1. Blood pressure stable — bring last 30-day log\n2. Cholesterol trending down — mention Atorvastatin\n3. Weight down 2 lbs — positive lifestyle change\n4. Discuss Metformin refill (due June 28)\n5. Ask about HbA1c follow-up (5.4% from March)\n\nWould you like me to generate a full summary to bring?",
  summary: "Health summary for the past 90 days:\n\nPositives:\n• Blood pressure stable at 120/80\n• Weight down 2 lbs\n• Cholesterol improved (198 → 182 mg/dL)\n• All lab values normal\n• Vaccinations up to date\n\nActive monitoring:\n• Blood pressure (Lisinopril)\n• Cholesterol (Atorvastatin)\n• Blood sugar (HbA1c: 5.4%)\n\nOverall health score: 87/100 — Great progress!",
  default: "I've reviewed your recent health records. Everything looks generally well — blood pressure stable, labs normal, and medications on track. Is there a specific area you'd like me to focus on?",
};

function getResponse(msg: string): string {
  const l = msg.toLowerCase();
  if (l.includes('blood pressure') || l.includes('bp')) return AI_RESPONSES.blood;
  if (l.includes('medication') || l.includes('medicine') || l.includes('pill')) return AI_RESPONSES.medication;
  if (l.includes('lab') || l.includes('result') || l.includes('cholesterol') || l.includes('cbc')) return AI_RESPONSES.lab;
  if (l.includes('doctor') || l.includes('visit') || l.includes('appointment') || l.includes('prepare')) return AI_RESPONSES.doctor;
  if (l.includes('summary') || l.includes('history') || l.includes('overall') || l.includes('summarize')) return AI_RESPONSES.summary;
  return AI_RESPONSES.default;
}

const suggestedActions = [
  { icon: TrendingUp, text: 'Explain my blood pressure trend', colorBg: 'bg-red-50', colorIcon: 'text-red-500' },
  // { icon: Pill, text: 'Review my medications', colorBg: 'bg-purple-50', colorIcon: 'text-purple-500' },
  { icon: Activity, text: 'Analyze my lab results', colorBg: 'bg-blue-50', colorIcon: 'text-blue-500' },
  { icon: FileText, text: 'Summarize my health history', colorBg: 'bg-teal-50', colorIcon: 'text-teal-500' },
  // { icon: Calendar, text: 'Prepare for doctor visit', colorBg: 'bg-orange-50', colorIcon: 'text-orange-500' },
];

export default function AIAssistant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello Jane! I'm Haven AI — your private health assistant. I have access to your 47 encrypted health records and can help you understand trends, review medications, and prepare for appointments.\n\nWhat would you like to know?",
      confidence: 99,
      sources: 47,
      timestamp: now()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const content = text || input.trim();
    if (!content) return;
    setMessages(prev => [...prev, { role: 'user', content, timestamp: now() }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: getResponse(content),
        confidence: Math.floor(Math.random() * 8) + 90,
        sources: Math.floor(Math.random() * 15) + 35,
        timestamp: now()
      }]);
    }, 1400);
  };

  const showSuggestions = messages.length <= 1;

  return (
    <PatientLayout>
      <div className="flex flex-col h-screen pb-16">
        {/* Header */}
        <div className="px-6 py-5 border-b border-border bg-card flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 bg-accent rounded-2xl flex items-center justify-center">
              <Brain className="text-primary" size={22} />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-primary rounded-full border-2 border-card"></span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-tight">Haven AI Assistant</h1>
              <p className="text-xs font-medium text-muted-foreground">Private · Encrypted · 47 records</p>
            </div>
            <button className="ml-auto p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">
              <ChevronDown size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 bg-background">
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 bg-accent rounded-xl flex items-center justify-center flex-shrink-0 mt-1 mr-2 border border-border">
                  <Brain className="text-primary" size={15} />
                </div>
              )}
              <div className={`max-w-[88%] rounded-[var(--radius-card)] px-4 py-3.5 ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-card border border-border text-foreground shadow-sm'
              }`}>
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <Sparkles className="text-primary" size={12} />
                    <span className="text-xs font-bold text-primary">Haven AI</span>
                  </div>
                )}
                <div className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</div>
                <div className={`flex items-center justify-between mt-3 pt-2 border-t ${msg.role === 'user' ? 'border-primary-foreground/20' : 'border-border'}`}>
                  <span className={`text-xs ${msg.role === 'user' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                    {msg.timestamp}
                  </span>
                  {msg.role === 'assistant' && msg.confidence && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{msg.confidence}% · {msg.sources} records</span>
                      <button className="text-muted-foreground hover:text-primary transition-colors"><ThumbsUp size={12} /></button>
                      <button className="text-muted-foreground hover:text-destructive transition-colors"><ThumbsDown size={12} /></button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="w-8 h-8 bg-accent rounded-xl flex items-center justify-center flex-shrink-0 mt-1 mr-2 border border-border">
                <Brain className="text-primary" size={15} />
              </div>
              <div className="bg-card border border-border rounded-[var(--radius-card)] px-5 py-4 shadow-sm">
                <div className="flex gap-1.5 items-center">
                  {[0, 150, 300].map((delay) => (
                    <span key={delay} className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: `${delay}ms` }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          <AnimatePresence>
            {showSuggestions && (
              <motion.div exit={{ opacity: 0, height: 0 }}>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Suggested Questions</p>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedActions.map((action, i) => (
                    <motion.button key={i} whileHover={{ x: 2 }}
                      onClick={() => handleSend(action.text)}
                      className="flex items-center gap-3 p-4 bg-card border border-border rounded-[var(--radius-card)] hover:border-primary/40 hover:shadow-sm transition-all text-left">
                      <div className={`w-9 h-9 ${action.colorBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <action.icon className={action.colorIcon} size={17} />
                      </div>
                      <span className="text-sm font-semibold text-foreground">{action.text}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-[var(--warning-bg)] rounded-[var(--radius-card)] p-4 border border-[var(--warning)]/20">
            <p className="text-xs text-secondary leading-relaxed">
              <strong className="text-foreground">Medical Disclaimer:</strong> Haven AI provides informational guidance only and is not a substitute for professional medical advice. Always consult your healthcare provider.
            </p>
          </div>

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 border-t border-border px-6 py-4 bg-card shadow-sm">
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 bg-background border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors flex-shrink-0">
              <Paperclip size={17} />
            </button>
            <div className="flex-1 relative">
              <input type="text" value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me about your health..."
                className="w-full px-4 py-3 bg-background border border-input rounded-[var(--radius-input)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground pr-12 transition-colors"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                <Mic size={17} />
              </button>
            </div>
            <button onClick={() => handleSend()} disabled={!input.trim() || isTyping}
              className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground hover:bg-[var(--primary-hover)] transition-colors flex-shrink-0 disabled:opacity-40 shadow-sm">
              <Send size={17} />
            </button>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}
