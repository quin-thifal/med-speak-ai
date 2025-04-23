# Healthcare Translation Assistant

A web-based application that enables real-time, multilingual translation between patients and healthcare providers. The application converts spoken input into text, provides a live transcript, and offers translated versions with audio playback.

## Features

- Real-time speech-to-text conversion
- Multilingual translation support
- Audio playback of translated text
- Mobile-responsive design
- Support for multiple languages:
  - English (US)
  - Spanish
  - French
  - German
  - Chinese
  - Arabic

## Technical Stack

- React with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Web Speech API for speech recognition
- Radix UI components for accessible UI elements

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/healthcare-translation-assistant.git
cd healthcare-translation-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Select your input language (the language you will speak in)
2. Select your output language (the language you want to translate to)
3. Click "Start Recording" to begin speech recognition
4. Speak clearly into your microphone
5. View the real-time transcription and translation
6. Click "Speak Translation" to hear the translated text

## Browser Support

This application uses the Web Speech API, which is supported in:
- Chrome (desktop and Android)
- Edge
- Safari (desktop and iOS)
- Firefox

## Security and Privacy

- All speech recognition and translation happens in the browser
- No audio data is sent to external servers
- No personal data is stored

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.