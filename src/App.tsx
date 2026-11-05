import { OrderForm } from './components/OrderForm';
import { CartList } from './components/CartList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useCart } from './hooks/useCart';

function App() {
  const { items, addItem, removeItem } = useCart();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between p-6 antialiased">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <Header />

        <main className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <OrderForm onAddItem={addItem} />
          <CartList items={items} onRemoveItem={removeItem} />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;