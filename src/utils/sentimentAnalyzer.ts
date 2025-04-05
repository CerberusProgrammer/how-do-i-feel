import {
  SENTIMENT_KEYWORDS,
  INTENSITY_MODIFIERS,
} from "../data/sentiments_data";
import { Sentiment, SentimentAnalysis } from "../types/sentiments";

export function analyzeSentiment(input: string): SentimentAnalysis[] {
  if (!input.trim()) {
    return [];
  }

  const lowercaseInput = input.toLowerCase();
  const results: SentimentAnalysis[] = [];

  const hasIntensifier = INTENSITY_MODIFIERS.amplifiers.some((word) =>
    new RegExp(`\\b${word}\\b`, "gi").test(lowercaseInput)
  );
  const hasDiminisher = INTENSITY_MODIFIERS.diminishers.some((word) =>
    new RegExp(`\\b${word}\\b`, "gi").test(lowercaseInput)
  );

  const intensityFactor = hasIntensifier ? 1.5 : hasDiminisher ? 0.7 : 1;

  Object.entries(SENTIMENT_KEYWORDS).forEach(([sentiment, words]) => {
    let matchCount = 0;
    const matchedWords: string[] = [];

    words.forEach((word) => {
      if (word.includes(" ")) {
        if (lowercaseInput.includes(word)) {
          matchCount += 2;
          matchedWords.push(word);
        }
      } else {
        const regex = new RegExp(`\\b${word}\\b`, "gi");
        const matches = lowercaseInput.match(regex);
        if (matches) {
          matchCount += matches.length;
          matchedWords.push(word);
        }
      }
    });

    if (matchCount > 0) {
      const baseScore = Math.min(matchCount * 20, 100);
      const adjustedScore = Math.min(
        Math.round(baseScore * intensityFactor),
        100
      );

      results.push({
        sentiment: sentiment as Sentiment,
        score: adjustedScore,
      });
    }
  });

  if (results.length === 0 && input.trim().length > 0) {
    results.push({ sentiment: "neutral", score: 100 });
  }

  return results.sort((a, b) => b.score - a.score);
}
