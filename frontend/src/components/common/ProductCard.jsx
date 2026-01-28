import React from 'react';
import Button from './Button';
import { FaWhatsapp } from 'react-icons/fa';

const ProductCard = ({ product }) => {
    const whatsappNumber = '1234567890'; // Replace with actual number or env variable
    const message = `Hello, I am interested in this product: ${product.name}`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full border border-gray-100 overflow-hidden">
            <div className="h-64 overflow-hidden relative group bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="mb-2">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{product.category}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                </h3>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                    <span className="text-xl font-bold text-primary">${product.price}</span>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-block">
                        <Button
                            variant="primary"
                            className="text-sm px-4 py-2 flex items-center bg-green-500 hover:bg-green-600 border-transparent"
                        >
                            <FaWhatsapp className="mr-2 text-lg" /> Inquire
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
