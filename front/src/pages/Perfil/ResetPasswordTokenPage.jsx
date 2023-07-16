import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../css/LoginPage.css";
import { useNavigate } from "react-router-dom";
import authService from "../../service/autentication.service.js";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// para hacer ** cuando el usuario ya tiene perfil creado, llevarlo a la pagina de desafios, si no lo tiene llevarlo a crear perfil

function ResetPasswordToken() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", password, confirmPassword);
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      console.log("Las contraseñas no coinciden");
      return;
    }

    // Realizar la lógica para restablecer la contraseña aquí
    // Esto podría incluir hacer una solicitud al servidor para actualizar la contraseña

    authService
      .changePassword({ password, confirmPassword })
      .then((data) => {
        console.log("data", data);
        setErrorMessage("");
        setSuccessMessage("Contraseña restablecida correctamente");
      })
      .catch((err) => {
        setErrorMessage(err.error.message);
      });

    // Reiniciar los campos y mostrar un mensaje de éxito
    setPassword("");
    setConfirmPassword("");
    setErrorMessage("");
    setSuccessMessage("Contraseña restablecida correctamente");
  };

  return (
    <div className="page">
      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <div className="container">
        <Form onSubmit={handleSubmit} className="form-login">
          <h1 className="text-center">Restablecer Contraseña</h1>
          <Form.Group className="col-mb-6">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <Form.Group className="col-mb-6">
            <Form.Label>Confirmar Contraseña</Form.Label>
            <div className="input-with-icon">
              <Form.Control
                type="password"
                id="confirmPassword"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
          </Form.Group>
          <div className="row justify-content-center my-4">
            <Button type="submit" className="btn mt-2">
              Restablecer Contraseña
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ResetPasswordToken;
