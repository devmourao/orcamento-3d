import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-12 flex w-full max-w-5xl flex-col items-center justify-between gap-4 border-t border-[color:var(--maker-border)] pt-6 text-xs text-[color:var(--maker-muted)] md:flex-row">
      <p>
        © {new Date().getFullYear()}{' '}
        <a
          href="https://maker.mourao.info"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[color:var(--maker-text)] transition-colors hover:text-[color:var(--maker-brand)]"
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
          className="transition-colors hover:text-[color:var(--maker-text)]"
        >
          dev.mourao.info
        </a>
        <span aria-hidden="true">•</span>
        <a
          href="https://blog.mourao.info"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-[color:var(--maker-text)]"
        >
          blog.mourao.info
        </a>
      </div>
    </footer>
  );
}
