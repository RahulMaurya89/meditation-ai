import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './Login.css';

const Login = ({ onLogin }) => {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (phone && phone.length > 10) {
            onLogin(phone);
        } else {
            setError('Please enter a valid phone number.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card" >
                <h1 className="login-title">Access Your Dashboard</h1>
                <p className="login-subtitle">Enter your phone number to continue.</p>
                <form onSubmit={handleSubmit}>
                    <div className="phone-input-wrapper">
                        <PhoneInput
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={setPhone}
                            international
                            defaultCountry="US" // The library will attempt to auto-detect, this is a fallback
                            countryCallingCodeEditable={false}
                        />
                    </div>
                    {error && <p className="login-error">{error}</p>}
                    <button type="submit" className="btn-login">
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;