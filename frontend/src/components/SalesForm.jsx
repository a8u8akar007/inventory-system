import React, { useState, useEffect } from 'react';

const SalesForm = ({ products, onAddItem }) => {
    const [selectedProductId, setSelectedProductId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState('');

    const selectedProduct = products.find(p => p._id === selectedProductId);

    useEffect(() => {
        if (selectedProduct) {
            setTotalPrice(selectedProduct.price * quantity);
            if (quantity > selectedProduct.quantity) {
                setError('Insufficient Stock');
            } else {
                setError('');
            }
        } else {
            setTotalPrice(0);
            setError('');
        }
    }, [selectedProduct, quantity]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedProduct && !error && quantity > 0) {
            onAddItem({
                productId: selectedProduct._id,
                name: selectedProduct.name,
                price: selectedProduct.price,
                stock: selectedProduct.quantity,
                quantity: parseInt(quantity)
            });
            setQuantity(1);
            setSelectedProductId('');
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">Add Product to Sale</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Product</label>
                    <select
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedProductId}
                        onChange={(e) => setSelectedProductId(e.target.value)}
                        required
                    >
                        <option value="">Select a Product</option>
                        {products.map((product) => (
                            <option key={product._id} value={product._id}>
                                {product.name} (Stock: {product.quantity}) - ${product.price}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
                    <input
                        type="number"
                        min="1"
                        className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                    {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
                </div>

                {selectedProduct && (
                    <div className="bg-gray-100 p-3 rounded">
                        <p className="text-gray-700">Unit Price: <span className="font-bold">${selectedProduct.price}</span></p>
                        <p className="text-gray-900 text-lg">Total Price: <span className="font-bold text-green-600">${totalPrice.toFixed(2)}</span></p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!selectedProductId || !!error || quantity <= 0}
                    className={`w-full font-bold py-2 px-4 rounded ${!selectedProductId || !!error || quantity <= 0
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-700 text-white'
                        }`}
                >
                    Add to Cart
                </button>
            </form>
        </div>
    );
};

export default SalesForm;
