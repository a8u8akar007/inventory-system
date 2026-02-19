import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import SalesPage from './pages/SalesPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
    return (
        <Router>
            <Toaster position="top-right" reverseOrder={false} />
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/inventory" element={<InventoryPage />} />
                    <Route path="/sales" element={<SalesPage />} />
                    <Route path="/admin" element={<AdminDashboardPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
