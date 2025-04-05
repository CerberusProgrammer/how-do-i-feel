import {
  SENTIMENT_LEXICON,
  INTENSITY_MODIFIERS,
  GRAMMATICAL_PATTERNS,
} from "../data/sentiments_data";
import { Sentiment, SentimentAnalysis } from "../types/sentiments";

interface MatchedWord {
  term: string;
  weight: number;
  isIntensified?: boolean;
  isDiminished?: boolean;
  isNegated?: boolean;
}

export function analyzeSentiment(input: string): SentimentAnalysis[] {
  if (!input.trim()) {
    return [];
  }

  const text = input.trim();
  const lowercaseInput = text.toLowerCase();
  const results: SentimentAnalysis[] = [];

  const grammarMultiplier = detectGrammaticalPatterns(text);

  for (const [sentiment, data] of Object.entries(SENTIMENT_LEXICON)) {
    const matchResults = analyzeCategory(lowercaseInput, data.words);

    if (matchResults.score > 0) {
      const finalScore = Math.min(
        Math.round(matchResults.score * grammarMultiplier),
        100
      );

      results.push({
        sentiment: sentiment as Sentiment,
        score: finalScore,
      });
    }
  }

  if (results.length === 0 && text.length > 0) {
    results.push({ sentiment: "neutral", score: 100 });
  }

  return results.sort((a, b) => b.score - a.score);
}

function analyzeCategory(
  text: string,
  words: any[]
): { score: number; matches: MatchedWord[] } {
  let totalWeightedScore = 0;
  const matches: MatchedWord[] = [];

  const intensifiers = findIntensifiers(text, INTENSITY_MODIFIERS.amplifiers);
  const diminishers = findIntensifiers(text, INTENSITY_MODIFIERS.diminishers);
  const negators = findNegators(text, INTENSITY_MODIFIERS.negators);

  for (const wordData of words) {
    const { term, weight, isPhrase } = wordData;

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
        matches.push({
          term,
          weight: adjustedWeight,
          isNegated: isNegated,
          isIntensified: !!nearbyIntensifier,
          isDiminished: !!nearbyDiminisher,
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
          matches.push({
            term,
            weight: adjustedWeight,
            isNegated,
            isIntensified: !!nearbyIntensifier,
            isDiminished: !!nearbyDiminisher,
          });
        });
      }
    }
  }

  const normalizedScore = Math.min(
    Math.round((totalWeightedScore / 20) * 100),
    100
  );

  return {
    score: normalizedScore > 0 ? normalizedScore : 0,
    matches,
  };
}

/**
 * Encuentra intensificadores o diminuidores en el texto
 */
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

/**
 * Encuentra negadores en el texto
 */
function findNegators(text: string, negators: any[]): any[] {
  return negators.filter((neg) => {
    const term = neg.term;
    const regex = new RegExp(`\\b${escapeRegExp(term)}\\b`, "gi");
    return regex.test(text);
  });
}

/**
 * Detecta patrones gramaticales que podrían amplificar el sentimiento
 */
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
