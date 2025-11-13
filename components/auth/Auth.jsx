import React, { useState, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import "./Auth.css";

const Auth = ({ onLogin }) => { // Accept onLogin as a prop
  const [nameQuickstart, setNameQuickstart] = useState("");
  const [phoneQuickstart, setPhoneQuickstart] = useState("");
  const [emailQuickstart, setEmailQuickstart] = useState("");
  const [phoneFull, setPhoneFull] = useState("");
  const [fullPhoneQuickstart, setFullPhoneQuickstart] = useState("");
  const [fullPhoneFull, setFullPhoneFull] = useState("");
  const [itiQuickstart, setItiQuickstart] = useState(null);
  const [itiFull, setItiFull] = useState(null);
  const [trialPhone, setTrialPhone] = useState("");
  const [authMode, setAuthMode] = useState("demo"); // 'demo' or 'full'

  const quickInputRef = useRef(null);
  const fullInputRef = useRef(null);

  // Initialize phone inputs
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const phone = urlParams.get("phone") || "";
    setTrialPhone(phone);
    setPhoneQuickstart(phone);
    setPhoneFull(phone);

    let quickInstance = null;
    let fullInstance = null;

    const initializePhoneInputs = () => {
      if (quickInputRef.current) {
        quickInstance = window.intlTelInput(quickInputRef.current, {
          initialCountry: "auto",
          geoIpLookup: (callback) => {
            fetch("https://ipapi.co/json")
              .then((res) => res.json())
              .then((data) => callback(data.country_code))
              .catch(() => callback("us"));
          },
          utilsScript:
            "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
          separateDialCode: true,
          preferredCountries: ["us", "gb", "ca"],
        });
        setItiQuickstart(quickInstance);
      }

      if (fullInputRef.current) {
        fullInstance = window.intlTelInput(fullInputRef.current, {
          initialCountry: "auto",
          geoIpLookup: (callback) => {
            fetch("https://ipapi.co/json")
              .then((res) => res.json())
              .then((data) => callback(data.country_code))
              .catch(() => callback("us"));
          },
          utilsScript:
            "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
          separateDialCode: true,
          preferredCountries: ["us", "gb", "ca"],
        });
        setItiFull(fullInstance);
      }
    };

    if (!window.intlTelInput) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js";
      script.onload = initializePhoneInputs;
      document.head.appendChild(script);
    } else {
      initializePhoneInputs();
    }

    return () => {
      quickInstance?.destroy();
      fullInstance?.destroy();
    };
  }, []);

  const updateFullPhoneNumbers = () => {
    if (itiQuickstart && phoneQuickstart.trim()) {
      setFullPhoneQuickstart(itiQuickstart.getNumber());
    }
    if (itiFull && phoneFull.trim()) {
      setFullPhoneFull(itiFull.getNumber());
    }
  };

  const handlePhoneChange = (value, type) => {
    if (type === "quickstart") {
      setPhoneQuickstart(value);
      if (itiQuickstart && value.trim()) {
        setFullPhoneQuickstart(itiQuickstart.getNumber());
      }
    } else {
      setPhoneFull(value);
      if (itiFull && value.trim()) {
        setFullPhoneFull(itiFull.getNumber());
      }
    }
  };

  // Quickstart Demo Call
  const handleQuickStart = async (e) => {
    e.preventDefault();
    updateFullPhoneNumbers();

    const fullNumber =
      fullPhoneQuickstart ||
      (itiQuickstart ? itiQuickstart.getNumber() : phoneQuickstart);

    if (!itiQuickstart?.isValidNumber()) {
      toast.error("Please enter a valid phone number");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailQuickstart)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!nameQuickstart.trim()) {
      toast.error("Please enter your name");
      return;
    }

    // --- SAVE USER DATA TO LOCAL SESSION ---
    if (onLogin) {
      onLogin({
        phone: fullNumber,
        name: nameQuickstart,
        email: emailQuickstart,
      });
    }
    // -----------------------------------------

    toast.success("📞 Requesting your demo call...");

    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL || "https://maya-system.onrender.com"
        }/maya-api/companion-demo/${encodeURIComponent(
          fullNumber
        )}?email=${encodeURIComponent(emailQuickstart)}&name=${encodeURIComponent(
          nameQuickstart
        )}`;

      const response = await fetch(apiUrl, { method: "POST" });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to initiate call");
      }

      toast.success("✅ Maya is calling you now! Please answer your phone.");
    } catch (error) {
      toast.error(`❌ ${error.message}`);
    }
  };

  // Full registration via Google OAuth
  const handleFullRegistration = async (e) => {
    e.preventDefault();
    updateFullPhoneNumbers();

    const phone = fullPhoneFull || (itiFull ? itiFull.getNumber() : phoneFull);

    if (!itiFull?.isValidNumber()) {
      toast.error("Please enter a valid phone number");
      return;
    }

    try {
      const apiBase =
        import.meta.env.VITE_API_BASE_URL || "https://maya-system.onrender.com";

      const checkUserResponse = await fetch(
        `${apiBase}/maya-api/check-user/${encodeURIComponent(phone)}`
      );
      const userExistsData = await checkUserResponse.json();

      if (userExistsData.exists) {
        toast.error("This phone number is already registered.");
        return;
      }

      toast.success("Redirecting to Google...");

      const response = await fetch(
        `${apiBase}/maya-api/auth/google?phone=${encodeURIComponent(phone)}`
      );

      if (!response.ok) {
        throw new Error("Failed to get authorization URL");
      }

      const data = await response.json();

      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        throw new Error("No authorization URL received");
      }
    } catch (error) {
      toast.error(`❌ ${error.message}`);
    }
  };

  return (
    <div id="auth" className="auth-page">
      <div className="auth-shell">
        <Toaster position="top-center" containerStyle={{ marginTop: "5%" }} />
        <div className="auth-container">
          <section className="auth-right">
            {trialPhone && (
              <div className="auth-alert info">
                📞 Welcome back! Ready for another call?
              </div>
            )}

            <div className="auth-card">
              <div className="auth-toggle">
                <span
                  onClick={() => setAuthMode("demo")}
                  className={`auth-toggle-btn ${authMode === "demo" ? "active" : ""
                    }`}
                >
                  Start Free Session
                </span>
              </div>

              <div className="auth-form-container">
                <div
                  className={`auth-form-wrapper ${authMode === "demo" ? "active" : ""
                    }`}
                >
                  <div className="auth-card-header">
                    <div className="auth-card-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#fa8080ff"
                      >
                        <path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z" />
                      </svg>
                    </div>
                    <div>
                      <h3>Instant Meditation Session</h3>
                      <p>Start your journey to inner peace—no account required, just begin meditating.</p>
                    </div>
                  </div>

                  <form onSubmit={handleQuickStart} className="auth-form">
                    <label htmlFor="name_quickstart">Name</label>
                    <input
                      id="name_quickstart"
                      type="text"
                      className="auth-input"
                      value={nameQuickstart}
                      onChange={(e) => setNameQuickstart(e.target.value)}
                      placeholder="Your Nickname"
                      ref={quickInputRef} // optional if you want to focus
                      required
                    />

                    <label htmlFor="phone_quickstart">Phone number</label>
                    <input
                      id="phone_quickstart"
                      type="tel"
                      className="auth-input"
                      value={phoneQuickstart}
                      onChange={(e) =>
                        handlePhoneChange(e.target.value, "quickstart")
                      }
                      placeholder="Phone number"
                      ref={quickInputRef}
                      required
                    />

                    <label htmlFor="email_quickstart">Email address</label>
                    <input
                      id="email_quickstart"
                      type="email"
                      className="auth-input"
                      value={emailQuickstart}
                      onChange={(e) => setEmailQuickstart(e.target.value)}
                      placeholder="Email address"
                      required
                    />

                    <button type="submit" className="auth-button primary" style={{ background: "#8b5cf6", boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)" }}>
                      Begin My Journey
                    </button>
                    <p className="auth-card-note">
                      Free meditation session • No credit card required
                    </p>
                  </form>
                </div>

                <div
                  className={`auth-form-wrapper ${authMode === "full" ? "active" : ""
                    }`}
                >
                  <div className="auth-card-header">
                    <div className="auth-card-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#8453d3ff"
                      >
                        <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
                      </svg>
                    </div>
                    <div>
                      <h3 >Unlock Premium Access</h3>
                      <p>
                        Access advanced meditation programs, personalized sessions, and track your mindfulness journey.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleFullRegistration} className="auth-form">
                    <label htmlFor="phone_full">Phone number</label>
                    <input
                      id="phone_full"
                      type="tel"
                      className="auth-input"
                      value={phoneFull}
                      onChange={(e) =>
                        handlePhoneChange(e.target.value, "full")
                      }
                      placeholder="Enter your phone number"
                      ref={fullInputRef}
                      required
                    />
                    <br />
                    <button type="submit" className="auth-button secondary">
                      <img
                        src="https://www.gstatic.com/images/branding/product/1x/gsa_48dp.png"
                        alt="Google logo"
                      />
                      Continue with Google
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          <section className="auth-left" style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <span className="auth-pill" style={{ color : "#8b5cf6", boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)" }}>Your AI Conversation Partner</span>
            <h3 style={{ color : "#5b5cf6", fontSize: "1.8rem" }}>
              Maya listens to your voice, understands your emotions, and gently guides you to express yourself with confidence and calm.
            </h3>
            <p className="auth-subtitle" >
              Maya helps you slow down, breathe deeply, and reconnect with yourself. She listens with care, guides you through peaceful moments, and supports your journey toward balance and mindfulness.
            </p>

            <ul className="auth-feature-list">
              <li>Share your thoughts or feelings anytime Maya is here to listen and bring you peace.</li>
              <li>Talk about your day, goals, or thoughts anytime and let Maya help you find peace and clarity.</li>
              <li>Receive gentle, mindful guidance that helps you grow and find inner confidence.</li>
            </ul>

            <div className="auth-support">
              Need a help? <a href="mailto:heymaya@mayaagent.ai" style={{ color : "#8b5cf6", boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)" }}>heymaya@mayaagent.ai</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Auth;
