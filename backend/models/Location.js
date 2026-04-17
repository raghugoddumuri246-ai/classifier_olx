const mongoose = require('mongoose');

const locationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
