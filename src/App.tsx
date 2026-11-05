import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './components/LanguageSwitcher';

function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 antialiased">
      <header className="w-full max-w-2xl flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {t('header.title')}
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-1">
            {t('header.subtitle')}
          </p>
        </div>
        <LanguageSwitcher />
      </header>

      <main className="w-full max-w-2xl bg-slate-900/60 backdrop-blur-sm p-6 rounded-xl border border-slate-800 shadow-xl">
        <p className="text-slate-400 text-center py-8 font-medium">
          {t('cart.empty')}
        </p>
      </main>
    </div>
  );
}

export default App;