import { Button } from "bootstrap-4-react/lib/components";
import { Container } from "bootstrap-4-react/lib/components/layout";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/FormDesafioStyle.css";
import desafioService from "../service/desafio.service.js";

function FormDesafio() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [members, setMembers] = useState([]);
  const [memberInput, setMemberInput] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeMemberInput = (event) => {
    setMemberInput(event.target.value);
  };

  const addMember = () => {
    if (memberInput.trim() !== "") {
      setMembers((prevMembers) => [...prevMembers, memberInput]);
      setMemberInput("");
    }
  };

  const onChangeDate = (event) => {
    setDeadline(event.target.value);
  };

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log("submit", title, members, deadline);
      const challenge = {
        title,
        members,
        deadline,
      };
      desafioService
        .createChallenge(challenge)
        .then(({ challenge }) => {
          console.log("Equipo creado", challenge);
          setError("");
          navigate("/creartareas", { replace: true });
        })
        .catch((err) => {
          setError(err.error.message);
        });
    },
    [title, members, deadline, navigate, setError]
  );

  return (
    <>
      <Container className="container-desafio">
        <Form className="form-desafio" onSubmit={onSubmit}>
          <div className="titulo">
            <h1>Crea tu desafio</h1>
            <p>Carga los datos para crear el desafio</p>
          </div>
          <Row className="mb-3 rowDesafio">
            <Form.Group as={Col} md="4" controlId="titulo">
              <Form.Label>Título del Desafio</Form.Label>
              <Form.Control
                type="titulo"
                value={title}
                onChange={onChangeTitle}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="equipo">
              <Form.Label>Equipo</Form.Label>
              <div>
                {members.map((member, index) => (
                  <p key={index}>{member}</p>
                ))}
              </div>
              <Row>
                <Col>
                  <Form.Control
                    type="equipo"
                    value={memberInput}
                    onChange={onChangeMemberInput}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="date">
              <Form.Label>Fecha de vencimiento</Form.Label>
              <Form.Control
                type="date"
                value={deadline}
                onChange={onChangeDate}
              />
            </Form.Group>
          </Row>
          <div className="aling-button-desafio">
            <Button className="btn-desfio">Crear Desafío</Button>
          </div>
        </Form>
        <Col>
          <a onClick={addMember}>Agregar miembro</a>
        </Col>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </Container>
    </>
  );
}

export default FormDesafio;
