import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                    <p className="text-lg text-gray-700">
                        Welcome back, <span className="font-bold">{user?.name}</span>!
                    </p>
                    <p className="text-gray-600">Role: {user?.role}</p>
                    <p className="text-gray-600">Email: {user?.email}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Placeholder cards for future features */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-xl font-bold mb-2 text-gray-800">Inventory</h3>
                        <p className="text-gray-600 mb-4">Manage your products and stock levels.</p>
                        <button onClick={() => navigate('/inventory')} className="text-blue-500 hover:text-blue-700 font-semibold">
                            Go to Inventory &rarr;
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-xl font-bold mb-2 text-gray-800">Sales</h3>
                        <p className="text-gray-600 mb-4">View recent sales and transactions.</p>
                        <button onClick={() => navigate('/sales')} className="text-blue-500 hover:text-blue-700 font-semibold">
                            Go to Sales &rarr;
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-xl font-bold mb-2 text-gray-800">Reports</h3>
                        <p className="text-gray-600 mb-4">Analyze business performance.</p>
                        {user?.role === 'Admin' ? (
                            <button onClick={() => navigate('/admin')} className="text-blue-500 hover:text-blue-700 font-semibold">
                                View Admin Stats &rarr;
                            </button>
                        ) : (
                            <p className="text-sm text-gray-500 italic">Admin access only</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
