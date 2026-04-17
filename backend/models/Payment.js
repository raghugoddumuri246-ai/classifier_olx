const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        },
        amount: {
            type: Number,
            required: true,
        },
        promotionDuration: {
            type: Number, // In days
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
