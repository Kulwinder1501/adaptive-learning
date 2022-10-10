import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("adminType");

    navigate("/");
  }, []);
}

export default LogOut;
