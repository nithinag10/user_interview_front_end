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

export interface ThemeInsight {
  theme: string;
  quotes: string[];
  emotionalTone: string;
  underlyingNeed: string;
}

export interface HumanInsight {
  coreDesires: string[];
  fearsOrFrustrations: string[];
  aspirations: string[];
}

export interface ContextualInsight {
  whenProblemFelt: string[];
  triggersMoments: string[];
  preventionBarriers: string[];
}

export interface EmotionalPhase {
  phase: string;
  emotion: string;
  emoji: string;
}

export interface Insights {
  summary: string;
  overallMood: string;
  moodEmoji: string;
  topicCloud: string[];
  themes: ThemeInsight[];
  humanInsights: HumanInsight;
  contextualInsights: ContextualInsight;
  opportunityMap: string[];
  emotionalJourney: EmotionalPhase[];
}
