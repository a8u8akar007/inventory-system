console.log('1');
const express = require('express');
console.log('2');
const dotenv = require('dotenv');
console.log('3');
const cors = require('cors');
console.log('4');
const connectDB = require('./config/db');
console.log('5');
const authRoutes = require('./routes/authRoutes');
console.log('6');
const productRoutes = require('./routes/productRoutes');
console.log('7');
const saleRoutes = require('./routes/saleRoutes');
console.log('8');
const reportRoutes = require('./routes/reportRoutes');

console.log('9');
dotenv.config();

console.log('10');
const app = express();

console.log('11');
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    console.log('12 started');
    try {
        if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('<password>')) {
            console.log('BAD URI!');
            process.exit(1);
        }
        console.log('13 connecting UI');
        await connectDB();
        console.log('14 connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

startServer();
