
import { useState, useCallback, useEffect } from "react";
import { translator } from "@/utils/translator";
import { aiTranslator } from "@/utils/aiTranslator";

export const useTranslation = (
  transcript: string,
  sourceLanguage: string,
  targetLanguage: string,
  useAI: boolean
) => {
  const [translatedText, setTranslatedText] = useState<string>("");
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

  return { translatedText, isAILoading };
};
