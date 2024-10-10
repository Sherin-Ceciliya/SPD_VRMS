import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const RideRequests = () => {
    const [reservations, setReservations] = useState([]); // State for ride requests
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate();
    const driverId = localStorage.getItem('driver_id'); // Get the driver ID from localStorage or session

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

                setReservations(filteredReservations); // Set filtered ride requests
            } catch (error) {
                console.error('Error fetching ride requests:', error);
                setError('Error fetching ride requests. Please try again later.'); // Set error message
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchRideRequests();
    }, []);

    // Handle "View Request" button click
    const handleView = (reservation) => {
        localStorage.setItem('selectedReservation', JSON.stringify(reservation)); // Store reservation data in localStorage
        navigate('/allreservations'); // Navigate to AllReservations.jsx
    };

    // Handle "Take Request" button click
    const handleTakeRequest = async (reservationId) => {
        if (!driverId) {
            console.error('Driver ID not found in localStorage.');
            return;
        }

        if (window.confirm('Are you sure you want to take this ride request?')) { // Confirmation before taking request
            try {
                const res = await axios.patch(`http://localhost:3001/reservations/${reservationId}`, {
                    driver_id: driverId,  // Update driver ID
                    ride_status: 'taken',  // Update ride status
                });

                if (res.status === 200) {
                    // Update the reservations state to reflect the changes
                    setReservations(prev => prev.filter(reservation => reservation._id !== reservationId));
                    console.log('Reservation taken successfully:', res.data);
                    alert('Reservation taken successfully!'); // Optional feedback to the user
                }
            } catch (error) {
                console.error('Error taking ride request:', error);
                setError('Error taking ride request. Please try again.'); // Set error message
            }
        }
    };

    return (
        <div className="dashboard-container">
            {loading ? ( // Show loading state
                <p>Loading ride requests...</p>
            ) : error ? ( // Show error message
                <p className="error-message">{error}</p>
            ) : reservations.length > 0 ? (
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
                        <button
                            className="take-request-button"
                            onClick={() => handleTakeRequest(reservation._id)} // Call take request function
                        >
                            Take Request
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
