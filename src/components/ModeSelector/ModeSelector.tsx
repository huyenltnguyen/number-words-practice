import type { ExerciseMode } from '../../types';
import styles from './ModeSelector.module.css';

interface Props {
  mode: ExerciseMode;
  onChange: (mode: ExerciseMode) => void;
}

export default function ModeSelector({ mode, onChange }: Props) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor="mode-select" id="mode-label" className="sr-only">
        mode:
      </label>
      <div role="group" aria-labelledby="mode-label" className={styles.group}>
        <button type="button" className={`${styles.btn} ${mode === 'number-to-words' ? styles.active : ''}`} aria-pressed={mode === 'number-to-words'} onClick={() => onChange('number-to-words')}>
          number → words
        </button>
        <button type="button" className={`${styles.btn} ${mode === 'words-to-number' ? styles.active : ''}`} aria-pressed={mode === 'words-to-number'} onClick={() => onChange('words-to-number')}>
          words → number
        </button>
      </div>
      <div className={styles.selectWrap}>
        <select id="mode-select" className={styles.select} value={mode} onChange={(e) => onChange(e.target.value as ExerciseMode)} data-testid="mode-select">
          <option value="number-to-words">number → words</option>
          <option value="words-to-number">words → number</option>
        </select>
      </div>
    </div>
  );
}
