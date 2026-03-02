const fs = require('fs');
const connectDB = require('./config/db');

async function test() {
    try {
        require('dotenv').config();
        await connectDB();
    } catch(e) {
        fs.writeFileSync('my_error.log', e.toString() + "\n" + e.stack);
    }
}
test();
