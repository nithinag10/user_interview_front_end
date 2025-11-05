import { ChatMessage, Insights } from '@/types/interview';

export const mockConversation: ChatMessage[] = [
  {
    id: '1',
    agent: 'interviewer',
    message: "Hi! Thanks for taking the time to chat with me today. I'd love to learn more about your experience. Can you start by telling me a bit about what you do?",
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: '2',
    agent: 'customer',
    message: "Sure! I'm a founder of a B2B SaaS startup. We've been building a project management tool for remote teams for about 18 months now.",
    timestamp: new Date(Date.now() - 280000),
  },
  {
    id: '3',
    agent: 'interviewer',
    message: "That's exciting! What made you decide to build this tool? Was there a specific problem you were trying to solve?",
    timestamp: new Date(Date.now() - 260000),
  },
  {
    id: '4',
    agent: 'customer',
    message: "Honestly, it came from personal frustration. When our team went remote, we tried every tool out there - Asana, Monday, Trello - but nothing felt quite right. Too complex or too simple, never just right.",
    timestamp: new Date(Date.now() - 240000),
  },
  {
    id: '5',
    agent: 'interviewer',
    message: "I see. Can you help me understand what 'just right' means to you? What were you looking for that you couldn't find?",
    timestamp: new Date(Date.now() - 220000),
  },
  {
    id: '6',
    agent: 'customer',
    message: "Great question. We needed something powerful enough for engineering teams but simple enough that marketing could use it without training. Most tools force you to choose between those two extremes.",
    timestamp: new Date(Date.now() - 200000),
  },
  {
    id: '7',
    agent: 'interviewer',
    message: "That's really interesting. When you say 'without training,' what does that experience look like in your mind?",
    timestamp: new Date(Date.now() - 180000),
  },
  {
    id: '8',
    agent: 'customer',
    message: "Someone joins the company, they get added to the tool, and within 5 minutes they understand how to create a task, assign it, and track progress. No documentation needed.",
    timestamp: new Date(Date.now() - 160000),
  },
  {
    id: '9',
    agent: 'interviewer',
    message: "Got it. And on the flip side, what are the 'powerful' features that your engineering team needs but often can't get in simple tools?",
    timestamp: new Date(Date.now() - 140000),
  },
  {
    id: '10',
    agent: 'customer',
    message: "Things like dependency tracking, custom workflows, API integrations, automation rules. The stuff that makes developers' lives easier but tends to make tools overwhelming for everyone else.",
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: '11',
    agent: 'interviewer',
    message: "That makes sense. How did these pain points affect your team before you started building your solution?",
    timestamp: new Date(Date.now() - 100000),
  },
  {
    id: '12',
    agent: 'customer',
    message: "It was rough. We'd have developers using one tool, designers using another, and project managers trying to bridge them with spreadsheets. Nothing synced, lots of duplicate work, constant confusion about status.",
    timestamp: new Date(Date.now() - 80000),
  },
  {
    id: '13',
    agent: 'interviewer',
    message: "That sounds frustrating. If you could wave a magic wand and fix one thing about that experience, what would it be?",
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: '14',
    agent: 'customer',
    message: "Universal clarity. Everyone in the company should be able to see what's happening, what's next, and what's blocked - regardless of their technical background or role.",
    timestamp: new Date(Date.now() - 40000),
  },
  {
    id: '15',
    agent: 'interviewer',
    message: "That's a powerful vision. Thank you so much for sharing all of this with me. This has been incredibly helpful!",
    timestamp: new Date(Date.now() - 20000),
  },
];

export const mockInsights: Insights = {
  summary: "This founder struggles to find the right balance between powerful features and simplicity in project management tools. The conversation reveals deep frustration with tool fragmentation and a vision for universal clarity across teams.",
  overallMood: "Frustrated but Hopeful",
  moodEmoji: "😤→😌",
  topicCloud: [
    "complexity", "simplicity", "fragmentation", "clarity", "onboarding", 
    "technical teams", "integration", "workflow", "status", "training"
  ],
  themes: [
    {
      theme: "Tool Complexity vs Simplicity",
      quotes: [
        "Too complex or too simple, never just right",
        "Powerful enough for engineering but simple enough for marketing"
      ],
      emotionalTone: "Frustration",
      underlyingNeed: "Balance & Flexibility"
    },
    {
      theme: "Team Fragmentation",
      quotes: [
        "Developers using one tool, designers using another",
        "Nothing synced, lots of duplicate work"
      ],
      emotionalTone: "Overwhelm",
      underlyingNeed: "Unity & Synchronization"
    },
    {
      theme: "Onboarding Friction",
      quotes: [
        "Within 5 minutes they understand how to create a task",
        "No documentation needed"
      ],
      emotionalTone: "Determination",
      underlyingNeed: "Ease of Use"
    }
  ],
  humanInsights: {
    coreDesires: [
      "Belonging — wants all team members to feel the tool is built for them",
      "Control — seeks to eliminate chaos and create predictable workflows",
      "Recognition — desires to build something that solves a real problem elegantly"
    ],
    fearsOrFrustrations: [
      "Fear of building yet another tool that doesn't quite work",
      "Frustration with existing solutions that force unnecessary trade-offs",
      "Worry about team members feeling excluded or overwhelmed by tools"
    ],
    aspirations: [
      "Wants to create universal clarity that everyone can understand",
      "Aspires to eliminate the need for training and documentation",
      "Dreams of bridging technical and non-technical worlds seamlessly"
    ]
  },
  contextualInsights: {
    whenProblemFelt: [
      "When teams went remote and tool fragmentation became visible",
      "During onboarding when new members struggle with complex interfaces",
      "In daily standups when status updates are scattered across platforms"
    ],
    triggersMoments: [
      "Personal frustration with existing tools led to building a solution",
      "Seeing non-technical team members give up on powerful tools",
      "Watching developers create workarounds due to tool limitations"
    ],
    preventionBarriers: [
      "Existing tools force a choice between simplicity and power",
      "Integration complexity makes unified solutions difficult",
      "Training overhead prevents quick adoption of sophisticated tools"
    ]
  },
  opportunityMap: [
    "People are overwhelmed by feature complexity — explore progressive disclosure patterns",
    "Team fragmentation is causing real workflow pain — consider unified but flexible interfaces",
    "Onboarding friction is a major barrier — investigate zero-training interaction models",
    "Status visibility is a universal need — explore ambient awareness systems",
    "Role-based needs are conflicting — research adaptive UI that serves multiple user types"
  ],
  emotionalJourney: [
    { phase: "Opening", emotion: "Engaged Curiosity", emoji: "🤔" },
    { phase: "Problem Discovery", emotion: "Rising Frustration", emoji: "😤" },
    { phase: "Deep Dive", emotion: "Passionate Explanation", emoji: "💡" },
    { phase: "Vision Sharing", emotion: "Hopeful Determination", emoji: "😌" },
    { phase: "Closure", emotion: "Satisfied Reflection", emoji: "✨" }
  ]
};
