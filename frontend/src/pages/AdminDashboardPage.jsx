import { Link } from 'react-router-dom';
import { FaBoxOpen, FaClipboardList, FaUsers, FaChartLine } from 'react-icons/fa';

const AdminDashboardPage = () => {
    const stats = [
        { name: 'Total Products', value: '0', icon: FaBoxOpen, color: 'bg-indigo-600' },
        { name: 'WhatsApp Inquiries', value: '4', icon: FaClipboardList, color: 'bg-emerald-600' },
        { name: 'Store Views', value: '0', icon: FaChartLine, color: 'bg-blue-600' },
        { name: 'Categories', value: '0', icon: FaUsers, color: 'bg-rose-600' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50/50 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h1>
                    <p className="mt-2 text-lg text-gray-600">Manage your premium curtain collection and track customer interest.</p>
                </div>
                <Link
                    to="/admin/productlist"
                    className="flex items-center px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all transform hover:scale-105"
                >
                    <FaBoxOpen className="mr-2" /> View Inventory
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className={`${stat.color} p-5 rounded-2xl text-white shadow-lg`}>
                            <stat.icon className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{stat.name}</p>
                            <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Product Management Card */}
                <div className="bg-white overflow-hidden shadow-sm rounded-3xl border border-gray-100 hover:shadow-2xl transition-all duration-500 group relative">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <FaBoxOpen className="text-8xl text-primary" />
                    </div>
                    <div className="p-10 relative z-10">
                        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-inner">
                            <FaBoxOpen className="text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Management</h3>
                        <p className="text-gray-500 text-lg mb-10 leading-relaxed">Add new curtains to your catalog, update prices, manage stock levels, and organize categories with ease.</p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/admin/productlist"
                                className="inline-flex items-center justify-center px-8 py-4 border border-transparent font-bold rounded-2xl text-white bg-primary hover:bg-primary-dark shadow-lg shadow-primary/30 transition-all transform hover:scale-105 active:scale-95"
                            >
                                Manage Products
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Order Management Card */}
                <div className="bg-white overflow-hidden shadow-sm rounded-3xl border border-gray-100 hover:shadow-2xl transition-all duration-500 group relative">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <FaClipboardList className="text-8xl text-emerald-600" />
                    </div>
                    <div className="p-10 relative z-10">
                        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-inner">
                            <FaClipboardList className="text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Inquiry Management</h3>
                        <p className="text-gray-500 text-lg mb-10 leading-relaxed">Track customer inquiries from WhatsApp, manage follow-ups, and view historical interest in your products.</p>
                        <button
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-emerald-600 font-bold rounded-2xl text-emerald-600 bg-white hover:bg-emerald-600 hover:text-white transition-all transform hover:scale-105 active:scale-95"
                        >
                            View Inquiries
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
