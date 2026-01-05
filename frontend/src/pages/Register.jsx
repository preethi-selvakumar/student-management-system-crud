import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "user"
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/;

        if (!formData.email.trim()) {
            newErrors.email = "email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "enter a valid email address";
        }

        if (!formData.password.trim()) {
            newErrors.password = "password is required";
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = "password must be 8+ chars, include 1 uppercase, 1 number & 1 special character";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validation check
        if (!validate()) return;

        try {
            // API call to register
            const res = await axios.post("https://student-management-backend-k25u.onrender.com/api/auth/register", formData);
            alert(res.data.message);

            // Passing email to Login page via state
            navigate("/", { state: { registeredEmail: formData.email } });
        } catch (err) {
            alert(err.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <div className="container register-container-custom">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-11 col-sm-8 col-md-5 col-lg-4">
                    <div className="register-card-custom">
                        <h2 className="register-title-custom">Create Account</h2>

                        <form onSubmit={handleRegister}>
                            {/* email field */}
                            <div className="register-field-custom">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    className="register-input-custom"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <span className="login-error">{errors.email}</span>
                                )}
                            </div>

                            {/* password field with eye icon */}
                            <div className="register-field-custom">
                                <div className="password-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="password"
                                        className="register-input-custom"
                                        value={formData.password}
                                        onChange={handleChange}
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

                            {/* role selection */}
                            <div className="register-field-custom">
                                <select
                                    name="role"
                                    className="register-input-custom"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="user">User (View Only)</option>
                                    <option value="admin">Admin (Full Access)</option>
                                </select>
                            </div>

                            <button type="submit" className="register-btn-custom">
                                register
                            </button>
                        </form>

                        <div className="register-footer-custom">
                            <p>Already have an account? <Link to="/" className="login-link-custom">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;