import React, { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  // Safe calculation for offer discount
  const offerAmount = 500;
  const originalPrice = product.price + offerAmount;
  const discountPercentage = Math.round((offerAmount / originalPrice) * 100);

  const handleCartClick = async (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    try {
      await onAddToCart(product._id);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Link to={`/products/${product._id}`} className="group flex flex-col bg-white rounded-xl overflow-hidden border border-transparent shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-2 hover:border-gray-100 transition-all duration-300 h-full relative">
      
      {/* Absolute Discount Badge */}
      <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-brand font-black text-xs px-3 py-1.5 rounded-full shadow-sm shadow-black/5">
        -{discountPercentage}%
      </div>

      <div className="w-full pt-[133%] relative overflow-hidden bg-gray-100">
        <img 
          src={product.image || 'https://via.placeholder.com/300x400?text=No+Image'} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          loading="lazy" 
        />
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 className="uppercase font-black text-dark text-sm tracking-widest truncate">{product.name}</h3>
        <p className="text-gray-500 text-sm mt-1 truncate" title={product.brand}>{product.brand}</p>
        
        <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mt-4 mb-5">
          <span className="font-black text-lg text-dark tracking-tight">Rs. {product.price}</span>
          <span className="text-xs text-gray-400 font-semibold line-through">Rs. {originalPrice}</span>
        </div>
        
        <button 
          className={`mt-auto w-full relative z-20 flex items-center justify-center gap-2 py-3 px-4 font-black uppercase text-sm rounded-lg border-2 transition-all duration-300 active:scale-95 ${
            isAdded ? 'bg-green-500 text-white border-green-500 shadow-[0_4px_12px_rgba(34,197,94,0.4)] pointer-events-none' : 'bg-transparent text-gray-600 border-gray-200 hover:border-brand hover:text-brand hover:bg-brand/5'
          }`}
          onClick={handleCartClick}
        >
          {isAdded ? (
            <><Check size={18} /> ADDED!</>
          ) : (
            <><ShoppingBag size={18} /> ADD TO BAG</>
          )}
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;
