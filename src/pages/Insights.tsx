import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ChatMessage from '@/components/ChatMessage';
import { Button } from '@/components/ui/button';
import { Insights as InsightsType } from '@/types/interview';
import { ChatMessage as ChatMessageType } from '@/types/interview';
import { apiService } from '@/services/api';
import {
  Loader2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Send,
  Lock,
  User,
  Building2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Insights = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [insights, setInsights] = useState<InsightsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [personaType, setPersonaType] = useState<'b2c' | 'b2b'>('b2c');
  const [personaData, setPersonaData] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchInsights = async () => {
      const personaDataString = sessionStorage.getItem('currentPersona');
      const interviewId = sessionStorage.getItem('currentInterviewId');

      if (!personaDataString || !interviewId) {
        navigate('/new-interview');
        return;
      }

      // Parse persona data
      try {
        const parsedPersona = JSON.parse(personaDataString);
        setPersonaData(parsedPersona);
        setPersonaType(parsedPersona.type || 'b2c');
      } catch (e) {
        console.error('Failed to parse persona data');
      }

      try {
        setIsLoading(true);
        const data = await apiService.getInsights(interviewId);
        setInsights(data);
      } catch (error) {
        console.error('Failed to fetch insights:', error);
        setError('Failed to load insights. Please try again.');
        toast({
          title: 'Failed to load insights',
          description: error instanceof Error ? error.message : 'Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsights();
  }, [navigate, toast]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isSending) return;

    const interviewId = sessionStorage.getItem('currentInterviewId');
    if (!interviewId) return;

    setIsSending(true);
    try {
      // Add user's message as interviewer follow-up
      const userMessage: ChatMessageType = {
        id: `msg-${Date.now()}`,
        agent: 'interviewer',
        message: newMessage.trim(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setNewMessage('');

      // Here you would call an API endpoint to continue the conversation
      // For now, we'll add a placeholder response
      // const response = await apiService.continueInterview(interviewId, newMessage);

      // Simulate a response (replace with actual API call)
      setTimeout(() => {
        const aiResponse: ChatMessageType = {
          id: `msg-${Date.now()}-response`,
          agent: 'customer',
          message: "I understand you want to continue this conversation. This feature would connect to the backend to continue the simulation with the locked persona.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsSending(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: 'Failed to send message',
        description: 'Please try again.',
        variant: 'destructive',
      });
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal text-gray-100">
        <Header />
        <div className="container mx-auto px-6 md:px-8 py-8">
          <div className="max-w-6xl mx-auto flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-cyan mb-4" />
            <p className="text-gray-400 font-mono">Analyzing results...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !insights) {
    return (
      <div className="min-h-screen bg-charcoal text-gray-100">
        <Header />
        <div className="container mx-auto px-6 md:px-8 py-8">
          <div className="max-w-6xl mx-auto flex flex-col items-center justify-center py-20">
            <p className="text-burnt-orange font-mono mb-6">{error || 'Failed to load insights'}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-cyan hover:bg-cyan-600 text-charcoal font-bold"
            >
              Try again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getVerdictColor = (verdict: string) => {
    if (verdict === 'GO') return 'bg-mint border-mint text-charcoal';
    if (verdict === 'NO GO') return 'bg-burnt-orange border-burnt-orange text-charcoal';
    return 'bg-yellow-500 border-yellow-500 text-charcoal';
  };

  const getVerdictIcon = (verdict: string) => {
    if (verdict === 'GO') return <CheckCircle2 className="h-6 w-6" />;
    if (verdict === 'NO GO') return <XCircle className="h-6 w-6" />;
    return <AlertTriangle className="h-6 w-6" />;
  };

  return (
    <div className="min-h-screen bg-charcoal text-gray-100">
      <Header />

      <div className="container mx-auto px-6 md:px-8 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-sans">
              <span className="text-burnt-orange">Simulation</span> Results
            </h1>

            {/* Locked Persona Display */}
            {personaData && (
              <div className="bg-slate/50 border border-divider rounded-lg p-5 flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 p-2 bg-charcoal border border-cyan/30 rounded-lg">
                  <Lock className="w-5 h-5 text-cyan" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {personaType === 'b2c' ? (
                      <User className="w-5 h-5 text-cyan" />
                    ) : (
                      <Building2 className="w-5 h-5 text-cyan" />
                    )}
                    <p className="text-sm font-bold font-mono text-cyan">
                      LOCKED PERSONA: {personaType === 'b2c' ? 'B2C Customer' : 'B2B Buyer'}
                    </p>
                  </div>
                  <div className="space-y-2 text-sm text-gray-400 font-sans">
                    <p><span className="text-gray-500 font-mono">JTBD:</span> {personaData.jtbd}</p>
                    {personaType === 'b2c' ? (
                      <>
                        {personaData.disposableIncome && (
                          <p><span className="text-gray-500 font-mono">Disposable Income:</span> ${personaData.disposableIncome}/mo</p>
                        )}
                        {personaData.psychographics && (
                          <p><span className="text-gray-500 font-mono">Psychographics:</span> {personaData.psychographics}</p>
                        )}
                      </>
                    ) : (
                      <>
                        {personaData.industry && (
                          <p><span className="text-gray-500 font-mono">Industry:</span> {personaData.customIndustry || personaData.industry}</p>
                        )}
                        {personaData.role && (
                          <p><span className="text-gray-500 font-mono">Role:</span> {personaData.customRole || personaData.role}</p>
                        )}
                      </>
                    )}
                    {personaData.currentAlternative && (
                      <p><span className="text-gray-500 font-mono">Current Alternative:</span> {personaData.currentAlternative}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Overall Verdict */}
          <div className="bg-slate border-2 border-divider rounded-xl p-6 md:p-8 mb-8 animate-scale-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-start gap-5">
                <div className={`p-4 rounded-lg border-2 ${getVerdictColor(insights.overallVerdict)}`}>
                  {getVerdictIcon(insights.overallVerdict)}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-sans">
                    {insights.overallVerdict}
                  </h2>
                  <p className="text-gray-400 font-mono text-sm">
                    {insights.confidenceScore}% CONFIDENCE
                  </p>
                </div>
              </div>
              <div className="text-center md:text-right">
                <div className="text-4xl md:text-5xl font-bold text-cyan font-mono">{insights.confidenceScore}%</div>
                <div className="text-sm text-gray-500 font-mono mt-1">CONFIDENCE SCORE</div>
              </div>
            </div>
          </div>

          {/* Validation Scores - Problem, Market, Payment */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Problem Validation */}
            <div className="bg-slate border border-divider rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold font-mono text-gray-400">PROBLEM</h3>
                <div className={`text-3xl font-bold font-mono ${
                  insights.problemValidation.score >= 7 ? 'text-mint' :
                  insights.problemValidation.score >= 4 ? 'text-yellow-500' :
                  'text-burnt-orange'
                }`}>
                  {insights.problemValidation.score}<span className="text-lg text-gray-500">/10</span>
                </div>
              </div>
              <div className="mb-3">
                <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold font-mono ${
                  insights.problemValidation.score >= 7
                    ? 'bg-mint/10 border border-mint/30 text-mint'
                    : insights.problemValidation.score >= 4
                    ? 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-500'
                    : 'bg-burnt-orange/10 border border-burnt-orange/30 text-burnt-orange'
                }`}>
                  {insights.problemValidation.label}
                </span>
              </div>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">
                {insights.problemValidation.reasoning}
              </p>
            </div>

            {/* Market Validation */}
            <div className="bg-slate border border-divider rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold font-mono text-gray-400">MARKET</h3>
                <div className={`text-3xl font-bold font-mono ${
                  insights.marketValidation.score >= 7 ? 'text-mint' :
                  insights.marketValidation.score >= 4 ? 'text-yellow-500' :
                  'text-burnt-orange'
                }`}>
                  {insights.marketValidation.score}<span className="text-lg text-gray-500">/10</span>
                </div>
              </div>
              <div className="mb-3">
                <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold font-mono ${
                  insights.marketValidation.score >= 7
                    ? 'bg-mint/10 border border-mint/30 text-mint'
                    : insights.marketValidation.score >= 4
                    ? 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-500'
                    : 'bg-burnt-orange/10 border border-burnt-orange/30 text-burnt-orange'
                }`}>
                  {insights.marketValidation.label}
                </span>
              </div>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">
                {insights.marketValidation.reasoning}
              </p>
            </div>

            {/* Payment Validation */}
            <div className="bg-slate border border-divider rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold font-mono text-gray-400">WILLINGNESS TO PAY</h3>
                <div className={`text-3xl font-bold font-mono ${
                  insights.paymentValidation.score >= 7 ? 'text-mint' :
                  insights.paymentValidation.score >= 4 ? 'text-yellow-500' :
                  'text-burnt-orange'
                }`}>
                  {insights.paymentValidation.score}<span className="text-lg text-gray-500">/10</span>
                </div>
              </div>
              <div className="mb-3">
                <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold font-mono ${
                  insights.paymentValidation.score >= 7
                    ? 'bg-mint/10 border border-mint/30 text-mint'
                    : insights.paymentValidation.score >= 4
                    ? 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-500'
                    : 'bg-burnt-orange/10 border border-burnt-orange/30 text-burnt-orange'
                }`}>
                  {insights.paymentValidation.label}
                </span>
              </div>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">
                {insights.paymentValidation.reasoning}
              </p>
            </div>
          </div>

          {/* Simple Analysis Display */}
          <div className="space-y-6 mb-8">
            {/* Detailed Analysis */}
            <div className="bg-slate border border-divider rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-4 font-mono">ANALYSIS</h3>
              <div className="space-y-4 text-gray-300 font-sans leading-relaxed">
                {insights.detailedAnalysis.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Good News */}
            {insights.goodNews.length > 0 && (
              <div className="bg-slate border border-divider rounded-xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-mint mb-4 font-mono flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  POSITIVE SIGNALS
                </h3>
                <ul className="space-y-3">
                  {insights.goodNews.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300 font-sans">
                      <span className="text-mint font-mono text-sm mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Red Flags */}
            {insights.badNews.length > 0 && (
              <div className="bg-slate border border-divider rounded-xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-burnt-orange mb-4 font-mono flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  RED FLAGS
                </h3>
                <ul className="space-y-3">
                  {insights.badNews.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300 font-sans">
                      <span className="text-burnt-orange font-mono text-sm mt-1">!</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Quotes */}
            {insights.keyQuotes.length > 0 && (
              <div className="bg-slate border border-divider rounded-xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-cyan mb-4 font-mono">KEY EVIDENCE</h3>
                <div className="space-y-3">
                  {insights.keyQuotes.map((quote, idx) => (
                    <div key={idx} className="border-l-2 border-cyan pl-4 py-2">
                      <p className="text-sm italic text-gray-400 font-sans">"{quote}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Execution Challenges */}
            {insights.executionChallenges && insights.executionChallenges.length > 0 && (
              <div className="bg-slate border border-divider rounded-xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-yellow-500 mb-4 font-mono">EXECUTION CHALLENGES</h3>
                <p className="text-sm text-gray-500 font-sans mb-4">What will be difficult to build or sell</p>
                <ul className="space-y-3">
                  {insights.executionChallenges.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300 font-sans">
                      <span className="text-yellow-500 font-mono text-sm mt-1">⚠</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Next Steps */}
            {insights.nextSteps.length > 0 && (
              <div className="bg-slate border border-divider rounded-xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-4 font-mono">RECOMMENDED NEXT STEPS</h3>
                <ol className="space-y-3">
                  {insights.nextSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-gray-300 font-sans">
                      <span className="flex items-center justify-center h-7 w-7 rounded-lg bg-cyan/10 border border-cyan/30 text-cyan font-mono text-sm font-bold flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Continue Chatting Section */}
          <div className="bg-slate border-2 border-divider rounded-xl overflow-hidden animate-scale-in">
            <div className="p-6 md:p-8 border-b border-divider">
              <h3 className="text-xl font-bold text-white font-mono">CONTINUE CONVERSATION</h3>
              <p className="text-sm text-gray-400 font-sans mt-2">
                Ask follow-up questions to the customer persona (persona is locked)
              </p>
            </div>

            {/* Messages */}
            {messages.length > 0 && (
              <div className="max-h-96 overflow-y-auto p-6 md:p-8 space-y-6 bg-charcoal/50">
                {messages.map((message, index) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    delay={index * 50}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input */}
            <div className="p-6 md:p-8 bg-slate/50">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a follow-up question..."
                  disabled={isSending}
                  className="flex-1 bg-charcoal border border-divider rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan transition-colors font-sans disabled:opacity-50"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isSending}
                  className="bg-cyan hover:bg-cyan-600 text-charcoal font-bold px-6 py-3 disabled:opacity-50"
                >
                  {isSending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
