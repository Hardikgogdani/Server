const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    age: String,
    country: String,
    phone: Number,
    address: String,
    gender: String,
    email: String,
    password: String,
    isActive: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UsersSchema);