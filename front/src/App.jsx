import React from "react";
import "./css/AppEstilos.css";
import { Outlet } from "react-router-dom";
import MainNav from "./Components/MainNav";
import { SessionProvider } from './context/session.context'
import { DesafioProvider } from './context/desafioContext'





function App() {

/*   const onLogout = () => {
    authService.logout();
    console.log("sesión cerrada", localStorage.getItem("token"));

    localStorage.removeItem("token");

    navigate("/login", { replace: true });
  }; */

  return (
    <>
      <SessionProvider>
      <MainNav/>
      <DesafioProvider>
        <Outlet />
        </DesafioProvider>

      </SessionProvider>

      
    </>
  );
}

export default App;
