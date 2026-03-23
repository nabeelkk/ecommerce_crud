import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, addToCart } from '../api';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

const AdvBanner = () => (
  <div style={{
    width: '100%',
    height: '150px',
    background: 'linear-gradient(90deg, #ff3f6c 0%, #ff905a 100%)',
    margin: '3rem 0',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(255, 63, 108, 0.3)',
    cursor: 'pointer'
  }}>
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>MEGA FASHION SALE</h2>
      <p style={{ fontSize: '1.2rem', fontWeight: 500 }}>Flat 50% - 80% Off on Top Brands</p>
    </div>
  </div>
);

function HomePage({ updateCartCount }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await fetchProducts();
        setProducts(allProducts.slice(0, 16));
      } catch (error) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
      updateCartCount();
      toast.success('Item added to bag');
    } catch (error) {
      toast.error('Failed to add item');
    }
  };

  const firstEight = products.slice(0, 8);
  const nextEight = products.slice(8, 16);

  return (
    <div>
      {/* Hero Banner */}
      <div className="hero-banner-container" style={{
        position: 'relative',
        width: '100%',
        height: '400px',
        backgroundColor: '#f5f5f6',
        backgroundImage: 'url("https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '8px',
        marginBottom: '3rem',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 4rem',
          color: '#fff'
        }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', maxWidth: '600px', lineHeight: 1.1 }}>Elevate Your Everyday Style.</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '500px', opacity: 0.9 }}>
            Discover the latest trends in fashion and explore our wide collection of apparel exclusively curated for you.
          </p>
          <Link to="/products" className="btn-primary" style={{ width: 'fit-content', padding: '16px 40px', fontSize: '1.1rem', background: '#fff', color: '#ff3f6c', borderRadius: '40px', fontWeight: 800 }}>
            EXPLORE
          </Link>
        </div>
      </div>

      <h2 className="page-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Trending Products</h2>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '100px 0' }}>Loading products...</div>
      ) : (
        <>
          <div className="product-grid">
            {firstEight.map(product => (
              <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>

          {products.length > 0 && <AdvBanner />}

          {nextEight.length > 0 && (
            <div className="product-grid">
              {nextEight.map(product => (
                <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default HomePage;
