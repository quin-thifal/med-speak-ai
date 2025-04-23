
import { TranslationRequest, TranslationResult } from './types';
import { medicalPhrases } from './medicalPhrases';
import { medicalTerms } from './medicalTerms';
import { defaultTranslations } from './defaultTranslations';

export class Translator {
  async translate({ text, sourceLanguage, targetLanguage }: TranslationRequest): Promise<TranslationResult> {
    // For development/prototype, we'll use a mock translator
    return this.mockTranslation(text, sourceLanguage, targetLanguage);
  }

  private mockTranslation(text: string, sourceLanguage: string, targetLanguage: string): TranslationResult {
    if (sourceLanguage === targetLanguage) {
      return { translatedText: text };
    }
    
    // Check for exact phrase match
    const lowerText = text.toLowerCase();
    if (medicalPhrases[sourceLanguage]?.[targetLanguage]?.[lowerText]) {
      return {
        translatedText: medicalPhrases[sourceLanguage][targetLanguage][lowerText],
        detectedLanguage: sourceLanguage
      };
    }
    
    // Try word by word translation
    let processedText = text;
    
    if (medicalTerms[sourceLanguage]?.[targetLanguage]) {
      const terms = medicalTerms[sourceLanguage][targetLanguage];
      
      // First try multi-word phrases
      const multiWordTerms = Object.entries(terms)
        .filter(([term]) => term.includes(" "))
        .sort((a, b) => b[0].length - a[0].length);
      
      for (const [term, translation] of multiWordTerms) {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        processedText = processedText.replace(regex, translation);
      }
      
      // Then try single words
      const singleWordTerms = Object.entries(terms)
        .filter(([term]) => !term.includes(" "));
      
      for (const [term, translation] of singleWordTerms) {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        processedText = processedText.replace(regex, translation);
      }
    }
    
    // If we couldn't translate it properly
    if (processedText === text) {
      return {
        translatedText: defaultTranslations[sourceLanguage]?.[targetLanguage] || 
          `[${sourceLanguage} to ${targetLanguage}]: ${text}`,
        detectedLanguage: sourceLanguage
      };
    }
    
    return {
      translatedText: processedText,
      detectedLanguage: sourceLanguage
    };
  }
}

export const translator = new Translator();
