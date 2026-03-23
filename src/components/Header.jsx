import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

function Header({ cartCount }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      // Basic visual demonstration of search action. In a real app, this would route to a search page or filter the product list.
      navigate('/products?search=' + e.target.value);
    }
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        <div className="logo-icon">BF</div>
        <span style={{color: '#282c3f', fontWeight: '800'}}>BLEND FASHION</span>
      </Link>

      <div className="search-bar" style={{ display: 'flex', alignItems: 'center', background: '#f5f5f6', padding: '8px 16px', borderRadius: '4px', width: '350px' }}>
        <Search size={18} color="#696e79" />
        <input 
          type="text" 
          placeholder="Search for products..." 
          style={{ border: 'none', background: 'transparent', outline: 'none', marginLeft: '12px', width: '100%', fontSize: '0.9rem' }}
          onKeyDown={handleSearch}
        />
      </div>

      <nav className="nav-links" style={{ alignItems: 'center' }}>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>Products list</NavLink>
        <NavLink to="/add-product" className={({ isActive }) => isActive ? 'active' : ''}>Add Product</NavLink>
        <NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : ''} style={{ position: 'relative' }}>
          Cart
          {cartCount > 0 && <span className="cart-badge" style={{ right: '-15px', top: '-10px' }}>{cartCount}</span>}
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
