import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowRight } from 'react-icons/fa';
import CartContext from '../context/CartContext';
import Button from '../components/common/Button';

const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate('/login?redirect=/checkout');
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="bg-white p-12 rounded-lg shadow-sm text-center">
                        <div className="mb-6">
                            <svg className="mx-auto h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-6">Looks like you haven't added any curtains to your cart yet.</p>
                        <Link to="/products">
                            <Button variant="primary" className="inline-flex items-center">
                                Start Shopping <FaArrowRight className="ml-2" />
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                        <div className="lg:col-span-8">
                            <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden border border-gray-200">
                                <ul className="divide-y divide-gray-200">
                                    {cartItems.map((item) => (
                                        <li key={item._id} className="flex py-6 px-4 sm:px-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32 border border-gray-200"
                                                />
                                            </div>

                                            <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h4 className="text-lg font-medium text-gray-900">
                                                            <Link to={`/product/${item._id}`} className="hover:text-primary transition-colors">
                                                                {item.name}
                                                            </Link>
                                                        </h4>
                                                        <p className="ml-4 text-lg font-medium text-gray-900">${item.price}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                                </div>

                                                <div className="mt-4 flex-1 flex items-end justify-between">
                                                    <div className="flex items-center">
                                                        <label htmlFor={`quantity-${item._id}`} className="sr-only">Quantity</label>
                                                        <select
                                                            id={`quantity-${item._id}`}
                                                            value={item.qty}
                                                            onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                                                            className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                                                        >
                                                            {[...Array(Math.min(item.countInStock, 10)).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="ml-4">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeFromCart(item._id)}
                                                            className="text-sm font-medium text-red-600 hover:text-red-500 flex items-center transition-colors"
                                                        >
                                                            <FaTrash className="mr-1" /> Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="lg:col-span-4 mt-8 lg:mt-0">
                            <div className="bg-white shadow-sm sm:rounded-lg p-6 border border-gray-200 sticky top-24">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                                <div className="flow-root">
                                    <dl className="-my-4 text-sm divide-y divide-gray-200">
                                        <div className="py-4 flex items-center justify-between">
                                            <dt className="text-gray-600">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</dt>
                                            <dd className="font-medium text-gray-900">
                                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                                            </dd>
                                        </div>
                                        <div className="py-4 flex items-center justify-between">
                                            <dt className="text-gray-600">Shipping</dt>
                                            <dd className="font-medium text-gray-900">Calculated at checkout</dd>
                                        </div>
                                        <div className="py-4 flex items-center justify-between border-t border-gray-200">
                                            <dt className="text-base font-bold text-gray-900">Total</dt>
                                            <dd className="text-base font-bold text-primary">
                                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="mt-6">
                                    <Button
                                        onClick={checkoutHandler}
                                        variant="primary"
                                        className="w-full py-3 text-lg shadow-md hover:shadow-lg"
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </div>
                                <div className="mt-4 text-center">
                                    <Link to="/products" className="text-sm font-medium text-primary hover:text-indigo-500">
                                        or Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
