import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [recipeData, setrecipeData] = useState({
    title: "",
    ingredients: "",
  });
  const [errors, seterrors] = useState({
    title: "",
    ingredients: "",
  });

  let name, val;
  const handleChange = (e) => {
    name = e.target.name;
    val = e.target.value;
    setrecipeData({ ...recipeData, [name]: val });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const { title, ingredients } = recipeData;
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/create`, {
        method: "POST",
        credentials: "include",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          ingredients,
        }),
      });
      const { formattedErrorMessage, user } = await response.json();
      console.log(formattedErrorMessage);
      if (formattedErrorMessage) {
        seterrors({
          title: formattedErrorMessage.title.includes("title")
            ? formattedErrorMessage.title
            : "",
          ingredients: formattedErrorMessage.title.includes("ingredients")
            ? formattedErrorMessage.ingredients
            : "",
        });
      }
      if (user) {
        console.log("recipe created successfully -->");
        setrecipeData({ title: "", ingredients: "" });
        navigate("/smoothe");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <h1>Add Recipe</h1>
      <label htmlFor="title">Title</label>
      <input type="text" name="title" onChange={handleChange} />
      <span className="error">{errors.title}</span>
      <label htmlFor="ingredients">Ingredients</label>
      <input type="text" name="ingredients" onChange={handleChange} />
      <span className="error">{errors.ingredients}</span>
      <button id="sin_btn">Create</button>
    </form>
  );
};

export default Create;
