import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../css/LoginPage.css";
import authService from "../../service/autentication.service.js";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function RegisterPage() {
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

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log("submit", email, password);
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
    [email, password, navigate, setError]
  );

  return (
    <div className="page">
      <div className="container">
        <Form className="form-login" onSubmit={onSubmit}>
          <h1 className="text-center">Registrarse</h1>
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
            </div>{" "}
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
