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

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    // Realizar la lógica para restablecer la contraseña aquí
    // Esto podría incluir hacer una solicitud al servidor para actualizar la contraseña

    // Reiniciar los campos y mostrar un mensaje de éxito
    setPassword("");
    setConfirmPassword("");
    setErrorMessage("");
    setSuccessMessage("Contraseña restablecida correctamente");
  };

  return (
    <div>
      <h2>Restablecer Contraseña</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <button type="submit">Restablecer Contraseña</button>
      </form>
    </div>
  );
}

export default ResetPasswordToken;
