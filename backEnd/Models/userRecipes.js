import mongoose from "mongoose";

const userRecipesSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  title: {
    type: String,
    required: [true, "title required !"],
  },
  ingredients: {
    type: String,
    required: [true, "ingredients required !"],
  },
});

const RecipeModel = mongoose.model("recipes", userRecipesSchema);
export default RecipeModel;
