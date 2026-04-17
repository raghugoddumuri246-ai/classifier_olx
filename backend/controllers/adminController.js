const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const Product = require('../models/Product');
const Payment = require('../models/Payment');
const Category = require('../models/Category');
const Location = require('../models/Location');
const Slider = require('../models/Slider');
const Offer = require('../models/Offer');

// @desc    Get all users (paginated)
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const count = await User.countDocuments({});
    const users = await User.find({})
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .select('-password');

    res.json({ users, page, pages: Math.ceil(count / pageSize), total: count });
};

// @desc    Get all products
// @route   GET /api/admin/products
// @access  Private/Admin
const getProducts = async (req, res) => {
    const products = await Product.find({})
        .populate('user', 'name email phone')
        .populate('category', 'name')
        .populate('location', 'name')
        .sort({ createdAt: -1 });
    res.json(products);
};

// @desc    Approve or Reject product
// @route   PUT /api/admin/products/:id/status
// @access  Private/Admin
const updateProductStatus = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.status = req.body.status || product.status;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Get all payments with filters
// @route   GET /api/admin/payments
// @access  Private/Admin
const getPayments = async (req, res) => {
    const { filter } = req.query; // daily, monthly, yearly
    let query = {};

    const now = new Date();
    if (filter === 'daily') {
        query.createdAt = { $gte: new Date(now.setHours(0, 0, 0, 0)) };
    } else if (filter === 'monthly') {
        query.createdAt = { $gte: new Date(now.getFullYear(), now.getMonth(), 1) };
    } else if (filter === 'yearly') {
        query.createdAt = { $gte: new Date(now.getFullYear(), 0, 1) };
    }

    const payments = await Payment.find(query)
        .populate('user', 'name email')
        .populate('product', 'title')
        .sort({ createdAt: -1 });
    res.json(payments);
};

// Content Management
const getCategories = async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
};

const createCategory = async (req, res) => {
    const { name, icon } = req.body;
    const category = await Category.create({ name, icon });
    res.status(201).json(category);
};

const getLocations = async (req, res) => {
    const locations = await Location.find({});
    res.json(locations);
};

const createLocation = async (req, res) => {
    const { name } = req.body;
    const location = await Location.create({ name });
    res.status(201).json(location);
};

// @desc    Get all sliders
// @route   GET /api/admin/sliders
// @access  Admin
const getSliders = async (req, res) => {
    const sliders = await Slider.find({});
    res.json(sliders);
};

// @desc    Create a slider
// @route   POST /api/admin/sliders
// @access  Admin
const createSlider = async (req, res) => {
    const { title } = req.body;
    
    if (!req.file) {
        return res.status(400).json({ message: 'Please upload an image' });
    }

    // Convert backslashes to forward slashes for URL consistency
    const imageUrl = `http://localhost:5000/${req.file.path.replace(/\\/g, '/')}`;

    const slider = new Slider({
        title,
        imageUrl,
    });

    const createdSlider = await slider.save();
    res.status(201).json(createdSlider);
};

// @desc    Delete a slider
// @route   DELETE /api/admin/sliders/:id
// @access  Admin
const deleteSlider = async (req, res) => {
    const slider = await Slider.findById(req.params.id);

    if (slider) {
        // Extract filename from URL to delete from disk
        // URL format: http://localhost:5000/uploads/sliders/image-123.jpg
        const filename = slider.imageUrl.split('/').pop();
        const filePath = path.join(__dirname, '../uploads/sliders', filename);

        // Delete the file if it exists
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await slider.deleteOne();
        res.json({ message: 'Slider removed' });
    } else {
        res.status(404).json({ message: 'Slider not found' });
    }
};

const getOffers = async (req, res) => {
    const offers = await Offer.find({});
    res.json(offers);
};

const createOffer = async (req, res) => {
    const { name, duration, price, description } = req.body;
    const offer = await Offer.create({ name, duration, price, description });
    res.status(201).json(offer);
};

module.exports = {
    getUsers,
    getProducts,
    updateProductStatus,
    getPayments,
    getCategories,
    createCategory,
    getLocations,
    createLocation,
    getSliders,
    createSlider,
    deleteSlider,
    getOffers,
    createOffer
};
