import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ShieldCheck, Zap } from 'lucide-react';
import { fetchProductById, addToCart } from '../api';
import toast from 'react-hot-toast';

function ProductDetailPage({ updateCartCount }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        toast.error('Asset not found in database');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id, navigate]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-brand rounded-full animate-spin"></div>
    </div>
  );
  if (!product) return null;

  const offerAmount = 500;
  const originalPrice = product.price + offerAmount;
  const discountPercentage = Math.round((offerAmount / originalPrice) * 100);

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id);
      updateCartCount();
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2500);
      toast.success('Successfully added to your bag');
    } catch (error) {
      toast.error('Failed to communicate with cart');
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-8 md:py-16 animate-fade-up">
      <button 
        onClick={() => navigate(-1)} 
        className="group flex items-center gap-2 text-gray-500 hover:text-dark font-black tracking-widest uppercase text-xs mb-8 md:mb-12 transition-colors"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
        Return to Catalog
      </button>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full relative">
        <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden bg-gray-100 shadow-[0_8px_32px_rgba(0,0,0,0.06)] relative sticky top-32 group">
           <img 
             src={product.image} 
             alt={product.name} 
             className="w-full h-auto object-cover transform transition-transform duration-[1.5s] group-hover:scale-110" 
           />
           <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 font-black text-brand rounded-full shadow-lg border border-white">
             {discountPercentage}% SPECIAL OFFER
           </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col py-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-6xl font-black text-dark uppercase tracking-tighter leading-none">{product.brand}</h1>
            <h2 className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed mt-2">{product.name}</h2>
          </div>
          
          <div className="py-8 my-8 border-y border-gray-200 flex flex-col gap-4">
            <div className="flex items-end gap-4 flex-wrap">
              <span className="text-5xl font-black text-dark tracking-tighter">Rs. {product.price}</span>
              <span className="text-xl text-gray-400 line-through font-semibold mb-1">MRP Rs. {originalPrice}</span>
            </div>
            <p className="text-brand font-black text-sm tracking-widest uppercase flex items-center gap-2">
              <Zap size={16} fill="currentColor" /> inclusive of all taxes
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-sm font-black tracking-widest text-dark uppercase mb-4">The Details</h3>
            <p className="text-gray-500 leading-loose text-lg font-medium">{product.description}</p>
          </div>

          <div className="mb-10">
            <h3 className="text-sm font-black tracking-widest text-dark uppercase mb-4">Category Log</h3>
            <span className="inline-block bg-white border-2 border-gray-100 px-6 py-2 rounded-full font-bold text-gray-600 shadow-sm">{product.category}</span>
          </div>

          <button 
            className={`w-full py-5 text-lg flex items-center justify-center uppercase tracking-widest font-black rounded-xl transition-all duration-300 shadow-xl ${
              isAdded 
                ? 'bg-green-500 text-white shadow-green-500/40 pointer-events-none transform scale-95' 
                : 'bg-dark text-white hover:bg-brand hover:scale-[1.02] hover:-translate-y-1 shadow-black/20 hover:shadow-brand/40'
            }`}
            onClick={handleAddToCart}
          >
            {isAdded ? (
              <><Check size={24} className="mr-3" /> Activated in Bag</>
            ) : (
              <>Purchase Item</>
            )}
          </button>
          
          <div className="mt-8 flex items-center gap-4 text-gray-400 font-semibold justify-center">
             <ShieldCheck size={20} />
             <p className="text-sm tracking-wide">Secure encrypt-level 256-bit checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
