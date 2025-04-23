import axios from 'axios';

export interface TranslationRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface TranslationResult {
  translatedText: string;
  detectedLanguage?: string;
}

// For development/prototype, we'll use a mock translator
// In production, you would replace this with a real translation service
// such as Google Translate API, DeepL, or Azure Translator
export class Translator {
  async translate({ text, sourceLanguage, targetLanguage }: TranslationRequest): Promise<TranslationResult> {
    // For a real implementation, you would call an actual translation service
    // Example with axios:
    // const response = await axios.post('https://translation-api.example.com/translate', {
    //   q: text,
    //   source: sourceLanguage,
    //   target: targetLanguage
    // });
    // return {
    //   translatedText: response.data.translatedText,
    //   detectedLanguage: response.data.detectedLanguage
    // };

    // Mock implementation - replace with real API in production
    return this.mockTranslation(text, sourceLanguage, targetLanguage);
  }

  // This is a very simplified mock implementation for prototyping
  private mockTranslation(text: string, sourceLanguage: string, targetLanguage: string): TranslationResult {
    // In a real app, you would integrate with a translation API
    
    // For demo purposes, let's fake some translations
    const mockTranslations: Record<string, Record<string, string>> = {
      "en": {
        "es": "Este es un texto traducido al español.",
        "fr": "C'est un texte traduit en français.",
        "de": "Dies ist ein ins Deutsche übersetzter Text."
      },
      "es": {
        "en": "This is text translated to English.",
        "fr": "C'est un texte traduit en français.",
        "de": "Dies ist ein ins Deutsche übersetzter Text."
      },
      "fr": {
        "en": "This is text translated to English.",
        "es": "Este es un texto traducido al español.",
        "de": "Dies ist ein ins Deutsche übersetzter Text."
      },
      "de": {
        "en": "This is text translated to English.",
        "es": "Este es un texto traducido al español.",
        "fr": "C'est un texte traduit en français.",
      }
    };
    
    // Medical terms mock translations
    const medicalTerms: Record<string, Record<string, Record<string, string>>> = {
      "en": {
        "es": {
          "pain": "dolor",
          "headache": "dolor de cabeza",
          "stomach": "estómago",
          "fever": "fiebre",
          "allergy": "alergia",
          "prescription": "receta médica",
          "medication": "medicamento"
        },
        "fr": {
          "pain": "douleur",
          "headache": "mal de tête",
          "stomach": "estomac",
          "fever": "fièvre",
          "allergy": "allergie",
          "prescription": "ordonnance",
          "medication": "médicament"
        },
        "de": {
          "pain": "Schmerz",
          "headache": "Kopfschmerzen",
          "stomach": "Magen",
          "fever": "Fieber",
          "allergy": "Allergie",
          "prescription": "Rezept",
          "medication": "Medikament"
        }
      }
    };
    
    // If source and target are the same, return the original text
    if (sourceLanguage === targetLanguage) {
      return { translatedText: text };
    }
    
    // Process the text for medical terms first
    let processedText = text;
    if (medicalTerms[sourceLanguage]?.[targetLanguage]) {
      const terms = medicalTerms[sourceLanguage][targetLanguage];
      Object.entries(terms).forEach(([term, translation]) => {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        processedText = processedText.replace(regex, translation);
      });
    }
    
    // For demo, if we have a mock translation for this language pair, return it
    // Otherwise, prefix with a note that it's a mock
    if (mockTranslations[sourceLanguage]?.[targetLanguage]) {
      return { 
        translatedText: mockTranslations[sourceLanguage][targetLanguage],
        detectedLanguage: sourceLanguage
      };
    } else {
      return { 
        translatedText: `[Translated from ${sourceLanguage} to ${targetLanguage}]: ${processedText}`,
        detectedLanguage: sourceLanguage
      };
    }
  }
}

export const translator = new Translator();
