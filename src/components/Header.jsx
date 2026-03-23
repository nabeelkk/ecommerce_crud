import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

function Header({ cartCount }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      navigate('/products?search=' + e.target.value);
    }
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          className="mobile-menu-btn" 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} color="#282c3f" /> : <Menu size={24} color="#282c3f" />}
        </button>

        <Link to="/" className="logo">
          <div className="logo-icon">BF</div>
          <span style={{color: '#282c3f', fontWeight: '800'}}>BLEND FASHION</span>
        </Link>
      </div>

      <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>Products list</NavLink>
        <NavLink to="/add-product" className={({ isActive }) => isActive ? 'active' : ''}>Add Product</NavLink>
        <NavLink to="/cart" className={({ isActive }) => isActive ? 'active cart-nav-link' : 'cart-nav-link'} style={{ position: 'relative' }}>
          Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
