import React, { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories, addToCart } from '../api';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

function ProductList({ updateCartCount }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await fetchCategories();
        setCategories(cats);
      } catch (error) {
        toast.error('Failed to load categories');
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const prods = await fetchProducts(selectedCategory, searchQuery, sortType);
        setProducts(prods);
      } catch (error) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    
    const timer = setTimeout(() => {
        loadProducts();
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, sortType]);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
      updateCartCount();
      toast.success('Item added to bag');
    } catch (error) {
      toast.error('Failed to add item');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>
          {selectedCategory ? `${selectedCategory} Clothing & Accessories` : 'All Products'} 
          <span style={{color: '#535766', fontSize: '1rem', fontWeight: 400, marginLeft: '8px'}}>- {products.length} items</span>
        </h1>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Search by name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: '4px', border: '1px solid #eaeaec', width: '250px', outline: 'none' }}
          />

          <select 
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: '4px', border: '1px solid #eaeaec', outline: 'none', background: '#fff', fontWeight: '500'}}
          >
            <option value="">Sort By: Default</option>
            <option value="nameAsc">Sort By: Name (A-Z)</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
      </div>
      
      <div className="filters">
        <span style={{fontWeight: 700}}>FILTERS</span>
        <button 
          className={`filter-btn ${selectedCategory === '' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('')}
        >
          All
        </button>
        {categories.map(cat => (
          <button 
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{textAlign: 'center', padding: '100px 0'}}>Loading products...</div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <ProductCard 
              key={product._id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
