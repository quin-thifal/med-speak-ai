
import React, { useState, useCallback } from "react";
import { speechRecognition } from "@/utils/speechRecognition";
import { textToSpeech } from "@/utils/textToSpeech";
import { SpeechControl } from "@/components/SpeechControl";
import { TranscriptDisplay } from "@/components/TranscriptDisplay";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LanguageControls } from "@/components/LanguageControls";
import { AIToggle } from "@/components/AIToggle";
import { useTranslation } from "@/hooks/useTranslation";

export const MedBridge: React.FC = () => {
  const [sourceLanguage, setSourceLanguage] = useState<string>("en");
  const [targetLanguage, setTargetLanguage] = useState<string>("es");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [useAI, setUseAI] = useState<boolean>(false);

  const { translatedText, isAILoading } = useTranslation(
    transcript,
    sourceLanguage,
    targetLanguage,
    useAI
  );

  const isSpeechRecognitionSupported = speechRecognition.isSupported();
  const isTextToSpeechSupported = textToSpeech.isSupported();

  const handleSpeechResult = useCallback(
    (result: { transcript: string; isFinal: boolean }) => {
      if (result.isFinal) {
        setTranscript((prev) => {
          const text = prev ? `${prev} ${result.transcript}` : result.transcript;
          return text;
        });
      }
    },
    []
  );

  const handleSpeechError = useCallback((error: Error) => {
    console.error("Speech recognition error:", error);
    setIsListening(false);
  }, []);

  const handleStartListening = useCallback(() => {
    if (isListening) return;

    speechRecognition.start(
      { lang: sourceLanguage, continuous: true, interimResults: true },
      handleSpeechResult,
      handleSpeechError
    );

    setIsListening(true);
  }, [isListening, sourceLanguage, handleSpeechResult, handleSpeechError]);

  const handleStopListening = useCallback(() => {
    speechRecognition.stop();
    setIsListening(false);
  }, []);

  const handleSpeakTranslation = useCallback(async () => {
    if (!translatedText || isSpeaking) return;

    setIsSpeaking(true);
    try {
      await textToSpeech.speak({
        text: translatedText,
        language: targetLanguage,
      });
    } catch (error) {
      console.error("Text-to-speech error:", error);
    }
    setIsSpeaking(false);
  }, [translatedText, targetLanguage, isSpeaking]);

  const handleResetTranscript = useCallback(() => {
    setTranscript("");
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardContent className="space-y-6">
          <LanguageControls
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            onSourceLanguageChange={setSourceLanguage}
            onTargetLanguageChange={setTargetLanguage}
          />
          
          <AIToggle
            useAI={useAI}
            isAILoading={isAILoading}
            onToggleAI={setUseAI}
          />

          <Separator />
          
          <SpeechControl
            isListening={isListening}
            onStartListening={handleStartListening}
            onStopListening={handleStopListening}
            sourceLanguage={sourceLanguage}
            isSupported={isSpeechRecognitionSupported}
          />

          <Separator />
          
          <TranscriptDisplay
            transcript={transcript}
            translatedText={translatedText}
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            onSpeakTranslation={handleSpeakTranslation}
            isSpeaking={isSpeaking}
            useAI={useAI}
          />

          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={handleResetTranscript}
              disabled={!transcript && !translatedText}
            >
              Clear Transcript
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
