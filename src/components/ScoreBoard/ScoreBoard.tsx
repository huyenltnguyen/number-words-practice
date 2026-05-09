import { EXERCISES_PER_ROUND } from '../../constants/session';
import styles from './ScoreBoard.module.css';

interface Props {
  correct: number;
  total: number;
  onRestart: () => void;
}

const currentRound = (total: number) => Math.min(total + 1, EXERCISES_PER_ROUND);

export default function ScoreBoard({ correct, total, onRestart }: Props) {
  return (
    <div
      className={styles.board}
      role="status"
      aria-live="polite"
      aria-label={`Score: ${correct}. Progress: ${currentRound(total)} of ${EXERCISES_PER_ROUND}.`}
    >
      <span className={styles.stat}>
        <span className={styles.label}>score:</span>
        <span className={styles.value}>{correct}</span>
      </span>
      <span className={styles.stat}>
        <span className={styles.label}>progress:</span>
        <span className={styles.value}>
          {currentRound(total)}/{EXERCISES_PER_ROUND}
        </span>
      </span>
      <button type="button" className={styles.restart} onClick={onRestart}>
        restart
      </button>
    </div>
  );
}
