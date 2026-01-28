import { useState, useEffect } from 'react';
import api from '../utils/api';
import ProductCard from '../components/common/ProductCard';
import Loader from '../components/common/Loader';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState('All');
    const [priceRange, setPriceRange] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        let result = products;

        if (category !== 'All') {
            result = result.filter((product) => product.category === category);
        }

        if (priceRange !== 'All') {
            if (priceRange === 'under50') {
                result = result.filter((product) => product.price < 50);
            } else if (priceRange === '50to100') {
                result = result.filter((product) => product.price >= 50 && product.price <= 100);
            } else if (priceRange === 'over100') {
                result = result.filter((product) => product.price > 100);
            }
        }

        setFilteredProducts(result);
    }, [category, priceRange, products]);

    const categories = ['All', ...new Set(products.map((p) => p.category))];

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shop Curtains</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Product Grid */}
                    <div className="w-full md:w-3/4">
                        {loading ? (
                            <Loader />
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProducts.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>
                                {filteredProducts.length === 0 && (
                                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                        <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                                        <button
                                            onClick={() => { setCategory('All'); setPriceRange('All'); }}
                                            className="mt-4 text-primary font-medium hover:underline"
                                        >
                                            Clear all filters
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
