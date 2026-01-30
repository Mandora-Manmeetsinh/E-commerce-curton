import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/api';

const ProductCard = ({ product }) => {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:border-gray-200">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                <Link to={`/product/${product._id}`}>
                    <img
                        src={product.image.startsWith('http') ? product.image : `${BASE_URL}${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </Link>

                {/* Status Badge */}
                {!product.countInStock && (
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-gray-900 text-[10px] font-bold text-white uppercase tracking-widest rounded-lg">
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1.5">{product.category}</p>
                    <Link to={`/product/${product._id}`}>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                            {product.name}
                        </h3>
                    </Link>
                </div>

                <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900 tracking-tight">${product.price}</span>
                    <Link
                        to={`/product/${product._id}`}
                        className="px-5 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
