const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
    label: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Password', passwordSchema);
