const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Category = require('../models/Category');
const Location = require('../models/Location');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config({ path: path.join(__dirname, '../.env') });

const categories = [
    { name: 'Cars', icon: 'Car' },
    { name: 'Mobiles', icon: 'Smartphone' },
    { name: 'Bikes', icon: 'Bike' },
    { name: 'Electronics', icon: 'Tv' },
    { name: 'Furniture', icon: 'Sofa' },
    { name: 'Property', icon: 'Home' },
    { name: 'Jobs', icon: 'Briefcase' },
    { name: 'Pets', icon: 'Dog' },
    { name: 'Fashion', icon: 'ShoppingBag' }
];

const locations = [
    { name: 'Delhi' },
    { name: 'Mumbai' },
    { name: 'Bengaluru' },
    { name: 'Hyderabad' },
    { name: 'Chennai' },
    { name: 'Kolkata' },
    { name: 'Pune' },
    { name: 'Ahmedabad' }
];

const productTemplates = [
    { title: 'Honda City i-VTEC', categoryName: 'Cars', price: 850000, condition: 'Used', description: 'Well maintained car, first owner, 45,000 km driven.' },
    { title: 'iPhone 15 Pro Max', categoryName: 'Mobiles', price: 125000, condition: 'New', description: 'Brand new iPhone, 256GB, Titanium Blue.' },
    { title: 'Royal Enfield Classic 350', categoryName: 'Bikes', price: 180000, condition: 'Used', description: 'Excellent condition, silver color, single handed used.' },
    { title: 'Sony Playstation 5', categoryName: 'Electronics', price: 45000, condition: 'New', description: 'PS5 Disc Edition with 2 controllers and Spider-Man 2.' },
    { title: 'Modern L-Shaped Sofa', categoryName: 'Furniture', price: 32000, condition: 'New', description: 'Grey fabric sofa, 5 seater, high density foam.' },
    { title: '2BHK Apartment in Whitefield', categoryName: 'Property', price: 6500000, condition: 'New', description: 'East facing, 1200 sqft, premium society.' },
    { title: 'Senior Frontend Developer', categoryName: 'Jobs', price: 1800000, condition: 'New', description: '5+ years experience required in React and Next.js.' },
    { title: 'Golden Retriever Puppy', categoryName: 'Pets', price: 15000, condition: 'New', description: 'Healthy puppy, 45 days old, vaccinated.' },
    { title: 'Vintage Leather Jacket', categoryName: 'Fashion', price: 4500, condition: 'Used', description: 'Genuine leather, medium size, classic look.' },
    { title: 'MacBook Pro M3', categoryName: 'Electronics', price: 160000, condition: 'New', description: 'Apple M3 Pro chip, 18GB RAM, 512GB SSD.' }
];

const seedAllData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for comprehensive seeding...');

        // 1. Seed Categories
        console.log('Seeding Categories...');
        const seededCategories = [];
        for (const cat of categories) {
            let category = await Category.findOne({ name: cat.name });
            if (!category) {
                category = await Category.create(cat);
            }
            seededCategories.push(category);
        }

        // 2. Seed Locations
        console.log('Seeding Locations...');
        const seededLocations = [];
        for (const loc of locations) {
            let location = await Location.findOne({ name: loc.name });
            if (!location) {
                location = await Location.create(loc);
            }
            seededLocations.push(location);
        }

        // 3. Get Users
        const users = await User.find({ role: 'user' });
        if (users.length === 0) {
            console.log('No users found. Please run seedUsers.js first.');
            process.exit(1);
        }

        // 4. Seed Products
        console.log('Seeding Products...');
        // Clear existing products to avoid duplicates in this specific seed
        await Product.deleteMany({});
        
        for (let i = 0; i < 40; i++) {
            const template = productTemplates[i % productTemplates.length];
            const category = seededCategories.find(c => c.name === template.categoryName);
            const location = seededLocations[Math.floor(Math.random() * seededLocations.length)];
            const user = users[Math.floor(Math.random() * users.length)];

            await Product.create({
                user: user._id,
                title: `${template.title} #${i + 1}`,
                category: category._id,
                location: location._id,
                price: template.price + (Math.random() * 5000 - 2500), // Randomize price slightly
                description: template.description,
                condition: template.condition,
                status: Math.random() > 0.3 ? 'approved' : 'pending',
                images: [`https://picsum.photos/seed/${i + 100}/600/400`],
                isPromoted: Math.random() > 0.8
            });
        }

        console.log('All data seeded successfully!');
        process.exit();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedAllData();
