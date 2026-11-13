import { useTranslation } from 'react-i18next';
import { modelSources } from '../data/modelSources';
import { SectionCta } from './SectionCta';

export function ModelSources() {
  const { t } = useTranslation();

  return (
    <section
      id="fontes"
      className="scroll-mt-[calc(var(--maker-header-height)+1rem)] w-full space-y-8"
      aria-labelledby="sources-heading"
    >
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--maker-brand)]">
          {t('sources.eyebrow')}
        </p>
        <h2
          id="sources-heading"
          className="font-display text-3xl font-bold tracking-tight text-[color:var(--maker-text)] sm:text-4xl"
        >
          {t('sources.title')}
        </h2>
        <p className="text-sm leading-relaxed text-[color:var(--maker-muted)] sm:text-base">
          {t('sources.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modelSources.map((source) => (
          <a
            key={source.id}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 rounded-2xl border border-[color:var(--maker-border)] bg-[color:var(--maker-surface)] p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[color:var(--maker-accent)]/40 hover:shadow-[0_16px_36px_rgba(0,0,0,0.28)]"
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl font-mono text-xs font-bold text-[color:var(--maker-bg)]"
                style={{ backgroundColor: source.accent }}
                aria-hidden="true"
              >
                {t(`sources.sites.${source.id}.mark`)}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-base font-semibold text-[color:var(--maker-text)] group-hover:text-[color:var(--maker-accent)]">
                  {t(`sources.sites.${source.id}.name`)}
                </h3>
                <p className="font-mono text-[11px] text-[color:var(--maker-muted)]">
                  {source.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[color:var(--maker-muted)]">
              {t(`sources.sites.${source.id}.blurb`)}
            </p>
          </a>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[color:var(--maker-border)] bg-[color:var(--maker-surface)]/50 px-5 py-6 text-center sm:px-8">
        <p className="max-w-xl text-sm text-[color:var(--maker-muted)]">
          {t('sources.bridge')}
        </p>
        <SectionCta labelKey="cta.haveFile" />
      </div>
    </section>
  );
}
