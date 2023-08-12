import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { globalcontext } from "../App";
import { Logout } from "./Logout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.success("Logged out");
      setIsLoggedIn(false);
      setuserName("");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const userData = async () => {
    try {
      handleUserEmail();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userData();
  }, [isLoggedIn]);
  return (
    <>
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
      <div>
        <ToastContainer autoClose={3000} />
      </div>
    </>
  );
};

export default Nav;
