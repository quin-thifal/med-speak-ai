
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getLanguageNativeName } from "@/utils/languages";
import { Volume } from "lucide-react";

interface TranscriptDisplayProps {
  transcript: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  onSpeakTranslation: () => void;
  isSpeaking: boolean;
  useAI?: boolean;
}

export const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({
  transcript,
  translatedText,
  sourceLanguage,
  targetLanguage,
  onSpeakTranslation,
  isSpeaking,
  useAI = false,
}) => {
  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Original transcript */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-secondary py-2">
          <CardTitle className="text-sm md:text-base flex justify-between items-center">
            <span>
              Original ({getLanguageNativeName(sourceLanguage)})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p className="min-h-[80px] text-left whitespace-pre-wrap break-words">
            {transcript || "Waiting for speech..."}
          </p>
        </CardContent>
      </Card>

      {/* Translated text */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-secondary py-2">
          <CardTitle className="text-sm md:text-base flex justify-between items-center">
            <div className="flex items-center">
              <span>Translation ({getLanguageNativeName(targetLanguage)})</span>
              {useAI && <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">AI Enhanced</span>}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="ml-2"
              onClick={onSpeakTranslation}
              disabled={!translatedText || isSpeaking}
            >
              <Volume className="h-4 w-4 mr-1" />
              Speak
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p className="min-h-[80px] text-left whitespace-pre-wrap break-words">
            {translatedText || "Translation will appear here..."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
