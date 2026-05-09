import type { ValidationResult } from '../../types';
import styles from './Feedback.module.css';

interface Props {
  result: ValidationResult | null;
  onNext: () => void;
  actionLabel?: 'next' | 'result';
}

export default function Feedback({ result, onNext, actionLabel = 'next' }: Props) {
  return (
    <div role="status" aria-live="polite" aria-atomic="true" className={styles.region}>
      {result !== null && (
        <div className={result.correct ? styles.correct : styles.incorrect}>
          <p className={styles.message}>
            {result.correct ? (
              <span className={`${styles.status} ${styles.correctText}`}>✓ correct</span>
            ) : (
              <>
                <span className={`${styles.status} ${styles.incorrectText}`}>✗ incorrect</span>
                <span className={styles.answer}>correct answer: {result.expected}</span>
              </>
            )}
          </p>
          <button type="button" className={styles.next} onClick={onNext}>
            {actionLabel}
            <span className={styles.hint}>(ctrl+enter)</span>
          </button>
        </div>
      )}
    </div>
  );
}
