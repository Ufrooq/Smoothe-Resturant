import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { globalcontext } from "../App";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(globalcontext);
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });
  const [errors, seterrors] = useState({
    email: "",
    password: "",
  });

  let name, val;
  const handleChange = (e) => {
    name = e.target.name;
    val = e.target.value;
    setuserData({ ...userData, [name]: val });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
        method: "POST",
        credentials: "include",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const { formattedErrorMessage, user } = await response.json();
      if (formattedErrorMessage) {
        seterrors({
          email: formattedErrorMessage.endsWith("Email !")
            ? formattedErrorMessage
            : "",
          password: formattedErrorMessage.endsWith("Password !")
            ? formattedErrorMessage
            : "",
        });
      }
      if (user) {
        toast.success("Logged in");
        setIsLoggedIn(true);
        console.log("User Logged   In successfully -->");
        setuserData({ email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} method="POST">
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <span className="error">{errors.email}</span>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <span className="error">{errors.password}</span>
        <button id="sin_btn">LOGIN</button>
      </form>
      <div>
        <ToastContainer autoClose={3000} />
      </div>
    </>
  );
};

export default Login;
