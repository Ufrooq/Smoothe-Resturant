import { Router } from "express";
import {
  addRecipe,
  getAllRecipes,
  removeRecipe,
} from "../Controllers/recipeControllers.js";
import { validateToken } from "../Middlewares/validateTokenHandler.js";

const router = Router();

router.use(validateToken);
router.get("/smoothe", getAllRecipes);
router.post("/create", addRecipe);
router.post("/delete", removeRecipe);
export default router;
