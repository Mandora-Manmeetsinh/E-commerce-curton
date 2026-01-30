import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaClipboardList, FaChartLine, FaEye, FaPlus, FaArrowRight } from 'react-icons/fa';
import api from '../utils/api';
import Loader from '../components/common/Loader';

const AdminDashboardPage = () => {
    const [productCount, setProductCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data: products } = await api.get('/products');
                setProductCount(products.length);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const stats = [
        { label: 'Total Products', value: productCount, icon: <FaBox />, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Recent Orders', value: '0', icon: <FaClipboardList />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Total Views', value: '0', icon: <FaEye />, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Growth', value: '0%', icon: <FaChartLine />, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    return (
        <div className="bg-gray-50/50 min-h-screen">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 pt-12 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-1">Store Overview</h1>
                            <p className="text-gray-500 font-medium">Manage your products and monitor store performance.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link to="/admin/productlist">
                                <button className="px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl border border-gray-200 transition-all text-sm flex items-center gap-2">
                                    <FaBox className="text-xs" /> Inventory
                                </button>
                            </Link>
                            <Link to="/admin/productlist">
                                <button className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl shadow-sm transition-all text-sm flex items-center gap-2">
                                    <FaPlus className="text-xs" /> Add Product
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {loading ? (
                        [...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm animate-pulse">
                                <div className="w-12 h-12 bg-gray-100 rounded-xl mb-4"></div>
                                <div className="h-4 w-24 bg-gray-100 rounded mb-2"></div>
                                <div className="h-8 w-12 bg-gray-50 rounded"></div>
                            </div>
                        ))
                    ) : (
                        stats.map((stat, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:scale-105 transition-transform`}>
                                    {stat.icon}
                                </div>
                                <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">{stat.label}</h3>
                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                            <button className="text-gray-400 hover:text-gray-900 font-bold text-sm transition-colors flex items-center gap-1">
                                View Details <FaArrowRight className="text-[10px]" />
                            </button>
                        </div>
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                <FaClipboardList className="text-2xl" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">No Recent Activity</h3>
                            <p className="text-gray-500 text-sm">When your customers interact with your store, it will appear here.</p>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold mb-8">Management</h2>
                            <div className="space-y-3">
                                {[
                                    { label: 'Products', link: '/admin/productlist', icon: <FaBox /> },
                                    { label: 'Orders', link: '/admin/productlist', icon: <FaClipboardList /> },
                                    { label: 'Analytics', link: '/admin', icon: <FaChartLine /> },
                                ].map((item, idx) => (
                                    <Link key={idx} to={item.link} className="block group">
                                        <div className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-gray-400 group-hover:text-white transition-colors">{item.icon}</span>
                                                <span className="font-bold text-sm">{item.label}</span>
                                            </div>
                                            <FaArrowRight className="text-[10px] text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
