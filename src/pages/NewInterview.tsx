import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';
import { apiService } from '@/services/api';
import { Loader2, Building2, User, ArrowRight, Zap } from 'lucide-react';

type PersonaType = 'b2c' | 'b2b';
type BudgetAuthority = 'personal' | 'household' | 'cost-center' | 'recommender' | 'no-authority';

interface PersonaData {
  type: PersonaType;
  // Shared field
  jtbd: string;

  // B2C specific
  ageRange?: string;
  location?: string;
  psychographics?: string;
  disposableIncome?: number; // Monthly disposable income
  b2cBudgetAuthority?: 'personal' | 'household';

  // B2B specific
  industry?: string;
  customIndustry?: string;
  role?: string;
  customRole?: string;
  companySize?: string;
  b2bBudgetAuthority?: 'cost-center' | 'recommender' | 'no-authority';

  // Shared
  currentAlternative: string;
}

interface BusinessContext {
  problem: string;
  solution: string;
}

const NewInterview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const [personaData, setPersonaData] = useState<PersonaData>({
    type: 'b2c',
    jtbd: '',
    currentAlternative: '',
    disposableIncome: 500, // Default $500/month
  });

  const [businessContext, setBusinessContext] = useState<BusinessContext>({
    problem: '',
    solution: '',
  });

  const handlePersonaTypeChange = (type: PersonaType) => {
    setPersonaData({
      type,
      jtbd: personaData.jtbd,
      currentAlternative: personaData.currentAlternative,
    });
  };

  const handleStep1Continue = () => {
    // Validation
    if (!personaData.jtbd.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please describe the job-to-be-done.',
        variant: 'destructive',
      });
      return;
    }

    if (!personaData.currentAlternative.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please describe what they currently use.',
        variant: 'destructive',
      });
      return;
    }

    if (personaData.type === 'b2c') {
      if (!personaData.psychographics || !personaData.b2cBudgetAuthority) {
        toast({
          title: 'Missing Information',
          description: 'Please fill in all B2C fields.',
          variant: 'destructive',
        });
        return;
      }
    } else {
      // B2B validation
      const hasIndustry = personaData.industry && (personaData.industry !== 'custom' || personaData.customIndustry?.trim());
      const hasRole = personaData.role && (personaData.role !== 'custom' || personaData.customRole?.trim());

      if (!hasIndustry || !hasRole || !personaData.companySize || !personaData.b2bBudgetAuthority) {
        toast({
          title: 'Missing Information',
          description: 'Please fill in all B2B fields including custom values.',
          variant: 'destructive',
        });
        return;
      }
    }

    setCurrentStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!businessContext.problem.trim() || !businessContext.solution.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in both problem and solution fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create a mock persona for now (backend will need updating)
      const mockPersonaId = 'custom-persona-' + Date.now();

      const response = await apiService.startInterview(
        mockPersonaId,
        businessContext.problem,
        businessContext.solution
      );

      sessionStorage.setItem('currentPersona', JSON.stringify(personaData));
      sessionStorage.setItem('currentProblem', businessContext.problem);
      sessionStorage.setItem('currentSolution', businessContext.solution);
      sessionStorage.setItem('currentInterviewId', response.interviewId);

      toast({
        title: 'Interview starting!',
        description: 'Preparing your validation simulation...',
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

  return (
    <div className="min-h-screen bg-charcoal text-gray-100">
      <Header />

      <div className="container mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl font-mono font-bold text-lg transition-all ${
                currentStep === 1
                  ? 'bg-cyan text-charcoal shadow-lg shadow-cyan/30'
                  : 'bg-cyan/20 text-cyan border-2 border-cyan/40'
              }`}>
                01
                {currentStep === 2 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-mint rounded-full border-2 border-charcoal flex items-center justify-center">
                    <svg className="w-3 h-3 text-charcoal" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className={`h-1 w-24 rounded transition-all ${currentStep === 2 ? 'bg-cyan' : 'bg-divider'}`} />
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl font-mono font-bold text-lg transition-all ${
                currentStep === 2
                  ? 'bg-cyan text-charcoal shadow-lg shadow-cyan/30'
                  : 'bg-slate text-gray-500 border-2 border-divider'
              }`}>
                02
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-sans">
                {currentStep === 1 ? (
                  <>Define <span className="text-cyan">The Skeptic</span></>
                ) : (
                  <>Frame <span className="text-burnt-orange">The Problem</span></>
                )}
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                {currentStep === 1
                  ? 'Who are you selling to? Start by defining the core entity of your target customer.'
                  : 'What problem are they facing, and what solution are you proposing?'}
              </p>
            </div>
          </div>

          {/* Step 1: Persona Definition */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-slide-up">
              {/* Persona Type Toggle */}
              <div className="bg-slate border-2 border-divider rounded-xl p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2 font-sans">
                    1. Who are you selling to?
                  </h3>
                  <p className="text-sm text-gray-400 font-mono">THE FIRST DECISION</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handlePersonaTypeChange('b2c')}
                    className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                      personaData.type === 'b2c'
                        ? 'border-cyan bg-cyan/10 shadow-lg shadow-cyan/20'
                        : 'border-divider bg-charcoal hover:border-cyan/40'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-colors ${
                        personaData.type === 'b2c' ? 'bg-cyan/20' : 'bg-slate'
                      }`}>
                        <User className={`w-8 h-8 ${personaData.type === 'b2c' ? 'text-cyan' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <h4 className={`font-bold text-lg mb-1 ${personaData.type === 'b2c' ? 'text-cyan' : 'text-white'}`}>
                          B2C: Individual
                        </h4>
                        <p className="text-sm text-gray-400">
                          Consumer or freelancer
                        </p>
                      </div>
                    </div>
                    {personaData.type === 'b2c' && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-cyan rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-charcoal" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePersonaTypeChange('b2b')}
                    className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                      personaData.type === 'b2b'
                        ? 'border-cyan bg-cyan/10 shadow-lg shadow-cyan/20'
                        : 'border-divider bg-charcoal hover:border-cyan/40'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-colors ${
                        personaData.type === 'b2b' ? 'bg-cyan/20' : 'bg-slate'
                      }`}>
                        <Building2 className={`w-8 h-8 ${personaData.type === 'b2b' ? 'text-cyan' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <h4 className={`font-bold text-lg mb-1 ${personaData.type === 'b2b' ? 'text-cyan' : 'text-white'}`}>
                          B2B: Business
                        </h4>
                        <p className="text-sm text-gray-400">
                          Employee buying for org
                        </p>
                      </div>
                    </div>
                    {personaData.type === 'b2b' && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-cyan rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-charcoal" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Job-to-be-Done (Shared Field) */}
              <div className="bg-slate border-2 border-divider rounded-xl p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2 font-sans">
                    2. The Customer's Core Goal
                  </h3>
                  <p className="text-sm text-gray-400 font-mono">JOB-TO-BE-DONE (CRITICAL)</p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="jtbd" className="text-white font-medium">
                    What specific outcome are they trying to achieve?
                  </Label>
                  <Textarea
                    id="jtbd"
                    placeholder="e.g., 'Save $50 on their annual travel' or 'Reduce compliance audit time by 5 hours'"
                    rows={3}
                    value={personaData.jtbd}
                    onChange={(e) => setPersonaData({ ...personaData, jtbd: e.target.value })}
                    className="bg-charcoal border-2 border-divider text-white placeholder:text-gray-600 focus:border-cyan font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 font-mono">
                    ⚡ Focus on measurable outcomes, not vague desires
                  </p>
                </div>
              </div>

              {/* Context-Specific Fields */}
              {personaData.type === 'b2c' ? (
                <div className="space-y-6">
                  <div className="bg-slate border-2 border-divider rounded-xl p-8">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-white mb-2 font-sans">
                        3. Individual Context
                      </h3>
                      <p className="text-sm text-gray-400 font-mono">B2C SPECIFICS</p>
                    </div>

                    <div className="space-y-6">
                      {/* Demographics */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="age" className="text-white font-medium">Age Range</Label>
                          <Select value={personaData.ageRange} onValueChange={(value) => setPersonaData({ ...personaData, ageRange: value })}>
                            <SelectTrigger className="bg-charcoal border-2 border-divider text-white">
                              <SelectValue placeholder="Select age range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="18-24">18-24</SelectItem>
                              <SelectItem value="25-34">25-34</SelectItem>
                              <SelectItem value="35-44">35-44</SelectItem>
                              <SelectItem value="45-54">45-54</SelectItem>
                              <SelectItem value="55+">55+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="location" className="text-white font-medium">Location</Label>
                          <Input
                            id="location"
                            placeholder="e.g., San Francisco, USA"
                            value={personaData.location || ''}
                            onChange={(e) => setPersonaData({ ...personaData, location: e.target.value })}
                            className="bg-charcoal border-2 border-divider text-white placeholder:text-gray-600"
                          />
                        </div>
                      </div>

                      {/* Psychographics */}
                      <div className="space-y-3">
                        <Label htmlFor="psychographics" className="text-white font-medium">
                          Psychographics & Behavior
                        </Label>
                        <Textarea
                          id="psychographics"
                          placeholder="e.g., 'Budget conscious,' 'Early adopter of fitness tech,' 'Spends hours on TikTok'"
                          rows={3}
                          value={personaData.psychographics || ''}
                          onChange={(e) => setPersonaData({ ...personaData, psychographics: e.target.value })}
                          className="bg-charcoal border-2 border-divider text-white placeholder:text-gray-600 font-mono text-sm"
                        />
                      </div>

                      {/* Disposable Income Slider */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-white font-medium">Monthly Disposable Income</Label>
                          <span className="font-mono text-lg text-cyan font-bold">
                            ${personaData.disposableIncome?.toLocaleString()}
                          </span>
                        </div>
                        <Slider
                          value={[personaData.disposableIncome || 500]}
                          onValueChange={(value) => setPersonaData({ ...personaData, disposableIncome: value[0] })}
                          min={0}
                          max={5000}
                          step={50}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 font-mono">
                          <span>$0</span>
                          <span>$5,000</span>
                        </div>
                      </div>

                      {/* Budget Authority */}
                      <div className="space-y-3">
                        <Label className="text-white font-medium">Budget Authority</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setPersonaData({ ...personaData, b2cBudgetAuthority: 'personal' })}
                            className={`p-4 rounded-lg border-2 text-left transition-all ${
                              personaData.b2cBudgetAuthority === 'personal'
                                ? 'border-cyan bg-cyan/10 text-cyan'
                                : 'border-divider bg-charcoal text-gray-400 hover:border-cyan/40'
                            }`}
                          >
                            <div className="font-mono font-semibold text-sm">Personal Income</div>
                            <div className="text-xs mt-1 opacity-80">Disposable income</div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPersonaData({ ...personaData, b2cBudgetAuthority: 'household' })}
                            className={`p-4 rounded-lg border-2 text-left transition-all ${
                              personaData.b2cBudgetAuthority === 'household'
                                ? 'border-cyan bg-cyan/10 text-cyan'
                                : 'border-divider bg-charcoal text-gray-400 hover:border-cyan/40'
                            }`}
                          >
                            <div className="font-mono font-semibold text-sm">Household Budget</div>
                            <div className="text-xs mt-1 opacity-80">Shared finances</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-slate border-2 border-divider rounded-xl p-8">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-white mb-2 font-sans">
                        3. Organizational Context
                      </h3>
                      <p className="text-sm text-gray-400 font-mono">B2B SPECIFICS</p>
                    </div>

                    <div className="space-y-6">
                      {/* Industry & Role */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="industry" className="text-white font-medium">Industry</Label>
                          <Select
                            value={personaData.industry}
                            onValueChange={(value) => {
                              if (value === 'custom') {
                                setPersonaData({ ...personaData, industry: value, customIndustry: '' });
                              } else {
                                setPersonaData({ ...personaData, industry: value, customIndustry: undefined });
                              }
                            }}
                          >
                            <SelectTrigger className="bg-charcoal border-2 border-divider text-white">
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="saas">SaaS</SelectItem>
                              <SelectItem value="manufacturing">Manufacturing</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="custom">Other (specify)</SelectItem>
                            </SelectContent>
                          </Select>
                          {personaData.industry === 'custom' && (
                            <Input
                              placeholder="Type your industry..."
                              value={personaData.customIndustry || ''}
                              onChange={(e) => setPersonaData({ ...personaData, customIndustry: e.target.value })}
                              className="bg-charcoal border-2 border-cyan text-white placeholder:text-gray-600 font-mono"
                            />
                          )}
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="role" className="text-white font-medium">User Role</Label>
                          <Select
                            value={personaData.role}
                            onValueChange={(value) => {
                              if (value === 'custom') {
                                setPersonaData({ ...personaData, role: value, customRole: '' });
                              } else {
                                setPersonaData({ ...personaData, role: value, customRole: undefined });
                              }
                            }}
                          >
                            <SelectTrigger className="bg-charcoal border-2 border-divider text-white">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cfo">CFO</SelectItem>
                              <SelectItem value="marketing-manager">Marketing Manager</SelectItem>
                              <SelectItem value="developer">Developer</SelectItem>
                              <SelectItem value="operations">Operations Manager</SelectItem>
                              <SelectItem value="founder">Founder/CEO</SelectItem>
                              <SelectItem value="custom">Other (specify)</SelectItem>
                            </SelectContent>
                          </Select>
                          {personaData.role === 'custom' && (
                            <Input
                              placeholder="Type the role..."
                              value={personaData.customRole || ''}
                              onChange={(e) => setPersonaData({ ...personaData, customRole: e.target.value })}
                              className="bg-charcoal border-2 border-cyan text-white placeholder:text-gray-600 font-mono"
                            />
                          )}
                        </div>
                      </div>

                      {/* Company Size */}
                      <div className="space-y-3">
                        <Label className="text-white font-medium">Company Size</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {['1-50', '51-200', '201-1000', '1000+'].map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => setPersonaData({ ...personaData, companySize: size })}
                              className={`p-3 rounded-lg border-2 text-center transition-all ${
                                personaData.companySize === size
                                  ? 'border-cyan bg-cyan/10 text-cyan'
                                  : 'border-divider bg-charcoal text-gray-400 hover:border-cyan/40'
                              }`}
                            >
                              <div className="font-mono font-semibold text-sm">{size}</div>
                              <div className="text-xs mt-1 opacity-80">employees</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Budget Authority */}
                      <div className="space-y-3">
                        <Label className="text-white font-medium">Budget Authority</Label>
                        <div className="space-y-3">
                          <button
                            type="button"
                            onClick={() => setPersonaData({ ...personaData, b2bBudgetAuthority: 'cost-center' })}
                            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                              personaData.b2bBudgetAuthority === 'cost-center'
                                ? 'border-cyan bg-cyan/10'
                                : 'border-divider bg-charcoal hover:border-cyan/40'
                            }`}
                          >
                            <div className={`font-mono font-semibold text-sm mb-1 ${personaData.b2bBudgetAuthority === 'cost-center' ? 'text-cyan' : 'text-white'}`}>
                              Cost Center Owner
                            </div>
                            <div className="text-xs text-gray-400">Has budget and can make purchasing decisions</div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPersonaData({ ...personaData, b2bBudgetAuthority: 'recommender' })}
                            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                              personaData.b2bBudgetAuthority === 'recommender'
                                ? 'border-burnt-orange bg-burnt-orange/10'
                                : 'border-divider bg-charcoal hover:border-burnt-orange/40'
                            }`}
                          >
                            <div className={`font-mono font-semibold text-sm mb-1 ${personaData.b2bBudgetAuthority === 'recommender' ? 'text-burnt-orange' : 'text-white'}`}>
                              Recommender Only
                            </div>
                            <div className="text-xs text-gray-400">Needs approval from above</div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPersonaData({ ...personaData, b2bBudgetAuthority: 'no-authority' })}
                            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                              personaData.b2bBudgetAuthority === 'no-authority'
                                ? 'border-burnt-orange bg-burnt-orange/10'
                                : 'border-divider bg-charcoal hover:border-burnt-orange/40'
                            }`}
                          >
                            <div className={`font-mono font-semibold text-sm mb-1 ${personaData.b2bBudgetAuthority === 'no-authority' ? 'text-burnt-orange' : 'text-white'}`}>
                              No Authority
                            </div>
                            <div className="text-xs text-gray-400">Cannot influence purchasing</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Current Alternative */}
              <div className="bg-slate border-2 border-divider rounded-xl p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2 font-sans">
                    4. Current Alternative
                  </h3>
                  <p className="text-sm text-gray-400 font-mono">WHAT THEY USE NOW</p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="alternative" className="text-white font-medium">
                    What do they currently use to solve this problem?
                  </Label>
                  <Input
                    id="alternative"
                    placeholder="e.g., 'Google Sheets,' 'A competitor app,' 'Manual process,' 'Nothing at all'"
                    value={personaData.currentAlternative}
                    onChange={(e) => setPersonaData({ ...personaData, currentAlternative: e.target.value })}
                    className="bg-charcoal border-2 border-divider text-white placeholder:text-gray-600 font-mono"
                  />
                </div>
              </div>

              {/* Continue Button */}
              <Button
                onClick={handleStep1Continue}
                size="lg"
                className="w-full gap-3 bg-cyan hover:bg-cyan-600 text-charcoal font-bold text-lg px-10 py-7 shadow-xl shadow-cyan/30 hover:shadow-cyan/50 transition-all border-0"
              >
                Continue to Problem Framing
                <ArrowRight className="h-6 w-6" />
              </Button>
            </div>
          )}

          {/* Step 2: Business Context */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-slide-up">
              {/* Persona Summary */}
              <div className="bg-slate/50 border-2 border-cyan/30 rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-mono mb-2">VALIDATING WITH:</p>
                    <div className="flex items-center gap-3">
                      {personaData.type === 'b2c' ? (
                        <User className="w-5 h-5 text-cyan" />
                      ) : (
                        <Building2 className="w-5 h-5 text-cyan" />
                      )}
                      <p className="font-bold text-white">
                        {personaData.type === 'b2c' ? 'B2C Individual' : 'B2B Organization'}
                        {personaData.type === 'b2b' && personaData.role && ` • ${personaData.role}`}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentStep(1)}
                    className="text-cyan hover:text-cyan-600"
                  >
                    Edit
                  </Button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Problem */}
                <div className="bg-slate border-2 border-divider rounded-xl p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2 font-sans">
                      1. The Problem
                    </h3>
                    <p className="text-sm text-gray-400 font-mono">WHAT PAIN ARE THEY EXPERIENCING?</p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="problem" className="text-white font-medium">
                      Describe the specific pain point or challenge
                    </Label>
                    <Textarea
                      id="problem"
                      placeholder="e.g., 'They don't have time to plan healthy meals and often resort to expensive takeout, costing $200+/month'"
                      rows={4}
                      value={businessContext.problem}
                      onChange={(e) => setBusinessContext({ ...businessContext, problem: e.target.value })}
                      className="bg-charcoal border-2 border-divider text-white placeholder:text-gray-600 focus:border-burnt-orange font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500 font-mono">
                      ⚠️ Be specific about the cost, time, or frustration they experience
                    </p>
                  </div>
                </div>

                {/* Solution */}
                <div className="bg-slate border-2 border-divider rounded-xl p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2 font-sans">
                      2. Your Proposed Solution
                    </h3>
                    <p className="text-sm text-gray-400 font-mono">WHAT ARE YOU BUILDING?</p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="solution" className="text-white font-medium">
                      Describe your product idea
                    </Label>
                    <Textarea
                      id="solution"
                      placeholder="e.g., 'A mobile app that generates personalized weekly meal plans based on dietary preferences and automatically creates shopping lists'"
                      rows={4}
                      value={businessContext.solution}
                      onChange={(e) => setBusinessContext({ ...businessContext, solution: e.target.value })}
                      className="bg-charcoal border-2 border-divider text-white placeholder:text-gray-600 focus:border-cyan font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500 font-mono">
                      💡 Focus on what it does, not how smart it is
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    size="lg"
                    className="flex-1 border-2 border-divider text-gray-300 hover:text-white hover:bg-slate hover:border-cyan transition-all"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="flex-1 gap-3 bg-burnt-orange hover:bg-burnt-orange-600 text-white font-bold text-lg px-10 py-7 shadow-xl shadow-burnt-orange/30 hover:shadow-burnt-orange/50 transition-all border-0"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Starting Simulation...
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5" />
                        Run Mom Test Simulation
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewInterview;
