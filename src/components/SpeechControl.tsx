
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff } from "lucide-react";
import { getLanguageNativeName } from "@/utils/languages";

interface SpeechControlProps {
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  sourceLanguage: string;
  isSupported: boolean;
}

export const SpeechControl: React.FC<SpeechControlProps> = ({
  isListening,
  onStartListening,
  onStopListening,
  sourceLanguage,
  isSupported,
}) => {
  if (!isSupported) {
    return (
      <Card className="border-destructive">
        <CardContent className="p-4 text-center">
          <p className="text-destructive font-medium">
            Speech recognition is not supported in your browser.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Try using Chrome, Edge, or Safari for the best experience.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        variant={isListening ? "destructive" : "default"}
        size="lg"
        className="rounded-full w-16 h-16 flex items-center justify-center"
        onClick={isListening ? onStopListening : onStartListening}
      >
        {isListening ? (
          <MicOff className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>
      <div className="text-sm text-center">
        {isListening ? (
          <span className="text-destructive font-medium">
            Listening ({getLanguageNativeName(sourceLanguage)})...
            <br />
            <span className="text-xs">Click to stop</span>
          </span>
        ) : (
          <span>
            Click to speak ({getLanguageNativeName(sourceLanguage)})
          </span>
        )}
      </div>
    </div>
  );
};
