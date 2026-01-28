import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { BASE_URL } from '../utils/api';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <Link to={`/product/${product._id}`}>
                <img
                    src={product.image.startsWith('http') ? product.image : `${BASE_URL}${product.image}`}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
            </Link>
            <div className="p-4">
                <Link to={`/product/${product._id}`}>
                    <h3 className="text-lg font-medium text-gray-900 hover:text-primary truncate">
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-center mt-2 mb-4">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                className={i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">({product.numReviews} reviews)</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    <Link
                        to={`/product/${product._id}`}
                        className="text-primary hover:text-indigo-700 font-medium text-sm"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
