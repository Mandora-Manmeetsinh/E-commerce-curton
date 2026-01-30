import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/common/Loader';

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
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative min-h-[85vh] flex items-center overflow-hidden bg-gray-900">
                <div className="absolute inset-0 z-0">
                    <img
                        className="w-full h-full object-cover opacity-60"
                        src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=90"
                        alt="Premium Curtains"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <div className="max-w-xl">
                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
                            Elevate Your <span className="text-blue-400">Windows</span>
                        </h1>
                        <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-lg">
                            Handcrafted premium curtains designed for modern living. Quality you can feel, elegance you can see.
                        </p>
                        <Link to="/products">
                            <button className="px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-xl transition-all shadow-lg">
                                Browse Collection
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Featured Collections */}
            <section className="py-24 bg-white border-b border-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Curated Selection</h2>
                        <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Featured Collections</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Velvet Luxury', image: 'https://images.unsplash.com/photo-1574739782594-db4ead022697?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', desc: 'Premium Selection' },
                            { title: 'Linen Minimalist', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', desc: 'Modern Textures' },
                            { title: 'Sheer Elegance', image: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', desc: 'Light & Airy' },
                        ].map((collection, idx) => (
                            <div key={idx} className="group relative h-[500px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                                <img src={collection.image} alt={collection.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">{collection.desc}</p>
                                    <h4 className="text-2xl font-bold text-white mb-6 tracking-tight">{collection.title}</h4>
                                    <Link to="/products">
                                        <button className="px-6 py-2.5 bg-white hover:bg-blue-600 hover:text-white text-gray-900 font-bold rounded-lg transition-all text-sm">
                                            View Range
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest Arrivals */}
            <section className="py-24 bg-white border-b border-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Newest Arrivals</h2>
                            <div className="w-12 h-1.5 bg-blue-600 mt-4 rounded-full"></div>
                        </div>
                        <Link to="/products" className="text-blue-600 font-bold text-sm hover:underline">
                            See all products
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.slice(0, 4).map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-24 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="lg:w-1/2 relative">
                            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Our Craftsmanship" className="w-full aspect-square object-cover" />
                            </div>

                            {/* Experience Badge */}
                            <div className="absolute -bottom-8 -left-8 bg-black p-8 rounded-2xl shadow-2xl z-20">
                                <p className="text-4xl font-black text-white">Est.</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Excellence</p>
                            </div>
                        </div>

                        <div className="lg:w-1/2">
                            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">The Studio</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">Timeless Design for Every Home</h3>
                            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                                We specialize in high-end curtain solutions that combine functional excellence with aesthetic perfection. Every stitch is a commitment to quality.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                                {[
                                    { title: 'Elite Sourcing', desc: 'Finest textiles from global mills.' },
                                    { title: 'Hand-Finished', desc: 'Precision checked for perfection.' },
                                ].map((item, idx) => (
                                    <div key={idx}>
                                        <h4 className="font-bold text-gray-900 mb-2 truncate">{item.title}</h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <Link to="/products">
                                <button className="px-10 py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-xl shadow-sm transition-all shadow-gray-200">
                                    Browse Studio
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">The Curtain Standard</h3>
                        <p className="text-gray-500 text-lg">Quality, service, and vision in every project.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: 'Elite Quality', icon: '✨', desc: 'Highest grade textiles for a luxury finish.' },
                            { title: 'Expert Vision', icon: '📐', desc: 'Tailored fit and design for your space.' },
                            { title: 'Global Reach', icon: '🌉', desc: 'Inspired by latest international design trends.' },
                        ].map((item, idx) => (
                            <div key={idx} className="text-center p-10 rounded-3xl border border-transparent hover:border-gray-100 hover:bg-gray-50/50 transition-all duration-300">
                                <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl mb-8 mx-auto grayscale group-hover:grayscale-0 transition-all">
                                    {item.icon}
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h4>
                                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
