import { Link } from 'react-router-dom';
import { FaBox, FaClipboardList, FaChartLine, FaEye, FaPlus, FaArrowRight } from 'react-icons/fa';

const AdminDashboardPage = () => {
    const stats = [
        { label: 'Total Products', value: '48', icon: <FaBox />, color: 'bg-blue-500', trend: '+12% this month' },
        { label: 'Inquiry Management', value: '156', icon: <FaClipboardList />, color: 'bg-emerald-500', trend: '+5% this week' },
        { label: 'Store Views', value: '2.4k', icon: <FaEye />, color: 'bg-purple-500', trend: '+18% today' },
        { label: 'Categories', value: '8', icon: <FaChartLine />, color: 'bg-amber-500', trend: 'Stable' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Admin Header */}
            <div className="bg-primary pt-16 pb-32 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Admin Dashboard</h1>
                            <p className="text-gray-400 font-medium">Welcome back! Here's what's happening with your store today.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/admin/productlist">
                                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 backdrop-blur-md transition-all flex items-center gap-2">
                                    <FaBox className="text-sm" /> View Inventory
                                </button>
                            </Link>
                            <Link to="/admin/productlist">
                                <button className="px-6 py-3 bg-accent hover:bg-accent/90 text-white font-bold rounded-2xl shadow-lg shadow-accent/20 transition-all flex items-center gap-2">
                                    <FaPlus className="text-sm" /> Add Product
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 group hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-${stat.color.split('-')[1]}-200 group-hover:scale-110 transition-transform`}>
                                    {stat.icon}
                                </div>
                                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-widest">
                                    {stat.trend}
                                </span>
                            </div>
                            <h3 className="text-gray-500 font-bold text-sm uppercase tracking-widest mb-1">{stat.label}</h3>
                            <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions & Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 mb-20">
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-2xl font-black text-gray-900">Recent Inquiries</h2>
                            <button className="text-accent font-bold text-sm hover:underline flex items-center gap-1">
                                View All <FaArrowRight className="text-xs" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {[
                                { name: 'John Doe', product: 'Velvet Luxury Blue', time: '2 hours ago', status: 'Pending' },
                                { name: 'Sarah Smith', product: 'Linen Minimalist White', time: '5 hours ago', status: 'Replied' },
                                { name: 'Mike Johnson', product: 'Sheer Elegance Grey', time: '1 day ago', status: 'Pending' },
                            ].map((inquiry, idx) => (
                                <div key={idx} className="flex items-center justify-between p-6 rounded-3xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-bold">
                                            {inquiry.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{inquiry.name}</h4>
                                            <p className="text-sm text-gray-500">Interested in: <span className="font-medium text-gray-700">{inquiry.product}</span></p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{inquiry.time}</p>
                                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${inquiry.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                                            }`}>
                                            {inquiry.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-primary rounded-[2.5rem] p-10 shadow-xl shadow-primary/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <h2 className="text-2xl font-black text-white mb-8 relative z-10">Quick Actions</h2>
                        <div className="space-y-4 relative z-10">
                            {[
                                { label: 'Manage Products', link: '/admin/productlist', icon: <FaBox /> },
                                { label: 'Inquiry Management', link: '/admin', icon: <FaClipboardList /> },
                                { label: 'Store Settings', link: '/admin', icon: <FaChartLine /> },
                            ].map((action, idx) => (
                                <Link key={idx} to={action.link} className="block">
                                    <button className="w-full p-6 bg-white/10 hover:bg-white/20 text-white rounded-3xl border border-white/10 transition-all flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <span className="text-accent">{action.icon}</span>
                                            <span className="font-bold">{action.label}</span>
                                        </div>
                                        <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
