import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api, { BASE_URL } from '../utils/api';
import { FaArrowLeft, FaWhatsapp } from 'react-icons/fa';
import Rating from '../components/common/Rating';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const whatsappNumber = '1234567890'; // Replace with actual number

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
                toast.error('Failed to load product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const whatsappHandler = () => {
        const message = `Hello, I am interested in this product: ${product.name}\nPrice: $${product.price}\nLink: ${window.location.href}`;
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    };

    if (loading) {
        return <Loader />;
    }

    if (!product) {
        return <div className="text-center py-10 text-red-500">Product not found</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-primary mb-6 transition-colors">
                    <FaArrowLeft className="mr-2" /> Back to products
                </button>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
                        {/* Image gallery */}
                        <div className="p-8 bg-gray-100 flex items-center justify-center">
                            <div className="w-full max-w-md aspect-w-1 aspect-h-1 rounded-lg overflow-hidden shadow-lg">
                                <img
                                    src={product.image.startsWith('http') ? product.image : `${BASE_URL}${product.image}`}
                                    alt={product.name}
                                    className="w-full h-full object-center object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>

                        {/* Product info */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-4">{product.name}</h1>

                            <div className="mb-6">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl text-primary font-bold">${product.price}</p>
                            </div>

                            {/* Reviews */}
                            <div className="mb-6">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="sr-only">Description</h3>
                                <div className="text-base text-gray-700 space-y-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }} />
                            </div>

                            <div className="mb-8">
                                <div className="flex items-center space-x-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${product.countInStock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-auto pt-6 border-t border-gray-200">
                                <Button
                                    onClick={whatsappHandler}
                                    variant="primary"
                                    className="w-full py-4 text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all bg-green-500 hover:bg-green-600 border-transparent flex items-center justify-center"
                                >
                                    <FaWhatsapp className="mr-2 text-2xl" /> Inquire on WhatsApp
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
