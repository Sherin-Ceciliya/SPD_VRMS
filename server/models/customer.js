const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    fullname: String,
    username: { type: String, unique: true },  // Enforce unique username
    email: { type: String, unique: true },     // Enforce unique email
    password: String
},{collection:"customer"});

const CustomerModel = mongoose.model("customer", CustomerSchema);
module.exports = CustomerModel;
