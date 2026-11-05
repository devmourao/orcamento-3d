import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { OrderForm } from './components/OrderForm';
import { CartList } from './components/CartList';
import { useCart } from './hooks/useCart';

function App() {
  const { t } = useTranslation();
  const { items, addItem, removeItem } = useCart();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-6 antialiased">
      <header className="w-full max-w-4xl flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {t('header.title')}
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-1">
            {t('header.subtitle')}
          </p>
        </div>
        <LanguageSwitcher />
      </header>

      <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <OrderForm onAddItem={addItem} />
        <CartList items={items} onRemoveItem={removeItem} />
      </main>
    </div>
  );
}

export default App;