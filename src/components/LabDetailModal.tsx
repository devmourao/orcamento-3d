import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { LabProject } from '../types/lab';
import { LabVisual } from './LabVisual';
import { SectionCta } from './SectionCta';

interface LabDetailModalProps {
  project: LabProject | null;
  onClose: () => void;
}

export function LabDetailModal({ project, onClose }: LabDetailModalProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!project) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const highlights = t(`lab.projects.${project.id}.highlights`, {
    returnObjects: true,
  });
  const highlightList = Array.isArray(highlights)
    ? (highlights as string[])
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lab-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-pointer bg-black/70 backdrop-blur-sm"
        aria-label={t('lab.close')}
        onClick={onClose}
      />

      <div className="lab-modal relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[color:var(--maker-border)] bg-[color:var(--maker-surface)] shadow-2xl">
        <LabVisual project={project} className="h-44 w-full shrink-0 sm:h-52" />

        <div className="flex items-start justify-between gap-4 border-b border-[color:var(--maker-border)] px-5 py-4 sm:px-6">
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-[color:var(--maker-brand-soft)] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--maker-brand)]">
                {t(`lab.categories.${project.category}`)}
              </span>
              <span className="font-mono text-[11px] text-[color:var(--maker-muted)]">
                {project.material} · {project.year}
              </span>
            </div>
            <h2
              id="lab-modal-title"
              className="font-display text-2xl font-bold tracking-tight text-[color:var(--maker-text)]"
            >
              {t(`lab.projects.${project.id}.title`)}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 cursor-pointer rounded-lg border border-[color:var(--maker-border)] px-2.5 py-1.5 text-sm text-[color:var(--maker-muted)] transition-colors hover:border-[color:var(--maker-accent)]/40 hover:text-[color:var(--maker-text)]"
            aria-label={t('lab.close')}
          >
            ✕
          </button>
        </div>

        <div className="space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
          <p className="text-sm leading-relaxed text-[color:var(--maker-muted)] sm:text-base">
            {t(`lab.projects.${project.id}.description`)}
          </p>

          {highlightList.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[color:var(--maker-text)]">
                {t('lab.highlights')}
              </h3>
              <ul className="space-y-2">
                {highlightList.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm text-[color:var(--maker-muted)]"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--maker-accent)]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <dl className="grid grid-cols-2 gap-3 rounded-xl border border-[color:var(--maker-border)] bg-[color:var(--maker-bg)]/60 p-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-[color:var(--maker-muted)]">
                {t('lab.specs.material')}
              </dt>
              <dd className="mt-1 font-semibold text-[color:var(--maker-text)]">
                {project.material}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-[color:var(--maker-muted)]">
                {t('lab.specs.category')}
              </dt>
              <dd className="mt-1 font-semibold text-[color:var(--maker-text)]">
                {t(`lab.categories.${project.category}`)}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-[color:var(--maker-muted)]">
                {t('lab.specs.year')}
              </dt>
              <dd className="mt-1 font-semibold text-[color:var(--maker-text)]">
                {project.year}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-[color:var(--maker-border)] px-5 py-4 sm:px-6">
          <SectionCta
            labelKey="cta.printLikeThis"
            className="text-xs"
            onNavigate={onClose}
          />
          {project.modelUrl && (
            <a
              href={project.modelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--maker-accent)]/40 px-3 py-2 text-xs font-semibold text-[color:var(--maker-accent)] transition-colors hover:bg-[color:var(--maker-accent-soft)]"
            >
              {t('lab.viewModel')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
