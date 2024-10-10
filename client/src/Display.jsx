import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Display.css';

const Display = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { availableVehicles } = location.state || { availableVehicles: [] };

    const handleViewClick = (plateNumber) => {
        navigate('/info', { state: { plateNumber } });
    };

    return (
        <div className="display-container">
            <h2>Available Vehicles</h2>
            {availableVehicles.length === 0 ? (
                <p>No vehicles available for the selected criteria.</p>
            ) : (
                <ul>
                    {availableVehicles.map((vehicle) => (
                        <li key={vehicle._id} className="vehicle-item">
                            {/* Check if vehicleImage exists */}
                            {vehicle.vehicleImage ? (
                                <img 
                                    src={`http://localhost:3001/${vehicle.vehicleImage}`} 
                                    alt={vehicle.brandModel} 
                                    className="vehicle-image" 
                                />
                            ) : (
                                <p>No image available</p>
                            )}
                            <div className="vehicle-info">
                                <h3>
                                    {vehicle.brandModel} - Price Per Hour: ₹{vehicle.rentalPrice}
                                </h3>
                                <p>Plate Number: {vehicle.plateNumber}</p>
                            </div>
                            <button className="view-button" onClick={() => handleViewClick(vehicle.plateNumber)}>
                                View
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Display;
