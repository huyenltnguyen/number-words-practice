import { EXERCISES_PER_ROUND } from '../../constants/session';
import type { SessionScore } from '../../types';
import styles from './GameOver.module.css';

interface Props {
  score: SessionScore;
  onPlayAgain: () => void;
}

export default function GameOver({ score, onPlayAgain }: Props) {
  return (
    <div className={styles.container} role="region" aria-labelledby="game-over-heading">
      <h1 id="game-over-heading" className={styles.heading}>
        round complete
      </h1>

      <div
        className={styles.stats}
        role="status"
        aria-label={`Final score: ${score.correct} out of ${EXERCISES_PER_ROUND} correct.`}
      >
        <div className={styles.stat}>
          <span className={styles.value} aria-hidden="true">
            {score.correct}/{EXERCISES_PER_ROUND}
          </span>
          <span className={styles.label}>correct</span>
        </div>
      </div>

      <button type="button" className={styles.playAgain} onClick={onPlayAgain} autoFocus>
        restart
        <span className={styles.hint}>(enter ↵)</span>
      </button>
    </div>
  );
}
