import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Viewreservations = () => {
    const [reservations, setReservations] = useState([]); // State for multiple reservations
    const [vehicles, setVehicles] = useState([]); // State for multiple vehicles
    const navigate = useNavigate();

    const username = localStorage.getItem('username'); // Get username from localStorage

    useEffect(() => {
        const fetchReservationDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/reservations/${username}`);
                console.log('Reservation response:', res.data);

                if (Array.isArray(res.data) && res.data.length > 0) {
                    // Sort reservations by pickupDateTime in descending order
                    const sortedReservations = res.data.sort((a, b) => new Date(b.pickupDateTime) - new Date(a.pickupDateTime));
                    setReservations(sortedReservations); // Set sorted reservations

                    const vehiclePromises = sortedReservations.map(async (reservation) => {
                        if (reservation.plateNumber) {
                            const vehicleRes = await axios.get(`http://localhost:3001/vehicle/${reservation.plateNumber}`);
                            return vehicleRes.data;
                        }
                        return null;
                    });

                    const vehicleData = await Promise.all(vehiclePromises);
                    setVehicles(vehicleData.filter(vehicle => vehicle !== null)); // Set vehicle data, filter out any nulls
                } else {
                    console.log('No reservations found.');
                }
            } catch (error) {
                console.error('Error fetching reservation details:', error);
            }
        };

        fetchReservationDetails();
    }, [username]);

    // Handle "View Reservation" button click
    const handleView = (reservation, vehicle) => {
        localStorage.setItem('selectedReservation', JSON.stringify(reservation)); // Store reservation data in localStorage
        localStorage.setItem('selectedVehicle', JSON.stringify(vehicle)); // Store vehicle data in localStorage
        navigate('/allreservations'); // Navigate to Allreservations.jsx
    };

    return (
        <div className="dashboard-container">
            {reservations.length > 0 ? (
                reservations.map((reservation, index) => (
                    <div key={reservation._id} className="reservation-details">
                        <h3>Vehicle: {vehicles[index]?.brandModel || 'Loading...'}</h3>
                        <p>Pickup Date: {new Date(reservation.pickupDateTime).toLocaleDateString()}</p>
                        <p>Pickup Time: {new Date(reservation.pickupDateTime).toLocaleTimeString()}</p>
                        <p>Drop Date: {new Date(reservation.dropDateTime).toLocaleDateString()}</p>
                        <p>Drop Time: {new Date(reservation.dropDateTime).toLocaleTimeString()}</p>
                        <p>Total Price: ₹{reservation.totalPrice}</p>
                        <button
                            className="view-reservation-button"
                            onClick={() => handleView(reservation, vehicles[index])} // Pass reservation and vehicle data
                        >
                            View Reservation
                        </button>
                    </div>
                ))
            ) : (
                <p>No reservations yet!!</p>
            )}
        </div>
    );
};

export default Viewreservations;
