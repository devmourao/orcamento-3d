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
      className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 shadow-xl space-y-4"
    >
      <h2 className="text-xl font-bold text-slate-100 mb-4 border-b border-slate-800 pb-2">
        {t('header.title')}
      </h2>

      {/* Project Name */}
      <div>
        <label
          htmlFor="projectName"
          className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1"
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
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
        />
      </div>

      {/* File URL */}
      <div>
        <label
          htmlFor="fileUrl"
          className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1"
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
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
        />
      </div>

      {/* Grid: Material, Color, Quantity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Material */}
        <div>
          <label
            htmlFor="material"
            className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1"
          >
            {t('form.material')}
          </label>
          <select
            id="material"
            value={material}
            onChange={(e) => setMaterial(e.target.value as FilamentMaterial)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
          >
            <option value="PLA">PLA</option>
            <option value="TPU">TPU (Flexible)</option>
            <option value="PETG">PETG</option>
          </select>
        </div>

        {/* Color */}
        <div>
          <label
            htmlFor="color"
            className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1"
          >
            {t('form.color')}
          </label>
          <input
            id="color"
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Black, Red..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
          />
        </div>

        {/* Quantity */}
        <div>
          <label
            htmlFor="quantity"
            className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1"
          >
            {t('form.quantity')}
          </label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
          />
        </div>
      </div>

      {/* Technical Notes */}
      <div>
        <label
          htmlFor="notes"
          className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1"
        >
          {t('form.notes')}
        </label>
        <textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={t('form.notesPlaceholder')}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm shadow-md cursor-pointer mt-2"
      >
        {t('form.submit')}
      </button>
    </form>
  );
};