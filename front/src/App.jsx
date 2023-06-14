import React from "react";
import "./css/AppEstilos.css";
import { Outlet } from "react-router-dom";
import MainNav from "./Components/MainNav";
import { SessionProvider } from './context/session.context'




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

        <Outlet />
      </SessionProvider>

      
    </>
  );
}

export default App;
