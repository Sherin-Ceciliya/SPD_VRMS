import React, { useState } from 'react';
import './Vehicle.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Vehicle = () => {
    const [vehicleData, setVehicleData] = useState({
        vehicleType: '',
        brandModel: '',
        manufactureYear: '',
        seatingCapacity: '',
        fuelType: '',
        rentalPrice: '',
        availabilityStatus: '',
        vehicleDescription: '',
        mileage: '',
        vehicleImage: null,
        plateNumber: '' ,
        ACAvailability:'' 
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setVehicleData({
            ...vehicleData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in vehicleData) {
            formData.append(key, vehicleData[key]);
        }

        try {
            const response = await axios.post('http://localhost:3001/vehicle', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            navigate('/staff');
            // Handle success, redirect or display a success message
        } catch (error) {
            console.error('Error submitting vehicle details', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="vehicle-box">
            <div>
                <label>Plate Number: </label>
                <input type="text" name="plateNumber" value={vehicleData.plateNumber} onChange={handleChange} required />
            </div>
            <div>
                <label>Vehicle Type: </label>
                <input type="text" name="vehicleType" value={vehicleData.vehicleType} onChange={handleChange} required />
            </div>

            <div>
                <label>Brand/Model: </label>
                <input type="text" name="brandModel" value={vehicleData.brandModel} onChange={handleChange} required />
            </div>

            <div>
                <label>Year of Manufacture: </label>
                <input type="number" name="manufactureYear" value={vehicleData.manufactureYear} onChange={handleChange} required />
            </div>

            <div>
                <label>Seating Capacity: </label>
                <input type="number" name="seatingCapacity" value={vehicleData.seatingCapacity} onChange={handleChange} required />
            </div>

            <div>
                <label>Fuel Type: </label>
                <input type="text" name="fuelType" value={vehicleData.fuelType} onChange={handleChange} required />
            </div>

            <div>
                <label>Rental Price per Hour: </label>
                <input type="number" name="rentalPrice" value={vehicleData.rentalPrice} onChange={handleChange} required />
            </div>

            <div>
                <label><pre>Availability Status:   </pre></label>
                <select name="availabilityStatus" value={vehicleData.availabilityStatus} onChange={handleChange} required>
                    <option value="">Select Status</option>
                    <option value="Available">Available</option>
                    <option value="Rented">Rented</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                </select>
            </div>


            <div>
                <label>Vehicle Description: </label>
                <input type="text" name="vehicleDescription" value={vehicleData.vehicleDescription} onChange={handleChange} />
            </div>

            <div>
                <label>Mileage (km): </label>
                <input type="number" name="mileage" value={vehicleData.mileage} onChange={handleChange} required />
            </div>
            <div>
                <label><pre>AC Availability:   </pre></label>
                <select name="ACAvailability" value={vehicleData.ACAvailability} onChange={handleChange} required>
                    <option value="">Select Status</option>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                </select>
            </div>
            <div>
                <label>Vehicle Image: </label>
                <input type="file" name="vehicleImage" accept="image/*" onChange={handleChange} required />
            </div>

            <center><button type="submit">Submit</button></center>
            </div>
        </form>
    );
};

export default Vehicle;