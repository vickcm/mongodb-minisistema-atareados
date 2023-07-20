import React from "react";
import "./css/AppEstilos.css";
import { Outlet } from "react-router-dom";
import MainNav from "./components/MainNav";
import { SessionProvider } from "./context/session.context";
import { DesafioProvider } from "./context/desafioContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <SessionProvider>
        <ToastContainer />
        <MainNav />
        <DesafioProvider>
          <Outlet />
        </DesafioProvider>
      </SessionProvider>
    </>
  );
}

export default App;
