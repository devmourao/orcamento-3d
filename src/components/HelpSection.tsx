import { useEffect, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  HELP_HANDOFF_EVENT,
  readHelpHandoff,
} from '../utils/helpHandoff';
import {
  generateSupportWhatsAppUrl,
  type SupportIntentId,
} from '../utils/whatsapp';
import { SectionCta } from './SectionCta';

const INTENTS: SupportIntentId[] = ['no-model', 'have-idea', 'adapt-lab'];

export function HelpSection() {
  const { t } = useTranslation();
  const [intent, setIntent] = useState<SupportIntentId>('no-model');
  const [need, setNeed] = useState('');
  const [context, setContext] = useState('');
  const [referenceUrl, setReferenceUrl] = useState('');
  const [deadline, setDeadline] = useState('');
  const [relatedPiece, setRelatedPiece] = useState('');

  useEffect(() => {
    const applyHandoff = () => {
      const handoff = readHelpHandoff();
      if (!handoff.hasHandoff) return;

      setIntent(handoff.intent);
      setRelatedPiece(handoff.relatedPiece);
      if (handoff.relatedPiece) {
        setNeed(
          t('help.prefillFromLab', { title: handoff.relatedPiece }),
        );
      }
    };

    applyHandoff();
    window.addEventListener(HELP_HANDOFF_EVENT, applyHandoff);
    return () => window.removeEventListener(HELP_HANDOFF_EVENT, applyHandoff);
  }, [t]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!need.trim()) return;

    const url = generateSupportWhatsAppUrl(t('help.whatsappGreeting'), {
      intentLabel: t(`help.intents.${intent}.label`),
      need: need.trim(),
      context,
      referenceUrl,
      deadline,
      relatedPiece,
    });

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="ajuda"
      className="scroll-mt-[calc(var(--maker-header-height)+1rem)] w-full space-y-8"
      aria-labelledby="help-heading"
    >
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--maker-brand)]">
          {t('help.eyebrow')}
        </p>
        <h2
          id="help-heading"
          className="font-display text-3xl font-bold tracking-tight text-[color:var(--maker-text)] sm:text-4xl"
        >
          {t('help.title')}
        </h2>
        <p className="text-sm leading-relaxed text-[color:var(--maker-muted)] sm:text-base">
          {t('help.subtitle')}
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-3xl gap-6">
        <div
          className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center"
          role="radiogroup"
          aria-label={t('help.intentLabel')}
        >
          {INTENTS.map((id) => {
            const active = intent === id;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setIntent(id)}
                className={`cursor-pointer rounded-xl border px-4 py-3 text-left transition-colors sm:max-w-[14rem] ${
                  active
                    ? 'border-[color:var(--maker-accent)] bg-[color:var(--maker-accent-soft)] text-[color:var(--maker-text)]'
                    : 'border-[color:var(--maker-border)] bg-[color:var(--maker-surface)] text-[color:var(--maker-muted)] hover:border-[color:var(--maker-brand)]/40 hover:text-[color:var(--maker-text)]'
                }`}
              >
                <span className="block text-sm font-semibold text-[color:var(--maker-text)]">
                  {t(`help.intents.${id}.label`)}
                </span>
                <span className="mt-1 block text-xs leading-relaxed">
                  {t(`help.intents.${id}.hint`)}
                </span>
              </button>
            );
          })}
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-[color:var(--maker-border)] bg-[color:var(--maker-surface)]/90 p-6 shadow-xl"
        >
          <div>
            <label
              htmlFor="help-need"
              className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[color:var(--maker-muted)]"
            >
              {t('help.fields.need')} *
            </label>
            <textarea
              id="help-need"
              required
              rows={3}
              value={need}
              onChange={(e) => setNeed(e.target.value)}
              placeholder={t('help.fields.needPlaceholder')}
              className="w-full resize-none rounded-lg border border-[color:var(--maker-border)] bg-[color:var(--maker-bg)] px-4 py-2 text-sm text-[color:var(--maker-text)] placeholder:text-[color:var(--maker-muted)]/70 transition-all focus:outline-none focus:ring-2 focus:ring-[color:var(--maker-accent)]"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="help-context"
                className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[color:var(--maker-muted)]"
              >
                {t('help.fields.context')}
              </label>
              <input
                id="help-context"
                type="text"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder={t('help.fields.contextPlaceholder')}
                className="w-full rounded-lg border border-[color:var(--maker-border)] bg-[color:var(--maker-bg)] px-4 py-2 text-sm text-[color:var(--maker-text)] placeholder:text-[color:var(--maker-muted)]/70 transition-all focus:outline-none focus:ring-2 focus:ring-[color:var(--maker-accent)]"
              />
            </div>
            <div>
              <label
                htmlFor="help-deadline"
                className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[color:var(--maker-muted)]"
              >
                {t('help.fields.deadline')}
              </label>
              <input
                id="help-deadline"
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder={t('help.fields.deadlinePlaceholder')}
                className="w-full rounded-lg border border-[color:var(--maker-border)] bg-[color:var(--maker-bg)] px-4 py-2 text-sm text-[color:var(--maker-text)] placeholder:text-[color:var(--maker-muted)]/70 transition-all focus:outline-none focus:ring-2 focus:ring-[color:var(--maker-accent)]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="help-reference"
              className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[color:var(--maker-muted)]"
            >
              {t('help.fields.reference')}
            </label>
            <input
              id="help-reference"
              type="url"
              value={referenceUrl}
              onChange={(e) => setReferenceUrl(e.target.value)}
              placeholder={t('help.fields.referencePlaceholder')}
              className="w-full rounded-lg border border-[color:var(--maker-border)] bg-[color:var(--maker-bg)] px-4 py-2 text-sm text-[color:var(--maker-text)] placeholder:text-[color:var(--maker-muted)]/70 transition-all focus:outline-none focus:ring-2 focus:ring-[color:var(--maker-accent)]"
            />
          </div>

          {relatedPiece && (
            <p className="rounded-lg border border-[color:var(--maker-brand)]/30 bg-[color:var(--maker-brand-soft)] px-3 py-2 text-xs text-[color:var(--maker-brand)]">
              {t('help.relatedPiece', { title: relatedPiece })}
            </p>
          )}

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[color:var(--maker-success)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:brightness-110"
            >
              {t('help.submit')}
              <span aria-hidden="true">→</span>
            </button>
            <SectionCta
              labelKey="cta.haveFile"
              variant="ghost"
              className="text-xs"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
