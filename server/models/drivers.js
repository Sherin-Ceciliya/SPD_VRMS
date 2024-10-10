const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    passcode: { type: String, required: true }, // Ensure this matches how you're checking the passcode
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    aadharCardNumber: { type: String, required: true },
    licenseImage: { type: String, required: true },
    driver_id: { type: String, required: true, unique: true } // Ensure unique index on driver_id
});


const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
