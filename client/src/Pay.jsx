import React from 'react';
import { useNavigate } from 'react-router-dom';

const Pay = () => {
    const navigate = useNavigate();
    const reservationDetails = JSON.parse(localStorage.getItem('reservationDetails'));

    const handlePay = () => {
        // Redirect to success page after payment logic
        navigate('/success');
    };

    return (
        <div>
            <h2>Payment Details</h2>
            <p>Plate Number: {reservationDetails.plateNumber}</p>
            <p>Pickup Date: {reservationDetails.pickupDate}</p>
            <p>Pickup Time: {reservationDetails.pickupTime}</p>
            <p>Drop Date: {reservationDetails.dropDate}</p>
            <p>Drop Time: {reservationDetails.dropTime}</p>
            <p>Description: {reservationDetails.description}</p>
            <p>Charge: {reservationDetails.charge}</p>
            <button onClick={handlePay}>Pay</button>
        </div>
    );
};

export default Pay;
