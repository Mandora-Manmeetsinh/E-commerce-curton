import { Link } from 'react-router-dom';
import { FaStar, FaWhatsapp, FaEye } from 'react-icons/fa';
import { BASE_URL } from '../utils/api';

const ProductCard = ({ product }) => {
    return (
        <div className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden">
                <Link to={`/product/${product._id}`}>
                    <img
                        src={product.image.startsWith('http') ? product.image : `${BASE_URL}${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.countInStock > 0 ? (
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-bold text-primary uppercase tracking-widest rounded-full shadow-sm">
                            In Stock
                        </span>
                    ) : (
                        <span className="px-3 py-1 bg-red-500/90 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest rounded-full shadow-sm">
                            Out of Stock
                        </span>
                    )}
                </div>

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Link to={`/product/${product._id}`} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-xl">
                        <FaEye />
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-2">
                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">{product.category}</p>
                    <Link to={`/product/${product._id}`}>
                        <h3 className="text-lg font-bold text-gray-900 hover:text-primary transition-colors line-clamp-1">
                            {product.name}
                        </h3>
                    </Link>
                </div>

                <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 text-xs">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                className={i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-200'}
                            />
                        ))}
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 ml-2 uppercase tracking-tighter">
                        {product.numReviews} Reviews
                    </span>
                </div>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-medium">Starting from</span>
                        <span className="text-2xl font-black text-primary">${product.price}</span>
                    </div>
                    <Link
                        to={`/product/${product._id}`}
                        className="w-10 h-10 bg-gray-50 hover:bg-primary hover:text-white rounded-xl flex items-center justify-center text-primary transition-all shadow-sm"
                    >
                        <FaWhatsapp className="text-lg" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
