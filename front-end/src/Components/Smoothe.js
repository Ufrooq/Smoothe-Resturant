import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { globalcontext } from "../App";

const Smoothe = () => {
  const navigate = useNavigate();
  const [show, setshow] = useState(true);
  const { userRecipes, setuserRecipes } = useContext(globalcontext);
  const fetchAllsmoothes = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/smoothe`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setuserRecipes(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/delete`, {
        method: "POST",
        credentials: "include",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      if (response.ok) {
        fetchAllsmoothes();
      }
    } catch (error) {
      console.log("Errror has Occured !!");
    }
  };
  useEffect(() => {
    fetchAllsmoothes();
    setInterval(() => {
      setshow(false);
    }, 2000);
  }, []);
  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Your Smoothes
      </h2>
      <button
        style={{ margin: "auto" }}
        onClick={() => {
          navigate("/create");
        }}
      >
        Add more recipies
      </button>
      {show ? (
        <div className="loading">
          <i class="fa-solid fa-spinner fa-spin"></i>
          <p>Loading...</p>
        </div>
      ) : (
        <ul className="recipes">
          {userRecipes.length ? (
            userRecipes.map((recipe) => (
              <li className="recipe" key={recipe._id}>
                <img src="/smoothie.png" alt="smoothie recipe icon" />
                <h4>{recipe.title}</h4>
                <p>{recipe.ingredients}</p>
                <button
                  id="remove-btn"
                  onClick={() => handleRemove(recipe._id)}
                >
                  Remove
                </button>
              </li>
            ))
          ) : (
            <h1 style={{ textAlign: "center" }}>No Recipes found</h1>
          )}
        </ul>
      )}
    </>
  );
};

export default Smoothe;
