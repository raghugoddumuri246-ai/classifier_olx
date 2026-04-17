const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding users...');

        const fakeUsers = [];
        for (let i = 1; i <= 20; i++) {
            fakeUsers.push({
                name: `Test User ${i}`,
                email: `user${i}@example.com`,
                phone: `99887766${i < 10 ? '0' + i : i}`,
                password: 'password123',
                role: 'user'
            });
        }

        // We don't want to delete the admin, so we just insert many
        // But to avoid duplicates if run multiple times, we'll check first
        for (const u of fakeUsers) {
            const exists = await User.findOne({ email: u.email });
            if (!exists) {
                await User.create(u);
            }
        }

        console.log('20 Fake users seeded successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedUsers();
