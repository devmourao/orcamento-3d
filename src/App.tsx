import { OrderForm } from './components/OrderForm';
import { CartList } from './components/CartList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Laboratory } from './components/Laboratory';
import { useCart } from './hooks/useCart';

function App() {
  const { items, addItem, removeItem } = useCart();

  return (
    <div
      id="topo"
      className="maker-shell relative min-h-screen overflow-x-hidden text-[color:var(--maker-text)] antialiased"
    >
      <div className="maker-atmosphere" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-2 sm:px-6">
        <Header />

        <main className="flex flex-1 flex-col gap-16 pb-10 md:gap-20">
          <section
            id="orcamento"
            className="scroll-mt-28 w-full space-y-4"
            aria-label="Quote"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <OrderForm onAddItem={addItem} />
              <CartList items={items} onRemoveItem={removeItem} />
            </div>
          </section>

          <Laboratory />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
