import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import InsightsSummary from '@/components/InsightsSummary';
import ThemeBreakdown from '@/components/ThemeBreakdown';
import HumanInsights from '@/components/HumanInsights';
import ContextualInsights from '@/components/ContextualInsights';
import OpportunityMap from '@/components/OpportunityMap';
import EmotionalJourney from '@/components/EmotionalJourney';
import NextSteps from '@/components/NextSteps';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Insights as InsightsType } from '@/types/interview';
import { apiService } from '@/services/api';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Insights = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [insights, setInsights] = useState<InsightsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      // Check if we have persona data and interviewId
      const personaData = sessionStorage.getItem('currentPersona');
      const interviewId = sessionStorage.getItem('currentInterviewId');

      if (!personaData || !interviewId) {
        navigate('/new-interview');
        return;
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Analyzing interview insights...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !insights) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto flex flex-col items-center justify-center py-20">
            <p className="text-destructive mb-4">{error || 'Failed to load insights'}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-primary hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-3">
              What this interview reveals
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Deep insights extracted from the conversation to help you understand motivations, patterns, and opportunities
            </p>
          </div>

          <InsightsSummary
            summary={insights.summary}
            overallMood={insights.overallMood}
            moodEmoji={insights.moodEmoji}
            topicCloud={insights.topicCloud}
          />

          <Tabs defaultValue="themes" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="themes">Themes</TabsTrigger>
              <TabsTrigger value="human">Human Layer</TabsTrigger>
              <TabsTrigger value="context">Context</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              <TabsTrigger value="journey">Journey</TabsTrigger>
            </TabsList>

            <TabsContent value="themes" className="animate-fade-in">
              <ThemeBreakdown themes={insights.themes} />
            </TabsContent>

            <TabsContent value="human" className="animate-fade-in">
              <HumanInsights insights={insights.humanInsights} />
            </TabsContent>

            <TabsContent value="context" className="animate-fade-in">
              <ContextualInsights insights={insights.contextualInsights} />
            </TabsContent>

            <TabsContent value="opportunities" className="animate-fade-in">
              <OpportunityMap opportunities={insights.opportunityMap} />
            </TabsContent>

            <TabsContent value="journey" className="animate-fade-in">
              <EmotionalJourney journey={insights.emotionalJourney} />
            </TabsContent>
          </Tabs>

          <div className="mt-8 animate-slide-up">
            <NextSteps />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
