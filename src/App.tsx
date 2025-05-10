import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { translationService } from './services/translationService';
import { medicalTerminologyService } from './services/medicalTerminologyService';
import { securityService } from './services/securityService';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [inputLanguage, setInputLanguage] = useState('en-US');
  const [outputLanguage, setOutputLanguage] = useState('es');
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>('');

  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'zh-CN', name: 'Chinese' },
    { code: 'ar-SA', name: 'Arabic' },
  ];

  useEffect(() => {
    // Initialize session
    const newSessionId = securityService.generateSessionId();
    setSessionId(newSessionId);

    // Start session timeout
    securityService.startSessionTimeout(() => {
      setError('Session expired. Please refresh the page to continue.');
      setIsRecording(false);
    });

    // Cleanup on unmount
    return () => {
      securityService.clearSessionTimeout();
      securityService.clearSessionData();
    };
  }, []);

  useEffect(() => {
    translationService.setLanguage(inputLanguage);
  }, [inputLanguage]);

  const startRecording = async () => {
    try {
      if (!securityService.isSecureContext()) {
        throw new Error('This application requires a secure context (HTTPS) to access the microphone.');
      }

      setIsRecording(true);
      setError(null);
      translationService.startRecognition(
        async (text) => {
          if (!securityService.validateData(text)) {
            setError('Invalid input detected');
            return;
          }

          setOriginalText(text);
          try {
            const translation = await translationService.translate(text, outputLanguage);
            const enhancedTranslation = medicalTerminologyService.enhanceTranslation(translation, outputLanguage);
            setTranslatedText(enhancedTranslation);

            // Store the conversation securely
            const conversationData = {
              original: text,
              translated: enhancedTranslation,
              timestamp: new Date().toISOString()
            };
            medicalTerminologyService.storePatientData(sessionId, conversationData);
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
      setError('Failed to start recording. Please check your microphone permissions and ensure you are using HTTPS.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    translationService.stopRecognition();
    setIsRecording(false);
  };

  const speakTranslatedText = () => {
    if (translatedText) {
      const utterance = new SpeechSynthesisUtterance(translatedText.replace(/<[^>]*>/g, ''));
      utterance.lang = outputLanguage;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
