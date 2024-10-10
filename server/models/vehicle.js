const mongoose = require('mongoose');

// Auto-increment plugin

const VehicleSchema = new mongoose.Schema({
    plateNumber: {
        type: String,
        unique: true,  // Ensures plate number is unique
        required: true
    },
    vehicleType: String,
    brandModel: String,
    manufactureYear: Number,
    seatingCapacity: Number,
    fuelType: String,
    rentalPrice: Number,
    availabilityStatus: String,
    vehicleDescription: String,
    mileage: Number,
    vehicleImage: String,
    ACAvailability:String,
},{collection:"vehicle"});

// Apply auto-increment to vehicleId field


const VehicleModel = mongoose.model('Vehicle', VehicleSchema);

module.exports = VehicleModel;

