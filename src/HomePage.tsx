import { useState, useEffect } from "react";
import { SentimentAnalysis } from "./types/sentiments";
import { analyzeSentiment } from "./utils/sentimentAnalyzer";
import TextInput from "./components/TextInput";
import SentimentDisplay from "./components/SentimentDisplay";

export default function HomePage() {
  const [text, setText] = useState<string>("");
  const [sentiments, setSentiments] = useState<SentimentAnalysis[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (text.trim()) {
        setIsAnalyzing(true);
        setTimeout(() => {
          setSentiments(analyzeSentiment(text));
          setIsAnalyzing(false);
        }, 600); // Simulated analysis time for better UX
      } else {
        setSentiments([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div className="app-container">
      <div className="home-page">
        <header className="app-header">
          <h1>
            <span className="title-emoji">🧠</span> How do I feel?
          </h1>
          <p className="app-subtitle">
            Enter your message to see how it might be perceived emotionally
          </p>
        </header>

        <section className="input-panel">
          <TextInput value={text} onChange={setText} />

          {isAnalyzing && (
            <div className="analyzing-indicator">
              <span>Analyzing emotional tone</span>
              <div className="loading-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          )}
        </section>

        <SentimentDisplay sentiments={sentiments} text={text} />

        <footer className="app-footer">
          <div className="app-tip">
            💡 Try different emotional tones to see how the analysis works!
          </div>
        </footer>
      </div>
    </div>
  );
}
