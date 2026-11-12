import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const isEn = currentLanguage.toLowerCase().startsWith('en');
  const isPt = currentLanguage.toLowerCase().startsWith('pt');

  return (
    <div className="flex items-center gap-1 rounded-xl border border-[color:var(--maker-border)] bg-[color:var(--maker-surface)] p-1">
      <button
        type="button"
        onClick={() => handleLanguageChange('en')}
        aria-pressed={isEn}
        className={`cursor-pointer rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition-colors ${
          isEn
            ? 'bg-[color:var(--maker-accent)] text-[color:var(--maker-on-accent)]'
            : 'text-[color:var(--maker-muted)] hover:text-[color:var(--maker-text)]'
        }`}
        aria-label="Switch language to English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => handleLanguageChange('pt-BR')}
        aria-pressed={isPt}
        className={`cursor-pointer rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition-colors ${
          isPt
            ? 'bg-[color:var(--maker-accent)] text-[color:var(--maker-on-accent)]'
            : 'text-[color:var(--maker-muted)] hover:text-[color:var(--maker-text)]'
        }`}
        aria-label="Mudar idioma para Português"
      >
        PT-BR
      </button>
    </div>
  );
}
