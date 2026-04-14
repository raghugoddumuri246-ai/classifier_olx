const express = require('express');
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

    app.use('/api/auth', authRoutes);

    app.get('/', (req, res) => {
        res.send('API is running...');
    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();