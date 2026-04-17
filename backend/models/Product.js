const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category',
        },
        location: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Location',
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        description: {
            type: String,
            required: true,
        },
        images: [
            {
                type: String,
                required: true,
            },
        ],
        condition: {
            type: String,
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
        isPromoted: {
            type: Boolean,
            default: false,
        },
        promotionExpiry: {
            type: Date,
        },
        negotiable: {
            type: Boolean,
            default: false,
        },
        // Category specific details
        details: {
            type: Map,
            of: String,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
