const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    aadharCardNumber: { type: String, required: true },
    licenseImage: { type: String, required: true },  // Store the filename of the uploaded license image
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
