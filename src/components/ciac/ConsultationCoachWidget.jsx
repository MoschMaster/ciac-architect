import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, Sparkles } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '@/lib/LanguageContext';

export default function ConsultationCoachWidget() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Welkom! Ik ben de architectuur-assistent van Conclusion IT Architecture Consulting. Vertel kort waar je IT- of architectuurvraagstuk over gaat, dan denk ik met je mee of CIAC kan helpen.',
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    const text = input.trim();
    setInput('');
    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setSending(true);

    const response = await base44.functions.invoke('publicConsultationCoach', {
      messages: nextMessages,
      language,
    });

    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: response.data.message },
    ]);
    setSending(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="trigger"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setOpen(true)}
            className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 group"
            aria-label="Open kennismakingsgesprek"
          >
            <div className="absolute inset-0 bg-brand-green rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative flex items-center justify-center sm:justify-start gap-3 bg-brand-charcoal hover:bg-brand-green text-white pl-4 pr-5 py-3.5 rounded-full shadow-lg border border-white/10 transition-all duration-300">
              <div className="relative">
                <Sparkles className="w-4 h-4 text-brand-green group-hover:text-white transition-colors duration-300" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
              </div>
              <span className="font-inter text-sm font-medium tracking-wide">
                Praat met onze architect
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 top-3 bottom-3 sm:inset-auto sm:bottom-6 sm:right-6 z-50 sm:w-[420px] sm:h-[600px] max-h-[calc(100dvh-1.5rem)] bg-white border border-border rounded-sm shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-brand-charcoal text-white px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between border-b border-brand-green/30 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-sm bg-brand-green/20 border border-brand-green/40 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-brand-green" />
                </div>
                <div>
                  <h3 className="font-playfair text-base font-semibold leading-tight">
                    Intake Coach
                  </h3>
                  <p className="font-inter text-[11px] text-white/50 tracking-wide">
                    Verhelder je vraag in een paar minuten
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-white/10 transition-colors"
                aria-label="Sluiten"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 sm:py-5 bg-brand-offwhite space-y-3 overscroll-contain"
            >
              {messages.map((m, i) => (
                <MessageBubble key={i} message={m} />
              ))}

              {sending && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="font-inter text-xs">Coach denkt na...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex-shrink-0">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Typ je bericht..."
                  disabled={sending}
                  className="flex-1 resize-none font-inter text-sm bg-brand-offwhite border border-border rounded-sm px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green disabled:opacity-50 max-h-32"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || sending}
                  className="w-10 h-10 flex items-center justify-center bg-brand-green text-white rounded-sm hover:bg-brand-mid disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                  aria-label="Verstuur"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="font-inter text-[10px] text-muted-foreground mt-2 tracking-wide">
                AI-gestuurde intake · vervangt geen menselijk advies
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[90%] sm:max-w-[85%] px-3.5 py-2.5 rounded-sm font-inter text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-brand-green text-white'
            : 'bg-white border border-border text-foreground'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}