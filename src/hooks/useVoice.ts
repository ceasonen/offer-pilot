'use client';

import { useMemo, useState } from 'react';

interface VoiceResult {
  transcript?: string;
}

interface VoiceRecognitionEvent {
  results: ArrayLike<ArrayLike<VoiceResult>>;
}

interface RecognitionInstance {
  lang: string;
  interimResults: boolean;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: VoiceRecognitionEvent) => void) | null;
  start: () => void;
}

type RecognitionCtor = new () => RecognitionInstance;

interface VoiceState {
  isSupported: boolean;
  isListening: boolean;
  transcript: string;
  start: () => void;
  stop: () => void;
  clear: () => void;
}

export function useVoice(onResult?: (text: string) => void): VoiceState {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const isSupported = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  }, []);

  const start = () => {
    if (!isSupported || typeof window === 'undefined') return;

    const win = window as Window & {
      webkitSpeechRecognition?: RecognitionCtor;
      SpeechRecognition?: RecognitionCtor;
    };

    const Recognition = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!Recognition) return;
    const recognition = new Recognition();
    recognition.lang = 'zh-CN';
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: VoiceRecognitionEvent) => {
      const text = event.results?.[0]?.[0]?.transcript ?? '';
      setTranscript(text);
      onResult?.(text);
    };
    recognition.start();
  };

  const stop = () => {
    setIsListening(false);
  };

  const clear = () => {
    setTranscript('');
  };

  return { isSupported, isListening, transcript, start, stop, clear };
}
