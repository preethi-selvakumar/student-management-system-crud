const mongoose = require("mongoose");

const studentschema = new mongoose.Schema({
    name: String,
    email: String,
    course: String,
    phone: String,
});

module.exports = mongoose.model("Student", studentschema);
