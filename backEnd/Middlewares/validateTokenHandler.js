import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../Models/user.js";

dotenv.config();
export const validateToken = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (token) {
      jwt.verify(token, process.env.EXCESS_TOKEN, (err, decoded) => {
        if (err) {
          throw Error("Tokken is expired !!");
        }
        req.user = decoded.id;
        next();
      });
    }
    if (!token) {
      throw Error("Token Missing !!");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const checkCurrentUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.EXCESS_TOKEN, async (err, decoded) => {
      if (err) {
        console.log(err.message);
      } else {
        try {
          const user = await userModel.findById(decoded.id);
          res.json({ user });
        } catch (error) {
          res.status(500).json({ message: "Server error" });
        }
      }
    });
  } else {
    next();
  }
};
