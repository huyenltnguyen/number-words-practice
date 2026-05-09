import { useEffect } from 'react';
import AppShell from './components/layout/AppShell';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import ModeSelector from './components/ModeSelector/ModeSelector';
import ExerciseCard from './components/ExerciseCard/ExerciseCard';
import Feedback from './components/Feedback/Feedback';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import GameOver from './components/GameOver/GameOver';
import { EXERCISES_PER_ROUND } from './constants/session';
import { useExercise } from './hooks/useExercise';
import styles from './App.module.css';

export default function App() {
  const { exercise, exerciseKey, result, score, mode, submit, next, setLanguage, setMode, resetGame } = useExercise();
  const showRoundResult = result !== null && score.total >= EXERCISES_PER_ROUND;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && result !== null && !score.gameOver) {
        e.preventDefault();
        e.stopPropagation();
        next();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [result, score.gameOver, next]);

  if (score.gameOver) {
    return (
      <AppShell>
        <header className={styles.header}>
          <h1 className={styles.heading}>Number Words Practice</h1>
        </header>
        <main className={styles.main}>
          <div className={styles.gameOverWrap}>
            <GameOver score={score} onPlayAgain={resetGame} />
          </div>
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <header className={styles.header}>
        <h1 className={styles.heading}>Number Words Practice</h1>
        <div className={styles.controls}>
          <LanguageSelector language={exercise.language} onChange={setLanguage} />
          <ModeSelector mode={mode} onChange={setMode} />
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.exerciseArea}>
          <ExerciseCard key={exerciseKey} number={exercise.number} language={exercise.language} mode={mode} onSubmit={submit} disabled={result !== null} />
          <Feedback result={result} onNext={next} actionLabel={showRoundResult ? 'result' : 'next'} />
          <ScoreBoard correct={score.correct} total={score.total} onRestart={resetGame} />
        </div>
      </main>
    </AppShell>
  );
}
