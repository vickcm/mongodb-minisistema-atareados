import React from "react";
import Home from "./Home/HomePage";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import authService from "./service/autentication.service";
import './css/mainCss.css'
import { useNavigate } from "react-router-dom";

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
      <Nav variant="tabs" defaultActiveKey="/">
        <div className="logo">
          <Navbar.Brand href="#home">Atareados</Navbar.Brand>
        </div>
        <Nav.Item className="nav">
          <Nav.Link className="linknav"  href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="linknav"  href="/desafio">Desafio</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="linknav"  href="/recompensa">Recompensa</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="linknav"  href="/perfil">Perfil</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  className="linknav" onClick={onLogOut}>Salir</Nav.Link>
        </Nav.Item>
      </Nav>

      <Home />
      {/* Aquí coloca el contenido de la página */}
    </>
  );
}

export default App;
