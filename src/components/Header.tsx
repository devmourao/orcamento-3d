import { useTranslation } from 'react-i18next';
import makerLogo from '../assets/maker-logo.png';
import { LanguageSwitcher } from './LanguageSwitcher';

const NAV_ITEMS = [
  { href: '#laboratorio', labelKey: 'header.navLab', tone: 'brand' },
  { href: '#fontes', labelKey: 'header.navSources', tone: 'brand' },
  { href: '#ajuda', labelKey: 'header.navHelp', tone: 'brand' },
  { href: '#orcamento', labelKey: 'header.navQuote', tone: 'accent' },
] as const;

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="maker-header fixed inset-x-0 top-0 z-50 border-b border-[color:var(--maker-border)] bg-[color:var(--maker-bg)]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[var(--maker-header-height)] w-full max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
        <a
          href="#topo"
          className="group flex min-w-0 items-center gap-2.5"
          aria-label={t('header.brand')}
        >
          <img
            src={makerLogo}
            alt=""
            width={40}
            height={40}
            className="h-9 w-9 shrink-0 object-contain drop-shadow-[0_6px_14px_rgba(62,126,180,0.35)] sm:h-10 sm:w-10"
          />
          <span className="truncate font-mono text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--maker-accent)] sm:text-sm">
            {t('header.brand')}
          </span>
        </a>

        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <nav
            className="flex max-w-[58vw] items-center gap-0.5 overflow-x-auto rounded-xl border border-[color:var(--maker-border)] bg-[color:var(--maker-surface)] p-1 sm:max-w-none"
            aria-label="Primary"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={
                  item.tone === 'accent'
                    ? 'shrink-0 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-[color:var(--maker-muted)] transition-colors hover:bg-[color:var(--maker-accent-soft)] hover:text-[color:var(--maker-accent)] sm:px-3 sm:text-xs'
                    : 'shrink-0 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-[color:var(--maker-muted)] transition-colors hover:bg-[color:var(--maker-brand-soft)] hover:text-[color:var(--maker-brand)] sm:px-3 sm:text-xs'
                }
              >
                {t(item.labelKey)}
              </a>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
