import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { globalcontext } from "../App";
import { Logout } from "./Logout";

const Nav = () => {
  const { isLoggedIn, setIsLoggedIn, userName, setuserName } =
    useContext(globalcontext);
  const navigate = useNavigate();
  const handleUserEmail = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setuserName(data.user.name);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await Logout();
      setIsLoggedIn(false);
      setuserName("");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  useEffect(() => {
    const userData = async () => {
      try {
        handleUserEmail();
      } catch (error) {
        console.log(error);
      }
    };
    userData();
  }, [isLoggedIn]);
  return (
    <nav>
      <Link to="/">
        <h1>Umar Smoothies</h1>
      </Link>
      {userName && (
        <p>
          Logged in as :{" "}
          <span style={{ color: "#f89fd4", fontWeight: "bold" }}>
            {userName}
          </span>
        </p>
      )}
      <div className="controllers">
        <Link to="/signup">
          <button id="signup">Signup</button>
        </Link>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
