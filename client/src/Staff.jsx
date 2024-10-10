import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Vehicle.css'; // Use the same CSS for styling

const StaffHome = () => {
    const navigate = useNavigate();

    return (
        <div className="vehicle-box">
            <h2 style={{ color: 'white' }}>What do you need to do?</h2>
            <button onClick={() => navigate('/vehicle')}>Add a New Vehicle</button>
            <button onClick={() => navigate('/update')}>Update Vehicle Status</button>
            <button onClick={() => navigate('/add')}>Add a new add-on</button>
            <button onClick={() => navigate('/modify')}>Update add-on Status</button>
            <button onClick={() => navigate('/addDriver')}>Add a driver</button>
            <button onClick={() => navigate('/removeDriver')}>Remove a driver</button>
            <button onClick={() => navigate('/damage')}>Charge for damage</button>
        </div>
    );
};

export default StaffHome;
