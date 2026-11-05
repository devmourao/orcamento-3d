import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="w-full max-w-4xl flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-4 border-b border-slate-800/80 gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-wider text-blue-400 uppercase">
            {t('header.brand')}
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-100">
          {t('header.title')}
        </h1>
        <p className="text-sm font-medium text-slate-400 mt-1">
          {t('header.subtitle')}
        </p>
      </div>

      <LanguageSwitcher />
    </header>
  );
};