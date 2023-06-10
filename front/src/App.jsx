import React from "react";
import Home from "./Home/HomePage";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import authService from "./service/autentication.service";
import "./css/mainCss.css";
import { useNavigate, Link, Outlet } from "react-router-dom";

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
      <div>
        <Nav variant="tabs" defaultActiveKey="/">
          <div className="logo">
            <Navbar.Brand href="#home">Atareados</Navbar.Brand>
          </div>
          <Nav.Item className="nav">
            <Nav.Link className="linknav" as={Link} to="/">
              Home
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link className="linknav" as={Link} to="/recompensa">
              Recompensa
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="linknav" as={Link} to="/Perfil">
              Perfil
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="linknav" as={Link} to="/desafio">
              Desafío
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="linknav" onClick={onLogOut}>
              Salir
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Outlet />
      </div>

      {/* // tiene que ser outlet  */}

      {/* Aquí coloca el contenido de la página */}
    </>
  );
}

export default App;
