import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api, { BASE_URL } from '../utils/api';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaCloudUploadAlt, FaSpinner, FaSave, FaTrash } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import Loader from '../components/common/Loader';

const ProductEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setName(data.name);
                setPrice(data.price);
                setImage(data.image);
                setBrand(data.brand);
                setCategory(data.category);
                setCountInStock(data.countInStock);
                setDescription(data.description);
            } catch (error) {
                console.error(error);
                toast.error('Error fetching product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await api.post('/upload', formData, config);
            setImage(data);
            toast.success('Image uploaded successfully');
        } catch (error) {
            console.error(error);
            toast.error('Image upload failed');
        } finally {
            setUploading(false);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        },
        multiple: false
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/products/${id}`, {
                name,
                price,
                image,
                brand,
                category,
                description,
                countInStock,
            });

            toast.success('Product updated successfully');
            navigate('/admin/productlist');
        } catch (error) {
            console.error(error);
            toast.error('Error updating product');
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Admin Header */}
            <div className="bg-primary pt-12 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link to="/admin/productlist" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors text-sm font-medium">
                        <FaArrowLeft className="mr-2" /> Back to Inventory
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">Edit Product</h1>
                    <p className="text-gray-400 font-medium mt-2">Update your premium curtain details and imagery.</p>
                </div>
            </div>

            {/* Form Section */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-20">
                <form onSubmit={submitHandler} className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    <div className="p-10 md:p-12 space-y-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Left Column: Essential Details */}
                            <div className="space-y-8">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-accent rounded-full"></span>
                                    Essential Details
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Product Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            placeholder="e.g. Royal Velvet Blue"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Price ($)</label>
                                            <input
                                                type="number"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                                placeholder="0.00"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Stock Count</label>
                                            <input
                                                type="number"
                                                value={countInStock}
                                                onChange={(e) => setCountInStock(e.target.value)}
                                                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                                placeholder="0"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Category</label>
                                            <input
                                                type="text"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                                placeholder="e.g. Living Room"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Brand</label>
                                            <input
                                                type="text"
                                                value={brand}
                                                onChange={(e) => setBrand(e.target.value)}
                                                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                                placeholder="Curtain"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Media & Description */}
                            <div className="space-y-8">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-accent rounded-full"></span>
                                    Product Imagery
                                </h3>

                                <div className="space-y-6">
                                    <div
                                        {...getRootProps()}
                                        className={`relative border-2 border-dashed rounded-[2rem] p-6 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[300px] overflow-hidden ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50 bg-gray-50'
                                            }`}
                                    >
                                        <input {...getInputProps()} />

                                        {image ? (
                                            <div className="relative w-full h-full group">
                                                <img
                                                    src={image.startsWith('http') ? image : `${BASE_URL}${image}`}
                                                    alt="Preview"
                                                    className="w-full h-64 object-cover rounded-3xl shadow-lg"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl backdrop-blur-sm">
                                                    <div className="flex flex-col items-center text-white">
                                                        <FaCloudUploadAlt className="text-4xl mb-2" />
                                                        <p className="text-sm font-bold">Replace Image</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center p-10">
                                                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-gray-300 text-3xl mb-4 mx-auto shadow-inner">
                                                    <FaCloudUploadAlt />
                                                </div>
                                                <p className="text-gray-500 font-bold">Drag & drop image here</p>
                                                <p className="text-xs text-gray-400 mt-2 font-medium">JPG, PNG, JPEG (Max 5MB)</p>
                                            </div>
                                        )}

                                        {uploading && (
                                            <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center rounded-3xl backdrop-blur-md z-30">
                                                <FaSpinner className="text-4xl text-primary animate-spin mb-4" />
                                                <p className="text-sm font-black text-gray-900 uppercase tracking-widest">Uploading...</p>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Image Path</label>
                                        <input
                                            type="text"
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-bold text-gray-500 outline-none"
                                            placeholder="Image path will appear here"
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Full Width: Description */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-accent rounded-full"></span>
                                Product Description
                            </h3>
                            <textarea
                                rows={6}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-8 py-6 bg-gray-50 border border-gray-100 rounded-[2rem] text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none leading-relaxed"
                                placeholder="Describe the product features, materials, and care instructions..."
                                required
                            />
                        </div>
                    </div>

                    {/* Form Footer */}
                    <div className="px-10 py-8 bg-gray-50/50 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/productlist')}
                            className="text-gray-400 hover:text-gray-600 font-bold text-sm transition-colors"
                        >
                            Discard Changes
                        </button>
                        <div className="flex gap-4 w-full sm:w-auto">
                            <button
                                type="submit"
                                className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-12 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl shadow-xl shadow-primary/20 transition-all transform hover:scale-105 active:scale-95"
                            >
                                <FaSave /> Update Product
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductEditPage;
