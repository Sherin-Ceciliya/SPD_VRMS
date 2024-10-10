import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Cancelreservation = () => {
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
                    const currentTimePlusOneHour = new Date();
                    currentTimePlusOneHour.setHours(currentTimePlusOneHour.getHours() + 1);

                    // Filter out reservations where the pickup time is before one hour from the current time
                    const filteredReservations = res.data.filter(reservation => 
                        new Date(reservation.pickupDateTime) >= currentTimePlusOneHour
                    );

                    // Sort the remaining reservations by pickupDateTime in descending order
                    const sortedReservations = filteredReservations.sort(
                        (a, b) => new Date(b.pickupDateTime) - new Date(a.pickupDateTime)
                    );

                    setReservations(sortedReservations); // Set filtered and sorted reservations

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

    const handleCancel = async (reservationId) => {
        try {
            await axios.delete(`http://localhost:3001/reservations/cancel/${reservationId}`);
            alert('Reservation cancelled successfully.');
            navigate('/home'); // Redirect to home page after cancellation
        } catch (error) {
            console.error('Error cancelling reservation:', error);
            alert('Failed to cancel the reservation.');
        }
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
                        <button className="cancel-button" onClick={() => handleCancel(reservation._id)}>Cancel Reservation</button>
                    </div>
                ))
            ) : (
                <p>No reservations yet!!</p>
            )}
        </div>
    );
};

export default Cancelreservation;
