import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../css/LoginPage.css";
import { useNavigate } from "react-router-dom";
import authService from "../../service/autentication.service.js";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";


// para hacer ** cuando el usuario ya tiene perfil creado, llevarlo a la pagina de desafios, si no lo tiene llevarlo a crear perfil

function ResetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [shown, setShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("submit", email);
    authService
      .resetPassword( email)

      .then((data) => {
        console.log("data", data.message);
        setError("");
        setEmail("");
      })
      .catch((err) => {
        setError(err.error.message);
      });
  };

  return (
    <div className="page">
      <div className="container">
        <Form onSubmit={onSubmit} className="form-login">
          <h1 className="text-center">Reestablecer contraseña</h1>
          <Form.Group className="col-mb-6">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su email"
              value={email}
              onChange={onChangeEmail}
            />
          </Form.Group>
          <div className="row justify-content-center my-4">
            <Button type="submit" className="button">
              Enviar
            </Button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <p> {error} </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
