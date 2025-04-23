
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const InfoSection: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">How to Use MedSpeak AI Bridge</CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-2">
        <ol className="list-decimal list-inside space-y-1">
          <li>Select the language you want to speak in (Speaker Language)</li>
          <li>Select the language you want to translate to (Translation Language)</li>
          <li>Click the microphone button to start speaking</li>
          <li>Speak clearly into your device's microphone</li>
          <li>Click the microphone button again when finished speaking</li>
          <li>View your original transcript and its translation</li>
          <li>Click the "Speak" button to hear the translation aloud</li>
        </ol>
        <p className="mt-2 text-muted-foreground italic">
          Enable "Enhanced AI Translation" for more accurate medical terminology translation when available.
        </p>
      </CardContent>
    </Card>
  );
};
