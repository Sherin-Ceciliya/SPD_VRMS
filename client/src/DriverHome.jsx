import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './DriverHome.css'; // Create this CSS file for custom styling if needed
import './Home.css'; // Reuse existing styles
import img2 from './Images/img2.jpg';

const DriverHome = () => {
    const navigate = useNavigate();
    const driverId = sessionStorage.getItem('driver_id');

    if (!driverId) {
        navigate('/login'); // Redirect to login if not logged in
    }
    
    const handleBookedRidesClick = () => {
        navigate('/bookedRides', { state: { driverId } });
    };

    const handleRideRequestsClick = () => {
        navigate('/rideRequests', { state: { driverId } });
    };

    return (
        <div className='driver-home'>
            {/* Header */}
            <header className="header">
                <div className="logo">
                    <img src={img2} alt="Company Logo" />
                    <h1>UrbanWheels</h1>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#reserve">Reserve</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li>
                            <button className="login-button" onClick={() => navigate('/login')}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* Dashboard Content */}
            <div className="dashboard-content">
                <h1>Driver Dashboard</h1>
                <h2>Welcome, Driver {driverId}</h2>
                <div className="dashboard-options">
                    <button className="btn btn-primary" onClick={handleBookedRidesClick}>
                        Booked Rides
                    </button>
                    <button className="btn btn-primary" onClick={handleRideRequestsClick}>
                        Ride Requests
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer>
                <div className="footer-section">
                    <h3>Branches</h3>
                    <ul>
                        <li><a href="#home">Chennai</a></li>
                        <li><a href="#about">Bangalore</a></li>
                        <li><a href="#reserve">Mumbai</a></li>
                        <li><a href="#contact">Hyderabad</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Contact</h3>
                    <p>Email: urbanwheels@vehiclerentals.com</p>
                    <p>Phone: +1 800 123 4567</p>
                </div>
                <div className="footer-section">
                    <h3>Shortcuts</h3>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#reserve">Reserve</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default DriverHome;
