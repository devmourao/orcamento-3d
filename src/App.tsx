import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './components/LanguageSwitcher';

function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <header className="w-full max-w-2xl flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold">{t('header.title')}</h1>
          <p className="text-sm text-slate-400">{t('header.subtitle')}</p>
        </div>
        <LanguageSwitcher />
      </header>

      <main className="w-full max-w-2xl bg-slate-900 p-6 rounded-xl border border-slate-800">
        <p className="text-slate-300">{t('cart.empty')}</p>
      </main>
    </div>
  );
}

export default App;