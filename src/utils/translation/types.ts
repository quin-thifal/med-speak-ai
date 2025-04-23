
export interface TranslationRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface TranslationResult {
  translatedText: string;
  detectedLanguage?: string;
}

export type LanguageDict = Record<string, Record<string, string>>;
export type TranslationDict = Record<string, Record<string, Record<string, string>>>;
