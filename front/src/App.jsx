import React from "react";
import "./css/AppEstilos.css";
import { Outlet } from "react-router-dom";
import MainNav from "./components/MainNav";
import { SessionProvider } from './context/session.context'
import { DesafioProvider } from './context/desafioContext'

function App() {
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