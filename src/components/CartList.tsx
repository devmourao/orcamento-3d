import React from 'react';
import { useTranslation } from 'react-i18next';
import type { PrintItem } from '../types/order';
import  { generateWhatsAppUrl } from '../utils/whatsapp';

interface CartListProps {
  items: PrintItem[];
  onRemoveItem: (id: string) => void;
}

export const CartList: React.FC<CartListProps> = ({ items, onRemoveItem }) => {
  const { t } = useTranslation();

  const whatsappUrl = items.length > 0 ? generateWhatsAppUrl(items, t('whatsapp.greeting')) : '#';

  return (
    <section className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 shadow-xl flex flex-col justify-between min-h-[380px]">
      <div>
        <h2 className="text-xl font-bold text-slate-100 mb-4 border-b border-slate-800 pb-2 flex items-center justify-between">
          <span>{t('cart.title')}</span>
          <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-semibold">
            {items.length}
          </span>
        </h2>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500">
            <svg className="w-12 h-12 mb-3 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="text-sm font-medium">{t('cart.empty')}</p>
          </div>
        ) : (
          <ul className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
            {items.map((item) => (
              <li
                key={item.id}
                className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 flex justify-between items-start text-sm"
              >
                <div className="space-y-1">
                  <h3 className="font-semibold text-slate-200">
                    {item.projectName}
                  </h3>
                  <p className="text-xs text-slate-400">
                    <span className="text-blue-400 font-medium">{item.material}</span> | {item.color} | Qtd: {item.quantity}
                  </p>
                  {item.notes && (
                    <p className="text-xs text-slate-500 italic mt-1">
                      "{item.notes}"
                    </p>
                  )}
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs text-blue-500 hover:underline mt-1 truncate max-w-[200px]"
                  >
                    {item.fileUrl}
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveItem(item.id)}
                  className="text-xs text-red-400 hover:text-red-300 font-medium px-2 py-1 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  {t('cart.removeItem')}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {items.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-800">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l.999 1.594-1.052 3.849 3.951-1.036 1.005.626z" />
            </svg>
            {t('cart.checkoutWhatsApp')}
          </a>
        </div>
      )}
    </section>
  );
};