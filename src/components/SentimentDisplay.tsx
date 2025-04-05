import { SentimentAnalysis } from "../types/sentiments";
import { SENTIMENT_GROUPS } from "../data/sentiments_data";
import { useEffect, useRef } from "react";

interface SentimentDisplayProps {
  sentiments: SentimentAnalysis[];
  text: string;
}

const SENTIMENT_EMOJIS: Record<string, string> = {
  // Positive sentiments
  satisfaction: "😊",
  appreciation: "🙏",
  confidence: "💪",
  enthusiasm: "🤩",
  optimism: "🌟",
  relief: "😌",
  pride: "🦁",

  // Negative sentiments
  disappointment: "😞",
  frustration: "😠",
  concern: "😟",
  anxiety: "😰",
  dissatisfaction: "😒",
  confusion: "😕",
  overwhelm: "😩",

  // Neutral sentiments
  neutrality: "😐",
  urgency: "⏰",
  formality: "👔",
  inquiry: "🔍",
  consideration: "🤔",
  assertiveness: "✓",
  determination: "🎯",
};

const INTENSITY_LABELS: Record<string, string> = {
  low: "Subtle",
  medium: "Moderate",
  high: "Strong",
};

const SENTIMENT_COLORS: Record<string, string> = {
  positive: "#38b2ac",
  negative: "#e53e3e",
  neutral: "#718096",

  // Emotion-specific colors
  satisfaction: "#319795",
  appreciation: "#2b6cb0",
  confidence: "#3182ce",
  enthusiasm: "#805ad5",
  optimism: "#d69e2e",
  relief: "#38a169",
  pride: "#dd6b20",

  disappointment: "#e53e3e",
  frustration: "#c53030",
  concern: "#dd6b20",
  anxiety: "#ed8936",
  dissatisfaction: "#d53f8c",
  confusion: "#b83280",
  overwhelm: "#805ad5",

  neutrality: "#718096",
  urgency: "#ed8936",
  formality: "#4c51bf",
  inquiry: "#4299e1",
  consideration: "#a0aec0",
  assertiveness: "#4299e1",
  determination: "#2c5282",
};

export default function SentimentDisplay({
  sentiments,
  text,
}: SentimentDisplayProps) {
  const particlesRef = useRef<HTMLDivElement>(null);
  const bgTextureRef = useRef<HTMLDivElement>(null);

  const getSentimentType = (sentiment: string): string => {
    if (SENTIMENT_GROUPS.positive.includes(sentiment)) return "positive";
    if (SENTIMENT_GROUPS.negative.includes(sentiment)) return "negative";
    return "neutral";
  };

  const getEmoji = (sentiment: string): string => {
    return SENTIMENT_EMOJIS[sentiment] || "❓";
  };

  // Generate particles based on detected sentiments
  useEffect(() => {
    if (!particlesRef.current) return;

    // Clear existing particles
    particlesRef.current.innerHTML = "";

    if (sentiments.length === 0) return;

    // Create particles for each sentiment
    sentiments.forEach((sentiment) => {
      const particleCount = Math.floor(sentiment.score / 15); // Fewer particles, 3-6 for most scores
      const color =
        SENTIMENT_COLORS[sentiment.sentiment] ||
        SENTIMENT_COLORS[getSentimentType(sentiment.sentiment)];

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "mood-particle";

        // Random positioning and timing
        const size = Math.random() * 120 + 60; // Larger particles: 60-180px
        const left = Math.random() * 90 + 5; // 5-95%
        const delay = Math.random() * 8; // 0-8s delay
        const duration = Math.random() * 15 + 25; // 25-40s animation (slower)

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.bottom = "-5%";
        particle.style.backgroundColor = color;
        particle.style.opacity = "0";
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;

        particlesRef.current?.appendChild(particle);
      }
    });
  }, [sentiments]);

  // Create organic blending gradients based on sentiments
  useEffect(() => {
    if (sentiments.length > 0) {
      // Set body class for primary sentiment
      document.body.className = `emotion-${sentiments[0].sentiment}`;

      const totalScore = sentiments.reduce((sum, s) => sum + s.score, 0);

      // Get the top 3 sentiments (or fewer if there aren't 3)
      const topSentiments = sentiments.slice(0, Math.min(3, sentiments.length));

      // Create three overlapping gradients for a more organic blend
      // Primary gradient - main focal point
      const primaryColor =
        SENTIMENT_COLORS[topSentiments[0].sentiment] ||
        SENTIMENT_COLORS[getSentimentType(topSentiments[0].sentiment)];

      // Secondary and tertiary gradients if available
      const secondaryColor = topSentiments[1]
        ? SENTIMENT_COLORS[topSentiments[1].sentiment] ||
          SENTIMENT_COLORS[getSentimentType(topSentiments[1].sentiment)]
        : primaryColor;

      const tertiaryColor = topSentiments[2]
        ? SENTIMENT_COLORS[topSentiments[2].sentiment] ||
          SENTIMENT_COLORS[getSentimentType(topSentiments[2].sentiment)]
        : secondaryColor;

      // Calculate gradient positions based on sentiment strength
      const primaryWeight = topSentiments[0].score / totalScore;
      const secondaryWeight = topSentiments[1]
        ? topSentiments[1].score / totalScore
        : 0;

      // Primary gradient - dominant sentiment (radial gradient from top left)
      const primaryGradient = `radial-gradient(
        circle at ${30 + Math.random() * 20}% ${30 + Math.random() * 20}%, 
        ${primaryColor}20 0%, 
        ${primaryColor}40 ${primaryWeight * 100}%, 
        transparent 100%
      )`;

      // Secondary gradient - second sentiment (radial gradient from bottom right)
      const secondaryGradient = `radial-gradient(
        circle at ${60 + Math.random() * 20}% ${60 + Math.random() * 20}%, 
        ${secondaryColor}15 0%,
        ${secondaryColor}30 ${secondaryWeight * 100}%, 
        transparent 100%
      )`;

      // Tertiary gradient - additional colors (centered radial)
      const tertiaryGradient = `radial-gradient(
        circle at 50% 50%, 
        ${tertiaryColor}10 0%, 
        ${tertiaryColor}25 40%, 
        transparent 100%
      )`;

      // Apply gradients to CSS variables for layered effect
      document.documentElement.style.setProperty(
        "--dynamic-gradient-primary",
        primaryGradient
      );
      document.documentElement.style.setProperty(
        "--dynamic-gradient-secondary",
        secondaryGradient
      );
      document.documentElement.style.setProperty(
        "--dynamic-gradient-tertiary",
        tertiaryGradient
      );
    } else {
      // Reset to default when no sentiments
      document.body.className = "";
      const defaultGradient = `radial-gradient(circle at 30% 30%, 
        var(--color-background) 0%, 
        var(--color-background) 100%)`;

      document.documentElement.style.setProperty(
        "--dynamic-gradient-primary",
        defaultGradient
      );
      document.documentElement.style.setProperty(
        "--dynamic-gradient-secondary",
        defaultGradient
      );
      document.documentElement.style.setProperty(
        "--dynamic-gradient-tertiary",
        defaultGradient
      );
    }

    // Cleanup
    return () => {
      document.body.className = "";
      const defaultGradient = `radial-gradient(circle at 30% 30%, 
        var(--color-background) 0%, 
        var(--color-background) 100%)`;

      document.documentElement.style.setProperty(
        "--dynamic-gradient-primary",
        defaultGradient
      );
      document.documentElement.style.setProperty(
        "--dynamic-gradient-secondary",
        defaultGradient
      );
      document.documentElement.style.setProperty(
        "--dynamic-gradient-tertiary",
        defaultGradient
      );
    };
  }, [sentiments]);

  return (
    <>
      {/* Mood particle container */}
      <div className="mood-particles" ref={particlesRef}></div>

      {/* Background texture layer */}
      <div className="background-texture" ref={bgTextureRef}></div>

      <div className="results-section">
        <div className="sentiment-display">
          <div className="sentiment-title">
            <span className="sentiment-emoji-header">👁️‍🗨️</span>
            Detected Emotional Tones
          </div>

          <div className="language-notice">
            <span>English text analysis only</span>
          </div>

          {sentiments.length === 0 && text.trim() === "" ? (
            <div className="sentiment-placeholder">
              <span className="sentiment-emoji-large">✍️</span>
              <p className="sentiment-placeholder-text">
                Start typing to analyze emotional tone
              </p>
            </div>
          ) : sentiments.length === 0 ? (
            <div className="sentiment-placeholder">
              <span className="sentiment-emoji-large">🔍</span>
              <p className="sentiment-placeholder-text">
                No clear emotional tone detected yet
              </p>
            </div>
          ) : (
            <>
              {sentiments.length > 1 && (
                <div className="sentiment-summary">
                  <p>
                    <span className="sentiment-emoji-medium">🎭</span>
                    This message contains a mix of {sentiments.length} emotional
                    tones, primarily {getEmoji(sentiments[0].sentiment)}{" "}
                    <strong>{sentiments[0].sentiment}</strong>
                    {sentiments.length > 2 ? ", " : " and "}
                    {getEmoji(sentiments[1].sentiment)}{" "}
                    <strong>{sentiments[1].sentiment}</strong>
                    {sentiments.length > 2 ? `, and others` : ""}
                  </p>
                </div>
              )}

              <ul className="sentiment-list">
                {sentiments.map((item, index) => {
                  const type = getSentimentType(item.sentiment);
                  const emoji = getEmoji(item.sentiment);
                  const color =
                    SENTIMENT_COLORS[item.sentiment] || SENTIMENT_COLORS[type];

                  return (
                    <li
                      key={index}
                      className="sentiment-item"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        borderLeft: `4px solid ${color}`,
                        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.05)`,
                      }}
                    >
                      <div className="sentiment-item-header">
                        <span className="sentiment-emoji">{emoji}</span>
                        <span className="sentiment-name">{item.sentiment}</span>
                        <span className="sentiment-percentage">
                          {item.score}
                          <span className="sentiment-percent-symbol">%</span>
                        </span>
                        <span className={`sentiment-type-badge ${type}`}>
                          {type}
                        </span>
                      </div>

                      <div className="sentiment-meter-container">
                        <div className="sentiment-meter">
                          <div
                            className={`sentiment-meter-fill ${type}`}
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.intensity && (
                        <div className="sentiment-intensity" style={{ color }}>
                          <span className="intensity-emoji">
                            {item.intensity === "high"
                              ? "🔥"
                              : item.intensity === "medium"
                              ? "🔶"
                              : "🔹"}
                          </span>
                          <span>{INTENSITY_LABELS[item.intensity]}</span>
                          <div className="intensity-indicator">
                            <div
                              className={`intensity-dot ${
                                item.intensity === "low" ||
                                item.intensity === "medium" ||
                                item.intensity === "high"
                                  ? "active"
                                  : ""
                              } ${item.intensity}`}
                            ></div>
                            <div
                              className={`intensity-dot ${
                                item.intensity === "medium" ||
                                item.intensity === "high"
                                  ? "active"
                                  : ""
                              } ${item.intensity}`}
                            ></div>
                            <div
                              className={`intensity-dot ${
                                item.intensity === "high" ? "active" : ""
                              } ${item.intensity}`}
                            ></div>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}
