const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    driving: {
        type: Boolean,
        required: true,
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
    pickupDateTime: {
        type: Date,
        required: true,
    },
    dropDateTime: {
        type: Date,
        required: true,
    },
    totalPrice:{
        type:Number,
        required:true,
    }
}, {
    timestamps: true,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;

