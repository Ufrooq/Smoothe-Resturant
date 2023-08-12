import RecipeModel from "../Models/userRecipes.js";

const handleErrors = (errMess) => {
  let errorsObj = { title: "", ingredients: "" };
  // Error validation
  if (errMess.message.includes("recipes validation failed")) {
    Object.values(errMess.errors).forEach(({ properties }) => {
      errorsObj[properties.path] = properties.message;
    });
  }
  return errorsObj;
};

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await RecipeModel.find({ user_id: req.user });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ errorMess: error.message });
  }
};

export const addRecipe = async (req, res) => {
  try {
    const { title, ingredients } = req.body;
    const newRecipe = await RecipeModel.create({
      title,
      ingredients,
      user_id: req.user,
    });
    res.status(201).json({ user: newRecipe._id });
  } catch (error) {
    const formattedErrorMessage = handleErrors(error);
    res.status(400).json({ formattedErrorMessage });
  }
};

// Get one recipe by id and delete it
export const removeRecipe = async (req, res) => {
  try {
    const { id } = req.body;
    const recipeToDelete = await RecipeModel.findByIdAndDelete(id);
    res.status(201).json("ok");
  } catch (error) {
    console.log(error);
    res.status(400).json("error");
  }
};
