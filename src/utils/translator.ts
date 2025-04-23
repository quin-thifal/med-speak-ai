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
    
    // If source and target are the same, return the original text
    if (sourceLanguage === targetLanguage) {
      return { translatedText: text };
    }
    
    // Medical phrases mock translations
    const medicalPhrases: Record<string, Record<string, Record<string, string>>> = {
      "en": {
        "es": {
          "i want to report a stomach ache": "Quiero reportar un dolor de estómago",
          "i have a headache": "Tengo dolor de cabeza",
          "i need medication for pain": "Necesito medicamentos para el dolor",
          "i am allergic to penicillin": "Soy alérgico a la penicilina",
          "i need help": "Necesito ayuda",
          "when can i take my medication": "¿Cuándo puedo tomar mi medicamento?",
          "how often should i take this pill": "¿Con qué frecuencia debo tomar esta pastilla?"
        },
        "fr": {
          "i want to report a stomach ache": "Je voudrais signaler des maux d'estomac",
          "i have a headache": "J'ai mal à la tête",
          "i need medication for pain": "J'ai besoin de médicaments contre la douleur",
          "i am allergic to penicillin": "Je suis allergique à la pénicilline",
          "i need help": "J'ai besoin d'aide",
          "when can i take my medication": "Quand puis-je prendre mon médicament?",
          "how often should i take this pill": "À quelle fréquence dois-je prendre ce comprimé?"
        },
        "de": {
          "i want to report a stomach ache": "Ich möchte Bauchschmerzen melden",
          "i have a headache": "Ich habe Kopfschmerzen",
          "i need medication for pain": "Ich brauche Medikamente gegen Schmerzen",
          "i am allergic to penicillin": "Ich bin allergisch gegen Penicillin",
          "i need help": "Ich brauche Hilfe",
          "when can i take my medication": "Wann kann ich mein Medikament nehmen?",
          "how often should i take this pill": "Wie oft soll ich diese Tablette einnehmen?"
        }
      }
    };
    
    // Medical terms mock translations
    const medicalTerms: Record<string, Record<string, Record<string, string>>> = {
      "en": {
        "es": {
          "pain": "dolor",
          "headache": "dolor de cabeza",
          "stomach": "estómago",
          "stomach ache": "dolor de estómago",
          "fever": "fiebre",
          "allergy": "alergia",
          "prescription": "receta médica",
          "medication": "medicamento",
          "doctor": "médico",
          "hospital": "hospital",
          "pharmacy": "farmacia",
          "nurse": "enfermera",
          "symptom": "síntoma",
          "treatment": "tratamiento",
          "emergency": "emergencia",
          "i want to": "quiero",
          "report": "reportar",
          "i have": "tengo",
          "i need": "necesito"
        },
        "fr": {
          "pain": "douleur",
          "headache": "mal de tête",
          "stomach": "estomac",
          "stomach ache": "douleur du ventre",
          "fever": "fièvre",
          "allergy": "allergie",
          "prescription": "ordonnance",
          "medication": "médicament",
          "doctor": "médecin",
          "hospital": "hôpital",
          "pharmacy": "pharmacie",
          "nurse": "infirmière",
          "symptom": "symptôme",
          "treatment": "traitement",
          "emergency": "urgence",
          "i want to": "je veux",
          "report": "rapporter",
          "i have": "j'ai",
          "i need": "je n'ai pas"
        },
        "de": {
          "pain": "Schmerz",
          "headache": "Kopfschmerzen",
          "stomach": "Magen",
          "stomach ache": "Bauchschmerzen",
          "fever": "Fieber",
          "allergy": "Allergie",
          "prescription": "Rezept",
          "medication": "Medikament",
          "doctor": "Arzt",
          "hospital": "Krankenhaus",
          "pharmacy": "Apotheke",
          "nurse": "Arztin",
          "symptom": "Symptom",
          "treatment": "Behandlung",
          "emergency": "Notfall",
          "i want to": "ich möchte",
          "report": "melden",
          "i have": "ich habe",
          "i need": "ich brauche"
        }
      }
    };
    
    // Check if we have an exact phrase match
    const lowerText = text.toLowerCase();
    if (medicalPhrases[sourceLanguage]?.[targetLanguage]?.[lowerText]) {
      return {
        translatedText: medicalPhrases[sourceLanguage][targetLanguage][lowerText],
        detectedLanguage: sourceLanguage
      };
    }
    
    // If no exact phrase match, try to translate word by word
    let processedText = text;
    
    if (medicalTerms[sourceLanguage]?.[targetLanguage]) {
      const terms = medicalTerms[sourceLanguage][targetLanguage];
      // First try multi-word terms
      Object.entries(terms).forEach(([term, translation]) => {
        if (term.includes(" ")) {
          const regex = new RegExp(`\\b${term}\\b`, 'gi');
          processedText = processedText.replace(regex, translation);
        }
      });
      // Then try single words
      Object.entries(terms).forEach(([term, translation]) => {
        if (!term.includes(" ")) {
          const regex = new RegExp(`\\b${term}\\b`, 'gi');
          processedText = processedText.replace(regex, translation);
        }
      });
    }
    
    // Default fallback if no better translation is available
    const defaultTranslations: Record<string, Record<string, string>> = {
      "en": {
        "es": "Lo siento, no puedo traducir esto correctamente.",
        "fr": "Désolé, je ne peux pas traduire cela correctement.",
        "de": "Es tut mir leid, ich kann das nicht richtig übersetzen."
      },
      "es": {
        "en": "Sorry, I cannot translate this correctly.",
        "fr": "Désolé, je ne peux pas traduire cela correctement.",
        "de": "Es tut mir leid, ich kann das nicht richtig übersetzen."
      },
      "fr": {
        "en": "Sorry, I cannot translate this correctly.",
        "es": "Lo siento, no puedo traducir esto correctamente.",
        "de": "Es tut mir leid, ich kann das nicht richtig übersetzen."
      },
      "de": {
        "en": "Sorry, I cannot translate this correctly.",
        "es": "Lo siento, no puedo traducir esto correctamente.",
        "fr": "Désolé, je ne peux pas traduire cela correctement."
      }
    };
    
    // If we couldn't translate it properly through our word-by-word approach
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
