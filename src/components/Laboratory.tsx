import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { labProjects } from '../data/labProjects';
import {
  LAB_CATEGORIES,
  type LabCategoryId,
  type LabProject,
} from '../types/lab';
import { LabCard } from './LabCard';
import { LabDetailModal } from './LabDetailModal';
import { SectionCta } from './SectionCta';

type FilterId = 'all' | LabCategoryId;

export function Laboratory() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FilterId>('all');
  const [selected, setSelected] = useState<LabProject | null>(null);

  const filters: FilterId[] = useMemo(() => ['all', ...LAB_CATEGORIES], []);

  const visibleProjects = useMemo(() => {
    const filtered =
      filter === 'all'
        ? labProjects
        : labProjects.filter((project) => project.category === filter);

    return [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [filter]);

  return (
    <section
      id="laboratorio"
      className="scroll-mt-28 w-full space-y-8"
      aria-labelledby="lab-heading"
    >
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--maker-accent)]">
          {t('lab.eyebrow')}
        </p>
        <h2
          id="lab-heading"
          className="font-display text-3xl font-bold tracking-tight text-[color:var(--maker-text)] sm:text-4xl"
        >
          {t('lab.title')}
        </h2>
        <p className="text-sm leading-relaxed text-[color:var(--maker-muted)] sm:text-base">
          {t('lab.subtitle')}
        </p>
      </div>

      <div
        className="flex flex-wrap items-center justify-center gap-2"
        role="tablist"
        aria-label={t('lab.filtersLabel')}
      >
        {filters.map((id) => {
          const active = filter === id;
          const label =
            id === 'all' ? t('lab.filterAll') : t(`lab.categories.${id}`);

          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(id)}
              className={`cursor-pointer rounded-lg px-3.5 py-2 font-mono text-xs font-semibold tracking-wide transition-colors ${
                active
                  ? 'bg-[color:var(--maker-accent)] text-[color:var(--maker-on-accent)]'
                  : 'border border-[color:var(--maker-border)] bg-[color:var(--maker-surface)] text-[color:var(--maker-muted)] hover:border-[color:var(--maker-accent)]/40 hover:text-[color:var(--maker-text)]'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {visibleProjects.length === 0 ? (
        <p className="py-16 text-center text-sm text-[color:var(--maker-muted)]">
          {t('lab.empty')}
        </p>
      ) : (
        <div
          key={filter}
          className="lab-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleProjects.map((project, index) => (
            <LabCard
              key={project.id}
              project={project}
              index={index}
              onOpen={setSelected}
            />
          ))}
        </div>
      )}

      <div className="flex flex-col items-center gap-3 pt-2 text-center">
        <p className="max-w-md text-sm text-[color:var(--maker-muted)]">
          {t('lab.ctaHint')}
        </p>
        <SectionCta labelKey="cta.printLikeThis" />
      </div>

      <LabDetailModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
