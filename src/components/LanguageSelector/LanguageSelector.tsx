import type { Language } from '../../types';
import { getSupportedLanguages } from '../../engine/languages';
import styles from './LanguageSelector.module.css';

interface Props {
  language: Language;
  onChange: (lang: Language) => void;
}

const SUPPORTED_LANGUAGES = getSupportedLanguages();

export default function LanguageSelector({ language, onChange }: Props) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor="language-select" className="sr-only">
        language:
      </label>
      <div className={styles.selectWrap}>
        <select id="language-select" className={styles.select} value={language} onChange={(e) => onChange(e.target.value as Language)}>
          {SUPPORTED_LANGUAGES.map(({ code, displayName }) => (
            <option key={code} value={code}>
              {displayName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
