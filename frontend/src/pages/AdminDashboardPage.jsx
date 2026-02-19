import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminDashboardPage = () => {
    const { token, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalSalesAmount: 0,
        lowStockProducts: []
    });

    useEffect(() => {
        if (!user || user.role !== 'Admin') {
            navigate('/dashboard');
            return;
        }

        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/reports/dashboard', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (response.ok) {
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch stats');
            }
        };

        fetchStats();
    }, [user, token, navigate]);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                    <button onClick={() => navigate('/dashboard')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Back to Main Dashboard
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow border border-blue-200">
                        <h2 className="text-xl font-bold text-gray-700 mb-2">Total Sales</h2>
                        <p className="text-4xl font-bold text-blue-600">${stats.totalSalesAmount.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow border border-green-200">
                        <h2 className="text-xl font-bold text-gray-700 mb-2">Total Products</h2>
                        <p className="text-4xl font-bold text-green-600">{stats.totalProducts}</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 border border-red-200">
                    <h2 className="text-2xl font-bold text-red-700 mb-4">Low Stock Alerts (Less than 5)</h2>
                    {stats.lowStockProducts.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr className="bg-red-50 text-red-800 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">Product Name</th>
                                        <th className="py-3 px-6 text-center">Current Quantity</th>
                                        <th className="py-3 px-6 text-center">Price</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {stats.lowStockProducts.map((product) => (
                                        <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left font-medium">{product.name}</td>
                                            <td className="py-3 px-6 text-center font-bold text-red-600">{product.quantity}</td>
                                            <td className="py-3 px-6 text-center">${product.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-600">All stock levels are healthy.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
