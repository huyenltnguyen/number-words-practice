import { useState, useCallback, useEffect, useMemo } from 'react';

interface UseSpeechReturn {
  speak: (text: string, lang: string) => void;
  speaking: boolean;
  supported: boolean;
}

export function useSpeech(): UseSpeechReturn {
  const supported = useMemo(
    () => typeof window !== 'undefined' && 'speechSynthesis' in window,
    []
  );
  const [speaking, setSpeaking] = useState(false);

  const speak = useCallback(
    (text: string, lang: string) => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    },
    [supported]
  );

  useEffect(() => {
    return () => {
      if (supported) window.speechSynthesis.cancel();
    };
  }, [supported]);

  return { speak, speaking, supported };
}
