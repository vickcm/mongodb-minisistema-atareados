import React, { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../css/LoginPage.css";
import authService from "../../service/autentication.service.js";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [shown, setShown] = useState(false);
  const [shownConfirm, setShownConfirm] = useState(false);

  const switchShown = () => setShown(!shown);
  const switchShownConfirm = () => setShownConfirm(!shownConfirm);


  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log("submit", email, password, confirmPassword);

      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden");
        return;
      }

      const account = {
        email,
        password,
      };

      authService
        .createAccount(account)
        .then(({ account }) => {
          console.log("cuenta creada", account);
          setError("");
          navigate("/login", { replace: true });
        })
        .catch((err) => {
          setError(err.error.message);
        });
    },
    [email, password, confirmPassword, navigate]
  );

  return (
    <div className="page">
      <div className="container">
        <Form className="form-login" onSubmit={onSubmit}>
          <h1 className="text-center">Registrarse</h1>
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
            <p className="password-requisitos">La contraseña debe contener mínimo 6 caracteres. Debe incluir números y letras, y por lo menos una mayúscula</p>

            <div className="input-with-icon">
              <Form.Control
                type={shown ? "text" : "password"}
                placeholder="Tu clave"
                value={password}
                onChange={onChangePassword}
              />
              <button type="button" onClick={switchShown} className="eye-icon-button">
                {shown ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </Form.Group>
          <Form.Group className="col-mb-6">
            <Form.Label>Confirmar Contraseña</Form.Label>
            <div className="input-with-icon">
              <Form.Control
                type={shownConfirm ? "text" : "password"}
                placeholder="Confirmar clave"
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
              />
              <button type="button" onClick={switchShownConfirm} className="eye-icon-button">
                {shownConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </Form.Group>
          <p> {error} </p>
          <Button type="submit" className="button">
            Registrarme
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;
