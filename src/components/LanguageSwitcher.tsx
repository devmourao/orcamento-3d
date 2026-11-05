import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 p-1">
      <button
        type="button"
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
          currentLanguage === 'en'
            ? 'bg-blue-600 text-white'
            : 'text-slate-400 hover:text-slate-200'
        }`}
        aria-label="Switch language to English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => handleLanguageChange('pt-BR')}
        className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
          currentLanguage.startsWith('pt')
            ? 'bg-blue-600 text-white'
            : 'text-slate-400 hover:text-slate-200'
        }`}
        aria-label="Mudar idioma para Português"
      >
        PT-BR
      </button>
    </div>
  );
};