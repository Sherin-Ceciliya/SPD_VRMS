import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Confirm = () => {
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState(null);
    const [error, setError] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);  // Total price state
    const [addOnDetails, setAddOnDetails] = useState([]);  // To store add-on details

    const username = localStorage.getItem('username');
    const plateNumber = localStorage.getItem('plateNumber');
    const summaryData = JSON.parse(localStorage.getItem('summaryData'));
    const pickupDateTime = localStorage.getItem('pickupDateTime');
    const dropDateTime = localStorage.getItem('dropDateTime');

    // Convert pickupDateTime and dropDateTime to separate date and time variables
    // Parsing the pickup and drop dateTime
// Use the exact date-time format for local time without shifting
// Function to convert local time to Asia/Kolkata time
function convertToKolkataTime(dateTimeStr) {
    const dateObj = new Date(dateTimeStr);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata'
    }).format(dateObj);
}

const pickupDate = pickupDateTime ? convertToKolkataTime(pickupDateTime).split(',')[0] : '';
const pickupTime = pickupDateTime ? convertToKolkataTime(pickupDateTime).split(',')[1].trim() : '';

const dropDate = dropDateTime ? convertToKolkataTime(dropDateTime).split(',')[0] : '';
const dropTime = dropDateTime ? convertToKolkataTime(dropDateTime).split(',')[1].trim() : '';


    // Calculate the number of hours between pickup and drop
    const totalHours = (new Date(dropDateTime) - new Date(pickupDateTime)) / (1000 * 60 * 60);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/vehicle/${plateNumber}`);
                if (!response.data) {
                    throw new Error('Vehicle not found');
                }
                const data = response.data;
                setVehicle(data);

                // Calculate the total vehicle price based on rental price and hours
                const vehicleTotalPrice = data.rentalPrice * totalHours;

                // Fetch and calculate total add-on price
                let addOnTotalPrice = 0;
                const addOnDetailsArray = [];

                for (const addOn of summaryData.selectedAddOns) {
                    try {
                        const addOnResponse = await axios.get(`http://localhost:3001/addonprice/${addOn.addOnName}`);
                        const addOnPrice = addOnResponse.data.price;
                        const addOnCost = addOnPrice * addOn.quantity * totalHours;

                        addOnTotalPrice += addOnCost;

                        // Push add-on details for displaying
                        addOnDetailsArray.push({
                            name: addOn.addOnName,
                            quantity: addOn.quantity,
                            price: addOnPrice,
                            totalCost: addOnCost
                        });

                    } catch (err) {
                        console.error(`Error fetching price for add-on ${addOn.addOnName}:`, err);
                    }
                }

                setAddOnDetails(addOnDetailsArray);
                setTotalPrice(vehicleTotalPrice + addOnTotalPrice);  // Set total price for vehicle + add-ons
            } catch (err) {
                setError(err.message);
            }
        };

        if (plateNumber) {
            fetchVehicle();
        }
    }, [plateNumber, summaryData, totalHours]);

    const handlePayment = async () => {
        const reservationData = {
            username,
            address: summaryData.address,
            mobile: summaryData.mobile,
            driving: summaryData.driving,
            plateNumber,
            addOns: summaryData.selectedAddOns.map(addOn => ({
                name: addOn.addOnName,
                quantity: addOn.quantity,
            })),
            aadharCard: summaryData.aadharCard,
            licenseNumber: summaryData.licenseNumber,
            pickupDateTime,
            dropDateTime,
            totalPrice,
        };

        try {
            const response = await axios.post('http://localhost:3001/reservations', reservationData);
            navigate('/success');
        } catch (error) {
            console.error('Error saving reservation:', error);
            setError('Failed to save reservation');
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!vehicle) {
        return <div>Loading...</div>;
    }

    return (
        <div className="confirm-container">
            <h2>Booking Confirmation</h2>
            {summaryData && (
                <div>
                    <p>Username: {username}</p>
                    <p>Address: {summaryData.address}</p>
                    <p>Mobile: {summaryData.mobile}</p>
                    <p>Aadhar Card: {summaryData.aadharCard}</p>
                    <p>Driving License: {summaryData.driving ? 'Yes' : 'No'}</p>

                    <h3>Vehicle Details:</h3>
                    <h3>{vehicle.brandModel}</h3>
                    <img src={`http://localhost:3001/${vehicle.vehicleImage}`} alt={vehicle.brandModel} className="vehicle-image" />
                    <p>Plate Number: {vehicle.plateNumber}</p>
                    <p>Rental Price: ₹{vehicle.rentalPrice} per hour</p>
                    <p>Availability Status: {vehicle.availabilityStatus}</p>
                    <p>Type: {vehicle.vehicleType}</p>
                    <p>Description: {vehicle.vehicleDescription}</p>
                    <p>Year: {vehicle.manufactureYear}</p>

                    <h4>Booking Details:</h4>
                    <p>Pickup Date: {pickupDate}</p>
                    <p>Pickup Time: {pickupTime}</p>
                    <p>Drop Date: {dropDate}</p>
                    <p>Drop Time: {dropTime}</p>

                    <h3>Add-ons:</h3>
                    {addOnDetails.map((addOn, index) => (
                        <div key={index}>
                            <p>{addOn.name}: {addOn.quantity} x ₹{addOn.price} x {totalHours} hours = ₹{addOn.totalCost.toFixed(2)}</p>
                        </div>
                    ))}

                    <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3> {/* Display total price */}

                    <button onClick={handlePayment}>Pay</button>
                </div>
            )}
        </div>
    );
};

export default Confirm;
