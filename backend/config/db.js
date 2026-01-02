const mongoose = require("mongoose");

const connectdb = async () => {
    try {
        // Connecting to MongoDB using the URL from environment variables
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("mongodb connected");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

module.exports = connectdb;