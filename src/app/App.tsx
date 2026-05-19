import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard, Product } from './components/ProductCard';
import { Cart, CartItem } from './components/Cart';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';

const API = 'http://localhost/E-COMMERECE/api';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);

  useEffect(() => {
    fetch(`${API}/products.php`)
      .then(r => r.json())
      .then(setProducts)
      .catch(console.error);

    fetch(`${API}/auth.php?action=me`, { credentials: 'include' })
      .then(r => r.ok ? r.json() : null)
      .then(data => data && setUser(data))
      .catch(() => {});
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = async () => {
    if (!user) { setIsCartOpen(false); setIsAuthOpen(true); return; }
    const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
    const res = await fetch(`${API}/orders.php`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cartItems, total })
    });
    const data = await res.json();
    if (res.ok) { setCartItems([]); setIsCartOpen(false); alert(`Order #${data.order_id} placed!`); }
    else alert(data.error);
  };

  const handleLogout = async () => {
    await fetch(`${API}/auth.php?action=logout`, { credentials: 'include' });
    setUser(null);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        user={user}
        onLoginClick={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />

      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Best of Air Max</h2>
          <button className="text-sm px-4 py-2 border border-gray-300 rounded-full hover:border-gray-800">
            Shop
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">FLIGHT ESSENTIALS</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Your built-to-last, all-week wears—but with style only Jordan Brand can deliver.
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
            Shop
          </button>
        </div>
      </section>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={setUser}
        api={API}
      />

      <Footer />
    </div>
  );
}
