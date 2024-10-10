import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import img1 from './Images/img1.jpg';
import img2 from './Images/img2.jpg';
import img3 from './Images/img3.jpg';
import img4 from './Images/img4.jpg';
import img5 from './Images/img5.jpg';
import img6 from './Images/img6.jpg';
import img7 from './Images/img7.jpg';
import img8 from './Images/img8.jpg';
import img9 from './Images/img9.jpg';
import img10 from './Images/img10.jpg';
import img11 from './Images/img11.jpg';
import img12 from './Images/img12.jpg';
import img13 from './Images/img13.jpg';
import img14 from './Images/img14.jpg';
// Importing SVG symbols if needed
// If you're using SVG symbols, ensure they are placed appropriately or use a separate SVG file.

const HomePage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login'); // Navigate to the login page
    };
    const handleReserveClick = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn'); // Check login status

        if (isLoggedIn === 'true') {
            navigate('/booking'); // Redirect to the Booking page if logged in
        } else {
            navigate('/login'); // Redirect to the Login page if not logged in
        }
    };

    return (
        <div className='homepage'>
            {/* SVG Symbols */}
            <svg style={{ display: 'none' }}>
                <symbol id="collection" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm2 1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4zm0 1h2v4H4V4zm4 0a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H8zm0 1h2v4H8V4zm4 0a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-2zm0 1h2v4h-2V5z" />
                </symbol>
            </svg>

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
            <button className="login-button" onClick={handleLoginClick}>
                Login
            </button>
        </li>
                    </ul>
                </nav>
            </header>

            {/* About Us Section */}
            <div
                className="about-us"
            >
                <div className="about-us-content">
                    <h2>Welcome to UrbanWheels</h2>
                    <p>
                        We offer a wide range of vehicles for all your needs. Our mission is to provide top-notch service and a seamless rental experience. With a variety of cars, trucks, and vans, we cater to every type of customer, ensuring satisfaction and convenience at every step. Our dedicated team is here to assist you 24/7, ensuring your journey is smooth and enjoyable. Choose us for your next rental and experience the difference in quality and service.
                    </p>
                    <button className="btn btn-custom btn-lg" onClick={handleReserveClick}><b>Reserve a Vehicle</b></button>
                </div>
            </div>

            {/* Features Section */}
            <section id="features" className="features-section">
                <div className="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
                    <div className="col d-flex flex-column align-items-start gap-2">
                        <h2 className="fw-bold text-body-emphasis">Wide Range of Rental Vehicles</h2>
                        <img src={img4} alt="Cars" className="feature-image" />
                        <p className="text-body-secondary">
                            Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.
                        </p>
                        <a href="#" className="btn btn-custom2 btn-lg">Browse Vehicles</a>
                    </div>

                    <div className="col">
                        <div className="row row-cols-1 row-cols-sm-2 g-4">
                            {/* Feature 1 */}
                            <div className="col d-flex flex-column gap-2">
                                <div className="feature-icon-custom feature-icon-small">
                                    <img src={img11} alt="Customer Service Icon" className="feature-icon-img" />
                                </div>
                                <h4 className="fw-semibold mb-0 text-body-emphasis">24/7 Customer Support</h4>
                                <p className="text-body-secondary">
                                    Access our dedicated support team anytime you need assistance. We offer comprehensive help, from initial setup and training to ongoing technical support.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="col d-flex flex-column gap-2">
                                <div className="feature-icon-custom feature-icon-small">
                                    <img src={img1} alt="Booking Icon" className="feature-icon-img" />
                                </div>
                                <h4 className="fw-semibold mb-0 text-body-emphasis">Real-Time Booking & Reservations</h4>
                                <p className="text-body-secondary">
                                    Easily manage bookings with our intuitive interface, offering real-time availability updates and instant confirmation.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="col d-flex flex-column gap-2">
                                <div className="feature-icon-custom feature-icon-small">
                                    <img src={img13} alt="Driver Arrangement Icon" className="feature-icon-img" />
                                </div>
                                <h4 className="fw-semibold mb-0 text-body-emphasis">Driver Arrangement</h4>
                                <p className="text-body-secondary">
                                    We provide the option to arrange a professional driver along with the vehicle who can handle all driving needs, providing a stress-free and enjoyable experience.
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="col d-flex flex-column gap-2">
                                <div className="feature-icon-custom feature-icon-small">
                                    <img src={img12} alt="Extra Accessories Icon" className="feature-icon-img" />
                                </div>
                                <h4 className="fw-semibold mb-0 text-body-emphasis">Extra Accessories</h4>
                                <p className="text-body-secondary">
                                    Our range of optional accessories include GPS devices, roof racks, ski carriers and phone chargers, which can meet your specific needs and preferences.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Promo Section */}
            <div className="promo-section">
                <div className="promo-content">
                    <h1>GET UP TO 15% OFF ON GREAT CARS</h1>
                    <p>Special offer on Premium & Luxury cars</p>
                    <a href="#" className="btn">Book now</a>
                </div>
            </div>

            {/* Reviews Section */}
            <section id="reviews" className="my-5">
                <h2 className="text-center">Customer Reviews</h2>
                <div className="reviews-container">
                    <div className="review-card">
                        <h4>Great service and reliable vehicles!</h4>
                        <p>I had an amazing experience with UrbanWheels. The car was clean and the service was prompt.</p>
                        <div className="reviewer-name">- John Doe</div>
                    </div>
                    <div className="review-card">
                        <h4>Affordable prices and excellent customer support.</h4>
                        <p>The booking process was smooth and the staff were very helpful throughout.</p>
                        <div className="reviewer-name">- Jane Smith</div>
                    </div>
                    <div className="review-card">
                        <h4>Best rental experience ever!</h4>
                        <p>The variety of vehicles available is impressive and the rates are very competitive.</p>
                        <div className="reviewer-name">- Mark Wilson</div>
                    </div>
                </div>
            </section>

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

export default HomePage;
