import { useTranslation } from 'react-i18next';

interface SectionCtaProps {
  /** i18n key under `cta.*`, defaults to primary quote CTA */
  labelKey?: string;
  href?: string;
  variant?: 'primary' | 'ghost';
  className?: string;
  onNavigate?: () => void;
}

export function SectionCta({
  labelKey = 'cta.toQuote',
  href = '#orcamento',
  variant = 'primary',
  className = '',
  onNavigate,
}: SectionCtaProps) {
  const { t } = useTranslation();

  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--maker-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--maker-bg)]';

  const styles =
    variant === 'primary'
      ? 'bg-[color:var(--maker-accent)] text-[color:var(--maker-on-accent)] hover:bg-[color:var(--maker-accent-hover)]'
      : 'border border-[color:var(--maker-accent)]/45 text-[color:var(--maker-accent)] hover:bg-[color:var(--maker-accent-soft)]';

  return (
    <a
      href={href}
      onClick={onNavigate}
      className={`${base} ${styles} ${className}`}
    >
      {t(labelKey)}
      <span aria-hidden="true">→</span>
    </a>
  );
}
