import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Smoothe from "./Components/Smoothe";
import Home from "./Components/Home";
import Protected from "./Components/Protected";
import { createContext, useEffect, useState } from "react";
import Create from "./Components/Create";
import "./App.css";
export const globalcontext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setuserName] = useState("");
  const [userRecipes, setuserRecipes] = useState([]);
  const isLoggedInHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/smoothe`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      return response.ok;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const isLoggedIn = await isLoggedInHandler();
        setIsLoggedIn(isLoggedIn);
      } catch (error) {
        console.log(error.message);
        setIsLoggedIn(false);
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <globalcontext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userName,
        setuserName,
        userRecipes,
        setuserRecipes,
      }}
    >
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/smoothe" element={<Protected Component={Smoothe} />} />
          <Route path="/create" element={<Protected Component={Create} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </globalcontext.Provider>
  );
}

export default App;
