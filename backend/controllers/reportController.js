const Product = require('../models/Product');
const Sale = require('../models/Sale');

const getDashboardStats = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();

        const lowStockProducts = await Product.find({ quantity: { $lt: 5 } });

        const sales = await Sale.find();
        const totalSalesAmount = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);

        res.status(200).json({
            totalProducts,
            totalSalesAmount,
            lowStockProducts
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard stats' });
    }
};

module.exports = { getDashboardStats };
