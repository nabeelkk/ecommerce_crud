import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCart, removeFromCart, updateCartQuantity } from '../api';
import toast from 'react-hot-toast';
import { Trash2, ShoppingBag } from 'lucide-react';

function CartPage({ updateCartCount }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    setLoading(true);
    try {
      const items = await fetchCart();
      setCartItems(items);
    } catch (error) {
      toast.error('Failed to load active cart session');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);
      await loadCart();
      updateCartCount();
      toast.success('Removed successfully');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleUpdateQuantity = async (id, currentQty, change) => {
    const newQty = currentQty + change;
    if (newQty < 1) return;
    try {
      await updateCartQuantity(id, newQty);
      await loadCart();
      updateCartCount();
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] animate-pulse">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-brand rounded-full animate-spin"></div>
    </div>
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 md:p-32 text-center bg-white rounded-3xl m-6 md:m-16 shadow-[0_8px_32px_rgba(0,0,0,0.03)] border border-gray-100 animate-fade-up">
        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-8">
          <ShoppingBag size={48} className="text-gray-300" strokeWidth={1.5} />
        </div>
        <h3 className="text-4xl md:text-5xl font-black text-dark tracking-tighter mb-4">Hey, it feels entirely empty!</h3>
        <p className="text-lg text-gray-400 font-medium mb-12 max-w-lg">There is absolutely nothing in your bag right now. Find your style and build out your collection.</p>
        <Link to="/products" className="btn-primary">EXPLORE THE CATALOG</Link>
      </div>
    );
  }

  const totalMRP = cartItems.reduce((acc, item) => {
    if(!item.productId) return acc;
    return acc + (item.productId.price + 500) * item.quantity;
  }, 0);
  
  const discount = cartItems.reduce((acc, item) => {
    if(!item.productId) return acc;
    return acc + 500 * item.quantity;
  }, 0);
  
  const totalAmount = totalMRP - discount;
  const platformFee = 20;

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-8 md:py-16 animate-fade-up">
      <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-dark mb-10 flex items-center gap-4">
        Review Bag 
        <span className="text-gray-400 font-medium text-lg tracking-normal">({cartItems.length} styles)</span>
      </h1>
      
      <div className="flex flex-col lg:flex-row gap-12 w-full">
        <div className="flex-2 w-full lg:w-2/3 bg-white p-6 md:p-10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col gap-8">
          {cartItems.map((item) => {
            const product = item.productId;
            if (!product) return null; 
            return (
              <div key={item._id} className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-gray-100 last:border-none last:pb-0 transition-all hover:bg-gray-50/50 rounded-xl p-4 -m-4">
                <div className="w-full sm:w-32 h-44 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm relative group">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transform duration-500 group-hover:scale-110" />
                </div>
                
                <div className="flex-1 flex flex-col pt-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-black text-xl text-dark uppercase tracking-widest">{product.brand}</h3>
                      <p className="text-gray-500 font-medium text-lg mt-1 pr-6">{product.name}</p>
                    </div>
                    <button 
                      className="p-3 text-gray-400 hover:text-brand hover:bg-brand/10 transition-colors rounded-full"
                      onClick={() => handleRemove(item._id)}
                      title="Remove Item"
                    >
                      <Trash2 size={20} strokeWidth={2.5} />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <span className="font-black text-2xl text-dark">Rs. {product.price}</span>
                    <span className="text-sm font-bold text-gray-400 line-through">Rs. {product.price + 500}</span>
                  </div>

                  <div className="mt-auto pt-6 flex flex-wrap items-center gap-6">
                    <div className="flex items-center bg-gray-100 p-1.5 rounded-full border border-gray-200">
                      <button 
                        className="w-10 h-10 rounded-full flex items-center justify-center font-black bg-white text-dark shadow-sm hover:bg-dark hover:text-white transition-all text-xl"
                        onClick={() => handleUpdateQuantity(item._id, item.quantity, -1)}
                      >-</button>
                      <span className="font-black text-lg px-6 w-12 text-center">{item.quantity}</span>
                      <button 
                        className="w-10 h-10 rounded-full flex items-center justify-center font-black bg-white text-dark shadow-sm hover:bg-dark hover:text-white transition-all text-xl"
                        onClick={() => handleUpdateQuantity(item._id, item.quantity, 1)}
                      >+</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex-1 w-full lg:w-1/3 bg-white p-6 md:p-10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-gray-100 lg:sticky lg:top-32 h-fit">
          <h3 className="font-black tracking-widest text-sm uppercase text-gray-400 mb-8 border-b border-gray-100 pb-4">Order Summary</h3>
          
          <div className="flex flex-col gap-5 text-gray-600 font-medium text-lg">
            <div className="flex justify-between">
              <span>Total MRP</span>
              <span className="font-bold text-dark">Rs. {totalMRP}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="font-bold text-green-500">- Rs. {discount}</span>
            </div>
            <div className="flex justify-between">
              <span>Platform Fee</span>
              <span className="font-bold text-dark">Rs. {platformFee}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="font-black text-brand tracking-widest uppercase">Free</span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-10 pt-6 border-t-2 border-dashed border-gray-200">
            <span className="font-black text-xl text-dark">Total Amount</span>
            <span className="font-black text-3xl text-dark tracking-tighter">Rs. {totalAmount + platformFee}</span>
          </div>
          
          <button 
            className="w-full mt-10 py-5 bg-gradient-to-r from-brand to-rose-400 text-white font-black tracking-widest uppercase rounded-xl hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(255,80,97,0.4)] transition-all active:scale-95 text-lg"
            onClick={() => toast.success('Your order was securely placed!')}
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
