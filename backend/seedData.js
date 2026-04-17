const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Category = require('./models/Category');
const Location = require('./models/Location');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

const categories = [
    { name: 'Mobiles & Tablets', icon: '📱' },
    { name: 'Electronics', icon: '💻' },
    { name: 'Cars & Vehicles', icon: '🚗' },
    { name: 'Bikes & Motorcycles', icon: '🏍️' },
    { name: 'Property', icon: '🏠' },
    { name: 'Furniture & Decor', icon: '🛋️' },
    { name: 'Fashion', icon: '👗' },
    { name: 'Books & Education', icon: '📚' },
    { name: 'Jobs', icon: '💼' },
    { name: 'Pets', icon: '🐶' },
    { name: 'Sports & Hobbies', icon: '⚽' },
    { name: 'Tools & Machinery', icon: '🔧' },
    { name: 'Agriculture', icon: '🌾' },
    { name: 'Others', icon: '✨' },
];

const locations = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 
    'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur'
];

const importData = async () => {
    try {
        await connectDB();

        // Clear existing
        await User.deleteMany();
        await Category.deleteMany();
        await Location.deleteMany();
        await Product.deleteMany();

        // Create Admin
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            phone: '1234567890',
            password: 'adminpassword',
            role: 'admin',
        });

        console.log('Admin User Created');

        // Create Categories
        const createdCategories = await Category.insertMany(categories);
        console.log('Categories Imported');

        // Create Locations
        const createdLocations = await Location.insertMany(
            locations.map(l => ({ name: l }))
        );
        console.log('Locations Imported');

        // Sample Products
        const sampleProducts = [
            {
                user: adminUser._id,
                title: 'iPhone 15 Pro Max 256GB',
                category: createdCategories[0]._id, // Mobiles
                location: createdLocations[0]._id, // Mumbai
                price: 119999,
                description: 'Brand new sealed iPhone 15 Pro Max. Natural Titanium, 256GB.',
                images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80'],
                condition: 'Brand New',
                status: 'approved',
                isPromoted: true,
            },
            {
                user: adminUser._id,
                title: 'Royal Enfield Classic 350',
                category: createdCategories[3]._id, // Bikes
                location: createdLocations[2]._id, // Bangalore
                price: 185000,
                description: 'Well maintained RE Classic 350, single owner.',
                images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'],
                condition: 'Used',
                status: 'approved',
            }
        ];

        await Product.insertMany(sampleProducts);
        console.log('Sample Products Imported');

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
