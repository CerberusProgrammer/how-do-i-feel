import { SentimentAnalysis } from "../types/sentiments";

interface SentimentDisplayProps {
  sentiments: SentimentAnalysis[];
  text: string;
}

export default function SentimentDisplay({
  sentiments,
  text,
}: SentimentDisplayProps) {
  return (
    <div>
      <h2>Detected sentiments:</h2>
      {sentiments.length === 0 && text.trim() === "" ? (
        <p>Start typing to see sentiment analysis</p>
      ) : sentiments.length === 0 ? (
        <p>No clear sentiment detected yet</p>
      ) : (
        <ul>
          {sentiments.map((item, index) => (
            <li key={index}>
              {item.sentiment}: {item.score}%
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
