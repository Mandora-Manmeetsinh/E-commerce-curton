import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/common/ProductCard';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative min-h-[90vh] flex items-center overflow-hidden">
                {/* Background Image with Parallax-like effect */}
                <div className="absolute inset-0 z-0">
                    <img
                        className="w-full h-full object-cover scale-105 animate-slow-zoom"
                        src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=90"
                        alt="Premium Curtains"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <div className="max-w-2xl animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 drop-shadow-2xl">
                            Elevate Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-sky-300">Living Space</span>
                        </h1>

                        <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-lg drop-shadow-lg">
                            Discover the perfect blend of luxury and comfort with our handcrafted premium curtains. Tailored to your unique style.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/products">
                                <button className="group relative px-8 py-4 bg-accent hover:bg-accent/90 text-white font-bold rounded-2xl shadow-2xl shadow-accent/40 transition-all transform hover:scale-105 active:scale-95 overflow-hidden">
                                    <span className="relative z-10 flex items-center justify-center">
                                        Browse Catalog
                                        <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hidden md:block">
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
                        <div className="w-1 h-2 bg-white rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-primary font-semibold tracking-wide uppercase">About Us</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Crafting Elegance for Your Windows
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                            We specialize in providing high-quality, stylish curtains that transform your living spaces. From classic designs to modern patterns, we have something for every taste.
                        </p>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Shop by Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {['Living Room', 'Bedroom', 'Office'].map((category) => (
                        <div key={category} className="relative rounded-lg overflow-hidden group cursor-pointer h-64 shadow-lg">
                            <img
                                src={`https://source.unsplash.com/featured/?curtains,${category.replace(' ', '')}`}
                                alt={category}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-white bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                                <h3 className="text-2xl font-bold text-white tracking-wider">{category}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Products */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">Featured Products</h2>
                    <Link to="/products" className="text-primary hover:text-primary-light font-medium flex items-center">
                        View all products <span aria-hidden="true" className="ml-1">&rarr;</span>
                    </Link>
                </div>

                {loading ? (
                    <Loader />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.slice(0, 4).map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
