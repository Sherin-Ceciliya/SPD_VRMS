import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DriverLogin.css'; // Optional: CSS for styling

const DriverLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/drivers/login', { email, password });
            if (response.data.success) {
                // Navigate to /ok if login is successful
                navigate('/ok');
            } else {
                setError('Invalid email or password. Please try again.');
            }
        } catch (err) {
            console.error('Error logging in:', err);
            setError('An error occurred while logging in.');
        }
    };

    return (
        <div className="driver-login-container">
            <h2>Driver Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email ID:</label>
                <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default DriverLogin;
