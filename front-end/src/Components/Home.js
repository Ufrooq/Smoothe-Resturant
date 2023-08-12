import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { globalcontext } from "../App";

const Home = () => {
  const { isLoggedIn } = useContext(globalcontext);
  const navigate = useNavigate();
  const [show, setshow] = useState(true);
  const handleExcess = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/smoothe`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (response.ok) {
        navigate("/smoothe");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let intervalId = setInterval(() => {
      setshow(false);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      {show ? (
        <>
          <div className="loading">
            <i className="fa-solid fa-spinner fa-spin"></i>
            <p>Loading...</p>
          </div>
        </>
      ) : (
        <>
          <header>
            <div className="smoothie">
              <img src="/smoothie.png" alt="" />
            </div>
            <div className="headings">
              <h2>Smoothie Recipes</h2>
              <h3>by Umar Farooq!</h3>
              <button onClick={handleExcess}>View Your Recipes</button>
            </div>
          </header>
        </>
      )}
    </>
  );
};

export default Home;
