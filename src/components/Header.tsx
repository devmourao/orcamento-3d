import { useEffect, useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import makerLogo from '../assets/maker-logo.png';
import { LanguageSwitcher } from './LanguageSwitcher';

const NAV_ITEMS = [
  { href: '#laboratorio', labelKey: 'header.navLab', tone: 'brand' },
  { href: '#fontes', labelKey: 'header.navSources', tone: 'brand' },
  { href: '#ajuda', labelKey: 'header.navHelp', tone: 'brand' },
  { href: '#orcamento', labelKey: 'header.navQuote', tone: 'accent' },
] as const;

function navClass(tone: 'brand' | 'accent', compact = false) {
  const size = compact
    ? 'rounded-lg px-3 py-3 text-sm font-semibold'
    : 'rounded-lg px-3 py-1.5 text-xs font-semibold';

  if (tone === 'accent') {
    return `${size} text-[color:var(--maker-muted)] transition-colors hover:bg-[color:var(--maker-accent-soft)] hover:text-[color:var(--maker-accent)]`;
  }

  return `${size} text-[color:var(--maker-muted)] transition-colors hover:bg-[color:var(--maker-brand-soft)] hover:text-[color:var(--maker-brand)]`;
}

export function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="maker-header fixed inset-x-0 top-0 z-50 border-b border-[color:var(--maker-border)] bg-[color:var(--maker-bg)]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[var(--maker-header-height)] w-full max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
        <a
          href="#topo"
          className="group flex min-w-0 items-center gap-2.5"
          aria-label={t('header.brand')}
          onClick={closeMenu}
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

        <div className="flex items-center gap-2 sm:gap-3">
          <nav
            className="hidden items-center gap-1 rounded-xl border border-[color:var(--maker-border)] bg-[color:var(--maker-surface)] p-1 md:flex"
            aria-label="Primary"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={navClass(item.tone)}
              >
                {t(item.labelKey)}
              </a>
            ))}
          </nav>

          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[color:var(--maker-border)] bg-[color:var(--maker-surface)] text-[color:var(--maker-text)] transition-colors hover:border-[color:var(--maker-brand)]/40 hover:text-[color:var(--maker-brand)] md:hidden"
            aria-label={menuOpen ? t('header.closeMenu') : t('header.openMenu')}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">
              {menuOpen ? t('header.closeMenu') : t('header.openMenu')}
            </span>
            <span className="flex h-4 w-4 flex-col justify-between" aria-hidden="true">
              <span
                className={`h-0.5 w-full rounded-full bg-current transition-transform duration-200 ${
                  menuOpen ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-current transition-opacity duration-200 ${
                  menuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-current transition-transform duration-200 ${
                  menuOpen ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id={menuId}
          className="border-t border-[color:var(--maker-border)] bg-[color:var(--maker-bg)]/95 md:hidden"
        >
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-4 sm:px-6">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={navClass(item.tone, true)}
                  onClick={closeMenu}
                >
                  {t(item.labelKey)}
                </a>
              ))}
            </nav>
            <div className="border-t border-[color:var(--maker-border)] pt-3 sm:hidden">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
