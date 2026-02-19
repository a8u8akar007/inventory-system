import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure, addProductSuccess, deleteProductSuccess, updateProductSuccess } from '../redux/productSlice';
import { useNavigate } from 'react-router-dom';

const InventoryPage = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const { token, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', quantity: '' });
    const [editingProduct, setEditingProduct] = useState(null);

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

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newProduct),
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(addProductSuccess(data));
                setNewProduct({ name: '', category: '', price: '', quantity: '' });
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Failed to add product');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                dispatch(deleteProductSuccess(id));
            } else {
                alert('Failed to delete product');
            }
        } catch (err) {
            alert('Error deleting product');
        }
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/products/${editingProduct._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editingProduct),
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(updateProductSuccess(data));
                setEditingProduct(null);
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert('Failed to update product');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
                    <button onClick={() => navigate('/dashboard')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Back to Dashboard
                    </button>
                </div>

                {/* Add Product Form */}
                <div className="mb-8 p-4 bg-gray-50 rounded border">
                    <h2 className="text-xl font-bold mb-4">Add New Product</h2>
                    <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            className="p-2 border rounded"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            className="p-2 border rounded"
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            className="p-2 border rounded"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            className="p-2 border rounded"
                            value={newProduct.quantity}
                            onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                            required
                        />
                        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Add Product
                        </button>
                    </form>
                </div>

                {/* Edit Product Modal/Form (Inline for simplicity) */}
                {editingProduct && (
                    <div className="mb-8 p-4 bg-yellow-50 rounded border">
                        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                        <form onSubmit={handleUpdateProduct} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <input
                                type="text"
                                className="p-2 border rounded"
                                value={editingProduct.name}
                                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                className="p-2 border rounded"
                                value={editingProduct.category}
                                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                                required
                            />
                            <input
                                type="number"
                                className="p-2 border rounded"
                                value={editingProduct.price}
                                onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                required
                            />
                            <input
                                type="number"
                                className="p-2 border rounded"
                                value={editingProduct.quantity}
                                onChange={(e) => setEditingProduct({ ...editingProduct, quantity: e.target.value })}
                                required
                            />
                            <div className="flex gap-2">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-1">
                                    Update
                                </button>
                                <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex-1">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Product List */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Category</th>
                                <th className="py-3 px-6 text-center">Price</th>
                                <th className="py-3 px-6 text-center">Quantity</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {products.map((product) => (
                                <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{product.name}</td>
                                    <td className="py-3 px-6 text-left">{product.category}</td>
                                    <td className="py-3 px-6 text-center">${product.price}</td>
                                    <td className="py-3 px-6 text-center">{product.quantity}</td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center">
                                            <button onClick={() => setEditingProduct(product)} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => handleDeleteProduct(product._id)} className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {products.length === 0 && <p className="text-center py-4">No products found.</p>}
                </div>
            </div>
        </div>
    );
};

export default InventoryPage;
