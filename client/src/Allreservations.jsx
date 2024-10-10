import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Allreservations = () => {
    const navigate = useNavigate();

    // Retrieve reservation and vehicle data from localStorage
    const reservation = JSON.parse(localStorage.getItem('selectedReservation'));
    const vehicle = JSON.parse(localStorage.getItem('selectedVehicle'));

    const handleGoBack = () => {
        navigate('/viewreservations'); // Navigate back to Viewreservations.jsx
    };

    return (
        <div className="allreservations-container">
            {reservation && vehicle ? (
                <div className="reservation-details">
                    <h3>Vehicle: {vehicle.brandModel || 'Loading...'}</h3>
                    <p><strong>Plate Number:</strong> {vehicle.plateNumber}</p>
                    <p><strong>Vehicle Type:</strong> {vehicle.vehicleType}</p>
                    <p><strong>Brand Model:</strong> {vehicle.brandModel}</p>
                    <p><strong>Manufacture Year:</strong> {vehicle.manufactureYear}</p>
                    <p><strong>Seating Capacity:</strong> {vehicle.seatingCapacity}</p>
                    <p><strong>Fuel Type:</strong> {vehicle.fuelType}</p>
                    <p><strong>Rental Price (₹):</strong> {vehicle.rentalPrice}</p>
                    <p><strong>Availability Status:</strong> {vehicle.availabilityStatus}</p>
                    <p><strong>Vehicle Description:</strong> {vehicle.vehicleDescription}</p>
                    <p><strong>Mileage (km/l):</strong> {vehicle.mileage}</p>
                    <p><strong>AC Availability:</strong> {vehicle.ACAvailability}</p>
                    <p><strong>Pickup Date:</strong> {new Date(reservation.pickupDateTime).toLocaleDateString()}</p>
                    <p><strong>Pickup Time:</strong> {new Date(reservation.pickupDateTime).toLocaleTimeString()}</p>
                    <p><strong>Drop Date:</strong> {new Date(reservation.dropDateTime).toLocaleDateString()}</p>
                    <p><strong>Drop Time:</strong> {new Date(reservation.dropDateTime).toLocaleTimeString()}</p>
                    <p><strong>Total Price (₹):</strong> {reservation.totalPrice}</p>

                    {reservation.addOns && reservation.addOns.length > 0 && (
                        <div className="add-ons">
                            <h4>Add-ons:</h4>
                            {reservation.addOns.map((addOn, index) => (
                                <p key={index}>
                                    <strong>{addOn.name}</strong>: {addOn.quantity}
                                </p>
                            ))}
                        </div>
                    )}

                    {vehicle.vehicleImage && (
                        <div>
                            <img
                                src={`http://localhost:3001/${vehicle.vehicleImage}`} // Assuming the image is served from this path
                                alt={vehicle.brandModel}
                                className="vehicle-image"
                            />
                        </div>
                    )}
                    <button className="go-back-button" onClick={handleGoBack}>Go Back</button>
                </div>
            ) : (
                <p>No reservation or vehicle data found.</p>
            )}
        </div>
    );
};

export default Allreservations;
