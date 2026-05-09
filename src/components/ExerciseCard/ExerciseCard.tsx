import { useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import type { ExerciseMode, Language } from '../../types';
import { formatNumber } from '../../engine/formatter';
import { getLanguageDefinition } from '../../engine/languages';
import { useSpeech } from '../../hooks/useSpeech';
import SpeakButton from '../SpeakButton/SpeakButton';
import styles from './ExerciseCard.module.css';

interface Props {
  number: number;
  language: Language;
  mode: ExerciseMode;
  onSubmit: (input: string) => void;
  disabled: boolean;
}

const LANG_CODES: Record<Language, string> = { en: 'en-US', de: 'de-DE' };
const PLAY_SHORTCUT_HINT = 'Ctrl+. or Cmd+.';

function isPlayShortcut(e: KeyboardEvent<HTMLInputElement>) {
  return (e.ctrlKey || e.metaKey) && (e.key === '.' || e.code === 'Period');
}

export default function ExerciseCard({ number, language, mode, onSubmit, disabled }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const numberInputRef = useRef<HTMLInputElement>(null);
  const languageDefinition = getLanguageDefinition(language);
  const { speak, speaking, supported } = useSpeech();
  const wordForm = mode === 'words-to-number' ? formatNumber(number, language) : null;
  const handleSpeak = () => {
    if (wordForm) {
      speak(wordForm, LANG_CODES[language]);
    }
  };

  useEffect(() => {
    if (!disabled) {
      if (mode === 'number-to-words') {
        const textarea = textareaRef.current;
        if (textarea) {
          textarea.value = '';
          textarea.focus();
          textarea.setSelectionRange(0, 0);
        }
      } else {
        const input = numberInputRef.current;
        if (input) {
          input.value = '';
          input.focus();
        }
      }
    }
  }, [number, disabled, mode]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value =
      mode === 'number-to-words'
        ? (textareaRef.current?.value ?? '')
        : (numberInputRef.current?.value ?? '');
    if (value.trim()) {
      onSubmit(value.trim());
    }
  }

  function handleTextareaKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      e.stopPropagation();
      const value = textareaRef.current?.value ?? '';
      if (value.trim()) {
        onSubmit(value.trim());
      }
    }
  }

  function handleNumberKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (isPlayShortcut(e)) {
      e.preventDefault();
      e.stopPropagation();
      handleSpeak();
      return;
    }

    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      e.stopPropagation();
      const value = numberInputRef.current?.value ?? '';
      if (value.trim()) {
        onSubmit(value.trim());
      }
    }
  }

  const placeholder = languageDefinition
    .format(123)
    .replace(/-/g, ' ')
    .replace(/\band\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <div className={styles.card}>
      <div className={styles.promptWrap}>
        {mode === 'number-to-words' ? (
          <p className={styles.prompt} aria-label={`The number is: ${number.toLocaleString()}`}>
            {number.toLocaleString()}
          </p>
        ) : (
          <div className={styles.wordPromptWrap}>
            <p className={styles.wordPrompt} lang={LANG_CODES[language]}>
              {wordForm}
            </p>
            {supported && (
              <SpeakButton onSpeak={handleSpeak} speaking={speaking} supported={supported} />
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className={styles.inputArea}>
        {mode === 'number-to-words' ? (
          <>
            <label htmlFor="answer-input" className="sr-only">
              Type the number in {languageDefinition.displayName} words (Ctrl+Enter to submit)
            </label>
            <div className={styles.inputWrap}>
              <textarea
                id="answer-input"
                ref={textareaRef}
                className={styles.input}
                placeholder={placeholder}
                disabled={disabled}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                rows={3}
                onKeyDown={handleTextareaKeyDown}
              />
            </div>
          </>
        ) : (
          <>
            <label htmlFor="answer-input" className="sr-only">
              Type the number as digits (Ctrl+Enter to submit)
            </label>
            <div className={styles.numberInputWrap}>
              <input
                id="answer-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                ref={numberInputRef}
                className={styles.numberInput}
                placeholder="123"
                disabled={disabled}
                autoComplete="off"
                onKeyDown={handleNumberKeyDown}
              />
            </div>
            <p className="sr-only">Use {PLAY_SHORTCUT_HINT} to hear the pronunciation.</p>
          </>
        )}
        <button type="submit" className={styles.submit} disabled={disabled}>
          check
          <span className={styles.submitHint}>(ctrl+enter)</span>
        </button>
      </form>
    </div>
  );
}
