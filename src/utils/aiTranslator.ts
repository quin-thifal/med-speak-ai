
import { pipeline } from '@huggingface/transformers';

// This is a more advanced AI translator that uses Hugging Face models
export class AITranslator {
  private translationPipeline: any = null;
  private modelLoaded: boolean = false;
  private isLoading: boolean = false;

  async loadModel() {
    if (this.modelLoaded || this.isLoading) return;
    
    this.isLoading = true;
    try {
      // Load a translation model
      // Load a translation model
      this.translationPipeline = await pipeline(
        'translation',
        // Using a smaller model for faster loading in browser
        'Helsinki-NLP/opus-mt-en-es'
      );
      this.modelLoaded = true;
    } catch (error) {
      console.error('Error loading translation model:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async translate(text: string, sourceLanguage: string, targetLanguage: string): Promise<string> {
    // If the model isn't loaded, try to load it
    if (!this.modelLoaded && !this.isLoading) {
      await this.loadModel();
    }
    
    // If we successfully loaded the model, use it
    if (this.modelLoaded && this.translationPipeline) {
      try {
        // Provide medical context for better translations
        const contextualizedText = `Medical translation: ${text}`;
        const result = await this.translationPipeline(contextualizedText);
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

  isModelLoaded() {
    return this.modelLoaded;
  }
  
  isModelLoading() {
    return this.isLoading;
  }
}

export const aiTranslator = new AITranslator();
