export interface Persona {
  name: string;
  role: string;
  industry: string;
  background: string;
}

export interface ChatMessage {
  id: string;
  agent: 'interviewer' | 'customer';
  message: string;
  timestamp: Date;
}

export interface Interview {
  id: string;
  persona: Persona;
  messages: ChatMessage[];
  status: 'setup' | 'in-progress' | 'completed';
  createdAt: Date;
}

export interface ValidationScore {
  score: number; // 0-10
  label: string; // "Strong", "Moderate", "Weak"
  reasoning: string;
}

export interface Insights {
  // Overall verdict
  overallVerdict: string; // "GO", "MAYBE", "NO GO"
  confidenceScore: number; // 0-100

  // Problem validation
  problemValidation: ValidationScore;

  // Market validation
  marketValidation: ValidationScore;

  // Willingness to pay
  paymentValidation: ValidationScore;

  // Key findings
  goodNews: string[]; // Positive signals
  badNews: string[]; // Red flags and concerns

  // Execution challenges
  executionChallenges: string[]; // What will be hard to build/sell

  // Recommendations
  nextSteps: string[]; // What to do next

  // Evidence from interview
  keyQuotes: string[]; // Important things the user said

  // Detailed analysis (the roast)
  detailedAnalysis: string;
}
