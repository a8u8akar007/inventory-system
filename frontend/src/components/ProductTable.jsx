import React, { useState } from 'react';

const ProductTable = ({ products, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="overflow-x-auto">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-3 px-6 text-left uppercase text-sm font-semibold">Name</th>
                        <th className="py-3 px-6 text-left uppercase text-sm font-semibold">Category</th>
                        <th className="py-3 px-6 text-center uppercase text-sm font-semibold">Price</th>
                        <th className="py-3 px-6 text-center uppercase text-sm font-semibold">Quantity</th>
                        <th className="py-3 px-6 text-center uppercase text-sm font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 text-sm font-light">
                    {filteredProducts.map((product) => (
                        <tr
                            key={product._id}
                            className={`border-b border-gray-200 transition duration-200 ${product.quantity < 10 ? 'bg-red-100 hover:bg-red-200' : 'hover:bg-gray-100'
                                }`}
                        >
                            <td className="py-3 px-6 text-left whitespace-nowrap font-medium text-gray-900">
                                {product.name}
                            </td>
                            <td className="py-3 px-6 text-left">{product.category}</td>
                            <td className="py-3 px-6 text-center text-green-600 font-bold">
                                ${product.price}
                            </td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-lg font-bold">{product.quantity}</span>
                                    {product.quantity < 10 && (
                                        <span className="mt-1 bg-red-500 text-white py-1 px-2 rounded-full text-xs font-bold uppercase tracking-wide">
                                            Low Stock
                                        </span>
                                    )}
                                </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex item-center justify-center space-x-2">
                                    <button
                                        onClick={() => onEdit(product)}
                                        className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-800 flex items-center justify-center transition"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => onDelete(product._id)}
                                        className="w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 flex items-center justify-center transition"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredProducts.length === 0 && (
                <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-b-lg border-t border-gray-200">
                    No products found matching your search.
                </div>
            )}
        </div>
    );
};

export default ProductTable;
