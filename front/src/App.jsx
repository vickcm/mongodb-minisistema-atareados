import React from "react";
import authService from "./service/autentication.service";
import Header from "./Components/HeaderNav";
import "./css/AppEstilos.css";
import { useNavigate,Outlet } from "react-router-dom";
import MainNav from "./Components/MainNav";



function App() {
  const navigate = useNavigate();

  const onLogOut = () => {
    authService.logout();
    console.log("sesión cerrada", localStorage.getItem("token"));

    localStorage.removeItem("token");

    navigate("/login", { replace: true });
  };

  return (
    <>
      <MainNav/>

        <Outlet />

      {/* // tiene que ser outlet  */}

      {/* Aquí coloca el contenido de la página */}
    </>
  );
}

export default App;
