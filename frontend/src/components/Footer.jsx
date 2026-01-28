const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white border-t border-gray-800 mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <span className="font-bold text-2xl text-white tracking-tight">Curton</span>
                        <p className="mt-4 text-gray-400 text-sm">
                            Premium curtains and home decor for the modern lifestyle. Elevate your space with our curated collection.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-m font-bold text-white-900 tracking-wider uppercase">Shop</h3>
                        <ul className="mt-4 space-y-4">
                            <li><a href="/products" className="text-base text-gray-400 hover:text-white transition-colors">All Products</a></li>
                            <li><a href="#" className="text-base text-gray-400 hover:text-white transition-colors">New Arrivals</a></li>
                            <li><a href="#" className="text-base text-gray-400 hover:text-white transition-colors">Best Sellers</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-m font-bold text-white-900 tracking-wider uppercase">Support</h3>
                        <ul className="mt-4 space-y-4">
                            <li><a href="#" className="text-base text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                            <li><a href="#" className="text-base text-gray-400 hover:text-white transition-colors">FAQs</a></li>
                            <li><a href="#" className="text-base text-gray-400 hover:text-white transition-colors">Shipping & Returns</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-m font-bold text-white-900 tracking-wider uppercase">Stay Connected</h3>
                        <p className="mt-4 text-gray-400 text-sm">
                            Subscribe to our newsletter for exclusive offers and updates.
                        </p>
                        <div className="mt-4 flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 min-w-0 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-transparent rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-800 pt-8 md:flex md:items-center md:justify-between">
                    <p className="text-base text-gray-400">
                        &copy; {new Date().getFullYear()} Curton. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
