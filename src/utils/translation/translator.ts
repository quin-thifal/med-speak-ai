
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
    
    // Remove any surrounding quotes if they exist
    let processedInput = text.trim();
    if ((processedInput.startsWith('"') && processedInput.endsWith('"')) || 
        (processedInput.startsWith("'") && processedInput.endsWith("'"))) {
      processedInput = processedInput.substring(1, processedInput.length - 1);
    }

    // Normalize to lowercase for matching
    const lowerText = processedInput.toLowerCase();
    
    // Check for exact phrase match in medical phrases dictionary
    if (medicalPhrases[sourceLanguage]?.[targetLanguage]?.[lowerText]) {
      return {
        translatedText: medicalPhrases[sourceLanguage][targetLanguage][lowerText],
        detectedLanguage: sourceLanguage
      };
    }
    
    // Try word by word translation
    let translatedText = processedInput;
    
    if (medicalTerms[sourceLanguage]?.[targetLanguage]) {
      const terms = medicalTerms[sourceLanguage][targetLanguage];
      
      // First try multi-word phrases (longer phrases first)
      const multiWordTerms = Object.entries(terms)
        .filter(([term]) => term.includes(" "))
        .sort((a, b) => b[0].length - a[0].length);
      
      for (const [term, translation] of multiWordTerms) {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        translatedText = translatedText.replace(regex, translation);
      }
      
      // Then try single words
      const singleWordTerms = Object.entries(terms)
        .filter(([term]) => !term.includes(" "));
      
      for (const [term, translation] of singleWordTerms) {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        translatedText = translatedText.replace(regex, translation);
      }
    }
    
    // If we have at least some successful translation and it's different from the original
    if (translatedText !== processedInput) {
      return {
        translatedText: translatedText,
        detectedLanguage: sourceLanguage
      };
    }
    
    // If we couldn't translate it properly
    return {
      translatedText: defaultTranslations[sourceLanguage]?.[targetLanguage] || 
        `[${sourceLanguage} to ${targetLanguage}]: ${processedInput}`,
      detectedLanguage: sourceLanguage
    };
  }
}

export const translator = new Translator();
