
import React from "react";
import { LanguageSelector } from "@/components/LanguageSelector";

interface LanguageControlsProps {
  sourceLanguage: string;
  targetLanguage: string;
  onSourceLanguageChange: (lang: string) => void;
  onTargetLanguageChange: (lang: string) => void;
}

export const LanguageControls: React.FC<LanguageControlsProps> = ({
  sourceLanguage,
  targetLanguage,
  onSourceLanguageChange,
  onTargetLanguageChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
      <LanguageSelector
        selectedLanguage={sourceLanguage}
        onChange={onSourceLanguageChange}
        label="Speaker Language"
        className="flex-1"
      />
      <LanguageSelector
        selectedLanguage={targetLanguage}
        onChange={onTargetLanguageChange}
        label="Translation Language"
        className="flex-1"
      />
    </div>
  );
};
