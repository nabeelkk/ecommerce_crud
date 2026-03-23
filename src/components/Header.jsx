import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, ShoppingBag } from 'lucide-react';

function Header({ cartCount }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      navigate('/products?search=' + e.target.value);
    }
  };

  return (
    <header className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-4 px-6 md:px-16 flex items-center justify-between gap-4 md:gap-8 transition-all">
      <div className="flex items-center gap-4">
        <button 
          className="md:hidden p-2 text-dark hover:text-brand transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-brand text-white font-black text-xl w-10 h-10 flex items-center justify-center rounded-lg shadow-md group-hover:scale-110 transition-transform">
            BF
          </div>
          <span className="text-dark font-black tracking-tighter text-2xl hidden sm:block">BLEND.</span>
        </Link>
      </div>

      <div className="flex-1 max-w-lg hidden md:flex items-center bg-light px-4 py-2.5 rounded-full border border-transparent focus-within:border-brand/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-brand/10 transition-all">
        <Search size={18} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Discover the latest trends..." 
          className="bg-transparent border-none outline-none w-full ml-3 text-sm text-dark placeholder:text-gray-400"
          onKeyDown={handleSearch}
        />
      </div>

      <nav className={`absolute md:static top-[100%] left-0 w-full md:w-auto bg-white/95 md:bg-transparent backdrop-blur-md md:backdrop-blur-none shadow-lg md:shadow-none flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-0 transition-all duration-300 origin-top transform md:transform-none ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 md:scale-y-100 md:opacity-100'}`}>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Shop</NavLink>
        <NavLink to="/add-product" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Add Product</NavLink>
        
        <div className="w-full md:hidden relative mt-2">
          <input type="text" placeholder="Search..." onKeyDown={handleSearch} className="input-field bg-light rounded-full pl-10" />
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </nav>

      <div className="flex items-center ml-auto md:ml-0">
        <Link to="/cart" className="relative p-2 text-dark hover:text-brand transition-colors hover:scale-110 z-10">
          <ShoppingBag size={24} strokeWidth={2.5} />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/4 bg-brand text-white text-[11px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-[0_2px_8px_rgba(255,80,97,0.5)] animate-pop-in">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
