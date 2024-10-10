const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CustomerModel = require('./models/customer');
const VehicleModel = require('./models/vehicle');
const Reservation = require('./models/reservation');
const multer = require("multer");
const path = require("path");
const Driver = require('./models/drivers');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
mongoose.connect("mongodb://127.0.0.1:27017/VRMS");
const Addon = require('./models/addon');
const router = express.Router();

// Assuming you have a model for Addon

// POST route to add an addon
app.use(express.json()); // To parse JSON data
// Import your reservation model

// POST request to create a reservation
const storage = multer.diskStorage({
    destination: './uploads/', // directory to save uploaded images
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // appending extension
    },
});

// Initialize upload
const upload = multer({ storage });

// Import necessary modules // Assuming you have an AddOn model

// Route to get add-on price by name

const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email service (e.g., 'hotmail', 'yahoo', 'outlook', etc.)
    auth: {
        user: 'nalinakshakartikka@gmail.com', // Replace with your email
        pass: 'epan lgsp tcxz tzsj', // Replace with your email password or app-specific password
    },
    tls: {
        rejectUnauthorized: false // This line allows self-signed certificates
    },
});

// Function to send an email
const sendMail = (to, subject, html) => {
    const mailOptions = {
        from: 'nalinakshakartikka@gmail.com', // Sender's email
        to, // Recipient's email
        subject, // Subject of the email
        html, // Body of the email (you can also use HTML)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error while sending mail:', error);
        }
        console.log('Mail sent successfully:', info.response);
    });
};


app.post('/send-email', (req, res) => {
    const { to, subject, html } = req.body;

    sendMail(to, subject, html);
    console.log(html);

    res.status(200).json({ message: 'Email sent successfully' });
});

router.get('/addonprice/:name', async (req, res) => {
    const addOnName = req.params.name;

    try {
        // Query the database for the add-on
        const addOn = await Addon.findOne({ addonName: addOnName });

        if (!addOn) {
            return res.status(404).json({ error: 'Add-on not found' });
        }

        // Return the price
        res.json({ price: addOn.priceOfAddon });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

router.get('/users/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await CustomerModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get reservations based on parameters
router.get('/reservations', async (req, res) => {
    const { username, plateNumber, pickupDateTime, dropDateTime } = req.query;

    try {
        const query = {};
        if (username) query.username = username;
        if (plateNumber) query.plateNumber = plateNumber;
        if (pickupDateTime && dropDateTime) {
            query.pickupDateTime = { $gte: new Date(pickupDateTime) };
            query.dropDateTime = { $lte: new Date(dropDateTime) };
        }

        const reservations = await Reservation.find(query);
        res.json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
// Use the upload middleware in your POST route
router.post('/reservations', upload.single('licenseImage'), async (req, res) => {
    console.log('Incoming reservation data:', req.body);

    const {
        username,
        address,
        mobile,
        driving,
        plateNumber,
        addOns,
        aadharCard,
        // Get the filename from the uploaded file
     // Assuming you name the input in your form as 'licenseImage'
        pickupDateTime,
        dropDateTime,
        totalPrice,
    } = req.body;
    const licenseImage = req.file ? req.file.path : null;
    try {
        const reservationData = {
            username,
            address,
            mobile,
            driving,
            plateNumber,
            addOns,
            aadharCard,
            licenseImage, // Store the path to the uploaded image
            pickupDateTime,
            dropDateTime,
            totalPrice,
        };

        const newReservation = new Reservation(reservationData);
        await newReservation.save();
        res.status(201).json({ message: 'Reservation created successfully', reservation: newReservation });
    } catch (error) {
        console.error("Error details:", error);
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;

// PUT route to modify an add-on's quantity
app.get('/addons', async (req, res) => {
    try {
        const addons = await Addon.find();  // Use the correct Addon model
        res.status(200).json(addons);
    } catch (err) {
        console.error('Error fetching add-ons:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
router.delete('/drivers/remove', async (req, res) => {
    const { email } = req.body;
    try {
        // Find and remove the driver based on the email
        const result = await Driver.findOneAndDelete({ email });
        if (!result) {
            return res.status(404).json({ error: 'Driver not found.' });
        }
        res.json({ success: true, message: 'Driver removed successfully.' });
    } catch (error) {
        console.error('Error removing driver:', error);
        res.status(500).json({ error: 'Server error occurred.' });
    }
});

module.exports = router;

router.post('/drivers/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const driver = await Driver.findOne({ email });
        if (!driver) {
            return res.status(404).json({ success: false, message: 'Driver not found.' });
        }

        // Compare password with the stored hash
        const isMatch = password== driver.password;
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid password.' });
        }

        // Successful login
        res.json({ success: true, message: 'Login successful.' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Server error occurred.' });
    }
});

module.exports = router;

app.put('/addon/:addonName', async (req, res) => {
    const { addonName } = req.params;
    const { quantityAvailable } = req.body;

    try {
        // Find the add-on by its name
        const addon = await Addon.findOne({ addonName });

        // If the add-on doesn't exist, return an error
        if (!addon) {
            return res.status(404).json({ message: 'Add-on not found' });
        }

        // Update the quantity
        addon.quantityAvailable = quantityAvailable;
        await addon.save();

        res.status(200).json({ message: 'Add-on updated successfully' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/addon', async (req, res) => {
    const { addonName, quantityAvailable } = req.body;

    try {
        // Ensure both addonName and quantityAvailable are provided
        if (!addonName || !quantityAvailable) {
            return res.status(400).json({ message: 'Both addon name and quantity are required' });
        }

        // Check if the addon already exists
        const existingAddon = await Addon.findOne({ addonName });
        if (existingAddon) {
            return res.status(400).json({ message: 'Addon already exists' });
        }

        // Create a new Addon
        const newAddon = new Addon({ addonName, quantityAvailable });
        await newAddon.save();

        res.status(201).json({ message: 'Addon created successfully' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Search vehicles route
router.post('/check-addons', async (req, res) => {
    try {
        const { pickupDate, dropDate } = req.body;

        const pickupDateTime = new Date(pickupDate);
        const dropDateTime = new Date(dropDate);

        // Fetch all add-ons
        const addons = await Addon.find();
        console.log('All Add-ons:', addons);

        // Fetch all reservations that overlap with the given time range
        const reservations = await Reservation.find({
            $or: [
                { pickupDateTime: { $lt: dropDateTime }, dropDateTime: { $gt: pickupDateTime } }
            ]
        });
        console.log('Filtered Reservations:', reservations); // Log fetched reservations

        // Create a map to track the total quantity used for each add-on
        const usedAddons = {};

        // Iterate through the reservations and track used add-ons
        reservations.forEach(reservation => {
            reservation.addOns.forEach(addOn => {
                // Ensure addOn.name matches the add-on structure in your database
                if (usedAddons[addOn.name]) {
                    usedAddons[addOn.name] += addOn.quantity;
                } else {
                    usedAddons[addOn.name] = addOn.quantity;
                }
            });
        });
        console.log('Used Add-ons:', usedAddons);

        // Create a response array for available add-ons
        const availableAddons = addons.map(addon => {
            const usedQuantity = usedAddons[addon.addonName] || 0; // Use addon.addonName to match correctly
            const remainingQuantity = addon.quantityAvailable - usedQuantity; // Calculate remaining quantity
            return {
                name: addon.addonName,
                quantity: Math.max(0, remainingQuantity), // Ensure quantity is not negative
            };
        }).filter(addon => addon.quantity > 0); // Filter only those with quantity > 0

        console.log('Available Add-ons:', availableAddons);

        // Return available add-ons
        res.status(200).json(availableAddons);
    } catch (err) {
        console.error('Error checking add-ons:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;

app.post('/drivers', upload.single('licenseImage'), async (req, res) => {
    try {
        const { fullName, password, address, email, mobileNumber, aadharCardNumber } = req.body;
        const licenseImage = req.file.filename;  // Get the filename of the uploaded image

        const newDriver = new Driver({
            fullName,
            password,
            address,
            email,
            mobileNumber,
            aadharCardNumber,
            licenseImage,
        });

        await newDriver.save();
        res.status(201).json({ message: 'Driver added successfully' });
    } catch (error) {
        console.error('Error adding driver:', error);
        res.status(500).json({ error: 'Failed to add driver' });
    }
});

app.get('/vehicle/:plateNumber', async (req, res) => {
    try {
        const { plateNumber } = req.params;
        const vehicle = await VehicleModel.findOne({ plateNumber });

        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        res.json(vehicle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
app.get('/reservations/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const reservations = await Reservation.find({ username });
        if (reservations.length === 0) {
            return res.status(404).json({ error: 'No reservations found for this user.' });
        }
        console.log('User reservations:', reservations); // Print reservations in the console
        res.json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'Server error.' });
    }
});

// Signup route
app.delete('/reservations/cancel/:reservationId', async (req, res) => {
    try {
        const reservationId = req.params.reservationId;
        const result = await Reservation.findByIdAndDelete(reservationId);
        if (!result) {
            return res.status(404).json({ error: 'Reservation not found.' });
        }
        res.json({ message: 'Reservation cancelled successfully.' });
    } catch (error) {
        console.error('Error cancelling reservation:', error);
        res.status(500).json({ error: 'Server error.' });
    }
});

app.post('/customer', async (req, res) => {
    const { fullname, username, email, password } = req.body;

    try {
        // Check if email already exists
        const existingEmail = await CustomerModel.findOne({ email });
        if (existingEmail) {
            return res.json({ error: 'Email is already registered.' });
        }

        // Check if username is unique
        const existingUsername = await CustomerModel.findOne({ username });
        if (existingUsername) {
            return res.json({ error: 'Username is already taken.' });
        }

        // Create a new customer
        const newCustomer = await CustomerModel.create({ fullname, username, email, password });
        return res.json(newCustomer);
    } catch (error) {
        console.error('Registration failed:', error);
        return res.json({ error: 'Registration failed.' });
    }
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    CustomerModel.findOne({ username })
        .then(customer => {
            if (customer) {
                if (customer.password === password) {
                    res.json({ valid: true });
                } else {
                    res.json({ valid: false, error: 'Incorrect password' });
                }
            } else {
                res.json({ valid: false, error: 'Invalid login credentials' });
            }
        })
        .catch(err => {
            console.error('Login error:', err);
            res.json({ valid: false, error: 'Error occurred' });
        });
});

// Vehicle route for handling submissions


app.post('/vehicle', upload.single('vehicleImage'), async (req, res) => {
    const { plateNumber, vehicleType, brandModel, manufactureYear, seatingCapacity, fuelType, rentalPrice, availabilityStatus, vehicleDescription, mileage, ACAvailability } = req.body;
    const vehicleImage = req.file ? req.file.path : null;

    try {
        // Check if the plate number already exists
        const existingVehicle = await VehicleModel.findOne({ plateNumber });
        if (existingVehicle) {
            return res.json({ error: 'Plate number already exists. Please use a unique plate number.' });
        }

        // Create and save new vehicle
        const newVehicle = new VehicleModel({
            plateNumber,
            vehicleType,
            brandModel,
            manufactureYear,
            seatingCapacity,
            fuelType,
            rentalPrice,
            availabilityStatus,
            vehicleDescription,
            mileage,
            ACAvailability,
            vehicleImage,
        });

        await newVehicle.save();
        return res.json(newVehicle);
    } catch (error) {
        console.error('Error while adding vehicle:', error);
        return res.json({ error: 'Failed to add the vehicle.' });
    }
});

// Update vehicle status
app.put('/vehicle/:plateNumber', async (req, res) => {
    const { plateNumber } = req.params;
    const { availabilityStatus } = req.body;

    try {
        const updatedVehicle = await VehicleModel.findOneAndUpdate(
            { plateNumber },
            { availabilityStatus },
            { new: true }
        );

        if (!updatedVehicle) {
            return res.status(404).json({ error: 'Vehicle not found.' });
        }

        return res.json(updatedVehicle);
    } catch (error) {
        console.error('Error updating vehicle status:', error);
        return res.status(500).json({ error: 'Failed to update vehicle status.' });
    }
});
app.post('/search-vehicles', async (req, res) => {
    try {
        const { pickupDate, dropDate, vehicleType } = req.body;

        const pickupDateTime = new Date(pickupDate);
        const dropDateTime = new Date(dropDate);
        const currentTime = new Date(); // Get the current time

        // Check if pickup time is at least 1 hour more than the current time
        if (pickupDateTime <= currentTime || (pickupDateTime - currentTime) < 3600000) {
            return res.status(400).json({ error: 'Pickup time must be at least 1 hour from the current time.' });
        }
        if (pickupDateTime >= dropDateTime) {
            return res.status(400).json({ error: 'Pickup date must be before drop date.' });
        }

        // Fetch all vehicles that match the vehicleType
        const allVehicles = await VehicleModel.find({ vehicleType });
        console.log(allVehicles);
        console.log(vehicleType);
        // Fetch reserved vehicles within the pickup and drop time range
        const reservedVehicles = await Reservation.find({
            $or: [
                { pickupDateTime: { $lt: dropDateTime }, dropDateTime: { $gt: pickupDateTime } }
            ]
        });

        // Get reserved vehicle plate numbers
        const reservedPlateNumbers = reservedVehicles.map(vehicle => vehicle.plateNumber);

        // Filter out reserved vehicles from the available vehicles
        const availableVehicles = allVehicles.filter(vehicle => !reservedPlateNumbers.includes(vehicle.plateNumber));

        if (availableVehicles.length === 0) {
            return res.json({ message: 'No vehicles available for the selected criteria.' });
        }

        res.json(availableVehicles);
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        res.status(500).json({ error: 'Server error occurred.' });
    }
});
app.use('/', router);

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
