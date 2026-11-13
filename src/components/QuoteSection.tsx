import { useTranslation } from 'react-i18next';
import type { PrintItem } from '../types/order';
import { CartList } from './CartList';
import { OrderForm } from './OrderForm';

interface QuoteSectionProps {
  items: PrintItem[];
  onAddItem: (item: Omit<PrintItem, 'id'>) => void;
  onRemoveItem: (id: string) => void;
}

export function QuoteSection({
  items,
  onAddItem,
  onRemoveItem,
}: QuoteSectionProps) {
  const { t } = useTranslation();

  return (
    <section
      id="orcamento"
      className="scroll-mt-[calc(var(--maker-header-height)+1rem)] w-full space-y-8"
      aria-labelledby="quote-heading"
    >
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--maker-brand)]">
          {t('quote.eyebrow')}
        </p>
        <h2
          id="quote-heading"
          className="font-display text-3xl font-bold tracking-tight text-[color:var(--maker-text)] sm:text-4xl"
        >
          {t('quote.title')}
        </h2>
        <p className="text-sm leading-relaxed text-[color:var(--maker-muted)] sm:text-base">
          {t('quote.subtitle')}
        </p>
        <p className="text-sm text-[color:var(--maker-muted)]">
          {t('quote.helpBridge')}{' '}
          <a
            href="#ajuda"
            className="font-semibold text-[color:var(--maker-accent)] underline-offset-2 hover:underline"
          >
            {t('quote.helpLink')}
          </a>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <OrderForm onAddItem={onAddItem} />
        <CartList items={items} onRemoveItem={onRemoveItem} />
      </div>
    </section>
  );
}
