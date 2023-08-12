import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name !"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email !"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email Address !"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password !"],
    minlength: [6, "Min password length is 6 !"],
  },
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.model("user", userSchema);
export default userModel;
