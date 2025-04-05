import { ChangeEvent } from "react";

interface TextInputProps {
  value: string;
  onChange: (text: string) => void;
}

export default function TextInput({ value, onChange }: TextInputProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      rows={5}
      cols={50}
      value={value}
      onChange={handleChange}
      placeholder="Type your message here..."
    />
  );
}
