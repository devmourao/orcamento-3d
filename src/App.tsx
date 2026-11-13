import { Header } from './components/Header';
import { PageIntro } from './components/PageIntro';
import { Footer } from './components/Footer';
import { Laboratory } from './components/Laboratory';
import { ModelSources } from './components/ModelSources';
import { HelpSection } from './components/HelpSection';
import { QuoteSection } from './components/QuoteSection';
import { useCart } from './hooks/useCart';

function App() {
  const { items, addItem, removeItem } = useCart();

  return (
    <div
      id="topo"
      className="maker-shell relative min-h-screen text-[color:var(--maker-text)] antialiased"
    >
      <div className="maker-atmosphere" aria-hidden="true" />
      <Header />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 pb-2 pt-[calc(var(--maker-header-height)+0.75rem)] sm:px-6">
        <PageIntro />

        <main className="flex flex-1 flex-col gap-16 pb-10 pt-10 md:gap-20">
          <Laboratory />
          <ModelSources />
          <HelpSection />
          <QuoteSection
            items={items}
            onAddItem={addItem}
            onRemoveItem={removeItem}
          />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
