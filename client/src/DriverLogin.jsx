import React, { useState } from 'react';
import axios from 'axios';
import './DriverLogin.css';
import { useNavigate } from 'react-router-dom';

function DriverLogin() {
    const [formData, setFormData] = useState({
        driver_id: '',
        passcode: ''
    });
    const [errorMessage, setErrorMessage] = useState('');  // Add state for error messages
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/driver/login', {  // Ensure the endpoint is correct
                driver_id: formData.driver_id,  // Use formData correctly
                passcode: formData.passcode
            });
            console.log(response);
            if (response.data.valid) {  // Check for the correct response structure
                sessionStorage.setItem('driver_id', formData.driver_id);
                navigate('/driverHome');
            } else {
                setErrorMessage(response.data.error || 'Invalid login credentials');  // Set error message
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('An error occurred. Please try again.');  // Show error if an exception occurs
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <b>Driver Login</b>
                <a href="/home">
                    <i className="fa fa-times" aria-hidden="true" style={{ marginLeft: '300px', marginTop: '10px', padding: "20px", color: 'white' }}></i>
                </a>
                <div className="input-box">
                    <input
                        type="text"
                        name="driver_id"
                        placeholder="Driver ID"
                        value={formData.driver_id}
                        onChange={handleChange}
                        required
                    />
                    <i className="fa fa-id-badge" aria-hidden="true"></i>
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        name="passcode"
                        placeholder="Passcode"
                        value={formData.passcode}
                        onChange={handleChange}
                        required
                    />
                    <i className="fa fa-unlock-alt" aria-hidden="true"></i>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}  {/* Display error message */}
                <button type="submit" className="btn">Login</button>
            </form>
        </div>
    );
}

export default DriverLogin;
