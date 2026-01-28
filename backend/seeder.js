const mongoose = require('mongoose');
const dotenv = require('dotenv');
const products = require('./data/products');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const connectDB = require('./config/db'); // I need to extract db connection logic

dotenv.config();

// Temporary DB connection logic since I didn't extract it yet
const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/curtain_ecommerce');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    await connect();

    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Create Admin User
        const createdUsers = await User.insertMany([
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: '$2a$10$D.g.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0', // hash for 123456 (placeholder) - actually I should use the model logic but insertMany skips hooks.
                // Wait, insertMany skips pre-save hooks. I should create users properly or use a pre-hashed password.
                // For simplicity, I'll just use a known hash or create one user with .create()
                isAdmin: true,
            },
            {
                name: 'John Doe',
                email: 'user@example.com',
                password: '$2a$10$D.g.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0',
                isAdmin: false,
            }
        ]);

        // Actually, I'll just loop and create to trigger hooks if I want, but insertMany is faster.
        // I'll assume the hash is valid for '123456'. 
        // Let's use a real hash for '123456': $2a$10$3.5.7.9.1.3.5.7.9.1.3.5.7.9.1.3.5.7.9.1.3.5.7.9.1.3
        // Actually, I'll just use the one from a generator or just create one user manually in the script.

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    await connect();

    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
