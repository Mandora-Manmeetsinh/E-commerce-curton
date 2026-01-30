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

            {/* Featured Collections */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-3">Curated Selection</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Featured Collections</h3>
                        <div className="w-20 h-1.5 bg-accent mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Velvet Luxury', image: 'https://images.unsplash.com/photo-1574739782594-db4ead022697?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', count: '12 Products' },
                            { title: 'Linen Minimalist', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', count: '8 Products' },
                            { title: 'Sheer Elegance', image: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', count: '15 Products' },
                        ].map((collection, idx) => (
                            <div key={idx} className="group relative h-[450px] rounded-3xl overflow-hidden shadow-2xl transition-all hover:-translate-y-2">
                                <img src={collection.image} alt={collection.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">{collection.count}</p>
                                    <h4 className="text-2xl font-bold text-white mb-4">{collection.title}</h4>
                                    <button className="px-6 py-2 bg-white/10 hover:bg-white text-white hover:text-primary font-bold rounded-xl border border-white/30 backdrop-blur-md transition-all text-sm">
                                        Explore More
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="py-24 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 relative">
                            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Our Craftsmanship" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10"></div>
                            <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary/5 rounded-full blur-2xl -z-10"></div>

                            {/* Experience Badge */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl z-20 border border-gray-100">
                                <p className="text-4xl font-black text-primary">25+</p>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Years of Excellence</p>
                            </div>
                        </div>

                        <div className="lg:w-1/2">
                            <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-3">Our Story</h2>
                            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">Crafting Elegance for Your Windows</h3>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                At Curtain, we believe that every window tells a story. Our journey began with a simple passion for textiles and a vision to transform houses into homes through the art of drapery.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                                {[
                                    { title: 'Premium Fabrics', desc: 'Sourced from the finest mills globally.' },
                                    { title: 'Custom Tailoring', desc: 'Precision crafted to your measurements.' },
                                    { title: 'Expert Design', desc: 'Consultations to match your interior.' },
                                    { title: 'Fast Delivery', desc: 'Seamless experience from order to install.' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                                            <div className="w-2 h-2 rounded-full bg-accent"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{item.title}</h4>
                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="px-10 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl shadow-xl shadow-primary/20 transition-all transform hover:scale-105 active:scale-95">
                                Learn More About Us
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-primary rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
                            <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Why Choose Curtain?</h3>
                            <p className="text-gray-300 text-lg">We combine traditional craftsmanship with modern design to deliver unparalleled quality.</p>
                        </div>

                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                                { title: 'Unmatched Quality', icon: '💎', desc: 'We use only the highest grade materials for durability and luxury.' },
                                { title: 'Personalized Service', icon: '🤝', desc: 'Our designers work closely with you to bring your vision to life.' },
                                { title: 'Global Inspiration', icon: '🌍', desc: 'Designs inspired by the latest international interior trends.' },
                            ].map((item, idx) => (
                                <div key={idx} className="text-center group">
                                    <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-4xl mb-6 mx-auto backdrop-blur-md border border-white/10 transition-transform group-hover:scale-110 group-hover:rotate-3">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-4">{item.title}</h4>
                                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-3">Shop Now</h2>
                            <h3 className="text-4xl font-black text-gray-900">Featured Products</h3>
                        </div>
                        <Link to="/products" className="group flex items-center text-primary font-bold hover:text-accent transition-colors">
                            View all products
                            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.slice(0, 4).map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
