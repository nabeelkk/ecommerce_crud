import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductList from './pages/ProductList';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AddProductPage from './pages/AddProductPage';
import { fetchCart } from './api';

function App() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = async () => {
    try {
      const cartItems = await fetchCart();
      const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(count);
    } catch (error) {
      console.error('Failed to fetch cart count', error);
    }
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Toaster position="top-right" />
        <Header cartCount={cartCount} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage updateCartCount={updateCartCount} />} />
            <Route path="/products" element={<ProductList updateCartCount={updateCartCount} />} />
            <Route path="/products/:id" element={<ProductDetailPage updateCartCount={updateCartCount} />} />
            <Route path="/cart" element={<CartPage updateCartCount={updateCartCount} />} />
            <Route path="/add-product" element={<AddProductPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
