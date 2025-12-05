import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import ChatMessage from '@/components/ChatMessage';
import { ChatMessage as ChatMessageType } from '@/types/interview';
import { Loader2, ArrowRight, User, Building2 } from 'lucide-react';
import { apiService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const InterviewRoom = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [personaType, setPersonaType] = useState<'b2c' | 'b2b'>('b2c');
  const eventSourceRef = useRef<EventSource | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Check if persona and interviewId exist
    const personaDataString = sessionStorage.getItem('currentPersona');
    const interviewId = sessionStorage.getItem('currentInterviewId');

    console.log('📋 InterviewRoom - Loading session data...');
    console.log('   Interview ID:', interviewId);
    console.log('   Has persona:', !!personaDataString);

    if (!personaDataString || !interviewId) {
      console.log('❌ Missing session data, redirecting to /new-interview');
      navigate('/new-interview');
      return;
    }

    // Parse persona to get type
    try {
      const personaData = JSON.parse(personaDataString);
      setPersonaType(personaData.type || 'b2c');
    } catch (e) {
      console.error('Failed to parse persona data');
    }

    console.log('✅ Starting SSE connection for interview:', interviewId);

    // Create SSE connection
    const eventSource = apiService.createInterviewStream(
      interviewId,
      // onMessage callback
      (message: ChatMessageType) => {
        console.log('🔄 Adding message to state:', message.id);
        setMessages((prev) => {
          console.log('   Previous messages:', prev.length);
          const updated = [...prev, message];
          console.log('   Updated messages:', updated.length);
          return updated;
        });
      },
      // onComplete callback
      () => {
        console.log('🎉 Setting interview as complete');
        setIsComplete(true);
        toast({
          title: 'Simulation Complete',
          description: 'The Mom Test interview has finished. View your harsh truth now.',
        });
      },
      // onError callback
      (error) => {
        console.error('SSE error:', error);
        setError('Connection error. Please refresh the page.');
        toast({
          title: 'Connection Error',
          description: 'Lost connection to the interview. Please try again.',
          variant: 'destructive',
        });
      }
    );

    eventSourceRef.current = eventSource;

    // Cleanup on unmount
    return () => {
      console.log('🧹 Cleaning up SSE connection');
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const handleViewInsights = () => {
    // Store interviewId for insights page
    const interviewId = sessionStorage.getItem('currentInterviewId');
    if (interviewId) {
      navigate('/insights');
    }
  };

  return (
    <div className="min-h-screen bg-charcoal text-gray-100">
      <Header />

      <div className="container mx-auto px-6 md:px-8 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-sans">
                  {isComplete ? (
                    <>Simulation <span className="text-mint">Complete</span></>
                  ) : (
                    <>Mom Test <span className="text-cyan">In Progress</span></>
                  )}
                </h1>
                <p className="text-gray-400 font-mono text-sm">
                  {isComplete
                    ? 'Adversarial interview complete. Analysis ready.'
                    : 'Watching AI agents conduct behavioral economics interview...'}
                </p>
              </div>
              {!isComplete && (
                <div className="flex items-center gap-2 bg-slate border-2 border-cyan px-4 py-2 rounded-lg">
                  <span className="w-2 h-2 bg-cyan rounded-full animate-pulse-glow" />
                  <span className="text-sm font-mono text-cyan font-bold">LIVE</span>
                </div>
              )}
            </div>

            {/* Persona Info */}
            <div className="bg-slate/50 border border-divider rounded-lg p-4 flex items-center gap-3">
              {personaType === 'b2c' ? (
                <User className="w-5 h-5 text-cyan" />
              ) : (
                <Building2 className="w-5 h-5 text-cyan" />
              )}
              <div>
                <p className="text-xs text-gray-500 font-mono">TESTING WITH:</p>
                <p className="text-sm text-white font-semibold">
                  {personaType === 'b2c' ? 'B2C Individual Customer' : 'B2B Organization Buyer'}
                </p>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="bg-slate border-2 border-divider rounded-xl overflow-hidden animate-scale-in">
            <div className="max-h-[600px] overflow-y-auto p-6 md:p-8 space-y-6">
              {error ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-burnt-orange/10 border-2 border-burnt-orange/30 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-burnt-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-burnt-orange font-mono mb-6">{error}</p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="bg-cyan hover:bg-cyan-600 text-charcoal font-bold"
                  >
                    Reload Page
                  </Button>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12">
                  <Loader2 className="h-12 w-12 animate-spin text-cyan mx-auto mb-4" />
                  <p className="text-white font-mono mb-2">Connecting to simulation...</p>
                  <p className="text-xs text-gray-500 font-mono">Initializing adversarial agents...</p>
                </div>
              ) : (
                <>
                  <div className="text-xs text-gray-500 font-mono mb-4 pb-4 border-b border-divider">
                    {messages.length} message{messages.length !== 1 ? 's' : ''} • {isComplete ? 'Complete' : 'In progress'}
                  </div>
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      delay={index * 50}
                    />
                  ))}

                  {!isComplete && (
                    <div className="flex items-center gap-2 py-4">
                      <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                      <div className="w-2 h-2 rounded-full bg-cyan animate-pulse animation-delay-150" />
                      <div className="w-2 h-2 rounded-full bg-cyan animate-pulse animation-delay-300" />
                      <span className="ml-2 text-xs text-gray-500 font-mono">Agents thinking...</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </>
              )}
            </div>
          </div>

          {/* Action Button */}
          {isComplete && (
            <div className="mt-8 text-center animate-slide-up">
              <Button
                size="lg"
                onClick={handleViewInsights}
                className="gap-3 bg-burnt-orange hover:bg-burnt-orange-600 text-white font-bold text-lg px-12 py-7 shadow-xl shadow-burnt-orange/30 hover:shadow-burnt-orange/50 transition-all border-0"
              >
                View Brutal Analysis
                <ArrowRight className="h-6 w-6" />
              </Button>
              <p className="text-sm text-gray-500 font-mono mt-4">
                See what the skeptical customer really thinks
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewRoom;
