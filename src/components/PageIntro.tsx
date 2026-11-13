import { useTranslation } from 'react-i18next';

export function PageIntro() {
  const { t } = useTranslation();

  return (
    <section className="w-full space-y-3 pb-2 pt-2" aria-labelledby="page-title">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--maker-brand)]">
        {t('header.brand')}
      </p>
      <h1
        id="page-title"
        className="font-display text-3xl font-extrabold tracking-tight text-[color:var(--maker-text)] sm:text-4xl"
      >
        {t('header.title')}
      </h1>
      <p className="max-w-2xl text-sm font-medium text-[color:var(--maker-muted)] sm:text-base">
        {t('header.subtitle')}
      </p>
    </section>
  );
}
