import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, addToCart } from '../api';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';
import { ArrowRight, ShoppingCart } from 'lucide-react';

const AdvBanner = () => (
  <div className="w-full h-40 bg-gradient-to-r from-brand to-orange-400 my-16 rounded-2xl flex flex-col items-center justify-center text-white shadow-[0_8px_32px_rgba(255,80,97,0.3)] cursor-pointer transform hover:scale-[1.02] transition-transform duration-300">
    <h2 className="text-3xl font-black mb-2 tracking-tight">MEGA FASHION SALE</h2>
    <p className="text-lg font-bold">Flat 50% - 80% Off on Top Brands</p>
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
    <div className="px-6 md:px-16 py-8">
      
      {/* Hero Banner */}
      <div className="relative w-full h-[500px] mb-16 rounded-2xl overflow-hidden shadow-xl group">
        <div className="absolute inset-0 bg-gray-200">
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
            alt="Hero Background" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center p-8 md:p-16 text-white space-y-6">
          <h1 className="text-5xl md:text-7xl font-black leading-tight max-w-2xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-md">
            Elevate Your Everyday Style.
          </h1>
          <p className="text-lg md:text-xl max-w-xl opacity-90 font-medium leading-relaxed drop-shadow-sm">
            Discover the latest trends in fashion and explore our wide collection of apparel exclusively curated for you.
          </p>
          <Link to="/products" className="btn-primary w-fit mt-4 bg-white text-dark shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:bg-gray-50 border-0">
            EXPLORE COLLECTION <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-black text-dark tracking-tight">Trending Now</h2>
        <Link to="/products" className="text-brand font-bold uppercase text-sm flex items-center gap-1 hover:underline underline-offset-4">
          View All <ArrowRight size={16} />
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-brand rounded-full animate-spin"></div>
          <p className="mt-4 font-bold text-gray-400">Loading catalog...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {firstEight.map(product => (
              <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>

          {products.length > 0 && <AdvBanner />}

          {nextEight.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
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
