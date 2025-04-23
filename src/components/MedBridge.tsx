
import React, { useState, useEffect, useCallback } from "react";
import { speechRecognition } from "@/utils/speechRecognition";
import { translator } from "@/utils/translator";
import { textToSpeech } from "@/utils/textToSpeech";
import { aiTranslator } from "@/utils/aiTranslator";
import { SpeechControl } from "@/components/SpeechControl";
import { LanguageSelector } from "@/components/LanguageSelector";
import { TranscriptDisplay } from "@/components/TranscriptDisplay";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export const MedBridge: React.FC = () => {
  const [sourceLanguage, setSourceLanguage] = useState<string>("en");
  const [targetLanguage, setTargetLanguage] = useState<string>("es");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const isSpeechRecognitionSupported = speechRecognition.isSupported();
  const isTextToSpeechSupported = textToSpeech.isSupported();

  const [useAI, setUseAI] = useState<boolean>(false);
  const [isAILoading, setIsAILoading] = useState<boolean>(false);

  useEffect(() => {
    const translateText = async () => {
      if (transcript.trim() === "") {
        setTranslatedText("");
        return;
      }
      
      try {
        if (useAI) {
          setIsAILoading(true);
          try {
            const aiResult = await aiTranslator.translate(
              transcript,
              sourceLanguage,
              targetLanguage
            );
            setTranslatedText(aiResult);
            setIsAILoading(false);
            return;
          } catch (aiError) {
            console.error("AI translation error, falling back:", aiError);
          } finally {
            setIsAILoading(false);
          }
        }
        
        const result = await translator.translate({
          text: transcript,
          sourceLanguage,
          targetLanguage,
        });
        
        setTranslatedText(result.translatedText);
      } catch (error) {
        console.error("Translation error:", error);
        setTranslatedText("Error translating text");
      }
    };

    translateText();
  }, [transcript, sourceLanguage, targetLanguage, useAI]);

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
    setTranslatedText("");
  }, []);

  useEffect(() => {
    return () => {
      speechRecognition.stop();
      textToSpeech.stop();
    };
  }, []);

  const handleSwapLanguages = useCallback(() => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    handleResetTranscript();
  }, [sourceLanguage, targetLanguage, handleResetTranscript]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <LanguageSelector
              selectedLanguage={sourceLanguage}
              onChange={(lang) => {
                setSourceLanguage(lang);
                handleResetTranscript();
              }}
              label="Speaker Language"
              className="flex-1"
            />
            <LanguageSelector
              selectedLanguage={targetLanguage}
              onChange={(lang) => {
                setTargetLanguage(lang);
                handleResetTranscript();
              }}
              label="Translation Language"
              className="flex-1"
            />
          </div>
          
          <div className="flex items-center justify-end space-x-2">
            <span className="text-sm text-muted-foreground">Enhanced AI Translation</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={useAI}
                onChange={() => setUseAI(!useAI)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
            </label>
            {isAILoading && <span className="text-xs text-muted-foreground">(Loading AI model...)</span>}
          </div>

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
