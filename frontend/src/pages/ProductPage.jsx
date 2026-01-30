import { useState, useEffect } from 'react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/common/Loader';
import { toast } from 'react-toastify';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
                toast.error('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="bg-white min-h-screen">
            {/* Premium Shop Header */}
            <div className="pt-32 pb-24 px-4 bg-gray-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Curated Collection</h2>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                        Elevate Your Windows
                    </h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                        Explore our selection of premium curtains, handcrafted for elegance and designed for lasting comfort.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
                        Available Designs: <span className="text-gray-900">{products.length}</span>
                    </p>
                    <div className="h-px flex-grow bg-gray-100 hidden md:block ml-6"></div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader />
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-32 bg-gray-50 rounded-3xl border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Our collection is refreshing</h3>
                        <p className="text-gray-500">We're currently adding new premium designs. Please check back soon.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;
