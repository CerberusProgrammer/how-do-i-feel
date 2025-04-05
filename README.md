# How Do I Feel?

## Technical Overview

"How Do I Feel?" is a client-side sentiment analysis application that provides real-time emotional tone detection in written text. The application leverages rule-based natural language processing techniques to analyze and categorize text into various sentiment dimensions.

## Architecture

### Frontend Architecture

- **Framework**: React 18+ with TypeScript
- **Rendering**: Client-side rendering with React DOM
- **State Management**: React Hooks (useState, useEffect) for local component state
- **Styling**: CSS with custom properties (variables) for theming
- **Animation**: CSS keyframe animations and transitions
- **Build Tool**: Vite for development and production builds

### Sentiment Analysis Engine Architecture

- **Approach**: Rule-based lexicon matching with contextual modifiers
- **Processing Pipeline**:
  1. Text normalization
  2. Token-based sentiment extraction
  3. Contextual analysis (negation detection, intensifier recognition)
  4. Multi-dimensional sentiment scoring
  5. Result aggregation and ranking

## Data Sources

The sentiment analysis is powered by several structured lexical datasets:

1. **Core Sentiment Lexicon**: ~500 words and phrases mapped to 21 distinct sentiment categories:

   - 7 positive sentiments (satisfaction, appreciation, confidence, enthusiasm, optimism, relief, pride)
   - 7 negative sentiments (disappointment, frustration, concern, anxiety, dissatisfaction, confusion, overwhelm)
   - 7 neutral sentiments (neutrality, urgency, formality, inquiry, consideration, assertiveness, determination)

2. **Intensity Modifiers**:

   - 18 amplifiers (e.g., "very", "extremely", "significantly")
   - 12 diminishers (e.g., "somewhat", "slightly", "partially")
   - 15 negators (e.g., "not", "don't", "isn't")

3. **Contextual Patterns**:
   - Communication contexts (EMAIL, MEETING, INTERVIEW, FEEDBACK)
   - 6 grammatical pattern types with regular expressions
   - 5 communication pattern categories with specific markers

## Algorithm Details

### Sentiment Analysis Algorithm

1. **Initial Pattern Matching**:

   - Text is first checked against basic sentiment patterns
   - Direct emotional expressions ("feeling happy", "feel bad", etc.) are prioritized

2. **Lexicon-based Analysis**:

   - Each sentiment category lexicon is scanned against the input
   - Matched terms are weighted by predefined importance scores (1-10)
   - Phrases are evaluated as atomic units

3. **Contextual Modification**:

   - Detected sentiments are modified based on surrounding context:
     - Negation: Inverts or significantly reduces sentiment strength
     - Intensifiers: Amplify sentiment strength (up to 1.8x)
     - Diminishers: Reduce sentiment strength (down to 0.5x)
   - Communication context (email, meeting, etc.) adjusts relevance of certain sentiments

4. **Multi-dimensional Scoring**:

   - Aggregated scores are normalized to 0-100 scale
   - Multiple sentiments are ranked by final score
   - Intensity levels (low, medium, high) are assigned based on score thresholds
   - Sentiments below threshold (30%) are discarded

5. **Final Fallback Logic**:
   - If no significant sentiment is detected, neutrality is assigned
   - Last-chance detection attempts to salvage weak sentiment signals

### Visual Rendering Engine

1. **Dynamic Background Generation**:

   - Three layered radial gradients generated from sentiment colors
   - Opacity and position based on sentiment score ratios
   - CSS filter blur (80px) applied to secondary gradient layer
   - Animation timing varies by layer (30s-45s cycles)

2. **Particle System**:

   - Dynamic particle generation based on detected sentiments
   - Particle count proportional to sentiment strength
   - Color inheritance from sentiment category
   - Variable size (60-180px), position, and animation timing
   - Heavy blur effect (10px) for organic visual blend

3. **UI Animation System**:
   - Entry animations for sentiment items (staggered delay)
   - Progress bar animations with custom easing functions
   - Ambient movement animations for background elements
   - Hover state interactions with transform effects

## Component Structure

1. **HomePage**: Main container component

   - Manages global state (text input, sentiment results)
   - Handles analysis timing and debouncing

2. **TextInput**: User input component

   - Text area with character counting
   - Focus/blur state management
   - Real-time input handling

3. **SentimentDisplay**: Results visualization component
   - Dynamic background gradient generation
   - Particle system management
   - Renders sentiment cards with animations
   - Empty/loading states handling

## Data Flow

1. User enters text in TextInput component
2. Text change triggers debounced effect in HomePage (300ms)
3. Analysis is initiated with loading indicator (600ms simulated processing)
4. analyzeSentiment() processes text through multi-stage pipeline
5. Results array is passed to SentimentDisplay component
6. SentimentDisplay updates visual elements:
   - Background gradients using CSS custom properties
   - Floating particles via DOM manipulation
   - Sentiment cards with staggered animations

## Technical Limitations

1. **Language Support**: English language only
2. **Analysis Approach**: Rule-based rather than ML-based, limiting contextual understanding
3. **Lexicon Size**: Limited vocabulary coverage compared to trained models
4. **Contextual Understanding**: Simplistic handling of complex linguistic features
5. **Performance**: DOM-based particle system may impact performance on low-end devices

## Performance Considerations

- CSS animations used for most visual effects to leverage GPU acceleration
- Debounced text processing to prevent excessive re-renders
- Particle count dynamically adjusted based on sentiment scores to manage DOM node count
- Background gradients implemented with CSS custom properties for efficient updates
- Simple string matching algorithms used instead of complex NLP processing

## Requirements

- Modern browser with CSS custom properties and backdrop-filter support
- JavaScript ES6+ support
- Minimum viewport width recommendation: 375px

## Installation and Development

```bash
# Clone repository
git clone https://github.com/username/how-do-i-feel.git

# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Implementation Notes

The sentiment analysis algorithm uses a hybrid approach between lexicon-based and rule-based techniques. It does not implement machine learning models as initially suggested in the original documentation, but rather relies on carefully crafted dictionaries and heuristic rules for sentiment detection and classification.
