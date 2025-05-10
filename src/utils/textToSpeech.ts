
// Note: We'll rely on the built-in types for Web Speech API

export interface SpeechOptions {
  text: string;
  language: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export class TextToSpeech {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private voicesLoaded: boolean = false;
  
  constructor() {
    this.synth = window.speechSynthesis;
    this.loadVoices();
    
    // Some browsers need to wait for voices to load
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = this.loadVoices.bind(this);
    }
  }
  
  private loadVoices() {
    this.voices = this.synth.getVoices();
    this.voicesLoaded = true;
  }
  
  speak(options: SpeechOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.voicesLoaded) {
        this.loadVoices();
      }
      
      // Create utterance
      const utterance = new SpeechSynthesisUtterance(options.text);
      
      // Set language
      utterance.lang = options.language;
      
      // Find a voice for the specified language
      const voice = this.findVoiceForLanguage(options.language);
      if (voice) {
        utterance.voice = voice;
      }
      
      // Set options
      utterance.rate = options.rate ?? 1;
      utterance.pitch = options.pitch ?? 1;
      utterance.volume = options.volume ?? 1;
      
      // Set event handlers
      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(new Error(`Speech synthesis error: ${event.error}`));
      
      // Speak the text
      this.synth.speak(utterance);
    });
  }
  
  stop() {
    this.synth.cancel();
  }
  
  pause() {
    this.synth.pause();
  }
  
  resume() {
    this.synth.resume();
  }
  
  isSpeaking() {
    return this.synth.speaking;
  }
  
  private findVoiceForLanguage(language: string): SpeechSynthesisVoice | null {
    // Try to find exact match first
    let voice = this.voices.find(v => v.lang === language);
    
    // If no exact match, try to find a voice that starts with the language code
    if (!voice) {
      const langCode = language.split('-')[0];
      voice = this.voices.find(v => v.lang.startsWith(langCode));
    }
    
    return voice || null;
  }
  
  isSupported() {
    return 'speechSynthesis' in window;
  }
  
  getAvailableVoices() {
    return this.voices;
  }
}

export const textToSpeech = new TextToSpeech();
