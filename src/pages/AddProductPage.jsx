import React, { useState } from 'react';
import { addProduct } from '../api';
import toast from 'react-hot-toast';
import { ImagePlus, PackagePlus } from 'lucide-react';

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

    if (!/^\d{3,}$/.test(formData.price)) {
      toast.error('Price must contain only numbers and be at least 3 digits long.');
      return false;
    }

    if (!imageFile) {
      toast.error('Please select an image upload.');
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
      toast.success('Product Successfully added!');
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
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 animate-fade-up">
      <div className="bg-white p-8 md:p-16 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
        
        {/* Soft decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="flex items-center gap-4 mb-10 relative z-10">
          <div className="bg-dark text-white p-3 rounded-xl shadow-lg">
            <PackagePlus size={28} />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tighter">Add Product</h2>
            <p className="text-gray-400 font-medium">Add a new item to the product catalog</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black text-dark tracking-widest uppercase">Brand</label>
              <input type="text" name="brand" value={formData.brand} onChange={handleChange} required className="input-field shadow-sm bg-gray-50 focus:bg-white" placeholder="e.g. Nike" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-black text-dark tracking-widest uppercase">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-field shadow-sm bg-gray-50 focus:bg-white" placeholder="e.g. Air Force 1" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black text-dark tracking-widest uppercase">Category</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} required className="input-field shadow-sm bg-gray-50 focus:bg-white" placeholder="e.g. Sneakers" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-black text-dark tracking-widest uppercase">Price</label>
              <input type="text" name="price" value={formData.price} onChange={handleChange} required className="input-field shadow-sm bg-gray-50 focus:bg-white" placeholder="Amount (Min 3 digits)" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
             <label className="text-sm font-black text-dark tracking-widest uppercase">Description</label>
             <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="input-field shadow-sm bg-gray-50 focus:bg-white resize-y" placeholder="Product description..."></textarea>
          </div>

          <div className="flex flex-col gap-2">
             <label className="text-sm font-black text-dark tracking-widest uppercase">Image</label>
             
             <div className="relative border-2 border-dashed border-gray-300 rounded-2xl p-8 hover:border-brand hover:bg-brand/5 transition-all text-center flex flex-col items-center justify-center cursor-pointer overflow-hidden min-h-[200px]">
               <input type="file" accept="image/*" onChange={handleFileChange} required className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-20" title="Tap to upload" />
               
               {!imageFile ? (
                 <div className="flex flex-col items-center gap-3 text-gray-400 pointer-events-none">
                    <ImagePlus size={48} strokeWidth={1.5} />
                    <p className="font-bold text-lg">Click or drag image here</p>
                    <p className="text-sm font-medium">Supports JPG, PNG, WEBP</p>
                 </div>
               ) : (
                 <div className="absolute inset-0 z-10 bg-black flex items-center justify-center pointer-events-none">
                   <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-full h-full object-cover opacity-80" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-dark/80 backdrop-blur-md text-white px-6 py-2 rounded-full font-bold text-sm shadow-xl">Image Selected</span>
                   </div>
                 </div>
               )}
             </div>
          </div>

          <button type="submit" disabled={loading} className={`w-full py-5 text-lg font-black tracking-widest uppercase mt-6 rounded-xl transition-all shadow-[0_8px_24px_rgba(255,80,97,0.3)] ${
             loading 
               ? 'bg-gray-300 pointer-events-none shadow-none text-gray-500' 
               : 'bg-brand text-white hover:bg-[#ff3b59] hover:-translate-y-1 active:scale-95 cursor-pointer'
          }`}>
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProductPage;
