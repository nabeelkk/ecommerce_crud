import React from 'react';
import { ShoppingBag } from 'lucide-react';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card animate-fade">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
      </div>
      <div className="product-info">
        <h3 className="product-brand">{product.brand}</h3>
        <p className="product-name" title={product.name}>{product.name}</p>
        <p style={{fontSize: '0.8rem', color: '#535766', marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{product.description}</p>
        <div className="product-price">
          Rs. {product.price}
          <span>Rs. {product.price + 500}</span>
          <span style={{color: '#ff905a', fontSize: '0.8rem', fontWeight: '700', marginLeft: '6px'}}>(Rs. 500 OFF)</span>
        </div>
        <button 
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product._id)}
        >
          <ShoppingBag size={18} /> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
