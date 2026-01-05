import React, { useState, useContext } from "react"; // Added useContext
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext"; // Imported Context

function AddStudent() {
    const { token } = useContext(AppContext); // Getting token from Context
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        course: "",
        phone: "",
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.name.trim()) newErrors.name = "name is required";

        if (!formData.email.trim()) {
            newErrors.email = "email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "enter a valid email address";
        }

        if (!formData.course.trim()) newErrors.course = "course is required";

        if (!formData.phone.trim()) {
            newErrors.phone = "phone number is required";
        } else if (formData.phone.length < 10) {
            newErrors.phone = "enter a valid phone number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            // Using token from Context
            await axios.post("https://student-management-backend-k25u.onrender.com/api/students", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            });
            alert("Student added successfully!");
            navigate("/students");
        } catch (error) {
            alert(error.response?.data?.message || "Error: Only admins can add students!");
        }
    };

    return (
        <div className="add-student-page-container">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-5">
                        <div className="add-student-card-custom">
                            <h3 className="add-student-heading">Add New Student</h3>

                            <form onSubmit={handleSubmit} className="add-student-form">
                                <div className="add-student-input-group">
                                    <label>Name</label>
                                    <input type="text" name="name" placeholder="Enter full name" onChange={handleChange} />
                                    {errors.name && <span className="login-error">{errors.name}</span>}
                                </div>

                                <div className="add-student-input-group">
                                    <label>Email Address</label>
                                    <input type="email" name="email" placeholder="student@example.com" onChange={handleChange} />
                                    {errors.email && <span className="login-error">{errors.email}</span>}
                                </div>

                                <div className="add-student-input-group">
                                    <label>Course</label>
                                    <input type="text" name="course" placeholder="e.g. Computer Science" onChange={handleChange} />
                                    {errors.course && <span className="login-error">{errors.course}</span>}
                                </div>

                                <div className="add-student-input-group">
                                    <label>Phone Number</label>
                                    <input type="text" name="phone" placeholder="Enter contact number" onChange={handleChange} />
                                    {errors.phone && <span className="login-error">{errors.phone}</span>}
                                </div>

                                <button type="submit" className="add-student-submit-btn">
                                    Save Student Details
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddStudent;