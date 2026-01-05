import React, { useState, useEffect, useContext } from "react"; // Imported useContext
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext"; // Imported AppContext

function Login() {
    const { login: contextLogin } = useContext(AppContext); // Extracting login function from Context
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (location.state && location.state.registeredEmail) {
            setEmail(location.state.registeredEmail);
        }
    }, [location.state]);

    const validate = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            newErrors.email = "email is required";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "enter a valid email address";
        }

        if (!password.trim()) {
            newErrors.password = "password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validate()) return;
        try {
            const res = await axios.post("https://student-management-backend-k25u.onrender.com/api/auth/login", {
                email,
                password,
            });

            // Context logic: This will save to local storage and update the state
            contextLogin(res.data.token, res.data.role);

            alert("Login successful!");

            navigate("/students");

        } catch (error) {
            alert("Login failed: " + (error.response?.data?.message || "Error"));
        }
    };

    return (
        <div className="container login-container">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-11 col-sm-8 col-md-5 col-lg-4">
                    <div className="login-card">
                        <h2 className="login-title">login</h2>

                        <div className="login-field">
                            <input
                                type="email"
                                placeholder="email"
                                className="login-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && (
                                <span className="login-error">{errors.email}</span>
                            )}
                        </div>

                        <div className="login-field">
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="password"
                                    className="login-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {errors.password && (
                                <span className="login-error">{errors.password}</span>
                            )}
                        </div>

                        <button className="login-btn" onClick={handleLogin}>
                            login
                        </button>

                        <div className="login-footer">
                            <p>Don't have an account? <Link to="/register" className="register-link">Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;