import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import { Persona } from '@/types/interview';
import { useToast } from '@/hooks/use-toast';
import { apiService } from '@/services/api';
import { Loader2 } from 'lucide-react';

interface PredefinedPersona {
  id: string;
  name: string;
  role: string;
  industry: string;
  background: string;
  avatar: string;
  tags: string[];
}

const NewInterview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPersonas, setLoadingPersonas] = useState(false);
  const [predefinedPersonas, setPredefinedPersonas] = useState<PredefinedPersona[]>([]);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [selectedTab, setSelectedTab] = useState<'predefined' | 'custom'>('predefined');
  const [selectedPersona, setSelectedPersona] = useState<PredefinedPersona | null>(null);
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('');
  const [persona, setPersona] = useState<Persona>({
    name: '',
    role: '',
    industry: '',
    background: '',
  });
  const [problem, setProblem] = useState<string>('');
  const [solution, setSolution] = useState<string>('');

  // Fetch predefined personas on component mount
  useEffect(() => {
    const fetchPersonas = async () => {
      setLoadingPersonas(true);
      try {
        const response = await fetch(`${apiService['baseUrl']}/api/interviews/personas`);
        const data = await response.json();
        setPredefinedPersonas(data.personas);
      } catch (error) {
        console.error('Failed to fetch personas:', error);
        toast({
          title: 'Failed to load personas',
          description: 'Using custom persona form instead.',
          variant: 'destructive',
        });
        setSelectedTab('custom');
      } finally {
        setLoadingPersonas(false);
      }
    };

    fetchPersonas();
  }, [toast]);

  const handleSelectPredefinedPersona = (predefinedPersona: PredefinedPersona) => {
    setSelectedPersona(predefinedPersona);
    setSelectedPersonaId(predefinedPersona.id);
  };

  const startInterview = async (
    personaId: string,
    personaData: Persona,
    problemContext: string,
    solutionContext: string
  ) => {
    setIsLoading(true);

    try {
      const response = await apiService.startInterview(
        personaId,
        problemContext,
        solutionContext
      );

      console.log('✅ Interview created:', response.interviewId);
      console.log('   Persona ID:', personaId);
      console.log('   Problem:', problemContext);
      console.log('   Solution:', solutionContext);

      sessionStorage.setItem('currentPersona', JSON.stringify(personaData));
      sessionStorage.setItem('currentProblem', problemContext);
      sessionStorage.setItem('currentSolution', solutionContext);
      sessionStorage.setItem('currentInterviewId', response.interviewId);

      console.log('💾 Saved to sessionStorage:', response.interviewId);

      toast({
        title: 'Interview starting!',
        description: 'Preparing your AI-powered conversation...',
      });

      setTimeout(() => {
        navigate('/interview');
      }, 500);
    } catch (error) {
      console.error('Failed to start interview:', error);
      toast({
        title: 'Failed to start interview',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!persona.name || !persona.role || !persona.industry || !persona.background) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all persona fields to continue.',
        variant: 'destructive',
      });
      return;
    }

    if (!problem.trim() || !solution.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please fill in both problem and solution fields.',
        variant: 'destructive',
      });
      return;
    }

    // For predefined personas, use the ID; for custom personas, we need to handle differently
    if (selectedPersonaId) {
      await startInterview(selectedPersonaId, persona, problem, solution);
    } else {
      // Custom persona - this will need backend support for custom personas
      toast({
        title: 'Custom personas not supported yet',
        description: 'Please select a predefined persona.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Step Indicator */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${currentStep === 1 ? 'bg-primary text-primary-foreground' : 'bg-primary/20 text-primary'}`}>
                1
              </div>
              <div className={`h-1 w-16 ${currentStep === 2 ? 'bg-primary' : 'bg-border'}`} />
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${currentStep === 2 ? 'bg-primary text-primary-foreground' : 'bg-border text-muted-foreground'}`}>
                2
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-3">
              {currentStep === 1 ? 'Step 1: Who do you want to interview?' : 'Step 2: Define Your Product Context'}
            </h1>
            <p className="text-muted-foreground">
              {currentStep === 1
                ? 'Select a persona that matches who you want to learn from.'
                : 'Tell us about your ideal customer, their problem, and your solution.'}
            </p>
          </div>

          {/* Step 1: Persona Selection */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-slide-up">
              <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as 'predefined' | 'custom')}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="predefined">Predefined Personas</TabsTrigger>
                  <TabsTrigger value="custom">Custom Persona</TabsTrigger>
                </TabsList>

                <TabsContent value="predefined">
                  {!selectedPersona ? (
                    <Card>
                      <CardHeader>
                        <CardTitle>Select a Persona</CardTitle>
                        <CardDescription>
                          Choose from our ready-made personas to interview
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {loadingPersonas ? (
                          <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <span className="ml-3 text-muted-foreground">Loading personas...</span>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {predefinedPersonas.map((predefined) => (
                              <button
                                key={predefined.id}
                                onClick={() => handleSelectPredefinedPersona(predefined)}
                                className="group relative text-left p-4 rounded-lg border-2 border-border bg-card hover:border-primary hover:shadow-md transition-all duration-200"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="text-3xl flex-shrink-0 transition-transform group-hover:scale-110">
                                    {predefined.avatar}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                      <div>
                                        <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                                          {predefined.name}
                                        </h3>
                                        <p className="text-xs text-muted-foreground font-medium">
                                          {predefined.role}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {predefined.tags.slice(0, 3).map((tag) => (
                                        <span
                                          key={tag}
                                          className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                {/* Hover indicator */}
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                                    View Details
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="animate-slide-up">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="text-5xl">
                              {selectedPersona.avatar}
                            </div>
                            <div>
                              <CardTitle className="text-2xl mb-2">{selectedPersona.name}</CardTitle>
                              <CardDescription className="text-base">
                                {selectedPersona.role} • {selectedPersona.industry}
                              </CardDescription>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedPersona(null)}
                          >
                            Change
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-2">Background</h4>
                          <p className="text-foreground leading-relaxed">{selectedPersona.background}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-2">Expertise</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedPersona.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-block px-3 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <Button
                            onClick={() => {
                              setPersona({
                                name: selectedPersona.name,
                                role: selectedPersona.role,
                                industry: selectedPersona.industry,
                                background: selectedPersona.background,
                              });
                              setCurrentStep(2);
                            }}
                            className="w-full"
                            size="lg"
                          >
                            Next: Define Product Context
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="custom">
                  <Card>
                    <CardHeader>
                      <CardTitle>Custom Persona</CardTitle>
                      <CardDescription>
                        Create your own unique persona to interview
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        if (!persona.name || !persona.role || !persona.industry || !persona.background) {
                          toast({
                            title: 'Missing information',
                            description: 'Please fill in all persona fields to continue.',
                            variant: 'destructive',
                          });
                          return;
                        }
                        setCurrentStep(2);
                      }} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Customer Name</Label>
                          <Input
                            id="name"
                            placeholder="e.g., Sarah Chen"
                            value={persona.name}
                            onChange={(e) => setPersona({ ...persona, name: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="role">Role / Title</Label>
                          <Input
                            id="role"
                            placeholder="e.g., Startup Founder, Product Manager"
                            value={persona.role}
                            onChange={(e) => setPersona({ ...persona, role: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="industry">Industry</Label>
                          <Input
                            id="industry"
                            placeholder="e.g., B2B SaaS, E-commerce"
                            value={persona.industry}
                            onChange={(e) => setPersona({ ...persona, industry: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="background">Background & Context</Label>
                          <Textarea
                            id="background"
                            placeholder="Describe their challenges, goals, and context. The more detail, the better the interview."
                            rows={5}
                            value={persona.background}
                            onChange={(e) => setPersona({ ...persona, background: e.target.value })}
                          />
                        </div>

                        <Button type="submit" className="w-full" size="lg">
                          Next: Define Product Context
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Step 2: Product Context Form */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-slide-up">
              {/* Interview Persona Summary */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">Interviewing:</p>
                      <p className="font-medium text-foreground">
                        {persona.name} - {persona.role}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentStep(1)}
                    >
                      Change
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Idea</CardTitle>
                  <CardDescription>
                    Tell use about the problem your ideal customer is facing and your proposed solution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="problem">What problem are they facing?</Label>
                      <Textarea
                        id="problem"
                        placeholder="e.g., They don't have time to plan healthy meals for their family and often resort to fast food or ordering takeout"
                        rows={3}
                        value={problem}
                        onChange={(e) => setProblem(e.target.value)}
                        className="resize-none"
                      />
                      <p className="text-xs text-muted-foreground">
                        Explain the specific pain point or challenge they experience
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="solution">What solution do you think would work?</Label>
                      <Textarea
                        id="solution"
                        placeholder="e.g., A mobile app that generates personalized weekly meal plans based on dietary preferences and automatically creates shopping lists"
                        rows={3}
                        value={solution}
                        onChange={(e) => setSolution(e.target.value)}
                        className="resize-none"
                      />
                      <p className="text-xs text-muted-foreground">
                        Describe your proposed solution or product idea
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button type="submit" className="flex-1" size="lg" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Starting Interview...
                          </>
                        ) : (
                          'Validate with the User'
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewInterview;
