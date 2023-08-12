import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { globalcontext } from "../App";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
  const { setIsLoggedIn } = useContext(globalcontext);
  const [errors, seterrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  let name, val;
  const handleChange = (e) => {
    name = e.target.name;
    val = e.target.value;
    setuserData({ ...userData, [name]: val });
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password } = userData;
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/signup`, {
        method: "POST",
        credentials: "include",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const { formattedErrorMessage, user } = await response.json();
      if (formattedErrorMessage) {
        seterrors({
          name: formattedErrorMessage.name,
          email: formattedErrorMessage.email,
          password: formattedErrorMessage.password,
        });
      }
      if (user) {
        setIsLoggedIn(true);
        toast.success("Account Created !");
        console.log("Data is posted from front-end successfully -->");
        setuserData({ name: "", email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSignUp} method="POST">
        <h1>SignUp</h1>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
        <span className="error">{errors.name}</span>
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
        <button id="sin_btn">SIGNUP</button>
      </form>
      <ToastContainer />
    </>
  );
};

export default Signup;
