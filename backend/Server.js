const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectdb = require("./config/db");

// load env variables
dotenv.config();

// connect db
connectdb();

const app = express();

// Cors (allow all origins)
app.use(cors());

app.use(express.json());

// routes
const authRoute = require("./routes/authRoute");
const studentRoute = require("./routes/studentRoute");

app.use("/api/auth", authRoute);
app.use("/api/students", studentRoute);

// server
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});
