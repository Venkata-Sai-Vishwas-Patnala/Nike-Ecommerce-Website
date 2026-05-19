import { useState } from 'react';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { id: number; name: string }) => void;
  api: string;
}

export function AuthModal({ isOpen, onClose, onSuccess, api }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch(`${api}/auth.php?action=${mode}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error); return; }
    if (mode === 'register') { setMode('login'); setError('Registered! Please login.'); return; }
    onSuccess({ id: data.id, name: data.name });
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-md p-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <svg className="w-12 h-12 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 7.8L6.442 15.276c-1.456.616-2.679-.929-1.456-1.845L18.4 3.6c.457-.305 1.067-.305 1.524 0l3.01 2.134c.76.537.76 1.394.066 2.066z"/>
            </svg>
            <h2 className="text-2xl font-bold">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          </div>

          {error && <p className="text-sm text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <input
                type="text"
                placeholder="Full Name"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 rounded-full px-4 py-3 outline-none focus:border-black"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded-full px-4 py-3 outline-none focus:border-black"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full border border-gray-300 rounded-full px-4 py-3 outline-none focus:border-black"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Register'}
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-gray-600">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              className="font-semibold underline"
            >
              {mode === 'login' ? 'Register' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
