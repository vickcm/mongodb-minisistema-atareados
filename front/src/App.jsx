import React from "react";
import authService from "./service/autentication.service";
import Header from "./Components/HeaderNav";
import "./css/AppEstilos.css";
import { useNavigate,Outlet } from "react-router-dom";



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
      <Header onLogOut={onLogOut} />

        <Outlet />

      {/* // tiene que ser outlet  */}

      {/* Aquí coloca el contenido de la página */}
    </>
  );
}

export default App;
