import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure, addProductSuccess, deleteProductSuccess, updateProductSuccess } from '../redux/productSlice';
import { useNavigate } from 'react-router-dom';
import ProductTable from '../components/ProductTable';

const API_URL = import.meta.env.VITE_API_URL;

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
                const response = await fetch(`${API_URL}/api/products`);
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
            const response = await fetch(`${API_URL}/api/products`, {
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
                toast.success('Product added successfully');
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error('Failed to add product');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const response = await fetch(`${API_URL}/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                dispatch(deleteProductSuccess(id));
                toast.success('Product deleted successfully');
            } else {
                toast.error('Failed to delete product');
            }
        } catch (err) {
            toast.error('Error deleting product');
        }
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/products/${editingProduct._id}`, {
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
                toast.success('Product updated successfully');
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error('Failed to update product');
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
                <ProductTable
                    products={products}
                    onEdit={setEditingProduct}
                    onDelete={handleDeleteProduct}
                />
            </div>
        </div>
    );
};

export default InventoryPage;
