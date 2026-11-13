import { useTranslation } from 'react-i18next';
import type { LabItem } from '../types/lab';
import { LabVisual } from './LabVisual';

interface LabCardProps {
  item: LabItem;
  onOpen: (item: LabItem) => void;
  index: number;
}

export function LabCard({ item, onOpen, index }: LabCardProps) {
  const { t } = useTranslation();

  return (
    <article
      className="lab-card group flex flex-col overflow-hidden rounded-2xl border border-[color:var(--maker-border)] bg-[color:var(--maker-surface)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[color:var(--maker-accent)]/45 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="relative block w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--maker-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--maker-bg)]"
        aria-label={t('lab.openDetails', { title: item.title })}
      >
        <LabVisual item={item} className="aspect-[16/11] w-full" />
        {item.featured && (
          <span className="absolute left-3 top-3 rounded-md border border-[color:var(--maker-accent)]/40 bg-[color:var(--maker-bg)]/80 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[color:var(--maker-accent)] backdrop-blur-sm">
            {t('lab.featured')}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[color:var(--maker-brand-soft)] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--maker-brand)]">
              {t(`lab.categories.${item.category}`)}
            </span>
            <span className="font-mono text-[11px] text-[color:var(--maker-muted)]">
              {[item.material, item.year].filter(Boolean).join(' · ')}
            </span>
          </div>
          <h3 className="font-display text-lg font-semibold tracking-tight text-[color:var(--maker-text)]">
            {item.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-[color:var(--maker-muted)]">
            {item.summary}
          </p>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => onOpen(item)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[color:var(--maker-accent)] px-3 py-2 text-xs font-semibold text-[color:var(--maker-on-accent)] transition-colors hover:bg-[color:var(--maker-accent-hover)]"
          >
            {t('lab.viewDetails')}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}
