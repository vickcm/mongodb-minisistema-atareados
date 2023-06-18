import { Button } from "bootstrap-4-react/lib/components";
import { Container } from "bootstrap-4-react/lib/components/layout";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/FormDesafioStyle.css";
import desafioService from "../service/desafio.service.js";

function TeamMembers({ members, memberInput, onChangeMemberInput, addMember,  deleteMember }) {
  return (
    <Form.Group as={Col} md="4" controlId="equipo">
      <Form.Label>Equipo</Form.Label>
      <div>
        {members.map((member, index) => (
          <div key={index} className="member-item">
            <p>{member}</p>
            <div>
              <a onClick={() => deleteMember(index)}>Eliminar</a>
            </div>
          </div>
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
        <Col>
          <a onClick={addMember}>Agregar miembro</a>
        </Col>
      </Row>
    </Form.Group>
  );
}

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

  

  const deleteMember = (index) => {
    setMembers((prevMembers) =>
      prevMembers.filter((_, i) => i !== index)
    );
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
            <TeamMembers
              members={members}
              memberInput={memberInput}
              onChangeMemberInput={onChangeMemberInput}
              addMember={addMember}
              deleteMember={deleteMember}
            />
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
        <p>{error}</p>
      </Container>
    </>
  );
}

export default FormDesafio;
