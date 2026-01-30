import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';
import Button from '../components/common/Button';

const CheckoutPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('CashOnDelivery');

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const orderData = {
                orderItems: cartItems,
                shippingAddress: { address, city, postalCode, country },
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            };

            await api.post('/orders', orderData);

            clearCart();
            localStorage.removeItem('cartItems');
            toast.success('Order Placed Successfully!');
            navigate('/profile');
        } catch (error) {
            console.error(error);
            toast.error('Error placing order');
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="bg-white shadow-sm px-4 py-5 sm:rounded-lg sm:p-6 border border-gray-200">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 border-b border-gray-100 pb-4 mb-4">Shipping Address</h3>
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                    <input type="text" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                    <input type="text" required value={country} onChange={(e) => setCountry(e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow-sm px-4 py-5 sm:rounded-lg sm:p-6 border border-gray-200">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 border-b border-gray-100 pb-4 mb-4">Payment Method</h3>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input id="cod" name="paymentMethod" type="radio" checked={paymentMethod === 'CashOnDelivery'} onChange={() => setPaymentMethod('CashOnDelivery')} className="focus:ring-primary h-4 w-4 text-primary border-gray-300 cursor-pointer" />
                                    <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">Cash on Delivery</label>
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full py-3 text-lg shadow-md hover:shadow-lg"
                        >
                            Place Order
                        </Button>
                    </form>

                    <div className="mt-8 lg:mt-0 bg-white shadow-sm sm:rounded-lg p-6 border border-gray-200 sticky top-24">
                        <h2 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-100 pb-4">Order Summary</h2>
                        <dl className="space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Items</dt>
                                <dd className="text-sm font-medium text-gray-900">${itemsPrice.toFixed(2)}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Shipping</dt>
                                <dd className="text-sm font-medium text-gray-900">${shippingPrice}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Tax</dt>
                                <dd className="text-sm font-medium text-gray-900">${taxPrice}</dd>
                            </div>
                            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <dt className="text-base font-bold text-gray-900">Total</dt>
                                <dd className="text-base font-bold text-primary">${totalPrice}</dd>
                            </div>
                        </dl>
                        <div className="mt-6">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Items in your cart</h4>
                            <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                                {cartItems.map((item) => (
                                    <li key={item._id} className="py-2 flex items-center">
                                        <img src={item.image} alt={item.name} className="h-10 w-10 rounded-md object-cover mr-3" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                            <p className="text-xs text-gray-500">{item.qty} x ${item.price}</p>
                                        </div>
                                        <div className="text-sm font-medium text-gray-900">${(item.qty * item.price).toFixed(2)}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
