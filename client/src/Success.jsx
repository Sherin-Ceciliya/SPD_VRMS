import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/home');
    };

    return (
        <div className="success-container">
            <h2>Payment Successful!</h2>
            <p>Your booking has been confirmed successfully.</p>
            <button onClick={goToHome}>Go to Home</button>
        </div>
    );
};

export default Success;
