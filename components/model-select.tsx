"use client";

import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";

interface ModelSelectProps {
  model: "gpt-4o" | "gpt-4o-mini";
  onSelect: (model: "gpt-4o" | "gpt-4o-mini") => void;
}

export default function ModelSelect({ model, onSelect }: ModelSelectProps) {
  const handleSelect = (value: "gpt-4o" | "gpt-4o-mini") => {
    onSelect(value);
  };

  return (
    <Select
      value={model}
      onValueChange={handleSelect}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select Model" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
        <SelectItem value="gpt-4o">GPT-4o</SelectItem>
      </SelectContent>
    </Select>
  );
}
