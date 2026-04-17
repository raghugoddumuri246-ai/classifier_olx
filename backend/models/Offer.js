const mongoose = require('mongoose');

const offerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        duration: {
            type: Number, // In days
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;
