import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Damage = () => {
    const [username, setUsername] = useState('');
    const [plateNumber, setPlateNumber] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [dropDate, setDropDate] = useState('');
    const [dropTime, setDropTime] = useState('');
    const [description, setDescription] = useState('');
    const [charge, setCharge] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const pickupDateTime = `${pickupDate}T${pickupTime}`;
        const dropDateTime = `${dropDate}T${dropTime}`;

        try {
            // Step 1: Find the reservation matching the criteria
            const reservationResponse = await axios.get('http://localhost:3001/reservations', {
                params: { username, plateNumber, pickupDateTime, dropDateTime }
            });

            if (reservationResponse.data.length > 0) {
                const reservation = reservationResponse.data[0];

                // Step 2: Retrieve email from username
                const userResponse = await axios.get(`http://localhost:3001/users/${username}`);
                const userEmail = userResponse.data.email;

                // Step 3: Send email
                await axios.post('http://localhost:3001/send-email', {
                    to: userEmail,
                    subject: `Payment for damage regarding ${plateNumber}`,
                    html: `
                        <p>Plate Number: ${plateNumber}</p>
                        <p>Pickup Date: ${pickupDate}</p>
                        <p>Pickup Time: ${pickupTime}</p>
                        <p>Drop Date: ${dropDate}</p>
                        <p>Drop Time: ${dropTime}</p>
                        <p>Description: ${description}</p>
                        <p>Charge: ${charge}</p>
                        <p>Please proceed to pay here: 
                            <a href="http://localhost:5173/pay?plateNumber=${plateNumber}&charge=${charge}">Pay Now</a>
                        </p>
                    `
                });
                

                // Step 4: Navigate to Pay.jsx
                localStorage.setItem('reservationDetails', JSON.stringify({
                    plateNumber,
                    pickupDate,
                    pickupTime,
                    dropDate,
                    dropTime,
                    description,
                    charge
                }));
                navigate('/staff');
            } else {
                alert('No reservation found matching the criteria.');
            }
        } catch (error) {
            console.error('Error processing damage report:', error);
        }
    };

    return (
        <div>
            <h2>Report Damage</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    Plate Number:
                    <input type="text" value={plateNumber} onChange={(e) => setPlateNumber(e.target.value)} required />
                </label>
                <label>
                    Pickup Date:
                    <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} required />
                </label>
                <label>
                    Pickup Time:
                    <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required />
                </label>
                <label>
                    Drop Date:
                    <input type="date" value={dropDate} onChange={(e) => setDropDate(e.target.value)} required />
                </label>
                <label>
                    Drop Time:
                    <input type="time" value={dropTime} onChange={(e) => setDropTime(e.target.value)} required />
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <label>
                    Charge:
                    <input type="number" value={charge} onChange={(e) => setCharge(e.target.value)} required />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Damage;
