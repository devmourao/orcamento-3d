import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { FilamentMaterial, PrintItem } from '../types/order';

interface OrderFormProps {
  onAddItem: (item: Omit<PrintItem, 'id'>) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ onAddItem }) => {
  const { t } = useTranslation();

  const [projectName, setProjectName] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [material, setMaterial] = useState<FilamentMaterial>('PLA');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectName.trim() || !fileUrl.trim()) return;

    onAddItem({
      projectName,
      fileUrl,
      material,
      color: color.trim() || 'Standard',
      quantity: Math.max(1, quantity),
      notes,
    });

    // Reset form fields
    setProjectName('');
    setFileUrl('');
    setColor('');
    setQuantity(1);
    setNotes('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-[color:var(--maker-border)] bg-[color:var(--maker-surface)]/90 p-6 shadow-xl"
    >
      <h3 className="font-display mb-4 border-b border-[color:var(--maker-border)] pb-2 text-xl font-bold text-[color:var(--maker-text)]">
        {t('quote.title')}
      </h3>

      {/* Project Name */}
      <div>
        <label
          htmlFor="projectName"
          className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[color:var(--maker-muted)]"
        >
          {t('form.projectName')} *
        </label>
        <input
          id="projectName"
          type="text"
          required
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder={t('form.projectNamePlaceholder')}
          className="w-full rounded-lg border border-[color:var(--maker-border)] bg-[color:var(--maker-bg)] px-4 py-2 text-sm text-[color:var(--maker-text)] placeholder:text-[color:var(--maker-muted)]/70 transition-all focus:outline-none focus:ring-2 focus:ring-[color:var(--maker-accent)]"
        />
      </div>

      {/* File URL */}
      <div>
        <label
          htmlFor="fileUrl"
          className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[color:var(--maker-muted)]"
        >
          {t('form.fileUrl')} *
        </label>
        <input
          id="fileUrl"
          type="url"
          required
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          placeholder="https://thingiverse.com/..."
          className="w-full rounded-lg border border-[color:var(--maker-border)] bg-[color:var(--maker-bg)] px-4 py-2 text-sm text-[color:var(--maker-text)] placeholder:text-[color:var(--maker-muted)]/70 transition-all focus:outline-none focus:ring-2 focus:ring-[color:var(--maker-accent)]"
        />
      </div>

      {/* Grid: Material, Color, Quantity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Material */}
        <div>
          <label
            htmlFor="material"
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[color:var(--maker-muted)]"
          >
            {t('form.material')}
          </label>
          <select
            id="material"
            value={material}
            onChange={(e) => setMaterial(e.target.value as FilamentMaterial)}
            className="w-full rounded-lg border border-[color:var(--maker-border)] bg-[color:var(--maker-bg)] px-3 py-2 text-sm text-[color:var(--maker-text)] transition-all focus:outline-none focus:ring-2 focus:ring-[color:var(--maker-accent)]"
          >
            <option value="PLA">PLA</option>
            <option value="TPU">TPU</option>
            <option value="PETG">PETG</option>
          </select>
        </div>

        {/* Color */}
        <div>
          <label
            htmlFor="color"
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[color:var(--maker-muted)]"
          >
            {t('form.color')}
          </label>
          <input
            id="color"
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Black, Red..."
            className="w-full rounded-lg border border-[color:var(--maker-border)] bg-[color:var(--maker-bg)] px-4 py-2 text-sm text-[color:var(--maker-text)] placeholder:text-[color:var(--maker-muted)]/70 transition-all focus:outline-none focus:ring-2 focus:ring-[color:var(--maker-accent)]"
          />
        </div>

        {/* Quantity */}
        <div>
          <label
            htmlFor="quantity"
            className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[color:var(--maker-muted)]"
          >
            {t('form.quantity')}
          </label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-full rounded-lg border border-[color:var(--maker-border)] bg-[color:var(--maker-bg)] px-4 py-2 text-sm text-[color:var(--maker-text)] transition-all focus:outline-none focus:ring-2 focus:ring-[color:var(--maker-accent)]"
          />
        </div>
      </div>

      {/* Technical Notes */}
      <div>
        <label
          htmlFor="notes"
          className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[color:var(--maker-muted)]"
        >
          {t('form.notes')}
        </label>
        <textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={t('form.notesPlaceholder')}
          className="w-full resize-none rounded-lg border border-[color:var(--maker-border)] bg-[color:var(--maker-bg)] px-4 py-2 text-sm text-[color:var(--maker-text)] placeholder:text-[color:var(--maker-muted)]/70 transition-all focus:outline-none focus:ring-2 focus:ring-[color:var(--maker-accent)]"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-2 w-full cursor-pointer rounded-lg bg-[color:var(--maker-accent)] py-2.5 text-sm font-semibold text-[color:var(--maker-on-accent)] shadow-md transition-colors hover:bg-[color:var(--maker-accent-hover)] active:brightness-95"
      >
        {t('form.submit')}
      </button>
    </form>
  );
};