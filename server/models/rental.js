const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    username: { type: String, required: true },
    plateNumber: { type: String, required: true },
    address: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    aadharCard: { type: String, required: true },
    isDriving: { type: Boolean, required: true },
    licenseNumber: { type: String },
    addons: [
        {
            addonName: { type: String, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    rentalDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Rental', rentalSchema);
