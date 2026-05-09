import { Language } from '../../types';
import { englishLanguage } from './english';
import { germanLanguage } from './german';
import type { LanguageDefinition, LanguageRules } from './types';

const LANGUAGE_DEFINITIONS: Record<Language, LanguageDefinition> = {
  en: englishLanguage,
  de: germanLanguage,
};

export function getLanguageRules(language: Language): LanguageRules {
  return LANGUAGE_DEFINITIONS[language];
}

export function getLanguageDefinition(language: Language): LanguageDefinition {
  return LANGUAGE_DEFINITIONS[language];
}

export function getSupportedLanguages(): LanguageDefinition[] {
  return Object.values(LANGUAGE_DEFINITIONS);
}

export function getDefaultLanguage(): Language {
  return getSupportedLanguages()[0].code;
}
