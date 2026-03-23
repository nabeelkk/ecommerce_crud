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
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, sortType]);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
      updateCartCount();
      toast.success('Added to collection');
    } catch (error) {
      toast.error('Request failed');
    }
  };

  return (
    <div className="px-6 md:px-16 py-8 md:py-12 animate-fade-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 w-full">
        <h1 className="text-3xl md:text-5xl font-black text-dark tracking-tighter whitespace-nowrap">
          {selectedCategory ? `${selectedCategory}` : 'All Products'}
          <span className="text-gray-400 font-medium text-lg ml-4 block sm:inline mt-2 sm:mt-0 tracking-normal">
            {products.length} Items Found
          </span>
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Search catalog..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field w-full sm:w-[300px]"
          />

          <select 
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="input-field w-full sm:w-auto font-bold text-gray-600 bg-white cursor-pointer"
          >
            <option value="">Sort By: Relevance</option>
            <option value="nameAsc">Name (A-Z)</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-3 mb-12">
        <span className="font-black text-sm tracking-widest text-dark mr-2">CATEGORIES:</span>
        <button 
          className={`filter-btn ${selectedCategory === '' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('')}
        >
          Discover All
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
        <div className="flex flex-col items-center justify-center py-32 animate-pulse">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-brand rounded-full animate-spin"></div>
          <p className="mt-6 font-bold text-gray-400 tracking-wider">Syncing collection...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map(product => (
            <ProductCard 
              key={product._id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl w-full py-32 flex flex-col items-center justify-center shadow-sm border border-gray-100">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">📭</span>
          </div>
          <h3 className="text-2xl font-black text-dark mb-2 tracking-tight">Nothing matched your criteria</h3>
          <p className="text-gray-400 font-medium">Try removing some active filters or modifying your search text.</p>
          <button onClick={() => {setSearchQuery(''); setSelectedCategory('')}} className="mt-8 btn-primary px-8">Reset All Filters</button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
