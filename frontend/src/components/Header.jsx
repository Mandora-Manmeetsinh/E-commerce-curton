import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            setIsAdmin(localStorage.getItem('isAdminAuthenticated') === 'true');
        };
        checkAuth();
        // Listen for storage changes to update UI across tabs
        window.addEventListener('storage', checkAuth);
        // Custom event for same-tab updates
        window.addEventListener('adminAuthChange', checkAuth);
        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('adminAuthChange', checkAuth);
        };
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('isAdminAuthenticated');
        setIsAdmin(false);
        navigate('/');
        setIsOpen(false);
        window.dispatchEvent(new Event('adminAuthChange'));
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-primary-light transition-colors">C</div>
                            <span className="font-bold text-2xl text-gray-900 tracking-tight group-hover:text-primary transition-colors">Curtain</span>
                        </Link>
                        <div className="hidden md:ml-10 md:flex md:space-x-8">
                            <Link to="/" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Home
                            </Link>
                            <Link to="/products" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Shop
                            </Link>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        {isAdmin ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/admin" className="text-sm font-medium text-gray-500 hover:text-primary transition-colors">
                                    Dashboard
                                </Link>
                                <button
                                    onClick={logoutHandler}
                                    className="flex items-center text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <FaSignOutAlt className="mr-1" /> Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/admin" className="text-sm font-medium text-gray-500 hover:text-primary transition-colors">
                                Admin
                            </Link>
                        )}
                    </div>

                    <div className="-mr-2 flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                        >
                            {isOpen ? <FaTimes className="block h-6 w-6" /> : <FaBars className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
                    <div className="pt-2 pb-3 space-y-1 px-2">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link to="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>Shop</Link>
                        {isAdmin ? (
                            <>
                                <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>Dashboard</Link>
                                <button onClick={logoutHandler} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">Logout</button>
                            </>
                        ) : (
                            <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50" onClick={() => setIsOpen(false)}>Admin</Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
