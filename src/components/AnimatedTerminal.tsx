import { useEffect, useState } from 'react';

interface Message {
  speaker: 'interviewer' | 'customer';
  text: string;
  delay: number;
}

const messages: Message[] = [
  {
    speaker: 'interviewer',
    text: '> So, how do you currently manage your inventory without software?',
    delay: 0,
  },
  {
    speaker: 'customer',
    text: '> Honestly? Just Excel spreadsheets. It\'s fine.',
    delay: 2500,
  },
  {
    speaker: 'interviewer',
    text: '> And how much time does that manual process cost you weekly?',
    delay: 5000,
  },
  {
    speaker: 'customer',
    text: '> Maybe 2 hours? It\'s annoying but I\'m too busy to learn a new system right now.',
    delay: 7500,
  },
];

export function AnimatedTerminal() {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    messages.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleMessages(index + 1);
      }, messages[index].delay);
      timers.push(timer);
    });

    const analysisTimer = setTimeout(() => {
      setShowAnalysis(true);
    }, 10000);
    timers.push(analysisTimer);

    // Reset animation after it completes
    const resetTimer = setTimeout(() => {
      setVisibleMessages(0);
      setShowAnalysis(false);
    }, 15000);
    timers.push(resetTimer);

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [visibleMessages === 0]); // Restart when reset to 0

  return (
    <div className="relative w-full max-w-3xl bg-charcoal border-2 border-divider rounded-lg overflow-hidden shadow-2xl shadow-black/50">
      {/* Terminal Header */}
      <div className="bg-slate border-b border-divider px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500/70 hover:bg-green-500 transition-colors cursor-pointer" />
          </div>
          <span className="ml-2 font-mono text-xs text-gray-500">
            validation_engine_v1.0
          </span>
        </div>
        <div className="font-mono text-xs text-cyan animate-pulse-glow flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-cyan rounded-full animate-pulse-glow"></span>
          LIVE
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-8 min-h-[420px] font-mono text-sm">
        {/* Split View */}
        <div className="grid grid-cols-2 gap-8 relative">
          {/* Divider Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-divider shadow-sm" />

          {/* Left Side - Interviewer */}
          <div className="space-y-5 pr-4">
            <div className="text-cyan text-xs uppercase tracking-widest mb-6 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 bg-cyan rounded-full animate-pulse-glow" />
              AGENT A: INTERVIEWER
            </div>
            <div className="space-y-4">
              {messages
                .filter(m => m.speaker === 'interviewer')
                .map((message, index) => (
                  <div
                    key={index}
                    className={`text-cyan text-sm leading-relaxed transition-opacity duration-500 ${
                      visibleMessages > messages.findIndex(m => m === message)
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  >
                    {message.text}
                    {visibleMessages === messages.findIndex(m => m === message) + 1 && (
                      <span className="inline-block w-1.5 h-4 ml-1 bg-cyan animate-blink" />
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Right Side - Customer */}
          <div className="space-y-5 pl-4">
            <div className="text-burnt-orange text-xs uppercase tracking-widest mb-6 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 bg-burnt-orange rounded-full animate-pulse-glow" />
              AGENT B: CUSTOMER
            </div>
            <div className="space-y-4">
              {messages
                .filter(m => m.speaker === 'customer')
                .map((message, index) => (
                  <div
                    key={index}
                    className={`text-burnt-orange text-sm leading-relaxed transition-opacity duration-500 ${
                      visibleMessages > messages.findIndex(m => m === message)
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  >
                    {message.text}
                    {visibleMessages === messages.findIndex(m => m === message) + 1 && (
                      <span className="inline-block w-1.5 h-4 ml-1 bg-burnt-orange animate-blink" />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Analysis Overlay */}
        {showAnalysis && (
          <div className="mt-10 border-2 border-burnt-orange/40 bg-burnt-orange/10 rounded-lg p-5 animate-fade-in backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <svg
                className="w-6 h-6 text-burnt-orange mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div className="font-mono text-xs space-y-1">
                <div className="text-burnt-orange font-bold text-sm tracking-wide">
                  ANALYSIS: HIGH FRICTION DETECTED
                </div>
                <div className="text-gray-300 leading-relaxed">
                  Customer is apathetic to change. Satisfied with current solution despite pain points.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
