import { Router } from "express";

import {
  login_get,
  login_post,
  logout,
  signup_get,
  signup_post,
  smoothieExcess,
} from "../Controllers/authControllers.js";
import { validateToken } from "../Middlewares/validateTokenHandler.js";

const router = Router();

router.get("/signup", signup_get);
router.post("/signup", signup_post);
router.get("/login", login_get);
router.post("/login", login_post);
router.post("/smoothe", validateToken, smoothieExcess);
router.get("/logout", logout);

export default router;
