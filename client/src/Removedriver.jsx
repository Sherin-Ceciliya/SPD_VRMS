import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Removedriver.css'; // Optional: CSS for styling

const Removedriver = () => {
    const [email, setEmail] = useState(''); // Unique identifier for the driver
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:3001/drivers/remove`, { data: { email } });
            if (response.data.success) {
                alert('Driver removed successfully');
                setError('');
                navigate('/staff'); // Redirect to staff page on success
            } else {
                setError('Failed to remove driver. Please try again.');
                setSuccess('');
            }
        } catch (err) {
            console.error('Error removing driver:', err);
            setError('An error occurred while removing the driver.');
            setSuccess('');
        }
    };

    return (
        <div className="remove-driver-container">
            <h2>Remove Driver</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Driver's Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
                <button type="submit">Remove Driver</button>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </form>
        </div>
    );
};

export default Removedriver;

