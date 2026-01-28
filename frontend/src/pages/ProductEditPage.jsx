import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api, { BASE_URL } from '../utils/api';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaCloudUploadAlt, FaSpinner } from 'react-icons/fa';
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
            toast.success('Image uploaded successfully to local storage');
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Link to="/admin/productlist" className="inline-flex items-center text-gray-600 hover:text-primary mb-8 transition-colors">
                <FaArrowLeft className="mr-2" /> Back to Product List
            </Link>

            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                <div className="bg-primary px-8 py-6">
                    <h1 className="text-2xl font-bold text-white">Edit Product</h1>
                    <p className="text-primary-light text-sm opacity-80">Update product details and images.</p>
                </div>

                <form onSubmit={submitHandler} className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column: Basic Info */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    placeholder="Enter product name"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Count</label>
                                    <input
                                        type="number"
                                        value={countInStock}
                                        onChange={(e) => setCountInStock(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                        placeholder="0"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    placeholder="e.g. Living Room, Bedroom"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
                                <input
                                    type="text"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    placeholder="Enter brand name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Right Column: Image & Description */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Image</label>
                                <div
                                    {...getRootProps()}
                                    className={`relative border-2 border-dashed rounded-2xl p-4 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[200px] ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50 bg-gray-50'
                                        }`}
                                >
                                    <input {...getInputProps()} />

                                    {image ? (
                                        <div className="relative w-full h-full group">
                                            <img src={image.startsWith('http') ? image : `${BASE_URL}${image}`} alt="Preview" className="w-full h-48 object-cover rounded-xl shadow-sm" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                                                <p className="text-white text-sm font-medium">Click or drag to replace</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2 mx-auto" />
                                            <p className="text-sm text-gray-500">Drag & drop image here, or click to select</p>
                                            <p className="text-xs text-gray-400 mt-1">JPG, PNG, JPEG (Max 5MB)</p>
                                        </div>
                                    )}

                                    {uploading && (
                                        <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center rounded-xl">
                                            <FaSpinner className="text-3xl text-primary animate-spin mb-2" />
                                            <p className="text-sm font-medium text-gray-700">Uploading to server...</p>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="mt-3 w-full px-3 py-2 text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded-lg outline-none"
                                    placeholder="Or paste image URL here"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                <textarea
                                    rows={5}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                                    placeholder="Describe the product features, materials, and care instructions..."
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            className="px-10 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all transform hover:scale-105 active:scale-95"
                        >
                            Update Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductEditPage;
