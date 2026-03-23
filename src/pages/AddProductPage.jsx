import React, { useState } from 'react';
import { addProduct } from '../api';
import toast from 'react-hot-toast';

function AddProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const validateForm = () => {
    // Validate Text fields
    const textFields = [
      { key: 'name', display: 'Name' },
      { key: 'brand', display: 'Brand' },
      { key: 'category', display: 'Category' },
      { key: 'description', display: 'Description' }
    ];

    for (const field of textFields) {
      const val = formData[field.key];
      if (!val || val.length < 3) {
        toast.error(`${field.display} must contain at least 3 characters.`);
        return false;
      }
      if (val.startsWith(' ')) {
        toast.error(`${field.display} cannot start with a space.`);
        return false;
      }
    }

    // Validate Price field (Numbers only, minimum 3 digits)
    if (!/^\d{3,}$/.test(formData.price)) {
      toast.error('Price must contain only numbers and be at least 3 digits long.');
      return false;
    }

    if (!imageFile) {
      toast.error('Please select an image.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('image', imageFile);

    try {
      await addProduct(data);
      toast.success('Product successfully added!');
      setFormData({ name: '', description: '', price: '', category: '', brand: '' });
      setImageFile(null);
      e.target.reset();
    } catch (error) {
       console.error(error);
       toast.error('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <h2 style={{ marginBottom: '1.5rem', color: '#282c3f' }}>Add New Product</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #eaeaec', borderRadius: '4px' }} />
        </div>
        
        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Brand:</label>
          <input type="text" name="brand" value={formData.brand} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #eaeaec', borderRadius: '4px' }} />
        </div>

        <div>
           <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Category:</label>
           <input type="text" name="category" value={formData.category} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #eaeaec', borderRadius: '4px' }} />
        </div>

        <div>
           <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Price:</label>
           <input type="text" name="price" value={formData.price} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #eaeaec', borderRadius: '4px' }} />
        </div>

        <div>
           <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Description:</label>
           <textarea name="description" value={formData.description} onChange={handleChange} required rows={3} style={{ width: '100%', padding: '10px', border: '1px solid #eaeaec', borderRadius: '4px' }}></textarea>
        </div>

        <div>
           <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Product Image:</label>
           <input type="file" accept="image/*" onChange={handleFileChange} required style={{ width: '100%', padding: '10px', border: '1px solid #eaeaec', borderRadius: '4px' }} />
           
           {imageFile && (
             <div style={{ marginTop: '1rem' }}>
               <p style={{ fontSize: '0.85rem', color: '#696e79', marginBottom: '8px' }}>Image Preview:</p>
               <img src={URL.createObjectURL(imageFile)} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '4px', border: '1px solid #eaeaec' }} />
             </div>
           )}
        </div>

        <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '1rem' }}>
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

export default AddProductPage;
