interface SpeechRecognitionEventMap {
  // Define event mappings here
}

interface SpeechRecognition extends EventTarget {
  // Define properties and methods here
  start(): void;
  stop(): void;
  // Add other necessary properties and methods
}

interface SpeechRecognitionStatic {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
}

interface Window {
  webkitSpeechRecognition: SpeechRecognitionStatic;
  SpeechRecognition: SpeechRecognitionStatic;
}

declare var webkitSpeechRecognition: SpeechRecognitionStatic;
declare var SpeechRecognition: SpeechRecognitionStatic;
