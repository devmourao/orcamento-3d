import { useTranslation } from 'react-i18next';
import type { PrintItem } from '../types/order';
import { generateWhatsAppUrl } from '../utils/whatsapp';

interface CartListProps {
  items: PrintItem[];
  onRemoveItem: (id: string) => void;
}

export function CartList({ items, onRemoveItem }: CartListProps) {
  const { t } = useTranslation();

  const whatsappUrl =
    items.length > 0 ? generateWhatsAppUrl(items, t('whatsapp.greeting')) : '#';

  return (
    <section className="flex min-h-[380px] flex-col justify-between rounded-2xl border border-[color:var(--maker-border)] bg-[color:var(--maker-surface)]/90 p-6 shadow-xl">
      <div>
        <h2 className="font-display mb-4 flex items-center justify-between border-b border-[color:var(--maker-border)] pb-2 text-xl font-bold text-[color:var(--maker-text)]">
          <span>{t('cart.title')}</span>
          <span className="rounded-full bg-[color:var(--maker-bg)] px-2.5 py-1 font-mono text-xs font-semibold text-[color:var(--maker-muted)]">
            {items.length}
          </span>
        </h2>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[color:var(--maker-muted)]">
            <svg
              className="mb-3 h-12 w-12 text-[color:var(--maker-border)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <p className="text-sm font-medium">{t('cart.empty')}</p>
          </div>
        ) : (
          <ul className="max-h-[320px] space-y-3 overflow-y-auto pr-1">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between rounded-xl border border-[color:var(--maker-border)]/80 bg-[color:var(--maker-bg)] p-4 text-sm"
              >
                <div className="space-y-1">
                  <h3 className="font-semibold text-[color:var(--maker-text)]">
                    {item.projectName}
                  </h3>
                  <p className="text-xs text-[color:var(--maker-muted)]">
                    <span className="font-medium text-[color:var(--maker-accent)]">
                      {item.material}
                    </span>{' '}
                    | {item.color} | {t('form.quantity')}: {item.quantity}
                  </p>
                  {item.notes && (
                    <p className="mt-1 text-xs italic text-[color:var(--maker-muted)]">
                      "{item.notes}"
                    </p>
                  )}
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block max-w-[200px] truncate text-xs text-[color:var(--maker-accent)] hover:underline"
                  >
                    {item.fileUrl}
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveItem(item.id)}
                  className="cursor-pointer rounded px-2 py-1 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
                >
                  {t('cart.removeItem')}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {items.length > 0 && (
        <div className="mt-6 border-t border-[color:var(--maker-border)] pt-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[color:var(--maker-success)] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:brightness-110 active:brightness-95"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l.999 1.594-1.052 3.849 3.951-1.036 1.005.626z" />
            </svg>
            {t('cart.checkoutWhatsApp')}
          </a>
        </div>
      )}
    </section>
  );
}
