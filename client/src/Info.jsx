import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Info.css'; // Create a separate CSS file for styling

const Info = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { plateNumber } = location.state || {};
    const [vehicle, setVehicle] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await fetch(`http://localhost:3001/vehicle/${plateNumber}`);
                if (!response.ok) {
                    throw new Error('Vehicle not found');
                }
                const data = await response.json();
                setVehicle(data);
            } catch (err) {
                setError(err.message);
            }
        };

        if (plateNumber) {
            fetchVehicle();
        }
    }, [plateNumber]);

    const handleBooking = () => {
        // Store the plateNumber and username in localStorage
        const username = localStorage.getItem('username'); // Retrieve stored username
        localStorage.setItem('plateNumber', plateNumber); // Store plate number
        // Navigate to display the username and plate number
        navigate('/summary');
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!vehicle) {
        return <div>Loading...</div>;
    }

    return (
        <div className="info-container">
            <h2>{vehicle.brandModel}</h2>
            <img src={`http://localhost:3001/${vehicle.vehicleImage}`} alt={vehicle.brandModel} className="vehicle-image" />
            <p>Plate Number: {vehicle.plateNumber}</p>
            <p>Rental Price: ₹{vehicle.rentalPrice}</p>
            <p>Availability Status: {vehicle.availabilityStatus}</p>
            <p>Type: {vehicle.vehicleType}</p>
            <p>Description: {vehicle.vehicleDescription}</p>
            <p>Year: {vehicle.manufactureYear}</p>

            {/* Book button */}
            <button className="book-button" onClick={handleBooking}>
                Book Vehicle
            </button>
        </div>
    );
};

export default Info;
