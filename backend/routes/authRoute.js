const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register Route (To create a new Admin/User)
router.post("/register", async (req, res) => {
    try {
        const { email, password, role } = req.body; // Receiving role as input as well

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedpassword = await bcrypt.hash(password, 10);

        // Save user with role (default role will be "user" as per your Model)
        const newUser = await User.create({
            email,
            password: hashedpassword,
            role: role || "user"
        });

        res.json({ message: "User registered successfully!", user: newUser });

    } catch (err) {
        res.status(500).json({ message: "Registration failed" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found! Please register first." });
        }

        // Check password
        const ismatch = await bcrypt.compare(password, user.password);
        if (!ismatch) {
            return res.status(400).json({ message: "Wrong password!" });
        }

        // Generate token - This token now includes the 'role' as well
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" } // Token valid for 1 day
        );

        // Sending role along with the response makes it easier for the frontend
        res.json({ token, role: user.role });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;