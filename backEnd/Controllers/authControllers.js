import userModel from "../Models/user.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const handleErrors = (errMess) => {
  let errorsObj = { name: "", email: "", password: "" };
  // duplicate email validation
  if (errMess.code === 11000) {
    errorsObj.email = "This email already exists !!";
    return errorsObj;
  }
  // Error validation
  if (errMess.message.includes("user validation failed")) {
    Object.values(errMess.errors).forEach(({ properties }) => {
      errorsObj[properties.path] = properties.message;
    });
  }
  return errorsObj;
};

const excess_token_Age = 60 * 60 * 24 * 3;
const createToken = (id) => {
  return Jwt.sign({ id }, process.env.EXCESS_TOKEN, {
    expiresIn: excess_token_Age,
  });
};

// get controllers
export const signup_get = async (req, res) => {
  res.render("signup");
};

export const login_get = async (req, res) => {
  res.render("login");
};

// post controllers
export const signup_post = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await userModel.create({
      name,
      email,
      password: password.length > 6 ? hashedPassword : password,
    });
    const excess_Token = createToken(newUser._id);
    console.log("User Created Succesfuly !!");
    res
      .cookie("token", excess_Token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: new Date(Date.now() + 3 * 1000 * 24 * 60 * 60),
      })
      .status(200)
      .json({ user: newUser._id });
  } catch (error) {
    const formattedErrorMessage = handleErrors(error);
    res.status(400).json({ formattedErrorMessage });
  }
};

export const login_post = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const isPasswordCorrect = await user.comparePassword(password);
      if (isPasswordCorrect) {
        const excess_Token = createToken(user._id);
        res
          .cookie("token", excess_Token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: new Date(Date.now() + 3 * 1000 * 24 * 60 * 60),
          })
          .status(200)
          .json({ user: user._id });
      } else {
        throw Error("Incorrect Password !");
      }
    } else {
      throw Error("Incorrect Email !");
    }
  } catch (error) {
    const formattedErrorMessage = error.message;
    res.status(400).json({ formattedErrorMessage });
  }
};

export const smoothieExcess = async (req, res) => {
  try {
    res.status(200).json("ok");
  } catch (error) {
    res.status(400).json({});
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { maxAge: 1 }).send();
};
