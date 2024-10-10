const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    customer_name: {  // Changed from 'username' to 'customer_name'
        type: String,
        required: true,
    },
    pickup_time: {  // Added fields for time and date
        type: String,
        required: true,
    },
    pickup_date: {
        type: Date,
        required: true,
    },
    drop_time: {
        type: String,
        required: true,
    },
    drop_date: {
        type: Date,
        required: true,
    },
    driving: {
        type: Boolean,
        required: true,
    },
    driver_id: {  // Added to hold the driver's ID
        type: String, 
        required: false,
        ref: 'Driver',  // Reference to the Driver model
        default: null,
    },
    ride_status: {  // Added for ride status
        type: String,
        enum: ['waiting', 'taken', 'completed', 'canceled'],  // Enum for possible statuses
        required: true,
        default: 'waiting',
    },
    plateNumber: {
        type: String,
        required: true,
    },
    addOns: [
        {
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    aadharCard: {
        type: String,
        required: true,
    },
    licenseNumber: {
        type: String,
        required: false,
    },
    totalPrice: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,  // Automatically add createdAt and updatedAt fields
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
