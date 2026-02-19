import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from '../redux/productSlice';
import { addSaleSuccess } from '../redux/saleSlice';
import { useNavigate } from 'react-router-dom';
import SalesForm from '../components/SalesForm';

const SalesPage = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch(fetchProductsStart());
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                dispatch(fetchProductsSuccess(data));
            } catch (err) {
                dispatch(fetchProductsFailure('Failed to fetch products'));
            }
        };
        fetchProducts();
    }, [dispatch]);

    const handleAddToCart = (product) => {
        const existingItem = cart.find(item => item.productId === product.productId);
        if (existingItem) {
            if (existingItem.quantity + product.quantity > product.stock) {
                toast.error('Insufficient stock');
                return;
            }
            setCart(cart.map(item => item.productId === product.productId ? { ...item, quantity: item.quantity + product.quantity } : item));
        } else {
            setCart([...cart, product]);
        }
    };

    const handleCheckout = async () => {
        if (cart.length === 0 || !customerName || !customerPhone) {
            toast.error('Please fill in customer details and add items to cart.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/sales', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ customerName, customerPhone, items: cart }),
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(addSaleSuccess(data));
                setCart([]);
                setCustomerName('');
                setCustomerPhone('');
                toast.success('Sale completed successfully!');
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error('Checkout failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">New Sale</h1>
                    <button onClick={() => navigate('/dashboard')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Back to Dashboard
                    </button>
                </div>

                <div className="flex gap-6 mb-6">
                    <div className="w-1/2">
                        <div className="bg-white p-6 rounded shadow-md">
                            <h2 className="text-xl font-bold mb-4">Customer Details</h2>
                            <input
                                type="text"
                                placeholder="Customer Name"
                                className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Customer Phone"
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <SalesForm products={products} onAddItem={handleAddToCart} />
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-4">Cart</h2>
                    <table className="min-w-full bg-white border border-gray-300 mb-4">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Product</th>
                                <th className="py-3 px-6 text-center">Price</th>
                                <th className="py-3 px-6 text-center">Quantity</th>
                                <th className="py-3 px-6 text-center">Total</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {cart.map((item, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{item.name}</td>
                                    <td className="py-3 px-6 text-center">${item.price}</td>
                                    <td className="py-3 px-6 text-center">{item.quantity}</td>
                                    <td className="py-3 px-6 text-center">${item.price * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-right">
                        <h3 className="text-xl font-bold mb-4">Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
                        <button onClick={handleCheckout} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded text-lg">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesPage;
