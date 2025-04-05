import { useState, useEffect } from "react";
import { SentimentAnalysis } from "./types/sentiments";
import { analyzeSentiment } from "./utils/sentimentAnalyzer";
import TextInput from "./components/TextInput";
import SentimentDisplay from "./components/SentimentDisplay";

export default function HomePage() {
  const [text, setText] = useState<string>("");
  const [sentiments, setSentiments] = useState<SentimentAnalysis[]>([]);

  useEffect(() => {
    if (text.trim()) {
      setSentiments(analyzeSentiment(text));
    } else {
      setSentiments([]);
    }
  }, [text]);

  return (
    <div>
      <h1>How do I feel?</h1>
      <p>Type your message and see how others might perceive it emotionally.</p>

      <TextInput value={text} onChange={setText} />
      <SentimentDisplay sentiments={sentiments} text={text} />
    </div>
  );
}
