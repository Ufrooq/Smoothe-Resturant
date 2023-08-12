import express from "express";
import { connection } from "./DbConnection/connection.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/authRoutes.js";
import recipeRoutes from "./Routes/recipeRoutes.js";
import { checkCurrentUser } from "./Middlewares/validateTokenHandler.js";

const app = express();
dotenv.config();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
// middleware
app.use(express.static("public"));
app.use(express.json());
// view engine

// routes
app.use("/", authRoutes);
app.use("/", recipeRoutes);
app.get("*", checkCurrentUser);

// database connection
connection();
const port = process.env.PORT || 3001;

// running the app
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
