import React, { useContext, useEffect } from "react";
import { globalcontext } from "../App";
import { useNavigate } from "react-router-dom";

const Protected = ({ Component }) => {
  const { isLoggedIn } = useContext(globalcontext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      console.log(isLoggedIn);
      navigate("/login");
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
