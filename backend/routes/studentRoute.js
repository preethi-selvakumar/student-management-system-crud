const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Create Student (Admin Only)
router.post("/", authMiddleware, roleMiddleware("admin"), async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Error creating student" });
    }
});

// Get All Students (Both Admin and User can view)
router.get("/", authMiddleware, async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students" });
    }
});

// Update Student (Admin Only)
router.put("/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
    try {
        const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Error updating student" });
    }
});

// Delete Student (Admin Only)
router.delete("/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "student deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting student" });
    }
});

module.exports = router;