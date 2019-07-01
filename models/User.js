const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        properties: [
            {
                type: Schema.Types.ObjectId,
                ref: 'properties',
            },
        ],
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('users', UserSchema);
module.exports = User;
