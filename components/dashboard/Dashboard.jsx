import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/Auth_hook';
import Login from '../auth/Login';
import './Dashboard.css';

// Reusable Card component
const Card = ({ title, icon, children, className }) => (
    <div className={`card ${className || ''}`}>
        <h2 className="card-title">
            <span className="card-icon">{icon}</span> {title}
        </h2>
        {children}
    </div>
);

// Main Dashboard Component
const Dashboard = () => {
    const { user, userPhone, login, logout } = useAuth(); // Destructure user object
    const [dashboardData, setDashboardData] = useState(null); // Renamed to avoid confusion
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Only fetch data if a user phone number is available
        if (!userPhone) {
            setLoading(false);
            return;
        }

        const fetchUserData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/maya-api/dashboard/dashboardX-data/${userPhone}`, {
                    headers: {
                        'ngrok-skip-browser-warning': 'true'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setDashboardData(data); // Set dashboard-specific data
            } catch (e) {
                console.error("Failed to fetch user data:", e);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userPhone]); // Re-run the effect when userPhone changes

    // If no user is logged in, show the Login component
    if (!userPhone) {
        return <Login onLogin={login} />;
    }

    if (loading) {
        return <div className="dashboard-loader">Loading Dashboard...</div>;
    }

    if (error || !dashboardData) { // Check for dashboardData
        return (
            <div className="dashboard-error">
                Could not load user data. {error && `Reason: ${error}`}
                <button onClick={logout} className="btn btn-secondary" style={{marginTop: '20px', width: 'auto'}}>
                    Try Again
                </button>
            </div>
        );
    }

    const tierBadges = {
        trial: '🧘 Trial',
        free: '� Free',
        pro: '🌟 Mindful Pro',
    };

    return (
        <div className="dashboard-container">
            <footer className="dashboard-header">
                <h1>Welcome back, {dashboardData.name}!</h1>
                <p>Your meditation journey awaits.</p>
            </footer>

            <main className="dashboard-grid">
                {/* Account Status */}
                <Card title="Meditation Plan" icon="🧘">
                    <div className="account-tier">
                        Your current plan:
                        <span className={`tier-badge tier-${dashboardData.tier}`}>
                            {tierBadges[dashboardData.tier]}
                        </span>
                    </div>
                    {dashboardData.tier === 'trial' && (
                        <div className="trial-notice">
                            Your trial ends in {dashboardData.trialDaysLeft} days.
                        </div>
                    )}
                </Card>

                {/* Usage Statistics */}
                <Card title="Mindfulness Stats" icon="📊">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-number">{dashboardData.stats.conversations}</div>
                            <div className="stat-label">Meditation Sessions</div>
                        </div>
                    </div>
                </Card>

                {/* Subscription Management */}
                <Card title="Subscription" icon="�">
                    <p className="card-description">
                        Manage your meditation plan and session limits.
                    </p>
                    {dashboardData.tier !== 'pro' && (
                         <a href="/pricing" className="btn btn-primary">
                            🌟 Upgrade to Mindful Pro
                         </a>
                    )}
                     <a href="/contact" className="btn btn-secondary">
                        Increase Session Limit
                     </a>
                </Card>

                {/* Payment Details */}
                <Card title="Session Details" icon="⏱️">
                    <div className="payment-details-grid">
                        <div className="detail-item">
                            <div className="detail-label">Current Plan</div>
                            <div className="detail-value plan-name">{dashboardData.paymentDetails.plan}</div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Status</div>
                            <div className="detail-value status-active">{dashboardData.paymentDetails.status}</div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Remaining Minutes</div>
                            <div className="detail-value">{dashboardData.paymentDetails.remainingMinutes}</div>
                        </div>
                    </div>
                    <a href="/pricing" className="btn btn-secondary">Manage Billing</a>
                </Card>
            </main>
            <footer className="dashboard-footer">
                <button onClick={logout} className="btn-logout">Logout</button>
            </footer>
        </div>
    );
};

export default Dashboard;