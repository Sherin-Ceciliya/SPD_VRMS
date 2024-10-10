import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Booking = () => {
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [dropDate, setDropDate] = useState('');
    const [dropTime, setDropTime] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'pickupDate') setPickupDate(value);
        if (name === 'pickupTime') setPickupTime(value);
        if (name === 'dropDate') setDropDate(value);
        if (name === 'dropTime') setDropTime(value);
        if (name === 'vehicleType') setVehicleType(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const pickupDateTime = `${pickupDate}T${pickupTime}`;
            const dropDateTime = `${dropDate}T${dropTime}`;
    
            const response = await axios.post('http://localhost:3001/search-vehicles', {
                pickupDate: pickupDateTime,
                dropDate: dropDateTime,
                vehicleType,
            });
    
            if (response.data.error) {
                setError(response.data.error);
            } else if (Array.isArray(response.data)) {
                const availableVehicles = response.data;
    
                localStorage.setItem('pickupDateTime', pickupDateTime);
                localStorage.setItem('dropDateTime', dropDateTime);
                localStorage.setItem('vehicleType', vehicleType);
    
                navigate('/display', { state: { availableVehicles } });
                setError('');
            } else {
                navigate('/error');
            }
        } catch (error) {
            console.error('Error fetching vehicles:', error);
            setError('Enter valid time!!');
        }
    };
    
    
    return (
        <div className="booking-container">
            <div className="booking-box">
                <form onSubmit={handleSubmit}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <label htmlFor="pickup-date">Pick-up Date:</label>
                    <input type="date" id="pickup-date" name="pickupDate" onChange={handleChange} required />

                    <label htmlFor="pickup-time">Pick-up Time:</label>
                    <input type="time" id="pickup-time" name="pickupTime" onChange={handleChange} required />

                    <label htmlFor="drop-date">Drop Date:</label>
                    <input type="date" id="drop-date" name="dropDate" onChange={handleChange} required />

                    <label htmlFor="drop-time">Drop Time:</label>
                    <input type="time" id="drop-time" name="dropTime" onChange={handleChange} required />

                    <label htmlFor="vehicle-type">Vehicle Type:</label>
                    <select id="vehicle-type" name="vehicleType" onChange={handleChange} required>
                        <option value="Bike">Bike</option>
                        <option value="Scooter">Scooter</option>
                        <option value="Car">Car</option>
                    </select>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Booking;
