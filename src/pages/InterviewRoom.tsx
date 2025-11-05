import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import ChatMessage from '@/components/ChatMessage';
import { ChatMessage as ChatMessageType } from '@/types/interview';
import { Loader2 } from 'lucide-react';
import { apiService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const InterviewRoom = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // Check if persona and interviewId exist
    const personaData = sessionStorage.getItem('currentPersona');
    const interviewId = sessionStorage.getItem('currentInterviewId');

    console.log('📋 InterviewRoom - Loading session data...');
    console.log('   Interview ID:', interviewId);
    console.log('   Has persona:', !!personaData);

    if (!personaData || !interviewId) {
      console.log('❌ Missing session data, redirecting to /new-interview');
      navigate('/new-interview');
      return;
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
          title: 'Interview Complete',
          description: 'The AI interview has finished. View insights now!',
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
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Interview in Progress
                </h1>
                <p className="text-muted-foreground">
                  {isComplete 
                    ? 'Interview complete! View insights below.' 
                    : 'Watch as our AI agents conduct a deep customer interview...'}
                </p>
              </div>
              {!isComplete && (
                <div className="flex items-center gap-2 text-primary">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm font-medium">Live</span>
                </div>
              )}
            </div>
          </div>

          <Card className="p-6 mb-6 animate-scale-in">
            <div className="space-y-6">
              {error ? (
                <div className="text-center py-8">
                  <p className="text-destructive mb-4">{error}</p>
                  <Button onClick={() => window.location.reload()}>
                    Reload Page
                  </Button>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p>Connecting to interview...</p>
                  <p className="text-xs mt-2">Waiting for messages...</p>
                </div>
              ) : (
                <>
                  <div className="text-xs text-muted-foreground mb-2">
                    {messages.length} message{messages.length !== 1 ? 's' : ''} received
                  </div>
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      delay={index * 50}
                    />
                  ))}

                  {!isComplete && (
                    <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div className="w-2 h-2 rounded-full bg-primary animation-delay-150" />
                      <div className="w-2 h-2 rounded-full bg-primary animation-delay-300" />
                    </div>
                  )}
                </>
              )}
            </div>
          </Card>

          {isComplete && (
            <div className="text-center animate-slide-up">
              <Button size="lg" onClick={handleViewInsights}>
                View Insights & Analysis
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewRoom;
