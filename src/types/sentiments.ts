export type Sentiment =
  // Positive sentiments
  | "satisfaction"
  | "appreciation"
  | "confidence"
  | "enthusiasm"
  | "optimism"
  | "relief"
  | "pride"
  // Negative sentiments
  | "disappointment"
  | "frustration"
  | "concern"
  | "anxiety"
  | "dissatisfaction"
  | "confusion"
  | "overwhelm"
  // Neutral/professional sentiments
  | "neutrality"
  | "urgency"
  | "formality"
  | "inquiry"
  | "consideration"
  | "assertiveness"
  | "determination";

export interface SentimentAnalysis {
  sentiment: Sentiment;
  score: number;
  category?: string; // Optional category from SENTIMENT_CATEGORIES
  context?: string[]; // Optional contexts where this sentiment appears
  intensity?: "low" | "medium" | "high";
}
