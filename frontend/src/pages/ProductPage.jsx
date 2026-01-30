import { useState, useEffect } from 'react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/common/Loader';
import { toast } from 'react-toastify';

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
                toast.error('Failed to load products');
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
        <div className="bg-gray-50 min-h-screen">
            {/* Shop Header */}
            <div className="bg-primary py-24 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-3">Our Collection</h2>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-sky-300">Curtains</span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                        Discover the perfect blend of luxury and comfort with our handcrafted premium curtains.
                    </p>
                </div>
            </div>

            {/* Filters and Grid Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-1/4 space-y-10">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-accent rounded-full"></span>
                                Categories
                            </h3>
                            <div className="flex flex-col gap-3">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={`text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${category === cat
                                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                                : 'bg-white text-gray-500 hover:bg-gray-100'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-accent rounded-full"></span>
                                Price Range
                            </h3>
                            <div className="flex flex-col gap-3">
                                {[
                                    { label: 'All Prices', value: 'All' },
                                    { label: 'Under $50', value: 'under50' },
                                    { label: '$50 - $100', value: '50to100' },
                                    { label: 'Over $100', value: 'over100' },
                                ].map((range) => (
                                    <button
                                        key={range.value}
                                        onClick={() => setPriceRange(range.value)}
                                        className={`text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${priceRange === range.value
                                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                                : 'bg-white text-gray-500 hover:bg-gray-100'
                                            }`}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="lg:w-3/4">
                        <div className="flex justify-between items-center mb-10">
                            <p className="text-gray-500 font-medium">
                                Showing <span className="text-primary font-bold">{filteredProducts.length}</span> products
                            </p>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-20">
                                <Loader />
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-24 bg-white rounded-[2rem] shadow-sm border border-gray-100">
                                <div className="text-5xl mb-6">🔍</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-500 mb-8">Try adjusting your filters to find what you're looking for.</p>
                                <button
                                    onClick={() => { setCategory('All'); setPriceRange('All'); }}
                                    className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
