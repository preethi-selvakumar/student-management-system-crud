import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/images/main-logo.png";
import { AppContext } from "../context/AppContext";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Destructure logout function and userRole from AppContext
    const { logout: contextLogout, userRole } = useContext(AppContext);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            contextLogout();
            alert("Logout successful!");
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
            <div className="container-fluid">

                {/* Left side: Logo */}
                <div className="nav-logo">
                    <img src={logo} alt="logo" />
                </div>

                {/* Mobile Hamburger Icon */}
                <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>

                {/* Navbar Links & Actions */}
                <div className={`collapse navbar-collapse justify-content-center ${isOpen ? "show-mobile" : ""}`}>
                    <div className="nav-links navbar-nav">

                        {/* Students Link - Visible to everyone */}
                        <NavLink className="nav-link" to="/students" onClick={() => setIsOpen(false)}>
                            Students
                        </NavLink>

                        {/* Add Student Link - Visible only if role is 'admin' */}
                        {userRole === "admin" && (
                            <NavLink className="nav-link" to="/add" onClick={() => setIsOpen(false)}>
                                Add Student
                            </NavLink>
                        )}

                        {/* Mobile Logout Button (Visible only on mobile) */}
                        <div className="mobile-logout-only">
                            <button onClick={handleLogout}>logout</button>
                        </div>
                    </div>
                </div>

                {/* Right side: Logout button (Desktop Only) */}
                <div className="nav-actions desktop-logout-only">
                    <button onClick={handleLogout}>logout</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;