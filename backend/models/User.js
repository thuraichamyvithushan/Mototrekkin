// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("User: Password hashed for user", { email: this.email });
    next();
  } catch (error) {
    console.error("User: Error hashing password", error.message);
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    console.log("User: Password comparison", { email: this.email, isMatch });
    return isMatch;
  } catch (error) {
    console.error("User: Error comparing password", error.message);
    throw error;
  }
};

export default mongoose.model("User", userSchema);