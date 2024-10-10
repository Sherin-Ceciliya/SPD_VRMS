import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/home');
    };

    return (
        <div className="success-container">
            <h2>No vehicles available for the selected criteria!</h2>
            <button onClick={goToHome}>Go to Home</button>
        </div>
    );
};

export default Success;
