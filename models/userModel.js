const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please add a username"],
        },
        email: {
            type: String,
            required: [true, "Please add a email"],
            unique: [true, "Email already exists!"]
        },
        password: {
            type: String,
            required: [true, "Please add a phone"],
        }
    }
);

module.exports = mongoose.model("User", userSchema);