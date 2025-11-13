import React, { useState, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // Reusing styles from Auth.css

const Login = ({ onLogin }) => {
  const [phone, setPhone] = useState("");
  const [fullPhone, setFullPhone] = useState("");
  const [iti, setIti] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializePhoneInput = () => {
      if (inputRef.current) {
        const instance = window.intlTelInput(inputRef.current, {
          initialCountry: "auto",
          geoIpLookup: (callback) => {
            fetch("https://ipapi.co/json")
              .then((res) => res.json())
              .then((data) => callback(data.country_code))
              .catch(() => callback("us"));
          },
          utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
          separateDialCode: true,
          preferredCountries: ["us", "gb", "ca"],
        });
        setIti(instance);
      }
    };

    if (!window.intlTelInput) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js";
      script.onload = initializePhoneInput;
      document.head.appendChild(script);
    } else {
      initializePhoneInput();
    }

    return () => {
      iti?.destroy();
    };
  }, []);

  const handlePhoneChange = (value) => {
    setPhone(value);
    if (iti && value.trim()) {
      setFullPhone(iti.getNumber());
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!iti?.isValidNumber()) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    const number = iti.getNumber();
    sessionStorage.setItem("userPhone", number);
    if (onLogin) {
      onLogin({ phone: number });
    }
    toast.success("Login successful!");
    // The parent component should now re-render to show the dashboard content
  };

  return (
    <div id="auth" className="auth-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="auth-shell">
        <Toaster position="top-center" containerStyle={{ marginTop: "5%" }} />
        <div className="auth-container" style={{ justifyContent: 'center' }}>
          <section className="auth-right" style={{ display: 'grid', gridColumn: '1/4', justifyContent: 'center' }}>
            <div className="auth-card" style={{display:"grid", gridColumn:'1/4', justifyContent:'center' }}>
              <div className="auth-form-container" style={{display:"grid", gridColumn:'1/4', justifyContent:'center'}}>
                <div className="auth-form-wrapper active">
                  <div className="auth-card-header">
                    <div>
                      <h3>Login to Dashboard</h3>
                      <p>Please enter your phone number to continue.</p>
                    </div>
                  </div>
                  <form onSubmit={handleLogin} className="auth-form">
                    <label htmlFor="phone_login">Phone number</label>
                    <input
                      id="phone_login"
                      type="tel"
                      className="auth-input"
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="Enter your phone number"
                      ref={inputRef}
                      required
                    />
                    <button type="submit" className="auth-button primary">
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;