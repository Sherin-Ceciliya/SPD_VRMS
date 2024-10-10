import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './addDriver.css';

const Adddriver = () => {
    const [driverDetails, setDriverDetails] = useState({
        fullName: '',
        password: '',
        address: '',
        email: '',
        mobileNumber: '',
        aadharCardNumber: '',
    });
    const [licenseImage, setLicenseImage] = useState(null);
    const navigate = useNavigate();

    // Handle input change for form fields
    const handleChange = (e) => {
        setDriverDetails({
            ...driverDetails,
            [e.target.name]: e.target.value,
        });
    };

    // Handle file input change for license image
    const handleFileChange = (e) => {
        setLicenseImage(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('fullName', driverDetails.fullName);
        formData.append('password', driverDetails.password);
        formData.append('address', driverDetails.address);
        formData.append('email', driverDetails.email);
        formData.append('mobileNumber', driverDetails.mobileNumber);
        formData.append('aadharCardNumber', driverDetails.aadharCardNumber);
        formData.append('licenseImage', licenseImage);

        try {
            await axios.post('http://localhost:3001/drivers', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Driver added successfully');
            navigate('/staff');  // Redirect to Staff page after successful registration
        } catch (error) {
            console.error('Error adding driver:', error);
            alert('Failed to add driver');
        }
    };

    return (
        <div className="add-driver-container">
            <h2>Add Driver</h2>
            <form onSubmit={handleSubmit}>
                <label>Full Name:</label>
                <input type="text" name="fullName" value={driverDetails.fullName} onChange={handleChange} required />
                
                <label>Password:</label>
                <input type="password" name="password" value={driverDetails.password} onChange={handleChange} required />
                
                <label>Address:</label>
                <input type="text" name="address" value={driverDetails.address} onChange={handleChange} required />
                
                <label>Email:</label>
                <input type="email" name="email" value={driverDetails.email} onChange={handleChange} required />
                
                <label>Mobile Number:</label>
                <input type="text" name="mobileNumber" value={driverDetails.mobileNumber} onChange={handleChange} required />
                
                <label>Aadhar Card Number:</label>
                <input type="text" name="aadharCardNumber" value={driverDetails.aadharCardNumber} onChange={handleChange} required />
                
                <label>License Image:</label>
                <input type="file" onChange={handleFileChange} required />
                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Adddriver;
