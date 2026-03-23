import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { fetchProductById, addToCart } from '../api';
import toast from 'react-hot-toast';

function ProductDetailPage({ updateCartCount }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        toast.error('Product not found');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id, navigate]);

  if (loading) return <div style={{textAlign: 'center', padding: '100px 0'}}>Loading product details...</div>;
  if (!product) return null;

  const offerAmount = 500;
  const originalPrice = product.price + offerAmount;
  const discountPercentage = Math.round((offerAmount / originalPrice) * 100);

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id);
      updateCartCount();
      toast.success('Item added to bag');
    } catch (error) {
      toast.error('Failed to add to bag');
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '4rem' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ background: 'none', border: 'none', color: '#535766', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '2rem', fontWeight: 600 }}
      >
        <ArrowLeft size={20} /> Back to Products
      </button>

      <div className="product-detail-container" style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px', width: '100%', minWidth: '300px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: '#f5f5f6' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>

        <div style={{ flex: '1 1 500px', minWidth: '300px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#282c3f', marginBottom: '8px', textTransform: 'uppercase' }}>{product.brand}</h1>
          <h2 style={{ fontSize: '1.4rem', color: '#535766', fontWeight: 400, marginBottom: '2rem' }}>{product.name}</h2>
          
          <div style={{ padding: '1rem 0', borderTop: '1px solid #eaeaec', borderBottom: '1px solid #eaeaec', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#282c3f' }}>Rs. {product.price}</span>
              <span style={{ fontSize: '1.2rem', color: '#94969f', textDecoration: 'line-through' }}>MRP Rs. {originalPrice}</span>
              <span style={{ color: '#ff905a', fontSize: '1.2rem', fontWeight: 800 }}>({discountPercentage}% OFF)</span>
            </div>
            <p style={{ color: '#03a685', fontWeight: 700, fontSize: '0.9rem' }}>inclusive of all taxes</p>
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>PRODUCT DETAILS</h3>
          <p style={{ fontSize: '1rem', color: '#535766', lineHeight: 1.6, marginBottom: '2rem' }}>{product.description}</p>
          <p style={{ fontSize: '1rem', color: '#535766', marginBottom: '2rem' }}><strong>Category:</strong> {product.category}</p>

          <button 
            className="add-to-cart-btn" 
            onClick={handleAddToCart}
            style={{ width: '100%', padding: '18px', fontSize: '1.1rem', marginTop: 'auto' }}
          >
            <ShoppingBag size={22} style={{ marginRight: '10px' }} /> ADD TO BAG
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
