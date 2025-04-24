import { pipeline } from '@huggingface/transformers';

// This is a more advanced AI translator that uses Hugging Face models
export class AITranslator {
  private translationPipelines: Map<string, any> = new Map();
  private loadedModels: Set<string> = new Set();
  private isLoading: boolean = false;

  // Map of language pairs to their corresponding Helsinki-NLP models
  private modelMap: Record<string, string> = {
    // English to other languages
    'en-es': 'Helsinki-NLP/opus-mt-en-es',
    'en-fr': 'Helsinki-NLP/opus-mt-en-fr',
    'en-de': 'Helsinki-NLP/opus-mt-en-de',
    'en-zh': 'Helsinki-NLP/opus-mt-en-zh',
    'en-ja': 'Helsinki-NLP/opus-mt-en-ja',
    'en-ar': 'Helsinki-NLP/opus-mt-en-ar',
    'en-pt': 'Helsinki-NLP/opus-mt-en-pt',
    'en-ru': 'Helsinki-NLP/opus-mt-en-ru',
    'en-hi': 'Helsinki-NLP/opus-mt-en-hi',
    'en-it': 'Helsinki-NLP/opus-mt-en-it',
    'en-ko': 'Helsinki-NLP/opus-mt-en-ko',
    
    // Other languages to English
    'es-en': 'Helsinki-NLP/opus-mt-es-en',
    'fr-en': 'Helsinki-NLP/opus-mt-fr-en',
    'de-en': 'Helsinki-NLP/opus-mt-de-en',
    'zh-en': 'Helsinki-NLP/opus-mt-zh-en',
    'ja-en': 'Helsinki-NLP/opus-mt-ja-en',
    'ar-en': 'Helsinki-NLP/opus-mt-ar-en',
    'pt-en': 'Helsinki-NLP/opus-mt-pt-en',
    'ru-en': 'Helsinki-NLP/opus-mt-ru-en',
    'hi-en': 'Helsinki-NLP/opus-mt-hi-en',
    'it-en': 'Helsinki-NLP/opus-mt-it-en',
    'ko-en': 'Helsinki-NLP/opus-mt-ko-en',
    
    // Common non-English pairs
    'es-fr': 'Helsinki-NLP/opus-mt-es-fr',
    'fr-es': 'Helsinki-NLP/opus-mt-fr-es',
    'de-fr': 'Helsinki-NLP/opus-mt-de-fr',
    'fr-de': 'Helsinki-NLP/opus-mt-fr-de',
    'es-pt': 'Helsinki-NLP/opus-mt-es-pt',
    'pt-es': 'Helsinki-NLP/opus-mt-pt-es'
  };

  private getModelKey(sourceLanguage: string, targetLanguage: string): string {
    return `${sourceLanguage}-${targetLanguage}`;
  }

  async loadModel(sourceLanguage: string, targetLanguage: string) {
    const modelKey = this.getModelKey(sourceLanguage, targetLanguage);
    
    if (this.loadedModels.has(modelKey) || this.isLoading) return;
    
    this.isLoading = true;
    try {
      const modelName = this.modelMap[modelKey];
      if (!modelName) {
        throw new Error(`No model available for ${modelKey} translation`);
      }

      const translationPipeline = await pipeline('translation', modelName);
      this.translationPipelines.set(modelKey, translationPipeline);
      this.loadedModels.add(modelKey);
    } catch (error) {
      console.error(`Error loading translation model for ${modelKey}:`, error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async translate(text: string, sourceLanguage: string, targetLanguage: string): Promise<string> {
    const modelKey = this.getModelKey(sourceLanguage, targetLanguage);
    
    // If the model isn't loaded, try to load it
    if (!this.loadedModels.has(modelKey) && !this.isLoading) {
      await this.loadModel(sourceLanguage, targetLanguage);
    }
    
    // If we successfully loaded the model, use it
    if (this.loadedModels.has(modelKey)) {
      try {
        const pipeline = this.translationPipelines.get(modelKey);
        // Provide medical context for better translations
        const contextualizedText = `Medical translation: ${text}`;
        const result = await pipeline(contextualizedText);
        return result[0].translation_text;
      } catch (error) {
        console.error('Translation error:', error);
        throw new Error('AI translation failed');
      }
    } else {
      // If model loading failed, throw an error
      throw new Error('Translation model not available');
    }
  }

  isModelLoaded(sourceLanguage: string, targetLanguage: string) {
    return this.loadedModels.has(this.getModelKey(sourceLanguage, targetLanguage));
  }
  
  isModelLoading() {
    return this.isLoading;
  }
}

export const aiTranslator = new AITranslator();
