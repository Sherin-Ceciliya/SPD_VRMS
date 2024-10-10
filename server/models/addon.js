const mongoose = require('mongoose');

const addonSchema = new mongoose.Schema({
    addonName: {
        type: String,
        required: true,
        unique: true,
    },
    quantityAvailable: {
        type: Number,
        required: true, // This ensures that the quantityAvailable field is required
        min: 1,
    },
    priceOfAddon: {
        type: Number,
        required: true, // This ensures that the quantityAvailable field is required
    },
},{collection:"addon"});

const Addon = mongoose.model('Addon', addonSchema);

module.exports = Addon;