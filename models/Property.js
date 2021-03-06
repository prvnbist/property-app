const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PropertySchema = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'users' },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
        },
        location: {
            type: String,
            required: true,
        },
        specs: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Property = mongoose.model('properties', PropertySchema);
module.exports = Property;
