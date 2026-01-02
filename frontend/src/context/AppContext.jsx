import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [userRole, setUserRole] = useState(localStorage.getItem("role") || null);

    // This function sets the token and role during login
    const login = (newToken, role) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("role", role);
        setToken(newToken);
        setUserRole(role);
    };

    // This function clears the data during logout
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken(null);
        setUserRole(null);
    };

    return (
        <AppContext.Provider value={{ token, userRole, login, logout }}>
            {children}
        </AppContext.Provider>
    );
};