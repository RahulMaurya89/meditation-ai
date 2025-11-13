import { useState, useCallback } from 'react';

const STORAGE_KEY = 'mayaUser'; // Changed to store a user object

export const useAuth = () => {
    const [user, setUser] = useState(() => {
        try {
            // Get the user object from local storage on initial load
            const item = localStorage.getItem(STORAGE_KEY);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error("Could not access localStorage", error);
            return null;
        }
    });

    const login = useCallback((userData) => {
        try {
            // Save the user object to local storage and update state
            localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
            setUser(userData);
        } catch (error) {
            console.error("Could not save to localStorage", error);
        }
    }, []);

    const logout = useCallback(() => {
        try {
            // Remove the user object from local storage and update state
            localStorage.removeItem(STORAGE_KEY);
            setUser(null);
        } catch (error) {
            console.error("Could not remove from localStorage", error);
        }
    }, []);

    // Return the user object and the phone number for convenience
    return { user, userPhone: user?.phone, login, logout };
};