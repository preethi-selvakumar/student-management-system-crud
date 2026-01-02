import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AppContext } from "./context/AppContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentList from "./pages/StudentList";
import Navbar from "./components/Navbar";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

// 1. Protected Route: Redirects to Login if there is no token in Context
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AppContext);
  return token ? children : <Navigate to="/" />;
};

// 2. Public Route: Redirects to students page if a token exists in Context
const PublicRoute = ({ children }) => {
  const { token } = useContext(AppContext);
  return token ? <Navigate to="/students" /> : children;
};

function AppLayout() {
  const location = useLocation();
  const { token } = useContext(AppContext); // Extracting directly from context

  // Hiding Navbar on Login and Register pages
  const hideNavbar = location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {/* Navbar should only be visible if a token exists, checked via Context */}
      {!hideNavbar && token && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        {/* Protected Routes */}
        <Route path="/students" element={
          <ProtectedRoute>
            <StudentList />
          </ProtectedRoute>
        } />

        <Route path="/add" element={
          <ProtectedRoute>
            <AddStudent />
          </ProtectedRoute>
        } />

        <Route path="/edit/:id" element={
          <ProtectedRoute>
            <EditStudent />
          </ProtectedRoute>
        } />

        {/* Invalid path redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;