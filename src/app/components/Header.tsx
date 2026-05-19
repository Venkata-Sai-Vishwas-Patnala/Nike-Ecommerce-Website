import { ShoppingCart, Menu, Search, Heart, User, LogOut } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  user: { id: number; name: string } | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export function Header({ cartItemCount, onCartClick, user, onLoginClick, onLogout }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Menu className="w-6 h-6 cursor-pointer lg:hidden" />
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 7.8L6.442 15.276c-1.456.616-2.679-.929-1.456-1.845L18.4 3.6c.457-.305 1.067-.305 1.524 0l3.01 2.134c.76.537.76 1.394.066 2.066z"/>
            </svg>
            <nav className="hidden lg:flex items-center gap-6">
              <a href="#" className="hover:text-gray-600 transition-colors">New & Featured</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Men</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Women</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Kids</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Sale</a>
              <a href="#" className="hover:text-gray-600 transition-colors">SNKRS</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Search className="w-5 h-5 text-gray-600" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent border-none outline-none ml-2 w-48"
              />
            </div>
            <Heart className="w-6 h-6 cursor-pointer hover:text-gray-600" />
            <div className="relative cursor-pointer" onClick={onCartClick}>
              <ShoppingCart className="w-6 h-6 hover:text-gray-600" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </div>
            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm font-medium">{user.name}</span>
                <button onClick={onLogout} title="Logout">
                  <LogOut className="w-5 h-5 cursor-pointer hover:text-gray-600" />
                </button>
              </div>
            ) : (
              <button onClick={onLoginClick} className="hidden sm:block">
                <User className="w-6 h-6 cursor-pointer hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
