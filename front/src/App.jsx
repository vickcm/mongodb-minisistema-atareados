import React from "react";
import Container from "react-bootstrap/Container";
import Home from "./Home/HomePage";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import authService from "./service/autentication.service";
import { useNavigate, Link } from "react-router-dom";

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
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Atareados</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/desafio">Desafio</Link>
              </li>
              <li>
                <Link to="/recompesa">Recompensa</Link>
              </li>
              <li>
                <Link to="/perfil">Perfil</Link>
              </li>
              <li>
                <Link onClick={onLogOut}>Salir</Link>
              </li>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Home />
      {/* Aquí coloca el contenido de la página */}
    </>
  );
}

export default App;
