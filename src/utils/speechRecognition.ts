
// Define the types for the Web Speech API
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: WebSpeechRecognitionResult;
  length: number;
}

interface WebSpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionOptions {
  lang: string;
  continuous?: boolean;
  interimResults?: boolean;
}

export interface SpeechRecognitionResult {
  transcript: string;
  isFinal: boolean;
}

// Browser speech recognition implementation
class BrowserSpeechRecognition {
  private recognition: any;
  private isListening = false;
  
  constructor() {
    // Initialize the SpeechRecognition API
    const SpeechRecognition = (window as any).SpeechRecognition || 
                              (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      throw new Error('Speech recognition is not supported in this browser');
    }
    
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
  }
  
  start(options: SpeechRecognitionOptions, 
        onResult: (result: SpeechRecognitionResult) => void, 
        onError: (error: Error) => void) {
    
    if (this.isListening) {
      this.stop();
    }
    
    // Configure the recognition
    this.recognition.lang = options.lang;
    this.recognition.continuous = options.continuous ?? true;
    this.recognition.interimResults = options.interimResults ?? true;
    
    // Set up event handlers
    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      const resultIndex = event.resultIndex;
      const results = event.results;
      
      if (resultIndex >= 0 && resultIndex < results.length) {
        const result = results[resultIndex];
        const transcript = result[0]?.transcript || '';
        const isFinal = result.isFinal;
        
        onResult({
          transcript,
          isFinal
        });
      }
    };
    
    this.recognition.onerror = (event: any) => {
      onError(new Error(`Speech recognition error: ${event.error}`));
    };
    
    // Start listening
    try {
      this.recognition.start();
      this.isListening = true;
    } catch (error) {
      onError(error instanceof Error ? error : new Error('Unknown error occurred'));
    }
  }
  
  stop() {
    if (this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.error('Error stopping recognition:', e);
      }
      this.isListening = false;
    }
  }
  
  isSupported() {
    return !!(window as any).SpeechRecognition || !!(window as any).webkitSpeechRecognition;
  }
}

// Export an instance of the speech recognition service
export const speechRecognition = new BrowserSpeechRecognition();
