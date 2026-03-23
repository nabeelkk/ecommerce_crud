import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart }) {
  // Safe calculation for offer discount
  const offerAmount = 500;
  const originalPrice = product.price + offerAmount;
  const discountPercentage = Math.round((offerAmount / originalPrice) * 100);

  const handleCartClick = (e) => {
    e.preventDefault(); // Stop Link navigation
    e.stopPropagation();
    onAddToCart(product._id);
  };

  return (
    <Link to={`/products/${product._id}`} className="product-card hover-lift" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="product-image-container">
        <img 
          src={product.image || 'https://via.placeholder.com/300x400?text=No+Image'} 
          alt={product.name} 
          className="product-image" 
          loading="lazy" 
        />
      </div>
      <div className="product-info" style={{ display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1 }}>
        <h3 className="product-brand" style={{ textTransform: 'uppercase' }}>{product.brand}</h3>
        <p className="product-name" title={product.name}>{product.name}</p>
        
        <p style={{
          fontSize: '0.85rem', 
          color: '#696e79', 
          marginBottom: '12px', 
          display: '-webkit-box', 
          WebkitLineClamp: 2, 
          WebkitBoxOrient: 'vertical', 
          overflow: 'hidden',
          lineHeight: '1.4',
          flexGrow: 1
        }}>
          {product.description}
        </p>

        <div className="product-price" style={{ marginBottom: '8px' }}>
          Rs. {product.price}
          <span style={{ fontSize: '0.85rem', color: '#94969f', textDecoration: 'line-through', marginLeft: '6px', fontWeight: 500 }}>
            Rs. {originalPrice}
          </span>
          <span className="discount-text" style={{ marginLeft: '8px' }}>
            ({discountPercentage}% OFF)
          </span>
        </div>
        
        <button 
          className="add-to-cart-btn"
          onClick={handleCartClick}
          style={{ marginTop: 'auto', zIndex: 10, position: 'relative' }}
        >
          <ShoppingBag size={18} /> Add to Cart
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;
