export type Sentiment =
  // Sentimientos positivos
  | "happiness"
  | "love"
  | "gratitude"
  | "optimism"
  | "relief"
  | "pride"
  | "amusement"
  | "sadness"
  | "anger"
  | "fear"
  | "disgust"
  | "anxiety"
  | "disappointment"
  | "confusion"
  | "surprise"
  | "embarrassment"
  | "guilt"
  | "neutral"
  | "contemplative"
  | "nostalgia"
  | "determination";

export interface SentimentAnalysis {
  sentiment: Sentiment;
  score: number;
}
