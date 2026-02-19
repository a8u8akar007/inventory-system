import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Layout = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-gray-800 text-white flex flex-col fixed h-full">
                <div className="h-16 flex items-center justify-center border-b border-gray-700">
                    <h1 className="text-2xl font-bold">IMS</h1>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <Link to="/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                        Dashboard
                    </Link>
                    <Link to="/inventory" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                        Inventory
                    </Link>
                    <Link to="/sales" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                        Sales
                    </Link>

                </nav>
            </aside>

            <div className="flex-1 ml-64 flex flex-col">
                <header className="h-16 bg-white shadow flex items-center justify-between px-8">
                    <div className="text-xl font-semibold text-gray-800">
                        Welcome, {user && user.name}
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
                    >
                        Logout
                    </button>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
