import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { translationService } from './services/translationService';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [inputLanguage, setInputLanguage] = useState('en-US');
  const [outputLanguage, setOutputLanguage] = useState('es');
  const [error, setError] = useState<string | null>(null);

  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'zh-CN', name: 'Chinese' },
    { code: 'ar-SA', name: 'Arabic' },
  ];

  useEffect(() => {
    translationService.setLanguage(inputLanguage);
  }, [inputLanguage]);

  const startRecording = async () => {
    try {
      setIsRecording(true);
      setError(null);
      translationService.startRecognition(
        async (text) => {
          setOriginalText(text);
          try {
            const translation = await translationService.translate(text, outputLanguage);
            setTranslatedText(translation);
          } catch (error) {
            setError('Translation failed. Please try again.');
          }
        },
        (error) => {
          setError(error.message);
          setIsRecording(false);
        }
      );
    } catch (error) {
      setError('Failed to start recording. Please check your microphone permissions.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    translationService.stopRecognition();
    setIsRecording(false);
  };

  const speakTranslatedText = () => {
    if (translatedText) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = outputLanguage;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Healthcare Translation Assistant
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Input Language</h2>
            <Select value={inputLanguage} onValueChange={setInputLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select input language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Output Language</h2>
            <Select value={outputLanguage} onValueChange={setOutputLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select output language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            variant={isRecording ? "destructive" : "default"}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
          <Button
            onClick={speakTranslatedText}
            disabled={!translatedText}
            variant="secondary"
          >
            Speak Translation
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Original Text</h2>
            <div className="min-h-[200px] p-4 bg-gray-50 rounded-lg">
              {originalText || "Transcription will appear here..."}
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Translated Text</h2>
            <div className="min-h-[200px] p-4 bg-gray-50 rounded-lg">
              {translatedText || "Translation will appear here..."}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
