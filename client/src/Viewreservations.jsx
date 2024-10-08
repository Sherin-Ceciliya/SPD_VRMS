import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const RideRequests = () => {
    const [reservations, setReservations] = useState([]); // State for ride requests
    const navigate = useNavigate();

    // Fetch ride requests from the server
    useEffect(() => {
        const fetchRideRequests = async () => {
            try {
                const res = await axios.get('http://localhost:3001/reservations'); // Adjust the endpoint if necessary
                console.log('Ride requests response:', res.data);

                // Filter reservations based on the criteria
                const filteredReservations = res.data.filter(reservation => 
                    reservation.driver_id === null &&
                    reservation.driving === false &&
                    reservation.ride_status === 'waiting'
                );

                if (filteredReservations.length > 0) {
                    setReservations(filteredReservations); // Set filtered ride requests
                } else {
                    console.log('No ride requests found.');
                }
            } catch (error) {
                console.error('Error fetching ride requests:', error);
            }
        };

        fetchRideRequests();
    }, []);

    // Handle "View Request" button click
    const handleView = (reservation) => {
        localStorage.setItem('selectedReservation', JSON.stringify(reservation)); // Store reservation data in localStorage
        navigate('/allreservations'); // Navigate to AllReservations.jsx
    };

    return (
        <div className="dashboard-container">
            {reservations.length > 0 ? (
                reservations.map((reservation) => (
                    <div key={reservation._id} className="reservation-details">
                        <h3>Customer Name: {reservation.customer_name}</h3>
                        <p>Pickup Date: {new Date(reservation.pickup_date).toLocaleDateString()}</p>
                        <p>Pickup Time: {reservation.pickup_time}</p>
                        <p>Drop Date: {new Date(reservation.drop_date).toLocaleDateString()}</p>
                        <p>Drop Time: {reservation.drop_time}</p>
                        <p>Total Price: ₹{reservation.totalPrice}</p>
                        <button
                            className="view-reservation-button"
                            onClick={() => handleView(reservation)} // Pass reservation data
                        >
                            View Request
                        </button>
                    </div>
                ))
            ) : (
                <p>No ride requests yet!</p>
            )}
        </div>
    );
};

export default RideRequests;
