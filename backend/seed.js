const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const Customer = require('./models/Customer');
const Sale = require('./models/Sale');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

const seedData = async () => {
    await connectDB();

    try {
        // Clear existing data
        await User.deleteMany({});
        await Product.deleteMany({});
        await Customer.deleteMany({});
        await Sale.deleteMany({});
        console.log('Data cleared');

        // Create Users
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const admin = new User({
            name: 'Admin User',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'Admin'
        });

        const staff = new User({
            name: 'Staff User',
            email: 'staff@example.com',
            password: hashedPassword,
            role: 'Staff'
        });

        await admin.save();
        await staff.save();
        console.log('Users created');

        // Create Products
        const products = [
            { name: 'Laptop', category: 'Electronics', price: 1200, quantity: 50 },
            { name: 'Smartphone', category: 'Electronics', price: 800, quantity: 100 },
            { name: 'Headphones', category: 'Electronics', price: 150, quantity: 200 },
            { name: 'T-Shirt', category: 'Fashion', price: 25, quantity: 500 },
            { name: 'Jeans', category: 'Fashion', price: 60, quantity: 300 },
            { name: 'Coffee Table', category: 'Home & Garden', price: 100, quantity: 40 },
            { name: 'Desk Chair', category: 'Home & Garden', price: 200, quantity: 60 },
            { name: 'Running Shoes', category: 'Sports', price: 80, quantity: 150 },
            { name: 'Yoga Mat', category: 'Sports', price: 30, quantity: 100 },
            { name: 'Fiction Novel', category: 'Books', price: 15, quantity: 50 }
        ];

        const createdProducts = await Product.insertMany(products);
        console.log('Products created');

        // Create Customer
        const customer = new Customer({
            name: 'John Doe',
            phone: '123-456-7890'
        });
        await customer.save();
        console.log('Customer created');

        // Create Sale
        const sale = new Sale({
            customerId: customer._id,
            items: [
                {
                    product: createdProducts[0]._id, // Laptop
                    quantity: 1,
                    price: createdProducts[0].price
                },
                {
                    product: createdProducts[2]._id, // Headphones
                    quantity: 2,
                    price: createdProducts[2].price
                }
            ],
            totalAmount: createdProducts[0].price * 1 + createdProducts[2].price * 2
        });
        await sale.save();
        console.log('Sale created');

        console.log('Database seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
