import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:3001/login', {
                username: formData.username,
                password: formData.password
            });
            const { valid, error } = response.data;
    
            if (valid) {
                // Store the username in localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', formData.username);  // Store username here
                navigate('/home');
            } else {
                setErrorMessage(error || 'Invalid login credentials');
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('An error occurred. Please try again.');
        }
    };
    

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <b>Login</b>
                <a href="/home">
                    <i className="fa fa-times" aria-hidden="true" style={{ marginLeft: '300px', marginTop: '10px',padding:"20px" ,color: 'white' }}></i>
                </a>
                <div className="input-box">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <i className="fa fa-user" aria-hidden="true"></i>
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <i className="fa fa-unlock-alt" aria-hidden="true"></i>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit" className="btn">Login</button>
            </form>
        </div>
    );
}

export default Login;
