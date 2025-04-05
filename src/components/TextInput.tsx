import { ChangeEvent, useState } from "react";

interface TextInputProps {
  value: string;
  onChange: (text: string) => void;
}

export default function TextInput({ value, onChange }: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`text-input-container ${isFocused ? "focused" : ""}`}>
      <div className="text-input-emoji">✏️</div>
      <textarea
        rows={4}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Type your message here to analyze the emotional tone..."
        className="text-input"
      />
      <div className="character-count">
        {value.length} {value.length === 1 ? "character" : "characters"}
      </div>
    </div>
  );
}
