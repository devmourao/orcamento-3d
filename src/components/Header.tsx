import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 -mx-4 mb-10 border-b border-[color:var(--maker-border)] bg-[color:var(--maker-bg)]/80 px-4 backdrop-blur-xl sm:-mx-6 sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <a href="#topo" className="group inline-flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--maker-accent)] opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[color:var(--maker-accent)]" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--maker-accent)]">
                {t('header.brand')}
              </span>
            </div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-[color:var(--maker-text)] sm:text-3xl">
              {t('header.title')}
            </h1>
            <p className="text-sm font-medium text-[color:var(--maker-muted)]">
              {t('header.subtitle')}
            </p>
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <nav
            className="flex items-center gap-1 rounded-xl border border-[color:var(--maker-border)] bg-[color:var(--maker-surface)] p-1"
            aria-label="Primary"
          >
            <a
              href="#orcamento"
              className="rounded-lg px-3 py-1.5 text-xs font-semibold text-[color:var(--maker-muted)] transition-colors hover:bg-[color:var(--maker-accent-soft)] hover:text-[color:var(--maker-accent)]"
            >
              {t('header.navQuote')}
            </a>
            <a
              href="#laboratorio"
              className="rounded-lg px-3 py-1.5 text-xs font-semibold text-[color:var(--maker-muted)] transition-colors hover:bg-[color:var(--maker-accent-soft)] hover:text-[color:var(--maker-accent)]"
            >
              {t('header.navLab')}
            </a>
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
