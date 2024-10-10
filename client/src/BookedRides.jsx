import  { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const BookedRides = () => {
    const [reservations, setReservations] = useState([]); // State for booked rides
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const driverId = localStorage.getItem('driver_id'); // Get the driver ID from localStorage

    // Fetch booked rides from the server
    useEffect(() => {
        const fetchBookedRides = async () => {
            if (!driverId) {
                console.error('Driver ID not found in localStorage.');
                return;
            }

            try {
                const res = await axios.get('http://localhost:3001/reservations'); // Adjust the endpoint if necessary
                console.log('Booked rides response:', res.data);

                // Filter reservations based on driver_id
                const filteredReservations = res.data.filter(reservation =>
                    reservation.driver_id === driverId
                );

                setReservations(filteredReservations); // Set filtered booked rides
            } catch (error) {
                console.error('Error fetching booked rides:', error);
                setError('Error fetching booked rides. Please try again later.'); // Set error message
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchBookedRides();
    }, [driverId]);

    // Handle "Ride Completed" button click
    const handleRideCompleted = async (reservationId) => {
        // Confirm with the driver before marking the ride as completed
        if (window.confirm('Are you sure you want to mark this ride as completed?')) {
            try {
                // Send request to update the reservation and set driver_id to null
                const res = await axios.patch(`http://localhost:3001/reservations/${reservationId}`, {
                    driver_id: null, // Set driver_id to null to mark the ride as completed
                });
    
                if (res.status === 200) {
                    // Update the reservations state to remove the completed ride
                    setReservations(prev => prev.filter(reservation => reservation._id !== reservationId));
    
                    // Alert the driver that the ride has been marked as completed
                    alert('Ride marked as completed and email sent to the customer!');
                }
            } catch (error) {
                // Log the error and alert the driver about the issue
                console.error('Error marking ride as completed:', error);
                alert('Error marking ride as completed. Please try again.');
            }
        }
    };
    
    

    return (
        <div className="dashboard-container">
            {loading ? ( // Show loading state
                <p>Loading booked rides...</p>
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
                            className="complete-ride-button"
                            onClick={() => handleRideCompleted(reservation._id)} // Call ride completed function
                        >
                            Ride Completed
                        </button>
                    </div>
                ))
            ) : (
                <p>No booked rides found!</p>
            )}
        </div>
    );
};

export default BookedRides;
