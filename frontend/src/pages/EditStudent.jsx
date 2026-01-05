import React, { useState, useEffect, useContext } from "react"; // Added useContext
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext"; // Imported Context

function EditStudent() {
    const { token } = useContext(AppContext); // Getting token from Context
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        course: "",
        phone: "",
    });

    useEffect(() => {
        if (location.state) {
            setFormData(location.state);
        }
    }, [location.state]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.name.trim()) newErrors.name = "name is required";
        if (!emailRegex.test(formData.email)) newErrors.email = "enter a valid email";
        if (!formData.course.trim()) newErrors.course = "course is required";
        if (formData.phone.length < 10) newErrors.phone = "enter a valid phone number";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            // Using Context token
            await axios.put(`https://student-management-backend-k25u.onrender.com/api/students/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            });
            alert("Student details updated successfully!");
            navigate("/students");
        } catch (error) {
            alert(error.response?.data?.message || "Update failed!");
        }
    };

    return (
        <div className="edit-student-wrapper">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-5">
                        <div className="edit-card-custom">
                            <h3 className="edit-title">Update Student Details</h3>

                            <form onSubmit={handleUpdate} className="edit-form-style">
                                <div className="edit-input-group">
                                    <label>Full Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                                    {errors.name && <span className="login-error">{errors.name}</span>}
                                </div>

                                <div className="edit-input-group">
                                    <label>Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                                    {errors.email && <span className="login-error">{errors.email}</span>}
                                </div>

                                <div className="edit-input-group">
                                    <label>Course</label>
                                    <input type="text" name="course" value={formData.course} onChange={handleChange} />
                                    {errors.course && <span className="login-error">{errors.course}</span>}
                                </div>

                                <div className="edit-input-group">
                                    <label>Phone Number</label>
                                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                                    {errors.phone && <span className="login-error">{errors.phone}</span>}
                                </div>

                                <div className="edit-action-btns">
                                    <button type="submit" className="save-update-btn">Update Student</button>
                                    <button type="button" className="cancel-btn" onClick={() => navigate("/students")}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditStudent;