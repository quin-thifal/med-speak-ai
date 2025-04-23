
# MedSpeak AI Bridge - Healthcare Translation Web App

![App Screenshot](./screenshot.png)

A real-time multilingual translation platform designed specifically for healthcare providers to communicate with patients across language barriers, with specialized support for medical terminology.

## Key Features

- **Accurate Speech-to-Text**: Real-time transcription with medical term recognition
- **AI-Powered Translation**: Specialized medical translations in 12 languages
- **Dual Interface**: Side-by-side original/translated text display
- **Audio Playback**: Listen to translations in native pronunciation
- **Secure & Private**: All processing happens client-side (optional server enhancement)
- **Mobile-Optimized**: Fully responsive for clinic or bedside use

## Supported Languages

🇬🇧 English | 🇪🇸 Spanish | 🇫🇷 French | 🇩🇪 German  
🇨🇳 Mandarin | 🇦🇪 Arabic | 🇵🇹 Portuguese | 🇷🇺 Russian  
🇯🇵 Japanese | 🇮🇳 Hindi | 🇮🇩 Bahasa | 🇮🇹 Italian

## Technical Stack

**Frontend**  
[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-blue)](https://tailwindcss.com/)

**AI Services**  
[![Web Speech API](https://img.shields.io/badge/Web_Speech_API-NA-yellowgreen)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
[![HuggingFace](https://img.shields.io/badge/HuggingFace-Transformers-yellow)](https://huggingface.co/)

## Usage Guide

1. **Recording**:
   - Click the microphone icon to start speaking
   - The app automatically detects the input language

2. **Translation**:
   - Select target language from dropdown
   - Medical terms are highlighted in both transcripts

3. **Playback**:
   - Click the speaker icon to hear the translation
   - Adjust playback speed in settings
