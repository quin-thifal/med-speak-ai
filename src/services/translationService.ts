class TranslationService {
  private recognition: SpeechRecognition | null = null;

  constructor() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
    }
  }

  setLanguage(language: string) {
    if (this.recognition) {
      this.recognition.lang = language;
    }
  }

  startRecognition(
    onResult: (text: string) => void,
    onError: (error: Error) => void
  ) {
    if (!this.recognition) {
      onError(new Error('Speech recognition not supported'));
      return;
    }

    this.recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

      onResult(transcript);
    };

    this.recognition.onerror = (event) => {
      onError(new Error(event.error));
    };

    this.recognition.start();
  }

  stopRecognition() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  async translate(text: string, targetLanguage: string): Promise<string> {
    try {
      // TODO: Replace with actual translation API call
      // For now, we'll use a mock translation
      const mockTranslations: Record<string, string> = {
        'es': 'Texto traducido al español',
        'fr': 'Texte traduit en français',
        'de': 'Text ins Deutsche übersetzt',
        'zh': '翻译成中文的文本',
        'ar': 'نص مترجم إلى العربية'
      };

      return mockTranslations[targetLanguage] || text;
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  }
}

export const translationService = new TranslationService(); 