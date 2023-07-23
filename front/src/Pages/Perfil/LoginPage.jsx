import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../css/LoginPage.css";
import { useNavigate } from "react-router-dom";
import authService from "../../service/autentication.service.js";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { useProfile } from "../../context/session.context";

// para hacer ** cuando el usuario ya tiene perfil creado, llevarlo a la pagina de desafios, si no lo tiene llevarlo a crear perfil

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
        setErrorMessage("");
        localStorage.setItem("token", data.responseAccount.token);

        toast.success("Bienvenido");

        navigate("/desafio", { replace: true });
      })
      .catch((err) => {
        setErrorMessage(err.error.message);
      });

    setErrorMessage("");
  };

  return (
    <div className="page">
      <div className="container">
        <Form onSubmit={onSubmit} className="form-login">
          <h1 className="text-center">Iniciar Sesión</h1>
          <Form.Group className="col-mb-6">
            <Form.Label>Email</Form.Label>
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
              <button
                type="button"
                onClick={switchShown}
                className="eye-icon-button"
              >
                {shown ?  <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            <Link to="/passwordreset" className="btn mt-2">
              ¿Olvidaste tu contraseña?
            </Link>
          </Form.Group>

          <div className="row justify-content-center my-4">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
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
