import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Summary.css'; // Link to your CSS file

function Summary() {
    const [summaryData, setSummaryData] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate
    const pickupDateTime = localStorage.getItem('pickupDateTime');
    const dropDateTime = localStorage.getItem('dropDateTime');
    const [formData, setFormData] = useState({
        address: '',
        mobile: '',
        aadharCard: '',
        driving: true,
        licenseImage: null,
        selectedAddOns: []
    });
    const [addOns, setAddOns] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAddOns = async () => {
            try {
                const response = await axios.post('http://localhost:3001/check-addons', {
                    pickupDate: pickupDateTime,
                    dropDate: dropDateTime,
                });
                console.log(response.data);
                setAddOns(response.data);
            } catch (err) {
                console.error('Error fetching add-ons:', err);
                setError('Failed to load add-ons');
            }
        };
        fetchAddOns();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Save form data to local storage
        localStorage.setItem('summaryData', JSON.stringify(formData));
        
        // Assuming vehicle details are stored in local storage
        const vehicleData = {
            plateNumber: localStorage.getItem('plateNumber'), // Retrieve plate number from local storage
            // You can add more vehicle details here
        };
        localStorage.setItem('vehicleData', JSON.stringify(vehicleData));

        // Navigate to Confirm.jsx
        navigate('/confirm'); // Change '/confirm' to the correct route for Confirm.jsx
    };

    const handleAddOnSelection = (addOnName, quantity) => {
        const selectedAddOns = [...formData.selectedAddOns];
        const existingAddOn = selectedAddOns.find((addOn) => addOn.addOnName === addOnName);

        if (existingAddOn) {
            existingAddOn.quantity = quantity;
        } else {
            selectedAddOns.push({ addOnName, quantity });
        }

        setFormData({ ...formData, selectedAddOns });
    };

    const handleCheckboxChange = (addon, isChecked) => {
        if (isChecked) {
            // Checkbox checked, initialize quantity to 1
            handleAddOnSelection(addon.name, 1);
        } else {
            // Checkbox unchecked, remove the add-on from selectedAddOns
            setFormData({
                ...formData,
                selectedAddOns: formData.selectedAddOns.filter((addOn) => addOn.addOnName !== addon.name)
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Address, mobile, aadhar fields */}
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
            />
            <input
                type="text"
                name="mobile"
                placeholder="Mobile"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                required
            />
            <input
                type="text"
                name="aadharCard"
                placeholder="Aadhar Card Number"
                value={formData.aadharCard}
                onChange={(e) => setFormData({ ...formData, aadharCard: e.target.value })}
                required
            />

            {/* Driving option */}
            <label>
                <input
                    type="checkbox"
                    checked={formData.driving}
                    onChange={(e) => setFormData({ ...formData, driving: e.target.checked })}
                />
                Are you driving?
            </label>

            {formData.driving && (
                <div>
                    <label>Upload License Image:</label>
                    <input
                        type="file"
                        name="licenseImage"
                        onChange={(e) => setFormData({ ...formData, licenseImage: e.target.files[0] })}
                        required
                    />
                </div>
            )}

            {/* Add-ons section */}
            {addOns.length > 0 && (
                <div>
                    <h3>Select Add-ons</h3>
                    {addOns.map((addon) => (
                        <div key={addon._id} className="addon-item">
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleCheckboxChange(addon, e.target.checked)}
                                />
                                {addon.name} (Available: {addon.quantity})
                            </label>
                            {formData.selectedAddOns.some((addOn) => addOn.addOnName === addon.name) && (
                                <div className="quantity-input">
                                    <label>Quantity:</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max={addon.quantity}
                                        value={formData.selectedAddOns.find((addOn) => addOn.addOnName === addon.name)?.quantity || ''}
                                        onChange={(e) => handleAddOnSelection(addon.name, Math.min(e.target.value, addon.quantity))}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {error && <p className="error">{error}</p>} {/* Display error if there is one */}

            <button type="submit">Book</button>
        </form>
    );
}

export default Summary;
