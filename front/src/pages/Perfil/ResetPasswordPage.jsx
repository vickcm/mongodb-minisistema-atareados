import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../css/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../service/autentication.service.js";
import { toast } from "react-toastify";

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

    if (!email) {
      setErrorMessage("El email es obligatorio");
      return;
    }

    const validateEmail = (email) => {
      // Expresión regular para validar el formato del email
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      return emailRegex.test(email);
    };

    if (!validateEmail(email)) {
      setErrorMessage("El email es inválido");
      return;
    }

    if (validateEmail(email)) {

      authService
      .resetPassword(email)
      .then((data) => {
        console.log("data", data.message);
        setErrorMessage("");
        setEmail("");
        setSuccessMessage("El mail fue enviado con éxito.");
      })
      .catch((err) => {
        setErrorMessage(err.error.message);
      });

    // Reiniciar los campos y mostrar un mensaje de éxito
    setEmail("");
    setErrorMessage("");
    setSuccessMessage("");
    }
    
    
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
          </div>
          <div className="row justify-content-center my-4">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && (
              <div>
                <p className="success-message">{successMessage}</p>
                <Link to="/login" className="btn mt-2">
                  Volver a la página de inicio sesión
                </Link>
              </div>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
