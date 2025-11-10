import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Insights as InsightsType } from '@/types/interview';
import { apiService } from '@/services/api';
import {
  Loader2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Target,
  DollarSign,
  Users,
  Lightbulb
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Insights = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [insights, setInsights] = useState<InsightsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
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
            <p className="text-muted-foreground">Analyzing your business idea...</p>
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

  const getVerdictColor = (verdict: string) => {
    if (verdict === 'GO') return 'bg-green-500';
    if (verdict === 'NO GO') return 'bg-red-500';
    return 'bg-yellow-500';
  };

  const getVerdictIcon = (verdict: string) => {
    if (verdict === 'GO') return <CheckCircle2 className="h-6 w-6" />;
    if (verdict === 'NO GO') return <XCircle className="h-6 w-6" />;
    return <AlertTriangle className="h-6 w-6" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 7) return 'text-green-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Business Validation Report
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Brutally honest analysis of your business idea based on actual interview evidence
            </p>
          </div>

          {/* Overall Verdict */}
          <Card className="mb-6 border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-full ${getVerdictColor(insights.overallVerdict)} text-white`}>
                    {getVerdictIcon(insights.overallVerdict)}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{insights.overallVerdict}</CardTitle>
                    <CardDescription>
                      {insights.confidenceScore}% confidence in this assessment
                    </CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-foreground">{insights.confidenceScore}%</div>
                  <div className="text-sm text-muted-foreground">Confidence</div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Validation Scores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Problem Validation */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Problem
                  </CardTitle>
                  <div className={`text-2xl font-bold ${getScoreColor(insights.problemValidation.score)}`}>
                    {insights.problemValidation.score}/10
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Badge variant={insights.problemValidation.score >= 7 ? "default" : "secondary"}>
                  {insights.problemValidation.label}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  {insights.problemValidation.reasoning}
                </p>
              </CardContent>
            </Card>

            {/* Market Validation */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Market
                  </CardTitle>
                  <div className={`text-2xl font-bold ${getScoreColor(insights.marketValidation.score)}`}>
                    {insights.marketValidation.score}/10
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Badge variant={insights.marketValidation.score >= 7 ? "default" : "secondary"}>
                  {insights.marketValidation.label}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  {insights.marketValidation.reasoning}
                </p>
              </CardContent>
            </Card>

            {/* Payment Validation */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Payment
                  </CardTitle>
                  <div className={`text-2xl font-bold ${getScoreColor(insights.paymentValidation.score)}`}>
                    {insights.paymentValidation.score}/10
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Badge variant={insights.paymentValidation.score >= 7 ? "default" : "secondary"}>
                  {insights.paymentValidation.label}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  {insights.paymentValidation.reasoning}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for Details */}
          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="good">Good News</TabsTrigger>
              <TabsTrigger value="bad">Red Flags</TabsTrigger>
              <TabsTrigger value="execution">Execution</TabsTrigger>
              <TabsTrigger value="next">Next Steps</TabsTrigger>
            </TabsList>

            {/* Detailed Analysis */}
            <TabsContent value="analysis" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Analysis</CardTitle>
                  <CardDescription>The honest truth about your business idea</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    {insights.detailedAnalysis.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="mb-4 text-foreground">{paragraph}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Key Quotes */}
              {insights.keyQuotes.length > 0 && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Key Evidence</CardTitle>
                    <CardDescription>What the user actually said</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {insights.keyQuotes.map((quote, idx) => (
                        <div key={idx} className="border-l-4 border-primary pl-4 py-2 bg-muted/50">
                          <p className="text-sm italic text-foreground">"{quote}"</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Good News */}
            <TabsContent value="good" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Positive Signals
                  </CardTitle>
                  <CardDescription>What's working in your favor</CardDescription>
                </CardHeader>
                <CardContent>
                  {insights.goodNews.length > 0 ? (
                    <ul className="space-y-3">
                      {insights.goodNews.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No positive signals identified</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bad News */}
            <TabsContent value="bad" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-red-600" />
                    Red Flags
                  </CardTitle>
                  <CardDescription>Issues that need your attention</CardDescription>
                </CardHeader>
                <CardContent>
                  {insights.badNews.length > 0 ? (
                    <ul className="space-y-3">
                      {insights.badNews.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No major red flags identified</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Execution Challenges */}
            <TabsContent value="execution" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Execution Challenges
                  </CardTitle>
                  <CardDescription>What will be hard to build or sell</CardDescription>
                </CardHeader>
                <CardContent>
                  {insights.executionChallenges.length > 0 ? (
                    <ul className="space-y-3">
                      {insights.executionChallenges.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No major execution challenges identified</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Next Steps */}
            <TabsContent value="next" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Recommended Next Steps
                  </CardTitle>
                  <CardDescription>What to do from here</CardDescription>
                </CardHeader>
                <CardContent>
                  {insights.nextSteps.length > 0 ? (
                    <ol className="space-y-3">
                      {insights.nextSteps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-foreground pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-muted-foreground">No specific recommendations at this time</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Insights;
