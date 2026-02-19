const Sale = require('../models/Sale');
const Product = require('../models/Product');
const Customer = require('../models/Customer');

const createSale = async (req, res) => {
    try {
        const { customerName, customerPhone, items } = req.body;

        let totalAmount = 0;
        const saleItems = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) return res.status(404).json({ message: `Product ${item.productId} not found` });

            if (product.quantity < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
            }

            product.quantity -= item.quantity;
            await product.save();

            totalAmount += product.price * item.quantity;
            saleItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });
        }

        let customer = await Customer.findOne({ phone: customerPhone });
        if (!customer) {
            customer = new Customer({ name: customerName, phone: customerPhone });
            await customer.save();
        }

        const newSale = new Sale({
            customerId: customer._id,
            items: saleItems,
            totalAmount
        });

        await newSale.save();

        res.status(201).json(newSale);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating sale' });
    }
};

const getSales = async (req, res) => {
    try {
        const sales = await Sale.find().populate('customerId').populate('items.product');
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sales' });
    }
};

module.exports = { createSale, getSales };
