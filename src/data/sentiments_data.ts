export const EMOTION_WHEEL = {
  PRIMARY: [
    "joy",
    "trust",
    "fear",
    "surprise",
    "sadness",
    "disgust",
    "anger",
    "anticipation",
  ],
  SECONDARY: [
    "satisfaction",
    "confidence",
    "anxiety",
    "interest",
    "disappointment",
    "dissatisfaction",
    "frustration",
    "optimism",
  ],
  TERTIARY: [
    "enthusiasm",
    "appreciation",
    "concern",
    "curiosity",
    "regret",
    "discomfort",
    "irritation",
    "eagerness",
  ],
};

export const EMOTION_INTENSITY = {
  outrage: { base: "anger", level: 3 },
  anger: { base: "anger", level: 2 },
  annoyance: { base: "anger", level: 1 },

  enthusiasm: { base: "joy", level: 3 },
  satisfaction: { base: "joy", level: 2 },
  contentment: { base: "joy", level: 1 },

  panic: { base: "fear", level: 3 },
  anxiety: { base: "fear", level: 2 },
  concern: { base: "fear", level: 1 },

  admiration: { base: "trust", level: 3 },
  confidence: { base: "trust", level: 2 },
  acknowledgment: { base: "trust", level: 1 },

  despair: { base: "sadness", level: 3 },
  disappointment: { base: "sadness", level: 2 },
  regret: { base: "sadness", level: 1 },

  repulsion: { base: "disgust", level: 3 },
  disapproval: { base: "disgust", level: 2 },
  discomfort: { base: "disgust", level: 1 },

  amazement: { base: "surprise", level: 3 },
  interest: { base: "surprise", level: 2 },
  curiosity: { base: "surprise", level: 1 },

  eagerness: { base: "anticipation", level: 3 },
  anticipation: { base: "anticipation", level: 2 },
  expectation: { base: "anticipation", level: 1 },
};

export const SENTIMENT_CATEGORIES = {
  SATISFACTION: "Feelings of accomplishment and positive outcomes",
  APPRECIATION: "Recognition and gratitude for contributions or support",
  CONFIDENCE: "Conviction and belief in capabilities or decisions",
  ENTHUSIASM: "Strong excitement and engagement about ideas or projects",
  OPTIMISM: "Positive outlook regarding future prospects",
  RELIEF: "Alleviation of tension after resolving issues",
  PRIDE: "Sense of achievement and acknowledgment of excellence",

  DISAPPOINTMENT: "Unfulfilled expectations or unsatisfactory results",
  FRUSTRATION: "Blocked goals or persistent obstacles",
  CONCERN: "Worry about potential issues or outcomes",
  ANXIETY: "Unease about uncertainties or challenges",
  DISSATISFACTION: "Discontent with situations or deliverables",
  CONFUSION: "Lack of clarity or understanding",
  OVERWHELM: "Excessive pressure or workload",

  DETERMINATION: "Resolve to achieve objectives despite challenges",
  NEUTRALITY: "Objective and unbiased perspective",
  URGENCY: "Time-sensitive priority and importance",
  FORMALITY: "Professional distance and structured communication",
  INQUIRY: "Information-seeking and clarification",
  CONSIDERATION: "Thoughtful evaluation of options or perspectives",
  ASSERTIVENESS: "Direct and confident expression of needs or positions",
};

export const CONTEXT_CATEGORIES = {
  EMAIL: "Written professional correspondence",
  MEETING: "Synchronous group discussions",
  INTERVIEW: "Assessment and evaluation conversations",
  FEEDBACK: "Performance and quality evaluations",
  PROJECT: "Task and deliverable discussions",
  NEGOTIATION: "Agreement and compromise discussions",
  PRESENTATION: "Information delivery to audiences",
  NETWORKING: "Relationship building interactions",
  CONFLICT: "Disagreement resolution contexts",
  LEADERSHIP: "Guidance and direction communications",
};

export const SENTIMENT_LEXICON = {
  satisfaction: {
    category: "SATISFACTION",
    words: [
      {
        term: "satisfied",
        weight: 7,
        contexts: ["FEEDBACK", "PROJECT", "EMAIL"],
      },
      { term: "pleased", weight: 6, contexts: ["FEEDBACK", "EMAIL"] },
      { term: "delighted", weight: 8, contexts: ["FEEDBACK", "EMAIL"] },
      { term: "content", weight: 5, contexts: ["FEEDBACK"] },
      {
        term: "happy with",
        weight: 7,
        isPhrase: true,
        contexts: ["FEEDBACK", "EMAIL"],
      },
      {
        term: "impressed by",
        weight: 8,
        isPhrase: true,
        contexts: ["FEEDBACK"],
      },
      {
        term: "excellent work",
        weight: 9,
        isPhrase: true,
        contexts: ["FEEDBACK"],
      },
      { term: "well done", weight: 8, isPhrase: true, contexts: ["FEEDBACK"] },
      { term: "great job", weight: 8, isPhrase: true, contexts: ["FEEDBACK"] },
      { term: "outstanding", weight: 9, contexts: ["FEEDBACK"] },
      {
        term: "exceeds expectations",
        weight: 9,
        isPhrase: true,
        contexts: ["FEEDBACK", "REVIEW"],
      },
      {
        term: "meets requirements",
        weight: 6,
        isPhrase: true,
        contexts: ["FEEDBACK"],
      },
      { term: "successful", weight: 7, contexts: ["PROJECT", "FEEDBACK"] },
      { term: "effective", weight: 6, contexts: ["FEEDBACK"] },
      { term: "efficient", weight: 6, contexts: ["FEEDBACK"] },
      { term: "productive", weight: 7, contexts: ["MEETING", "PROJECT"] },
      { term: "beneficial", weight: 7, contexts: ["FEEDBACK", "PROJECT"] },
      { term: "valuable", weight: 7, contexts: ["FEEDBACK"] },
      { term: "worthwhile", weight: 7, contexts: ["FEEDBACK", "MEETING"] },
      { term: "favorable", weight: 6, contexts: ["FEEDBACK"] },
      { term: "promising", weight: 6, contexts: ["PROJECT", "FEEDBACK"] },
    ],
    synonymGroups: [
      ["satisfied", "pleased", "content"],
      ["impressed", "delighted", "pleased"],
      ["excellent", "outstanding", "exceptional"],
    ],
    intensityLevels: {
      low: ["adequate", "acceptable", "meets requirements", "satisfactory"],
      medium: ["well done", "good job", "pleased with"],
      high: ["outstanding", "excellent", "exceptional", "exceeds expectations"],
    },
    antonyms: ["disappointed", "unsatisfied", "displeased", "dissatisfied"],
  },

  appreciation: {
    category: "APPRECIATION",
    words: [
      {
        term: "thank you",
        weight: 7,
        isPhrase: true,
        contexts: ["EMAIL", "MEETING"],
      },
      { term: "grateful", weight: 8, contexts: ["EMAIL"] },
      {
        term: "appreciate",
        weight: 7,
        contexts: ["EMAIL", "MEETING", "FEEDBACK"],
      },
      { term: "thankful", weight: 7, contexts: ["EMAIL"] },
      {
        term: "value your",
        weight: 7,
        isPhrase: true,
        contexts: ["EMAIL", "FEEDBACK"],
      },
      {
        term: "acknowledge your",
        weight: 6,
        isPhrase: true,
        contexts: ["EMAIL", "FEEDBACK"],
      },
      { term: "recognition", weight: 6, contexts: ["FEEDBACK"] },
      { term: "indebted", weight: 8, contexts: ["EMAIL"] },
      { term: "generous", weight: 7, contexts: ["FEEDBACK"] },
      { term: "helpful", weight: 6, contexts: ["FEEDBACK"] },
      { term: "supportive", weight: 6, contexts: ["FEEDBACK"] },
      { term: "many thanks", weight: 8, isPhrase: true, contexts: ["EMAIL"] },
      {
        term: "greatly appreciated",
        weight: 8,
        isPhrase: true,
        contexts: ["EMAIL"],
      },
      {
        term: "thank you for your time",
        weight: 7,
        isPhrase: true,
        contexts: ["EMAIL", "MEETING"],
      },
      {
        term: "couldn't have done it without",
        weight: 9,
        isPhrase: true,
        contexts: ["FEEDBACK"],
      },
      { term: "owe you", weight: 8, isPhrase: true, contexts: ["EMAIL"] },
    ],
    synonymGroups: [
      ["appreciate", "grateful", "thankful"],
      ["recognition", "acknowledgment", "appreciation"],
    ],
    intensityLevels: {
      low: ["thanks", "helpful", "acknowledge"],
      medium: ["thank you", "appreciate", "grateful"],
      high: ["deeply grateful", "greatly appreciated", "indebted"],
    },
    antonyms: ["ungrateful", "unappreciative", "thankless"],
  },

  confidence: {
    category: "CONFIDENCE",
    words: [
      { term: "confident", weight: 7, contexts: ["EMAIL", "PRESENTATION"] },
      { term: "certain", weight: 7, contexts: ["EMAIL", "PRESENTATION"] },
      { term: "assured", weight: 7, contexts: ["EMAIL"] },
      { term: "convinced", weight: 8, contexts: ["EMAIL", "PRESENTATION"] },
      { term: "sure", weight: 6, contexts: ["EMAIL", "MEETING"] },
      { term: "trust", weight: 7, contexts: ["EMAIL", "MEETING"] },
      { term: "believe", weight: 6, contexts: ["EMAIL", "MEETING"] },
      {
        term: "no doubt",
        weight: 8,
        isPhrase: true,
        contexts: ["EMAIL", "PRESENTATION"],
      },
      {
        term: "with confidence",
        weight: 8,
        isPhrase: true,
        contexts: ["PRESENTATION"],
      },
      {
        term: "firmly believe",
        weight: 8,
        isPhrase: true,
        contexts: ["PRESENTATION", "EMAIL"],
      },
      { term: "assure you", weight: 7, isPhrase: true, contexts: ["EMAIL"] },
      { term: "guarantee", weight: 9, contexts: ["EMAIL", "NEGOTIATION"] },
      {
        term: "without hesitation",
        weight: 8,
        isPhrase: true,
        contexts: ["EMAIL"],
      },
      {
        term: "strongly believe",
        weight: 8,
        isPhrase: true,
        contexts: ["EMAIL", "PRESENTATION"],
      },
      {
        term: "in my experience",
        weight: 7,
        isPhrase: true,
        contexts: ["EMAIL", "MEETING"],
      },
      {
        term: "proven track record",
        weight: 8,
        isPhrase: true,
        contexts: ["INTERVIEW", "PRESENTATION"],
      },
    ],
    synonymGroups: [
      ["confident", "assured", "certain"],
      ["believe", "trust", "convinced"],
    ],
    intensityLevels: {
      low: ["believe", "think", "feel"],
      medium: ["confident", "sure", "trust"],
      high: ["absolutely certain", "guarantee", "without doubt"],
    },
    antonyms: ["uncertain", "doubtful", "hesitant", "unsure"],
  },

  enthusiasm: {
    category: "ENTHUSIASM",
    words: [
      { term: "excited", weight: 8, contexts: ["EMAIL", "MEETING"] },
      { term: "enthusiastic", weight: 8, contexts: ["EMAIL", "MEETING"] },
      {
        term: "looking forward",
        weight: 7,
        isPhrase: true,
        contexts: ["EMAIL"],
      },
      { term: "eager", weight: 7, contexts: ["EMAIL", "INTERVIEW"] },
      { term: "thrilled", weight: 9, contexts: ["EMAIL"] },
      { term: "delighted to", weight: 8, isPhrase: true, contexts: ["EMAIL"] },
      {
        term: "passionate about",
        weight: 8,
        isPhrase: true,
        contexts: ["INTERVIEW"],
      },
      { term: "keen to", weight: 7, isPhrase: true, contexts: ["EMAIL"] },
      { term: "cannot wait", weight: 8, isPhrase: true, contexts: ["EMAIL"] },
      {
        term: "interested in",
        weight: 6,
        isPhrase: true,
        contexts: ["EMAIL", "INTERVIEW"],
      },
      { term: "motivated", weight: 7, contexts: ["INTERVIEW"] },
      { term: "energized", weight: 7, contexts: ["MEETING"] },
      { term: "inspired", weight: 7, contexts: ["EMAIL", "MEETING"] },
      {
        term: "ready to",
        weight: 6,
        isPhrase: true,
        contexts: ["EMAIL", "MEETING"],
      },
    ],
    synonymGroups: [
      ["excited", "thrilled", "enthusiastic"],
      ["interested", "keen", "eager"],
    ],
    intensityLevels: {
      low: ["interested", "curious", "looking forward to"],
      medium: ["enthusiastic", "eager", "keen"],
      high: ["thrilled", "passionate", "extremely excited"],
    },
    antonyms: ["uninterested", "apathetic", "indifferent", "bored"],
  },

  disappointment: {
    category: "DISAPPOINTMENT",
    words: [
      { term: "disappointed", weight: 7, contexts: ["EMAIL", "FEEDBACK"] },
      { term: "unfortunate", weight: 6, contexts: ["EMAIL", "FEEDBACK"] },
      { term: "regret", weight: 7, contexts: ["EMAIL"] },
      { term: "fell short", weight: 7, isPhrase: true, contexts: ["FEEDBACK"] },
      {
        term: "did not meet expectations",
        weight: 8,
        isPhrase: true,
        contexts: ["FEEDBACK"],
      },
      {
        term: "below standard",
        weight: 8,
        isPhrase: true,
        contexts: ["FEEDBACK"],
      },
      { term: "unsatisfactory", weight: 7, contexts: ["FEEDBACK"] },
      {
        term: "missed opportunity",
        weight: 7,
        isPhrase: true,
        contexts: ["FEEDBACK"],
      },
      {
        term: "could have been better",
        weight: 6,
        isPhrase: true,
        contexts: ["FEEDBACK"],
      },
      {
        term: "not as expected",
        weight: 7,
        isPhrase: true,
        contexts: ["FEEDBACK"],
      },
      { term: "disheartening", weight: 8, contexts: ["EMAIL"] },
      { term: "letdown", weight: 8, contexts: ["EMAIL", "FEEDBACK"] },
      { term: "unmet", weight: 6, contexts: ["FEEDBACK"] },
      { term: "subpar", weight: 7, contexts: ["FEEDBACK"] },
      { term: "insufficient", weight: 6, contexts: ["FEEDBACK"] },
      {
        term: "needs improvement",
        weight: 6,
        isPhrase: true,
        contexts: ["FEEDBACK"],
      },
    ],
    synonymGroups: [
      ["disappointed", "unsatisfied", "letdown"],
      ["insufficient", "inadequate", "below standard"],
    ],
    intensityLevels: {
      low: ["could be better", "needs improvement", "somewhat disappointed"],
      medium: ["disappointed", "fell short", "unsatisfactory"],
      high: [
        "deeply disappointed",
        "completely unsatisfactory",
        "major failure",
      ],
    },
    antonyms: ["satisfied", "pleased", "impressed", "delighted"],
  },

  frustration: {
    category: "FRUSTRATION",
    words: [
      { term: "frustrated", weight: 7, contexts: ["EMAIL", "FEEDBACK"] },
      {
        term: "challenging",
        weight: 5,
        contexts: ["EMAIL", "FEEDBACK", "MEETING"],
      },
      { term: "difficult", weight: 5, contexts: ["EMAIL", "FEEDBACK"] },
      { term: "obstacle", weight: 6, contexts: ["PROJECT", "MEETING"] },
      { term: "impediment", weight: 7, contexts: ["PROJECT", "MEETING"] },
      { term: "hindered", weight: 7, contexts: ["PROJECT", "EMAIL"] },
      { term: "blocked", weight: 7, contexts: ["PROJECT", "EMAIL"] },
      { term: "delayed", weight: 6, contexts: ["PROJECT", "EMAIL"] },
      { term: "struggle", weight: 7, contexts: ["EMAIL", "FEEDBACK"] },
      { term: "issue", weight: 5, contexts: ["EMAIL", "MEETING", "PROJECT"] },
      { term: "complication", weight: 6, contexts: ["PROJECT", "MEETING"] },
      { term: "roadblock", weight: 7, contexts: ["PROJECT", "MEETING"] },
      { term: "setback", weight: 7, contexts: ["PROJECT", "MEETING", "EMAIL"] },
    ],
    synonymGroups: [
      ["frustrated", "exasperated", "annoyed"],
      ["obstacle", "roadblock", "impediment"],
    ],
    intensityLevels: {
      low: ["challenging", "issue", "difficult"],
      medium: ["frustrated", "struggle", "complication"],
      high: ["extremely frustrated", "major impediment", "critical blocker"],
    },
    antonyms: ["facilitated", "streamlined", "smooth", "straightforward"],
  },

  concern: {
    category: "CONCERN",
    words: [
      { term: "concerned", weight: 6, contexts: ["EMAIL", "MEETING"] },
      { term: "worried", weight: 7, contexts: ["EMAIL", "MEETING"] },
      { term: "apprehensive", weight: 7, contexts: ["EMAIL"] },
      { term: "uncertain", weight: 6, contexts: ["EMAIL", "MEETING"] },
      { term: "cautious", weight: 5, contexts: ["EMAIL", "MEETING"] },
      { term: "hesitant", weight: 6, contexts: ["EMAIL", "MEETING"] },
      { term: "reservations", weight: 6, contexts: ["EMAIL", "FEEDBACK"] },
      { term: "doubt", weight: 7, contexts: ["EMAIL", "FEEDBACK"] },
      { term: "uneasy", weight: 7, contexts: ["EMAIL"] },
      { term: "skeptical", weight: 7, contexts: ["EMAIL", "MEETING"] },
      { term: "questionable", weight: 7, contexts: ["EMAIL", "FEEDBACK"] },
      {
        term: "potentially problematic",
        weight: 7,
        isPhrase: true,
        contexts: ["EMAIL", "FEEDBACK"],
      },
      {
        term: "not confident",
        weight: 7,
        isPhrase: true,
        contexts: ["EMAIL", "FEEDBACK"],
      },
      { term: "anxious about", weight: 8, isPhrase: true, contexts: ["EMAIL"] },
      { term: "wary of", weight: 7, isPhrase: true, contexts: ["EMAIL"] },
      { term: "risk", weight: 6, contexts: ["PROJECT", "MEETING"] },
    ],
    synonymGroups: [
      ["concerned", "worried", "anxious"],
      ["uncertain", "doubtful", "hesitant"],
    ],
    intensityLevels: {
      low: ["cautious", "uncertain", "hesitant"],
      medium: ["concerned", "worried", "reservations"],
      high: ["extremely concerned", "deeply worried", "grave concerns"],
    },
    antonyms: ["confident", "assured", "certain", "comfortable"],
  },

  neutrality: {
    category: "NEUTRALITY",
    words: [
      { term: "considering", weight: 5, contexts: ["EMAIL", "MEETING"] },
      { term: "analyzing", weight: 5, contexts: ["EMAIL", "MEETING"] },
      { term: "evaluating", weight: 5, contexts: ["EMAIL", "FEEDBACK"] },
      { term: "assessing", weight: 5, contexts: ["EMAIL", "FEEDBACK"] },
      { term: "reviewing", weight: 5, contexts: ["EMAIL", "MEETING"] },
      { term: "examining", weight: 5, contexts: ["EMAIL"] },
      { term: "observing", weight: 5, contexts: ["FEEDBACK"] },
      { term: "noted", weight: 5, contexts: ["EMAIL", "MEETING"] },
      { term: "acknowledged", weight: 5, contexts: ["EMAIL"] },
      { term: "understood", weight: 5, contexts: ["EMAIL"] },
      { term: "recognized", weight: 5, contexts: ["EMAIL"] },
      { term: "documented", weight: 5, contexts: ["EMAIL", "MEETING"] },
      { term: "recorded", weight: 5, contexts: ["MEETING"] },
      { term: "registered", weight: 5, contexts: ["EMAIL"] },
      {
        term: "neither agree nor disagree",
        weight: 5,
        isPhrase: true,
        contexts: ["FEEDBACK"],
      },
      { term: "objective", weight: 5, contexts: ["FEEDBACK", "MEETING"] },
      { term: "impartial", weight: 5, contexts: ["FEEDBACK"] },
      { term: "fair", weight: 5, contexts: ["FEEDBACK"] },
    ],
    synonymGroups: [
      ["considering", "evaluating", "assessing"],
      ["noted", "acknowledged", "recognized"],
    ],
    intensityLevels: {
      low: ["noted", "acknowledged", "recorded"],
      medium: ["considering", "reviewing", "evaluating"],
      high: [
        "thoroughly analyzing",
        "comprehensive assessment",
        "careful examination",
      ],
    },
    antonyms: ["biased", "prejudiced", "subjective"],
  },

  urgency: {
    category: "URGENCY",
    words: [
      { term: "urgent", weight: 8, contexts: ["EMAIL", "MEETING"] },
      { term: "immediate", weight: 8, contexts: ["EMAIL", "MEETING"] },
      { term: "critical", weight: 8, contexts: ["EMAIL", "PROJECT"] },
      { term: "pressing", weight: 7, contexts: ["EMAIL", "MEETING"] },
      { term: "priority", weight: 7, contexts: ["EMAIL", "PROJECT"] },
      { term: "asap", weight: 8, contexts: ["EMAIL", "MEETING"] },
      {
        term: "as soon as possible",
        weight: 8,
        isPhrase: true,
        contexts: ["EMAIL"],
      },
      {
        term: "time-sensitive",
        weight: 8,
        isPhrase: true,
        contexts: ["EMAIL"],
      },
      { term: "deadline", weight: 7, contexts: ["EMAIL", "PROJECT"] },
      { term: "crucial", weight: 7, contexts: ["EMAIL", "PROJECT"] },
      {
        term: "requires immediate attention",
        weight: 9,
        isPhrase: true,
        contexts: ["EMAIL"],
      },
      {
        term: "high priority",
        weight: 8,
        isPhrase: true,
        contexts: ["EMAIL", "PROJECT"],
      },
      { term: "promptly", weight: 7, contexts: ["EMAIL"] },
      { term: "without delay", weight: 8, isPhrase: true, contexts: ["EMAIL"] },
      { term: "expedite", weight: 8, contexts: ["EMAIL", "PROJECT"] },
    ],
    synonymGroups: [
      ["urgent", "immediate", "pressing"],
      ["critical", "crucial", "vital"],
    ],
    intensityLevels: {
      low: ["timely", "prompt", "soon"],
      medium: ["pressing", "priority", "deadline-driven"],
      high: ["extremely urgent", "immediate action required", "critical"],
    },
    antonyms: [
      "non-urgent",
      "low priority",
      "leisurely",
      "whenever convenient",
    ],
  },
};

export const INTENSITY_MODIFIERS = {
  amplifiers: [
    { term: "very", weight: 1.5, contexts: ["UNIVERSAL"] },
    { term: "extremely", weight: 1.8, contexts: ["UNIVERSAL"] },
    { term: "significantly", weight: 1.7, contexts: ["UNIVERSAL"] },
    { term: "substantially", weight: 1.7, contexts: ["UNIVERSAL"] },
    { term: "considerably", weight: 1.6, contexts: ["UNIVERSAL"] },
    { term: "highly", weight: 1.7, contexts: ["UNIVERSAL"] },
    { term: "greatly", weight: 1.7, contexts: ["UNIVERSAL"] },
    { term: "particularly", weight: 1.6, contexts: ["UNIVERSAL"] },
    { term: "exceptionally", weight: 1.8, contexts: ["UNIVERSAL"] },
    { term: "remarkably", weight: 1.7, contexts: ["UNIVERSAL"] },
    { term: "notably", weight: 1.6, contexts: ["UNIVERSAL"] },
    { term: "truly", weight: 1.6, contexts: ["UNIVERSAL"] },
    { term: "definitely", weight: 1.6, contexts: ["UNIVERSAL"] },
    { term: "absolutely", weight: 1.8, contexts: ["UNIVERSAL"] },
    { term: "thoroughly", weight: 1.6, contexts: ["UNIVERSAL"] },
    { term: "completely", weight: 1.7, contexts: ["UNIVERSAL"] },
    { term: "entirely", weight: 1.7, contexts: ["UNIVERSAL"] },
    { term: "especially", weight: 1.6, contexts: ["UNIVERSAL"] },
  ],
  diminishers: [
    { term: "somewhat", weight: 0.7, contexts: ["UNIVERSAL"] },
    { term: "slightly", weight: 0.6, contexts: ["UNIVERSAL"] },
    { term: "partially", weight: 0.7, contexts: ["UNIVERSAL"] },
    {
      term: "to some extent",
      weight: 0.7,
      isPhrase: true,
      contexts: ["UNIVERSAL"],
    },
    {
      term: "to a degree",
      weight: 0.7,
      isPhrase: true,
      contexts: ["UNIVERSAL"],
    },
    { term: "moderately", weight: 0.8, contexts: ["UNIVERSAL"] },
    { term: "reasonably", weight: 0.8, contexts: ["UNIVERSAL"] },
    { term: "marginally", weight: 0.5, contexts: ["UNIVERSAL"] },
    { term: "relatively", weight: 0.7, contexts: ["UNIVERSAL"] },
    { term: "fairly", weight: 0.8, contexts: ["UNIVERSAL"] },
    { term: "rather", weight: 0.8, contexts: ["UNIVERSAL"] },
    { term: "somewhat", weight: 0.7, contexts: ["UNIVERSAL"] },
  ],
  negators: [
    { term: "not", weight: -1, contexts: ["UNIVERSAL"] },
    { term: "don't", weight: -1, contexts: ["UNIVERSAL"] },
    { term: "doesn't", weight: -1, contexts: ["UNIVERSAL"] },
    { term: "isn't", weight: -1, contexts: ["UNIVERSAL"] },
    { term: "aren't", weight: -1, contexts: ["UNIVERSAL"] },
    { term: "wasn't", weight: -1, contexts: ["UNIVERSAL"] },
    { term: "weren't", weight: -1, contexts: ["UNIVERSAL"] },
    { term: "didn't", weight: -1, contexts: ["UNIVERSAL"] },
    { term: "no", weight: -1, contexts: ["UNIVERSAL"] },
    { term: "never", weight: -1, contexts: ["UNIVERSAL"] },
    { term: "hardly", weight: -0.8, contexts: ["UNIVERSAL"] },
    { term: "rarely", weight: -0.8, contexts: ["UNIVERSAL"] },
    { term: "unlikely", weight: -0.9, contexts: ["UNIVERSAL"] },
    { term: "unable to", weight: -1, isPhrase: true, contexts: ["UNIVERSAL"] },
    { term: "failed to", weight: -1, isPhrase: true, contexts: ["UNIVERSAL"] },
  ],
};

export const PAD_DIMENSIONS = {
  pleasure: {
    high: [
      "satisfaction",
      "appreciation",
      "enthusiasm",
      "confidence",
      "optimism",
    ],
    neutral: ["neutrality", "formality", "consideration", "inquiry"],
    low: [
      "disappointment",
      "frustration",
      "concern",
      "anxiety",
      "dissatisfaction",
    ],
  },

  arousal: {
    high: ["urgency", "enthusiasm", "frustration", "anxiety", "assertiveness"],
    neutral: ["neutrality", "consideration", "formality"],
    low: ["disappointment", "regret", "confusion"],
  },

  dominance: {
    high: ["confidence", "assertiveness", "determination", "leadership"],
    neutral: ["neutrality", "consideration", "inquiry"],
    low: ["anxiety", "concern", "confusion", "overwhelm"],
  },
};

export const SENTIMENT_GROUPS = {
  positive: [
    "satisfaction",
    "appreciation",
    "confidence",
    "enthusiasm",
    "optimism",
    "relief",
    "pride",
  ],
  negative: [
    "disappointment",
    "frustration",
    "concern",
    "anxiety",
    "dissatisfaction",
    "confusion",
    "overwhelm",
  ],
  neutral: [
    "neutrality",
    "formality",
    "consideration",
    "inquiry",
    "determination",
  ],

  professionalPositive: [
    "efficiency",
    "reliability",
    "competence",
    "professionalism",
    "resourcefulness",
  ],
  professionalNegative: [
    "inefficiency",
    "unreliability",
    "incompetence",
    "unprofessionalism",
    "negligence",
  ],

  actionOriented: [
    "urgency",
    "determination",
    "assertiveness",
    "initiative",
    "responsiveness",
  ],
  reflective: [
    "consideration",
    "analysis",
    "evaluation",
    "contemplation",
    "assessment",
  ],
};

export const CONTEXT_MODIFIERS = {
  EMAIL: {
    amplify: ["urgency", "appreciation", "concern", "formality"],
    diminish: ["enthusiasm", "frustration", "assertiveness"],
  },
  MEETING: {
    amplify: ["enthusiasm", "assertiveness", "determination", "inquiry"],
    diminish: ["formality", "concern", "reflection"],
  },
  INTERVIEW: {
    amplify: ["confidence", "enthusiasm", "consideration", "formality"],
    diminish: ["concern", "frustration", "urgency"],
  },
  FEEDBACK: {
    amplify: ["appreciation", "disappointment", "consideration", "neutrality"],
    diminish: ["urgency", "enthusiasm", "assertiveness"],
  },
};

export const GRAMMATICAL_PATTERNS = {
  formalClosure: {
    pattern:
      /\b(?:best regards|sincerely|regards|thank you(?: in advance)?|respectfully|yours truly)\b/gi,
    effects: {
      amplify: ["formality", "professionalism", "appreciation"],
      weight: 1.4,
    },
  },
  salutation: {
    pattern:
      /\b(?:dear|hello|hi|greetings|good (?:morning|afternoon|evening))\b/gi,
    effects: {
      amplify: ["formality", "consideration", "politeness"],
      weight: 1.3,
    },
  },
  bulletPoints: {
    pattern: /(?:\n\s*[\•\-\*]\s+.+){2,}/g,
    effects: {
      amplify: ["structure", "organization", "clarity"],
      weight: 1.3,
    },
  },
  questionMarks: {
    pattern: /\?{1,}/g,
    effects: {
      amplify: ["inquiry", "concern", "consideration"],
      weight: 1.4,
    },
  },
  exclamationPoints: {
    pattern: /\!{1,}/g,
    effects: {
      amplify: ["urgency", "enthusiasm", "importance"],
      weight: 1.5,
    },
  },
  allCaps: {
    pattern: /\b[A-Z]{3,}\b/g,
    effects: {
      amplify: ["urgency", "importance", "emphasis"],
      weight: 1.6,
    },
  },
};

export const COMMUNICATION_PATTERNS = {
  followUp: {
    markers: [
      "following up",
      "checking in",
      "wanted to check",
      "touching base",
      "circling back",
    ],
    sentiment: "inquiry",
    urgency: 0.6,
  },
  requestAction: {
    markers: [
      "please",
      "kindly",
      "would you",
      "could you",
      "can you",
      "request",
      "require",
    ],
    sentiment: "assertiveness",
    urgency: 0.7,
  },
  deadlineIndicators: {
    markers: [
      "by",
      "due",
      "deadline",
      "end of",
      "no later than",
      "latest",
      "before",
    ],
    sentiment: "urgency",
    urgency: 0.8,
  },
  apology: {
    markers: ["sorry", "apologize", "regret", "unfortunately", "pardon"],
    sentiment: "regret",
    urgency: 0.4,
  },
  introduction: {
    markers: [
      "introduce",
      "introducing",
      "like to present",
      "meet",
      "connecting",
    ],
    sentiment: "formality",
    urgency: 0.3,
  },
};
