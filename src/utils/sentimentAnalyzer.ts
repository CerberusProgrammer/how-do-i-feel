import {
  SENTIMENT_LEXICON,
  INTENSITY_MODIFIERS,
  GRAMMATICAL_PATTERNS,
  COMMUNICATION_PATTERNS,
  CONTEXT_MODIFIERS,
} from "../data/sentiments_data";
import { Sentiment, SentimentAnalysis } from "../types/sentiments";

interface MatchedWord {
  term: string;
  weight: number;
  isIntensified?: boolean;
  isDiminished?: boolean;
  isNegated?: boolean;
  context?: string[];
}

interface SentimentMatchResult {
  score: number;
  matches: MatchedWord[];
  contexts: Record<string, number>;
  dominantContext?: string;
}

interface TextMetrics {
  wordCount: number;
  sentenceCount: number;
  avgWordLength: number;
  formalityScore: number;
  communicationPatterns: string[];
}

const BASIC_SENTIMENT_PATTERNS = {
  positive: [
    {
      pattern:
        /\b(?:feel|feeling|felt)\s+(?:good|great|happy|better|positive|nice)\b/i,
      weight: 8,
    },
    { pattern: /\b(?:like|love|enjoy|adore|appreciate)\b/i, weight: 7 },
    { pattern: /\b(?:happy|glad|pleased|delighted|satisfied)\b/i, weight: 7 },
  ],
  negative: [
    {
      pattern:
        /\b(?:feel|feeling|felt)\s+(?:bad|sad|upset|down|negative|awful|terrible|horrible)\b/i,
      weight: 8,
    },
    { pattern: /\b(?:hate|dislike|despise|loathe)\b/i, weight: 8 },
    { pattern: /\b(?:unhappy|sad|upset|miserable|disappointed)\b/i, weight: 7 },
    { pattern: /\b(?:frustrated|annoyed|irritated|angry)\b/i, weight: 7 },
    { pattern: /\b(?:worry|worried|anxious|fearful|afraid)\b/i, weight: 7 },
  ],
};

export function analyzeSentiment(input: string): SentimentAnalysis[] {
  if (!input.trim()) {
    return [];
  }

  const text = input.trim();
  const lowercaseInput = text.toLowerCase();
  const results: SentimentAnalysis[] = [];

  const basicPatternResults =
    detectMultipleBasicSentimentPatterns(lowercaseInput);
  if (basicPatternResults.length > 0) {
    return basicPatternResults;
  }

  const metrics = analyzeTextMetrics(text);
  const communicationContext = determineCommunicationContext(text, metrics);
  const grammarMultiplier = detectGrammaticalPatterns(text);

  for (const [sentiment, data] of Object.entries(SENTIMENT_LEXICON)) {
    const matchResults = analyzeCategory(
      lowercaseInput,
      data.words,
      communicationContext
    );

    if (matchResults.score > 0) {
      const contextModifier = applyContextModifiers(
        sentiment as Sentiment,
        communicationContext
      );

      const finalScore = Math.min(
        Math.round(matchResults.score * grammarMultiplier * contextModifier),
        100
      );

      if (finalScore >= 30) {
        const intensity = determineIntensityLevel(
          finalScore,
          data.intensityLevels
        );

        results.push({
          sentiment: sentiment as Sentiment,
          score: finalScore,
          category: data.category,
          intensity,
          context: matchResults.dominantContext
            ? [matchResults.dominantContext]
            : undefined,
        });
      }
    }
  }

  if (results.length === 0 && text.length > 0) {
    const finalChecks = performEnhancedLastChanceDetection(lowercaseInput);

    if (finalChecks.length > 0) {
      return finalChecks;
    }

    results.push({
      sentiment: "neutrality" as Sentiment,
      score: 100,
      category: "NEUTRALITY",
      intensity: "medium",
    });
  }

  return results.sort((a, b) => b.score - a.score);
}

function detectMultipleBasicSentimentPatterns(
  text: string
): SentimentAnalysis[] {
  const results: SentimentAnalysis[] = [];

  checkForSatisfactionAndAppreciation(text, results);
  checkForConcernAndWorry(text, results);
  checkForFrustrationAndDifficulty(text, results);
  checkForConfidenceAndCertainty(text, results);
  checkForUrgency(text, results);

  if (results.length > 0) {
    return results;
  }

  const directNegativePatterns = [
    {
      pattern: /\bfeel(?:ing|s)?\s+bad\b/i,
      sentiment: "disappointment",
      score: 80,
    },
    {
      pattern: /\bfeel(?:ing|s)?\s+sad\b/i,
      sentiment: "disappointment",
      score: 80,
    },
    {
      pattern: /\bfeel(?:ing|s)?\s+upset\b/i,
      sentiment: "frustration",
      score: 75,
    },
    {
      pattern: /\bfeel(?:ing|s)?\s+terrible\b/i,
      sentiment: "disappointment",
      score: 85,
    },
    {
      pattern: /\bfeel(?:ing|s)?\s+angry\b/i,
      sentiment: "frustration",
      score: 85,
    },
    {
      pattern: /\bfeel(?:ing|s)?\s+horrible\b/i,
      sentiment: "disappointment",
      score: 85,
    },
  ];

  for (const pattern of directNegativePatterns) {
    if (pattern.pattern.test(text)) {
      const match = text.match(pattern.pattern);
      if (match && match.index !== undefined) {
        const beforeText = text.slice(0, match.index).trim();

        if (
          /\b(not|don't|doesn't|isn't|ain't|wasn't|weren't)\s+$/i.test(
            beforeText
          )
        ) {
          results.push({
            sentiment: "satisfaction",
            score: 60,
            intensity: "low",
            category: "SATISFACTION",
          });
        } else {
          results.push({
            sentiment: pattern.sentiment as Sentiment,
            score: pattern.score,
            intensity: "medium",
            category: pattern.sentiment.toUpperCase(),
          });
        }
        return results;
      }
    }
  }

  const negativeWords = [
    { word: "bad", sentiment: "disappointment", score: 80 },
    { word: "sad", sentiment: "disappointment", score: 80 },
    { word: "upset", sentiment: "frustration", score: 75 },
    { word: "angry", sentiment: "frustration", score: 85 },
    { word: "horrible", sentiment: "disappointment", score: 90 },
    { word: "terrible", sentiment: "disappointment", score: 90 },
    { word: "awful", sentiment: "disappointment", score: 85 },
    { word: "worried", sentiment: "concern", score: 80 },
    { word: "unhappy", sentiment: "disappointment", score: 80 },
    { word: "hate", sentiment: "frustration", score: 90 },
  ];

  for (const item of negativeWords) {
    const pattern = new RegExp(`\\b${item.word}\\b`, "i");
    if (pattern.test(text)) {
      const match = text.match(pattern);
      if (match && match.index !== undefined) {
        const beforeText = text.slice(
          Math.max(0, match.index - 20),
          match.index
        );

        if (
          !/\b(not|don't|doesn't|isn't|ain't|wasn't|weren't)\s+(\w+\s+){0,2}$/i.test(
            beforeText
          )
        ) {
          results.push({
            sentiment: item.sentiment as Sentiment,
            score: item.score,
            intensity: item.score > 85 ? "high" : "medium",
            category: item.sentiment.toUpperCase(),
          });
          return results;
        }
      }
    }
  }

  for (const pattern of BASIC_SENTIMENT_PATTERNS.positive) {
    if (pattern.pattern.test(text)) {
      const match = text.match(pattern.pattern);
      if (match && match.index !== undefined) {
        const beforeText = text.slice(
          Math.max(0, match.index - 20),
          match.index
        );

        if (
          /\b(not|don't|doesn't|isn't|ain't|wasn't|weren't)\s+(\w+\s+){0,2}$/i.test(
            beforeText
          )
        ) {
          results.push({
            sentiment: "disappointment",
            score: 70,
            intensity: "medium",
            category: "DISAPPOINTMENT",
          });
        } else {
          results.push({
            sentiment: "satisfaction",
            score: pattern.weight * 10,
            intensity: "medium",
            category: "SATISFACTION",
          });
        }
        return results;
      }
    }
  }

  return results;
}

function checkForSatisfactionAndAppreciation(
  text: string,
  results: SentimentAnalysis[]
) {
  if (
    /\b(?:pleased|delighted|happy|impressed|excellent|exceptional|outstanding|exceed expectations|great job|well done)\b/i.test(
      text
    ) ||
    /\b(?:thank|appreciate|grateful|recognition|value your work|acknowledgment)\b/i.test(
      text
    )
  ) {
    if (
      !/\b(?:not|isn't|aren't|wasn't|weren't|don't|doesn't|didn't)\s+(?:\w+\s+){0,2}(?:pleased|happy|impressed)\b/i.test(
        text
      )
    ) {
      const sentimentType =
        /\b(?:thank|appreciate|grateful|recognition)\b/i.test(text)
          ? "appreciation"
          : "satisfaction";

      results.push({
        sentiment: sentimentType as Sentiment,
        score: 70,
        intensity: "medium",
        category: sentimentType.toUpperCase(),
      });
    }
  }
}

function checkForConcernAndWorry(text: string, results: SentimentAnalysis[]) {
  if (
    /\b(?:concerned|worry|worried|anxious|uncertain|hesitant|reservations|doubt|uneasy)\b/i.test(
      text
    )
  ) {
    if (
      !/\b(?:not|isn't|aren't|wasn't|weren't|don't|doesn't|didn't)\s+(?:\w+\s+){0,2}(?:concerned|worried|anxious)\b/i.test(
        text
      )
    ) {
      results.push({
        sentiment: "concern" as Sentiment,
        score: 65,
        intensity: "medium",
        category: "CONCERN",
      });
    }
  }
}

function checkForFrustrationAndDifficulty(
  text: string,
  results: SentimentAnalysis[]
) {
  if (
    /\b(?:frustrat(?:ed|ing)|annoyed|irritated|setback|obstacle|impediment|delay|challenging|difficult)\b/i.test(
      text
    )
  ) {
    if (
      !/\b(?:not|isn't|aren't|wasn't|weren't|don't|doesn't|didn't)\s+(?:\w+\s+){0,2}(?:frustrat|annoyed)\b/i.test(
        text
      )
    ) {
      results.push({
        sentiment: "frustration" as Sentiment,
        score: 60,
        intensity: "medium",
        category: "FRUSTRATION",
      });
    }
  }
}

function checkForConfidenceAndCertainty(
  text: string,
  results: SentimentAnalysis[]
) {
  if (
    /\b(?:confiden(?:t|ce)|certain|assured|convinced|firm belief|trust|believe|no doubt)\b/i.test(
      text
    )
  ) {
    if (
      !/\b(?:not|lack of|less|isn't|aren't|wasn't|weren't|don't|doesn't|didn't)\s+(?:\w+\s+){0,2}(?:confiden|certain|assured)\b/i.test(
        text
      )
    ) {
      results.push({
        sentiment: "confidence" as Sentiment,
        score: 60,
        intensity: "medium",
        category: "CONFIDENCE",
      });
    }
  }
}

function checkForUrgency(text: string, results: SentimentAnalysis[]) {
  if (
    /\b(?:urgent|immediate|critical|pressing|priority|asap|as soon as possible|time-sensitive|deadline|crucial|emergency)\b/i.test(
      text
    )
  ) {
    results.push({
      sentiment: "urgency" as Sentiment,
      score: 75,
      intensity: "high",
      category: "URGENCY",
    });
  }
}

function performEnhancedLastChanceDetection(text: string): SentimentAnalysis[] {
  const results: SentimentAnalysis[] = [];

  const sentimentKeywords = {
    satisfaction: [
      { word: "good", score: 60 },
      { word: "great", score: 70 },
      { word: "excellent", score: 80 },
      { word: "pleased", score: 65 },
      { word: "impressive", score: 75 },
    ],
    appreciation: [
      { word: "thank", score: 65 },
      { word: "appreciate", score: 70 },
      { word: "grateful", score: 75 },
      { word: "recognition", score: 65 },
    ],
    concern: [
      { word: "concerned", score: 65 },
      { word: "worry", score: 70 },
      { word: "anxious", score: 75 },
      { word: "hesitant", score: 60 },
    ],
    frustration: [
      { word: "frustrating", score: 70 },
      { word: "difficult", score: 60 },
      { word: "challenging", score: 55 },
      { word: "delay", score: 65 },
      { word: "setback", score: 70 },
    ],
    urgency: [
      { word: "urgent", score: 80 },
      { word: "immediate", score: 75 },
      { word: "deadline", score: 70 },
      { word: "asap", score: 75 },
      { word: "emergency", score: 85 },
    ],
    confidence: [
      { word: "confident", score: 70 },
      { word: "certain", score: 65 },
      { word: "believe", score: 60 },
      { word: "overcome", score: 65 },
      { word: "ability", score: 60 },
    ],
  };

  for (const [sentiment, keywords] of Object.entries(sentimentKeywords)) {
    for (const { word, score } of keywords) {
      if (new RegExp(`\\b${word}\\w*\\b`, "i").test(text)) {
        results.push({
          sentiment: sentiment as Sentiment,
          score: score,
          intensity: score > 75 ? "high" : score > 60 ? "medium" : "low",
          category: sentiment.toUpperCase(),
        });
        break;
      }
    }
  }

  return results;
}

function analyzeTextMetrics(text: string): TextMetrics {
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);

  const totalWordLength = words.reduce((sum, word) => sum + word.length, 0);
  const avgWordLength = words.length > 0 ? totalWordLength / words.length : 0;

  const formalityIndicators = [
    /\b(?:dear|sincerely|regards|respectfully)\b/gi,
    /\b(?:please|thank you|appreciate|grateful)\b/gi,
    /\b(?:would|could|might|shall)\b/gi,
  ];

  const formalityScore = formalityIndicators.reduce((score, regex) => {
    const matches = text.match(regex);
    return score + (matches ? matches.length * 0.1 : 0);
  }, 0);

  const communicationPatterns: string[] = [];
  for (const [pattern, data] of Object.entries(COMMUNICATION_PATTERNS)) {
    const hasPattern = data.markers.some((marker) =>
      new RegExp(`\\b${escapeRegExp(marker)}\\b`, "gi").test(text)
    );
    if (hasPattern) {
      communicationPatterns.push(pattern);
    }
  }

  return {
    wordCount: words.length,
    sentenceCount: sentences.length,
    avgWordLength,
    formalityScore,
    communicationPatterns,
  };
}

function determineCommunicationContext(
  text: string,
  metrics: TextMetrics
): string {
  const contextScores: Record<string, number> = {
    EMAIL: 0,
    MEETING: 0,
    INTERVIEW: 0,
    FEEDBACK: 0,
  };

  if (
    text.match(/\b(?:email|subject|inbox|send|sent|forward|reply|cc|bcc)\b/gi)
  ) {
    contextScores.EMAIL += 2;
  }
  if (text.match(/\b(?:dear|hi|hello|regards|sincerely)\b/gi)) {
    contextScores.EMAIL += 1.5;
  }

  if (
    text.match(/\b(?:meeting|discuss|agenda|call|conversation|discuss)\b/gi)
  ) {
    contextScores.MEETING += 2;
  }
  if (text.match(/\b(?:schedule|minutes|attendees|participants)\b/gi)) {
    contextScores.MEETING += 1.5;
  }

  if (
    text.match(
      /\b(?:interview|candidate|resume|hire|position|qualifications)\b/gi
    )
  ) {
    contextScores.INTERVIEW += 2;
  }
  if (
    text.match(/\b(?:experience|skills|background|strengths|weaknesses)\b/gi)
  ) {
    contextScores.INTERVIEW += 1.5;
  }

  if (
    text.match(/\b(?:feedback|review|assessment|evaluation|performance)\b/gi)
  ) {
    contextScores.FEEDBACK += 2;
  }
  if (text.match(/\b(?:improve|strengths|weaknesses|recommendation)\b/gi)) {
    contextScores.FEEDBACK += 1.5;
  }

  if (metrics.formalityScore > 0.3) {
    contextScores.EMAIL += 0.5;
    contextScores.FEEDBACK += 0.5;
  }

  if (metrics.communicationPatterns.includes("followUp")) {
    contextScores.EMAIL += 1;
  }

  if (metrics.communicationPatterns.includes("requestAction")) {
    contextScores.EMAIL += 0.8;
    contextScores.MEETING += 0.5;
  }

  let maxScore = 0;
  let dominantContext = "EMAIL";

  for (const [context, score] of Object.entries(contextScores)) {
    if (score > maxScore) {
      maxScore = score;
      dominantContext = context;
    }
  }

  if (maxScore < 1) {
    if (metrics.sentenceCount <= 2 && metrics.wordCount < 30) {
      dominantContext = "MEETING";
    } else if (metrics.sentenceCount >= 5 || metrics.wordCount > 100) {
      dominantContext = "EMAIL";
    }
  }

  return dominantContext;
}

function applyContextModifiers(sentiment: Sentiment, context: string): number {
  const contextModifier =
    CONTEXT_MODIFIERS[context as keyof typeof CONTEXT_MODIFIERS];
  if (!contextModifier) return 1.0;

  if (contextModifier.amplify.includes(sentiment)) {
    return 1.3;
  } else if (contextModifier.diminish.includes(sentiment)) {
    return 0.7;
  }

  return 1.0;
}

function analyzeCategory(
  text: string,
  words: any[],
  communicationContext: string
): SentimentMatchResult {
  let totalWeightedScore = 0;
  const matches: MatchedWord[] = [];
  const contextCounts: Record<string, number> = {};

  const intensifiers = findIntensifiers(text, INTENSITY_MODIFIERS.amplifiers);
  const diminishers = findIntensifiers(text, INTENSITY_MODIFIERS.diminishers);
  const negators = findNegators(text, INTENSITY_MODIFIERS.negators);

  for (const wordData of words) {
    const { term, weight, isPhrase, contexts = [] } = wordData;

    if (isPhrase) {
      if (text.includes(term)) {
        const isNegated = negators.some(
          (neg) =>
            text.includes(`${neg.term} ${term}`) ||
            text.match(
              new RegExp(
                `${neg.term}\\W+(?:\\w+\\W+){0,2}${escapeRegExp(term)}`,
                "i"
              )
            )
        );

        const nearbyIntensifier = intensifiers.find(
          (int) =>
            text.includes(`${int.term} ${term}`) ||
            text.match(
              new RegExp(
                `${int.term}\\W+(?:\\w+\\W+){0,2}${escapeRegExp(term)}`,
                "i"
              )
            )
        );

        const nearbyDiminisher = diminishers.find(
          (dim) =>
            text.includes(`${dim.term} ${term}`) ||
            text.match(
              new RegExp(
                `${dim.term}\\W+(?:\\w+\\W+){0,2}${escapeRegExp(term)}`,
                "i"
              )
            )
        );

        let adjustedWeight = weight;

        if (contexts.includes(communicationContext)) {
          adjustedWeight *= 1.2;
        }

        if (isNegated) {
          adjustedWeight *= -0.5;
        }
        if (nearbyIntensifier) {
          adjustedWeight *= nearbyIntensifier.weight;
        }
        if (nearbyDiminisher) {
          adjustedWeight *= nearbyDiminisher.weight;
        }

        totalWeightedScore += adjustedWeight;

        contexts.forEach((ctx: string | number) => {
          contextCounts[ctx] = (contextCounts[ctx] || 0) + 1;
        });

        matches.push({
          term,
          weight: adjustedWeight,
          isNegated: isNegated,
          isIntensified: !!nearbyIntensifier,
          isDiminished: !!nearbyDiminisher,
          context: contexts,
        });
      }
    } else {
      const regex = new RegExp(`\\b${escapeRegExp(term)}\\b`, "gi");
      const termMatches = text.match(regex);

      if (termMatches) {
        termMatches.forEach(() => {
          const context = extractContextAroundWord(text, term, 5);
          const isNegated = negators.some(
            (neg) =>
              context.before.includes(` ${neg.term} `) ||
              context.before.endsWith(` ${neg.term}`)
          );

          const nearbyIntensifier = intensifiers.find(
            (int) =>
              context.before.includes(` ${int.term} `) ||
              context.before.endsWith(` ${int.term}`)
          );

          const nearbyDiminisher = diminishers.find(
            (dim) =>
              context.before.includes(` ${dim.term} `) ||
              context.before.endsWith(` ${dim.term}`)
          );

          let adjustedWeight = weight;

          if (contexts.includes(communicationContext)) {
            adjustedWeight *= 1.2;
          }

          if (isNegated) {
            adjustedWeight *= -0.5;
          }
          if (nearbyIntensifier) {
            adjustedWeight *= nearbyIntensifier.weight;
          }
          if (nearbyDiminisher) {
            adjustedWeight *= nearbyDiminisher.weight;
          }

          totalWeightedScore += adjustedWeight;

          contexts.forEach((ctx: string | number) => {
            contextCounts[ctx] = (contextCounts[ctx] || 0) + 1;
          });

          matches.push({
            term,
            weight: adjustedWeight,
            isNegated,
            isIntensified: !!nearbyIntensifier,
            isDiminished: !!nearbyDiminisher,
            context: contexts,
          });
        });
      }
    }
  }

  const normalizedScore = Math.min(
    Math.round((totalWeightedScore / 20) * 100),
    100
  );

  let maxCount = 0;
  let dominantContext = undefined;

  for (const [context, count] of Object.entries(contextCounts)) {
    if (count > maxCount) {
      maxCount = count;
      dominantContext = context;
    }
  }

  return {
    score: normalizedScore > 0 ? normalizedScore : 0,
    matches,
    contexts: contextCounts,
    dominantContext,
  };
}

function determineIntensityLevel(
  score: number,
  intensityLevels:
    | { low: string[]; medium: string[]; high: string[] }
    | undefined
): "low" | "medium" | "high" {
  if (!intensityLevels) {
    if (score < 40) return "low";
    if (score < 70) return "medium";
    return "high";
  }

  if (score < 40) return "low";
  if (score < 70) return "medium";
  return "high";
}

function findIntensifiers(text: string, modifiers: any[]): any[] {
  return modifiers.filter((mod) => {
    const term = mod.term;
    if (mod.isPhrase) {
      return text.includes(term);
    } else {
      const regex = new RegExp(`\\b${escapeRegExp(term)}\\b`, "gi");
      return regex.test(text);
    }
  });
}

function findNegators(text: string, negators: any[]): any[] {
  return negators.filter((neg) => {
    const term = neg.term;
    const regex = new RegExp(`\\b${escapeRegExp(term)}\\b`, "gi");
    return regex.test(text);
  });
}

function detectGrammaticalPatterns(text: string): number {
  let multiplier = 1.0;

  for (const [, pattern] of Object.entries(GRAMMATICAL_PATTERNS)) {
    const matches = text.match(pattern.pattern);
    if (matches && matches.length > 0) {
      multiplier *= pattern.effects.weight;
    }
  }

  return multiplier;
}

function extractContextAroundWord(
  text: string,
  word: string,
  windowSize: number = 3
): { before: string; after: string } {
  const regex = new RegExp(`\\b${escapeRegExp(word)}\\b`, "i");
  const match = regex.exec(text);

  if (!match) {
    return { before: "", after: "" };
  }

  const startPos = Math.max(0, match.index - windowSize * 5);
  const endPos = Math.min(
    text.length,
    match.index + word.length + windowSize * 5
  );

  return {
    before: text.substring(startPos, match.index),
    after: text.substring(match.index + word.length, endPos),
  };
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
