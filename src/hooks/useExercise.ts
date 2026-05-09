import { useState, useCallback } from 'react';
import type { Exercise, ExerciseMode, Language, SessionScore, ValidationResult } from '../types';
import {
  generateNumberWithDifferentDigitCount,
  generateNumberWithRandomDigitCount,
} from '../engine/generator';
import { EXERCISES_PER_ROUND } from '../constants/session';
import { formatNumber } from '../engine/formatter';
import { getDefaultLanguage } from '../engine/languages';
import { validate } from '../engine/validator';

const DEFAULT_LANGUAGE: Language = getDefaultLanguage();

const INITIAL_SCORE: SessionScore = {
  correct: 0,
  total: 0,
  gameOver: false,
};

function makeExercise(language: Language, number: number, mode: ExerciseMode): Exercise {
  return {
    number,
    mode,
    language,
    expected: mode === 'number-to-words' ? formatNumber(number, language) : number.toString(),
  };
}

function createExercise(language: Language, mode: ExerciseMode): Exercise {
  return makeExercise(language, generateNumberWithRandomDigitCount(), mode);
}

function createExerciseAvoiding(
  language: Language,
  previousNumber: number,
  mode: ExerciseMode
): Exercise {
  return makeExercise(language, generateNumberWithDifferentDigitCount(previousNumber), mode);
}

interface UseExerciseReturn {
  exercise: Exercise;
  exerciseKey: number;
  result: ValidationResult | null;
  score: SessionScore;
  mode: ExerciseMode;
  submit: (input: string) => void;
  next: () => void;
  setLanguage: (lang: Language) => void;
  setMode: (mode: ExerciseMode) => void;
  resetGame: () => void;
}

export function useExercise(): UseExerciseReturn {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [mode, setModeState] = useState<ExerciseMode>('number-to-words');
  const [exercise, setExercise] = useState<Exercise>(() =>
    createExercise(DEFAULT_LANGUAGE, 'number-to-words')
  );
  const [exerciseKey, setExerciseKey] = useState(0);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [score, setScore] = useState<SessionScore>(INITIAL_SCORE);

  const submit = useCallback(
    (input: string) => {
      const validationResult = validate(input, exercise.expected, exercise.language, exercise.mode);
      setResult(validationResult);
      setScore((prev) => {
        const newTotal = prev.total + 1;
        return {
          correct: prev.correct + (validationResult.correct ? 1 : 0),
          total: newTotal,
          gameOver: false,
        };
      });
    },
    [exercise]
  );

  const next = useCallback(() => {
    if (result !== null && score.total >= EXERCISES_PER_ROUND) {
      setScore((prev) => ({ ...prev, gameOver: true }));
      return;
    }

    setResult(null);
    setExercise(createExerciseAvoiding(language, exercise.number, mode));
    setExerciseKey((k) => k + 1);
  }, [exercise.number, language, mode, result, score.total]);

  const setLanguage = useCallback(
    (lang: Language) => {
      setLanguageState(lang);
      setResult(null);
      setExercise(makeExercise(lang, exercise.number, mode));
      setExerciseKey((k) => k + 1);
    },
    [exercise.number, mode]
  );

  const setMode = useCallback(
    (newMode: ExerciseMode) => {
      setModeState(newMode);
      setResult(null);
      setExercise(makeExercise(language, exercise.number, newMode));
      setExerciseKey((k) => k + 1);
      setScore(INITIAL_SCORE);
    },
    [language, exercise.number]
  );

  const resetGame = useCallback(() => {
    setResult(null);
    setExercise(createExercise(language, mode));
    setExerciseKey((k) => k + 1);
    setScore(INITIAL_SCORE);
  }, [language, mode]);

  return {
    exercise,
    exerciseKey,
    result,
    score,
    mode,
    submit,
    next,
    setLanguage,
    setMode,
    resetGame,
  };
}
