import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Modify.css';

const Modify = () => {
    const [addonName, setAddonName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [addons, setAddons] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all available add-ons to display
        const fetchAddons = async () => {
            try {
                const response = await fetch('http://localhost:3001/addons');
                const data = await response.json();
                setAddons(data);
            } catch (err) {
                setError('Failed to fetch add-ons');
            }
        };
        fetchAddons();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/addon/${addonName}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to modify add-on');
            }

            navigate('/success'); // Redirect to success page after modification
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form className="modify-form" onSubmit={handleSubmit}>
            <h2>Modify Add-on</h2>
            {error && <p className="error">{error}</p>}
            <div>
                <label>Select Add-on:</label>
                <select
                    value={addonName}
                    onChange={(e) => setAddonName(e.target.value)}
                    required
                >
                    <option value="">Select add-on</option>
                    {addons.map((addon) => (
                        <option key={addon.addonName} value={addon.addonName}>
                            {addon.addonName} (Available: {addon.quantityAvailable})
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>New Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="0"
                    required
                />
            </div>
            <button type="submit">Modify Add-on</button>
        </form>
    );
};

export default Modify;
