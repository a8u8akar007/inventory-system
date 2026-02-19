const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');
const reportRoutes = require('./routes/reportRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('<password>')) {
            console.error('\n\x1b[31m%s\x1b[0m', 'CRITICAL ERROR: storage connection string is missing or invalid.');
            console.error('Please update the MONGO_URI in "backend/.env" with your actual MongoDB Connection String.\n');
            process.exit(1);
        }
        await connectDB();
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

startServer();
