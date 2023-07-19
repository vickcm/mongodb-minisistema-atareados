import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../css/LoginPage.css";
import authService from "../../service/autentication.service.js";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function ResetPasswordToken() {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const location = useLocation();

  useEffect(() => {
    // Obtener el token de la consulta de la URL
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    // Hacer algo con el token, si es necesario
    console.log(token);
  }, [location.search]);

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", newPassword, confirmPassword);
    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      console.log("Las contraseñas no coinciden");
      return;
    }
  
    // Obtener el token de la consulta de la URL
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
  
    // Realizar la lógica para restablecer la contraseña aquí
    // Esto podría incluir hacer una solicitud al servidor para actualizar la contraseña
    console.log (token, newPassword, confirmPassword)
    authService
      .changePassword({ token, newPassword, confirmPassword }) // Agregar el token al objeto de solicitud
      .then((data) => {
        console.log("data", data);
        setErrorMessage("");
        setSuccessMessage("Contraseña restablecida correctamente");
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        setErrorMessage(err.error.message);
      });
  
    // Reiniciar los campos y mostrar un mensaje de éxito
    setNewPassword("");
    setConfirmPassword("");
    setErrorMessage("");
  };
  return (
    <div className="page">
      <div className="container">
        <Form onSubmit={handleSubmit} className="form-login">
          <h1 className="text-center">Restablecer Contraseña</h1>
          <Form.Group className="col-mb-6">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              id="newPassword"
              value={newPassword}
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
          <div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
          </div>
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
