import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaLock } from 'react-icons/fa';

const AdminLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        // Simple hardcoded credentials for admin access
        if (email === 'admin@curtain.com' && password === 'curtains@Admin123') {
            localStorage.setItem('isAdminAuthenticated', 'true');
            toast.success('Admin authenticated successfully');
            // Dispatch custom event for same-tab header update
            window.dispatchEvent(new Event('adminAuthChange'));
            navigate('/admin');
        } else {
            toast.error('Invalid admin email or password');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                <div>
                    <div className="mx-auto h-16 w-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg mb-6">
                        <FaLock className="text-3xl" />
                    </div>
                    <h2 className="text-center text-3xl font-black text-gray-900 tracking-tight">
                        Admin Access
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-500">
                        Please enter your credentials to continue.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={submitHandler}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-2xl relative block w-full px-4 py-4 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm"
                                placeholder="admin@curtain.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" title="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-2xl relative block w-full px-4 py-4 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20"
                        >
                            Log In to Dashboard
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;
