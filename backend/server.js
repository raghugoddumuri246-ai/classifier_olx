const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

const startServer = async () => {
    await connectDB(); // ✅ WAIT here

    const authRoutes = require('./routes/authRoutes'); // ✅ load AFTER DB
    const adminRoutes = require('./routes/adminRoutes');
    const productRoutes = require('./routes/productRoutes');

    app.use('/api/auth', authRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/products', productRoutes);

    // Public routes for categories and locations
    const { getCategories, getLocations, getSliders } = require('./controllers/adminController');
    app.get('/api/categories', getCategories);
    app.get('/api/locations', getLocations);
    app.get('/api/sliders', getSliders);

    app.get('/', (req, res) => {
        res.send('API is running...');
    });

    // Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();