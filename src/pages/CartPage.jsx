import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCart, removeFromCart, updateCartQuantity } from '../api';
import toast from 'react-hot-toast';

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
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);
      await loadCart();
      updateCartCount();
      toast.success('Removed from Cart');
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

  if (loading) return <div style={{textAlign: 'center', padding: '100px 0'}}>Loading cart...</div>;

  if (cartItems.length === 0) {
    return (
      <div className="empty-state">
        <img src="https://constant.myntassets.com/checkout/assets/img/empty-bag.webp" alt="Empty Bag" width={200} />
        <h3>Hey, it feels so light!</h3>
        <p>There is nothing in your bag. Let's add some items.</p>
        <Link to="/" className="btn-primary">ADD ITEMS FROM WISHLIST</Link>
      </div>
    );
  }

  const totalMRP = cartItems.reduce((acc, item) => acc + (item.productId?.price + 500) * item.quantity, 0);
  const discount = cartItems.reduce((acc, item) => acc + 500 * item.quantity, 0);
  const totalAmount = totalMRP - discount;
  const platformFee = 20;

  return (
    <div>
      <h1 className="page-title">Shopping Bag</h1>
      <div className="cart-container">
        <div className="cart-items">
          <div style={{fontWeight: 700, paddingBottom: '1rem', borderBottom: '1px solid #eaeaec', marginBottom: '1rem'}}>
            {cartItems.length} ITEMS
          </div>
          {cartItems.map((item) => {
            const product = item.productId;
            if (!product) return null; // Handle missing product Ref
            return (
              <div key={item._id} className="cart-item">
                <img src={product.image} alt={product.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <div className="cart-item-brand">{product.brand}</div>
                  <div className="cart-item-name">{product.name}</div>
                  <div className="cart-item-price">
                    Rs. {product.price}
                    <span style={{textDecoration: 'line-through', color: '#535766', fontSize: '0.9rem', fontWeight: 400, marginLeft: '8px'}}>Rs. {product.price + 500}</span>
                  </div>
                  <div className="cart-actions">
                    <div className="quantity-controls">
                      <span>Qty: </span>
                      <button className="quantity-btn" onClick={() => handleUpdateQuantity(item._id, item.quantity, -1)}>-</button>
                      <span style={{fontWeight: 600}}>{item.quantity}</span>
                      <button className="quantity-btn" onClick={() => handleUpdateQuantity(item._id, item.quantity, 1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => handleRemove(item._id)}>Remove</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="cart-summary">
          <div className="summary-title">PRICE DETAILS ({cartItems.length} Items)</div>
          <div className="summary-row">
            <span>Total MRP</span>
            <span>Rs. {totalMRP}</span>
          </div>
          <div className="summary-row">
            <span>Discount on MRP</span>
            <span style={{color: '#03a685'}}>- Rs. {discount}</span>
          </div>
          <div className="summary-row">
            <span>Platform Fee</span>
            <span>Rs. {platformFee}</span>
          </div>
          <div className="summary-row">
            <span>Shipping Fee</span>
            <span style={{color: '#03a685'}}>FREE</span>
          </div>
          <div className="summary-total">
            <span>Total Amount</span>
            <span>Rs. {totalAmount + platformFee}</span>
          </div>
          <button className="checkout-btn" onClick={() => toast.success('Order placed successfully!')}>PLACE ORDER</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
