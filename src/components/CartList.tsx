import React from 'react';
import { useTranslation } from 'react-i18next';
import type { PrintItem } from '../types/order';

interface CartListProps {
  items: PrintItem[];
  onRemoveItem: (id: string) => void;
}

export const CartList: React.FC<CartListProps> = ({ items, onRemoveItem }) => {
  const { t } = useTranslation();

  if (items.length === 0) {
    return (
      <section className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-slate-500 text-sm font-medium">
          {t('cart.empty')}
        </p>
      </section>
    );
  }

  return (
    <section className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 shadow-xl flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-slate-100 mb-4 border-b border-slate-800 pb-2">
          {t('cart.title')} ({items.length})
        </h2>

        <ul className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
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
                className="text-xs text-red-400 hover:text-red-300 font-medium px-2 py-1 rounded hover:bg-red-500/10 transition-colors"
              >
                {t('cart.removeItem')}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};