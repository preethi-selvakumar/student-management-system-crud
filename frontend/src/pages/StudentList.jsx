import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext"; // Context Import

function StudentList() {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    // Extracting token and userRole from Context
    const { token, userRole } = useContext(AppContext);

    useEffect(() => {
        // Redirect to login page if token is not available
        if (!token) {
            navigate("/");
            return;
        }
        fetchStudents();
    }, [token, navigate]); // Automatic fetch trigger when token changes

    const fetchStudents = () => {
        axios
            .get("https://student-management-backend-k25u.onrender.com/api/students", {
                headers: {
                    // Using Context token
                    authorization: `bearer ${token}`,
                },
            })
            .then((res) => {
                setStudents(res.data);
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    navigate("/");
                }
            });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try {
                await axios.delete(`https://student-management-backend-k25u.onrender.com/api/students/${id}`, {
                    headers: {
                        authorization: `bearer ${token}`,
                    },
                });
                alert("Student deleted successfully!");
                fetchStudents();
            } catch (err) {
                alert("Error deleting student.");
            }
        }
    };

    return (
        <div className="list-page-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="list-header-flex">
                            <h2 className="list-main-title">Student Management</h2>
                            {/* Displaying role from context */}
                            <span className="role-badge">{userRole}</span>
                        </div>

                        <div className="custom-table-container">
                            <table className="custom-student-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Course</th>
                                        <th>Phone</th>
                                        {userRole === "admin" && <th>Actions</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.length > 0 ? (
                                        students.map((s) => (
                                            <tr key={s._id} className="table-row-hover">
                                                <td data-label="Name">{s.name}</td>
                                                <td data-label="Email">{s.email}</td>
                                                <td data-label="Course">{s.course}</td>
                                                <td data-label="Phone">{s.phone}</td>
                                                {userRole === "admin" && (
                                                    <td className="action-buttons-cell" data-label="Actions">
                                                        <div className="mobile-btn-wrapper">
                                                            <button
                                                                className="btn-edit-custom"
                                                                onClick={() => navigate(`/edit/${s._id}`, { state: s })}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="btn-delete-custom"
                                                                onClick={() => handleDelete(s._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={userRole === "admin" ? "5" : "4"} className="no-data">
                                                No students found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentList;