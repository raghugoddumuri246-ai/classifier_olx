const Product = require('../models/Product');
const Payment = require('../models/Payment');

// @desc    Create a new product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
    const { 
        title, category, location, price, 
        description, images, condition, negotiable, details 
    } = req.body;

    const product = new Product({
        user: req.user._id,
        title,
        category,
        location,
        price,
        description,
        images,
        condition,
        negotiable,
        details,
        status: 'pending' // Admin approval required
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

// @desc    Get logged in user products
// @route   GET /api/products/my
// @access  Private
const getMyProducts = async (req, res) => {
    const products = await Product.find({ user: req.user._id })
        .populate('category', 'name')
        .populate('location', 'name')
        .sort({ createdAt: -1 });
    res.json(products);
};

// @desc    Promote a product (Simulated Payment Success)
// @route   PUT /api/products/:id/promote
// @access  Private
const promoteProduct = async (req, res) => {
    const { days, amount } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        if (product.user.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'User not authorized' });
            return;
        }

        // Create Payment Record (Simulated Success)
        await Payment.create({
            user: req.user._id,
            product: product._id,
            amount,
            promotionDuration: days,
            status: 'completed'
        });

        // Update Product Promotion Status
        product.isPromoted = true;
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + Number(days));
        product.promotionExpiry = expiryDate;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Get all approved products (Public)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    const { category, location, search } = req.query;
    let query = { status: 'approved' };

    if (category) query.category = category;
    if (location && location !== 'All India') query.location = location;
    if (search) query.title = { $regex: search, $options: 'i' };

    const products = await Product.find(query)
        .populate('category', 'name')
        .populate('location', 'name')
        .sort({ isPromoted: -1, createdAt: -1 });
    res.json(products);
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id)
        .populate('user', 'name email phone')
        .populate('category', 'name')
        .populate('location', 'name');

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

module.exports = {
    createProduct,
    getMyProducts,
    promoteProduct,
    getProducts,
    getProductById
};
