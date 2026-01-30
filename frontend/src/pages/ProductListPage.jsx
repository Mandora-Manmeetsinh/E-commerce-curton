import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { BASE_URL } from '../utils/api';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaBox, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Loader from '../components/common/Loader';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/products');
            setProducts(data);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                setProducts(products.filter((product) => product._id !== id));
                toast.success('Product deleted successfully');
            } catch (error) {
                console.error(error);
                toast.error('Error deleting product');
            }
        }
    };

    const createProductHandler = async () => {
        try {
            const { data } = await api.post('/products', {});
            navigate(`/admin/product/${data._id}/edit`);
        } catch (error) {
            console.error(error);
            toast.error('Error creating product');
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Admin Header */}
            <div className="bg-primary pt-12 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link to="/admin" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors text-sm font-medium">
                        <FaArrowLeft className="mr-2" /> Back to Dashboard
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">Product Inventory</h1>
                            <p className="text-gray-400 font-medium">Manage your premium curtains, prices, and stock levels.</p>
                        </div>
                        <button
                            onClick={createProductHandler}
                            className="flex items-center px-8 py-4 bg-accent hover:bg-accent/90 text-white font-bold rounded-2xl shadow-xl shadow-accent/20 transition-all transform hover:scale-105 active:scale-95"
                        >
                            <FaPlus className="mr-3" /> Add New Product
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-20">
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    {/* Search and Filters Bar */}
                    <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="relative w-full md:w-96">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                                <FaSearch />
                            </span>
                            <input
                                type="text"
                                placeholder="Search by name or category..."
                                className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                            {filteredProducts.length} Products Found
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-32 flex justify-center">
                            <Loader />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Product Details</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Category</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Price</th>
                                        <th className="px-8 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Stock Status</th>
                                        <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredProducts.map((product) => (
                                        <tr key={product._id} className="hover:bg-gray-50/30 transition-colors group">
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-14 w-14 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm group-hover:scale-105 transition-transform">
                                                        <img
                                                            className="h-full w-full object-cover"
                                                            src={product.image.startsWith('http') ? product.image : `${BASE_URL}${product.image}`}
                                                            alt={product.name}
                                                        />
                                                    </div>
                                                    <div className="ml-5">
                                                        <div className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">{product.name}</div>
                                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">ID: {product._id.substring(0, 8)}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-100">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <div className="text-sm font-black text-gray-900">${product.price}</div>
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${product.countInStock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                                    <span className={`text-xs font-bold ${product.countInStock > 0 ? 'text-gray-600' : 'text-red-500'}`}>
                                                        {product.countInStock > 0 ? `${product.countInStock} in stock` : 'Out of Stock'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap text-right">
                                                <div className="flex justify-end gap-3">
                                                    <Link
                                                        to={`/admin/product/${product._id}/edit`}
                                                        className="w-10 h-10 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                                        title="Edit Product"
                                                    >
                                                        <FaEdit />
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteHandler(product._id)}
                                                        className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                                        title="Delete Product"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredProducts.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 text-3xl mb-4">
                                                        <FaBox />
                                                    </div>
                                                    <p className="text-gray-500 font-bold">No products found matching your search.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductListPage;
