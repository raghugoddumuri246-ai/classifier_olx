const mongoose = require('mongoose');

const sliderSchema = mongoose.Schema(
    {
        imageUrl: {
            type: String,
            required: true,
        },
        title: {
            type: String,
        },
        link: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Slider = mongoose.model('Slider', sliderSchema);

module.exports = Slider;
