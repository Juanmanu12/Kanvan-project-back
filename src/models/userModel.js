import mongoose from "../config/database.config.js";

const userSchema = mongoose.Schema ({
    id: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);

export default User;