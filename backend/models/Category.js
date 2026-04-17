const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        icon: {
            type: String,
            required: true, // Emoji or Lucide icon name
        },
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
