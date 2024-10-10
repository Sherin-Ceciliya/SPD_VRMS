import React, { useState } from 'react';
import axios from 'axios';
import './Vehicle.css';
import { useNavigate } from 'react-router-dom';

const Update = () => {
    const [plateNumber, setPlateNumber] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:3001/vehicle/${plateNumber}`, { availabilityStatus: status });
            console.log(response.data);
            navigate('/staff');
            // Handle success (e.g., show a success message or redirect)
        } catch (error) {
            console.error('Error updating vehicle status:', error);
        }
    };

    return (
        <div className="vehicle-box">
            <h2 style={{ color: 'white' }}>Update Vehicle Status</h2>
            <form onSubmit={handleUpdate}>
                <label>Plate Number:</label>
                <input 
                    type="text" 
                    value={plateNumber} 
                    onChange={(e) => setPlateNumber(e.target.value)} 
                    required 
                />
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value="">Select Status</option>
                    <option value="Available">Available</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                </select>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default Update;
