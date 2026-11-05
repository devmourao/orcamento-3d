import React from 'react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full max-w-4xl mt-12 pt-6 border-t border-slate-800/80 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
      <p>
        © {new Date().getFullYear()}{' '}
        <a
          href="https://maker.mourao.info"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-blue-400 transition-colors font-semibold"
        >
          maker.mourao.info
        </a>
        . {t('footer.rights')}
      </p>

      <div className="flex items-center gap-4">
        <a
          href="https://dev.mourao.info"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-300 transition-colors"
        >
          dev.mourao.info
        </a>
        <span>•</span>
        <a
          href="https://blog.mourao.info"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-300 transition-colors"
        >
          blog.mourao.info
        </a>
      </div>
    </footer>
  );
};