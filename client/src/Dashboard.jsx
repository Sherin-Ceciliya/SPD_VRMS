import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Vehicle.css'; // Use the same CSS for styling

const StaffHome = () => {
    const navigate = useNavigate();

    return (
        <div className="vehicle-box">
            <h2 style={{ color: 'white' }}>What do you need to do?</h2>
            <button onClick={() => navigate('/viewreservations')}>View reservations</button>
            <button onClick={() => navigate('/cancelreservation')}>Cancel reservation</button>
        </div>
    );
};

export default StaffHome;
