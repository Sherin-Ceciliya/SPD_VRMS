import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Add.css';

const Add = () => {
    const [addonName, setAddonName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/addon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    addonName,
                    quantityAvailable: quantity, // Ensure you send quantity as quantityAvailable
                    priceOfAddon:price
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add add-on');
            }
    
            navigate('/success'); // Redirect to success page after adding
        } catch (err) {
            setError(err.message);
        }
    };
    
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h2>Add Add-on</h2>
            {error && <p className="error">{error}</p>}
            <div>
                <label>Add-on Name:</label>
                <input
                    type="text"
                    value={addonName}
                    onChange={(e) => setAddonName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                    required
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Add-on</button>
        </form>
    );
};

export default Add;