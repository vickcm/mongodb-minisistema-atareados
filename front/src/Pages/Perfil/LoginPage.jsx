import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../css/LoginPage.css";
import { useNavigate } from "react-router-dom";
import authService from "../../service/autentication.service.js";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";


// para hacer ** cuando el usuario ya tiene perfil creado, llevarlo a la pagina de desafios, si no lo tiene llevarlo a crear perfil

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shown, setShown] = useState(false);
  const switchShown = () => setShown(!shown);

  
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("submit", email, password);
    authService
      .login({ email, password })

      .then((data) => {
        console.log("data", data.responseAccount.token);
        setError("");
        localStorage.setItem("token", data.responseAccount.token);
        navigate("/desafio", { replace: true });
      })
      .catch((err) => {
        setError(err.error.message);
      });
  };

  return (
    <div className="page">
      <div className="container">
        <Form onSubmit={onSubmit} className="form-login">
          <h1 className="text-center">Iniciar Sesión</h1>
          <Form.Group className="col-mb-6">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Tu email"
              value={email}
              onChange={onChangeEmail}
            />
          </Form.Group>
          <Form.Group className="col-mb-6">
            <Form.Label>Contraseña</Form.Label>
            <div className="input-with-icon">
              <Form.Control
                type={shown ? "text" : "password"}
                placeholder="Tu clave"
                value={password}
                onChange={onChangePassword}
              />
              <button type="button" onClick={switchShown} className="eye-icon-button">
                {shown ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            <Link to="/passwordreset" className="btn mt-2">
              ¿Olvidaste tu contraseña? 
            </Link>
          </Form.Group>
          <p> {error} </p>
          <div className="row justify-content-center my-4">
            <Button type="submit" className="button">
              Ingresar
            </Button>
            <Link to="/register" className="btn mt-2">
              ¿Aún no tienes cuenta? ¡Regístrate!
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;